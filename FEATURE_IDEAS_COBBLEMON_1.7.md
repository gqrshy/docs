# CobbleRanked 新機能アイデア（Cobblemon 1.7対応）

**作成日**: 2025-11-24
**対象バージョン**: CobbleRanked v1.0.7+, Cobblemon 1.7

---

## 🎯 Cobblemon 1.7 新機能の概要

### 主要な新機能
1. **Markシステム** - Pokemon に称号が付けられる
2. **ライディングシステム** - Pokemon に乗れる
3. **料理システム** - Campfire Pot で料理作成
4. **持ち物可視化** - 持ち物の表示/非表示切り替え
5. **ハードシステム** - Pokemon がグループで行動
6. **PC改善** - ボックス名変更、ソート、フィルター
7. **AI改善** - 新しい行動パターン

---

## 💡 実装アイデア

### 🏆 1. Mark（称号）システムとの統合

#### 1.1 ランクマッチ専用Mark
**概要**: 特定のランク到達やシーズン勝利でMark（称号）を付与

**実装案:**
```kotlin
// カスタムMarkの定義
object RankedMarks {
    val CHALLENGER_MARK = Mark("ranked_challenger", "the Challenger")
    val SEASON_CHAMPION_MARK = Mark("ranked_champion", "the Season Champion")
    val UNDEFEATED_MARK = Mark("ranked_undefeated", "the Undefeated")
    val VETERAN_MARK = Mark("ranked_veteran", "the Veteran")
}

// ランク到達時にMark付与
fun grantRankMark(player: ServerPlayerEntity, rank: String, pokemon: Pokemon) {
    when (rank) {
        "Master" -> pokemon.addMark(RankedMarks.CHALLENGER_MARK)
        "Champion" -> pokemon.addMark(RankedMarks.SEASON_CHAMPION_MARK)
    }
}
```

**機能:**
- Elo 2000+ 到達で「the Challenger」称号
- シーズン優勝で「the Season Champion」称号
- 連勝記録で「the Undefeated」称号（10連勝以上）
- 100試合以上で「the Veteran」称号

**GUI表示:**
```kotlin
// リーダーボードで称号付き表示
val displayName = pokemon.getDisplayName(showTitle = true)
leaderboardItem.setCustomName(displayName)
```

**言語ファイル:**
```json5
{
  "mark.cobbleranked.ranked_challenger": "the Challenger",
  "mark.cobbleranked.ranked_champion": "the Season Champion",
  "mark.cobbleranked.ranked_undefeated": "the Undefeated",
  "mark.cobbleranked.ranked_veteran": "the Veteran"
}
```

---

### 🐴 2. ライディングシステムとの統合

#### 2.1 勝利者ライド演出
**概要**: ランクマッチ勝利後、勝者が自分のPokemonに乗る演出

**実装案:**
```kotlin
fun celebrateVictory(winner: ServerPlayerEntity, pokemon: Pokemon) {
    // 勝利Pokemon召喚
    val pokemonEntity = pokemon.sendOut(
        world = winner.serverWorld,
        position = winner.pos,
        aspects = pokemon.aspects
    )

    // 勝者を乗せる
    winner.startRiding(pokemonEntity)

    // 3秒後に降ろす
    Cobblemon.implementation.scheduler.scheduleOnServer(60) {
        winner.stopRiding()
    }
}
```

**機能:**
- バトル勝利後にPokemonに乗る演出（3秒間）
- トップランカー限定の特別なライドエフェクト
- アリーナ間移動時のライド使用許可

#### 2.2 ランクボーナス: ライド速度向上
**概要**: ランクが高いほどライド速度が上がる

**実装案:**
```kotlin
fun applyRankRidingBonus(player: ServerPlayerEntity, pokemon: Pokemon) {
    val elo = getPlayerElo(player)
    val speedBonus = when {
        elo >= 2000 -> 1.5f  // Master: 150%速度
        elo >= 1800 -> 1.3f  // Diamond: 130%速度
        elo >= 1600 -> 1.2f  // Platinum: 120%速度
        else -> 1.0f
    }

    // Aprijuice効果を適用（Cobblemon 1.7の新機能）
    applyAprijuiceEffect(pokemon, speedBonus)
}
```

---

### 🍳 3. 料理システムとの統合

