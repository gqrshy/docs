# Missions

Daily and weekly challenges with rewards.

---

## Overview

Missions are recurring challenges that give players goals beyond climbing the leaderboard. Complete missions to earn extra rewards.

---

## Mission Types

| Type | Description |
|------|-------------|
| `WIN_COUNT` | Win N ranked matches |
| `MATCH_COUNT` | Play N matches (win or lose) |
| `WIN_STREAK` | Achieve N consecutive wins |
| `FORMAT_PARTICIPATION` | Win in specific format |
| `POKEMON_TYPE_USAGE` | Win with specific Pokemon types |
| `POKEMON_DEFEATED` | Defeat N opponent Pokemon |

---

## Daily Missions

Reset every day at configured time:

```yaml
# missions.yaml
dailyResetTime: "00:00"
dailyResetTimezone: "UTC"
```

**Examples:**
- Win 1 match
- Win 3 matches
- Play 5 matches
- Win with Fire-type Pokemon
- Defeat 10 opponent Pokemon

---

## Weekly Missions

Reset once per week:

```yaml
# missions.yaml
weeklyResetDay: "MONDAY"
weeklyResetTime: "00:00"
weeklyResetTimezone: "UTC"
```

**Examples:**
- Win 10 matches
- Achieve 5 win streak
- Win in all formats
- Defeat 50 opponent Pokemon

---

## Viewing Missions

Missions are displayed in the ranked GUI:

1. Open `/ranked`
2. Click "Missions" button
3. View daily and weekly progress

---

## Claiming Rewards

### Manual Claim

When a mission is complete:
1. Open missions GUI
2. Click completed mission
3. Rewards are given

### Auto-Claim

Enable automatic claiming:

```yaml
# missions.yaml
autoClaim: true
```

Rewards given immediately on completion.

---

## Mission Progress

Progress tracked automatically:

- Win a match → WIN_COUNT +1
- Play any match → MATCH_COUNT +1
- Consecutive wins → WIN_STREAK updated
- Use Fire Pokemon → POKEMON_TYPE_USAGE +1

---

## Enabling Missions

Missions are disabled by default:

```yaml
# missions.yaml
enabled: true  # Enable mission system
```

---

## Configuration Examples

### Simple Daily Missions

```yaml
dailyMissions:
  - id: "daily_play_1"
    type: "MATCH_COUNT"
    targetValue: 1
    displayName: "Daily Player"
    description:
      - "Play 1 ranked match"
    rewards:
      - "give {player} cobblemon:poke_ball 3"

  - id: "daily_win_1"
    type: "WIN_COUNT"
    targetValue: 1
    displayName: "Daily Winner"
    description:
      - "Win 1 ranked match"
    rewards:
      - "give {player} minecraft:diamond 1"
```

### Type-Based Mission

```yaml
dailyMissions:
  - id: "daily_dragon"
    type: "POKEMON_TYPE_USAGE"
    targetValue: 1
    displayName: "Dragon Master"
    description:
      - "Win with a Dragon-type Pokemon"
    rewards:
      - "give {player} cobblemon:dragon_scale 1"
    parameters:
      pokemonTypes:
        - "DRAGON"
```

### Format-Based Mission

```yaml
dailyMissions:
  - id: "daily_doubles"
    type: "FORMAT_PARTICIPATION"
    targetValue: 2
    displayName: "Doubles Practice"
    description:
      - "Win 2 Doubles matches"
    rewards:
      - "give {player} minecraft:gold_ingot 5"
    parameters:
      format: "DOUBLES"
```

---

## See Also

- [Missions Configuration](../configuration/missions.md) - Full settings
- [Rewards](../configuration/rewards.md) - Other reward types
- [Ranked Battles](ranked-battles.md) - Battle flow
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
