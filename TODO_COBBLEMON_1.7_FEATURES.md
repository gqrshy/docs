# CobbleRanked - Cobblemon 1.7 新機能実装TODOリスト

**作成日**: 2025-11-24
**ステータス**: 検討中
**実現性**: ✅ 全機能サーバーサイドのみで実装可能

---

## 📋 実装優先度別TODO

### 🔴 Phase 1: 即座に実装可能（5-30分）

#### ✅ 1. 持ち物可視化制御
- **難易度**: ⭐☆☆☆☆ (非常に簡単)
- **所要時間**: 5分
- **実現性**: ✅ サーバーサイドのみ
- **効果**: 戦略的要素の追加

**実装内容:**
```kotlin
// BattleListener.kt に追加
fun onBattleStart(event: BattleStartedEvent.Pre) {
    event.battle.actors.forEach { actor ->
        if (actor is PlayerBattleActor) {
            val party = MCobblemonUtil.getParty(actor.entity)
            party.forEach { pokemon ->
                pokemon?.heldItemVisible = false  // バトル中は持ち物を隠す
            }
        }
    }
}

fun onBattleEnd(event: BattleVictoryEvent) {
    event.battle.actors.forEach { actor ->
        if (actor is PlayerBattleActor) {
            val party = MCobblemonUtil.getParty(actor.entity)
            party.forEach { pokemon ->
                pokemon?.heldItemVisible = true  // バトル後は表示
            }
        }
    }
}
```

**タスク:**
- [ ] `BattleListener.kt` に `onBattleStart()` 追加
- [ ] `BattleListener.kt` に `onBattleEnd()` 追加
- [ ] `BattleStartedEvent.Pre` をイベントリスナーに登録
- [ ] 動作テスト（1.6.1 / 1.7両方）

---

### 🟡 Phase 2: 中期実装（1-3日）

#### 🎨 2. 勝利時パーティクルエフェクト報酬システム
- **難易度**: ⭐⭐⭐☆☆ (中程度)
- **所要時間**: 1-2日
- **実現性**: ✅ サーバーサイドのみ
- **効果**: ユーザー満足度大幅向上

**実装内容:**
- シーズン報酬・ランク報酬としてエフェクト配布
- GUI設定でON/OFF切り替え
- 複数エフェクトから選択可能
- バトル勝利時に自動発動

**エフェクト種類:**
- **Common**: キラキラ（初期解放）
- **Rare**: ダイヤモンドの雨（Diamond Elo 1800+）
- **Epic**: マスターオーラ（Master Elo 2000+）
- **Legendary**: チャンピオンの輝き（シーズン優勝）

**タスク:**
- [ ] `VictoryEffect.kt` データクラス作成
- [ ] `VictoryEffectManager.kt` マネージャー作成
- [ ] `EffectPatternRenderer.kt` レンダラー作成
- [ ] デフォルトエフェクト5種類実装
  - [ ] CIRCLE (円形)
  - [ ] SPIRAL (らせん)
  - [ ] FOUNTAIN (噴水)
  - [ ] EXPLOSION (爆発)
  - [ ] AURA (オーラ)
- [ ] データベーススキーマ追加 (`player_victory_effects`)
- [ ] `BattleListener.kt` にエフェクト発動処理追加
- [ ] `ServerTickEvents` でエフェクト更新処理登録
- [ ] 報酬配布システム実装
  - [ ] Elo到達時
  - [ ] シーズン優勝時
  - [ ] 連勝達成時
- [ ] 動作テスト

**参考資料:**
- [VICTORY_EFFECT_SYSTEM.md](VICTORY_EFFECT_SYSTEM.md) - 詳細設計書

---

#### ⚙️ 3. 勝利エフェクト設定GUI
- **難易度**: ⭐⭐☆☆☆ (やや簡単)
- **所要時間**: 1日
- **実現性**: ✅ サーバーサイドのみ
- **前提条件**: エフェクトシステム実装完了

**実装内容:**
- エフェクトON/OFFトグル
- 所持エフェクト一覧表示
- エフェクト選択・プレビュー機能
- レア度別アイコン表示

**タスク:**
- [ ] `VictoryEffectSettingsGui.kt` GUI作成
- [ ] エフェクト一覧表示実装
- [ ] ON/OFFトグルボタン実装
- [ ] エフェクト選択・アクティブ化実装
- [ ] プレビュー機能実装（クリックで即座に発動）
- [ ] 言語ファイル追加
  - [ ] `gui_victory_effect_title`
  - [ ] `gui_victory_effect_enabled`
  - [ ] `gui_victory_effect_disabled`
  - [ ] `victory_effect_unlocked`
- [ ] `/ranked` GUI からの遷移追加
- [ ] 動作テスト

---

