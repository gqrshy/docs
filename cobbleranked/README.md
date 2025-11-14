# CobbleRanked

**CobbleRanked** は、Cobblemonサーバーに競技性の高いランク戦システムを追加するFabric MODです。プレイヤーはキューに参加してEloレートで評価され、シーズンごとのランキングで競い合うことができます。

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

---

## 📖 このMODについて

CobbleRankedは**ゼロ設定でも動作**します。導入するだけで以下の機能がすぐに使えます：

### ✅ 基本機能（設定不要）

- **ランク戦キューシステム** - プレイヤーが `/ranked` コマンドでキューに参加
- **Eloレーティング** - バトルの勝敗でレートが変動
- **対戦フォーマット** - シングル、ダブル、マルチバトル（それぞれ独立したランキング）
- **シーズンシステム** - 30日ごとに自動でシーズンが切り替わり
- **リーダーボード** - トップ10プレイヤーの表示
- **切断ペナルティ** - バトル中の逃走を追跡・ペナルティ

### ⚙️ オプション機能（設定で有効化）

これらの機能は**必要に応じて**設定ファイルから有効化できます：

<details>
<summary><strong>🌍 クロスサーバー対応</strong></summary>

複数のサーバーでランキングを共有できます。

- MySQL/MongoDBでデータ共有
- Redisでリアルタイムキュー同期
- バトル専用サーバーの設定

**詳細:** [クロスサーバーセットアップ](advanced/cross-server.md)

</details>

<details>
<summary><strong>🚫 ブラックリストシステム</strong></summary>

特定のポケモン、技、特性、持ち物を禁止できます。

- ラベルで禁止（伝説、幻、準伝説など）
- 個別のポケモン禁止（メガシンカ形態含む）
- 一撃必殺技、回避技の禁止
- Smogon OU、VGCルールのプリセット

**詳細:** [ブラックリスト設定](configuration/blacklist.md)

</details>

<details>
<summary><strong>🏟️ バトルアリーナ</strong></summary>

バトル開始時にプレイヤーを指定座標にテレポートできます。

**詳細:** [アリーナ設定](configuration/arenas.md)

</details>

<details>
<summary><strong>🎁 報酬システム</strong></summary>

勝利数やEloに応じた報酬を設定できます。

- シーズン終了時の順位報酬
- マイルストーン報酬（10勝、50勝など）
- カスタムコマンド実行

**詳細:** [報酬設定](configuration/rewards.md)

</details>

<details>
<summary><strong>🎨 カスタマイズ</strong></summary>

言語とGUIを自由にカスタマイズできます。

- 多言語対応（英語、日本語、ポルトガル語、ロシア語）
- GUI完全カスタマイズ
- 全メッセージのカスタマイズ

**詳細:** [言語設定](configuration/languages.md) | [GUI設定](configuration/gui.md)

</details>

---

## 🚀 クイックスタート

### インストール

1. **ダウンロード**
   CobbleRankedの最新版をダウンロードして、サーバーの `mods` フォルダに配置

2. **起動**
   サーバーを起動すると、`config/cobbleranked/` に設定ファイルが生成されます

3. **完了！**
   プレイヤーは `/ranked` コマンドですぐにランク戦を開始できます

<details>
<summary>詳細なインストール手順を見る</summary>

### 必要なMOD

- **Cobblemon** 1.7.0+
- **Fabric Loader** 0.17.2+
- **Fabric API** 0.116.6+
- **Fabric Language Kotlin** 1.13.6+

### オプションのMOD/プラグイン

- **PlaceholderAPI** - ホログラムやスコアボードにランキング表示

### インストール後の確認

サーバー起動後、以下のコマンドで動作確認：

```
/ranked
```

ランク戦のGUIが開けば成功です！

**詳細:** [インストールガイド](getting-started/installation.md)

</details>

---

## 📚 ドキュメント

### はじめに

- **[インストール](getting-started/installation.md)** - サーバーへの導入方法
- **[クイックスタート](getting-started/quick-start.md)** - 最初の設定
- **[コマンドリファレンス](getting-started/commands.md)** - 全コマンド一覧
- **[移行ガイド](getting-started/migration.md)** - 旧バージョンからの移行

### 設定

- **[メイン設定](configuration/config.md)** - `config.json5` の全オプション
- **[ブラックリスト](configuration/blacklist.md)** - ポケモン・技・特性・アイテムの禁止
- **[アリーナ](configuration/arenas.md)** - バトル座標の設定
- **[報酬](configuration/rewards.md)** - シーズン・マイルストーン報酬
- **[言語](configuration/languages.md)** - メッセージのカスタマイズ
- **[GUI](configuration/gui.md)** - インターフェースのカスタマイズ

