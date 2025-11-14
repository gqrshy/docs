# ブラックリスト設定

ランク戦で使用できるポケモン、技、特性、持ち物を制限します。

**設定ファイル:** `config/cobbleranked/blacklist.json5`

---

## 基本設定

### シンプルな例

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

ファイルを保存後、`/rankedadmin reload` で反映されます。

---

## ポケモンの制限

### ラベルで禁止

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**利用可能なラベル:**

| ラベル | 説明 |
|-------|------|
| `legendary` | 伝説のポケモン |
| `mythical` | 幻のポケモン |
| `restricted` | VGC制限級 |
| `ultra_beast` | ウルトラビースト |
| `paradox` | パラドックスポケモン |
| `starter` | 御三家 |
| `fossil` | 化石ポケモン |
| `baby` | ベビィポケモン |
| `powerhouse` | 600族 |
| `gen1` ~ `gen9` | 世代別 |

### 数量制限

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // 伝説は1匹まで
    "restricted": 2      // 制限級は2匹まで
  }
}
```

### 個別に禁止

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // 全フォーム禁止
    "rayquaza:mega"      // メガレックウザのみ禁止
  ]
}
```

---

## 技・特性・アイテムの制限

### 技の禁止

```json5
{
  "black_list_moves": [
    "fissure",           // じわれ
    "sheer_cold",        // ぜったいれいど
    "baton_pass",        // バトンタッチ
    "last_respects"      // おはかまいり
  ]
}
```

### 特性の禁止

```json5
{
  "black_list_ability": [
    "moody",             // ムラっけ
    "shadow_tag",        // かげふみ
    "arena_trap"         // ありじごく
  ]
}
```

### 持ち物の禁止

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // ひかりのこな
    "cobblemon:lax_incense",      // のんきのおこう
    "cobblemon:quick_claw"        // せんせいのツメ
  ]
}
```

> **注意:** アイテムは `cobblemon:item_name` の形式で指定（`F3 + H` で確認可能）

---

## よく使われる設定

### Smogon OU

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": ["cobblemon:bright_powder", "cobblemon:lax_incense"]
}
```

### VGC Series 1

```json5
{
  "restricted_label_limits": {
    "restricted": 2
  },
  "black_list_labels": ["mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

---

## トラブルシューティング

### 設定が反映されない
- `/rankedadmin reload` を実行
- JSON5の文法エラーを確認

### アイテムが禁止されない
- `F3 + H` でアイテムIDを確認
- `cobblemon:item_name` の形式で指定

### 詳細情報
- 技名・特性名の確認方法
- フォーム指定の詳細
- 複雑な設定例

**これらは [FAQ](../support/faq.md) を参照してください**

---

## 関連ガイド

- [メイン設定](config.md)
- [バトルフォーマット](../features/battle-formats.md)
- [FAQ](../support/faq.md)