### 🟢 Phase 3: 長期実装（2-5日）

#### 🖼️ 4. カスタムPCボックス壁紙システム
- **難易度**: ⭐⭐⭐⭐☆ (やや難しい)
- **所要時間**: 2-3日（テクスチャ作成含む）
- **実現性**: ✅ サーバーリソースパック + データパック
- **効果**: 視覚的報酬の追加

**実装内容:**
- Eloランク到達で壁紙アンロック
- 6種類のランク壁紙（Bronze → Master）
- データパックで定義
- サーバーリソースパックでテクスチャ配布

**壁紙種類:**
- **Bronze壁紙**: Elo 1000+
- **Silver壁紙**: Elo 1200+
- **Gold壁紙**: Elo 1400+
- **Platinum壁紙**: Elo 1600+
- **Diamond壁紙**: Elo 1800+
- **Master壁紙**: Elo 2000+

**タスク:**
- [ ] テクスチャ作成（256x256 PNG）
  - [ ] `wallpaper_bronze.png`
  - [ ] `wallpaper_silver.png`
  - [ ] `wallpaper_gold.png`
  - [ ] `wallpaper_platinum.png`
  - [ ] `wallpaper_diamond.png`
  - [ ] `wallpaper_master.png`
- [ ] サーバーリソースパック構造作成
  ```
  server-resourcepack/
    pack.mcmeta
    assets/
      cobbleranked/
        textures/
          gui/
            pc/
              wallpaper_*.png
  ```
- [ ] データパック定義作成
  ```
  data/
    cobbleranked/
      pc_wallpapers/
        ranked_bronze.json
        ranked_silver.json
        ...
  ```
- [ ] `RankedWallpapers.kt` マネージャー作成
- [ ] Elo到達時の壁紙アンロック実装
- [ ] `WallpaperUnlockedEvent` イベント処理
- [ ] アンロック通知メッセージ実装
- [ ] 言語ファイル追加
  - [ ] `wallpaper_unlocked`
  - [ ] `wallpaper_bronze_name`
  - [ ] ...
- [ ] 動作テスト

---

#### 🏆 5. Pokemonマークシステム統合
- **難易度**: ⭐⭐⭐☆☆ (中程度)
- **所要時間**: 1-2日
- **実現性**: ✅ データパック + サーバーサイドAPI
- **効果**: Pokemon個体の功績を称える

**実装内容:**
- ランクマッチ専用Mark（称号）作成
- Elo到達・シーズン優勝でMark付与
- リーダーボード・GUIで称号付き表示
- LuckPerms権限システムと併用

**Mark種類:**
- **the Challenger**: Elo 2000+
- **the Season Champion**: シーズン優勝
- **the Undefeated**: 20連勝以上
- **the Veteran**: 100試合以上

**タスク:**
- [ ] データパックでMark定義
  ```
  data/
    cobbleranked/
      marks/
        ranked_marks.json
  ```
- [ ] `RankedMarkManager.kt` マネージャー作成
- [ ] Mark付与ロジック実装
  - [ ] Elo到達時
  - [ ] シーズン優勝時
  - [ ] 連勝達成時
  - [ ] 総試合数達成時
- [ ] `MCobblemonUtil.getPokemonDisplayName()` に `showTitle` 対応追加
- [ ] リーダーボードGUIでMark表示対応
- [ ] `RankedGui.kt` でMark表示対応
- [ ] 言語ファイル追加
  - [ ] `mark.cobbleranked.ranked_challenger`
  - [ ] `mark.cobbleranked.ranked_champion`
  - [ ] ...
- [ ] 動作テスト（1.6.1 / 1.7両方）

**注意事項:**
- LuckPerms権限システムは継続使用（プレイヤー称号）
- Markシステムは追加演出として使用（Pokemon称号）

---

#### 🎭 6. ライディング演出システム
- **難易度**: ⭐⭐⭐☆☆ (中程度)
- **所要時間**: 1-2日
- **実現性**: ✅ サーバーサイドのみ（Cobblemon 1.7専用）
- **効果**: 勝利演出の強化

**実装内容:**
- バトル勝利後にPokemonに乗る演出（3秒間）
- ランクに応じたライド速度ボーナス（Aprijuice効果）
- トップランカー限定の特別エフェクト

**タスク:**
- [ ] `VictoryRideManager.kt` マネージャー作成
- [ ] バトル勝利時のライド演出実装
  - [ ] Pokemon召喚 (`pokemon.sendOut()`)
  - [ ] プレイヤー騎乗 (`player.startRiding()`)
  - [ ] 3秒後に降車処理
- [ ] ランクボーナス実装
  - [ ] Elo 2000+: 150%速度
  - [ ] Elo 1800+: 130%速度
  - [ ] Elo 1600+: 120%速度
