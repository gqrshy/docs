# 勝利エフェクトシステム設計書

**作成日**: 2025-11-24
**実現性**: ✅ サーバーサイドのみで完全実装可能

---

## 概要

ランクマッチ勝利時に特別なパーティクルエフェクトを発動する報酬システム。
シーズン報酬やランク到達報酬として配布し、GUI設定で管理可能。

---

## システム設計

### データ構造

```kotlin
// VictoryEffect.kt
data class VictoryEffect(
    val id: String,
    val displayName: String,
    val description: String,
    val particleType: ParticleType,
    val soundEvent: SoundEvent?,
    val duration: Int,  // ticks
    val pattern: EffectPattern,
    val rarity: Rarity,
    val unlockCondition: UnlockCondition
)

enum class EffectPattern {
    CIRCLE,         // 円形
    SPIRAL,         // らせん
    FOUNTAIN,       // 噴水
    EXPLOSION,      // 爆発
    RAIN,           // 雨
    AURA           // オーラ
}

enum class Rarity {
    COMMON,         // 通常報酬
    RARE,           // ランク報酬
    EPIC,           // シーズン報酬
    LEGENDARY       // 特別報酬
}

sealed class UnlockCondition {
    data class EloReached(val elo: Int) : UnlockCondition()
    data class SeasonWin(val season: Int) : UnlockCondition()
    data class WinStreak(val wins: Int) : UnlockCondition()
    data class TotalWins(val wins: Int) : UnlockCondition()
}
```

### プレイヤーデータ

```kotlin
// PlayerVictoryEffects.kt
data class PlayerVictoryEffects(
    val playerUuid: UUID,
    val unlockedEffects: MutableSet<String> = mutableSetOf(),
    val activeEffect: String? = null,
    val enabled: Boolean = true
) {
    fun hasEffect(effectId: String): Boolean = unlockedEffects.contains(effectId)

    fun unlockEffect(effectId: String) {
        unlockedEffects.add(effectId)
    }

    fun setActive(effectId: String?) {
        activeEffect = effectId
    }
}
```

### データベーススキーマ

```sql
CREATE TABLE IF NOT EXISTS player_victory_effects (
    player_uuid VARCHAR(36) PRIMARY KEY,
    unlocked_effects TEXT,  -- JSON array: ["effect1", "effect2"]
    active_effect VARCHAR(50),
    enabled BOOLEAN DEFAULT TRUE
);
```

---

## エフェクト定義

### デフォルトエフェクト

```kotlin
object VictoryEffects {
    val NONE = VictoryEffect(
        id = "none",
        displayName = "なし",
        description = "エフェクトを表示しない",
        particleType = ParticleTypes.HAPPY_VILLAGER,
        soundEvent = null,
        duration = 0,
        pattern = EffectPattern.CIRCLE,
        rarity = Rarity.COMMON,
        unlockCondition = UnlockCondition.EloReached(0)
    )

    // 通常エフェクト（デフォルト）
    val SPARKLE = VictoryEffect(
        id = "sparkle",
        displayName = "キラキラ",
        description = "キラキラとした光が舞う",
        particleType = ParticleTypes.GLOW,
        soundEvent = SoundEvents.PLAYER_LEVELUP,
        duration = 60,  // 3秒
        pattern = EffectPattern.CIRCLE,
        rarity = Rarity.COMMON,
        unlockCondition = UnlockCondition.EloReached(0)  // 初期解放
    )

    // ランク報酬
    val DIAMOND_RAIN = VictoryEffect(
        id = "diamond_rain",
        displayName = "ダイヤモンドの雨",
        description = "ダイヤモンドのような光が降り注ぐ",
        particleType = ParticleTypes.END_ROD,
        soundEvent = SoundEvents.AMETHYST_BLOCK_CHIME,
        duration = 100,
        pattern = EffectPattern.RAIN,
        rarity = Rarity.RARE,
        unlockCondition = UnlockCondition.EloReached(1800)  // Diamond到達
    )

    val MASTER_AURA = VictoryEffect(
        id = "master_aura",
        displayName = "マスターオーラ",
        description = "圧倒的な力のオーラが放たれる",
        particleType = ParticleTypes.DRAGON_BREATH,
        soundEvent = SoundEvents.ENDER_DRAGON_GROWL,
        duration = 120,
        pattern = EffectPattern.AURA,
        rarity = Rarity.EPIC,
        unlockCondition = UnlockCondition.EloReached(2000)  // Master到達
    )

    // シーズン報酬
    val SEASON_CHAMPION = VictoryEffect(
        id = "season_champion",
        displayName = "チャンピオンの輝き",
        description = "シーズン優勝者だけの特別なエフェクト",
        particleType = ParticleTypes.TOTEM_OF_UNDYING,
        soundEvent = SoundEvents.UI_TOAST_CHALLENGE_COMPLETE,
        duration = 200,
        pattern = EffectPattern.EXPLOSION,
        rarity = Rarity.LEGENDARY,
        unlockCondition = UnlockCondition.SeasonWin(1)
    )

    // 連勝報酬
    val UNDEFEATED_FLAME = VictoryEffect(
        id = "undefeated_flame",
        displayName = "無敗の炎",
        description = "連勝記録を持つ者の証",
        particleType = ParticleTypes.SOUL_FIRE_FLAME,
        soundEvent = SoundEvents.BLAZE_SHOOT,
        duration = 80,
        pattern = EffectPattern.SPIRAL,
        rarity = Rarity.EPIC,
        unlockCondition = UnlockCondition.WinStreak(20)  // 20連勝
    )
}
```

