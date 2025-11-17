# クイックスタートガイド

---
**CobbleRanked** > **始め方** > **クイックスタート**
---

5分以内でランクバトルを開始しましょう！

## 概要

このガイドでは以下を行います:
1. 最初のバトルアリーナを設定
2. ポケモン制限を設定
3. 最初のシーズンを開始
4. ランクシステムをテスト

**所要時間:** 約5分

## ステップ1: バトルアリーナを作成

アリーナはランクバトルが行われる場所です。

### アリーナを作成

1. **ゲーム内でアリーナを建築**(または既存の場所を使用)
2. **スポーンポイントに立つ** プレイヤーをテレポートさせたい場所

> **[📸 IMAGE NEEDED: プレイヤーがアリーナ作成位置に立っている様子(座標とYaw/Pitch表示)]**

3. **コマンド実行:**
   ```
   /rankedadmin arena set <arena_name>
   ```
   例:
   ```
   /rankedadmin arena set main_arena
   ```

4. **作成確認:**
   ```
   /rankedadmin arena list
   ```

### 複数アリーナ(オプション)

バリエーションのために複数アリーナを作成:

```bash
/rankedadmin arena set volcano_arena
/rankedadmin arena set ice_arena
/rankedadmin arena set forest_arena
```

> **[📸 IMAGE NEEDED: 複数のアリーナが配置されたマップ全体図(火山、氷、森など)]**

CobbleRankedは利用可能なアリーナからランダムに選択します。

## ステップ2: ポケモン制限を設定

デフォルトでは**すべてのポケモンが許可**されています。強力すぎるポケモンを禁止しましょう:

### ブラックリスト設定を編集

1. **ファイルを開く:** `config/cobbleranked/blacklist.json5`

2. **伝説のポケモンを禁止:**
   ```json5
   {
     "black_list_labels": [
       "legendary",   // ミュウツー、ルギア、ホウオウ、レックウザなどを禁止
       "mythical"     // ミュウ、セレビィ、ジラーチなどを禁止
     ]
   }
   ```

3. **保存してリロード:**
   ```
   /rankedadmin reload
   ```

> **[📸 IMAGE NEEDED: リロードコマンド実行後の成功メッセージ画面]**

### クイックプリセット

競技フォーマットを選択:

<details>
<summary><b>VGCスタイル(伝説許可)</b></summary>

```json5
{
  "black_list_labels": [
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill"
  ]
}
```
</details>

<details>
<summary><b>Smogon OU(禁止伝説なし)</b></summary>

```json5
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Baton Pass"
  ],
  "black_list_ability": [
    "Shadow Tag",
    "Arena Trap",
    "Moody"
  ]
}
```
</details>

