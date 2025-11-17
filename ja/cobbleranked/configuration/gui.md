# GUI & 言語カスタマイズ

---
**CobbleRanked** > **Configuration** > **GUI & 言語**
---

CobbleRankedインターフェースの外観、レイアウト、メッセージングをカスタマイズします。

## GUIファイル

**場所:** `config/cobbleranked/gui/`

CobbleRankedは言語固有のGUIファイルを使用:

```
gui/
├── gui-enUs.json5    # 英語
├── gui-jaJp.json5    # 日本語
├── gui-ptBr.json5    # ポルトガル語
└── gui-ruRu.json5    # ロシア語
```

各ファイルにはその言語の**すべての** GUI定義が含まれています。

## 利用可能なGUI

- **gui_ranked** - メインメニュー（キュー、統計、リーダーボード）
- **gui_top_ranked** - リーダーボード表示
- **gui_prepare_combat** - バトル前のチームプレビュー
- **gui_rewards** - シーズン/マイルストーン報酬
- **gui_ranked_blocked** - ブラックリストビューア
- **closeGui** - 閉じるボタン（共有）

## 基本的なカスタマイズ

### アイテム表示を変更

```json5
{
  "gui_ranked": {
    "title": "Ranked Battles",
    "rows": 3,
    "items": {
      "queue_singles": {
        "item": "minecraft:iron_sword",  // アイテムを変更
        "name": "Queue Singles",           // 名前を変更
        "slot": 11,                        // 位置を変更
        "lore": [
          "Click to join singles queue"
        ]
      }
    }
  }
}
```

### アイテムフィールド

| フィールド | 説明 | 必須 |
|-------|-------------|----------|
| `item` | アイテムID（例: `minecraft:diamond`） | はい |
| `name` | 表示名（カラーコード対応） | はい |
| `slot` | インベントリスロット（0-53） | はい |
| `lore` | 説明文の配列 | いいえ |
| `amount` | アイテムスタックサイズ（1-64） | いいえ |
| `glow` | エンチャント光沢を追加 | いいえ |

### カラーコード

`&`を使用してカラーを指定:
- `&a` - 緑
- `&c` - 赤
- `&e` - 黄色
- `&b` - 水色
- `&6` - 金色
- `&l` - 太字
- `&r` - リセット

例:
```json5
"name": "&a&lQueue Singles"  // 太字の緑色のテキスト
```

## GUIレイアウト

スロットは0-53で番号付け（6行 × 9列）:

```
 0  1  2  3  4  5  6  7  8
 9 10 11 12 13 14 15 16 17
18 19 20 21 22 23 24 25 26
27 28 29 30 31 32 33 34 35
36 37 38 39 40 41 42 43 44
45 46 47 48 49 50 51 52 53
```

> **[📸 画像必要: GUIスロット番号レイアウト図（0-53のマッピング表示、視覚的なグリッド）]**

## プレースホルダー

動的コンテンツ用のプレースホルダーを使用:

| プレースホルダー | 説明 |
|-------------|-------------|
| `{elo}` | プレイヤーのイロレーティング |
| `{wins}` | 勝利数 |
| `{losses}` | 敗北数 |
| `{rank}` | プレイヤーのランク順位 |
| `{tier}` | プレイヤーのティア（Pokeball、Greatballなど） |
| `{season}` | 現在のシーズン名 |
| `{queue_count}` | キュー内のプレイヤー数 |

例:
```json5
"lore": [
  "Your Elo: &e{elo}",
  "Wins: &a{wins} &7| Losses: &c{losses}"
]
```

> **[📸 画像必要: プレースホルダーが適用されたGUIアイテムの例（実際のElo値や勝敗数が表示されているツールチップ）]**

## 一般的なカスタマイズ

### キューボタンの位置を変更

```json5
"queue_singles": {
  "slot": 20  // 別のスロットに移動
}
```

### カスタム装飾アイテムを追加

```json5
"decoration": {
  "item": "minecraft:black_stained_glass_pane",
  "name": " ",
  "slot": 0
}
```

### リーダーボード表示を変更

```json5
"gui_top_ranked": {
  "title": "&6&lTop Players",
  "rows": 6
}
```

## 変更の適用

1. GUIファイルを編集
2. `/rankedadmin reload`を実行
3. GUIを再度開いて変更を確認

> **[📸 画像必要: カスタマイズ前後のGUI比較画像（デフォルトとカスタムアイテム/配置の違い）]**

**注意:** 設定リロードは`config.json5`から言語を自動検出します。

## トラブルシューティング