#### 3.1 ランクマッチ報酬: 特別な料理
**概要**: 勝利報酬として特別な料理アイテムを配布

**実装案:**
```kotlin
// カスタム料理の定義
object RankedFoods {
    val CHAMPION_CAKE = createFood("champion_cake", saturation = 10, healing = 20)
    val MASTER_PONIGIRI = createFood("master_ponigiri", saturation = 8, healing = 15)
    val VICTORY_TEA = createFood("victory_tea", saturation = 5, healing = 10)
}

// 勝利時に料理を配布
fun grantVictoryFood(winner: ServerPlayerEntity, rank: String) {
    val food = when (rank) {
        "Master" -> RankedFoods.CHAMPION_CAKE
        "Diamond" -> RankedFoods.MASTER_PONIGIRI
        else -> RankedFoods.VICTORY_TEA
    }

    winner.inventory.insertStack(ItemStack(food))
    winner.sendMessage(textFromLang("reward_food_received", "{food}" to food.name))
}
```

**報酬種類:**
- **Champion Cake** (Master+): 満腹度10、体力20回復
- **Master Ponigiri** (Diamond+): 満腹度8、体力15回復
- **Victory Tea** (全ランク): 満腹度5、体力10回復

#### 3.2 Poké Snacks 報酬システム
**概要**: 連勝報酬として Poké Snacks を配布

**実装案:**
```kotlin
fun grantWinStreakReward(player: ServerPlayerEntity, winStreak: Int) {
    when (winStreak) {
        5 -> grantPokeSnack(player, "normal")
        10 -> grantPokeSnack(player, "rare")
        20 -> grantPokeSnack(player, "hidden_ability")
    }
}

fun grantPokeSnack(player: ServerPlayerEntity, type: String) {
    val snack = when (type) {
        "normal" -> Items.POKE_SNACK
        "rare" -> Items.RARE_POKE_SNACK
        "hidden_ability" -> Items.HIDDEN_ABILITY_SNACK
        else -> Items.POKE_SNACK
    }

    player.inventory.insertStack(ItemStack(snack))
}
```

**連勝報酬:**
- **5連勝**: 通常 Poké Snack
- **10連勝**: レア Poké Snack
- **20連勝**: Hidden Ability Poké Snack

---

### 👁️ 4. 持ち物可視化機能の活用

#### 4.1 ランクマッチ前に持ち物を隠す
**概要**: 戦略的要素として、相手の持ち物を見えなくする

**実装案:**
```kotlin
fun hideHeldItems(player: ServerPlayerEntity) {
    val party = MCobblemonUtil.getParty(player)
    party.forEach { pokemon ->
        pokemon?.heldItemVisible = false
    }
}

fun showHeldItems(player: ServerPlayerEntity) {
    val party = MCobblemonUtil.getParty(player)
    party.forEach { pokemon ->
        pokemon?.heldItemVisible = true
    }
}

// バトル開始時
fun onBattleStart(event: BattleStartedEvent.Pre) {
    event.battle.actors.forEach { actor ->
        if (actor is PlayerBattleActor) {
            hideHeldItems(actor.entity)
        }
    }
}

// バトル終了時
fun onBattleEnd(event: BattleVictoryEvent) {
    event.battle.actors.forEach { actor ->
        if (actor is PlayerBattleActor) {
            showHeldItems(actor.entity)
        }
    }
}
```

**機能:**
- キュー参加時に持ち物を自動的に隠す
- バトル終了後に持ち物を表示
- 観戦モードでの持ち物表示切り替えオプション

#### 4.2 リプレイ機能での持ち物表示
**概要**: リプレイ閲覧時に持ち物を表示可能に

**実装案:**
```kotlin
// リプレイデータに持ち物情報を保存
data class BattleReplay(
    val battleId: String,
    val participants: List<ReplayParticipant>,
    val turns: List<ReplayTurn>
)

data class ReplayParticipant(
    val playerName: String,
    val team: List<ReplayPokemon>
)

data class ReplayPokemon(
    val species: String,
    val level: Int,
    val heldItem: String?,  // 持ち物情報
    val moves: List<String>,
    val ability: String
)

// リプレイ閲覧GUI
fun showReplayWithItems(player: ServerPlayerEntity, replay: BattleReplay) {
    // 持ち物情報を表示可能に
    replay.participants.forEach { participant ->
        participant.team.forEach { pokemon ->
            // GUIに持ち物アイコンを表示
            if (pokemon.heldItem != null) {
                displayHeldItemIcon(pokemon.heldItem)
            }
        }
    }
}
```

