# ブラックリスト設定

ランク戦で使用できるポケモン、技、特性、持ち物を制限する機能です。

**設定ファイル:** `config/cobbleranked/blacklist.json5`

---

## 🎯 できること

- ✅ **ラベル指定で一括禁止** - 伝説、幻、準伝説などをまとめて禁止
- ✅ **個別のポケモン禁止** - 特定のポケモンやフォーム（メガシンカ等）を禁止
- ✅ **数量制限** - 「伝説は1匹まで」「準伝説は2匹まで」など
- ✅ **技の禁止** - 一撃必殺技、バトンタッチなど
- ✅ **特性の禁止** - ムラっけ、かげふみなど
- ✅ **持ち物の禁止** - こうこうのしっぽ、きあいのタスキなど

---

## 📋 クイックスタート

### 最もシンプルな設定

伝説・幻ポケモンと一撃必殺技を禁止する場合：

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

これだけで完了です！ファイルを保存して `/rankedadmin reload` を実行してください。

<details>
<summary><strong>設定を反映する方法</strong></summary>

1. `config/cobbleranked/blacklist.json5` を編集
2. ファイルを保存
3. サーバーで `/rankedadmin reload` を実行
4. テストとしてキューに参加してみる

</details>

---

## 🏷️ ポケモンのラベル禁止（推奨）

**一番簡単な方法**は、ポケモンをラベルで禁止することです。

### 利用可能なラベル

| ラベル | 説明 | 例 |
|-------|------|-----|
| `legendary` | 伝説のポケモン | ミュウツー、ルギア、レックウザ、ディアルガ |
| `mythical` | 幻のポケモン | ミュウ、セレビィ、ジラーチ、ビクティニ |
| `restricted` | VGC制限級 | 伝説ポケモン（カバーレジェンド） |
| `ultra_beast` | ウルトラビースト | ウツロイド、マッシブーン、デンジュモク |
| `paradox` | パラドックスポケモン（第9世代） | テツノワダチ、イダイナキバ、ハバタクカミ |
| `starter` | 御三家 | フシギダネ、ヒトカゲ、ゼニガメ |
| `fossil` | 化石ポケモン | オムナイト、カブト、プテラ |
| `baby` | ベビィポケモン | ピチュー、ピィ、ププリン |
| `powerhouse` | 600族（疑似伝説） | カイリュー、ガブリアス、ボーマンダ |
| `gen1` ~ `gen9` | 世代別 | `gen1` = カントー、`gen9` = パルデア |

### 設定例

<details>
<summary><strong>例1: 伝説・幻ポケモンを禁止</strong></summary>

```json5
{
  "black_list_labels": ["legendary", "mythical"]
}
```

これだけで、ミュウツー、ルギア、ミュウ、セレビィなど全ての伝説・幻ポケモンが禁止されます。

</details>

<details>
<summary><strong>例2: 第9世代ポケモンを禁止</strong></summary>

```json5
{
  "black_list_labels": ["gen9", "paradox"]
}
```

パルデア地方のポケモンとパラドックスポケモンが使用できなくなります。

</details>

<details>
<summary><strong>例3: 複数のラベルを組み合わせて禁止</strong></summary>

```json5
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "restricted",
    "ultra_beast",
    "paradox"
  ]
}
```

競技性の高いルールセットに適した設定です。

</details>

---

## 🔢 ポケモンの数量制限

完全に禁止するのではなく、「〜匹まで」という制限をかけられます。

### 設定方法

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // 伝説のポケモンは1匹まで
    "restricted": 2,     // 準伝説は2匹まで
    "mythical": 0        // 幻のポケモンは0匹（完全禁止と同じ）
  }
}
```

### 実用例

<details>
<summary><strong>VGC Series 1ルール（制限級2匹まで）</strong></summary>

VGCの公式ルールを再現：

```json5
{
  "restricted_label_limits": {
    "restricted": 2      // 制限級ポケモンは2匹まで
  },
  "black_list_labels": ["mythical"]  // 幻のポケモンは禁止
}
```

</details>

<details>
<summary><strong>カジュアルサーバー（伝説1匹までOK）</strong></summary>

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // 伝説は1匹まで
    "mythical": 1        // 幻も1匹まで
  }
}
```

</details>