**GUIが更新されない:**
- JSON5構文をチェック（[JSONLint](https://jsonlint.com/)を使用）
- ファイルエンコーディングがUTF-8であることを確認
- `/rankedadmin reload`を実行

**アイテムが表示されない:**
- スロット番号をチェック（0-53の範囲）
- アイテムIDが有効か確認

**カラーが機能しない:**
- `§`ではなく`&`を使用
- フォーマットをリセットするために`&r`を確実に使用

---

## 言語カスタマイズ

### 概要

CobbleRankedには4つの組み込み言語が含まれています:
- **英語** (`en-Us.json5`) - デフォルト
- **日本語** (`ja-Jp.json5`)
- **ポルトガル語** (`pt-Br.json5`)
- **ロシア語** (`ru-Ru.json5`)

**ファイル:** `config/cobbleranked/language/`

すべてのメッセージ、通知、テキストはJSON5言語ファイルで完全にカスタマイズ可能です。

### 言語を選択

`config/cobbleranked/config.json5`を編集:

```json5
{
  "language": "en-Us"  // 変更先: en-Us, ja-Jp, pt-Br, ru-Ru
}
```

その後リロード:
```bash
/rankedadmin reload
```

---

## 言語ファイル構造

### ファイル形式

言語ファイルはキー・バリューペアでJSON5形式を使用:

```json5
{
  "message_key": "Message content with {placeholder}",
  "another_key": "Another message",
  "color_example": "&aGreen &cRed &eYellow text"
}
```

### 例: en-Us.json5

```json5
{
  // キューメッセージ
  "joined-queue": "&aYou have joined the ranked match queue.",
  "left-queue": "&cYou have left the ranked match queue.",
  "remaingFila": "&cSearching for a match... &7(&e{remaining}&7) &7(Position: &e{posicao}&7)",

  // バトルメッセージ
  "match-winner": "&aVictory!!",
  "match-winner-subtitle": "&aYou gained &f{gain} &aELO points.",
  "match-loser": "&cDefeat!!",
  "match-loser-subtitle": "&cYou lost &f{lose} &aELO points.",

  // 検証メッセージ
  "pokemon-blacklist": "&cYou are using a Pokémon that is on the blacklist.",
  "no-pokemon-ability": "&cYour Pokémon has an ability that is not allowed in ranked."
}
```

---

## メッセージカテゴリ

### キューメッセージ

| キー | 説明 | 例 |
|-----|-------------|---------|
| `joined-queue` | キュー参加通知 | "You have joined the ranked match queue." |
| `left-queue` | キュー退出通知 | "You have left the ranked match queue." |
| `remaingFila` | キュー待機状態 | "Searching for a match... (30s) (Position: 1)" |
| `match-found` | マッチ発見タイトル | "Match Found!" |
| `prepare-queue-cancel` | マッチキャンセルメッセージ | "Match was canceled. (A player disconnected)" |

### バトルメッセージ

| キー | 説明 | 例 |
|-----|-------------|---------|
| `battle-start-title` | バトル開始タイトル | "Battle Starting!" |
| `battle-countdown` | カウントダウン数字 | "3" |
| `match-started` | マッチ開始通知 | "Match Started" |
| `match-winner` | 勝利タイトル | "Victory!!" |
| `match-winner-subtitle` | イロレーティング獲得サブタイトル | "You gained 25 ELO points." |
| `match-loser` | 敗北タイトル | "Defeat!!" |
| `match-loser-subtitle` | イロレーティング損失サブタイトル | "You lost 18 ELO points." |

### 検証メッセージ

| キー | 説明 | 例 |
|-----|-------------|---------|
| `pokemon-blacklist` | 禁止ポケモンエラー | "You are using a Pokémon that is on the blacklist." |
| `no-pokemon-ability` | 禁止特性エラー | "Your Pokémon has an ability that is not allowed in ranked." |
| `blocked-item-move` | 禁止技エラー | "You have a Pokémon with moves that are blocked in ranked." |
| `no-pokemon-item` | 禁止道具エラー | "Your Pokémon has an item equipped that is not allowed in ranked." |
| `limit-pokemon` | チームサイズエラー | "You need to have 6 Pokémon to join the ranked match." |

### 管理者メッセージ

| キー | 説明 | 例 |
|-----|-------------|---------|
| `ranked-reload-adm` | 設定リロード成功 | "Settings reloaded successfully!" |
| `set-elo-adm` | イロレーティング設定コマンド | "Elo 1500 set successfully for player Steve" |
| `arena-not-found` | アリーナ未発見エラー | "Arena volcano_arena not found" |
| `noPermCommand` | 権限拒否 | "You do not have permission to use this command." |

---

## メッセージプレースホルダー

多くのメッセージは動的に置き換えられるプレースホルダーをサポート:

### プレイヤー & マッチプレースホルダー

| プレースホルダー | 説明 | 使用例 |
|-------------|-------------|---------------|
| `{player}` | プレイヤー名 | "match-finished": "{player} has won!" |
| `{player1}` | 最初のプレイヤー名 | "ranked-started": "{player1} vs {player2}" |
| `{player2}` | 2番目のプレイヤー名 | "prepare-queue-subtitle": "{player1} vs {player2}" |
| `{winner}` | 勝者名 | "match-finished": "{winner} has won!" |
| `{loser}` | 敗者名 | "match-finished": "{winner} defeated {loser}!" |

### イロレーティング & 統計プレースホルダー

| プレースホルダー | 説明 | 使用例 |
|-------------|-------------|---------------|
| `{gain}` | 獲得イロレーティング | "match-winner-subtitle": "You gained {gain} ELO" |
| `{lose}` | 損失イロレーティング | "match-loser-subtitle": "You lost {lose} ELO" |
| `{elo}` | イロレーティング | "elo-up": "You ranked up to {elo}." |
| `{wins}` | 勝利数 | "Your wins: {wins}" |
| `{losses}` | 敗北数 | "Your losses: {losses}" |

### キュー & システムプレースホルダー

| プレースホルダー | 説明 | 使用例 |
|-------------|-------------|---------------|
| `{remaining}` | 残り時間 | "remaingFila": "Searching... ({remaining})" |
| `{posicao}` | キュー位置 | "remaingFila": "Position: {posicao}" |
| `{time}` | 時間値 | "match-started-subtitle": "Duration is {time}m" |
| `{limit}` | チームサイズ制限 | "limit-pokemon": "You need {limit} Pokémon" |
| `{arena}` | アリーナ名 | "arena-not-found": "Arena {arena} not found" |

### ポケモンプレースホルダー

| プレースホルダー | 説明 | 使用例 |
|-------------|-------------|---------------|
| `{pokemon}` | ポケモン名 | "pokemon_switched": "Selected {pokemon}" |
| `{level}` | ポケモンレベル | "Level: {level}" |
| `{current}` | 現在のHP | "HP: {current}/{max}" |
| `{max}` | 最大HP | "HP: {current}/{max}" |
| `{label}` | ポケモンカテゴリー | "team_selection_label_limit_item": "{label}: {current}/{limit}" |

### プレースホルダーの例

```json5
{
  "match-finished": "&8* &f{winner} &chas just won a ranked match against &f{loser}.",
  "elo-up": "&aYou ranked up to &f{elo}.",
  "remaingFila": "&cSearching for a match... &7(&e{remaining}&7) &7(Position: &e{posicao}&7)"
}
```

**結果:**
- `{winner}` → "Steve"
- `{loser}` → "Alex"
- 出力: "* Steve has just won a ranked match against Alex."

---

## カラーコードリファレンス

### カラー

| コード | カラー | 例 |
|------|-------|---------|
| `&0` | 黒 | `&0Black text` |
| `&1` | ダークブルー | `&1Dark Blue` |
| `&2` | ダークグリーン | `&2Dark Green` |
| `&3` | ダークアクア | `&3Dark Aqua` |
| `&4` | ダークレッド | `&4Dark Red` |
| `&5` | ダークパープル | `&5Dark Purple` |
| `&6` | ゴールド | `&6Gold` |
| `&7` | グレー | `&7Gray` |
| `&8` | ダークグレー | `&8Dark Gray` |
| `&9` | ブルー | `&9Blue` |
| `&a` | グリーン | `&aGreen` |
| `&b` | アクア | `&bAqua` |
| `&c` | レッド | `&cRed` |
| `&d` | ライトパープル | `&dLight Purple` |
| `&e` | イエロー | `&eYellow` |
| `&f` | ホワイト | `&fWhite` |

### フォーマット

| コード | フォーマット | 例 |
|------|--------|---------|
| `&l` | 太字 | `&l&aBOLD GREEN` |
| `&m` | 取り消し線 | `&mStrikethrough` |
| `&n` | 下線 | `&nUnderline` |
| `&o` | 斜体 | `&oItalic` |
| `&r` | リセット | `&aGreen&r Normal` |

### 例

```json5
{
  "match-winner": "&a&lVictory!!",              // 太字の緑
  "match-loser": "&c&lDefeat!!",                // 太字の赤
  "elo-up": "&aYou ranked up to &f{elo}&a.",    // 白のイロレーティング付き緑
  "battle-start-title": "&e&lBattle Starting!"  // 太字の黄色
}
```

---

## カスタム言語の作成

### ステップ1: 既存の言語をコピー

```bash
cd config/cobbleranked/language/
cp en-Us.json5 es-Es.json5  # スペイン語の例
```

### ステップ2: メッセージを翻訳

`es-Es.json5`を編集:

```json5
{
  "joined-queue": "&aTe has unido a la cola de partidas clasificatorias.",
  "left-queue": "&cHas salido de la cola de partidas clasificatorias.",
  "match-winner": "&a¡¡Victoria!!",
  "match-loser": "&c¡¡Derrota!!",
  "pokemon-blacklist": "&cEstás usando un Pokémon que está en la lista negra.",
  // ... すべてのキーを翻訳
}
```

**重要:**
- すべてのキーを同じに保つ（値のみ翻訳）
- プレースホルダーを保持（例: `{player}`, `{elo}`）
- 同じカラーコードを使用するかカスタマイズ

### ステップ3: 言語を選択

`config.json5`を編集:

```json5
{
  "language": "es-Es"
}
```

### ステップ4: リロード

```bash
/rankedadmin reload
```

---

## 言語テスト

### 1. 設定をリロード

```bash
/rankedadmin reload
```

### 2. 一般的なメッセージをテスト

- キューに参加: `/ranked` → キューボタン
- バトルメッセージ: バトルを完了
- 検証: 禁止されたポケモン/技を試す
- 管理者: `/rankedadmin reload`

### 3. コンソールをチェック

`logs/latest.log`でエラーを探す:

```
[CobbleRanked] Message configurations for language es-Es loaded successfully!
```

エラーが発生した場合:
- JSON5構文をチェック
- ファイル名が設定と一致するか確認
- 不足しているキーを探す

---

## 言語トラブルシューティング

### 言語がロードされない

**症状:** 言語変更後も英語が表示される

**解決策:**
1. `config.json5`の`language`設定をチェック
2. ファイル名が完全に一致するか確認（大文字小文字区別）
3. リロード: `/rankedadmin reload`
4. コンソールでエラーをチェック

### メッセージが欠落

**症状:** 一部のメッセージがテキストの代わりにキーを表示

**解決策:**
1. `en-Us.json5`のすべてのキーがファイルに存在することを確認
2. 不足しているキーを英語ファイルからコピー
3. 設定をリロード

### プレースホルダーが置換されない

**症状:** プレイヤー名の代わりに`{player}`が表示される

**解決策:**
1. プレースホルダーのスペルを確認（大文字小文字区別）
2. プレースホルダーが正しいメッセージで使用されているかチェック
3. メッセージタイプに正しいプレースホルダーを使用

---

## ベストプラクティス

### 言語ファイル

**✅ やるべきこと:**
- すべての言語ファイルを同期（同じキー）
- 変更後にゲーム内でメッセージをテスト
- メッセージ全体で一貫したカラースキームを使用
- プレースホルダーのフォーマットを保持
- 整理のためにコメントを使用

**❌ やってはいけないこと:**
- キーの削除または名前変更（エラーの原因）
- 特殊文字のエスケープを忘れる
- 存在しないプレースホルダー名を使用
- 異なる引用符スタイルを一貫性なく混在

### 特殊文字

#### アポストロフィ

単一引用符をエスケープするために`''`（二重アポストロフィ）を使用:

```json5
{
  "lead_selection_gui_opponent_pokemon": "&7Opponent''s Pokemon"
}
```

#### バックスラッシュ

バックスラッシュをエスケープするために`\\`を使用:

```json5
{
  "permission-message": "&cYou don\\t have permission"
}
```

---

## 次のステップ

### GUIカスタマイズ用
1. **[カラーコードリファレンス](#カラーコードリファレンス)** - 完全なカラーとフォーマットガイド
2. **[プレースホルダー使用](#プレースホルダー)** - GUI内の動的コンテンツ
3. **[変更のテスト](#変更の適用)** - 変更のリロードと確認

### 言語カスタマイズ用
1. **[カスタム言語の作成](#カスタム言語の作成)** - 独自の言語を追加
2. **[メッセージカテゴリ](#メッセージカテゴリ)** - すべてのメッセージタイプを理解
3. **[特殊文字](#特殊文字)** - アポストロフィとエスケープの処理

### 高度な使用用
1. **[GUIレイアウトガイド](#guiレイアウト)** - スロット配置システム
2. **[テストツール](#言語テスト)** - 言語ファイルの検証
3. **[ベストプラクティス](#ベストプラクティス)** - プロフェッショナルなカスタマイズのヒント

---

## 関連ページ
- [クイックスタート](../getting-started/quick-start.md) - 動作中のGUIを確認
- [メイン設定](config.md) - 言語設定
- [トラブルシューティング](../support/troubleshooting.md#gui-issues) - GUI関連の問題
