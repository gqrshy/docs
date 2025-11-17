# 切断ペナルティ

---
**CobbleRanked** > **Features** > **切断ペナルティ**
---

ランクバトル中に切断したプレイヤーにペナルティを科すことで悪用を防止。

---

## 概要

プレイヤーがランクバトル中に切断すると:
- **切断回数**が1増加
- **バトル降参** - 対戦相手が自動的に勝利
- **イロレーティングペナルティ** - 通常の敗北と同様にイロレーティングを失う
- **キュー禁止** - 切断回数ティアに基づく一時的な禁止

---

## ペナルティティア

| 切断回数 | キュー禁止 | ティア |
|------------|-----------|------|
| 1-5 | 5分 | ⚠️ 警告 |
| 6-10 | 15分 | 🔶 重大 |
| 11+ | 30分 | 🔴 深刻 |

---

## 設定

`config/cobbleranked/config.json5`:

```json5
{
  "competitive": {
    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    }
  }
}
```

### フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `flee_min` | 数値 | ティアの最小切断回数 |
| `flee_max` | 数値 | ティアの最大切断回数 |
| `penalty_minutes` | 数値 | キュー禁止期間 |

---

## 切断回数減衰

過去の切断を許すために時間経過で切断回数を自動的に減少。

```json5
{
  "flee_decay": {
    "enabled": true,
    "decay_rate": 1,              // 間隔ごとに減少する切断回数
    "decay_interval_hours": 24    // 減少間の時間
  }
}
```

**例:** 切断回数10のプレイヤー → 10日後に0（1日1回）。

---

## プリセット

### 寛容（カジュアル）
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 3, "penalty_minutes": 0 },
      { "flee_min": 4, "flee_max": 999, "penalty_minutes": 5 }
    ]
  },
  "flee_decay": {
    "decay_rate": 2,
    "decay_interval_hours": 12
  }
}
```

### 厳格（競技）
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 2, "penalty_minutes": 10 },
      { "flee_min": 3, "flee_max": 5, "penalty_minutes": 30 },
      { "flee_min": 6, "flee_max": 999, "penalty_minutes": 60 }
    ]
  },
  "flee_decay": {
    "decay_rate": 1,
    "decay_interval_hours": 168  // 週次
  }
}
```

---

## 管理者コマンド

| コマンド | 説明 |
|---------|-------------|
| `/rankedadmin getflee <player> <format>` | プレイヤーの切断回数をチェック |
| `/rankedadmin resetflee <player> <format>` | 切断回数を0にリセット |

---

## トラブルシューティング

**ペナルティが機能しない？**
- ティア設定構文をチェック
- クロスサーバーモードで`preventDuplicatePenalty: true`を確認
- 設定変更後にサーバーを再起動

**切断回数が減衰しない？**
- `enabled: true`を確保
- 減衰はプレイヤーログイン時に適用
- サーバーの時刻/日付が正しいかチェック

---

## 次のステップ

### 設定用
1. **[ペナルティプリセット](#プリセット)** - 寛容または厳格な設定
2. **[切断回数減衰セットアップ](#切断回数減衰)** - 古い切断を許す
3. **[メイン設定](../configuration/config.md#competitive)** - 完全な設定リファレンス

### プレイヤー管理用
1. **[管理者コマンド](#管理者コマンド)** - 切断回数のチェックとリセット
2. **[バトルフロー](ranked-battles.md#disconnect-handling)** - 切断の処理方法
3. **[イロレーティングシステム](elo-system.md)** - 切断のイロレーティングペナルティ

### トラブルシューティング用
1. **[FAQペナルティ](../support/faq.md#disconnect-penalties)** - よくある質問
2. **[トラブルシューティングガイド](../support/troubleshooting.md#disconnect-during-battle)** - 問題を修正
3. **[クロスサーバー動作](../configuration/config.md#competitive)** - 重複ペナルティを防止

---

## 関連ページ
- [ランクバトル](ranked-battles.md) - バトルでの切断処理
- [設定ガイド](../configuration/config.md) - ペナルティ設定
- [コマンドリファレンス](../getting-started/commands.md#player-elo-management) - 切断回数管理
