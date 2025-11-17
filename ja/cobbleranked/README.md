# CobbleRanked

イロベースのマッチメイキング、シーズンランキング、包括的なカスタマイズを備えたCobblemonサーバー向けの競技ランクバトルシステム。

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

> **[📸 挿入：キュー、リーダーボード、統計オプションを表示するメインGUIのスクリーンショット]**

---

## 機能

### コア機能（設定不要）
- **ランクマッチメイキング** - イロベースで動的範囲拡大（初期±200、最大±600）
- **複数フォーマット** - シングル（1v1）、ダブル（2v2）で独立したランキング
- **シーズンシステム** - 30日ごとに自動ローテーション、トップ3報酬
- **リーダーボード** - フォーマットごとのリアルタイムトップ10
- **逃走保護** - 3段階ペナルティシステム（5/15/30分の禁止）

### オプション機能
- **クロスサーバー** - マルチサーバーネットワーク向けMySQL/MongoDB + Redis
- **ブラックリスト** - 10のラベルカテゴリ + 特定のポケモン/技/特性/アイテム
- **カスタム報酬** - シーズン終了（ランクベース）+ マイルストーン（勝利数/イロ）
- **バトルアリーナ** - カスタム向きで指定された座標にテレポート
- **4言語対応** - 英語、日本語、ポルトガル語、ロシア語

> **[📸 挿入：シングルとダブルのリーダーボードの並列比較]**

---

## クイックスタート

```bash
# 1. 依存関係をインストール
# 2. CobbleRanked.jarをmods/に配置
# 3. サーバーを起動
# 4. /rankedコマンドでテスト
```

**自動生成：** すべての設定ファイルが含まれる`config/cobbleranked/`

**最初のマッチ：** プレイヤーは1000イロからスタート（Pokemon Showdownモード）

---

## イロシステム（3つのモード）

| モード | 使用例 | 計算方法 | デフォルト値 |
|------|----------|-------------|----------------|
| **Pokemon Showdown** ✅ | 推奨 | K因子（32/64） | 開始：1000、下限：1000 |
| Glicko-2 | 100人以上のアクティブプレイヤー | RD + 変動性 | 開始：1500、RD：350 |
| Legacy | カジュアル | ランダム（10-30） | N/A |

<details>
<summary><strong>Pokemon Showdown詳細</strong></summary>

**K因子システム：**
- 新規プレイヤー（10試合未満）：K=64（より速い変化）
- 確立されたプレイヤー：K=32（安定）

**計算例：**
```
プレイヤーA（1500イロ）対プレイヤーB（1500イロ）
予想：50%の勝率
勝利：+16イロ
敗北：-16イロ
```

**イロ減衰：**
- デフォルトで有効
- 非アクティブ後、1日あたり-2イロ（14日後）
- UTC 9:00に毎日実行

</details>

> **[📸 挿入：K因子がイロの増減に与える影響を示すチャート]**

---

## バトルフォーマット

| フォーマット | チームサイズ | 説明 | ランキング |
|--------|-----------|-------------|---------|
| **シングル** | 3～6匹のポケモン | クラシック1v1 | 独立 |
| **ダブル** | 4～6匹のポケモン | VGCスタイル2v2 | 独立 |
| **マルチ** | 各1～3匹 | チームバトル（2v2） | パーティと共有 |

**バトル条項（デフォルト）：**
- ✅ 種族条項（重複なし）
- ✅ OHKO条項（じわれ/ぜったいれいど禁止）
- ✅ 眠り条項（眠っている相手は最大1匹）
- ✅ 回避率条項
- ✅ ダイマックス条項
- ❌ アイテム条項（重複許可）
- ❌ テラスタル条項（許可）

---

## ドキュメント

### 📖 はじめに
- [インストール](getting-started/installation.md) - 依存関係の設定
- [クイックスタート](getting-started/quick-start.md) - 最初の設定
- [コマンド](getting-started/commands.md) - 完全なコマンドリファレンス

### ⚙️ 設定
- [メイン設定](configuration/config.md) - すべてのオプションを説明
- [ブラックリスト](configuration/blacklist.md) - ポケモン/技の制限
- [アリーナ](configuration/arenas.md) - バトル座標
- [報酬](configuration/rewards.md) - シーズンとマイルストーンの報酬
- [言語](configuration/languages.md) - メッセージのカスタマイズ
- [GUI](configuration/gui.md) - インターフェースのカスタマイズ

