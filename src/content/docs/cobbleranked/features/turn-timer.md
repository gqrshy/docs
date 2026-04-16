---
title: Turn Timer
description: No stalling. No waiting. Keep battles moving.
---

## Why Turn Timers?

Nothing kills competitive momentum like a player who takes forever to move. Turn timers ensure every battle flows smoothly with fair time limits for decisions.

## How It Works

1. Each turn starts with full time
2. Timer counts down during move selection
3. Warning appears when time is low
4. If time runs out, a random move is auto-selected

Players see a boss bar countdown that changes color as time runs low. Audio warnings play near timeout.

## Timer Colors

- **Green**: Plenty of time
- **Yellow** (30%): Think faster
- **Red** (20%): Decide now

## Default Timer Values

| Format | Turn Timer | Team Selection | Lead Selection |
|--------|------------|----------------|----------------|
| Singles | 90s | 60s | 30s |
| Doubles | 120s | 60s | 30s |
| Triples | 150s | 60s | 30s |

## Configuration

Configure timers per format in `battle.yaml`:

```yaml
# battle.yaml
formats:
  SINGLES:
    turnTimeoutSeconds: 90

  DOUBLES:
    turnTimeoutSeconds: 120

  TRIPLES:
    turnTimeoutSeconds: 150

timers:
  teamSelectionSeconds: 60
  leadSelectionSeconds: 30
  matchReadySeconds: 17
  countdownSeconds: 5
  battleMinutes: 15
  battleTimeWarningSeconds:
    - 300
    - 60
    - 30
```

## On Timeout

When the timer hits zero:

1. A random valid move is selected automatically
2. If no moves are available, Struggle is used
3. The turn proceeds without waiting

This applies to faint switches and turn-based switching too.

## Timer Sounds

Audio cues help players track time:

```yaml
# battle.yaml
sounds:
  battle:
    turnTimer30Percent:
      sound: "minecraft:block.note_block.harp"
      volume: 2.0
      pitch: 1.5
    turnTimer20Percent:
      sound: "minecraft:block.note_block.pling"
      volume: 3.0
      pitch: 2.0
```

## Showdown/Chess Timer

An alternative timer system where each player has their own cumulative clock, like chess. Time is tracked per-player instead of per-turn.

**How it works:**
1. Each player starts with a total time bank (e.g., 10 minutes)
2. When it's your turn, your clock ticks down
3. When your turn ends, an optional **increment** is added to your remaining time
4. If your total time runs out, you lose (or the match is decided by tie-break)

### Configuration

Configure in season presets (`config/cobbleranked/season_presets/*.yml`):

```yaml
# season_presets/default.yml
singles:
  enabled: true
  # ... other format settings ...

  # Per-player showdown timer (0 = disabled, use traditional match timer)
  playerBattleDurationMinutes: 10
  incrementSeconds: 5

  # What happens when a player runs out of time
  tieBreakSystem: HEALTH
```

| Setting | Default | Description |
|---------|---------|-------------|
| `playerBattleDurationMinutes` | `0` | Per-player total time in minutes. **0 = disabled** (uses traditional match timer) |
| `incrementSeconds` | `0` | Seconds added to remaining time after each turn |
| `tieBreakSystem` | `HEALTH` | How to decide the winner on time-out |

### Tie-Break Systems

| System | Behavior |
|--------|----------|
| `HEALTH` | Compare remaining HP percentage — player with more HP wins |
| `TIME` | The player who ran out of time loses |

<details>
<summary><strong>Showdown Timer Example</strong></summary>

With `playerBattleDurationMinutes: 10` and `incrementSeconds: 5`:

1. Both players start with 10:00 each
2. Player A takes a turn (takes 20 seconds) → remaining: 9:45 (9:40 + 5s increment)
3. Player B takes a turn (takes 30 seconds) → remaining: 9:35 (9:30 + 5s increment)
4. If Player A's clock hits 0:00 → Player B wins (or HP-based tie-break)

This encourages fast play and rewards time management.

</details>

---

**Related**: [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) | [Casual Battles](/docs/cobbleranked/features/casual-battles/) | [Main Configuration](/docs/cobbleranked/configuration/config/)
