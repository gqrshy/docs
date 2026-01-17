---
title: Missions Configuration
description: Configure daily and weekly missions to keep players engaged.
---

Keep your players coming back with daily and weekly challenges. Complete missions to earn rewards and build streaks.

> **Note:** Missions are disabled by default. Enable them in `missions.yaml` to activate.

File: `config/cobbleranked/missions.yaml`

---

## Basic Configuration

```yaml
# missions.yaml
enabled: true
dailyResetTime: "00:00"
dailyResetTimezone: "UTC"
weeklyResetDay: "MONDAY"
weeklyResetTime: "00:00"
weeklyResetTimezone: "UTC"
autoClaim: false
announceCompletion: true
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable the mission system |
| `dailyResetTime` | `"00:00"` | Time to reset daily missions (HH:mm) |
| `dailyResetTimezone` | `"UTC"` | Timezone for daily reset |
| `weeklyResetDay` | `"MONDAY"` | Day to reset weekly missions |
| `weeklyResetTime` | `"00:00"` | Time to reset weekly missions |
| `weeklyResetTimezone` | `"UTC"` | Timezone for weekly reset |
| `autoClaim` | `false` | Automatically claim rewards on completion |
| `announceCompletion` | `true` | Notify players when missions complete |

---

## Mission Types

| Type | Description |
|------|-------------|
| `MATCH_COUNT` | Play a number of matches |
| `WIN_COUNT` | Win a number of matches |
| `WIN_STREAK` | Achieve a win streak |
| `POKEMON_TYPE_USAGE` | Use Pokemon of specific types |
| `GENERATION_USAGE` | Use Pokemon from specific generations |
| `EVOLUTION_STAGE` | Use Pokemon at specific evolution stages |
| `FORMAT_PARTICIPATION` | Play in a specific format |
| `POKEMON_DEFEATED` | Defeat a number of opponent Pokemon |

---

## Defining Missions

### Daily Missions

```yaml
dailyMissions:
  - id: "daily_play_3"
    displayName: "Daily Battles"
    description: "Play 3 ranked matches"
    type: MATCH_COUNT
    targetValue: 3
    rewards:
      - "cobblemon give {player} exp_candy_m 3"

  - id: "daily_win_2"
    displayName: "Daily Wins"
    description: "Win 2 ranked matches"
    type: WIN_COUNT
    targetValue: 2
    rewards:
      - "cobblemon give {player} rare_candy 1"
```

### Weekly Missions

```yaml
weeklyMissions:
  - id: "weekly_wins"
    displayName: "Weekly Champion"
    description: "Win 10 ranked matches this week"
    type: WIN_COUNT
    targetValue: 10
    rewards:
      - "cobblemon give {player} exp_candy_l 5"
      - "cobblemon give {player} rare_candy 3"

  - id: "weekly_streak"
    displayName: "Hot Streak"
    description: "Achieve a 5-win streak"
    type: WIN_STREAK
    targetValue: 5
    rewards:
      - "cobblemon give {player} master_ball 1"
```

---

## Mission Parameters

Some mission types require additional parameters.

### Type Usage (requireWin)

Use `requireWin: true` to require winning with the specified type, not just using it:

```yaml
- id: "fire_master"
  displayName: "Fire Master"
  description: "Win 3 matches using Fire-type Pokemon"
  type: POKEMON_TYPE_USAGE
  targetValue: 3
  parameters:
    pokemonTypes:
      - "fire"
    requireWin: true  # Must WIN with Fire-type, not just use
  rewards:
    - "cobblemon give {player} exp_candy_l 2"
```

> **Important:** Without `requireWin: true`, the mission counts any match where you used the type, regardless of outcome.

### Generation Usage

```yaml
- id: "gen1_nostalgia"
  displayName: "Kanto Pride"
  description: "Win with Gen 1 Pokemon"
  type: GENERATION_USAGE
  targetValue: 5
  parameters:
    generations:
      - 1
    requireWin: true
  rewards:
    - "cobblemon give {player} rare_candy 2"