---

## エフェクトパターン実装

### サーバーサイドパーティクル生成

```kotlin
object EffectPatternRenderer {

    fun renderEffect(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        when (effect.pattern) {
            EffectPattern.CIRCLE -> renderCircle(world, position, effect, tick)
            EffectPattern.SPIRAL -> renderSpiral(world, position, effect, tick)
            EffectPattern.FOUNTAIN -> renderFountain(world, position, effect, tick)
            EffectPattern.EXPLOSION -> renderExplosion(world, position, effect, tick)
            EffectPattern.RAIN -> renderRain(world, position, effect, tick)
            EffectPattern.AURA -> renderAura(world, position, effect, tick)
        }
    }

    private fun renderCircle(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        val radius = 2.0
        val points = 20
        val angleStep = (Math.PI * 2) / points

        for (i in 0 until points) {
            val angle = i * angleStep + (tick * 0.1)
            val x = position.x + cos(angle) * radius
            val z = position.z + sin(angle) * radius
            val y = position.y + 1.0 + sin(tick * 0.1) * 0.5

            world.spawnParticles(
                effect.particleType,
                x, y, z,
                1,  // count
                0.0, 0.0, 0.0,  // spread
                0.0  // speed
            )
        }
    }

    private fun renderSpiral(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        val height = tick * 0.05
        val radius = 1.5
        val angle = tick * 0.2

        val x = position.x + cos(angle) * radius
        val z = position.z + sin(angle) * radius
        val y = position.y + height

        if (y < position.y + 3.0) {
            world.spawnParticles(
                effect.particleType,
                x, y, z,
                2,
                0.1, 0.1, 0.1,
                0.02
            )
        }
    }

    private fun renderFountain(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        for (i in 0 until 5) {
            val angle = (tick + i * 10) * 0.1
            val velocityX = cos(angle) * 0.3
            val velocityZ = sin(angle) * 0.3

            world.spawnParticles(
                effect.particleType,
                position.x, position.y + 0.5, position.z,
                1,
                velocityX, 0.5, velocityZ,  // 上向きの速度
                0.0
            )
        }
    }

    private fun renderExplosion(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        if (tick == 1) {
            // 初回だけ大爆発
            world.spawnParticles(
                effect.particleType,
                position.x, position.y + 1.0, position.z,
                100,  // 大量のパーティクル
                1.0, 1.0, 1.0,  // 広範囲
                0.2  // 高速
            )
        }
    }

    private fun renderRain(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        val range = 3.0
        for (i in 0 until 3) {
            val x = position.x + (Math.random() - 0.5) * range * 2
            val z = position.z + (Math.random() - 0.5) * range * 2
            val y = position.y + 4.0

            world.spawnParticles(
                effect.particleType,
                x, y, z,
                1,
                0.0, -0.5, 0.0,  // 下向きの速度
                0.0
            )
        }
    }

    private fun renderAura(
        world: ServerWorld,
        position: Vec3d,
        effect: VictoryEffect,
        tick: Int
    ) {
        val radius = 1.0 + sin(tick * 0.1) * 0.3
        val points = 30

        for (i in 0 until points) {
            val angle = (i * (Math.PI * 2) / points) + (tick * 0.05)
            val x = position.x + cos(angle) * radius
            val z = position.z + sin(angle) * radius
            val y = position.y + 0.5 + sin(angle * 3) * 0.3

            world.spawnParticles(
                effect.particleType,
                x, y, z,
                1,
                0.0, 0.0, 0.0,
                0.0
            )
        }
    }
}
```

---

## バトル終了時の発動

