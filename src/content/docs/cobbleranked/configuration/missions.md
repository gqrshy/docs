---
title: Missions Configuration
description: Configure daily and weekly missions to keep players engaged.
---

Keep players coming back with daily and weekly challenges.

> 📝 Missions are **enabled by default** and track casual matches only.

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
announceCompletion: false
```

> **Note:** Timezone is now configured globally in `config.yaml`:
> ```yaml
> # config.yaml
> timezone: "Asia/Tokyo"  # IANA timezone format
> ```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable the mission system |
| `dailyResetTime` | `"00:00"` | Time to reset daily missions (HH:mm) |
| `weeklyResetDay` | `"MONDAY"` | Day to reset weekly missions |
| `weeklyResetTime` | `"00:00"` | Time to reset weekly missions (HH:mm) |
| `autoClaim` | `false` | Automatically claim rewards on completion |
| `announceCompletion` | `false` | Send chat message when mission completes |

---

## Trigger Types

Each trigger decides **when a casual match counts** toward the mission and which extra fields it needs.

| Trigger | Counts when | Required fields | Win required? |
|---------|-------------|-----------------|---------------|
| `WIN` | You win the match | `required` | ✅ Yes |
| `PLAY` | You finish a match | `required`, `requireWin` (optional) | Only if `requireWin: true` |
| `STREAK` | Your win streak extends | `required` | ✅ Yes (a loss resets the streak) |
| `USE_TYPE` | You win using a Pokémon whose type is in `types` | `types`, `required` | ✅ Yes |
| `FORMAT` | You win in the given `format` | `format`, `required` | ✅ Yes |
| `DEFEAT` | You KO opposing Pokémon (progress += KOs this match) | `minDefeated`, `required` | No (KOs count even in a loss) |
| `GENERATION` | You win using a Pokémon from one of `generations` | `generations`, `required` | ✅ Yes |
| `EVOLUTION` | You win using a Pokémon at the given `evolution` stage | `evolution`, `required` | ✅ Yes |

> 📝 Missions track **casual matches only**. The Pokémon considered are the ones you actually brought into battle, not your full party.

### Field Reference

| Field | Used by | Description |
|-------|---------|-------------|
| `required` | all | Progress target (e.g. `3` = complete after 3 qualifying matches) |
| `chance` | all | Weight for per-player random selection at reset (`0` = never picked) |
| `requireWin` | `PLAY` only | `true` = only wins count; `false` (default) = any finished match counts. Ignored by other triggers (they always require a win, except `DEFEAT`) |
| `types` | `USE_TYPE` | List of types, e.g. `[FIRE, WATER]`. Counts if any Pokémon you used has one of these types |
| `format` | `FORMAT` | Format name: `"SINGLES"`, `"DOUBLES"`, `"TRIPLES"` |
| `minDefeated` | `DEFEAT` | Per-match KO threshold. Each match where you KO ≥ this many Pokémon adds that KO count to progress |
| `generations` | `GENERATION` | List of gen numbers, e.g. `[1, 2]`. Derived from National Pokédex number |
| `evolution` | `EVOLUTION` | Evolution stage: `FIRST`, `MIDDLE`, `FINAL`, `SINGLE`, or `ANY` |

### Evolution Stages (`EVOLUTION`)

| Value | Meaning | Example |
|-------|---------|---------|
| `FIRST` | Base form — has an evolution, no pre-evolution | Charmander |
| `MIDDLE` | Middle form — has both a pre-evolution and an evolution | Charmeleon |
| `FINAL` | Final form — has a pre-evolution, no further evolution | Charizard |
| `SINGLE` | Does not evolve — no pre-evolution or evolution | Tauros |
| `ANY` | Any Pokémon (default when `evolution` is omitted) | — |

### Generation Ranges (`GENERATION`)

Generation is derived from the National Pokédex number:

| Generation | Pokédex range |
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

<details>
<summary><strong>Legacy Format</strong></summary>

**Old format still works; no migration needed.** New `daily`/`weekly` format takes priority if both exist.

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
  rewards:
    - "cobblemon give {player} exp_candy_l 2"
```

> `USE_TYPE` always requires a win — a match counts only if you **win** using a Pokémon whose type is in `types`. The `requireWin` field only affects the `PLAY` trigger.

### Generation Usage

```yaml
4:
  title: "Kanto Pride"
  trigger: GENERATION
  required: 5
  generations: [1]
  rewards:
    - "cobblemon give {player} rare_candy 2"
```

See [Generation Ranges](#generation-ranges-generation) above for the Pokédex range of each generation.

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
