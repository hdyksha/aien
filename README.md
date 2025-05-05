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

### インストールと実行

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/aien.git
cd aien

# 依存関係のインストールと環境設定（一括実行）
npm run setup

# 開発サーバーの起動（クライアントとサーバーを同時に起動）
npm run dev
```

これにより、サーバーは http://localhost:3000 で、クライアントは http://localhost:3001 で起動します。

### その他のコマンド

```bash
# テストの実行
npm test

# リンターの実行
npm run lint

# ビルド
npm run build
```

## プロジェクト構造

```
aien/
├── client/                # フロントエンドコード
│   ├── public/            # 静的ファイル
│   ├── src/
│   │   ├── assets/        # 画像、フォントなど
│   │   ├── components/    # UIコンポーネント
│   │   │   ├── common/    # 汎用コンポーネント
│   │   │   ├── chat/      # チャット関連コンポーネント
│   │   │   └── vocabulary/# 単語学習関連コンポーネント
│   │   ├── hooks/         # カスタムフック
│   │   ├── pages/         # ページコンポーネント
│   │   ├── services/      # APIサービス
│   │   ├── store/         # 状態管理
│   │   ├── types/         # 型定義
│   │   └── utils/         # ユーティリティ関数
│   ├── tests/             # テストファイル
│   └── ...
├── server/                # バックエンドコード
│   ├── src/
│   │   ├── controllers/   # リクエストハンドラ
│   │   ├── models/        # データモデル
│   │   ├── routes/        # ルート定義
│   │   ├── services/      # ビジネスロジック
│   │   │   ├── ai/        # AI統合サービス
│   │   │   ├── chat/      # チャットサービス
│   │   │   └── vocabulary/# 単語学習サービス
│   │   ├── types/         # 型定義
│   │   └── utils/         # ユーティリティ関数
│   ├── tests/             # テストファイル
│   └── ...
├── docs/                  # プロジェクトドキュメント
│   ├── plans/             # 開発計画書
│   │   └── phase1-implementation-plan.md  # フェーズ1実装計画
│   ├── architecture.md    # アーキテクチャ設計
│   └── api-spec.md        # API仕様書
├── .github/               # GitHub関連設定
│   └── workflows/         # GitHub Actions
├── scripts/               # 開発・デプロイスクリプト
├── specs.md               # 要件定義書
├── AmazonQ.md             # 開発ルール
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