### 🎮 機能
- [ランクバトル](features/ranked-battles.md) - バトルフロー
- [イロシステム](features/elo-system.md) - レーティング計算
- [バトルフォーマット](features/battle-formats.md) - フォーマットの詳細
- [シーズン](features/seasons.md) - シーズン管理
- [リーダーボード](features/leaderboards.md) - ランキング
- [切断ペナルティ](features/disconnect-penalties.md) - 逃走システム
- [動的マッチメイキング](features/dynamic-matchmaking.md) - イロ範囲の拡大

### 🔧 高度な設定
- [クロスサーバー](advanced/cross-server.md) - マルチサーバー設定
- [データベース](advanced/database.md) - SQLite/MySQL/MongoDB
- [Redis](advanced/redis.md) - リアルタイム同期

### 🔌 統合
- [プレースホルダーAPI](integration/placeholders.md) - Text Placeholder API統合（トップ100ランク）

### 💬 サポート
- [FAQ](support/faq.md) - よくある質問
- [トラブルシューティング](support/troubleshooting.md) - 問題解決
- [Discord](https://discord.gg/VVVvBTqqyP) - #feedbackチャンネル

---

## デフォルト設定

<details>
<summary><strong>主要なデフォルト値</strong></summary>

```json5
// シーズンとバトル
"reset_days": 30           // 月次シーズン
"levelMatch": 0            // レベル強制なし
"turn_limit": 100          // バトルごとの最大ターン数

// マッチメイキング
"initial_range": 200       // ±200イロ
"expansion_delay": 30      // 拡大前に30秒
"max_multiplier": 3.0      // 最大±600イロ

// 逃走ペナルティ
1～5回逃走：5分間の禁止
6～10回逃走：15分間の禁止
11回以上逃走：30分間の禁止
減衰：24時間ごとに-1回逃走

// イロ（Pokemon Showdown）
"initialElo": 1000
"kFactor": 32（新規プレイヤーは64）
"provisionalMatches": 10
```

</details>

---

## 要件

| 必須 | バージョン | オプション（クロスサーバー） | バージョン |
|----------|---------|-------------------------|---------|
| Minecraft | 1.21.1 | MySQL | 8.0+ |
| Fabric Loader | 0.17.2+ | MongoDB | 6.0+ |
| Cobblemon | 1.7.0+ | Redis | 6.0+ |
| Fabric API | 0.116.6+ | Velocity | 3.4.0+ |
| Fabric Language Kotlin | 1.13.6+ | | |

---

## クイック例

### カジュアルサーバー（制限なし）
```json5
// blacklist.json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

### 競技サーバー（Smogon OU）
```json5
// blacklist.json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"]
}

// config.json5
{
  "ranked_match": {
    "levelMatch": 50  // レベル50に強制
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

### VGCフォーマット
```json5
// blacklist.json5
{
  "restricted_label_limits": {
    "restricted": 2  // 最大2匹の制限ポケモン
  },
  "black_list_labels": ["mythical"]
}

// config.json5
{
  "battle_clauses": {
    "item_clause": true  // 重複アイテム禁止
  }
}
```

---

## サポート

- **質問：** [Discord](https://discord.gg/VVVvBTqqyP) #feedback
- **FAQ：** [よくある質問](support/faq.md)
- **問題：** [トラブルシューティングガイド](support/troubleshooting.md)

---

## 次のステップ

### 新規サーバー管理者向け
1. **[CobbleRankedをインストール](getting-started/installation.md)** - 5分で稼働
2. **[クイックスタートガイド](getting-started/quick-start.md)** - 最初のアリーナと制限を設定
3. **[コマンドリファレンス](getting-started/commands.md)** - 必須の管理コマンドを学ぶ

### 経験豊富な管理者向け
1. **[メイン設定](configuration/config.md)** - イロ、シーズン、マッチメイキングを微調整
2. **[ブラックリスト設定](configuration/blacklist.md)** - 競技ルールセット（Smogon、VGC）を設定
3. **[クロスサーバー設定](advanced/cross-server.md)** - 複数サーバーでスケール

### 競技サーバー向け
1. **[イロシステム](features/elo-system.md)** - レーティング計算とモードを理解
2. **[シーズン管理](features/seasons.md)** - 競技シーズンと報酬を設定
3. **[報酬システム](configuration/rewards.md)** - シーズン終了とマイルストーン報酬を設定

---

## 関連ページ
- [用語集](GLOSSARY.md) - 技術用語と概念
- [FAQ](support/faq.md) - よくある質問と回答
- [トラブルシューティング](support/troubleshooting.md) - 問題解決ガイド
