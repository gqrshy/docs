# ランダムバトル

---
**CobbleRanked** > **Features** > **ランダムバトル**
---

チーム構築なしでバトルしたいプレイヤー向けの自動生成チーム。

## 概要

チームは固定技構成、努力値、道具を持つプリセットプールから生成 - Pokemon Showdownのランダムバトルと同様。

**利点:**
- チーム構築不要
- 新規プレイヤーに最適
- 準備ではなくバトルスキルに集中

## 形式

**RANDOM_SINGLES** - 生成チームでの6v6シングル
**RANDOM_DOUBLES** - 生成チームでの6v6ダブルス
**RANDOM_3V3** - クイック3v3バトル

## 設定

**ファイル:** `config/cobbleranked/config.json5`

```json5
"random_battles": {
  "enabled": true,
  "default_pool": "Random OU",  // random_poolsセクションのプール名
  "format_pools": {
    "RANDOM_SINGLES": "Random OU",
    "RANDOM_DOUBLES": "Random Doubles OU",
    "RANDOM_3V3": "Random 3v3"
  }
}
```

## ポケモンプールの作成

**ファイル:** `config/cobbleranked/random_pools/`

各ティアのJSON5ファイルを作成（例: `random_ou.json5`, `random_ubers.json5`）。

### プール例

```json5
{
  "pool_name": "Random OU",
  "pokemon": [
    {
      "species": "Garchomp",
      "level": 70,
      "moves": ["Earthquake", "Dragon Claw", "Stone Edge", "Swords Dance"],
      "ability": "Rough Skin",
      "nature": "Jolly",
      "evs": {"hp": 0, "atk": 252, "def": 4, "spa": 0, "spd": 0, "spe": 252},
      "item": "cobblemon:choice_scarf"
    }
  ]
}
```

## プールパラメータ

| フィールド | 説明 | 必須 |
|-------|-------------|----------|
| `species` | ポケモン名 | はい |
| `level` | レベル（1-100） | はい |
| `moves` | 4つの技 | はい |
| `ability` | 特性名 | いいえ |
| `nature` | 性格 | いいえ |
| `evs` | 努力値配分 | いいえ |
| `item` | 持ち物 | いいえ |

## ヒント

- 異なるティア用に別々のプールを作成（OU、Ubers、LC）
- 役割ベースの努力値配分を使用（物理アタッカー、特殊受けなど）
- 各ポケモンに多様な技構成を含める
- デプロイ前にプールバランスをテスト

## トラブルシューティング

**チームが生成されない:** `random_battles.enabled`が`true`でプールファイルが存在するかチェック。

**ポケモンが欠落:** 種族名がCobblemonのポケモンレジストリと一致するか確認。

**バトルが失敗:** すべてのポケモンが4つの技と有効な特性を持つことを確認。

---

## 次のステップ

### セットアップ用
1. **[ポケモンプールの作成](#ポケモンプールの作成)** - 最初のプールを構築
2. **[プールパラメータ](#プールパラメータ)** - すべてのオプションを理解
3. **[プールのテスト](#トラブルシューティング)** - チームが正しく生成されるか確認

### 競技プール用
1. **[ティア組織](#ヒント)** - OU/Ubers/LCプールを作成
2. **[努力値配分](#ヒント)** - 役割ベースの分配
3. **[バランステスト](#ヒント)** - 公平なマッチアップを確保

---

## 関連ページ
- [メイン設定](../configuration/config.md) - ランダムバトル設定
- [バトル形式](ranked-battles.md) - 形式タイプ
- [トラブルシューティング](../support/troubleshooting.md) - 一般的な問題
