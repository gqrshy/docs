# インストールガイド

CobbleRankedをサーバーに導入する手順を説明します。**シングルサーバー**なら5分で完了します。

---

## 🎯 インストール方法（基本）

### ステップ1: 必要なMODを準備

以下のMODを全て `mods` フォルダに配置してください：

| MOD名 | バージョン | ダウンロード |
|-------|----------|------------|
| **Fabric Loader** | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| **Fabric API** | 0.116.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| **Cobblemon** | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| **Fabric Language Kotlin** | 1.13.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| **CobbleRanked** | 最新版 | [Discord](https://discord.gg/VVVvBTqqyP) |

> **対象バージョン:** Minecraft 1.21.1

### ステップ2: サーバーを起動

サーバーを起動すると、`config/cobbleranked/` フォルダに設定ファイルが自動生成されます。

### ステップ3: 動作確認

サーバーコンソールに以下のメッセージが表示されれば成功です：

```
[CobbleRanked] Mod initialized successfully
[CobbleRanked] Database initialized (SQLite)
[CobbleRanked] Season manager initialized
```

ゲーム内で `/ranked` コマンドを実行してGUIが開けばOKです！

---

## 📁 生成されるファイル

初回起動後、以下のファイルが作成されます：

<details>
<summary><strong>設定ファイル一覧</strong></summary>

```
config/cobbleranked/
├── config.json5          # メイン設定
├── blacklist.json5       # ポケモン・技・特性・アイテムの禁止設定
├── arenas.json5          # バトルアリーナの座標
├── rewards.json5         # シーズン・マイルストーン報酬
├── ranked.db             # データベース（SQLite）
├── gui/
│   ├── gui-enUs.json5    # 英語GUI
│   ├── gui-jaJp.json5    # 日本語GUI
│   ├── gui-ptBr.json5    # ポルトガル語GUI
│   └── gui-ruRu.json5    # ロシア語GUI
└── language/
    ├── en-Us.json5       # 英語メッセージ
    ├── ja-Jp.json5       # 日本語メッセージ
    ├── pt-Br.json5       # ポルトガル語メッセージ
    └── ru-Ru.json5       # ロシア語メッセージ
```

**全てのファイルはデフォルト設定で生成されるので、編集不要でそのまま使えます。**

</details>

---

## ⚙️ 初期設定（オプション）

基本的には設定不要ですが、以下の設定を推奨します：

### 1. 言語設定

デフォルトは英語です。日本語に変更する場合：

`config/cobbleranked/config.json5` を開いて以下を変更：

```json5
{
  "language": "ja-Jp"  // en-Us → ja-Jp に変更
}
```

<details>
<summary>利用可能な言語</summary>

- `en-Us` - 英語（デフォルト）
- `ja-Jp` - 日本語
- `pt-Br` - ポルトガル語
- `ru-Ru` - ロシア語

</details>

### 2. バトルアリーナの設定

バトル開始時にプレイヤーを指定座標にテレポートさせる設定です。

1. バトルアリーナにしたい場所に移動
2. 以下のコマンドを実行：

```
/rankedadmin arena set main_arena
```

これで現在地がバトル開始座標として登録されます。

<details>
<summary>複数のアリーナを設定する</summary>

複数のアリーナを登録することで、ランダムな場所でバトルを開始できます：

```
/rankedadmin arena set arena_1
/rankedadmin arena set arena_2
/rankedadmin arena set arena_3
```

**詳細:** [アリーナ設定ガイド](../configuration/arenas.md)

</details>

### 3. 基本的なルール設定

伝説ポケモンや一撃必殺技を禁止したい場合：

`config/cobbleranked/blacklist.json5` を編集：

```json5
{
  "black_list_labels": ["legendary", "mythical"],  // 伝説・幻のポケモンを禁止
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]  // 一撃必殺技を禁止
}
```

<details>
<summary>その他の禁止設定</summary>

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_pokemon": ["mewtwo", "rayquaza"],  // 個別のポケモンを禁止
  "black_list_moves": ["baton_pass", "last_respects"],  // 特定の技を禁止
  "black_list_ability": ["moody", "shadow_tag"],  // 特定の特性を禁止
  "black_list_items_pokemon": ["cobblemon:bright_powder"]  // 特定のアイテムを禁止
}
```

**詳細:** [ブラックリスト設定ガイド](../configuration/blacklist.md)

</details>

---

## 🌍 クロスサーバーセットアップ（上級者向け）

複数のサーバー間でランキングを共有したい場合のみ必要です。**シングルサーバーの場合はスキップしてください。**

### 必要なもの

| ソフトウェア | バージョン | 用途 |
|------------|----------|------|
| **MySQL** または **MongoDB** | 8.0+ / 6.0+ | データ共有 |
| **Redis** | 6.0+ | リアルタイムキュー同期 |
| **Velocity** | 3.4.0+ | サーバー間転送 |

### クロスサーバー構成

```
[ロビーサーバー1] ━━━┓
                    ┃