<details>
<summary><strong>ラベル禁止と数量制限の組み合わせ</strong></summary>

特定のポケモンだけ個別で禁止することもできます：

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // 伝説は1匹まで
  },
  "black_list_pokemon": [
    "mewtwo",            // ただしミュウツーは完全禁止
    "rayquaza"           // レックウザも完全禁止
  ]
}
```

この場合、伝説ポケモンは1匹まで使えますが、ミュウツーとレックウザは例外として完全に禁止されます。

</details>

---

## 🚫 個別のポケモン禁止

特定のポケモンだけを禁止したい場合に使います。

### 基本的な禁止

```json5
{
  "black_list_pokemon": [
    "mewtwo",
    "rayquaza",
    "zacian"
  ]
}
```

> **注意:** 大文字小文字は区別されません（`mewtwo`, `Mewtwo`, `MEWTWO` は全て同じ）

### フォーム（姿）の指定

メガシンカやリージョンフォームだけを禁止できます：

<details>
<summary><strong>メガシンカのみ禁止</strong></summary>

```json5
{
  "black_list_pokemon": [
    "mewtwo:mega_x",     // メガミュウツーXのみ禁止
    "mewtwo:mega_y",     // メガミュウツーYのみ禁止
    "charizard:mega_x",
    "charizard:mega_y"
  ]
}
```

通常のミュウツーとリザードンは使用可能です。

</details>

<details>
<summary><strong>リージョンフォームのみ禁止</strong></summary>

```json5
{
  "black_list_pokemon": [
    "weezing:galar",     // ガラルマタドガスのみ禁止
    "muk:alola"          // アローラベトベトンのみ禁止
  ]
}
```

通常のマタドガスとベトベトンは使用可能です。

</details>

<details>
<summary><strong>フォーム指定の注意点</strong></summary>

- **フォームなし** (`mewtwo`): **全てのフォーム**が禁止される
- **フォームあり** (`mewtwo:mega_x`): **そのフォームのみ**が禁止される

```json5
// ❌ これは全てのミュウツーが禁止される
"black_list_pokemon": ["mewtwo"]

// ✅ これはメガミュウツーXのみが禁止される
"black_list_pokemon": ["mewtwo:mega_x"]
```

</details>

---

## ⚔️ 技の禁止

特定の技を使えないようにします。

### 設定方法

```json5
{
  "black_list_moves": [
    "fissure",           // じわれ
    "sheer_cold",        // ぜったいれいど
    "horn_drill",        // つのドリル
    "guillotine",        // ハサミギロチン
    "baton_pass",        // バトンタッチ
    "last_respects",     // おはかまいり
    "shed_tail"          // しっぽきり
  ]
}
```

### よく使われる禁止技

<details>
<summary><strong>一撃必殺技（OHKO）</strong></summary>

```json5
{
  "black_list_moves": [
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine"
  ]
}
```

</details>

<details>
<summary><strong>Smogon OUで禁止されている技</strong></summary>

```json5
{
  "black_list_moves": [
    "baton_pass",        // バトンタッチ
    "last_respects",     // おはかまいり（第9世代）
    "shed_tail"          // しっぽきり（第9世代）
  ]
}
```

</details>

<details>
<summary><strong>技名の確認方法</strong></summary>

技名は**英語の小文字・スネークケース**で指定します：

| 日本語名 | 内部名 |
|---------|--------|
| じわれ | `fissure` |
| ぜったいれいど | `sheer_cold` |
| バトンタッチ | `baton_pass` |
| おはかまいり | `last_respects` |
| 10まんボルト | `thunderbolt` |

**確認方法:**
1. Cobblemonの技データを確認
2. または、実際に技を覚えさせてキューに参加し、ログで内部名を確認

</details>

---

## 🧬 特性の禁止

特定の特性を禁止できます。

### 設定方法

```json5
{
  "black_list_ability": [
    "moody",             // ムラっけ
    "shadow_tag",        // かげふみ
    "arena_trap"         // ありじごく
  ]
}
```

### よく禁止される特性

<details>
<summary><strong>Smogonで禁止されている特性</strong></summary>

```json5
{
  "black_list_ability": [
    "moody",             // ムラっけ（ランダムな能力変化）
    "shadow_tag",        // かげふみ（交代を封じる）
    "arena_trap"         // ありじごく（地面タイプを逃がさない）
  ]
}
```

</details>

<details>
<summary><strong>特性名の確認方法</strong></summary>

### ゲーム内で確認（推奨）

1. `F3 + H` を押して詳細ツールチップを有効化
2. ポケモンのステータス画面を開く
3. 特性アイコンにカーソルを合わせる
4. 内部名が表示されます（例: `intimidate`, `drought`）

### よく使われる特性名リファレンス

| 日本語名 | 内部名 | 備考 |
|---------|--------|------|
| いかく | `intimidate` | 相手の攻撃を下げる |
| ひでり | `drought` | 晴れ状態にする |
| あめふらし | `drizzle` | 雨状態にする |
| すなおこし | `sand_stream` | 砂嵐状態にする |
| ゆきふらし | `snow_warning` | 雪状態にする |
| ムラっけ | `moody` | ランダムな能力変化 |
| かげふみ | `shadow_tag` | 交代を封じる |
| ありじごく | `arena_trap` | 地面タイプを逃がさない |
| ちからもち | `huge_power` | 攻撃2倍 |
| ふしぎなまもり | `wonder_guard` | 効果抜群のみ受ける |
| へんげんじざい | `protean` | 技のタイプに変化 |
| リベロ | `libero` | へんげんじざいと同じ |

**パターン:**
- スペースはアンダースコアに: "Shadow Tag" → `shadow_tag`
- 小文字を使用: "Huge Power" → `huge_power`

</details>

---

## 🎒 持ち物の禁止

特定のアイテムを持たせられないようにします。

### 設定方法

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // ひかりのこな（回避率UP）
    "cobblemon:lax_incense",      // のんきのおこう（回避率UP）
    "cobblemon:quick_claw",       // せんせいのツメ（先制攻撃）
    "cobblemon:soul_dew"          // こころのしずく（ラティ専用）
  ]
}
```