---

### 📊 5. PC改善機能との統合

#### 5.1 ランクマッチ専用ボックス
**概要**: ランクマッチ用のPokemonを自動整理するボックス

**実装案:**
```kotlin
fun createRankedBox(player: ServerPlayerEntity) {
    val pc = PCLinkManager.getPC(player.uuid)

    // "Ranked Team" ボックスを作成
    val rankedBox = pc.boxes.firstOrNull { it.name == "Ranked Team" }
        ?: pc.createBox("Ranked Team")

    // カスタム壁紙を設定
    rankedBox.wallpaper = "cobbleranked:ranked_wallpaper"
}

// バトル前にPokemonを自動的にランクボックスにコピー
fun backupTeamToRankedBox(player: ServerPlayerEntity) {
    val party = MCobblemonUtil.getParty(player)
    val pc = PCLinkManager.getPC(player.uuid)
    val rankedBox = pc.boxes.first { it.name == "Ranked Team" }

    party.forEachIndexed { index, pokemon ->
        pokemon?.let {
            rankedBox.set(index, it.clone())
        }
    }
}
```

**機能:**
- ランクマッチ用ボックス自動作成
- バトル前にチームをバックアップ
- カスタム壁紙（ランクマッチテーマ）
- フィルター機能でランク用Pokemon検索

#### 5.2 戦績フィルター
**概要**: PC内でランクマッチに使用したPokemonをフィルタリング

**実装案:**
```kotlin
// Pokemon に戦績メタデータを追加
fun addRankedMetadata(pokemon: Pokemon, wins: Int, losses: Int) {
    pokemon.persistentData.putInt("ranked_wins", wins)
    pokemon.persistentData.putInt("ranked_losses", losses)
}

// PCフィルター: 勝率でソート
fun filterByWinRate(pc: PCBox): List<Pokemon> {
    return pc.getAllPokemon().sortedByDescending { pokemon ->
        val wins = pokemon.persistentData.getInt("ranked_wins")
        val losses = pokemon.persistentData.getInt("ranked_losses")
        if (wins + losses == 0) 0.0
        else wins.toDouble() / (wins + losses)
    }
}
```

**PokemonProperties対応:**
```
ranked_wins>=10  # 10勝以上
ranked_wins/ranked_losses>2  # 勝率2倍以上
```

---

### 🤖 6. AI改善機能との統合

#### 6.1 ハードボーナス
**概要**: 同じ種族のPokemonでパーティを組むとボーナス

**実装案:**
```kotlin
fun calculateHerdBonus(party: List<Pokemon>): Float {
    val speciesCount = party.groupBy { it.species.name }
    val largestHerd = speciesCount.maxByOrNull { it.value.size }?.value?.size ?: 0

    return when (largestHerd) {
        6 -> 1.10f  // 全て同じ種族: 10%ボーナス
        5 -> 1.08f  // 5匹同じ: 8%ボーナス
        4 -> 1.05f  // 4匹同じ: 5%ボーナス
        3 -> 1.03f  // 3匹同じ: 3%ボーナス
        else -> 1.0f
    }
}

// Eloボーナスとして適用
fun applyHerdBonus(player: ServerPlayerEntity, eloGain: Int): Int {
    val party = MCobblemonUtil.getParty(player).mapNotNull { it }
    val bonus = calculateHerdBonus(party)
    return (eloGain * bonus).toInt()
}
```

**ボーナス例:**
- **同種族6匹**: Elo獲得+10%（例: 25 → 27.5 → 28）
- **同種族5匹**: Elo獲得+8%
- **同種族4匹**: Elo獲得+5%
- **同種族3匹**: Elo獲得+3%

---

### 🎨 7. GUI拡張アイデア

#### 7.1 ランク専用壁紙
**概要**: ランク到達でPCボックス壁紙をアンロック

