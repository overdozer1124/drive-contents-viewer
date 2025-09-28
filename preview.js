// グローバル変数の定義
let globalOrientation = 'horizontal'; // 初期の全体表示方向

// 認証トークンを取得する関数
function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({action: "getAuthToken"}, response => {
      if (response.error) {
        reject(new Error(response.error));
      } else {
        resolve(response.token);
      }
    });
  });
}

// 現在のDrive情報を取得する関数
function getDriveInfo() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({action: "getDriveInfo"}, response => {
      if (response.error) {
        reject(new Error(response.error));
      } else {
        resolve(response);
      }
    });
  });
}

// レイアウトを更新する関数
function updateLayout(columns) {
  const container = document.getElementById('content-container');
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

// 特定のDriveフォルダまたはマイドライブのコンテンツを取得する関数
async function fetchDriveContents(token, { folderId, isMyDrive }) {
  let url;
  if (isMyDrive) {
    url = 'https://www.googleapis.com/drive/v3/files?q=\'root\' in parents and trashed=false&fields=files(id,name,mimeType,webViewLink)';
  } else {
    url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and trashed=false&fields=files(id,name,mimeType,webViewLink)`;
  }
  
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch Drive contents');
  }
  return response.json();
}

// フォルダ名を取得する関数
async function getFolderName(token, { folderId, isMyDrive }) {
  if (isMyDrive) {
    return "マイドライブ";
  }
  
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}?fields=name`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch folder name');
  }
  
  const data = await response.json();
  return data.name;
}

// フォルダ名を表示する関数
function displayFolderName(folderName) {
  const folderNameElement = document.getElementById('folder-name');
  if (folderNameElement) {
    folderNameElement.textContent = ` [${folderName}]`;
  }
}

// ファイルの埋め込みコードを生成する関数
function getEmbedCode(file) {
  const commonStyle = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;';
  const imageStyle = `${commonStyle} object-fit: contain;`;
  
  const embedTypes = {
    'application/vnd.google-apps.presentation': (id) => `<iframe src="https://docs.google.com/presentation/d/${id}/embed" frameborder="0" style="${commonStyle}"></iframe>`,
    'application/vnd.google-apps.document': (id) => `<iframe src="https://docs.google.com/document/d/${id}/preview" frameborder="0" style="${commonStyle}"></iframe>`,
    'application/vnd.google-apps.spreadsheet': (id) => `<iframe src="https://docs.google.com/spreadsheets/d/${id}/preview" frameborder="0" style="${commonStyle}"></iframe>`,
    'image/jpeg': (id) => `<img src="https://lh3.googleusercontent.com/d/${id}" alt="${file.name}" style="${imageStyle}">`,
    'image/png': (id) => `<img src="https://lh3.googleusercontent.com/d/${id}" alt="${file.name}" style="${imageStyle}">`,
    'image/gif': (id) => `<img src="https://lh3.googleusercontent.com/d/${id}" alt="${file.name}" style="${imageStyle}">`,
    'application/pdf': (id) => `<iframe src="https://drive.google.com/file/d/${id}/preview" frameborder="0" style="${commonStyle}"></iframe>`,
    'video/mp4': (id) => `<iframe src="https://drive.google.com/file/d/${id}/preview" style="${commonStyle}" allow="autoplay; fullscreen"></iframe>`,
    'video/quicktime': (id) => `<iframe src="https://drive.google.com/file/d/${id}/preview" style="${commonStyle}" allow="autoplay; fullscreen"></iframe>`,
    'video/x-msvideo': (id) => `<iframe src="https://drive.google.com/file/d/${id}/preview" style="${commonStyle}" allow="autoplay; fullscreen"></iframe>`,
    'video/x-matroska': (id) => `<iframe src="https://drive.google.com/file/d/${id}/preview" style="${commonStyle}" allow="autoplay; fullscreen"></iframe>`,
    'video/webm': (id) => `<iframe src="https://drive.google.com/file/d/${id}/preview" style="${commonStyle}" allow="autoplay; fullscreen"></iframe>`
  };

  return embedTypes[file.mimeType] 
    ? embedTypes[file.mimeType](file.id)
    : `<a href="https://drive.google.com/file/d/${file.id}/view" target="_blank" class="file-link" style="display: flex; justify-content: center; align-items: center; ${commonStyle}">View ${file.name}</a>`;
}

// URLをクリップボードにコピーし、フィードバックを表示する関数
function copyToClipboardWithFeedback(text, feedbackElement) {
  navigator.clipboard.writeText(text).then(() => {
      console.log('URL copied to clipboard');
      showFeedback(feedbackElement);
  }).catch(err => {
      console.error('Failed to copy: ', err);
  });
}

// フィードバックを表示する関数
function showFeedback(element) {
  element.textContent = chrome.i18n.getMessage("linkCopied");
  element.classList.add('show');
  setTimeout(() => {
      element.classList.remove('show');
      setTimeout(() => {
        element.textContent = chrome.i18n.getMessage("copyLink"); 
      }, 300); // フェードアウト後にテキストを元に戻す
  }, 2000); // 2秒後にフェードアウト
}

// ファイルを表示する関数
function displayFiles(files, token) {
  const container = document.getElementById('content-container');
  container.innerHTML = '';

  files.forEach((file, index) => {
      const fileDiv = document.createElement('div');
      fileDiv.className = 'file-item';
      fileDiv.dataset.index = index;
      fileDiv.tabIndex = 0;
      fileDiv.draggable = true;
      fileDiv.setAttribute('aria-label', `File: ${file.name}`);

      const nameDiv = document.createElement('div');
      nameDiv.className = 'file-name';
      
      const viewLink = document.createElement('span');
      viewLink.className = 'file-action file-view';
      viewLink.textContent = chrome.i18n.getMessage("viewFile");
      viewLink.onclick = (e) => {
          e.stopPropagation();
          openFile(file.webViewLink);
      };
      nameDiv.appendChild(viewLink);

      const titleSpan = document.createElement('span');
      titleSpan.className = 'file-title';
      titleSpan.textContent = file.name;
      nameDiv.appendChild(titleSpan);
      
      const copyLink = document.createElement('span');
      copyLink.className = 'file-action copy-link';
      copyLink.textContent = chrome.i18n.getMessage("copyLink");
      copyLink.onclick = (e) => {
          e.stopPropagation();
          copyToClipboardWithFeedback(file.webViewLink, copyLink);
      };
      nameDiv.appendChild(copyLink);

      fileDiv.appendChild(nameDiv);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'file-preview';
      contentDiv.innerHTML = getEmbedCode(file, token);
      fileDiv.appendChild(contentDiv);

      fileDiv.addEventListener('dragstart', dragStart);
      fileDiv.addEventListener('dragover', dragOver);
      fileDiv.addEventListener('drop', drop);
      fileDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          openFile(file.webViewLink);
        }
      });

      container.appendChild(fileDiv);
  });

  applyGlobalOrientation();
}