> **重要:** アイテムIDは必ず `cobblemon:item_name` の形式で指定してください。

### よく禁止されるアイテム

<details>
<summary><strong>回避率UPアイテム</strong></summary>

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // ひかりのこな
    "cobblemon:lax_incense"       // のんきのおこう
  ]
}
```

</details>

<details>
<summary><strong>Smogon OUで禁止されているアイテム</strong></summary>

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense",
    "cobblemon:quick_claw"        // 運ゲー要素が強いため
  ]
}
```

</details>

<details>
<summary><strong>アイテムIDの確認方法</strong></summary>

### ゲーム内で確認（一番簡単）

1. `F3 + H` を押す（詳細ツールチップを有効化）
2. インベントリでアイテムにカーソルを合わせる
3. 下部にIDが表示されます（例: `cobblemon:bright_powder`）

### コマンドで確認

```
/give @s <TAB>
```

Tab キーを押すと、オートコンプリートでアイテムID一覧が表示されます。

### なぜフルIDが必要？

- **MOD間の競合を防ぐ**: `cobblemon:potion` と `minecraft:potion` を区別
- **言語に依存しない**: どの言語設定でも動作
- **正確なマッチング**: 誤った禁止を防ぐ

**形式:**
```
正しい: "cobblemon:bright_powder"
間違い: "Bright Powder", "brightpowder", "bright powder"
```

</details>

---

## 📖 設定例集

### Smogon OU（競技向け）

<details>
<summary><strong>設定を見る</strong></summary>

