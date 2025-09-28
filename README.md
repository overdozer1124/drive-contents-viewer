# Drive Contents Viewer

Google Driveのファイルを快適にプレビュー・管理できるChrome拡張機能です。

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ⚡ クイックスタート

初めての方向けの簡単セットアップガイド（5分で完了）

### 1️⃣ ダウンロード
```bash
git clone https://github.com/overdozer1124/drive-contents-viewer.git
```

### 2️⃣ Chrome拡張機能をロード
1. Chrome で `chrome://extensions/` を開く
2. 「デベロッパーモード」を ON
3. 「パッケージ化されていない拡張機能を読み込む」
4. ダウンロードしたフォルダを選択

### 3️⃣ 拡張機能IDをコピー
- ロードされた拡張機能の「ID」をメモ帳にコピー

### 4️⃣ Google Cloud Console設定
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクト作成
3. Google Drive API を有効化
4. OAuth2クライアントID作成
   - 承認済みJavaScript生成元: `chrome-extension://[拡張機能ID]`

### 5️⃣ 設定ファイル更新
`manifest.json` の client_id を更新:
```json
"client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com"
```

### 6️⃣ 完了！
1. Chrome拡張機能を再読み込み
2. Google Drive を開いて拡張機能アイコンをクリック
3. 初回認証後、ファイルプレビューを楽しもう！

