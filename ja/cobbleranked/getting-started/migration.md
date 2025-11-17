# 移行ガイド

---
**CobbleRanked** > **始め方** > **移行**
---

CobbleRankedを最新バージョンに更新します。

## 移行前の準備

### 1. すべてをバックアップ

```bash
# 設定フォルダ
cp -r config/cobbleranked config/cobbleranked.backup

# SQLiteデータベース
cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup

# MySQLデータベース
mysqldump -u ranked -p cobbleranked > cobbleranked_backup.sql
```

### 2. サーバーを停止

```bash
/stop
```

## 移行手順

### 1. Modファイルを更新

```bash
# 古いバージョンを削除
rm mods/CobbleRanked-*.jar

# 新しいバージョンを追加
cp CobbleRanked-1.0.0.jar mods/
```

### 2. サーバーを起動

CobbleRankedは自動的に:
- データベーススキーマを移行
- 古い設定をJSON5に変換
- 不足している設定ファイルを作成

### 3. 移行を確認

```bash
# エラーをログで確認
tail -n 100 logs/latest.log | grep CobbleRanked

# ゲーム内でテスト
/ranked
```

## バージョン固有の変更

### 1.0.0+への移行

**データベース:**
- 単一イロレーティングからフォーマット固有の統計への自動移行
- 古い`player_ranked_stats`テーブル → `format_stats`テーブル

**設定:**
- YAML削除、JSON5のみ
- 新しいファイル: `restrictions.json5`、`inventory.json5`

**実行すること:**
1. Modファイルを更新
2. サーバーを起動(自動移行)
3. `/ranked` GUIが動作することを確認
4. プレイヤー統計が保持されていることを確認

### クロスサーバー設定(新規インストール)

クロスサーバーモードを追加する場合:

1. MySQL/MongoDBをインストール
2. Redisをインストール
3. すべてのサーバーを設定:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // または "battle"、"lobby"
    "battle_server": "battle"  // バトルサーバーの場合は ""
  }
}
```

[クロスサーバー設定](../advanced/cross-server.md)を参照

## トラブルシューティング

**移行が失敗:**
- ログを確認: `logs/latest.log`
- バックアップを復元して再試行
- ログの一部と共にDiscordで問題を報告

**プレイヤー統計が失われた:**
- バックアップデータベースが存在することを確認
- データベースの`format_stats`テーブルを確認
- 必要に応じてバックアップを使用して復元

**設定が変換されない:**
- `config/cobbleranked/`を削除(バックアップ後！)
- サーバーを再起動してデフォルトを再生成
- カスタム設定を再適用

**クロスサーバーが動作しない:**
- MySQL/Redisが実行中であることを確認
- すべてのサーバーが同じデータベース設定を持つことを確認
- 接続をテスト: `redis-cli ping`

## ロールバック(必要な場合)

```bash
# サーバーを停止
/stop

# 古いModを復元
rm mods/CobbleRanked-*.jar
cp backup/CobbleRanked-old.jar mods/

# 設定を復元
rm -rf config/cobbleranked
cp -r config/cobbleranked.backup config/cobbleranked

# データベースを復元(SQLite)
cp config/cobbleranked/ranked.db.backup config/cobbleranked/ranked.db

# データベースを復元(MySQL)
mysql -u ranked -p cobbleranked < cobbleranked_backup.sql

# サーバーを起動
```

## ヘルプを得る

**質問前に:**
1. エラーメッセージのログを確認
2. バックアップが作成されていることを確認
3. テストサーバーでクリーンインストールを試す

**質問先:**
- [Discord](https://discord.gg/cobbleranked) - #supportチャンネル
- [GitHub Issues](https://github.com/gqrshy/cobbleranked/issues)

---

## 次のステップ

### 移行成功後
1. **[設定確認](../configuration/config.md)** - すべての設定が正しく移行されたか確認
2. **[バトルテスト](quick-start.md#step-4-test-the-system)** - すべてが動作することを確認するテストマッチを実行
3. **[新機能確認](../README.md#features)** - 最新バージョンの新機能を確認

### 移行失敗時
1. **[トラブルシューティングガイド確認](../support/troubleshooting.md)** - よくある移行問題
2. **[バックアップから復元](#rollback-if-needed)** - 上記のロールバック手順を使用
3. **[サポート取得](../support/faq.md#getting-help)** - ログと共に支援を求める

---

## 関連ページ
- [インストールガイド](installation.md) - 新規インストールリファレンス
- [データベースガイド](../advanced/database.md) - データベース移行の詳細
- [トラブルシューティング](../support/troubleshooting.md) - よくある問題と解決策
