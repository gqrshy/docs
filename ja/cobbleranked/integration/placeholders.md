# Placeholder API

---
**CobbleRanked** > **Integration** > **プレースホルダー**
---

CobbleRankedは[Text Placeholder API](https://placeholders.pb4.eu/)と統合し、ホログラム、看板、Text Placeholder API形式（`%placeholder%`）をサポートする他のFabric Modでランク統計を表示します。

---

## 概要

プレースホルダーを使用すると、Text Placeholder APIをサポートする場所ならどこでもリアルタイムのランク統計を表示できます。

**一般的な使用例:**
- リーダーボードホログラム（FabricベースのホログラムMod）
- スコアボード表示（FabricスコアボードMod）
- チャットフォーマット（互換性のあるFabricチャットMod）
- Text Placeholder API経由のカスタム表示

**注意:** これは**Text Placeholder API**（Fabric Mod）を使用し、PlaceholderAPI（Bukkit/Spigotプラグイン）ではありません。ハイブリッドサーバー（Arclight）では、両方のAPIがサポートされています。

**パフォーマンス:**
- すべてのプレースホルダーは60秒間キャッシュ
- データベースクエリは最小化
- 高トラフィックサーバーでも安全

---

## プレースホルダー形式

### すべての形式統合

**シングル**と**ダブルス**形式の両方を組み合わせてトッププレイヤーを表示（総イロレーティング順）。

**構文:**
```
%cobbleranked_top_<rank>_<field>%
```

**例:**
```
%cobbleranked_top_1_name%      → "Notch"
%cobbleranked_top_1_elo%       → "1650"
%cobbleranked_top_2_wins%      → "42"
%cobbleranked_top_3_winrate%   → "75.5"
%cobbleranked_top_5_games%     → "128"
```

---

### シングル形式のみ

**シングル**形式のみのトッププレイヤーを表示。

**構文:**
```
%cobbleranked_top_singles_<rank>_<field>%
```

**例:**
```
%cobbleranked_top_singles_1_name%    → "Steve"
%cobbleranked_top_singles_1_elo%     → "1580"
%cobbleranked_top_singles_2_wins%    → "35"
%cobbleranked_top_singles_3_losses%  → "12"
%cobbleranked_top_singles_5_winrate% → "80.0"
```

---

### ダブルス形式のみ

**ダブルス**形式のみのトッププレイヤーを表示。

**構文:**
```
%cobbleranked_top_doubles_<rank>_<field>%
```

**例:**
```
%cobbleranked_top_doubles_1_name%    → "Alex"
%cobbleranked_top_doubles_1_elo%     → "1720"
%cobbleranked_top_doubles_2_wins%    → "48"
%cobbleranked_top_doubles_3_losses%  → "8"
%cobbleranked_top_doubles_5_games%   → "100"
```

---

## 利用可能なフィールド

| フィールド | 説明 | 出力例 |
|-------|-------------|----------------|
| `name` | プレイヤー名 | `"Notch"` |
| `elo` | 現在のイロレーティング | `"1650"` |
| `wins` | 形式での総勝利数 | `"42"` |
| `losses` | 形式での総敗北数 | `"15"` |
| `winrate` | 勝率パーセンテージ（小数点1桁） | `"73.7"` |
| `games` | プレイしたゲーム総数 | `"57"` |

**注意:**
- すべての数値フィールドはプレーン数字を返す（フォーマットなし）
- `winrate`は計算: `(wins / games) * 100`
- 空のランクはすべてのフィールドで`"N/A"`を返す

---

## サポートされるランク

**範囲:** 1-100

1位から100位まで任意のランクをクエリできます。

**例:**
```
%cobbleranked_top_1_name%     → 1位
%cobbleranked_top_10_name%    → 10位
%cobbleranked_top_100_elo%    → 100位
```

**範囲外:**
- ランク < 1: `"N/A"`を返す
- ランク > 100: `"N/A"`を返す
- ランクにプレイヤーなし: `"N/A"`を返す（数値フィールドは"-"）

---

## プレースホルダーのテスト

### コマンドラインテスト

デプロイ前に`/rankedplaceholder`コマンドでプレースホルダーをテスト。

#### プレースホルダーをテスト

```bash
/rankedplaceholder test %cobbleranked_top_1_name%
```

**出力:**
```
[CobbleRanked Placeholder Test]
Input: %cobbleranked_top_1_name%
Result: Notch
```

#### すべてのプレースホルダーをリスト

```bash
/rankedplaceholder list
```

**出力内容:**
- すべての利用可能な形式（すべて、シングル、ダブルス）
- すべての利用可能なフィールド（name、elo、wins、losses、winrate、games）
- 各形式の構文例
- ランク範囲情報
- キャッシュTTL情報

#### キャッシュをクリア

```bash
/rankedplaceholder clear
```

即座にキャッシュを強制更新（通常は60秒ごとに自動更新）。

---

## 次のステップ

### 表示セットアップ用
1. **[プレースホルダーのテスト](#プレースホルダーのテスト)** - プレースホルダーが機能するか確認
2. **[ホログラム統合](#fabric-hologram-mods)** - リーダーボードを表示
3. **[キャッシュ管理](#cache-behavior)** - キャッシングを理解

### 高度な使用用
1. **[開発者向けAPI](#api-for-developers)** - プログラマティックアクセス
2. **[パフォーマンス最適化](#performance-considerations)** - ベストプラクティス
3. **[ハイブリッドサーバーセットアップ](#hybrid-servers-arclight)** - PlaceholderAPIサポート

### 競技サーバー用
1. **[リーダーボード](../features/leaderboards.md)** - ゲーム内リーダーボード表示
2. **[形式固有プレースホルダー](#シングル形式のみ)** - シングルvsダブルス
3. **[トップ100ランキング](#サポートされるランク)** - 完全なランキングサポート

---

## 関連ページ
- [リーダーボード](../features/leaderboards.md) - ゲーム内ランキング表示
- [コマンドリファレンス](../getting-started/commands.md) - テストコマンド
- [トラブルシューティング](../support/faq.md#placeholder-api-troubleshooting) - 一般的な問題
