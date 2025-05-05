# AIEN - AI English Learning Application

AIENは、AIを活用した英語学習をサポートするアプリケーションです。ユーザーがAIとの英語チャットを通じて自然な英会話を練習し、語彙力を向上させることを目的としています。

## 機能概要

- AIとの英語テキストチャット
- チャット中に出現した未知の単語の学習サポート
- 単語帳機能による語彙力強化
- 将来的に音声会話機能を実装予定

## 技術スタック

- **フロントエンド**: React + TypeScript
- **バックエンド**: TypeScript + Node.js
- **AI統合**: 
  - フェーズ1: Ollama
  - フェーズ2: Amazon Bedrock
- **開発ツール**:
  - Linter/Formatter: Biome
  - テスト: Vitest

## 開発セットアップ

### 必要条件

- Node.js 18.x以上
- npm 9.x以上
- Ollama（ローカル開発用）

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/aien.git
cd aien

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## プロジェクト構造

```
aien/
├── client/             # フロントエンドコード
│   ├── src/
│   │   ├── components/ # UIコンポーネント
│   │   ├── hooks/      # カスタムフック
│   │   ├── pages/      # ページコンポーネント
│   │   └── services/   # APIサービス
│   └── ...
├── server/             # バックエンドコード
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── ...
├── specs.md            # 要件定義書
└── ...
```

## 貢献方法

1. このリポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュする (`git push origin feature/amazing-feature`)
5. プルリクエストを作成する

## ライセンス

[MIT](LICENSE)

## 詳細情報

詳細な仕様については[specs.md](specs.md)を参照してください。
