# ブラックリストと制限

---
**CobbleRanked** > **Configuration** > **ブラックリスト**
---

ポケモン、技、特性、道具の制限を設定し、ランクバトル中のプレイヤーの行動を制御します。

**設定ファイル:** `config/cobbleranked/blacklist.json5`

---

## クイックスタート

### 最小限の例

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**リロード:** `/rankedadmin reload`

**効果:** すべての伝説/幻のポケモン + 一撃必殺技を禁止

---

## ポケモンの制限

### ラベルによる禁止（推奨）

複数のポケモンを禁止する最も効率的な方法:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**利用可能なラベル:**

| ラベル | 数 | 例 |
|-------|-------|----------|
| `legendary` | ~60 | ミュウツー、ルギア、レックウザ、ディアルガ |
| `mythical` | ~20 | ミュウ、セレビィ、ジラーチ、ビクティニ |
| `restricted` | ~40 | 箱伝説（VGC制限） |
| `ultra_beast` | 11 | ウツロイド、マッシブーン、デンジュモク |
| `paradox` | 16 | テツノワダチ、イダイナキバ、テツノツツミ |
| `starter` | ~30 | フシギダネ系列、ヒトカゲ系列など |
| `fossil` | ~15 | オムナイト、カブト、プテラ |
| `baby` | ~20 | ピチュー、ピィ、ププリン |
| `powerhouse` | ~12 | 600族（カイリュー、ガブリアス） |
| `gen1` - `gen9` | 可変 | 世代でフィルター |

> **[📸 挿入: 禁止された伝説を使用しようとした時の検証エラーを表示するスクリーンショット]**

### 数量制限

完全な禁止の代わりに、制限された数量を許可:

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // チームあたり最大1体の伝説
    "restricted": 2,     // 最大2体の制限（VGC形式）
    "powerhouse": 3      // 最大3体の600族
  }
}
```

**例:** VGC シリーズ1形式（制限ポケモン2体まで許可）

### 特定のポケモンを禁止

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // すべてのフォルムを禁止
    "rayquaza:mega",     // メガレックウザのみ
    "charizard:mega_x",  // メガリザードンXのみ
    "weezing:galar"      // ガラルマタドガスのみ
  ]
}
```

**フォーム構文:**
- フォームなし（`mewtwo`）= **すべてのフォルム**を禁止
- フォームあり（`mewtwo:mega_x`）= **そのフォームのみ**を禁止

**一般的なフォーム:**
- メガ: `:mega`, `:mega_x`, `:mega_y`
- リージョン: `:alola`, `:galar`, `:hisui`
- その他: `:primal`, `:origin`, `:10`（ジガルデ10%）

---

## 技の制限

### 技の禁止

```json5
{
  "black_list_moves": [
    // 一撃必殺技
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine",

    // Smogon禁止技
    "baton_pass",        // スピードブースト引き継ぎ
    "last_respects",     // 第9世代OP技
    "shed_tail"          // 第9世代OP技
  ]
}
```

> **[📸 画像必要: 禁止技（じわれ、バトンタッチなど）使用時のエラーメッセージ画面]**

**技名:** 小文字のスネークケース（スペース → アンダースコア）

<details>
<summary><strong>一般的な禁止技リファレンス</strong></summary>

| 表示名 | 内部名 | 理由 |
|--------------|---------------|--------|
| じわれ | `fissure` | 一撃必殺 |
| ぜったいれいど | `sheer_cold` | 一撃必殺 |
| つのドリル | `horn_drill` | 一撃必殺 |
| ハサミギロチン | `guillotine` | 一撃必殺 |
| バトンタッチ | `baton_pass` | Smogon OU禁止 |
| おはかまいり | `last_respects` | Smogon第9世代禁止 |
| しっぽきり | `shed_tail` | Smogon第9世代禁止 |
| かげぶんしん | `double_team` | 回避（evasion_clause: falseの場合） |
| ちいさくなる | `minimize` | 回避（evasion_clause: falseの場合） |

</details>

---

## 特性の制限

### 特性の禁止

```json5
{
  "black_list_ability": [
    "moody",             // ランダム能力上昇（Smogon禁止）
    "shadow_tag",        // 交代防止（Smogon禁止）
    "arena_trap"         // 地面タイプ縛り（Smogon禁止）
  ]
}
```

**特性名:** 小文字のスネークケース

<details>
<summary><strong>一般的に禁止される特性</strong></summary>

| 表示名 | 内部名 | 理由 |
|--------------|---------------|--------|
| ムラっけ | `moody` | Smogon OU（ランダム+2/-1能力） |
| かげふみ | `shadow_tag` | Smogon OU（縛り） |
| ありじごく | `arena_trap` | Smogon OU（縛り） |
| スワームチェンジ | `power_construct` | ジガルド変化 |
| ちからもち | `huge_power` | 攻撃2倍（バランス選択） |
| ふしぎなまもり | `wonder_guard` | 効果抜群のみ |

</details>

