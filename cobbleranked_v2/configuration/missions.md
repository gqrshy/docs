# Missions Configuration

Complete reference for `config/cobbleranked/missions.yaml`.

---

## Overview

Missions are daily and weekly challenges that reward players for specific achievements.

---

## Basic Settings

```yaml
enabled: false                  # Enable mission system

dailyResetTime: "00:00"        # Daily reset time (HH:mm)
dailyResetTimezone: "UTC"

weeklyResetDay: "MONDAY"       # Day for weekly reset
weeklyResetTime: "00:00"
weeklyResetTimezone: "UTC"

autoClaim: false               # Auto-claim completed missions
announceCompletion: false      # Announce in chat when completed
```

### Reset Settings

| Setting | Description |
|---------|-------------|
| `dailyResetTime` | Time when daily missions reset (24-hour format) |
| `dailyResetTimezone` | Timezone for reset time |
| `weeklyResetDay` | Day of week for weekly reset |
| `weeklyResetTime` | Time when weekly missions reset |

---

## Mission Types

| Type | Description | Parameters |
|------|-------------|------------|
| `WIN_COUNT` | Win N ranked matches | - |
| `MATCH_COUNT` | Play N matches (win or lose) | - |
| `WIN_STREAK` | Achieve N win streak | - |
| `FORMAT_PARTICIPATION` | Win in specific format | `format` |
| `POKEMON_TYPE_USAGE` | Win with specific Pokemon types | `pokemonTypes` |
| `POKEMON_DEFEATED` | Defeat N opponent Pokemon | `minDefeated` |

---

## Daily Missions

```yaml
dailyMissions:
  - id: "daily_win_1"
    type: "WIN_COUNT"
    targetValue: 1
    displayName: "Win 1 Ranked Match"
    description:
      - "Win 1 ranked match today"
    rewards:
      - "give {player} minecraft:diamond 1"
    parameters: {}

  - id: "daily_win_3"
    type: "WIN_COUNT"
    targetValue: 3
    displayName: "Win 3 Ranked Matches"
    description:
      - "Win 3 ranked matches today"
    rewards:
      - "give {player} minecraft:diamond 3"

  - id: "daily_match_3"
    type: "MATCH_COUNT"
    targetValue: 3
    displayName: "Play 3 Matches"
    description:
      - "Play 3 ranked matches"
    rewards:
      - "give {player} cobblemon:poke_ball 5"

  - id: "daily_singles"
    type: "FORMAT_PARTICIPATION"
    targetValue: 1
    displayName: "Win a Singles Match"
    description:
      - "Win a match in Singles format"
    rewards:
      - "give {player} minecraft:gold_ingot 2"
    parameters:
      format: "SINGLES"

  - id: "daily_fire_type"
    type: "POKEMON_TYPE_USAGE"
    targetValue: 1
    displayName: "Win with Fire-type"
    description:
      - "Win with a Fire-type Pokemon"
    rewards:
      - "give {player} minecraft:blaze_rod 3"
    parameters:
      pokemonTypes:
        - "FIRE"

  - id: "daily_defeat_5"
    type: "POKEMON_DEFEATED"
    targetValue: 5
    displayName: "Defeat 5 Pokemon"
    description:
      - "Defeat 5 opposing Pokemon"
    rewards:
      - "give {player} cobblemon:rare_candy 1"
    parameters:
      minDefeated: 5
```

---

## Weekly Missions

```yaml
weeklyMissions:
  - id: "weekly_win_10"
    type: "WIN_COUNT"
    targetValue: 10
    displayName: "Win 10 Ranked Matches"
    description:
      - "Win 10 ranked matches this week"
    rewards:
      - "give {player} minecraft:diamond_block 1"

  - id: "weekly_streak_5"
    type: "WIN_STREAK"
    targetValue: 5
    displayName: "Achieve 5 Win Streak"
    description:
      - "Achieve a 5 win streak"
    rewards:
      - "give {player} cobblemon:master_ball 1"

  - id: "weekly_doubles_5"
    type: "FORMAT_PARTICIPATION"
    targetValue: 5
    displayName: "Win 5 Doubles Matches"
    description:
      - "Win 5 matches in Doubles"
    rewards:
      - "give {player} minecraft:diamond 5"
    parameters:
      format: "DOUBLES"
```

---

## Mission Properties

| Property | Required | Description |
|----------|----------|-------------|
| `id` | ✅ | Unique identifier |
| `type` | ✅ | Mission type (see above) |
| `targetValue` | ✅ | Goal amount |
| `displayName` | ✅ | Name shown in GUI |
| `description` | ✅ | Description lines |
| `rewards` | ✅ | Commands to run on completion |
| `parameters` | ❌ | Type-specific parameters |