- [ ] Aprijuice効果適用
- [ ] 特別エフェクト実装（Master以上）
- [ ] Config設定追加
  ```json5
  {
    "victory_ride": {
      "enabled": true,
      "duration_seconds": 3,
      "enable_rank_bonus": true
    }
  }
  ```
- [ ] 動作テスト（Cobblemon 1.7のみ）

**注意事項:**
- **Cobblemon 1.7専用機能**
- 1.6.1では無効化される必要がある

---

## 📊 実装スケジュール（目安）

```
Week 1:
  Day 1: 持ち物可視化制御 (完了)
  Day 2-3: 勝利エフェクトシステム基礎実装
  Day 4-5: 勝利エフェクト設定GUI

Week 2:
  Day 1-2: カスタム壁紙システム
  Day 3: テクスチャ作成・調整
  Day 4-5: Markシステム統合

Week 3:
  Day 1-2: ライディング演出システム
  Day 3-5: 統合テスト・バグ修正
```

---

## 🔧 技術的考慮事項

### バージョン互換性

| 機能 | Cobblemon 1.6.1 | Cobblemon 1.7 |
|------|----------------|---------------|
| 持ち物可視化 | ❌ 非対応 | ✅ 対応 |
| 勝利エフェクト | ✅ 対応 | ✅ 対応 |
| エフェクトGUI | ✅ 対応 | ✅ 対応 |
| カスタム壁紙 | ✅ 対応 | ✅ 対応 |
| Markシステム | ✅ 対応 | ✅ 対応 |
| ライディング演出 | ❌ 非対応 | ✅ 対応 |

### 実装時の注意点

1. **バージョン判定**
   ```kotlin
   val isCobblemon17 = try {
       // Cobblemon 1.7専用機能をチェック
       Pokemon::class.java.getDeclaredField("heldItemVisible")
       true
   } catch (e: NoSuchFieldException) {
       false
   }
   ```

2. **1.6.1用フォールバック**
   ```kotlin
   if (isCobblemon17) {
       pokemon.heldItemVisible = false
   } else {
       // 1.6.1では何もしない（機能無効）
   }
   ```

3. **データベース互換性**
   - 新テーブル追加は問題なし
   - 既存テーブルの変更は慎重に

4. **パフォーマンス**
   - エフェクト同時再生数を制限（最大10人）
   - パーティクル数を調整可能に
   - tick間隔を設定可能に

---

## 📚 参考資料

### 設計書
- [COBBLEMON_COMPATIBILITY_REPORT.md](COBBLEMON_COMPATIBILITY_REPORT.md) - 互換性調査レポート
- [FEATURE_IDEAS_COBBLEMON_1.7.md](FEATURE_IDEAS_COBBLEMON_1.7.md) - 新機能アイデア集
- [VICTORY_EFFECT_SYSTEM.md](VICTORY_EFFECT_SYSTEM.md) - 勝利エフェクト詳細設計

### Cobblemonソースコード
- `/home/gqrshy/projects/cobblemon-1.6.1/` - 1.6.1ソースコード
- `/home/gqrshy/projects/cobblemon-1.7/` - 1.7ソースコード

### CobbleRanked
- `/home/gqrshy/projects/CobbleRanked/` - プロジェクトルート
- `src/main/kotlin/com/gashi/cobbleranked/` - ソースコード

---

## ✅ 完了チェックリスト

### Phase 1
- [ ] 持ち物可視化制御

### Phase 2
- [ ] 勝利エフェクトシステム
- [ ] エフェクト設定GUI

### Phase 3
- [ ] カスタム壁紙システム
- [ ] Markシステム統合
- [ ] ライディング演出システム

### 統合テスト
- [ ] Cobblemon 1.6.1での動作確認
- [ ] Cobblemon 1.7での動作確認
- [ ] クロスサーバー環境テスト
- [ ] シングルサーバー環境テスト
- [ ] パフォーマンステスト

---

## 💭 メモ・検討事項

### LuckPerms vs Markシステム
- **LuckPerms**: プレイヤー称号（チャット・ネームタグ）
- **Mark**: Pokemon称号（GUI・バトル中）
- **結論**: 両方併用する（用途が異なる）

### 実装優先度の判断基準
1. **実装難易度**が低い
2. **ユーザー満足度**が高い
3. **バージョン互換性**がある
4. **パフォーマンス影響**が小さい

### 将来的な拡張
- [ ] エフェクトのカスタマイズ機能（色変更など）
- [ ] 壁紙のユーザー投稿システム
- [ ] Markの追加種類（イベント限定など）
- [ ] ライディング演出のカスタマイズ

---

**作成者**: Claude Code (Sonnet 4.5)
**最終更新**: 2025-11-24
**ステータス**: ✅ 検討中・実装待ち
