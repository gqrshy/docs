# メイン設定

---
**CobbleRanked** > **Configuration** > **メイン設定**
---

`config/cobbleranked/config.json5` の完全なリファレンス。

---

## ファイルの場所

`config/cobbleranked/config.json5`

---

## クイックリファレンス

| セクション | 目的 |
|---------|---------|
| [言語設定](#言語設定) | インターフェース言語 |
| [クロスサーバー](#クロスサーバー) | MySQL + Redis設定 |
| [ランクマッチ](#ランクマッチ) | バトルメカニクス |
| [マッチメイキング](#マッチメイキング) | 動的イロレーティング範囲 |
| [イロレーティングシステム](#イロレーティングシステム) | レーティング計算 |
| [競技設定](#競技設定) | 切断ペナルティ、シーズン管理 |

---

## 言語設定

```json5
{
  "language": "en-Us"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

---

## クロスサーバー

MySQL と Redis でクロスサーバーモードを有効化。

```json5
{
  "cross_server": {
    "enabled": false,
    "server_id": "lobby1",
    "battle_server": "battle1",  // 空 = これがバトルサーバー

    "database": {
      "type": "MYSQL",           // MYSQL または SQLITE
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "root",
      "password": ""
    },

    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0              // 0-15
    }
  }
}
```

**参照:** [クロスサーバーセットアップ](../advanced/cross-server.md)

---

## ランクマッチ

バトルメカニクスとチーム要件。

```json5
{
  "ranked_match": {
    "reset_days": 30,            // シーズンの長さ
    "levelMatch": 70,            // ポケモンレベルの強制（0 = 無効）
    "turn_limit": 100,           // バトルあたりの最大ターン数

    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,        // プレイヤーごと
      "max_team_size": 3
    }
  }
}
```

### バトル条項

```json5
{
  "battle_clauses": {
    "species_clause": true,      // 同じ種族の重複なし
    "item_clause": false,        // 同じ道具の重複を許可
    "evasion_clause": true,      // 回避技の禁止
    "ohko_clause": true,         // 一撃必殺技の禁止
    "sleep_clause": true,        // 相手のねむり状態は最大1体
    "dynamax_clause": true,      // ダイマックス禁止
    "terastal_clause": false     // テラスタル許可
  }
}
```

---

## マッチメイキング

動的イロレーティング範囲の拡大。

```json5
{
  "matchmaking": {
    "enabled": true,
    "initial_range": 200,        // 初期 ±イロレーティング
    "expansion_delay": 30,       // 拡大開始までの秒数
    "expansion_rate": 5,         // +1イロレーティングごとの秒数
    "max_multiplier": 3.0,       // 最大 ±600（200 × 3.0）
    "immediate_match_range": 100  // ±100以内の即時マッチ
  }
}
```

**参照:** [動的マッチメイキング](../features/dynamic-matchmaking.md)

---

## イロレーティングシステム

レーティング計算モード。

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",  // LEGACY, POKEMON_SHOWDOWN, GLICKO2

    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,          // 最小イロレーティング
      "kFactor": 32,
      "provisionalMatches": 10,
      "provisionalKFactor": 64,

      "decay": {
        "enabled": true,
        "runAtUtcHour": 9,       // 毎日の減衰チェック
        "slowDecayReduction": 2  // 1日あたり -2イロレーティング
      }
    },

    "glicko2": {
      "initialRating": 1500.0,
      "initialRD": 350.0,
      "initialVolatility": 0.06,
      "tau": 0.5,
      "rdDecayDays": 30
    }
  }
}
```

**参照:** [イロレーティングシステム](../features/elo-system.md)

---

## 競技設定

切断ペナルティとシーズン管理。

```json5
{
  "competitive": {
    "syncLocalQueue": true,
    "preventDuplicatePenalty": true,
    "asyncSeasonManager": true,
    "pendingMatchTimeout": 5,    // 分
    "cleanupResources": true,

    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    },

    "flee_decay": {
      "enabled": true,
      "decay_rate": 1,           // 切断回数の減少
      "decay_interval_hours": 24
    }
  }
}
```

**参照:** [切断ペナルティ](../features/disconnect-penalties.md)

---

## コネクションプール

MySQL コネクションプール設定（クロスサーバーのみ）。

```json5
{
  "connection_pool": {
    "maximum_pool_size": 10,
    "minimum_idle": 5,
    "maximum_lifetime": 1800000,  // 30分（ミリ秒）
    "connection_timeout": 5000     // 5秒（ミリ秒）
  }
}
```

**推奨設定:**
- 2-3サーバー: `maximum_pool_size: 10`
- 4-6サーバー: `maximum_pool_size: 15`
- 7+サーバー: `maximum_pool_size: 20`

---

## リロード

設定編集後:

```
/rankedadmin reload
```

サーバーの再起動なしで、すべての設定ファイルをリロードします。

---

## 次のステップ

### 微調整用
1. **[イロレーティングシステム詳細](../features/elo-system.md)** - レーティング計算の詳細
2. **[マッチメイキングガイド](../features/elo-system.md#dynamic-matchmaking)** - キュー時間の最適化
3. **[シーズン管理](../features/seasons.md)** - 競技期間の設定

### 競技セットアップ用
1. **[ブラックリスト設定](blacklist.md)** - Smogon/VGC制限の適用
2. **[バトル条項](../features/ranked-battles.md#battle-clauses)** - 競技ルールの有効化
3. **[報酬システム](rewards.md)** - 報酬の設定

### スケーリング用
1. **[クロスサーバーセットアップ](../advanced/cross-server.md)** - マルチサーバー構成
2. **[データベース最適化](../advanced/database.md)** - MySQL/MongoDB セットアップ
3. **[コネクションプーリング](../advanced/database.md#connection-pool)** - パフォーマンスチューニング

---

## 関連ページ
- [ブラックリスト設定](blacklist.md) - ポケモン/技の制限
- [報酬設定](rewards.md) - シーズンとマイルストーン報酬
- [コマンドリファレンス](../getting-started/commands.md) - 管理者コマンド
