# 🚀 Drive Contents Viewer

**Google Driveのファイルを快適にプレビュー・管理できるChrome拡張機能**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

## 📋 目次

- [概要](#-概要)
- [主な機能](#-主な機能)
- [インストール方法](#-インストール方法)
- [GCP OAuth設定（必須）](#-gcp-oauth設定必須)
- [使用方法](#-使用方法)
- [開発者向け情報](#-開発者向け情報)
- [貢献方法](#-貢献方法)
- [ライセンス](#-ライセンス)

## 🌟 概要

Drive Contents Viewerは、Google Driveのファイルをより効率的に閲覧・管理するためのChrome拡張機能です。直感的なインターフェースで、複数のファイルを同時にプレビューし、ドラッグ&ドロップで整理できます。

### 🎯 こんな方におすすめ

- Google Driveのファイルを頻繁に閲覧する方
- 複数のドキュメントを同時に確認したい方
- ファイルの整理・管理を効率化したい方
- デザイナーやコンテンツクリエイター

## ✨ 主な機能

### 🔍 ファイルプレビュー
- **Google Workspace ファイル**: Docs、Sheets、Slides
- **画像ファイル**: JPEG、PNG、GIF、WebP
- **ドキュメント**: PDF
- **動画ファイル**: MP4、WebM
- **その他**: 直接リンクでの表示

### 🎨 カスタマイズ可能なレイアウト
- **グリッド表示**: 1-5列まで調整可能
- **表示方向**: 横長/縦長の切り替え
- **レスポンシブデザイン**: 画面サイズに自動対応

### 🖱️ 直感的な操作
- **ドラッグ&ドロップ**: ファイルの順序変更
- **ワンクリックアクセス**: ファイルの直接表示
- **URLコピー**: クリップボードへの簡単コピー

### 🌐 多言語対応
- 国際化（i18n）対応
- 英語・日本語サポート

## 🚀 インストール方法

### 方法1: Chrome Web Store（推奨）

> 🚧 **準備中**: Chrome Web Storeでの公開準備中です。

### 方法2: 開発者モード（現在利用可能）

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/overdozer1124/drive-contents-viewer.git
   cd drive-contents-viewer
   ```

2. **Chrome拡張機能管理画面を開く**
   - Chromeで `chrome://extensions/` にアクセス
   - 右上の「デベロッパーモード」を有効化

3. **拡張機能を読み込む**
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - クローンしたフォルダを選択

4. **OAuth設定を完了** （下記の詳細手順参照）

## 🔐 GCP OAuth設定（必須）

Google Drive APIを使用するため、Google Cloud Platform（GCP）でのOAuth設定が必要です。

### 📋 事前準備

- Googleアカウント
- Google Cloud Platformアカウント（無料）

### 🔧 ステップ1: Google Cloud Projectの作成

1. **Google Cloud Consoleにアクセス**
   ```
   https://console.cloud.google.com/
   ```

2. **新しいプロジェクトを作成**
   - 「プロジェクトを選択」→「新しいプロジェクト」
   - プロジェクト名: `drive-contents-viewer`（任意）
   - 「作成」をクリック

### 🔧 ステップ2: Google Drive APIの有効化

1. **APIライブラリにアクセス**
   - 左メニュー「APIとサービス」→「ライブラリ」

2. **Google Drive APIを検索・有効化**
   - 検索ボックスに「Google Drive API」と入力
   - 「Google Drive API」を選択
   - 「有効にする」をクリック

### 🔧 ステップ3: OAuth同意画面の設定

1. **OAuth同意画面にアクセス**
   - 左メニュー「APIとサービス」→「OAuth同意画面」

2. **基本情報を入力**
   - ユーザータイプ: 「外部」を選択
   - アプリ名: `Drive Contents Viewer`
   - ユーザーサポートメール: あなたのメールアドレス
   - デベロッパーの連絡先情報: あなたのメールアドレス

3. **スコープの設定**
   - 「スコープを追加または削除」をクリック
   - 以下のスコープを追加:
     ```
     ../auth/drive.readonly
     ../auth/drive.metadata.readonly
     ```

4. **テストユーザーの追加**
   - 「テストユーザー」タブで自分のメールアドレスを追加

### 🔧 ステップ4: OAuth認証情報の作成

1. **認証情報ページにアクセス**
   - 左メニュー「APIとサービス」→「認証情報」

2. **OAuth クライアントIDを作成**
   - 「認証情報を作成」→「OAuth クライアント ID」
   - アプリケーションの種類: 「ウェブアプリケーション」
   - 名前: `Drive Contents Viewer Extension`

3. **拡張機能IDを取得**
   - Chromeの拡張機能管理画面で、読み込んだ拡張機能のIDをコピー
   - 例: `abcdefghijklmnopqrstuvwxyz123456`

4. **承認済みJavaScript生成元を設定**
   ```
   chrome-extension://[YOUR_EXTENSION_ID]
   ```
   - `[YOUR_EXTENSION_ID]`を実際のIDに置き換え

5. **クライアントIDをコピー**
   - 作成されたクライアントIDをコピー

### 🔧 ステップ5: 拡張機能の設定

1. **manifest.jsonの編集**
   ```json
   {
     "oauth2": {
       "client_id": "YOUR_CLIENT_ID_HERE.apps.googleusercontent.com",
       "scopes": [
         "https://www.googleapis.com/auth/drive.readonly",
         "https://www.googleapis.com/auth/drive.metadata.readonly"
       ]
     }
   }
   ```

2. **拡張機能の再読み込み**
   - Chrome拡張機能管理画面で「更新」ボタンをクリック

3. **動作確認**
   - 拡張機能アイコンをクリック
   - 認証画面が表示されれば設定完了

## 🎮 使用方法

### 基本操作

1. **拡張機能の起動**
   - ツールバーの拡張機能アイコンをクリック

2. **Google Driveへの接続**
   - 初回起動時に認証画面が表示
   - Googleアカウントでサインイン

3. **ファイルの閲覧**
   - 自動的にマイドライブのファイルが表示
   - ファイルをクリックでプレビュー

### 便利な機能

#### 📐 レイアウトの調整
- **列数変更**: 右上のボタンで1-5列に調整
- **表示方向**: 横長/縦長の切り替え

#### 🔄 ファイルの整理
- **ドラッグ&ドロップ**: ファイルを他の位置に移動
- **URLコピー**: ファイル名の右クリックでURLをコピー

#### 🔍 ファイルの検索
- **フォルダ移動**: フォルダをクリックで中身を表示
- **戻る**: 上部の「←」ボタンで前のフォルダに戻る

## 🛠️ 開発者向け情報

### 技術仕様

- **Manifest Version**: 3
- **API**: Google Drive API v3
- **認証**: OAuth 2.0
- **UI Framework**: Vanilla JavaScript + CSS Grid
- **国際化**: Chrome Extension i18n API

### ファイル構成

```
drive-contents-viewer/
├── manifest.json          # 拡張機能の設定
├── background.js          # バックグラウンドスクリプト
├── preview.html           # メインUI
├── preview.js             # UI制御ロジック
├── content_script.js      # コンテンツスクリプト
└── _locales/             # 多言語対応
    └── en/
        └── messages.json
```

### ローカル開発

1. **リポジトリのフォーク**
   ```bash
   git clone https://github.com/your-username/drive-contents-viewer.git
   ```

2. **開発サーバーの起動**
   ```bash
   # 特別なサーバーは不要
   # Chromeに直接読み込んで開発
   ```

3. **デバッグ**
   - Chrome DevToolsでコンソールを確認
   - `background.js`のログを確認

## 🤝 貢献方法

貢献を歓迎します！詳細は[CONTRIBUTING.md](CONTRIBUTING.md)をご覧ください。

### 🐛 バグ報告

- [Issue Template](https://github.com/overdozer1124/drive-contents-viewer/issues/new?template=bug_report.md)を使用

### ✨ 機能要望

- [Feature Request Template](https://github.com/overdozer1124/drive-contents-viewer/issues/new?template=feature_request.md)を使用

### 🔄 プルリクエスト

1. フォークしてブランチを作成
2. 変更を実装
3. テストを実行
4. プルリクエストを送信

## 🔒 セキュリティ

セキュリティの問題を発見した場合は、[SECURITY.md](SECURITY.md)の手順に従って報告してください。

## 📄 ライセンス

このプロジェクトはMIT Licenseの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

## 🙏 謝辞

- Google Drive API
- Chrome Extension API
- オープンソースコミュニティ

## 📞 サポート

- **Issues**: [GitHub Issues](https://github.com/overdozer1124/drive-contents-viewer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/overdozer1124/drive-contents-viewer/discussions)
- **Email**: [プロジェクトページ](https://github.com/overdozer1124/drive-contents-viewer)のContactから

---

**⭐ このプロジェクトが役に立ったら、ぜひスターを付けてください！**