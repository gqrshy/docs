---
title: Sleep Clause
description: Competitive sleep rules for fair battles.
---

## What is Sleep Clause?

**Sleep Clause** is a competitive battling rule that prevents excessive sleep tactics. You cannot put a second Pokémon to sleep if one is already asleep on your team.

This prevents spamming sleep-inducing moves and keeps battles competitive and fair.

## How It Works

During a ranked battle with Sleep Clause enabled:

1. **First sleep**: Put a Pokémon to sleep normally
2. **Second sleep attempt**: Move is automatically cancelled
3. **No penalty**: the turn isn't spent. You can choose another move.

### Example

```
Turn 1: Your Hypno uses Hypnosis → Opponent's Pikachu falls asleep ✓
Turn 2: Your Hypno uses Hypnosis → Move cancelled (Pikachu already asleep) ✗
Turn 2: Your Hypno uses Psychic → Deals damage normally ✓
```

## Sleep-Inducing Moves

The following moves are affected by Sleep Clause:

- **Spore** - 100% accuracy, Grass-type
- **Hypnosis** - 60% accuracy, Psychic-type
- **Lovely Kiss** - 75% accuracy, Fairy-type
- **Grass Whistle** - 55% accuracy, Grass-type
- **Sing** - 55% accuracy, Normal-type
- **Sleep Powder** - 75% accuracy, Grass-type
- **Dark Void** - 50% accuracy (in singles), Dark-type
- **Relic Song** - Sleep effect, Normal-type

## Configuration

Sleep Clause is enabled by default for all ranked formats. Server owners can disable it per format in the season preset (`season_presets/*.yml`):

```yaml
# season_presets/default.yml
singles:
  sleepClause: true   # Enable (default)
  # ...

doubles:
  sleepClause: false  # Disable
  # ...
```

## Competitive Rationale

Sleep Clause exists for several reasons:

### 1. Prevents Sleep Spam

Without Sleep Clause, players could put multiple Pokémon to sleep, making battles unfun and one-sided.

### 2. Maintains Skill Expression

Skill should matter more than spamming sleep moves. Sleep Clause rewards strategic play.

### 3. Industry Standard

Major competitive Pokémon communities (Smogon, official tournaments) use Sleep Clause or similar rules.

## Team-Building Restriction

CobbleRanked also includes a **team-building** restriction:

> Teams can only have **one** sleep-inducing move total across all Pokémon.

This is separate from battle-time Sleep Clause and limits sleep move spam during team selection.

## Technical Details

For server owners and developers interested in the implementation:

- **Native Showdown rule**: Sleep Clause is enforced by applying Showdown's `Sleep Clause Mod` rule to the battle format on start (`CobblemonBattleAdapter`). This is the real, official behavior, not a reimplementation.
- **Localization**: `ShowdownClauseMessageMixin` localizes the clause's activation/hint messages into the player's language (otherwise they'd see Showdown's raw English protocol strings).
- **Team-time options** (`TeamValidator.kt`): `smogonSleepClause` bans all sleep-inducing moves entirely; `limitSleepMoves` allows only one sleep move per team.

> The old `MoveInstructionMixin`-based approach was removed. It cancelled the wrong instruction (the sleep is applied by `StatusInstruction`, not `MoveInstruction`), so it had no real effect. The native Showdown rule replaced it.

See the plugin source code for full implementation details.

---

**Related**: [Battle Formats](/docs/cobbleranked/features/battle-formats/) | [Blacklist Configuration](/docs/cobbleranked/configuration/blacklist/) | [FAQ](/docs/cobbleranked/support/faq/)
