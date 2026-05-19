---
title: Missions Configuration
description: Configure daily and weekly missions to keep players engaged.
---

Keep players coming back with daily and weekly challenges.

> 📝 Missions are disabled by default. Enable them in `missions.yaml`.

File: `config/cobbleranked/missions.yaml`

---

## Basic Configuration

```yaml
# missions.yaml
enabled: true
dailyResetTime: "00:00"
weeklyResetDay: "MONDAY"
weeklyResetTime: "00:00"
autoClaim: false
announceCompletion: true
```

> **Note:** Timezone is now configured globally in `config.yaml`:
> ```yaml
> # config.yaml
> timezone: "Asia/Tokyo"  # IANA timezone format
> ```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable the mission system |
| `dailyResetTime` | `"00:00"` | Time to reset daily missions (HH:mm) |
| `weeklyResetDay` | `"MONDAY"` | Day to reset weekly missions |
| `weeklyResetTime` | `"00:00"` | Time to reset weekly missions (HH:mm) |
| `autoClaim` | `false` | Automatically claim rewards on completion |
| `announceCompletion` | `false` | Send chat message when mission completes |

---

## Trigger Types

Use simple trigger names instead of enum values. Server admins can edit missions without knowing Kotlin internals.

| Trigger | Description | Internal Enum |
|---------|-------------|---------------|
| `WIN` | Win matches | `WIN_COUNT` |
| `PLAY` | Play matches (win or lose) | `MATCH_COUNT` |
| `STREAK` | Achieve a win streak | `WIN_STREAK` |
| `USE_TYPE` | Use Pokemon of specific types | `POKEMON_TYPE_USAGE` |
| `GENERATION` | Use Pokemon from specific generations | `GENERATION_USAGE` |
| `EVOLUTION` | Use Pokemon at specific evolution stages | `EVOLUTION_STAGE` |
| `FORMAT` | Play in a specific format | `FORMAT_PARTICIPATION` |
| `DEFEAT` | Defeat opponent Pokemon | `POKEMON_DEFEATED` |

<details>
<summary><strong>Legacy Format</strong></summary>

**Old format still works** — no migration needed. New `daily`/`weekly` format takes priority if both exist.

```yaml
# Old format (still works)
dailyMissions:
  - type: WIN_COUNT
    required: 3
    rewards: ["give {player} diamond 1"]

# New format (recommended)
daily:
  1:
    title: "Win 3 Matches"
    trigger: WIN
    required: 3
    rewards:
      - "give {player} diamond 1"
```

</details>

---

## Defining Missions

Missions use numbered keys under `daily:` or `weekly:`:

### Daily Missions

```yaml
daily:
  1:
    title: "Daily Battles"
    trigger: PLAY
    required: 3
    rewards:
      - "cobblemon give {player} exp_candy_m 3"

  2:
    title: "Daily Wins"
    trigger: WIN
    required: 2
    rewards:
      - "cobblemon give {player} rare_candy 1"
```

### Weekly Missions

```yaml
weekly:
  1:
    title: "Weekly Champion"
    trigger: WIN
    required: 10
    rewards:
      - "cobblemon give {player} exp_candy_l 5"
      - "cobblemon give {player} rare_candy 3"
```

---

## Mission Parameters

Some triggers accept additional fields:

### Type Usage

```yaml
3:
  title: "Fire Master"
  trigger: USE_TYPE
  required: 3
  types: ["FIRE"]
  requireWin: true     # Must WIN with Fire-type
  rewards:
    - "cobblemon give {player} exp_candy_l 2"
```

### Generation Usage

```yaml
4:
  title: "Kanto Pride"
  trigger: GENERATION
  required: 5
  generations: [1]
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

### Format Participation

```yaml
5:
  title: "Doubles Specialist"
  trigger: FORMAT
  required: 5
  format: "doubles"
  rewards:
    - "cobblemon give {player} exp_candy_m 3"
```

### Pokemon Defeated

```yaml
6:
  title: "Knockout Artist"
  trigger: DEFEAT
  required: 20
  rewards:
    - "cobblemon give {player} rare_candy 2"
```

---

## Reward Commands

Rewards are server commands. Use `{player}` placeholder for the player name.

```yaml
rewards:
  - "cobblemon give {player} rare_candy 5"
  - "eco give {player} 1000"
```

---

## See Also

- [Rewards Configuration](/docs/cobbleranked/configuration/rewards/) - Season rewards and milestones
- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
