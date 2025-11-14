# よくある質問（FAQ）

CobbleRankedに関するよくある質問と回答です。

---

## 基本情報

<details>
<summary><strong>CobbleRankedとは？</strong></summary>

Cobblemonサーバーに競技性の高いランク戦システムを追加するMODです。

- Eloレートによるマッチング
- シングル・ダブルバトル対応
- シーズンシステムと報酬
- ポケモン・技・特性・アイテムの制限
- クロスサーバー対応（オプション）

</details>

<details>
<summary><strong>どこでダウンロードできますか？</strong></summary>

**公式:** [Discord](https://discord.gg/VVVvBTqqyP)（現在唯一の配布場所）

Modrinth/CurseForgeは準備中です。

</details>

<details>
<summary><strong>必要な環境は？</strong></summary>

- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.7.0+
- Fabric API 0.116.6+
- Fabric Language Kotlin 1.13.6+

</details>

<details>
<summary><strong>クロスサーバーは必須ですか？</strong></summary>

いいえ。シングルサーバーならゼロ設定で動作します。

クロスサーバーは複数サーバーでランキングを共有したい場合のみ必要です。

</details>

---

## インストール・設定

<details>
<summary><strong>設定ファイルが生成されない</strong></summary>

1. 全ての依存MODがインストールされているか確認
2. サーバーを完全に起動させる
3. `logs/latest.log` でエラーを確認

</details>

<details>
<summary><strong>言語を日本語に変更したい</strong></summary>

`config/cobbleranked/config.json5` を編集：

```json5
{
  "language": "ja-Jp"
}
```

保存後、`/rankedadmin reload` で反映されます。

</details>

<details>
<summary><strong>設定変更後、反映されない</strong></summary>

1. ファイルを保存したか確認
2. `/rankedadmin reload` を実行
3. JSON5の文法エラーを確認（カンマ、括弧の閉じ忘れ）
4. サーバーログで `[CobbleRanked] Configuration loaded` を確認

</details>

---

## ブラックリスト設定

<details>
<summary><strong>技名の確認方法</strong></summary>

技名は**英語の小文字・スネークケース**で指定します。

| 日本語名 | 内部名 |
|---------|--------|
| じわれ | `fissure` |
| ぜったいれいど | `sheer_cold` |
| バトンタッチ | `baton_pass` |
| おはかまいり | `last_respects` |
| 10まんボルト | `thunderbolt` |

**パターン:** スペースをアンダースコアに、全て小文字

</details>

<details>
<summary><strong>特性名の確認方法</strong></summary>

### ゲーム内で確認

1. `F3 + H` を押す
2. ポケモンのステータス画面を開く
3. 特性アイコンにカーソルを合わせる

### よく使われる特性

| 日本語名 | 内部名 |
|---------|--------|
| いかく | `intimidate` |
| ひでり | `drought` |
| ムラっけ | `moody` |
| かげふみ | `shadow_tag` |
| ありじごく | `arena_trap` |
| ちからもち | `huge_power` |

</details>

<details>
<summary><strong>アイテムIDの確認方法</strong></summary>

### 最も簡単な方法

1. `F3 + H` を押す
2. インベントリでアイテムにカーソルを合わせる
3. 下部にIDが表示される（例: `cobblemon:bright_powder`）

### コマンドで確認

```
/give @s <TAB>
```

Tab キーでアイテムID一覧が表示されます。

### 形式

必ず `cobblemon:item_name` の形式で指定してください。

```
正しい: "cobblemon:bright_powder"
間違い: "Bright Powder", "brightpowder"
```

</details>

<details>
<summary><strong>フォーム（メガシンカ等）の指定方法</strong></summary>

### 基本ルール

- **フォームなし** (`mewtwo`): **全てのフォーム**が禁止
- **フォームあり** (`mewtwo:mega_x`): **そのフォームのみ**禁止

### 例

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // 通常・メガX・メガY全て禁止
    "charizard:mega_x",  // メガリザードンXのみ禁止（通常・Yは使用可能）
    "weezing:galar",     // ガラルマタドガスのみ禁止
    "muk:alola"          // アローラベトベトンのみ禁止
  ]
}
```

</details>

<details>
<summary><strong>ラベル制限と完全禁止の違いは？</strong></summary>

### ラベル制限（数量指定）

```json5
{
  "restricted_label_limits": {
    "legendary": 1  // 伝説は1匹まで使える
  }
}
```

### 完全禁止

```json5
{
  "black_list_labels": ["legendary"]  // 伝説は全て使えない
}
```

### 組み合わせ例

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // 伝説は1匹まで
  },
  "black_list_pokemon": [
    "mewtwo"             // ただしミュウツーは例外で完全禁止
  ]
}
```