```kotlin
// BattleListener.kt
fun handleBattleVictory(event: BattleVictoryEvent) {
    event.winners.forEach { winner ->
        if (winner is PlayerBattleActor) {
            val player = winner.entity

            // プレイヤーの設定を取得
            val effectData = VictoryEffectManager.getPlayerEffects(player.uuid)

            if (effectData.enabled && effectData.activeEffect != null) {
                val effect = VictoryEffects.getById(effectData.activeEffect)

                if (effect != null) {
                    // エフェクト再生開始
                    VictoryEffectManager.playEffect(player, effect)

                    // サウンドも再生
                    effect.soundEvent?.let { sound ->
                        player.playSound(sound, SoundCategory.PLAYERS, 1.0f, 1.0f)
                    }
                }
            }
        }
    }
}
```

### エフェクト再生システム

```kotlin
object VictoryEffectManager {
    private val activeEffects = mutableMapOf<UUID, EffectPlayback>()

    data class EffectPlayback(
        val player: ServerPlayerEntity,
        val effect: VictoryEffect,
        val startTick: Int,
        var currentTick: Int = 0
    )

    fun playEffect(player: ServerPlayerEntity, effect: VictoryEffect) {
        activeEffects[player.uuid] = EffectPlayback(
            player = player,
            effect = effect,
            startTick = player.server.ticks
        )
    }

    // ServerTickEvents で毎tick呼び出す
    fun tick(server: MinecraftServer) {
        val iterator = activeEffects.iterator()

        while (iterator.hasNext()) {
            val (uuid, playback) = iterator.next()
            playback.currentTick++

            // エフェクト継続時間チェック
            if (playback.currentTick >= playback.effect.duration) {
                iterator.remove()
                continue
            }

            // プレイヤーが有効か確認
            val player = server.playerList.getPlayer(uuid)
            if (player == null || !player.isAlive) {
                iterator.remove()
                continue
            }

            // パーティクル生成
            EffectPatternRenderer.renderEffect(
                world = player.serverWorld,
                position = player.pos,
                effect = playback.effect,
                tick = playback.currentTick
            )
        }
    }
}

// CobbleRankedMod.kt で登録
ServerTickEvents.END_SERVER_TICK.register { server ->
    VictoryEffectManager.tick(server)
}
```

---

## GUI設定画面

### エフェクト設定GUI

```kotlin
// VictoryEffectSettingsGui.kt
class VictoryEffectSettingsGui(
    private val player: ServerPlayerEntity
) : SimpleGui(
    title = textFromLang("gui_victory_effect_title"),
    rows = 6
) {

    private val effectData = VictoryEffectManager.getPlayerEffects(player.uuid)

    init {
        buildGui()
    }

    private fun buildGui() {
        // ON/OFFトグル (スロット4)
        setSlot(4, createToggleItem())

        // 所持エフェクトを表示
        val effects = VictoryEffects.ALL.filter { effectData.hasEffect(it.id) }

        effects.forEachIndexed { index, effect ->
            val row = 2 + (index / 7)
            val col = 1 + (index % 7)
            val slot = row * 9 + col

            if (slot < 54) {
                setSlot(slot, createEffectItem(effect))
            }
        }

        // 閉じるボタン
        setSlot(49, createCloseButton())
    }

    private fun createToggleItem(): ItemStack {
        val item = ItemStack(
            if (effectData.enabled) Items.LIME_DYE else Items.GRAY_DYE
        )

        item.setCustomName(
            if (effectData.enabled) {
                textFromLang("gui_victory_effect_enabled")
            } else {
                textFromLang("gui_victory_effect_disabled")
            }
        )

        item.lore = listOf(
            textFromLang("gui_victory_effect_toggle_hint")
        )

        setClickAction(4) {
            effectData.enabled = !effectData.enabled
            VictoryEffectManager.savePlayerEffects(player.uuid, effectData)
            buildGui()
            player.playSound(SoundEvents.UI_BUTTON_CLICK, SoundCategory.MASTER, 1.0f, 1.0f)
        }

        return item
    }

    private fun createEffectItem(effect: VictoryEffect): ItemStack {
        val isActive = effect.id == effectData.activeEffect

        val item = ItemStack(
            when (effect.rarity) {
                Rarity.COMMON -> Items.IRON_INGOT
                Rarity.RARE -> Items.GOLD_INGOT
                Rarity.EPIC -> Items.DIAMOND
                Rarity.LEGENDARY -> Items.NETHERITE_INGOT
            }
        )

        item.setCustomName(
            Text.literal(effect.displayName).withStyle { style ->
                style.withColor(
                    if (isActive) 0x55FF55 else 0xFFFFFF
                )
            }
        )

        item.lore = buildList {
            add(Text.literal("§7${effect.description}"))
            add(Text.literal(""))
            add(Text.literal("§6レア度: ${effect.rarity.displayName}"))

            if (isActive) {
                add(Text.literal("§a現在使用中"))
            } else {
                add(Text.literal("§eクリックで設定"))
            }
        }

        val slot = getSlotForEffect(effect)
        setClickAction(slot) {
            effectData.setActive(if (isActive) null else effect.id)
            VictoryEffectManager.savePlayerEffects(player.uuid, effectData)
            buildGui()

            // プレビュー再生
            VictoryEffectManager.playEffect(player, effect)
            effect.soundEvent?.let { sound ->
                player.playSound(sound, SoundCategory.PLAYERS, 1.0f, 1.0f)
            }
        }

        return item
    }
}
```