**実装案:**
```kotlin
object RankedWallpapers {
    val BRONZE = Wallpaper("cobbleranked:bronze", unlockCondition = { elo >= 1000 })
    val SILVER = Wallpaper("cobbleranked:silver", unlockCondition = { elo >= 1200 })
    val GOLD = Wallpaper("cobbleranked:gold", unlockCondition = { elo >= 1400 })
    val PLATINUM = Wallpaper("cobbleranked:platinum", unlockCondition = { elo >= 1600 })
    val DIAMOND = Wallpaper("cobbleranked:diamond", unlockCondition = { elo >= 1800 })
    val MASTER = Wallpaper("cobbleranked:master", unlockCondition = { elo >= 2000 })
}

// ランク到達時に壁紙をアンロック
fun unlockRankWallpaper(player: ServerPlayerEntity, rank: String) {
    val wallpaper = RankedWallpapers.valueOf(rank.uppercase())

    CobblemonEvents.WALLPAPER_UNLOCKED.post(WallpaperUnlockedEvent(
        player = player,
        wallpaper = wallpaper
    ))

    player.sendMessage(textFromLang("wallpaper_unlocked", "{rank}" to rank))
}
```

**アンロック条件:**
- **Bronze壁紙**: Elo 1000+
- **Silver壁紙**: Elo 1200+
- **Gold壁紙**: Elo 1400+
- **Platinum壁紙**: Elo 1600+
- **Diamond壁紙**: Elo 1800+
- **Master壁紙**: Elo 2000+

#### 7.2 統計情報の拡張表示
**概要**: PCのIV/EV表示機能を活用した戦績表示

**実装案:**
```kotlin
// Pokemon のホバー表示に戦績を追加
fun addRankedStatsTooltip(pokemon: Pokemon): List<Text> {
    val wins = pokemon.persistentData.getInt("ranked_wins")
    val losses = pokemon.persistentData.getInt("ranked_losses")
    val winRate = if (wins + losses > 0) {
        (wins.toDouble() / (wins + losses) * 100).toInt()
    } else 0

    return listOf(
        Text.literal("§6Ranked Stats:"),
        Text.literal("  §7Wins: §a$wins"),
        Text.literal("  §7Losses: §c$losses"),
        Text.literal("  §7Win Rate: §e$winRate%")
    )
}
```

---

### 🎵 8. バトル演出の強化

#### 8.1 ランク別BGM
**概要**: ランクが高いほど専用BGMが流れる

**実装案:**
```kotlin
fun playRankBattleMusic(player: ServerPlayerEntity, elo: Int) {
    val musicId = when {
        elo >= 2000 -> "cobbleranked:music.battle.master"
        elo >= 1800 -> "cobbleranked:music.battle.diamond"
        elo >= 1600 -> "cobbleranked:music.battle.platinum"
        else -> "cobbleranked:music.battle.normal"
    }

    val packet = BattleMusicPacket(musicId)
    player.sendPacket(packet)
}
```

**BGM種類:**
- **Master Tier**: 専用エピックBGM
- **Diamond Tier**: 専用緊張感のあるBGM
- **Platinum Tier**: 専用クールなBGM
- **それ以下**: 通常のバトルBGM

#### 8.2 勝利エフェクト
**概要**: ランク到達時の特別なエフェクト

**実装案:**
```kotlin
fun playRankUpEffect(player: ServerPlayerEntity, newRank: String) {
    // パーティクルエフェクト
    val particleType = when (newRank) {
        "Master" -> ParticleTypes.DRAGON_BREATH
        "Diamond" -> ParticleTypes.END_ROD
        "Platinum" -> ParticleTypes.GLOW
        else -> ParticleTypes.HAPPY_VILLAGER
    }

    player.serverWorld.spawnParticles(
        particleType,
        player.x, player.y + 1, player.z,
        50,  // count
        0.5, 1.0, 0.5,  // spread
        0.1  // speed
    )

    // サウンドエフェクト
    player.playSound(
        SoundEvents.UI_TOAST_CHALLENGE_COMPLETE,
        SoundCategory.PLAYERS,
        1.0f, 1.0f
    )
}
```

---

## 📊 実装優先度

### 高優先度（即座に実装可能）
1. **持ち物可視化機能** - バトル中に持ち物を隠す
2. **ランク専用ボックス** - 自動整理機能
3. **勝利報酬料理** - 簡単な報酬システム

