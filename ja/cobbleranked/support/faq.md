# よくある質問（FAQ）

---
**CobbleRanked** > **Support** > **FAQ**
---

CobbleRankedについてのよくある質問と回答。

---

## 基本情報

<details>
<summary><strong>CobbleRankedとは？</strong></summary>

Cobblemonサーバー用の競技的ランクバトルシステム。

- イロレーティングベースのマッチメイキング
- シングル/ダブルスバトル
- 報酬付きシーズンシステム
- ポケモン/技/特性/道具の制限
- クロスサーバーサポート（オプション）

</details>

<details>
<summary><strong>どこでダウンロードできますか？</strong></summary>

**公式:** [Discord](https://discord.gg/VVVvBTqqyP)（現在唯一の配布チャンネル）

Modrinth/CurseForge近日公開。

</details>

<details>
<summary><strong>要件は何ですか？</strong></summary>

- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.7.0+
- Fabric API 0.116.6+
- Fabric Language Kotlin 1.13.6+

</details>

<details>
<summary><strong>クロスサーバーは必須ですか？</strong></summary>

いいえ。シングルサーバーモードは設定なしで動作します。

クロスサーバーは複数のサーバーでランキングを共有したい場合にのみ必要です。

</details>

---

## インストール & セットアップ

<details>
<summary><strong>設定ファイルが生成されない</strong></summary>

1. すべての依存関係がインストールされていることを確認
2. サーバーを完全に起動
3. `logs/latest.log`でエラーをチェック

</details>

<details>
<summary><strong>言語を変更するには？</strong></summary>

`config/cobbleranked/config.json5`を編集:

```json5
{
  "language": "ja-Jp"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

保存して`/rankedadmin reload`を実行。

</details>

<details>
<summary><strong>設定変更が適用されない</strong></summary>

1. ファイルが保存されていることを確認
2. `/rankedadmin reload`を実行
3. JSON5構文をチェック（カンマ、括弧）
4. サーバーログで`[CobbleRanked] Configuration loaded`を探す

</details>

---

## ブラックリスト設定

<details>
<summary><strong>技名を確認するには？</strong></summary>

技名は**小文字スネークケース**形式を使用。

| 表示名 | 内部名 |
|--------------|---------------|
| じわれ | `fissure` |
| ぜったいれいど | `sheer_cold` |
| バトンタッチ | `baton_pass` |
| おはかまいり | `last_respects` |
| 10まんボルト | `thunderbolt` |

**パターン:** スペースをアンダースコアに置き換え、小文字を使用

</details>

<details>
<summary><strong>特性名を確認するには？</strong></summary>

### ゲーム内方法

1. F3 + Hを押す
2. ポケモンのステータス画面を開く
3. 特性アイコンにカーソルを合わせる

### 一般的な特性

| 表示名 | 内部名 |
|--------------|---------------|
| いかく | `intimidate` |
| ひでり | `drought` |
| ムラっけ | `moody` |
| かげふみ | `shadow_tag` |
| ありじごく | `arena_trap` |
| ちからもち | `huge_power` |

</details>

<details>
<summary><strong>アイテムIDを確認するには？</strong></summary>

### 最も簡単な方法

1. F3 + Hを押す
2. インベントリでアイテムにカーソルを合わせる
3. 下部にIDが表示される（例: `cobblemon:bright_powder`）

### コマンドを使用

```
/give @s <TAB>
```

Tabキーでアイテム IDリストが表示される。

### フォーマット

`cobblemon:item_name`形式を使用する必要がある。

```
正しい: "cobblemon:bright_powder"
間違い: "Bright Powder", "brightpowder"
```

</details>

---

## クロスサーバー

<details>
<summary><strong>クロスサーバーセットアップガイド（MySQL）</strong></summary>

### 1. MySQLデータベースを作成

```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

### 2. すべてのサーバーを設定

**バトルサーバー:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // 空 = これがバトルサーバー
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
    "server_id": "lobby1",  // サーバーごとに変更
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

---

## トラブルシューティング

<details>
<summary><strong>権限エラー</strong></summary>

管理者コマンドにはOPが必要:

```
/op YourUsername
```

または権限プラグイン経由で`cobbleranked.admin`を付与

</details>

<details>
<summary><strong>データベース接続エラー</strong></summary>

1. MySQLが実行中かチェック:
   ```bash
   sudo systemctl status mysql
   ```

2. 認証情報を確認（ユーザー名、パスワード）

3. データベースが存在するかチェック:
   ```bash
   mysql -u cobbleranked -p -e "SHOW DATABASES;"
   ```

4. ポート3306が開いているか確認

</details>

<details>
<summary><strong>プレイヤーのイロレーティングをリセット</strong></summary>

```
/rankedadmin setelo 1000 PlayerName singles
/rankedadmin setelo 1000 PlayerName doubles
```

</details>

<details>
<summary><strong>シーズンを手動で終了</strong></summary>

```
/rankedadmin season end
/rankedadmin season rotate
```

**注意:** クロスサーバーの場合、バトルサーバーでのみ実行

</details>

---

## 次のステップ

### 新規管理者用
1. **[インストールガイド](../getting-started/installation.md)** - CobbleRankedをインストール
2. **[クイックスタート](../getting-started/quick-start.md)** - 最初のバトルをセットアップ
3. **[コマンドリファレンス](../getting-started/commands.md)** - 必須コマンドを学ぶ

### トラブルシューティング用
1. **[トラブルシューティングガイド](troubleshooting.md)** - 詳細な問題解決
2. **[一般的な問題](#インストール--セットアップ)** - クイック回答
3. **[ヘルプの取得](#need-support)** - DiscordとサポートチャンネルFAQEOF
# トラブルシューティング

---
**CobbleRanked** > **Support** > **トラブルシューティング**
---

CobbleRankedの一般的な問題とその解決策。

## インストール問題

### Modがロードされない

**症状:**
- コンソールにCobbleRankedメッセージがない
- `/ranked`コマンドが機能しない
- Modがmodリストに表示されない

**解決策:**

1. **Fabric Loaderがインストールされているか確認:**
   ```bash
   # modsフォルダをチェック
   ls mods/ | grep fabric
   ```
   `fabric-loader-*.jar`が表示されるはず

2. **依存関係をチェック:**
   - Fabric API (`fabric-api-*.jar`)
   - Cobblemon (`cobblemon-*.jar`)
   - Fabric Language Kotlin (`fabric-language-kotlin-*.jar`)

3. **サーバーログをチェック:**
   ```bash
   cat logs/latest.log | grep CobbleRanked
   ```
   Modロード中のエラーを探す

4. **Minecraftバージョンを確認:**
   - CobbleRankedはMinecraft 1.21.1が必要
   - `server.properties`で正しいバージョンをチェック

### 設定ファイルが生成されない

**症状:**
- `config/cobbleranked/`フォルダがない
- 設定ファイルが欠落

**解決策:**

1. **サーバーを少なくとも1回起動:**
   - 設定は最初の起動時に生成される
   - 「Done!」メッセージを待つ

2. **ファイル権限をチェック:**
   ```bash
   ls -la config/
   ```
   サーバーが`config/`フォルダに書き込めることを確認

3. **フォルダを手動作成:**
   ```bash
   mkdir -p config/cobbleranked
   ```
   その後サーバーを再起動

4. **エラーをチェック:**
   ```bash
   grep -i "error" logs/latest.log | grep -i "cobbleranked"
   ```

---

## キュー & マッチメイキング問題

### キューに参加できない

**症状:**
- キューボタンをクリックしても何も起こらない
- 参加時にエラーメッセージ

**解決策:**

1. **チームサイズをチェック:**
   - デフォルトは6ポケモン必要
   - エラー: 「6ポケモンが必要です」
   - 解決策: ポケモンを捕獲/育成

2. **ポケモンが生きているかチェック:**
   - すべてのポケモンのHP > 0が必要
   - エラー: 「ポケモンが生きている必要があります！」
   - 解決策: ポケモンセンターで回復

3. **ブラックリスト違反をチェック:**
   - パーティに禁止ポケモン
   - 禁止技/特性/道具
   - エラー: 「ブラックリストに載っているポケモンを使用しています」
   - 解決策: 禁止ポケモンを削除、[ブラックリスト](../configuration/blacklist.md)を参照

4. **ランク状態をチェック:**
   - システムが閉じているかもしれない
   - エラー: 「ランクマッチは開いていません」
   - 解決策: 管理者に開くよう連絡: `/rankedadmin open`

### キューが永遠にかかる

**症状:**
- 5分以上キュー中
- マッチが見つからない

**解決策:**

1. **アクティブプレイヤーをチェック:**
   - キューには少なくとも2プレイヤーが必要
   - チャットで他の人がキューイングしているか確認

2. **形式をチェック:**
   - 両プレイヤーが同じ形式でキューイング（シングルvsダブルス）
   - 一方が空の場合は別の形式を試す

3. **イロレーティング範囲をチェック:**
   - 非常に高い/低いイロレーティングは対戦相手が少ない可能性
   - 範囲は時間経過で拡大（デフォルト: 50秒ごと）

4. **クロスサーバーをチェック:**
   - クロスサーバーが有効な場合、Redis接続を確認
   - 他のサーバーにプレイヤーがいるかチェック

---

## バトル問題

### イロレーティングがバトル後に更新されない

**症状:**
- バトル完了（勝利/敗北）
- イロレーティングが同じまま

**解決策:**

1. **バトルが引き分けで終了したかチェック:**
   - ターン制限到達（デフォルト: 100ターン）
   - 引き分けはイロレーティングを変更しない
   - 解決策: 設定でターン制限を増やす

2. **イロレーティングシステムが有効かチェック:**
   ```json5
   {
     "eloSystem": {
       "mode": "POKEMON_SHOWDOWN"  // または "LEGACY"
     }
   }
   ```

3. **データベース接続をチェック:**
   - SQLite: `config/cobbleranked/ranked.db`が存在するか確認
   - MySQL: `mysql -u user -p -h host database`で接続をテスト

4. **コンソールでエラーをチェック:**
   ```bash
   grep -i "elo" logs/latest.log | grep -i "error"
   ```

---

## 設定問題

### 設定がリロードされない

**症状:**
- `config.json5`を変更
- `/rankedadmin reload`を実行
- 変更が適用されない

**解決策:**

1. **JSON5構文をチェック:**
   - バリデーターを使用: https://json5.org
   - 一般的なエラー: カンマの欠落
   - 一般的なエラー: 最後のアイテムの後のカンマ（JSON5では許可！）

2. **ファイルが保存されているかチェック:**
   - 編集後にファイルを保存したことを確認
   - ファイルの変更時刻をチェック

3. **サーバーを再起動:**
   - 一部の設定は完全な再起動が必要
   - サーバーを停止、再起動、再テスト

4. **コンソールでエラーをチェック:**
   ```bash
   grep -i "error" logs/latest.log | tail -20
   ```

---

## 報酬問題

### 報酬がGUIに表示されない

**症状:**
- マイルストーン達成（例: 10勝）
- GUIに報酬アイテムなし

**解決策:**

1. **報酬が設定されているかチェック:**
   - `rewards.json5`を開く
   - 形式（シングル/ダブルス）のマイルストーンが存在するか確認

2. **既に請求済みかチェック:**
   - 報酬はシーズンごとに1回
   - このシーズンで既に請求したかチェック

3. **形式をチェック:**
   - シングルマイルストーンはシングルプレイヤーのみに表示
   - ダブルマイルストーンはダブルプレイヤーのみ

4. **報酬をリロード:**
   ```bash
   /rankedadmin reload
   ```

---

## クロスサーバー問題

### プレイヤーがサーバー間で互いに見えない

**症状:**
- マルチサーバーセットアップ
- サーバーAのプレイヤーがサーバーBとマッチできない

**解決策:**

1. **MySQL接続をチェック:**
   - すべてのサーバーが同じMySQLデータベースに接続する必要がある
   ```bash
   mysql -u username -p -h host database
   ```

2. **Redis接続をチェック:**
   - リアルタイムキュー同期に必要
   ```bash
   redis-cli -h host -p port PING
   ```
   応答: `PONG`

3. **battle_server設定をチェック:**
   - `battle_server: ""`を持つサーバーは1つのみ
   - 他はすべてバトルサーバーを指す

4. **cross_serverが有効かチェック:**
   ```json5
   {
     "cross_server": {
       "enabled": true
     }
   }
   ```

詳細ガイドについては[クロスサーバーセットアップ](../advanced/cross-server.md)を参照。

---

## ヘルプの取得

### 提供すべき情報

ヘルプを求める際は以下を含める:

1. **CobbleRankedバージョン:**
   - Mod JARファイル名をチェック

2. **Cobblemonバージョン:**
   ```bash
   ls mods/ | grep cobblemon
   ```

3. **Minecraftバージョン:**
   - `server.properties`をチェック

4. **エラーメッセージ:**
   ```bash
   tail -100 logs/latest.log
   ```

5. **設定ファイル:**
   - `config.json5`
   - `blacklist.json5`（関連する場合）

6. **再現手順:**
   - 問題が発生した時に何をしていたか？

### ヘルプを得る場所

- **Discordサーバー:** [サポートに参加](https://discord.gg/VVVvBTqqyP) (#feedbackチャンネル)
- **ドキュメント:** [FAQ](faq.md)
- **メール:** garshy.gaming@gmail.com
- **Discord DM:** @gashicha

---

## 次のステップ

### インストール問題用
1. **[インストールガイド](../getting-started/installation.md)** - 完全なセットアップ手順
2. **[依存関係チェック](#インストール問題)** - すべてのModがインストールされているか確認
3. **[設定ファイル](#設定ファイルが生成されない)** - 設定を生成

### バトル問題用
1. **[クイックスタートガイド](../getting-started/quick-start.md)** - 基本的なバトルフローをテスト
2. **[アリーナ設定](../configuration/arenas.md)** - バトル場所をセットアップ
3. **[コマンドリファレンス](../getting-started/commands.md)** - 管理者トラブルシューティングコマンド

### クロスサーバー問題用
1. **[クロスサーバーセットアップガイド](../advanced/cross-server.md)** - 完全なセットアップ手順
2. **[データベース設定](../advanced/database.md)** - MySQL/MongoDB/Redis
3. **[FAQクロスサーバー](faq.md#cross-server)** - 一般的なクロスサーバーの質問

---

## 関連ページ
- [FAQ](faq.md) - よくある質問
- [コマンドリファレンス](../getting-started/commands.md) - デバッグコマンド
- [メインドキュメント](../README.md) - 機能概要
TSEOF
