# コマンド

---
**CobbleRanked** > **始め方** > **コマンド**
---

CobbleRankedで利用可能なすべてのコマンド。

## プレイヤーコマンド

**権限:** 不要

### `/ranked`

キュー、統計、リーダーボードのランクGUIを開きます。

> **[📸 IMAGE NEEDED: /rankedコマンド実行時のGUI表示例]**

### `/season`

現在のシーズン情報(名前、状態、残り時間)を表示します。

> **[📸 IMAGE NEEDED: /seasonコマンド実行結果(シーズン名、開始日、終了日、残り時間の表示)]**

## 管理コマンド

**権限:** OPレベル2が必要

### システム

**`/rankedadmin reload`** - すべての設定をリロード(クロスサーバーモードを除く)

### アリーナ管理

**`/rankedadmin setArena <name> <pos1|pos2>`** - アリーナのコーナー位置を設定
- 場所に立ってコマンドを実行
- 例: `/rankedadmin setArena arena1 pos1`

**`/rankedadmin setexit`** - バトル後のプレイヤー退出場所を設定
- 希望する退出場所に立ってコマンドを実行

**`/rankedadmin teleportArena <arena>`** - アリーナの中心にテレポート

**`/rankedadmin arena status`** - すべてのアリーナと使用状況を表示

> **[📸 IMAGE NEEDED: /rankedadmin arena statusコマンド実行結果(アリーナ一覧と使用状況)]**

**`/rankedadmin arena enable <arena>`** - アリーナを有効化

**`/rankedadmin arena disable <arena>`** - アリーナを無効化

### プレイヤーイロレーティング管理

**`/rankedadmin setelo <amount> <player> <format>`** - プレイヤーのイロレーティングを設定
- フォーマット: `SINGLES`、`DOUBLES`、`TRIPLES`、`MULTI`
- 例: `/rankedadmin setelo 1500 Player123 SINGLES`

**`/rankedadmin addelo <amount> <player> <format>`** - イロレーティングポイントを追加

**`/rankedadmin removeelo <amount> <player> <format>`** - イロレーティングポイントを削除

**`/rankedadmin setflee <player> <amount>`** - 逃走カウントを設定
- `0`を使用して逃走ペナルティをクリア

### シーズン管理

**バトルサーバーのみ** - これらのコマンドはバトルサーバーとして設定されたサーバー(`cross_server.battle_server: ""`)でのみ機能します。

**`/rankedadmin season info`** - 現在のシーズンの詳細を表示

**`/rankedadmin season history [limit]`** - 過去のシーズンを表示(デフォルト: 5)

**`/rankedadmin season create <days> <name>`** - 新しいシーズンを作成
- 現在のシーズンを自動的に終了
- 例: `/rankedadmin season create 30 "Season 2 - Summer Cup"`

**`/rankedadmin season rotate`** - シーズンローテーションを強制(次のシーズンを開始)

**`/rankedadmin season end`** - 現在のシーズンを即座に終了

**`/rankedadmin season setend <minutes>`** - 現在から分単位でシーズン終了時刻を設定

**`/rankedadmin season rename <name>`** - 現在のシーズンの名前を変更

## タブ補完

すべてのコマンドにスマートなタブ補完があります:

- アリーナ名は設定されたアリーナから自動補完
- プレイヤー名はオンラインプレイヤーを表示
- フォーマットは有効なオプションを提案(SINGLES、DOUBLESなど)
- イロレーティング量は一般的な値を提案(1000、1200、1500)
- シーズン期間は一般的な期間を提案(7、14、30日)

## 権限ノード

LuckPermsがインストールされている場合、これらの権限ノードを使用できます:

- `cobbleranked.command.ranked` - /rankedコマンド
- `cobbleranked.command.season` - /seasonコマンド
- `cobbleranked.command.admin.*` - すべての管理コマンド
- `cobbleranked.command.admin.reload` - リロードコマンド
- `cobbleranked.command.admin.arena` - アリーナコマンド
- `cobbleranked.command.admin.elo` - イロレーティング管理
- `cobbleranked.command.admin.season` - シーズン管理

**注意:** LuckPermsがインストールされていない場合、権限システムはデフォルトでOPレベル2チェックになります。

---

## 次のステップ

### 新規管理者向け
1. **[クイックスタートガイド](quick-start.md)** - 最初の設定でコマンドを練習
2. **[アリーナ設定](../configuration/arenas.md)** - アリーナコマンドを効果的に使用
3. **[シーズン管理](../features/seasons.md)** - シーズンローテーションコマンドの理解

### プレイヤー管理向け
1. **[イロレーティングシステム](../features/elo-system.md)** - プレイヤーのイロレーティング調整のタイミングを学ぶ
2. **[切断ペナルティ](../features/disconnect-penalties.md)** - 逃走カウントの管理
3. **[報酬システム](../configuration/rewards.md)** - コマンドベースの報酬設定

---

## 関連ページ
- [メイン設定](../configuration/config.md) - コマンドが相互作用する設定
- [クイックスタート](quick-start.md) - 実用的なコマンド使用例
- [FAQ](../support/faq.md) - よくあるコマンド質問
