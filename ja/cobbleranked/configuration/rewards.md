# 報酬システム

---
**CobbleRanked** > **Configuration** > **報酬**
---

ランクプレイヤーのシーズン終了およびマイルストーン報酬を設定。

---

## ファイルの場所

`config/cobbleranked/rewards.json5`

---

## 報酬タイプ

### シーズン報酬
シーズン終了時にリーダーボード順位に基づいてトッププレイヤーに与えられます。

### マイルストーン報酬
実績達成時に自動的にアンロック（勝利数、マッチ数、イロレーティング）。

---

## シーズン報酬

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000"
        ]
      }
    }
  }
}
```

### フィールド

| フィールド | 必須 | 説明 |
|-------|----------|-------------|
| `rank_range` | ✅ | ランク要件（`"1"`, `"2-3"`, `"4-10"`） |
| `display` | ✅ | 表示名（`&`カラーコード対応） |
| `item` | ✅ | Minecraftアイテム ID |
| `commands` | ✅ | 請求時に実行されるコマンド |
| `lore` | ❌ | アイテム説明文（配列） |

**プレースホルダー:** `{player}` = プレイヤー名

---

## マイルストーン報酬

```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ First Victories",
        "item": "minecraft:gold_ingot",
        "commands": [
          "give {player} minecraft:gold_ingot 10"
        ]
      }
    }
  }
}
```

### マイルストーンタイプ

| タイプ | 説明 | 例 |
|------|-------------|---------|
| `WINS` | 総勝利数 | 10, 25, 50, 100 |
| `MATCHES` | 総マッチ数 | 10, 50, 100 |
| `ELO` | イロレーティング閾値 | 1200, 1500, 2000 |

---

## クイック例

### トップ3シーズン報酬
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion",
        "item": "minecraft:diamond",
        "commands": ["give {player} minecraft:diamond 64"]
      },
      "rank_2_3": {
        "rank_range": "2-3",
        "display": "&e&l⭐ Master",
        "item": "minecraft:gold_ingot",
        "commands": ["give {player} minecraft:gold_ingot 32"]
      }
    }
  }
}
```

### 勝利マイルストーン
```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "commands": ["give {player} minecraft:gold_ingot 10"]
      },
      "wins_50": {
        "type": "WINS",
        "requirement": 50,
        "commands": ["give {player} minecraft:gold_block 5"]
      }
    }
  }
}
```

### イロレーティングマイルストーン
```json5
{
  "milestone_rewards": {
    "singles": {
      "elo_1200": {
        "type": "ELO",
        "requirement": 1200,
        "commands": ["give {player} minecraft:iron_ingot 32"]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "commands": ["give {player} minecraft:diamond 3"]
      }
    }
  }
}
```

---

## コマンドの例

### アイテムを与える
```json5
"commands": ["give {player} minecraft:diamond 64"]
```

### 経済（経済プラグインが必要）
```json5
"commands": ["eco give {player} 1000"]
```

### 権限（LuckPermsが必要）
```json5
"commands": ["lp user {player} permission set ranked.legend true"]
```

### 複数のコマンド
```json5
"commands": [
  "give {player} minecraft:diamond 64",
  "eco give {player} 1000",
  "lp user {player} permission set ranked.legend true",
  "broadcast &6{player} &ehas become a Legend!"
]
```

---

## カラーコード

| コード | カラー | コード | フォーマット |
|------|-------|------|--------|
| `&0` | 黒 | `&l` | 太字 |
| `&1` | ダークブルー | `&m` | 取り消し線 |
| `&2` | ダークグリーン | `&n` | 下線 |
| `&3` | ダークアクア | `&o` | 斜体 |
| `&4` | ダークレッド | `&r` | リセット |
| `&5` | ダークパープル |
| `&6` | ゴールド |
| `&7` | グレー |
| `&8` | ダークグレー |
| `&9` | ブルー |
| `&a` | グリーン |
| `&b` | アクア |
| `&c` | レッド |
| `&d` | ライトパープル |
| `&e` | イエロー |
| `&f` | ホワイト |

---

## 形式固有の報酬

各形式には独立した報酬があります:

```json5
{
  "season_rewards": {
    "singles": { /* シングルス報酬 */ },
    "doubles": { /* ダブルス報酬 */ }
  }
}
```

プレイヤーは**両方**の形式で報酬を獲得できます。

---

## リロード

`rewards.json5`編集後:

```
/rankedadmin reload
```

---

## トラブルシューティング

**報酬が表示されない？**
- `rank_range`構文をチェック
- シーズン終了を確認: `/rankedadmin season info`
- 設定をリロード: `/rankedadmin reload`

**コマンドが実行されない？**
- 最初にコマンドを手動でテスト
- `{player}`プレースホルダーのスペルをチェック
- 必要なプラグインがインストールされているか確認

**カラーコードが機能しない？**
- `§`ではなく`&`を使用
- JSONエスケープをチェック

---

## 次のステップ

### 報酬設定用
1. **[シーズン管理](../features/seasons.md)** - シーズンローテーションとタイミングを理解
2. **[コマンドリファレンス](../getting-started/commands.md)** - 報酬コマンドを手動でテスト
3. **[カラーコード](gui.md#カラーコードリファレンス)** - 報酬表示名をフォーマット

### 高度な報酬用
1. **[経済統合](#経済経済プラグインが必要)** - 通貨報酬を与える
2. **[権限報酬](#権限luckpermsが必要)** - トッププレイヤーにランクを付与
3. **[形式固有の報酬](#形式固有の報酬)** - シングル/ダブルス賞品を分離

### トラブルシューティング用
1. **[報酬問題](../support/troubleshooting.md#reward-issues)** - 一般的な問題
2. **[FAQ報酬セクション](../support/faq.md#rewards)** - よくある質問
3. **[報酬のテスト](#リロード)** - 設定が機能するか確認

---

## 関連ページ
- [シーズン管理](../features/seasons.md) - シーズンローテーションとタイミング
- [GUIカスタマイズ](gui.md) - 報酬表示をカスタマイズ
- [メイン設定](config.md) - シーズン期間設定