---

## 報酬配布システム

```kotlin
object VictoryEffectRewards {

    // Elo到達時
    fun onEloChanged(player: ServerPlayerEntity, oldElo: Int, newElo: Int) {
        val effects = VictoryEffects.ALL.filter { effect ->
            when (val condition = effect.unlockCondition) {
                is UnlockCondition.EloReached -> {
                    oldElo < condition.elo && newElo >= condition.elo
                }
                else -> false
            }
        }

        effects.forEach { effect ->
            grantEffect(player, effect)
        }
    }

    // シーズン優勝時
    fun onSeasonWin(player: ServerPlayerEntity, season: Int) {
        val effects = VictoryEffects.ALL.filter { effect ->
            when (val condition = effect.unlockCondition) {
                is UnlockCondition.SeasonWin -> condition.season == season
                else -> false
            }
        }

        effects.forEach { effect ->
            grantEffect(player, effect)
        }
    }

    // 連勝達成時
    fun onWinStreak(player: ServerPlayerEntity, winStreak: Int) {
        val effects = VictoryEffects.ALL.filter { effect ->
            when (val condition = effect.unlockCondition) {
                is UnlockCondition.WinStreak -> condition.wins == winStreak
                else -> false
            }
        }

        effects.forEach { effect ->
            grantEffect(player, effect)
        }
    }

    private fun grantEffect(player: ServerPlayerEntity, effect: VictoryEffect) {
        val effectData = VictoryEffectManager.getPlayerEffects(player.uuid)

        if (!effectData.hasEffect(effect.id)) {
            effectData.unlockEffect(effect.id)
            VictoryEffectManager.savePlayerEffects(player.uuid, effectData)

            // 通知
            player.sendMessage(
                textFromLang("victory_effect_unlocked",
                    "{effect}" to effect.displayName,
                    "{rarity}" to effect.rarity.displayName
                )
            )

            // 祝福エフェクト
            player.playSound(
                SoundEvents.UI_TOAST_CHALLENGE_COMPLETE,
                SoundCategory.PLAYERS,
                1.0f, 1.0f
            )
        }
    }
}
```

---

## Config設定

```json5
{
  "victory_effects": {
    "enabled": true,
    "default_enabled_for_new_players": true,
    "allow_preview_in_gui": true,
    "max_duration_ticks": 200
  }
}
```

---

## 言語ファイル

```json5
{
  "gui_victory_effect_title": "勝利エフェクト設定",
  "gui_victory_effect_enabled": "§a勝利エフェクト: 有効",
  "gui_victory_effect_disabled": "§7勝利エフェクト: 無効",
  "gui_victory_effect_toggle_hint": "§7クリックで切り替え",
  "victory_effect_unlocked": "§6新しい勝利エフェクトを獲得しました！\n§e{effect} §7({rarity})"
}
```

---

## 実装優先度

1. **Phase 1**: 基本システム（データ構造・保存）
2. **Phase 2**: デフォルトエフェクト3種類
3. **Phase 3**: GUI設定画面
4. **Phase 4**: 報酬配布システム
5. **Phase 5**: 追加エフェクト拡張

---

## 技術的考慮事項

### サーバーサイドのみで実現可能
- ✅ `ServerWorld.spawnParticles()` でクライアントに自動送信
- ✅ パーティクルはVanillaのものを使用（MOD不要）
- ✅ サウンドもVanillaのものを使用

### パフォーマンス
- 同時再生数を制限（最大10人まで）
- パーティクル数を調整可能
- tick間隔を設定可能（毎tick or 5tickごと）

### 拡張性
- 新しいエフェクトパターンを簡単に追加可能
- データパックでカスタムエフェクト定義可能（将来的に）

---

**実現性評価: ✅ サーバーサイドのみで完全実装可能**
**実装難易度: ⭐⭐⭐☆☆（中程度）**
**ユーザー満足度: ⭐⭐⭐⭐⭐（非常に高い）**
