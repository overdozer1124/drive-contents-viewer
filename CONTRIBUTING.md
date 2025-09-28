# 🤝 コントリビューションガイド

Drive Contents Viewerプロジェクトへの貢献を検討していただき、ありがとうございます！このガイドでは、効果的に貢献するための方法をご説明します。

## 📋 目次

- [行動規範](#-行動規範)
- [貢献の種類](#-貢献の種類)
- [開発環境のセットアップ](#-開発環境のセットアップ)
- [プルリクエストのプロセス](#-プルリクエストのプロセス)
- [コーディング規約](#-コーディング規約)
- [Issue報告のガイドライン](#-issue報告のガイドライン)
- [コミットメッセージの規約](#-コミットメッセージの規約)
- [リリースプロセス](#-リリースプロセス)

## 🤝 行動規範

すべての参加者に対して敬意を持って接することを期待しています。以下の行動を心がけてください：

- **建設的で敬意ある**コミュニケーション
- **異なる視点や経験**を尊重
- **建設的な批判**を受け入れる
- **コミュニティの最善**を考慮した行動

## 🎯 貢献の種類

### 🐛 バグ報告
- [Bug Report Template](https://github.com/overdozer1124/drive-contents-viewer/issues/new?template=bug_report.md)を使用
- 再現可能な詳細な情報を提供
- スクリーンショットやコンソールログを添付

### ✨ 機能要望
- [Feature Request Template](https://github.com/overdozer1124/drive-contents-viewer/issues/new?template=feature_request.md)を使用
- 具体的な使用ケースを説明
- 既存の機能との関連性を検討

### 📝 ドキュメント改善
- 誤字脱字の修正
- 説明の追加・改善
- 翻訳の追加
- 使用例の追加

### 💻 コード貢献
- バグ修正
- 新機能の実装
- パフォーマンス改善
- テストの追加

## 🛠️ 開発環境のセットアップ

### 前提条件

- **Node.js** (v16以上)
- **Git**
- **Google Chrome** (最新版)
- **Google Cloud Platform**アカウント

### セットアップ手順

1. **リポジトリのフォーク**
   ```bash
   # GitHubでフォークボタンをクリック
   git clone https://github.com/YOUR_USERNAME/drive-contents-viewer.git
   cd drive-contents-viewer
   ```

2. **アップストリームの設定**
   ```bash
   git remote add upstream https://github.com/overdozer1124/drive-contents-viewer.git
   ```

3. **開発ブランチの作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Chrome拡張機能の読み込み**
   - Chrome拡張機能管理画面（`chrome://extensions/`）を開く
   - 「デベロッパーモード」を有効化
   - 「パッケージ化されていない拡張機能を読み込む」でプロジェクトフォルダを選択

5. **OAuth設定**
   - [README.md](README.md#-gcp-oauth設定必須)の手順に従ってGCP設定を完了

## 🔄 プルリクエストのプロセス

### 1. Issue の確認
- 新機能や大きな変更の場合、まずIssueで議論
- 既存のIssueがある場合は参照

### 2. ブランチの作成
```bash
# 最新のmainブランチから開始
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

### 3. 開発とテスト
- 小さく、論理的なコミットを作成
- 変更内容をテスト
- ドキュメントの更新

### 4. プルリクエストの作成
- [Pull Request Template](https://github.com/overdozer1124/drive-contents-viewer/compare)を使用
- 変更内容の明確な説明
- 関連するIssueへの参照
- スクリーンショットやGIFの添付（UI変更の場合）

### 5. レビューと改善
- レビューアからのフィードバックに対応
- 必要に応じて追加のコミット
- CI/CDチェックの通過

## 📝 コーディング規約

### JavaScript

```javascript
// ✅ 良い例
const fileList = document.getElementById('file-list');
const API_ENDPOINT = 'https://www.googleapis.com/drive/v3';

function displayFiles(files) {
  if (!files || files.length === 0) {
    showEmptyState();
    return;
  }
  
  files.forEach(file => {
    const fileElement = createFileElement(file);
    fileList.appendChild(fileElement);
  });
}

// ❌ 悪い例
var fl = document.getElementById('file-list');
function df(f) {
  for(var i=0;i<f.length;i++){
    fl.appendChild(cf(f[i]));
  }
}
```

### 命名規則

- **変数・関数**: camelCase
- **定数**: UPPER_SNAKE_CASE
- **CSS クラス**: kebab-case
- **ファイル名**: snake_case または kebab-case

### HTML/CSS

```html
<!-- ✅ 良い例 -->
<div class="file-grid file-grid--compact">
  <div class="file-item" data-file-id="123">
    <img class="file-item__thumbnail" src="..." alt="File thumbnail">
    <span class="file-item__name">Document.pdf</span>
  </div>
</div>
```

```css
/* ✅ 良い例 */
.file-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(var(--columns), 1fr);
}

.file-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-item:hover {
  border-color: #4285f4;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
}
```

### コメント

```javascript
/**
 * Google Drive APIからファイル一覧を取得
 * @param {string} folderId - 取得対象のフォルダID
 * @param {number} maxResults - 最大取得件数
 * @returns {Promise<Array>} ファイル一覧
 */
async function fetchFiles(folderId = 'root', maxResults = 100) {
  // OAuth認証の確認
  const token = await getAuthToken();
  
  // APIリクエストの構築
  const url = `${API_ENDPOINT}/files?${buildQueryParams({
    q: `'${folderId}' in parents and trashed = false`,
    maxResults,
    fields: 'items(id,name,mimeType,thumbnailLink)'
  })}`;
  
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Failed to fetch files:', error);
    throw error;
  }
}
```

## 📋 Issue報告のガイドライン

### バグ報告

**必須情報**:
- Chrome拡張機能のバージョン
- Chromeブラウザのバージョン
- オペレーティングシステム
- 再現手順
- 期待される動作
- 実際の動作
- スクリーンショットやコンソールログ

### 機能要望

**含めるべき内容**:
- 具体的な使用ケース
- 現在の回避策（あれば）
- 期待される利益
- 実装の提案（あれば）

## 📬 コミットメッセージの規約

[Conventional Commits](https://www.conventionalcommits.org/)に基づいた形式を使用：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type の種類

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット等）
- `refactor`: バグ修正でも機能追加でもないコードの変更
- `perf`: パフォーマンス改善
- `test`: テストの追加や修正
- `chore`: ビルドプロセスや補助ツールの変更

### 例

```bash
# 新機能
feat(auth): add OAuth2 refresh token handling

# バグ修正
fix(ui): resolve file grid layout issue on mobile devices

# ドキュメント
docs(readme): add detailed OAuth setup instructions

# リファクタリング
refactor(api): simplify error handling in Drive API calls
```

## 🚀 リリースプロセス

### バージョニング

[Semantic Versioning](https://semver.org/)を使用：

- `MAJOR`: 互換性のない変更
- `MINOR`: 後方互換性のある機能追加
- `PATCH`: 後方互換性のあるバグ修正

### リリース手順

1. **CHANGELOG.mdの更新**
2. **バージョン番号の更新**（manifest.json）
3. **リリースタグの作成**
4. **GitHub Releaseの作成**
5. **Chrome Web Storeへの提出**（メンテナ）

## 🏷️ ラベル管理

### Issue/PR ラベル

- `bug`: バグ報告
- `enhancement`: 新機能・改善
- `documentation`: ドキュメント関連
- `good first issue`: 初心者向け
- `help wanted`: ヘルプ募集
- `priority/high`: 高優先度
- `priority/medium`: 中優先度
- `priority/low`: 低優先度
- `status/in-progress`: 作業中
- `status/needs-review`: レビュー待ち

## ❓ よくある質問

### Q: 小さな変更でもIssueを作る必要がありますか？
A: タイポ修正などの明らかな改善は、直接PRを送っても構いません。ただし、機能的な変更は事前にIssueで議論することをお勧めします。

### Q: 複数の変更を1つのPRに含めても良いですか？
A: 関連する変更であれば問題ありませんが、論理的に分離できる場合は複数のPRに分けることをお勧めします。

### Q: テストはどこで実行すればよいですか？
A: 現在は手動テストを中心としていますが、自動テストの導入を検討中です。Chrome拡張機能として実際に動作確認してください。

## 📞 サポート

質問や不明な点がある場合：

- [GitHub Discussions](https://github.com/overdozer1124/drive-contents-viewer/discussions)
- [GitHub Issues](https://github.com/overdozer1124/drive-contents-viewer/issues)

---

**貢献していただき、ありがとうございます！🎉**