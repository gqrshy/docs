# データベース設定

---
**CobbleRanked** > **Advanced** > **データベース**
---

CobbleRankedの高度なデータベース設定。

## 概要

CobbleRankedは3つのデータベースシステムをサポート:
- **SQLite** - ファイルベース、シングルサーバー（デフォルト）
- **MySQL** - ネットワークデータベース、クロスサーバーサポート
- **MongoDB** - NoSQLデータベース、クロスサーバーサポート（新機能！）

## SQLite（デフォルト）

### 使用タイミング

**最適:**
- 単一のMinecraftサーバー
- 小〜中規模のプレイヤーベース（< 1,000プレイヤー）
- シンプルなセットアップ、外部依存なし
- テストと開発

**制限:**
- 複数サーバーでデータを共有できない
- 非常に大きなデータセット（10,000+プレイヤー）でパフォーマンスが低下

### 設定

設定不要！そのまま動作します。

**ファイル場所:** `config/cobbleranked/ranked.db`

### バックアップ

```bash
# バックアップ
cp config/cobbleranked/ranked.db backup-$(date +%Y%m%d).db

# 復元
cp backup-20251026.db config/cobbleranked/ranked.db
```

---

## MySQL

### 使用タイミング

**必須:**
- クロスサーバーセットアップ（複数のMinecraftサーバー）
- 大規模プレイヤーベース（1,000+プレイヤー）
- スケールでのより良いパフォーマンス
- 高度な機能（レプリケーション、バックアップツール）

### セットアップ

完全なMySQLインストールガイドについては[クロスサーバーセットアップ](cross-server.md)を参照。

**クイック設定:**
```json5
{
  "cross_server": {
    "enabled": true,
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password"
    }
  }
}
```

### データベーススキーマ

CobbleRankedは自動的にこれらのテーブルを作成:

| テーブル | 目的 |
|-------|---------|
| `player_ranked_stats` | レガシープレイヤー統計（形式システム前） |
| `format_stats` | 形式固有の統計（シングル、ダブルス） |
| `seasons` | シーズン履歴とメタデータ |

**手動テーブル作成は不要！**

---

## MongoDB

### 使用タイミング

**最適:**
- クロスサーバーセットアップ（MySQLの代替）
- クラウドネイティブデプロイメント（MongoDB Atlas）
- 水平スケーリング要件
- 柔軟なスキーマ進化
- 高い書き込みスループットの大規模プレイヤーベース

**MySQLに対する利点:**
- ✅ より簡単な水平スケーリング（シャーディング）
- ✅ ネイティブJSONドキュメントストレージ
- ✅ クラウド対応（MongoDB Atlas）
- ✅ 自動スキーマ柔軟性
- ✅ 高書き込み負荷での優れたパフォーマンス

### セットアップ

#### オプション1: ローカルMongoDB

```bash
# Ubuntu/Debian
sudo apt install mongodb-server
sudo systemctl start mongodb

# データベースとユーザーを作成
mongosh
use cobbleranked
db.createUser({
  user: "cobbleranked",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "cobbleranked" }]
})
```

#### オプション2: MongoDB Atlas（クラウド）

1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)で無料クラスターを作成
2. 接続文字列を取得: `cluster0.xxxxx.mongodb.net`
3. ホワイトリストにIPアドレスを追加
4. 認証情報をコピー

### 設定

`config/cobbleranked/config.json5`:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle",
    "database_type": "mongodb",  // "mongodb"に設定

    "mongodb": {
      "connection_string": "mongodb://localhost:27017",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password",
      "auth_database": "admin",
      "use_srv": false,  // Atlasの場合はtrueに設定

      "connection_pool": {
        "max_pool_size": 10,
        "min_pool_size": 5,
        "max_idle_time_ms": 60000,
        "max_connection_lifetime_ms": 1800000,
        "connect_timeout_ms": 10000,
        "socket_timeout_ms": 5000
      }
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

---

## 比較

| 機能 | SQLite | MySQL | MongoDB |
|---------|--------|-------|---------|
| **セットアップ** | ✅ ゼロ設定 | ⚠️ インストール必要 | ⚠️ インストール必要 |
| **クロスサーバー** | ❌ なし | ✅ はい | ✅ はい |
| **スケーリング** | ❌ 制限あり | ⚠️ 垂直のみ | ✅ 水平 |
| **クラウド** | ❌ なし | ⚠️ VPS必要 | ✅ Atlas無料ティア |
| **パフォーマンス** | ✅ 速い（小規模） | ✅ 速い（中規模） | ✅ 速い（大規模） |
| **スキーマ変更** | ⚠️ 手動 | ⚠️ 手動 | ✅ 自動 |
| **バックアップ** | ✅ 単純ファイルコピー | ⚠️ mysqldump | ✅ mongodump/Atlas |

**推奨:**
- **シングルサーバー**: SQLite（最も簡単）
- **2-5サーバー**: MySQLまたはMongoDB（類似）
- **5+サーバー**: MongoDB（より良いスケーリング）
- **クラウドデプロイ**: MongoDB Atlas（最も簡単）

---

## 移行

### SQLiteからMySQL/MongoDBへ

```bash
/rankedadmin database migrate sqlite mysql
/rankedadmin database migrate sqlite mongodb
```

**要件:**
- `config.json5`でターゲットデータベースが設定されている
- ターゲットデータベース接続が機能している

**移行内容:**
- すべてのプレイヤー統計
- イロレーティング
- 勝敗記録
- シーズンデータ

---

## トラブルシューティング

### SQLiteデータベース破損

```bash
sqlite3 config/cobbleranked/ranked.db "PRAGMA integrity_check;"
```

破損している場合、バックアップから復元するか削除（すべてのデータをリセット）。

### MySQL接続失敗

1. 接続をテスト: `mysql -u user -p -h host database`
2. 設定で認証情報をチェック
3. MySQLが実行中か確認: `systemctl status mysql`
4. ファイアウォールをチェック: `telnet host 3306`

### MongoDB接続失敗

1. **接続をテスト:**
   ```bash
   mongosh "mongodb://username:password@host:27017/cobbleranked"
   ```

2. **認証情報をチェック:**
   - 設定で`username`と`password`を確認
   - `auth_database`をチェック（通常`admin`）

3. **MongoDBが実行中か確認:**
   ```bash
   systemctl status mongodb  # または mongod
   ```

4. **ファイアウォールをチェック:**
   ```bash
   telnet host 27017
   ```

---

## 次のステップ

### データベースセットアップ用
1. **[SQLiteからMySQLへの移行](#sqliteからmysqlmongodbへ)** - アップグレードパス
2. **[MongoDB Atlasセットアップ](#オプション2-mongodb-atlasクラウド)** - クラウドデータベース
3. **[Redis設定](#redis-configuration)** - リアルタイム同期

### パフォーマンス用
1. **[コネクションプーリング](#connection-pool)** - 接続を最適化
2. **[データベース比較](#比較)** - 適切なデータベースを選択
3. **[バックアップ戦略](#backup--restore)** - データを保護

### トラブルシューティング用
1. **[MySQL問題](#mysql接続失敗)** - 接続問題
2. **[MongoDB問題](#mongodb接続失敗)** - 認証とセットアップ
3. **[Redis問題](#redis-configuration)** - キュー同期の問題

---

## 関連ページ
- [クロスサーバーセットアップ](cross-server.md) - マルチサーバー設定
- [インストールガイド](../getting-started/installation.md#cross-server-setup-advanced) - 前提条件
- [FAQ](../support/faq.md#cross-server) - データベースの質問