### 機能解説

- **[ランクバトル](features/ranked-battles.md)** - バトルフローと仕組み
- **[Eloシステム](features/elo-system.md)** - 3つのレーティングモード
- **[バトルフォーマット](features/battle-formats.md)** - シングル・ダブル・マルチ
- **[シーズン](features/seasons.md)** - シーズン管理と報酬
- **[リーダーボード](features/leaderboards.md)** - ランキング表示
- **[切断ペナルティ](features/disconnect-penalties.md)** - 逃走防止システム
- **[動的マッチメイキング](features/dynamic-matchmaking.md)** - Elo範囲の自動拡大

### 高度な設定

- **[クロスサーバー](advanced/cross-server.md)** - 複数サーバー間でのランキング共有
- **[データベース](advanced/database.md)** - SQLite/MySQL/MongoDB比較
- **[Redis](advanced/redis.md)** - リアルタイム同期設定

### 連携

- **[PlaceholderAPI](integration/placeholders.md)** - ホログラム・スコアボード連携

### サポート

- **[FAQ](support/faq.md)** - よくある質問
- **[トラブルシューティング](support/troubleshooting.md)** - 問題解決ガイド
- **[Discord](https://discord.gg/VVVvBTqqyP)** - #feedbackチャンネルでサポート

---

## 🎮 プレイヤー向けガイド

### ランク戦に参加する

1. `/ranked` コマンドでGUIを開く
2. バトルフォーマット（シングル/ダブル）を選択
3. ポケモンを選んでキューに参加
4. 相手が見つかったら自動でバトル開始！

### ランキングを確認する

- `/ranked` のGUIから「リーダーボード」を開く
- 自分の順位、Elo、勝率を確認できます

### シーズンについて

- デフォルトで30日ごとに新シーズンが開始
- シーズン終了時にトップ3プレイヤーに報酬（サーバーで設定されている場合）
- Eloと戦績は次シーズンに引き継がれます

---

## 🛠️ 管理者向けガイド

### 最小限の設定で始める

CobbleRankedは設定不要で動作しますが、以下の基本設定をおすすめします：

<details>
<summary><strong>1. バトルアリーナの設定</strong>（推奨）</summary>

プレイヤーをバトル専用エリアにテレポートさせる設定：

```
/rankedadmin arena set main_arena
```

現在地がバトル開始座標として登録されます。

**詳細:** [アリーナ設定ガイド](configuration/arenas.md)

</details>

<details>
<summary><strong>2. 基本的なブラックリスト</strong>（推奨）</summary>

伝説ポケモンを禁止する場合、`config/cobbleranked/blacklist.json5` を編集：

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**詳細:** [ブラックリスト設定ガイド](configuration/blacklist.md)

</details>

<details>
<summary><strong>3. シーズン報酬の設定</strong>（オプション）</summary>

シーズン終了時にトップ3に報酬を与える設定：

`config/cobbleranked/rewards.json5`

```json5
{
  "seasonRewards": {
    "singles": {
      "1": [
        "give {player} minecraft:diamond 64",
        "lp user {player} permission set ranked.champion true"
      ],
      "2-3": [
        "give {player} minecraft:emerald 32"
      ]
    }
  }
}
```

**詳細:** [報酬設定ガイド](configuration/rewards.md)

</details>

### 管理コマンド

<details>
<summary>Elo管理</summary>

```
/rankedadmin setelo <amount> <player> <format>
/rankedadmin addelo <amount> <player> <format>
/rankedadmin removeelo <amount> <player> <format>
```

</details>

<details>
<summary>シーズン管理</summary>

```
/rankedadmin season info              - 現在のシーズン情報
/rankedadmin season rotate            - 新シーズン開始
/rankedadmin season end               - シーズン終了
/rankedadmin season create <days> <name>  - カスタムシーズン作成
```

</details>

<details>
<summary>アリーナ管理</summary>

```
/rankedadmin arena set <name>         - 現在地にアリーナ設定
/rankedadmin arena list               - 全アリーナ一覧
/rankedadmin arena tp <name>          - アリーナへテレポート
/rankedadmin arena remove <name>      - アリーナ削除
```

</details>

<details>
<summary>ペナルティ管理</summary>

```
/rankedadmin setflee <player> <amount>  - 逃走回数を設定
```

</details>

**詳細:** [コマンドリファレンス](getting-started/commands.md)

---

## 📊 設定例

### シンプルなカジュアルサーバー

<details>
<summary>設定を見る</summary>

**目的:** 誰でも気軽に参加できるランク戦

**config.json5**
```json5
{
  "language": "ja-Jp",
  "ranked_match": {
    "reset_days": 30,
    "levelMatch": 0,  // レベル制限なし
    "turn_limit": 100
  },
  "eloSystem": {
    "mode": "LEGACY"  // シンプルなポイント制
  }
}
```

**blacklist.json5**
```json5
{
  "black_list_labels": [],  // 禁止なし
  "black_list_pokemon": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"],  // 一撃必殺技のみ禁止
  "black_list_ability": [],
  "black_list_items_pokemon": []
}
```

</details>

### 競技向けガチサーバー

<details>
<summary>設定を見る</summary>

**目的:** Smogon OUルールに準拠したランク戦

**config.json5**
```json5
{
  "language": "en-Us",
  "ranked_match": {
    "reset_days": 90,  // 3ヶ月シーズン
    "levelMatch": 50,  // 全ポケモンLv50
    "turn_limit": 100
  },
  "battle_clauses": {
    "species_clause": true,
    "item_clause": false,
    "evasion_clause": true,
    "ohko_clause": true,
    "sleep_clause": true,
    "dynamax_clause": true,
    "terastal_clause": false
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,
      "kFactor": 32,
      "eloDecay": {
        "enabled": true,
        "points_per_day": 2,
        "grace_period_days": 7,
        "inactive_days_threshold": 14,
        "min_elo": 1000
      }
    }
  },
  "competitive": {
    "flee_penalty": {
      "tiers": [
        {"min_flees": 1, "max_flees": 3, "ban_duration_minutes": 10},
        {"min_flees": 4, "max_flees": 7, "ban_duration_minutes": 30},
        {"min_flees": 8, "max_flees": 999, "ban_duration_minutes": 1440}
      ]
    }
  }
}
```

**blacklist.json5**
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
    "cobblemon:lax_incense",
    "cobblemon:quick_claw"
  ]
}
```

</details>

### VGC（公式ルール）

<details>
<summary>設定を見る</summary>

**目的:** VGC Series準拠のダブルバトル

**config.json5**
```json5
{
  "language": "en-Us",
  "ranked_match": {
    "reset_days": 90,
    "levelMatch": 50,
    "turn_limit": 100
  },
  "battle_clauses": {
    "species_clause": true,
    "item_clause": true,  // 同じアイテム禁止
    "evasion_clause": false,
    "ohko_clause": true,
    "sleep_clause": false,
    "dynamax_clause": true,  // VGCではダイマックス禁止（Cobblemon環境）
    "terastal_clause": false
  },
  "eloSystem": {
    "mode": "GLICKO2"  // より正確なレーティング
  }
}
```

**blacklist.json5**
```json5
{
  "black_list_labels": ["mythical"],  // 幻のみ禁止
  "restricted_label_limits": {
    "restricted": 2  // 準伝説・伝説は2匹まで
  },
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"],
  "black_list_ability": [],
  "black_list_items_pokemon": []
}
```

</details>

---

## 🔧 システム要件

| コンポーネント | バージョン |
|---------------|-----------|
| Minecraft | 1.21.1 |
| Cobblemon | 1.7.0+ |
| Fabric Loader | 0.17.2+ |
| Fabric API | 0.116.6+ |
| Fabric Language Kotlin | 1.13.6+ |

### オプション要件（クロスサーバー使用時）

| コンポーネント | バージョン |
|---------------|-----------|
| MySQL | 8.0+ |
| MongoDB | 6.0+ |
| Redis | 6.0+ |
| Velocity | 3.4.0+ |

---

## 📝 更新履歴

### v1.0.1 (2024年11月8日)

#### 新機能
- **MongoDB対応** - クロスサーバーでMongoDBが使用可能に
- **PlaceholderAPI拡張** - 100位までのランキングプレースホルダー
- **特性名ドキュメント** - 内部名の確認方法を追加

#### バグ修正
- SQLiteリーダーボードの初期化エラーを修正
- ポケモンラベルブラックリストのフォーム判定を修正

**詳細:** [CHANGELOG-1.0.1.md](CHANGELOG-1.0.1.md)

---

## 💬 サポート・フィードバック

### ヘルプが必要な場合

1. **[トラブルシューティング](support/troubleshooting.md)** - よくある問題の解決方法
2. **[FAQ](support/faq.md)** - 頻繁に聞かれる質問
3. **[Discord](https://discord.gg/VVVvBTqqyP)** - #feedbackチャンネルでサポート

### バグ報告・機能要望

Discordの#feedbackチャンネルで報告してください。

---

## 📄 ライセンス

このプロジェクトは[利用規約](../terms.md)に従います。

---

**準備完了？** [インストールガイド](getting-started/installation.md)で今すぐ始めましょう！