> 💡 **トラブル時**: [詳細なセットアップガイド](#-インストール方法) をご確認ください

## 🚀 主な機能

- **📁 Google Drive連携**: OAuth2認証でGoogle Driveに安全にアクセス
- **👀 ファイルプレビュー**: Docs、Sheets、Slides、画像、PDFなどを直接プレビュー
- **🎨 柔軟なレイアウト**: 1-5列のグリッド表示、縦横表示の切り替え
- **🔗 便利な操作**: ワンクリックでファイル表示・URLコピー
- **📱 レスポンシブ**: デスクトップ・タブレット・モバイル対応
- **🔄 ドラッグ&ドロップ**: ファイルの順序をドラッグで変更可能

## 📸 スクリーンショット

※ここにスクリーンショットを追加してください

## 🛠 インストール方法

### 1. リポジトリをダウンロード

```bash
git clone https://github.com/overdozer1124/drive-contents-viewer.git
cd drive-contents-viewer
```

または、[Releases](https://github.com/overdozer1124/drive-contents-viewer/releases)から最新版をダウンロード

### 2. Google Cloud Platform でのOAuth設定

**⚠️ 重要**: この拡張機能を使用するには、Google Cloud PlatformでのOAuth2設定が必要です。

#### 📋 事前準備

- Googleアカウント（無料）
- Chrome ブラウザ
- インターネット接続

#### 🔧 詳細設定手順

<details>
<summary><strong>📝 ステップ1: Google Cloud Consoleプロジェクトの作成</strong></summary>

1. **Google Cloud Console**にアクセス
   - [https://console.cloud.google.com/](https://console.cloud.google.com/)

2. **新しいプロジェクトを作成**
   - 画面上部の「プロジェクトを選択」をクリック
   - 「新しいプロジェクト」をクリック
   - プロジェクト名: `drive-contents-viewer`（任意の名前）
   - 「作成」をクリック

3. **プロジェクトを選択**
   - 作成したプロジェクトが選択されていることを確認

</details>

<details>
<summary><strong>🔌 ステップ2: Google Drive APIの有効化</strong></summary>

1. **APIライブラリにアクセス**
   - 左側メニューから「APIとサービス」→「ライブラリ」をクリック

2. **Google Drive APIを検索**
   - 検索ボックスに「Google Drive API」と入力
   - 「Google Drive API」をクリック

3. **APIを有効化**
   - 「有効にする」ボタンをクリック
   - 有効化完了まで数分待機

</details>

<details>
<summary><strong>🔐 ステップ3: OAuth同意画面の設定</strong></summary>

1. **OAuth同意画面にアクセス**
   - 左側メニューから「APIとサービス」→「OAuth同意画面」をクリック

2. **ユーザータイプを選択**
   - 「外部」を選択
   - 「作成」をクリック

3. **アプリ情報を入力**
   - **アプリ名**: `Drive Contents Viewer`
   - **ユーザーサポートメール**: あなたのGmailアドレス
   - **デベロッパーの連絡先情報**: 同じGmailアドレス
   - 「保存して次へ」をクリック

4. **スコープを設定**
   - 「スコープを追加または削除」をクリック
   - 以下のスコープを追加:
     - `../auth/drive.readonly`
     - `../auth/drive.metadata.readonly`
   - 「更新」をクリック
   - 「保存して次へ」をクリック

5. **テストユーザーを追加**
   - 「テストユーザーを追加」をクリック
   - あなたのGmailアドレスを追加
   - 「保存して次へ」をクリック

6. **概要を確認**
   - 設定内容を確認
   - 「ダッシュボードに戻る」をクリック

</details>

<details>
<summary><strong>🔑 ステップ4: OAuth2クライアントIDの作成</strong></summary>

1. **認証情報にアクセス**
   - 左側メニューから「APIとサービス」→「認証情報」をクリック

2. **認証情報を作成**
   - 「認証情報を作成」→「OAuth クライアント ID」をクリック

3. **アプリケーションタイプを選択**
   - 「ウェブアプリケーション」を選択

4. **名前を入力**
   - 名前: `Drive Contents Viewer Extension`

5. **承認済みのJavaScript生成元を設定**
   - 「URIを追加」をクリック
   - `chrome-extension://[EXTENSION-ID]` を追加
   - ※ EXTENSION-IDは次のステップで取得

6. **作成完了**
   - 「作成」をクリック
   - **クライアントID**をコピーして保存

</details>

### 3. Chrome拡張機能の設定

#### 📝 ステップ1: 拡張機能IDの取得

1. **Chrome拡張機能をロード**
   - Chromeで `chrome://extensions/` を開く
   - 「デベロッパーモード」を有効にする
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - ダウンロードした `drive-contents-viewer` フォルダを選択

2. **拡張機能IDをコピー**
   - ロードされた拡張機能の「ID」をコピー
   - 例: `abcdefghijklmnopqrstuvwxyz123456`

#### 🔧 ステップ2: OAuth設定の更新

1. **Google Cloud Consoleに戻る**
   - 先ほど作成したOAuth2クライアントIDを編集
   - 承認済みのJavaScript生成元に以下を追加:
     ```
     chrome-extension://[拡張機能ID]
     ```

2. **manifest.jsonを更新**
   - `manifest.json` ファイルを開く
   - `oauth2` セクションの `client_id` を更新:
   ```json
   "oauth2": {
     "client_id": "あなたのクライアントID.apps.googleusercontent.com",
     "scopes": [
       "https://www.googleapis.com/auth/drive.readonly",
       "https://www.googleapis.com/auth/drive.metadata.readonly"
     ]
   }
   ```

3. **拡張機能を再読み込み**
   - Chrome拡張機能ページで「再読み込み」をクリック

## 🎯 使用方法

### 基本的な使い方

1. **Google Driveにアクセス**
   - [Google Drive](https://drive.google.com/) を開く
   - 表示したいフォルダに移動

2. **拡張機能を起動**
   - ツールバーの拡張機能アイコンをクリック
   - 新しいタブでプレビュー画面が開く

3. **ファイルの操作**
   - **表示**: ファイル名の左の「View file」をクリック
   - **URLコピー**: ファイル名の右の「Copy link」をクリック
   - **順序変更**: ファイルをドラッグ&ドロップ

### レイアウト設定

- **表示列数**: スライダーで1-5列まで調整
- **表示方向**: 横長/縦長の切り替え
- **レスポンシブ**: 画面サイズに応じて自動調整

## 🔧 対応ファイル形式

| ファイル形式 | プレビュー方法 |
|-------------|----------------|
| Google Docs | 埋め込みプレビュー |
| Google Sheets | 埋め込みプレビュー |
| Google Slides | 埋め込みプレビュー |
| 画像 (JPEG, PNG, GIF) | 直接表示 |
| PDF | 埋め込みプレビュー |
| 動画 (MP4, MOV, AVI, MKV, WebM) | プレビュープレーヤー |
| その他 | 直接リンク |

## ⚡ 技術仕様

- **Manifest Version**: 3.0
- **最小Chrome Version**: 88+
- **Permissions**: 
  - `activeTab` - アクティブタブへのアクセス
  - `scripting` - スクリプト実行
  - `tabs` - タブ情報の取得
  - `identity` - OAuth認証
- **APIs**: 
  - Google Drive API v3
  - Chrome Extensions API
  - Chrome Identity API

## 🚨 トラブルシューティング

### よくある問題と解決方法

<details>
<summary><strong>❌ "OAuth2 request failed: Service responded with error: 'bad client id'"</strong></summary>

**原因**: OAuth2クライアントIDが正しく設定されていない

**解決方法**:
1. Google Cloud Consoleで正しいクライアントIDをコピー
2. `manifest.json` の `client_id` を更新
3. 拡張機能を再読み込み

</details>

<details>
<summary><strong>❌ "Catalog file is missing for locale en"</strong></summary>

**原因**: 国際化ファイルが不足している

**解決方法**:
1. `_locales/en/messages.json` ファイルが存在することを確認
2. ファイルが正しい形式であることを確認

</details>

<details>
<summary><strong>❌ ファイルがプレビューされない</strong></summary>

**原因**: 権限設定やAPI有効化の問題

**解決方法**:
1. Google Drive APIが有効になっていることを確認
2. OAuth同意画面で正しいスコープが設定されていることを確認
3. テストユーザーとして自分が追加されていることを確認

</details>

<details>
<summary><strong>❌ 認証画面が表示されない</strong></summary>

**原因**: ポップアップブロックまたは拡張機能の権限問題

**解決方法**:
1. ポップアップブロックを無効にする
2. Chrome拡張機能の権限を確認
3. Chromeを再起動

</details>

## 🛡️ プライバシーとセキュリティ

- **データの取り扱い**: ファイルデータはローカルでのみ処理され、外部サーバーに送信されません
- **権限**: 読み取り専用権限のみを使用（ファイルの変更・削除は不可）
- **認証**: Google OAuth2による安全な認証
- **ローカル実行**: すべての処理はブラウザ内で完結

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### 開発環境のセットアップ

```bash
git clone https://github.com/overdozer1124/drive-contents-viewer.git
cd drive-contents-viewer
```

### バグ報告・機能要望

[Issues](https://github.com/overdozer1124/drive-contents-viewer/issues)から報告してください。

### プルリクエスト

1. フォークを作成
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🙏 謝辞

- Google Drive API
- Chrome Extensions API
- すべてのコントリビューター

## 📞 サポート

- **バグ報告**: [GitHub Issues](https://github.com/overdozer1124/drive-contents-viewer/issues)
- **機能要望**: [GitHub Discussions](https://github.com/overdozer1124/drive-contents-viewer/discussions)
- **質問**: [GitHub Discussions](https://github.com/overdozer1124/drive-contents-viewer/discussions)

---

**⭐ このプロジェクトが気に入ったら、GitHubでスターを付けてください！**