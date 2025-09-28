let lastDriveFolderId = null;
let isMyDrive = false;

function updateDriveInfo(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('drive.google.com')) {
    if (tab.url.includes('drive/folders/')) {
      const urlParts = tab.url.split('/');
      const folderIdIndex = urlParts.indexOf('folders') + 1;
      if (folderIdIndex < urlParts.length) {
        lastDriveFolderId = urlParts[folderIdIndex];
        isMyDrive = false;
      }
    } else if (tab.url.includes('drive/my-drive')) {
      lastDriveFolderId = null;
      isMyDrive = true;
    }
  }
}

chrome.tabs.onUpdated.addListener(updateDriveInfo);

chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes('drive.google.com')) {
    updateDriveInfo(tab.id, {status: 'complete'}, tab);
  }
  chrome.tabs.create({ url: 'preview.html' });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  
  if (request.action === "getDriveInfo") {
    console.log('Sending Drive info:', { folderId: lastDriveFolderId, isMyDrive: isMyDrive });
    sendResponse({ folderId: lastDriveFolderId, isMyDrive: isMyDrive });
  } else if (request.action === "getAuthToken") {
    chrome.identity.getAuthToken({interactive: true}, (token) => {
      if (chrome.runtime.lastError) {
        console.error('Auth error:', JSON.stringify(chrome.runtime.lastError));
        sendResponse({error: `Auth error: ${chrome.runtime.lastError.message || 'Unknown error'}`});
      } else if (token) {
        console.log('Auth token received');
        sendResponse({token: token});
      } else {
        console.error('No token received');
        sendResponse({error: "No token received"});
      }
    });
    return true; // Necessary for asynchronous response
  } else {
    sendResponse({error: "Unknown action"});
  }
  
  return true; // Necessary for asynchronous response
});