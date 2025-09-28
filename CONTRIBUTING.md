# コントリビューションガイド

Drive Contents Viewerプロジェクトへの貢献に興味を持っていただき、ありがとうございます！

## 🚀 始める前に

### 必要な知識・ツール

- JavaScript (ES6+)
- Chrome Extensions API
- Google Drive API
- Git/GitHub

### 開発環境

- Node.js (推奨: 18+)
- Chrome ブラウザ
- エディタ (VS Code推奨)

## 🛠 開発環境のセットアップ

1. **リポジトリをフォーク**
   ```bash
   # GitHubでフォークを作成後
   git clone https://github.com/[your-username]/drive-contents-viewer.git
   cd drive-contents-viewer
   ```

2. **開発ブランチを作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Chrome拡張機能として読み込み**
   - `chrome://extensions/` を開く
   - デベロッパーモードを有効
   - 「パッケージ化されていない拡張機能を読み込む」

## 📝 コントリビューションの種類

### 🐛 バグ報告

バグを発見した場合：

1. **既存のIssueを確認**
   - 同じ問題が報告されていないかチェック

2. **新しいIssueを作成**
   - 明確なタイトル
   - 再現手順
   - 期待される動作 vs 実際の動作
   - 環境情報（Chrome版本、OS）
   - スクリーンショット（可能であれば）

### ✨ 機能提案

新機能のアイデアがある場合：

1. **Discussionsで議論**
   - まずは[GitHub Discussions](https://github.com/overdozer1124/drive-contents-viewer/discussions)で提案

2. **Issue作成**
   - 機能の詳細説明
   - 使用ケース
   - 実装方法のアイデア（あれば）

### 🔧 コードの貢献

#### プルリクエストの流れ

1. **Issue確認**
   - 既存のIssueにアサインされているか確認
   - 新しい機能の場合は事前にIssueを作成

2. **コード作成**
   - 一貫したコーディングスタイルを保持
   - 適切なコメントを追加
   - テスト可能な小さな変更に分割

3. **テスト**
   - 変更が既存機能に影響しないことを確認
   - 新機能が正常に動作することを確認

4. **プルリクエスト作成**
   - 明確なタイトルと説明
   - 関連するIssue番号を記載
   - 変更内容のスクリーンショット（UI変更の場合）

## 📋 コーディング規約

### JavaScript

```javascript
// 変数名: camelCase
const fileName = 'example.js';

// 関数名: camelCase
function updateLayout(columns) {
  // 実装
}

// 定数: UPPER_SNAKE_CASE
const MAX_COLUMNS = 5;

// 非同期関数: async/await推奨
async function fetchDriveContents(token, driveInfo) {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### CSS

```css
/* クラス名: kebab-case */
.file-item {
  /* プロパティはアルファベット順 */
  background-color: white;
  border-radius: 8px;
  cursor: move;
  overflow: hidden;
}

/* 適切なインデント（2スペース） */
.file-item:hover {
  transform: scale(1.02);
}
```

### HTML

```html
<!-- 適切なインデント -->
<div class="file-item">
  <div class="file-name">
    <span class="file-title">ファイル名</span>
  </div>
</div>

<!-- 属性は適切に設定 -->
<input type="range" id="column-slider" min="1" max="5" value="3">
```

## 🧪 テスト

### 手動テスト

1. **基本機能**
   - OAuth認証
   - ファイル一覧表示
   - プレビュー機能
   - レイアウト変更

2. **エラーハンドリング**
   - ネットワークエラー
   - 認証失敗
   - 権限不足

3. **ブラウザサポート**
   - Chrome最新版
   - Chrome安定版

### テスト環境

```javascript
// テストモードの使用
// manifest_test.json を使用してOAuth無しでテスト
```

## 📖 ドキュメント

### コメント

```javascript
/**
 * Google Driveからファイル一覧を取得する
 * @param {string} token - OAuth2アクセストークン
 * @param {Object} driveInfo - ドライブ情報
 * @param {string} driveInfo.folderId - フォルダID
 * @param {boolean} driveInfo.isMyDrive - マイドライブかどうか
 * @returns {Promise<Object>} ファイル一覧
 */
async function fetchDriveContents(token, { folderId, isMyDrive }) {
  // 実装
}
```

### README更新

- 新機能追加時はREADMEも更新
- スクリーンショットも更新（必要に応じて）

## 🔍 レビュープロセス

### プルリクエストレビュー

1. **自動チェック**
   - コードスタイル
   - 基本的な動作確認

2. **人的レビュー**
   - コード品質
   - 設計の妥当性
   - ユーザビリティ
   - セキュリティ

3. **テスト**
   - 機能テスト
   - 回帰テスト
   - パフォーマンステスト

### レビュー対応

- フィードバックには建設的に対応
- 必要に応じて修正コミットを追加
- レビュアーとの議論を歓迎

## 🚀 リリースプロセス

### バージョニング

セマンティックバージョニング（SemVer）を使用：

- **MAJOR**: 互換性のない変更
- **MINOR**: 後方互換性のある機能追加
- **PATCH**: 後方互換性のあるバグ修正

例: `1.2.3`

### リリース手順

1. **変更履歴更新**
2. **バージョン番号更新**
3. **タグ作成**
4. **リリースノート作成**

## ❓ 質問・サポート

### 連絡方法

1. **GitHub Discussions** (推奨)
   - 一般的な質問
   - 機能提案の議論
   - 開発方針の相談

2. **GitHub Issues**
   - バグ報告
   - 具体的な問題

3. **プルリクエスト**
   - コードレビュー
   - 実装に関する質問

### 質問のガイドライン

- 明確で具体的な質問
- 関連する情報を含める
- 既存の情報を確認してから質問

## 🎉 認識・謝辞

貢献者の皆様：

- コードコントリビューター
- バグ報告者
- 機能提案者
- ドキュメント改善者
- テスター

すべての貢献に感謝いたします！

## 📜 行動規範

### 私たちの約束

- 尊重と包容力のあるコミュニティ
- 建設的なフィードバック
- 学習と成長を支援

### 期待される行動

- 礼儀正しく専門的な対応
- 異なる意見や経験の尊重
- 建設的な批判とフィードバック
- コミュニティへの貢献

### 許可されない行動

- 嫌がらせや差別的発言
- 個人攻撃や政治的議論
- スパムや無関係な投稿

---

再度、Drive Contents Viewerへの貢献をご検討いただき、ありがとうございます！