### 中優先度（実装に少し時間がかかる）
1. **Markシステム統合** - カスタムMark作成
2. **ライディング演出** - 勝利後の演出
3. **戦績フィルター** - PC検索機能

### 低優先度（大規模な実装が必要）
1. **ランク専用壁紙** - カスタムテクスチャ作成
2. **ハードボーナス** - バランス調整が必要
3. **AI統合** - 複雑な挙動制御

---

## 🔧 技術的考慮事項

### Markシステム
- Cobblemon 1.7のMark APIを使用
- カスタムMarkはリソースパックで定義
- データパックで配布条件を設定

### ライディングシステム
- `Pokemon.sendOut()` でPokemonを召喚
- `ServerPlayerEntity.startRiding()` で騎乗
- Aprijuice効果の適用にはCobblemon APIを使用

### 料理システム
- カスタムアイテムはリソースパックで定義
- Campfire Pot レシピはデータパックで定義
- 報酬配布は既存のシステムに統合

### 持ち物可視化
- `Pokemon.heldItemVisible` プロパティを使用
- バトル開始/終了イベントで制御
- クライアント側で自動的に反映

---

## 📝 実装例: Markシステム統合

### ステップ1: カスタムMark定義

**リソースパック** (`resourcepacks/cobbleranked/data/cobbleranked/marks/ranked_marks.json`):
```json
{
  "ranked_challenger": {
    "title": "the Challenger",
    "rarity": "epic",
    "description": "A mark given to those who reached 2000 Elo."
  },
  "ranked_champion": {
    "title": "the Season Champion",
    "rarity": "legendary",
    "description": "A mark given to the season winner."
  }
}
```

### ステップ2: Mark付与ロジック

**Kotlin実装**:
```kotlin
object RankedMarkManager {
    private val marks = mutableMapOf<String, Identifier>()

    fun registerMarks() {
        marks["challenger"] = cobblemonResource("ranked_challenger")
        marks["champion"] = cobblemonResource("ranked_champion")
    }

    fun grantMark(player: ServerPlayerEntity, pokemon: Pokemon, markType: String) {
        val markId = marks[markType] ?: return

        // `/givemark` コマンドと同じロジック
        val mark = MarkRegistry.get(markId) ?: return
        pokemon.addMark(mark)

        player.sendMessage(
            textFromLang("mark_granted",
                "{mark}" to mark.title.string,
                "{pokemon}" to MCobblemonUtil.getPokemonDisplayName(pokemon).string
            )
        )
    }
}

// 使用例: Elo到達時
fun onEloChanged(player: ServerPlayerEntity, newElo: Int, pokemon: Pokemon) {
    if (newElo >= 2000 && !pokemon.hasMark("ranked_challenger")) {
        RankedMarkManager.grantMark(player, pokemon, "challenger")
    }
}
```

### ステップ3: GUI表示

**RankedGui.kt に統合**:
```kotlin
fun createPokemonDisplayItem(pokemon: Pokemon, showMark: Boolean = false): ItemStack {
    val item = MCobblemonUtil.getPokemonItem(pokemon)

    if (showMark) {
        val displayName = MCobblemonUtil.getPokemonDisplayName(pokemon)
        item.setCustomName(displayName)
    }

    // Loreに戦績とMarkを表示
    val lore = mutableListOf<Text>()

    // 戦績
    val wins = pokemon.persistentData.getInt("ranked_wins")
    val losses = pokemon.persistentData.getInt("ranked_losses")
    lore.add(Text.literal("§7W/L: §a$wins§7/§c$losses"))

    // Mark
    pokemon.marks.forEach { mark ->
        lore.add(Text.literal("§6✦ ${mark.title.string}"))
    }

    item.lore = lore
    return item
}
```

---

## 🎯 まとめ

Cobblemon 1.7の新機能を活用することで、CobbleRankedは以下の拡張が可能：

1. **Mark統合** - ランク称号システム
2. **ライディング** - 勝利演出・移動ボーナス
3. **料理報酬** - 勝利報酬・連勝報酬
4. **持ち物制御** - 戦略的要素の追加
5. **PC拡張** - 戦績管理・自動整理
6. **演出強化** - ランク別BGM・エフェクト

これらの機能は段階的に実装可能で、既存システムとの互換性も保たれます。

---

**作成者**: Claude Code (Sonnet 4.5)
**最終更新**: 2025-11-24