```

| Generation | Pokedex Range |
|------------|---------------|
| 1 | #1-151 |
| 2 | #152-251 |
| 3 | #252-386 |
| 4 | #387-493 |
| 5 | #494-649 |
| 6 | #650-721 |
| 7 | #722-809 |
| 8 | #810-905 |
| 9 | #906-1025 |

### Evolution Stage

```yaml
- id: "unevolved_challenge"
  displayName: "Little Cup Style"
  description: "Win using first-stage Pokemon"
  type: EVOLUTION_STAGE
  targetValue: 3
  parameters:
    evolutionStage: "FIRST"  # FIRST, MIDDLE, FINAL, or SINGLE
    requireWin: true
  rewards:
    - "cobblemon give {player} exp_candy_m 5"
```

| Stage | Description |
|-------|-------------|
| `FIRST` | Has evolutions, no pre-evolution (e.g., Bulbasaur) |
| `MIDDLE` | Has both pre-evolution and evolutions (e.g., Ivysaur) |
| `FINAL` | Has pre-evolution, no further evolutions (e.g., Venusaur) |
| `SINGLE` | No evolution line (e.g., Tauros) |

### Format Participation

```yaml
- id: "doubles_specialist"
  displayName: "Doubles Specialist"
  description: "Play 5 doubles matches"
  type: FORMAT_PARTICIPATION
  targetValue: 5
  parameters:
    format: "doubles"
  rewards:
    - "cobblemon give {player} exp_candy_m 3"
```

### Pokemon Defeated

```yaml
- id: "knockout_artist"
  displayName: "Knockout Artist"
  description: "Defeat 20 opponent Pokemon"
  type: POKEMON_DEFEATED
  targetValue: 20
  parameters:
    minDefeated: 1  # Minimum per match to count
  rewards:
    - "cobblemon give {player} rare_candy 2"
```

---

## Reward Commands

Rewards are executed as server commands when claimed. Use `{player}` placeholder for the player name.

```yaml
rewards:
  - "cobblemon give {player} rare_candy 5"
  - "eco give {player} 1000"
  - "lp user {player} permission set some.permission true"
```

---

## Complete Example

```yaml
# missions.yaml
enabled: true
dailyResetTime: "00:00"
dailyResetTimezone: "Asia/Tokyo"
weeklyResetDay: "MONDAY"
weeklyResetTime: "00:00"
weeklyResetTimezone: "Asia/Tokyo"
autoClaim: false
announceCompletion: true

dailyMissions:
  - id: "daily_play"
    displayName: "Daily Battles"
    description: "Play 3 ranked matches"
    type: MATCH_COUNT
    targetValue: 3
    rewards:
      - "cobblemon give {player} exp_candy_s 5"

  - id: "daily_win"
    displayName: "Daily Victor"
    description: "Win 2 ranked matches"
    type: WIN_COUNT
    targetValue: 2
    rewards:
      - "cobblemon give {player} rare_candy 1"

  - id: "daily_fire"
    displayName: "Flame On"
    description: "Win with a Fire-type Pokemon"
    type: POKEMON_TYPE_USAGE
    targetValue: 1
    parameters:
      pokemonTypes:
        - "fire"
      requireWin: true
    rewards:
      - "cobblemon give {player} exp_candy_m 2"

weeklyMissions:
  - id: "weekly_wins"
    displayName: "Weekly Champion"
    description: "Win 15 ranked matches"
    type: WIN_COUNT
    targetValue: 15
    rewards:
      - "cobblemon give {player} exp_candy_l 10"
      - "cobblemon give {player} rare_candy 5"

  - id: "weekly_streak"
    displayName: "Unstoppable"
    description: "Achieve a 5-win streak"
    type: WIN_STREAK
    targetValue: 5
    rewards:
      - "cobblemon give {player} master_ball 1"
```

---

## See Also

- [Rewards Configuration](rewards.md) - Season rewards and milestones
- [Main Configuration](config.md) - General settings
- [FAQ](../support/faq/) - Common questions and troubleshooting
