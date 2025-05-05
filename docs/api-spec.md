# AIEN API仕様書

このドキュメントでは、AIENアプリケーションのバックエンドAPIの仕様を定義します。

## 基本情報

- **ベースURL**: `/api/v1`
- **コンテンツタイプ**: `application/json`
- **認証方式**: JWT Bearer Token（フェーズ2で実装）

## エンドポイント一覧

### 1. チャットAPI

#### 1.1 メッセージの送信

新しいメッセージを送信し、AIからの応答を取得します。

- **エンドポイント**: `POST /chat/messages`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **リクエスト本文**:

```json
{
  "content": "Hello, how are you?",
  "conversationId": "conv_123456" // 省略可能、新規会話の場合は自動生成
}
```

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "userMessage": {
      "id": "msg_123456",
      "content": "Hello, how are you?",
      "sender": "user",
      "conversationId": "conv_123456",
      "timestamp": "2025-05-05T12:34:56Z"
    },
    "aiResponse": {
      "id": "msg_123457",
      "content": "I'm doing well, thank you! How can I help you with your English learning today?",
      "sender": "ai",
      "conversationId": "conv_123456",
      "timestamp": "2025-05-05T12:34:57Z"
    }
  }
}
```

#### 1.2 会話履歴の取得

特定の会話の履歴を取得します。

- **エンドポイント**: `GET /chat/conversations/{conversationId}/messages`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **パラメータ**:
  - `limit`: 取得するメッセージの最大数（デフォルト: 50）
  - `before`: このIDより前のメッセージを取得（ページネーション用）

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_123456",
        "content": "Hello, how are you?",
        "sender": "user",
        "conversationId": "conv_123456",
        "timestamp": "2025-05-05T12:34:56Z"
      },
      {
        "id": "msg_123457",
        "content": "I'm doing well, thank you! How can I help you with your English learning today?",
        "sender": "ai",
        "conversationId": "conv_123456",
        "timestamp": "2025-05-05T12:34:57Z"
      }
    ],
    "hasMore": false
  }
}
```

#### 1.3 会話一覧の取得

ユーザーの会話一覧を取得します。

- **エンドポイント**: `GET /chat/conversations`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **パラメータ**:
  - `limit`: 取得する会話の最大数（デフォルト: 10）
  - `offset`: スキップする会話の数（ページネーション用）

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "conv_123456",
        "title": "English Grammar Practice",
        "lastMessagePreview": "I'm doing well, thank you!",
        "lastMessageTimestamp": "2025-05-05T12:34:57Z",
        "messageCount": 2
      },
      {
        "id": "conv_123457",
        "title": "Vocabulary Building",
        "lastMessagePreview": "Let me explain what 'serendipity' means.",
        "lastMessageTimestamp": "2025-05-04T15:22:31Z",
        "messageCount": 8
      }
    ],
    "total": 2,
    "hasMore": false
  }
}
```

#### 1.4 会話の削除

特定の会話を削除します。

- **エンドポイント**: `DELETE /chat/conversations/{conversationId}`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "id": "conv_123456",
    "deleted": true
  }
}
```

### 2. 単語学習API

#### 2.1 単語の保存

学習したい単語を保存します。

- **エンドポイント**: `POST /vocabulary/words`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **リクエスト本文**:

```json
{
  "word": "serendipity",
  "context": "I discovered this book by serendipity while browsing the library."
}
```

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "id": "word_123456",
    "word": "serendipity",
    "definition": "The occurrence and development of events by chance in a happy or beneficial way.",
    "partOfSpeech": "noun",
    "examples": [
      "I discovered this book by serendipity while browsing the library.",
      "Finding you here was pure serendipity."
    ],
    "difficulty": "hard",
    "learned": false,
    "createdAt": "2025-05-05T12:40:22Z"
  }
}
```

#### 2.2 単語リストの取得

保存した単語のリストを取得します。

- **エンドポイント**: `GET /vocabulary/words`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **パラメータ**:
  - `limit`: 取得する単語の最大数（デフォルト: 20）
  - `offset`: スキップする単語の数（ページネーション用）
  - `learned`: 学習済みフィルター（true/false/all、デフォルト: all）
  - `difficulty`: 難易度フィルター（easy/medium/hard/all、デフォルト: all）

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "words": [
      {
        "id": "word_123456",
        "word": "serendipity",
        "definition": "The occurrence and development of events by chance in a happy or beneficial way.",
        "partOfSpeech": "noun",
        "difficulty": "hard",
        "learned": false,
        "createdAt": "2025-05-05T12:40:22Z"
      },
      {
        "id": "word_123457",
        "word": "eloquent",
        "definition": "Fluent or persuasive in speaking or writing.",
        "partOfSpeech": "adjective",
        "difficulty": "medium",
        "learned": true,
        "createdAt": "2025-05-04T10:22:15Z"
      }
    ],
    "total": 2,
    "hasMore": false
  }
}
```