// エラーハンドリング関数
function handleError(error, elementId) {
  console.error('Error:', error);
  const element = document.getElementById(elementId);
  element.textContent = `エラーが発生しました: ${error.message}`;
  element.classList.add('error-message');
}

// ファイルを開く関数を追加
function openFile(url) {
  window.open(url, '_blank');
}


// ドラッグ開始時の処理
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.index);
  e.target.classList.add('dragging');
}

// ドラッグ中の処理
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

// ドロップ時の処理
function drop(e) {
  e.preventDefault();
  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
  const toIndex = parseInt(e.target.closest('.file-item').dataset.index);
  
  if (fromIndex !== toIndex) {
    const container = document.getElementById('content-container');
    const items = Array.from(container.children);
    const [reorderedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, reorderedItem);
    
    container.innerHTML = '';
    items.forEach((item, index) => {
      item.dataset.index = index;
      container.appendChild(item);
    });
  }
  
  document.querySelector('.dragging').classList.remove('dragging');
}

// 全体の表示オプションを変更する関数
function setGlobalOrientation(orientation) {
  globalOrientation = orientation;
  applyGlobalOrientation();
}

// 全体の表示オプションを適用する関数
function applyGlobalOrientation() {
  const container = document.getElementById('content-container');
  if (globalOrientation === 'vertical') {
    container.classList.add('vertical-global');
  } else {
    container.classList.remove('vertical-global');
  }
}

// メイン関数
async function main() {
  try {
    const [token, driveInfo] = await Promise.all([getAuthToken(), getDriveInfo()]);
    const folderName = await getFolderName(token, driveInfo);
    displayFolderName(folderName);
    
    const data = await fetchDriveContents(token, driveInfo);
    displayFiles(data.files, token);

    const orientationControls = document.querySelector('.orientation-controls');
    if (orientationControls) {
      orientationControls.querySelectorAll('input[name="orientation"]').forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.checked) {
            setGlobalOrientation(radio.value);
          }
        });
      });
    } else {
      console.warn('Orientation controls not found');
    }

    const slider = document.getElementById('column-slider');
    const columnValue = document.getElementById('column-value');

    if (slider && columnValue) {
      slider.addEventListener('input', () => {
        const columns = slider.value;
        columnValue.textContent = columns;
        updateLayout(columns);
      });

      updateLayout(3);
    } else {
      console.warn('Slider or column value element not found');
    }
  } catch (error) {
    handleError(error, 'content-container');
  }
}

// DOMの読み込みが完了したらメイン関数を実行
document.addEventListener('DOMContentLoaded', main);