[ロビーサーバー2] ━━━╋━━━ [Velocity Proxy] ━━━ [バトルサーバー]
                    ┃                              ↓
[メインサーバー] ━━━┛                        [MySQL + Redis]
                                                (共有データ)
```

- **ロビー/メインサーバー**: プレイヤーがキューに参加
- **バトルサーバー**: 実際のバトルを処理
- **MySQL/MongoDB**: 全サーバー共通のデータベース
- **Redis**: リアルタイムでキュー情報を同期

<details>
<summary><strong>ステップ1: MySQLのセットアップ</strong></summary>

### MySQLデータベースの作成

MySQLサーバーで以下のコマンドを実行：

```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

### 全サーバーの設定

**バトルサーバーの `config.json5`:**

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",      // このサーバーの識別名
    "battle_server": "",         // 空 = このサーバーがバトルサーバー
    "database": {
      "type": "MYSQL",
      "host": "localhost",       // MySQLサーバーのIP
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_secure_password"
    }
  }
}
```

**ロビー/メインサーバーの `config.json5`:**

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",       // サーバーごとに異なる名前（lobby1, lobby2, main など）
    "battle_server": "battle",   // バトルサーバーのserver_idと一致させる
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_secure_password"
    }
  }
}
```

**重要:** `battle_server` は Velocity の `velocity.toml` で設定したサーバー名と**完全一致**させてください。

</details>

<details>
<summary><strong>ステップ2: MongoDBのセットアップ（MySQLの代わり）</strong></summary>

MongoDBを使う場合（クラウド対応、スケーラブル）：

### MongoDB Atlasの使用（無料）

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) でアカウント作成
2. 無料クラスターを作成
3. 接続文字列を取得（例: `mongodb+srv://user:pass@cluster.mongodb.net/cobbleranked`）

