# ターンタイマー

---
**CobbleRanked** > **Features** > **ターンタイマー**
---

バトルターンに時間制限を強制して遅延プレイを防止。

## 概要

プレイヤーは各ターンで技を選択する時間が制限されます。時間切れになると、ランダムな合法的な技が自動的に選択されます。

**表示:**
- 緑: > 20秒
- 黄: 11-20秒
- 赤: ≤ 10秒

## 設定

**ファイル:** `config/cobbleranked/config.json5`

### 基本セットアップ

```json5
"turnTimer": {
  "enabled": true,
  "defaultTimeSeconds": 30
}
```

### 形式固有タイマー

形式ごとに異なる時間制限:

```json5
"format_timers": {
  "SINGLES": {
    "turn_timeout_seconds": 90
  },
  "DOUBLES": {
    "turn_timeout_seconds": 120
  }
}
```

## オプション

| 設定 | 説明 | デフォルト |
|---------|-------------|---------|
| `enabled` | ターンタイマーを有効化 | `false` |
| `defaultTimeSeconds` | デフォルト時間制限 | `30` |
| `turn_timeout_seconds` | 形式ごとの上書き | 可変 |

## ヒント

- **シングル:** 60-90秒が標準
- **ダブルス:** 90-120秒（より複雑な決定）
- **トーナメント:** より速いマッチのために60秒
- **カジュアル:** 新規プレイヤーのために120秒以上

## トラブルシューティング

**タイマーが表示されない:** `turnTimer.enabled`が`true`かチェック。

**時間制限が間違っている:** 形式固有の設定がデフォルトを上書き。

---

## 次のステップ

### 設定用
1. **[メイン設定](../configuration/config.md#turn-timer)** - 完全なタイマー設定リファレンス
2. **[形式固有タイマー](#形式固有タイマー)** - 形式ごとの異なる時間
3. **[バトルフロー](ranked-battles.md#battle-phase)** - ターンメカニクスを理解

### 競技プレイ用
1. **[トーナメント設定](#ヒント)** - 推奨タイマー値
2. **[カジュアルvs競技](#ヒント)** - 対象者に合わせて調整
3. **[ターンタイマーのテスト](../getting-started/quick-start.md#step-4-test-the-system)** - 動作確認

---

## 関連ページ
- [メイン設定](../configuration/config.md) - すべてのタイマー設定
- [ランクバトル](ranked-battles.md) - バトルメカニクス
- [FAQ](../support/faq.md#turn-timer--matchmaking) - よくある質問