---

## Type Parameters

### FORMAT_PARTICIPATION

```yaml
parameters:
  format: "SINGLES"  # SINGLES, DOUBLES, or TRIPLES
```

### POKEMON_TYPE_USAGE

```yaml
parameters:
  pokemonTypes:
    - "FIRE"
    - "WATER"  # Multiple types = any of these
```

### POKEMON_DEFEATED

```yaml
parameters:
  minDefeated: 5  # Minimum Pokemon to defeat per match
```

---

## Configuration Examples

<details>
<summary><strong>Simple Daily Missions</strong></summary>

```yaml
enabled: true

dailyResetTime: "00:00"
dailyResetTimezone: "UTC"

dailyMissions:
  - id: "play_1"
    type: "MATCH_COUNT"
    targetValue: 1
    displayName: "Daily Player"
    description:
      - "Play 1 ranked match"
    rewards:
      - "give {player} cobblemon:poke_ball 3"

  - id: "win_1"
    type: "WIN_COUNT"
    targetValue: 1
    displayName: "Daily Winner"
    description:
      - "Win 1 ranked match"
    rewards:
      - "give {player} minecraft:iron_ingot 3"
```

</details>

<details>
<summary><strong>Competitive Missions</strong></summary>

```yaml
enabled: true

dailyResetTime: "00:00"
dailyResetTimezone: "UTC"
weeklyResetDay: "MONDAY"

dailyMissions:
  - id: "daily_win_5"
    type: "WIN_COUNT"
    targetValue: 5
    displayName: "Daily Grind"
    description:
      - "Win 5 ranked matches"
    rewards:
      - "give {player} minecraft:diamond 2"

  - id: "daily_streak_3"
    type: "WIN_STREAK"
    targetValue: 3
    displayName: "Hot Streak"
    description:
      - "Achieve a 3 win streak"
    rewards:
      - "give {player} cobblemon:rare_candy 1"

weeklyMissions:
  - id: "weekly_win_25"
    type: "WIN_COUNT"
    targetValue: 25
    displayName: "Weekly Warrior"
    description:
      - "Win 25 ranked matches"
    rewards:
      - "give {player} cobblemon:master_ball 1"
      - "give {player} minecraft:diamond_block 2"

  - id: "weekly_all_formats"
    type: "FORMAT_PARTICIPATION"
    targetValue: 3
    displayName: "Format Explorer"
    description:
      - "Win 3 matches in each format"
    rewards:
      - "give {player} minecraft:netherite_ingot 1"
    parameters:
      format: "SINGLES"
```

</details>

---

## Full Example

<details>
<summary><strong>Complete missions.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Missions Configuration

enabled: true

dailyResetTime: "00:00"
dailyResetTimezone: "UTC"

weeklyResetDay: "MONDAY"
weeklyResetTime: "00:00"
weeklyResetTimezone: "UTC"

autoClaim: false
announceCompletion: false

dailyMissions:
  - id: "daily_win_1"
    type: "WIN_COUNT"
    targetValue: 1
    displayName: "Win 1 Ranked Match"
    description:
      - "Win 1 ranked match today"
    rewards:
      - "give {player} minecraft:diamond 1"

  - id: "daily_win_3"
    type: "WIN_COUNT"
    targetValue: 3
    displayName: "Win 3 Ranked Matches"
    description:
      - "Win 3 ranked matches today"
    rewards:
      - "give {player} minecraft:diamond 3"

  - id: "daily_match_3"
    type: "MATCH_COUNT"
    targetValue: 3
    displayName: "Play 3 Matches"
    description:
      - "Play 3 ranked matches"
    rewards:
      - "give {player} cobblemon:poke_ball 5"

  - id: "daily_fire_type"
    type: "POKEMON_TYPE_USAGE"
    targetValue: 1
    displayName: "Win with Fire-type"
    description:
      - "Win with a Fire-type Pokemon"
    rewards:
      - "give {player} minecraft:blaze_rod 3"
    parameters:
      pokemonTypes:
        - "FIRE"

weeklyMissions:
  - id: "weekly_win_10"
    type: "WIN_COUNT"
    targetValue: 10
    displayName: "Win 10 Ranked Matches"
    description:
      - "Win 10 ranked matches this week"
    rewards:
      - "give {player} minecraft:diamond_block 1"

  - id: "weekly_streak_5"
    type: "WIN_STREAK"
    targetValue: 5
    displayName: "Achieve 5 Win Streak"
    description:
      - "Achieve a 5 win streak"
    rewards:
      - "give {player} cobblemon:master_ball 1"
```

</details>

---

## See Also

- [Rewards](rewards.md) - Other reward types
- [Battle Config](battle.md) - Format settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