**特性名の確認:**
1. ゲーム内でF3 + Hを押す
2. ポケモンのステータス画面を開く
3. 特性アイコンにカーソルを合わせる
4. ツールチップに内部名が表示される

---

## 道具の制限

### 持ち物の禁止

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // +10%回避
    "cobblemon:lax_incense",      // +10%回避
    "cobblemon:quick_claw",       // 20%先制
    "cobblemon:soul_dew"          // ラティオス/ラティアス強化
  ]
}
```

**道具フォーマット:** `cobblemon:item_name`（必須！）

**道具IDの確認:**
1. F3 + Hを押す
2. インベントリでアイテムにカーソルを合わせる
3. ツールチップの下部にIDが表示される

> **[📸 挿入: F3+HツールチップでアイテムIDを表示したスクリーンショット]**

<details>
<summary><strong>一般的に禁止される道具</strong></summary>

| アイテム | ID | 理由 |
|------|-----|--------|
| ひかりのこな | `cobblemon:bright_powder` | 回避上昇 |
| のんきのおこう | `cobblemon:lax_incense` | 回避上昇 |
| せんせいのツメ | `cobblemon:quick_claw` | 乱数先制 |
| こころのしずく | `cobblemon:soul_dew` | ラティ@s専用強化 |
| おうじゃのしるし | `cobblemon:kings_rock` | ひるみ確率 |

</details>

---

## 事前設定

### Smogon OU

競技標準形式:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": [
    "baton_pass", "last_respects", "shed_tail",
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

**設定も必要:** `config.json5`で`levelMatch: 50`

### VGC シリーズ1

公式VGC形式:

```json5
{
  "restricted_label_limits": {
    "restricted": 2  // 制限ポケモン最大2体
  },
  "black_list_labels": ["mythical"],  // 幻のポケモンは禁止
  "black_list_moves": [
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ]
}
```

**設定も必要:** `item_clause: true` + `levelMatch: 50`

### カジュアル（最小限の禁止）

不公平な技のみを禁止:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

---

## 高度な例

### 制限と禁止の混在

伝説1体を許可し、特定のものを禁止:

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // 伝説最大1体
  },
  "black_list_pokemon": [
    "mewtwo",            // 例外: ミュウツーは常に禁止
    "rayquaza"           // 例外: レックウザは常に禁止
  ]
}
```

**結果:** 1体の伝説（ルギア、ディアルガなど）を使用できるが、ミュウツーとレックウザは不可

### 世代フィルター

第9世代のポケモンのみを禁止:

```json5
{
  "black_list_labels": ["gen9", "paradox"]
}
```

### 単タイプサポート

追加設定不要 - プレイヤーが手動でチームを管理

推奨ブラックリスト:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["baton_pass"]
}
```

---

## 検証フロー

プレイヤーがキューに参加する時:

```
1. ラベルブラックリストをチェック
   ❌ "禁止されたポケモン: ミュウツー（伝説）"

2. 名前/フォームブラックリストをチェック
   ❌ "禁止されたポケモン: ミュウツー"

3. ラベル制限をチェック
   ❌ "伝説が多すぎます: 2/1"

4. 技をチェック
   ❌ "禁止された技: じわれ"

5. 特性をチェック
   ❌ "禁止された特性: ムラっけ"

6. 持ち物をチェック
   ❌ "禁止された道具: cobblemon:bright_powder"