### 全サーバーの設定

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",  // または "lobby1", "main" など
    "battle_server": "",    // バトルサーバーは空、それ以外は "battle"
    "database": {
      "type": "MONGODB",
      "host": "cluster.mongodb.net",  // Atlas のホスト
      "port": 27017,
      "database": "cobbleranked",
      "username": "your_username",
      "password": "your_password"
    }
  }
}
```

**詳細:** [CHANGELOG-MONGODB.md](../CHANGELOG-MONGODB.md)

</details>

<details>
<summary><strong>ステップ3: Redisのセットアップ</strong></summary>

### Redisのインストール

**Ubuntu/Debian:**
```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Windows:**
- [Redis for Windows](https://github.com/microsoftarchive/redis/releases) をダウンロード
- または WSL (Windows Subsystem for Linux) を使用

### リモートアクセスの許可（必要な場合）

`/etc/redis/redis.conf` を編集：

```
bind 0.0.0.0              # 全てのIPからアクセス許可（ファイアウォール必須）
requirepass your_password  # パスワード設定（推奨）
```

再起動：
```bash
sudo systemctl restart redis-server
```

### 全サーバーの設定

全サーバーの `config.json5` に追加：

```json5
{
  "cross_server": {
    "redis": {
      "host": "localhost",      // Redisサーバーのホスト（全サーバー共通）
      "port": 6379,
      "password": "",           // パスワード設定した場合は入力
      "database": 0             // 0-15 の番号を選択
    }
  }
}
```

### 接続確認

```bash
redis-cli -h localhost -p 6379 PING
# 返答: PONG
```

</details>

<details>
<summary><strong>ステップ4: Velocityの設定</strong></summary>

### velocity.toml の設定

Velocity の `velocity.toml` でサーバー名を定義：

```toml
[servers]
lobby1 = "127.0.0.1:25565"
lobby2 = "127.0.0.1:25566"
battle = "127.0.0.1:25567"
main = "127.0.0.1:25568"
```

**重要:** ここで設定した名前（`battle`, `lobby1` など）を、CobbleRanked の `server_id` と `battle_server` に使用してください。

</details>

<details>
<summary><strong>動作確認</strong></summary>

### 各サーバーのログを確認

**バトルサーバー:**
```
[CrossServer] Connected to MySQL/MongoDB
[CrossServer] Connected to Redis
[SeasonManager] Initialized season manager
[CobbleRanked] Battle server ready
```

**ロビー/メインサーバー:**
```
[CrossServer] Connected to MySQL/MongoDB
[CrossServer] Connected to Redis
[CrossServer] Battle server: battle
[CobbleRanked] Lobby server ready
```

### マッチメイキングのテスト

1. ロビー1でプレイヤーAがキューに参加
2. ロビー2でプレイヤーBが同じフォーマットのキューに参加
3. マッチングしたら自動でバトルサーバーに転送される
4. バトル終了後、元のサーバーに戻る

**詳細:** [クロスサーバーセットアップガイド](../advanced/cross-server.md)

</details>

---

## 🔧 トラブルシューティング

<details>
<summary><strong>MODが読み込まれない</strong></summary>

**症状:** コンソールにCobbleRankedのメッセージが表示されない

**解決方法:**
1. Fabric Loaderがインストールされているか確認
2. `mods` フォルダに全ての依存MODがあるか確認
   - Fabric API
   - Cobblemon
   - Fabric Language Kotlin
3. `logs/latest.log` でエラーを確認

</details>

<details>
<summary><strong>設定ファイルが見つからない</strong></summary>

**症状:** `Failed to load config.json5`

**解決方法:**
1. サーバーを停止
2. `config/cobbleranked/` フォルダを削除
3. サーバーを再起動（自動で再生成されます）

</details>

<details>
<summary><strong>データベース接続エラー</strong></summary>

**症状:** `Failed to connect to MySQL database`

**解決方法:**
1. MySQLが起動しているか確認：
   ```bash
   sudo systemctl status mysql
   ```
2. 認証情報が正しいか確認（`config.json5` のusername, password）
3. データベースが存在するか確認：
   ```bash
   mysql -u cobbleranked -p -h localhost -e "SHOW DATABASES;"
   ```
4. ファイアウォールでポート3306が開いているか確認

</details>

<details>
<summary><strong>クロスサーバーでマッチングしない</strong></summary>

**症状:** 異なるサーバーのプレイヤー同士がマッチしない

**解決方法:**

1. **Redisの接続確認:**
   ```bash
   redis-cli
   > KEYS cobbleranked:queue:*
   # キューデータが表示されるはず
   ```

2. **全サーバーが同じMySQLに接続しているか確認:**
   ```sql
   SELECT * FROM player_ranked_stats;
   # 全サーバーのプレイヤーが表示されるはず
   ```

3. **server_idが重複していないか確認:**
   - 各サーバーの `server_id` は一意でなければなりません

4. **battle_serverの設定を確認:**
   - バトルサーバーのみ `battle_server: ""`
   - その他のサーバーは `battle_server: "battle"` （Velocityの名前と一致）

5. **同じフォーマットでキューに参加しているか確認:**
   - シングルとダブルは別のキュー

</details>

<details>
<summary><strong>バトル後に元のサーバーに戻らない</strong></summary>

**症状:** プレイヤーがバトルサーバーに残ったまま

**解決方法:**

1. **Velocityのサーバー名を確認:**
   - `battle_server` が `velocity.toml` の `[servers]` 名と完全一致しているか確認
   - 大文字小文字を区別します！

2. **Redisで元サーバー情報を確認:**
   ```bash
   redis-cli
   > GET player_origin:{プレイヤーのUUID}
   # 元のサーバーIDが表示されるはず
   ```

3. **ログを確認:**
   - `[BATTLE-END] Transferring players back to: lobby1` のようなメッセージを探す

</details>

<details>
<summary><strong>コマンドが使えない（権限エラー）</strong></summary>

**症状:** `You do not have permission to use this command`

**解決方法:**

管理者コマンドはOP権限が必要です：

```
/op YourUsername
```

または、権限プラグイン（LuckPerms等）で以下の権限を付与：

```
cobbleranked.admin
```

**詳細:** [コマンドリファレンス](commands.md)

</details>

---

## ✅ 次のステップ

インストールが完了したら、以下のガイドをご覧ください：

### シングルサーバーの場合

1. **[クイックスタートガイド](quick-start.md)** - 基本的な使い方
2. **[ブラックリスト設定](../configuration/blacklist.md)** - ルールのカスタマイズ
3. **[アリーナ設定](../configuration/arenas.md)** - バトルエリアの設定
4. **[報酬設定](../configuration/rewards.md)** - シーズン報酬の追加

### クロスサーバーの場合

1. **[クロスサーバーガイド](../advanced/cross-server.md)** - 詳細な設定
2. **[データベース管理](../advanced/database.md)** - MySQL/MongoDBの比較
3. **[Redis設定](../advanced/redis.md)** - リアルタイム同期の詳細
4. **[アリーナ設定](../configuration/arenas.md)** - バトルサーバーのみ

---

**サポートが必要な場合:**
- [トラブルシューティングガイド](../support/troubleshooting.md)
- [FAQ](../support/faq.md)
- [Discord](https://discord.gg/VVVvBTqqyP) - #feedbackチャンネル