```json5
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "restricted",
    "ultra_beast",
    "paradox"
  ],
  "black_list_moves": [
    "baton_pass",
    "last_respects",
    "shed_tail",
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine"
  ],
  "black_list_ability": [
    "moody",
    "shadow_tag",
    "arena_trap"
  ],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

</details>

### VGC Series 1（公式ルール）

<details>
<summary><strong>設定を見る</strong></summary>

```json5
{
  "restricted_label_limits": {
    "restricted": 2      // 制限級ポケモン2匹まで
  },
  "black_list_labels": [
    "mythical"           // 幻のポケモンは禁止
  ],
  "black_list_moves": [
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine"
  ]
}
```

</details>

### カジュアルサーバー

<details>
<summary><strong>設定を見る</strong></summary>

```json5
{
  "black_list_labels": [],  // 何も禁止しない
  "black_list_moves": [
    "fissure",             // 一撃必殺技のみ禁止
    "sheer_cold",
    "horn_drill",
    "guillotine"
  ]
}
```

</details>

### 第1〜8世代のみ（第9世代禁止）

<details>
<summary><strong>設定を見る</strong></summary>

```json5
{
  "black_list_labels": [
    "gen9",
    "paradox"
  ]
}
```

</details>

### モノタイプ（単タイプ統一）

<details>
<summary><strong>設定を見る</strong></summary>

```json5
{
  "black_list_labels": [
    "legendary",
    "mythical"
  ],
  "black_list_moves": [
    "baton_pass"
  ],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

</details>

---

## 🔍 検証の流れ

プレイヤーがキューに参加すると、以下の順序でチェックされます：

```
1. ラベル禁止チェック
   ❌ 禁止 → "Blacklisted Pokemon: <name> (blacklisted label)"

2. 個別ポケモン禁止チェック
   ❌ 禁止 → "Blacklisted Pokemon: <name>"

3. ラベル数量制限チェック
   ❌ 超過 → "Too many <label>: <count>/<limit>"

4. 技禁止チェック
   ❌ 禁止技あり → "Blacklisted move: <move>"

5. 特性禁止チェック
   ❌ 禁止特性あり → "Blacklisted ability: <ability>"

6. 持ち物禁止チェック
   ❌ 禁止アイテムあり → "Blacklisted item: <item_id>"

✅ 全てパス → キューに参加
```

---

## 🔧 トラブルシューティング

<details>
<summary><strong>設定が反映されない</strong></summary>

**解決方法:**

1. ファイルを保存したか確認
2. `/rankedadmin reload` を実行
3. JSON5の文法エラーがないか確認（カンマ、括弧の閉じ忘れなど）
4. サーバーログで `[CobbleRanked] Configuration loaded` を確認

</details>

<details>
<summary><strong>アイテムが禁止されない</strong></summary>

**よくある間違い:**

```json5
// ❌ 間違い
"Bright Powder"
"brightpowder"
"bright powder"

// ✅ 正しい
"cobblemon:bright_powder"
```

**確認方法:**

1. `F3 + H` でアイテムIDを確認
2. デバッグログを有効化:
   ```json5
   "debug_queue": true
   ```
3. ログで `[Queue] Player has banned item: cobblemon:bright_powder` を確認

</details>

<details>
<summary><strong>ポケモンが禁止されない</strong></summary>

**確認ポイント:**

1. **スペルミス**: `rayquaza` を `rayquza` と書いていないか
2. **フォーム指定**: `mewtwo` と `mewtwo:mega_x` は別扱い
3. **ラベルの有無**: そのポケモンが指定したラベルを持っているか確認

**デバッグ方法:**

```json5
{
  "debug_queue": true  // config.json5 で有効化
}
```

ログでどのチェックが失敗しているか確認できます。

</details>

<details>
<summary><strong>数量制限が機能しない</strong></summary>

**確認ポイント:**

1. ラベル名が正しいか（小文字、スペルミス）
2. そのポケモンが実際にそのラベルを持っているか
3. `black_list_labels` と `restricted_label_limits` を混同していないか

**例:**

```json5
// ❌ 間違い: 伝説ポケモンが完全に禁止される
"black_list_labels": ["legendary"]

// ✅ 正しい: 伝説ポケモンは1匹まで使える
"restricted_label_limits": {
  "legendary": 1
}
```

</details>

---

## ✅ ベストプラクティス

1. **ラベル指定を優先する** - 個別指定より管理が楽
2. **変更後は必ずテストする** - `/rankedadmin reload` して実際に試す
3. **アイテムIDは必ず確認** - `F3 + H` で正確なIDを取得
4. **コメントを活用** - JSON5はコメントが使えます

```json5
{
  // 伝説・幻ポケモンを禁止（競技向け）
  "black_list_labels": ["legendary", "mythical"],

  // 一撃必殺技を禁止
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

---

## 🔗 関連ガイド

- **[メイン設定](config.md)** - `config.json5` の全オプション
- **[バトルフォーマット](../features/battle-formats.md)** - シングル・ダブル・マルチ
- **[FAQ](../support/faq.md)** - よくある質問
- **[トラブルシューティング](../support/troubleshooting.md)** - 問題解決ガイド