</details>

<details>
<summary><strong>カジュアルサーバー向けの設定例</strong></summary>

一撃必殺技のみ禁止、他は自由：

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

</details>

<details>
<summary><strong>競技向けサーバーの設定例</strong></summary>

Smogon OUに準拠：

```json5
{
  "language": "ja-Jp",
  "ranked_match": {
    "reset_days": 90,
    "levelMatch": 50,
    "turn_limit": 100
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

`blacklist.json5`:
```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": ["cobblemon:bright_powder", "cobblemon:lax_incense"]
}
```

</details>

---

## クロスサーバー

<details>
<summary><strong>クロスサーバーの設定手順（MySQL）</strong></summary>

### 1. MySQLデータベース作成

```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

### 2. 全サーバーの設定

**バトルサーバー:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // 空 = バトルサーバー
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    }
  }
}
```

**ロビー/メインサーバー:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",  // サーバーごとに変える
    "battle_server": "battle",
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    }
  }
}
```

**詳細:** [クロスサーバーガイド](../advanced/cross-server.md)

</details>

<details>
<summary><strong>Redisのインストールと設定</strong></summary>

### インストール（Ubuntu/Debian）

```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### リモートアクセス許可

`/etc/redis/redis.conf`:
```
bind 0.0.0.0
requirepass your_password
```

```bash
sudo systemctl restart redis-server
```

### 全サーバーの設定

```json5
{
  "cross_server": {
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
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
<summary><strong>クロスサーバーでマッチングしない</strong></summary>

### 確認ポイント

1. **Redis接続確認:**
   ```bash
   redis-cli
   > KEYS cobbleranked:queue:*
   ```

2. **MySQL接続確認:**
   ```sql
   SELECT * FROM player_ranked_stats;
   ```

3. **server_idが重複していないか確認**

4. **battle_serverの設定確認:**
   - バトルサーバー: `battle_server: ""`
   - その他: `battle_server: "battle"`

5. **Velocityのサーバー名と一致しているか確認**

</details>

<details>
<summary><strong>バトル後に元のサーバーに戻らない</strong></summary>

### 解決方法

1. **Velocityのサーバー名を確認**
   - `battle_server` が `velocity.toml` の名前と完全一致しているか
   - 大文字小文字を区別

2. **Redisで元サーバー情報を確認:**
   ```bash
   redis-cli
   > GET player_origin:{UUID}
   ```

3. **ログを確認:**
   - `[BATTLE-END] Transferring players back to: lobby1`

</details>

---

## トラブルシューティング

<details>
<summary><strong>コマンドが使えない（権限エラー）</strong></summary>

管理者コマンドはOP権限が必要：

```
/op YourUsername
```

または権限プラグインで `cobbleranked.admin` を付与

</details>

<details>
<summary><strong>データベース接続エラー</strong></summary>

1. MySQLが起動しているか確認:
   ```bash
   sudo systemctl status mysql
   ```

2. 認証情報を確認（username, password）

3. データベースが存在するか確認:
   ```bash
   mysql -u cobbleranked -p -e "SHOW DATABASES;"
   ```

4. ポート3306が開いているか確認

</details>

<details>
<summary><strong>プレイヤーのEloをリセットしたい</strong></summary>

```
/rankedadmin setelo 1000 PlayerName singles
/rankedadmin setelo 1000 PlayerName doubles
```

</details>

<details>
<summary><strong>シーズンを手動で終了したい</strong></summary>

```
/rankedadmin season end
/rankedadmin season rotate
```

**注意:** クロスサーバーの場合、バトルサーバーで実行してください

</details>

---

## その他

<details>
<summary><strong>PlaceholderAPIとの連携</strong></summary>

100位までのランキングプレースホルダーが利用可能：

```
%cobbleranked_top_1_name%
%cobbleranked_top_1_elo%
%cobbleranked_top_singles_1_name%
%cobbleranked_top_doubles_1_winrate%
```

**詳細:** [PlaceholderAPI連携](../integration/placeholders.md)

</details>

<details>
<summary><strong>サポートが必要な場合</strong></summary>

1. [トラブルシューティングガイド](troubleshooting.md)を確認
2. [Discord](https://discord.gg/VVVvBTqqyP) の #feedbackチャンネルで質問
3. バグ報告時は以下を添付：
   - サーバーログ（`logs/latest.log`）
   - 設定ファイル（`config/cobbleranked/config.json5`）
   - 再現手順

</details>
