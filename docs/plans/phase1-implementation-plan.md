# AIEN フェーズ1 実装計画

このドキュメントは、AIENプロジェクトのフェーズ1における実装計画を詳細に記述したものです。フェーズ1では、テキストベースのAIチャット機能と基本的な単語学習機能の実装を目標とします。

## 1. 全体スケジュール

フェーズ1の開発期間は全体で12週間を予定しています。

| 週 | 主な目標 | 進捗 |
|----|---------|------|
| 1-2 | プロジェクト設定、基本アーキテクチャの構築 | □ |
| 3-5 | チャット機能の基本実装 | □ |
| 6-8 | 単語学習機能の実装 | □ |
| 9-10 | Ollama統合とAI応答の最適化 | □ |
| 11-12 | テスト、バグ修正、ドキュメント整備 | □ |

## 2. 機能別実装計画

### 2.1 プロジェクト設定（週1-2）

#### タスク
- [x] プロジェクト構造の設定
- [x] 開発環境の構築（Biome, Vitest等）
- [ ] 基本的なUIフレームワークの選定と導入

#### 成果物
- [x] 動作する開発環境
- [x] 基本的なプロジェクト構造

### 2.2 チャット機能（週3-5）

#### タスク
- [ ] チャットUIコンポーネントの実装
- [ ] メッセージの送受信機能
- [ ] チャット履歴の保存と表示
- [ ] バックエンドAPIの実装

#### 成果物
- [ ] チャットインターフェース
- [ ] メッセージ送受信機能
- [ ] チャット履歴表示機能
- [ ] バックエンドAPI

#### 技術的詳細
- [ ] WebSocketを使用したリアルタイム通信
- [ ] メッセージデータモデル設計
- [ ] チャット履歴の永続化（ローカルストレージまたはデータベース）

### 2.3 単語学習機能（週6-8）

#### タスク
- [ ] 未知の単語検出アルゴリズムの実装
- [ ] 単語情報表示UIの開発
- [ ] 単語保存機能の実装
- [ ] 単語リスト管理画面の開発

#### 成果物
- [ ] 単語検出機能
- [ ] 単語情報表示コンポーネント
- [ ] 単語保存・管理機能
- [ ] 単語リスト画面

#### 技術的詳細
- [ ] 単語難易度判定アルゴリズム
- [ ] 単語データモデル設計
- [ ] 外部辞書APIとの連携（必要に応じて）

### 2.4 Ollama統合（週9-10）

#### タスク
- [ ] Ollamaとの連携実装
- [ ] AIモデル応答の最適化
- [ ] 学習レベルに応じた応答調整機能
- [ ] エラーハンドリングとフォールバック機構

#### 成果物
- [ ] Ollama統合サービス
- [ ] AI応答最適化機能
- [ ] レベル調整機能
- [ ] エラーハンドリング機構

#### 技術的詳細
- [ ] Ollama APIの利用方法
- [ ] プロンプトエンジニアリング
- [ ] 応答キャッシュ機構

### 2.5 テストとバグ修正（週11-12）

#### タスク
- [ ] ユニットテストの作成と実行
- [ ] 統合テストの実施
- [ ] バグ修正
- [ ] パフォーマンス最適化
- [ ] ドキュメント整備

#### 成果物
- [ ] テストスイート
- [ ] 安定版アプリケーション
- [ ] ユーザードキュメント

## 3. 技術スタック詳細

### フロントエンド
- [x] React 18
- [x] TypeScript 5.x
- [x] Tailwind CSS（UIスタイリング）
- [x] React Query（データフェッチング）
- [x] Zustand（状態管理）

### バックエンド
- [x] Node.js 18.x
- [x] Express
- [x] TypeScript 5.x
- [x] MongoDB（データ永続化）
- [x] WebSocket（リアルタイム通信）

### 開発ツール
- [x] Biome（リンティング/フォーマッティング）
- [x] Vitest（テスト）
- [ ] Docker（開発環境）

## 4. API設計概要

### チャットAPI
- [ ] `POST /api/chat/message` - 新しいメッセージの送信
- [ ] `GET /api/chat/history` - チャット履歴の取得
- [ ] `DELETE /api/chat/history` - チャット履歴の削除

### 単語学習API
- [ ] `POST /api/vocabulary/word` - 単語の保存
- [ ] `GET /api/vocabulary/words` - 保存した単語のリスト取得
- [ ] `GET /api/vocabulary/word/:id` - 特定の単語の詳細取得
- [ ] `DELETE /api/vocabulary/word/:id` - 単語の削除

### AI統合API
- [ ] `POST /api/ai/generate` - AIからの応答生成
- [ ] `GET /api/ai/models` - 利用可能なAIモデルの取得
- [ ] `POST /api/ai/settings` - AI設定の更新

## 5. データモデル

### ユーザーモデル
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  preferences: {
    learningLevel: 'beginner' | 'intermediate' | 'advanced';
    aiModel: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### メッセージモデル
```typescript
interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  metadata?: {
    modelUsed?: string;
    processingTime?: number;
  };
}
```

### 単語モデル
```typescript
interface VocabularyWord {
  id: string;
  userId: string;
  word: string;
  definition: string;
  examples: string[];
  partOfSpeech: string;
  difficulty: 'easy' | 'medium' | 'hard';
  learned: boolean;
  lastReviewed?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## 6. リスクと対策

| リスク | 影響度 | 対策 | 状態 |
|-------|-------|------|------|
| Ollamaの応答品質が不十分 | 高 | プロンプトエンジニアリングの最適化、フォールバックメカニズムの実装 | □ |
| パフォーマンス問題 | 中 | 早期からのパフォーマンステスト、最適化の実施 | □ |
| 開発遅延 | 中 | 優先機能の明確化、スコープの適切な管理 | □ |
| ユーザビリティの問題 | 高 | 早期からのユーザーテスト、フィードバックの収集 | □ |

## 7. 成功基準

フェーズ1の成功基準は以下の通りです：

- [ ] ユーザーがAIとテキストチャットを行い、自然な会話ができること
- [ ] チャット中に出現した未知の単語を検出し、学習できること
- [ ] 保存した単語をリスト表示し、復習できること
- [ ] テストカバレッジが70%以上であること
- [ ] Biomeによるリンティングでエラーがないこと

## 8. 次のステップ

フェーズ1完了後、フェーズ2では以下の機能を実装予定です：

- [ ] 音声会話機能
- [ ] 高度な単語学習機能（スペースド・リピティション）
- [ ] Amazon Bedrock統合
- [ ] ユーザー認証システム

これらの機能については、フェーズ1の完了後に詳細な計画を策定します。
