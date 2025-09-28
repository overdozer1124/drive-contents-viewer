# 🛡️ セキュリティポリシー

Drive Contents Viewerプロジェクトのセキュリティを真剣に受け止めています。このドキュメントでは、セキュリティの脆弱性を報告する方法と、プロジェクトのセキュリティ対策について説明します。

## 📋 目次

- [サポートされているバージョン](#-サポートされているバージョン)
- [脆弱性の報告](#-脆弱性の報告)
- [セキュリティ対策](#-セキュリティ対策)
- [認証とアクセス制御](#-認証とアクセス制御)
- [データ保護](#-データ保護)
- [セキュリティベストプラクティス](#-セキュリティベストプラクティス)
- [定期的な監査](#-定期的な監査)

## 🔍 サポートされているバージョン

以下のバージョンがセキュリティアップデートの対象です：

| バージョン | サポート状況 |
| ------- | ------------ |
| 1.0.x   | ✅ サポート中 |
| < 1.0   | ❌ サポート終了 |

## 🚨 脆弱性の報告

### 🔒 責任ある開示

セキュリティの脆弱性を発見した場合は、以下の手順に従って報告してください：

### 1. **即座に報告**

**公開のIssue追跡システムは使用しないでください。** 代わりに、以下の方法で非公開で報告してください：

- **GitHub Security Advisory**: [プライベート脆弱性報告](https://github.com/overdozer1124/drive-contents-viewer/security/advisories/new)
- **Email**: セキュリティ問題専用のメールアドレス（[GitHub プロファイル](https://github.com/overdozer1124)から確認）

### 2. **報告に含めるべき情報**

以下の情報を可能な限り詳細に提供してください：

```markdown
## 脆弱性の概要
- **脆弱性の種類**: (例: XSS、CSRF、権限昇格等)
- **影響度**: Critical / High / Medium / Low
- **影響範囲**: 影響を受けるコンポーネントやファイル

## 技術的詳細
- **再現手順**: 詳細なステップバイステップ
- **影響**: どのような問題が発生するか
- **攻撃シナリオ**: 悪用される可能性のあるケース

## 環境情報
- Chrome拡張機能のバージョン
- Chromeブラウザのバージョン
- オペレーティングシステム

## 証拠
- スクリーンショット
- ログファイル
- 概念実証コード（PoC）
```

### 3. **期待される対応時間**

- **24時間以内**: 報告の受領確認
- **48時間以内**: 初期評価と重要度の分類
- **7日以内**: 詳細な調査結果と対応計画
- **30日以内**: 修正版のリリース（重要度による）

## 🔐 セキュリティ対策

### Chrome拡張機能固有のセキュリティ

#### **Manifest V3 使用**
```json
{
  "manifest_version": 3,
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

#### **最小権限の原則**
```json
{
  "permissions": [
    "identity"
  ],
  "host_permissions": [
    "https://www.googleapis.com/*"
  ]
}
```

#### **セキュアなOAuth実装**
- OAuth 2.0 PKCE（Proof Key for Code Exchange）の使用
- アクセストークンの適切な管理
- リフレッシュトークンの安全な保存

### API セキュリティ

#### **Google Drive API**
- **最小必要スコープ**: `drive.readonly` と `drive.metadata.readonly` のみ
- **トークン検証**: すべてのAPIリクエストでトークンの有効性を確認
- **レート制限**: API呼び出し回数の制限

#### **HTTPS 強制**
すべての外部通信でHTTPSを使用：
```javascript
const API_BASE_URL = 'https://www.googleapis.com/drive/v3';

// ❌ 使用禁止
// const API_BASE_URL = 'http://www.googleapis.com/drive/v3';
```

## 🔑 認証とアクセス制御

### OAuth 2.0 実装

```javascript
// セキュアなOAuth実装例
class SecureAuthManager {
  constructor() {
    this.clientId = 'YOUR_CLIENT_ID';
    this.scopes = [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.metadata.readonly'
    ];
  }

  async getAuthToken() {
    try {
      const token = await chrome.identity.getAuthToken({
        interactive: true,
        scopes: this.scopes
      });
      
      // トークンの検証
      if (!this.validateToken(token)) {
        throw new Error('Invalid token received');
      }
      
      return token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  validateToken(token) {
    // トークンの形式とexpiration時間をチェック
    return token && typeof token === 'string' && token.length > 0;
  }

  async revokeToken() {
    // セッション終了時にトークンを無効化
    await chrome.identity.removeCachedAuthToken({ token: this.currentToken });
  }
}
```

### アクセス制御

- **最小権限**: 必要最小限の権限のみ要求
- **権限の検証**: 各操作前に権限を確認
- **セッション管理**: 適切なセッションタイムアウト

## 📊 データ保護

### データの取り扱い

#### **機密情報の非保存**
```javascript
// ✅ 推奨: メモリ内での一時的な処理
function processFileData(fileData) {
  // ファイルデータの処理
  const processedData = transform(fileData);
  
  // 処理後は即座にクリア
  fileData = null;
  
  return processedData;
}

// ❌ 禁止: 機密データの永続化
// localStorage.setItem('userData', JSON.stringify(sensitiveData));
```

#### **ログ出力の制限**
```javascript
// ✅ プロダクション環境での安全なログ出力
function secureLog(message, data = null) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  } else {
    // プロダクションでは機密情報を除外
    console.log(message);
  }
}

// ❌ 機密情報のログ出力は禁止
// console.log('User token:', authToken);
```

### データ送信の暗号化

すべての外部通信は暗号化：
```javascript
// HTTPS接続の強制
function makeSecureRequest(url, options = {}) {
  if (!url.startsWith('https://')) {
    throw new Error('HTTPS required for all external requests');
  }
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
}
```

## 🛠️ セキュリティベストプラクティス

### 開発時のセキュリティ

#### **入力検証**
```javascript
function sanitizeFileName(fileName) {
  if (typeof fileName !== 'string') {
    throw new Error('File name must be a string');
  }
  
  // 危険な文字の除去
  return fileName
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\.\.+/g, '.')
    .trim();
}

function validateFileId(fileId) {
  const fileIdPattern = /^[a-zA-Z0-9_-]+$/;
  if (!fileIdPattern.test(fileId)) {
    throw new Error('Invalid file ID format');
  }
  return fileId;
}
```

#### **エラーハンドリング**
```javascript
function handleApiError(error) {
  // 詳細なエラー情報をログに記録（開発環境のみ）
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error Details:', error);
  }
  
  // ユーザーには一般的なエラーメッセージのみ表示
  return {
    success: false,
    message: 'An error occurred. Please try again later.'
  };
}
```

### コードレビューのセキュリティチェックリスト

- [ ] OAuth実装が適切か
- [ ] 最小権限の原則が守られているか
- [ ] 機密情報がログ出力されていないか
- [ ] 入力検証が適切に行われているか
- [ ] エラーハンドリングが適切か
- [ ] HTTPS通信が強制されているか
- [ ] トークンの管理が適切か

## 🔍 定期的な監査

### セキュリティ監査スケジュール

- **月次**: 依存関係の脆弱性チェック
- **四半期**: コードセキュリティレビュー
- **年次**: 包括的なセキュリティ監査

### 自動化されたセキュリティチェック

```bash
# 依存関係の脆弱性チェック（準備中）
npm audit

# コードの静的解析（準備中）
npm run security-scan
```

## 📝 セキュリティ更新の通知

セキュリティアップデートは以下の方法で通知されます：

1. **GitHub Security Advisory**
2. **リリースノート**でのセキュリティ修正の明記
3. **CHANGELOG.md**での詳細な変更内容
4. **Chrome Web Store**での拡張機能更新

## 🏆 謝辞

セキュリティの向上にご協力いただいた方々：

- [責任ある開示](https://en.wikipedia.org/wiki/Responsible_disclosure)に従って報告いただいた研究者の皆様
- セキュリティレビューにご協力いただいたコミュニティの皆様

## 📞 お問い合わせ

セキュリティに関する質問や懸念がある場合：

- **Security Advisory**: [GitHub Security](https://github.com/overdozer1124/drive-contents-viewer/security)
- **General Security Questions**: [GitHub Discussions](https://github.com/overdozer1124/drive-contents-viewer/discussions)

---

**セキュリティは継続的なプロセスです。皆様のご協力とフィードバックに感謝いたします。**