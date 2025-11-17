# クロスサーバーセットアップ

---
**CobbleRanked** > **Advanced** > **クロスサーバー**
---

共有ランキングで複数のサーバーにわたってCobbleRankedを実行。

## アーキテクチャ

> **[📸 画像必要: クロスサーバーアーキテクチャ図（Velocityプロキシ、複数のロビー/メインサーバー、バトルサーバー、共有DB/Redis構成）]**

**サーバー:**
- **バトルサーバー** - すべてのランクバトルをホスト
- **ロビー/メインサーバー** - プレイヤーはここでキューイングし、バトルサーバーに転送

**必要なコンポーネント:**
- Velocityプロキシ（3.3.0+）
- MySQLまたはMongoDB（共有データベース）
- Redis（リアルタイムキュー同期）

## インストール

### 1. Velocityプロキシセットアップ

**プラグイン:** [ProxyCommand Reloaded](https://modrinth.com/plugin/proxy-command-reloaded)

### 2. Fabric Server Mods

**すべての**サーバー（ロビー、メイン、バトル）にインストール:

- [CrossStitch](https://modrinth.com/mod/crossstitch)
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [Placeholder API](https://modrinth.com/mod/placeholder-api) (2.4.2+1.21+)
- [Cobblemon](https://modrinth.com/mod/cobblemon) (1.6.1+)
- [CobbleRanked](https://modrinth.com/mod/cobbleranked)

### 3. データベースセットアップ

**MySQL:**
```sql
CREATE DATABASE cobbleranked;
CREATE USER 'ranked'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'ranked'@'%';
```

**MongoDB:**
```javascript
use cobbleranked
db.createUser({user: "ranked", pwd: "password", roles: ["readWrite"]})
```

### 4. Redisセットアップ

**Linux:**
```bash
sudo apt install redis-server
sudo systemctl start redis
```

**Docker:**
```bash
docker run -d -p 6379:6379 redis:alpine
```

## 設定

### バトルサーバー

**ファイル:** `config/cobbleranked/config.json5`

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // 空 = これがバトルサーバー
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": ""
    }
  },
  "database_type": "mysql",  // または "mongodb"
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

### ロビー/メインサーバー

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // または "lobby", "main2"など
    "battle_server": "battle",  // 転送先
    "redis": {
      "host": "localhost",
      "port": 6379
    }
  },
  "database_type": "mysql",
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

## 主な違い

| 設定 | バトルサーバー | ロビー/メイン |
|---------|---------------|------------|
| `server_id` | `"battle"` | `"main1"`, `"lobby"`など |
| `battle_server` | `""`（空） | `"battle"` |
| グローバル機能 | ✅ 管理 | ❌ 読み取り専用 |

## テスト

1. すべてのサーバーを起動
2. ロビーからキューイング: `/ranked`
3. マッチが見つかったら受諾
4. バトルサーバーへの転送を確認
5. バトル後に統計同期をチェック

## トラブルシューティング

**プレイヤーが転送されない:**
- Velocity `velocity.toml`が正しいサーバー名を持っているかチェック
- ProxyCommand Reloadedがインストールされているか確認

**統計が同期しない:**
- すべてのサーバーでMySQL/MongoDB接続をチェック
- Redisが実行中か確認: `redis-cli ping` → `PONG`

**重複バトルサーバー:**
- `battle_server: ""`を持つサーバーは1つのみ
- 重複バトルサーバーに関する`SEVERE`エラーのログをチェック

---

## 次のステップ

### セットアップ用
1. **[Velocityプロキシセットアップ](#1-velocityプロキシセットアップ)** - プロキシを設定
2. **[データベースセットアップ](#3-データベースセットアップ)** - MySQLまたはMongoDB
3. **[Redisセットアップ](#4-redisセットアップ)** - リアルタイム通信

### 設定用
1. **[バトルサーバー設定](#バトルサーバー)** - メインバトルサーバーをセットアップ
2. **[ロビーサーバー設定](#ロビーメインサーバー)** - キューサーバーを設定
3. **[主な違い表](#主な違い)** - サーバーの役割を理解

### トラブルシューティング用
1. **[テストチェックリスト](#テスト)** - クロスサーバーが機能するか確認
2. **[一般的な問題](#トラブルシューティング)** - 転送と同期の問題を修正
3. **[FAQクロスサーバー](../support/faq.md#cross-server)** - よくある質問

---

## 関連ページ
- [データベース設定](database.md) - MySQL/MongoDB/Redisセットアップ
- [インストールガイド](../getting-started/installation.md#cross-server-setup-advanced) - 前提条件
- [トラブルシューティング](../support/troubleshooting.md#cross-server-issues) - クロスサーバーの問題