<details>
<summary><b>リトルカップ(第一段階のみ)</b></summary>

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  }
}
```
</details>

## ステップ3: 最初のシーズンを開始

シーズンは設定に基づいて自動的にローテーションします。

### 現在のシーズンを確認

```
/rankedadmin season info
```

以下のように表示されます:
```
Current Season: Season 1
Started: 2025-10-26
Ends: 2025-11-25 (30 days)
```

### シーズン期間をカスタマイズ

`config/cobbleranked/config.json5`を編集:

```json5
"ranked_match": {
  "reset_days": 30  // 7、14、30、60、90などに変更
}
```

リロード:
```
/rankedadmin reload
```

## ステップ4: システムをテスト

完全なバトルフローを実行してみましょう！

### キューに参加

1. **ランクGUIを開く:**
   ```
   /ranked
   ```
   または設定されている場合はゲーム内GUIアイテムを使用

> **[📸 IMAGE NEEDED: ランクメニューGUIのメイン画面(Singles/Doublesフォーマット選択)]**

2. **バトルフォーマットを選択:**
   - シングルス(1v1)
   - ダブルス(2v2)

3. **キューボタンをクリック**してキューに参加

### バトルを開始(2プレイヤー必要)

1. **2人目のプレイヤー**が同じフォーマットキューに参加
2. **マッチメイキングトリガー** 2人のプレイヤーがキューにいるとき
3. **両プレイヤーがテレポート** ランダムなアリーナへ
4. **バトル自動開始**

> **[📸 IMAGE NEEDED: バトル開始時の対戦シーン(両プレイヤーがアリーナに配置された状態)]**

### バトル後

- **勝者がイロレーティング獲得**(デフォルト: 10-30ポイント)
- **敗者がイロレーティング喪失**(デフォルト: 10-30ポイント)
- **統計更新**(勝利、敗北、勝率)
- **リーダーボード確認:** `/ranked` → リーダーボード

> **[📸 IMAGE NEEDED: リーダーボード表示画面(トッププレイヤーとイロレーティングランキング)]**

## ステップ5: 報酬設定(オプション)

トッププレイヤーにアイテムやコマンドで報酬を与えましょう！

### 報酬設定を編集

`config/cobbleranked/rewards.json5`を開く:

```json5
{
  "season_rewards": {
    "first_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 64",
        "give %player% cobblemon:master_ball 5"
      ]
    },
    "second_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 32",
        "give %player% cobblemon:master_ball 3"
      ]
    }
  },
  "milestone_rewards": {
    "10_wins": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:emerald 10"
      ]
    }
  }
}
```

リロード:
```
/rankedadmin reload
```

> **[📸 IMAGE NEEDED: リワード収集GUI(シーズン報酬とマイルストーン報酬の表示)]**

## 確認チェックリスト

公開前に確認:

- [ ] 少なくとも1つのアリーナが設定されている
- [ ] ブラックリストが設定されている(希望する場合)
- [ ] シーズンがアクティブ
- [ ] 報酬が設定されている(オプション)
- [ ] 2人のプレイヤーがキューに入りバトルを正常に実行できる
- [ ] イロレーティングが正しく更新される
- [ ] リーダーボードがランキングを表示する

## よくある問題

### アリーナが設定されていない

**症状:** プレイヤーがバトルを開始できない

**修正:**
```
/rankedadmin arena set main_arena
```

### プレイヤーが禁止ポケモンを使用できる

**症状:** ブラックリストにあるにもかかわらずミュウツーが許可される

**修正:**
1. `blacklist.json5`の構文を確認(末尾のカンマに注意！)
2. リロード: `/rankedadmin reload`
3. `/ranked` GUIバリデーションでテスト

### イロレーティングが更新されない

**症状:** バトル後もイロレーティングが1000のまま

**修正:**
1. コンソールでエラーを確認
2. データベース接続を確認
3. `config.json5` → `eloSystem.mode`を確認(LEGACY または POKEMON_SHOWDOWN のはず)

### シーズンが既に終了

**症状:** 「シーズンが終了しました」メッセージ

**修正:**
```
/rankedadmin season rotate
```
これにより新しいシーズンが作成され、報酬フラグがクリアされます。

## 次のステップ

これで準備完了です:

- **言語カスタマイズ** - [言語ファイル](../configuration/languages.md)
- **イロレーティングシステム設定** - [イロレーティングシステム](../features/elo-system.md)
- **クロスサーバー設定** - [クロスサーバー設定](../advanced/cross-server.md)
- **すべてのコマンドを学ぶ** - [コマンドリファレンス](commands.md)

## テストチェックリスト

新しいサーバーで設定する際にこのチェックリストを使用:

### 基本機能
- [ ] `/ranked` GUIが開く
- [ ] フォーマット選択が機能する
- [ ] キューシステムがプレイヤーを受け入れる
- [ ] マッチメイキングがプレイヤーをペアリングする
- [ ] バトルが正しく開始する
- [ ] プレイヤーがアリーナにテレポートする
- [ ] バトルが正常に終了する
- [ ] バトル後にイロレーティングが更新される

### 設定
- [ ] ブラックリストが禁止ポケモンをブロックする
- [ ] 禁止技が防がれる
- [ ] アリーナテレポートが機能する
- [ ] 言語ファイルが正しく表示される
- [ ] GUIアイテムが適切にレンダリングされる

### データベース
- [ ] 再起動後もプレイヤー統計が保持される
- [ ] リーダーボードが正しく表示される
- [ ] シーズンデータが保存される
- [ ] 報酬フラグが機能する

---

## 次のステップ

### 新規管理者向け
1. **[すべてのコマンドを学ぶ](commands.md)** - 管理コマンドリファレンスをマスター
2. **[報酬設定](../configuration/rewards.md)** - トッププレイヤーへの賞品設定
3. **[メッセージカスタマイズ](../configuration/gui.md#language-customization)** - プレイヤー向けテキストのカスタマイズ

### 競技設定向け
1. **[上級ブラックリスト](../configuration/blacklist.md)** - Smogon OUまたはVGCフォーマット設定
2. **[イロレーティングシステム調整](../features/elo-system.md)** - レーティング計算の理解
3. **[シーズン管理](../features/seasons.md)** - 競技期間の設定

### スケールアップ向け
1. **[クロスサーバー設定](../advanced/cross-server.md)** - 複数サーバー間でランキング共有
2. **[データベース最適化](../advanced/database.md)** - 大規模プレイヤーベース向けMySQL/MongoDB
3. **[PlaceholderAPI統合](../integration/placeholders.md)** - ホログラムでランキング表示

---

## 関連ページ
- [インストールガイド](installation.md) - 完全インストールリファレンス
- [コマンド](commands.md) - 完全コマンドリスト
- [トラブルシューティング](../support/troubleshooting.md) - よくある問題と解決策