✅ すべて合格 → キューに参加
```

> **[📸 挿入: 検証エラーメッセージのスクリーンショット]**

---

## トラブルシューティング

### 設定が適用されない
- `/rankedadmin reload`を実行
- JSON5構文をチェック（カンマ、括弧の欠落）

### 道具が禁止されない
- `cobblemon:item_name`形式を使用（表示名ではない）
- `F3 + H`で確認

### ポケモンがまだ許可されている
- スペルチェック（大文字小文字は区別しないがタイプミスは重要）
- そのポケモンにラベルが存在するか確認
- フォーム構文をチェック（`:mega` vs `:mega_x`）

### さらにヘルプが必要
- [FAQ - ブラックリストセクション](../support/faq.md#blacklist-configuration)
- [Discord](https://discord.gg/VVVvBTqqyP) #feedback

---

## プレイヤーの制限

ランクマッチの異なるフェーズでプレイヤーができることを制御。

**設定ファイル:** `config/cobbleranked/restrictions.json5`

### 設定構造

```json5
{
  "queue_phase": { /* マッチ待機中 */ },
  "preparation_phase": { /* チーム選択、カウントダウン */ },
  "battle_phase": { /* アクティブなバトル */ }
}
```

各フェーズは以下の制限カテゴリーを使用します。

### 利用可能な制限

#### アイテム使用

```json5
"item_usage": {
  "allow_ender_pearl": false,           // エンダーパールテレポート
  "allow_chorus_fruit": false,          // コーラスフルーツテレポート
  "allow_item_use": true,               // 一般的なアイテム使用
  "allow_item_drop": true,              // アイテムをドロップ
  "allow_item_pickup": true,            // アイテムを拾う
  "allow_consume_items": true,          // 食べる/飲む
  "allow_throw_items": true             // 雪玉、卵、ポーション
}
```

#### ブロック相互作用

```json5
"block_interactions": {
  "allow_break_blocks": false,          // ブロック破壊
  "allow_place_blocks": false,          // ブロック設置
  "allow_interact_blocks": true,        // ボタン、レバー、ドア
  "allow_open_containers": true,        // チェスト、樽
  "allow_use_doors": true,              // ドア、トラップドア、ゲート
  "allow_use_buttons": true,            // ボタン、レバー
  "allow_use_redstone": true            // レッドストーンコンポーネント
}
```

#### エンティティ相互作用

```json5
"entity_interactions": {
  "allow_damage_entities": false,       // Mob/プレイヤーを攻撃
  "allow_interact_entities": true,      // エンティティを右クリック
  "allow_mount_entities": true,         // 馬、ボートに乗る
  "allow_feed_pokemon": true,           // ポケモンに餌をやる
  "allow_heal_pokemon": true,           // ポケモンを回復
  "allow_trading": false,               // 村人取引
  "allow_breeding": false               // 動物の繁殖
}
```

#### 戦闘

```json5
"combat": {
  "allow_pvp": false,                   // プレイヤー対プレイヤー
  "allow_pve": false,                   // プレイヤー対エンティティ（Mob）
  "allow_projectiles": false,           // 弓、クロスボウ、トライデント
  "allow_explosion_damage": true,       // 爆発ダメージを受ける
  "allow_fall_damage": true             // 落下ダメージを受ける
}
```

#### 移動

```json5
"movement": {
  "allow_teleport_commands": false,     // /tp, /warp, /home など
  "allow_portals": true,                // ネザー/エンドポータル
  "allow_respawn": true,                // 死後のリスポーン
  "allow_flight": true,                 // クリエイティブ/エリトラ飛行
  "allow_swimming": true,               // 水泳
  "allow_riding": true                  // エンティティに乗る
}
```

#### システムアクション

```json5
"system_actions": {
  "allow_pc_access": false,             // ポケモンPCを開く
  "allow_commands": false,              // コマンドを実行
  "allow_chat": true,                   // チャットメッセージを送信
  "allow_disconnect": true,             // サーバーから切断
  "blocked_commands": [                 // 特定のブロックされたコマンド
    "tp", "warp", "home", "spawn"
  ]
}
```

#### インベントリ

```json5
"inventory": {
  "allow_ender_chest": false,           // エンダーチェストアクセス
  "allow_inventory_click": true,        // インベントリスロットをクリック
  "allow_inventory_drop": true,         // インベントリからドロップ
  "allow_crafting": false,              // アイテムのクラフト
  "allow_shulker_boxes": false,         // シュルカーボックスアクセス
  "allow_armor_change": true,           // 防具の変更
  "allow_offhand_swap": true            // オフハンドの交換
}
```

### デフォルトの動作

**キューフェーズ:**
- 通常のゲームプレイが許可される
- テレポートコマンドがブロックされる
- PCアクセスがブロックされる

**準備フェーズ:**
- 移動が許可される
- 戦闘がブロックされる
- ブロック相互作用がブロックされる

**バトルフェーズ:**
- バトルUIのみが許可される
- その他すべてのアクションがブロックされる

### 一般的な制限例

#### キュー中のテレポートを許可

```json5
"queue_phase": {
  "movement": {
    "allow_teleport_commands": true
  }
}
```

#### バトル中のPCアクセスを許可

```json5
"battle_phase": {
  "system_actions": {
    "allow_pc_access": true
  }
}
```

#### 特定のコマンドをブロック

```json5
"queue_phase": {
  "system_actions": {
    "allow_commands": false,
    "blocked_commands": ["tp", "warp", "home", "spawn", "tpa"]
  }
}
```

---

## 次のステップ

### 競技形式用
1. **[Smogon OU形式](../features/ranked-battles.md)** - 標準的な競技ルールを適用
2. **[VGC形式](../features/ranked-battles.md)** - 公式トーナメントルールを設定
3. **[カスタム形式](#事前設定)** - 提供されたプリセットを使用

### 高度な制限用
1. **[ラベル制限](#数量制限)** - 制限された伝説を許可（VGCスタイル）
2. **[フォーム固有の禁止](#特定のポケモンを禁止)** - メガ/リージョンフォームのみを禁止
3. **[プレイヤー制限](blacklist.md#プレイヤーの制限)** - バトル中のアクションを制御

### テスト用
1. **[クイックスタート検証](../getting-started/quick-start.md#step-2-configure-pokemon-restrictions)** - ブラックリストをテスト
2. **[トラブルシューティング](../support/faq.md#blacklist-configuration)** - 一般的なブラックリストの問題
3. **[バトルフロー](../features/ranked-battles.md#pre-battle-validation)** - 検証の理解

---

## 関連ページ
- [メイン設定](config.md) - バトル条項とイロレーティング設定
- [バトル形式](../features/ranked-battles.md) - 形式固有のルール
- [コマンドリファレンス](../getting-started/commands.md) - 管理者リロードコマンド