#### 2.3 単語詳細の取得

特定の単語の詳細情報を取得します。

- **エンドポイント**: `GET /vocabulary/words/{wordId}`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "id": "word_123456",
    "word": "serendipity",
    "definition": "The occurrence and development of events by chance in a happy or beneficial way.",
    "partOfSpeech": "noun",
    "examples": [
      "I discovered this book by serendipity while browsing the library.",
      "Finding you here was pure serendipity."
    ],
    "difficulty": "hard",
    "learned": false,
    "createdAt": "2025-05-05T12:40:22Z",
    "lastReviewed": null
  }
}
```

#### 2.4 単語の学習状態更新

単語の学習状態を更新します。

- **エンドポイント**: `PATCH /vocabulary/words/{wordId}`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **リクエスト本文**:

```json
{
  "learned": true
}
```

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "id": "word_123456",
    "word": "serendipity",
    "learned": true,
    "lastReviewed": "2025-05-05T14:22:36Z"
  }
}
```

#### 2.5 単語の削除

特定の単語を削除します。

- **エンドポイント**: `DELETE /vocabulary/words/{wordId}`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "id": "word_123456",
    "deleted": true
  }
}
```

### 3. AI設定API

#### 3.1 AI設定の取得

現在のAI設定を取得します。

- **エンドポイント**: `GET /ai/settings`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "model": "llama2",
    "learningLevel": "intermediate",
    "responseLength": "medium",
    "focusAreas": ["grammar", "vocabulary"]
  }
}
```

#### 3.2 AI設定の更新

AI設定を更新します。

- **エンドポイント**: `PATCH /ai/settings`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **リクエスト本文**:

```json
{
  "model": "llama2",
  "learningLevel": "advanced",
  "responseLength": "long",
  "focusAreas": ["pronunciation", "idioms"]
}
```

- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "model": "llama2",
    "learningLevel": "advanced",
    "responseLength": "long",
    "focusAreas": ["pronunciation", "idioms"]
  }
}
```

#### 3.3 利用可能なAIモデルの取得

利用可能なAIモデルのリストを取得します。

- **エンドポイント**: `GET /ai/models`
- **認証**: 不要（フェーズ1）、必要（フェーズ2）
- **レスポンス**:

```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": "llama2",
        "name": "Llama 2",
        "description": "General purpose language model",
        "capabilities": ["chat", "vocabulary"]
      },
      {
        "id": "mistral",
        "name": "Mistral",
        "description": "Optimized for educational content",
        "capabilities": ["chat", "vocabulary", "grammar"]
      }
    ]
  }
}
```

## エラーレスポンス

APIがエラーを返す場合、以下の形式でレスポンスが返されます：

```json
{
  "success": false,
  "error": {
    "code": "resource_not_found",
    "message": "The requested resource was not found.",
    "details": {
      "resourceType": "conversation",
      "resourceId": "conv_123456"
    }
  }
}
```

### 主なエラーコード

| コード | 説明 | HTTPステータス |
|-------|------|-------------|
| `invalid_request` | リクエストの形式が不正 | 400 |
| `resource_not_found` | リソースが見つからない | 404 |
| `unauthorized` | 認証が必要 | 401 |
| `forbidden` | 権限がない | 403 |
| `internal_error` | サーバー内部エラー | 500 |
| `service_unavailable` | サービスが一時的に利用できない | 503 |

## WebSocket API

リアルタイムのチャット機能のために、WebSocket APIも提供します。

- **エンドポイント**: `ws://[server]/ws/chat`
- **認証**: 接続時にクエリパラメータとして `token` を指定（フェーズ2）

### メッセージフォーマット

```json
{
  "type": "message",
  "data": {
    "id": "msg_123456",
    "content": "Hello, how are you?",
    "sender": "user",
    "conversationId": "conv_123456",
    "timestamp": "2025-05-05T12:34:56Z"
  }
}
```

### イベントタイプ

| タイプ | 説明 |
|-------|------|
| `message` | 新しいメッセージ |
| `typing` | 相手が入力中 |
| `read` | メッセージが既読になった |
| `error` | エラーが発生した |

## API変更履歴

| 日付 | バージョン | 変更内容 |
|------|----------|---------|
| 2025-05-05 | v1.0.0 | 初期バージョン |

## 将来の拡張予定

フェーズ2では、以下のAPIが追加される予定です：

1. ユーザー認証API
2. 音声会話API
3. 学習進捗分析API
4. Amazon Bedrock統合API
