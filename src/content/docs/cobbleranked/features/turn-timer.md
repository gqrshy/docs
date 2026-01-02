---
title: Turn Timer
description: No stalling. No waiting. Keep battles moving.
---

No stalling. No waiting. Keep battles moving.

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

---

**Related**: [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) | [Casual Battles](/docs/cobbleranked/features/casual-battles/) | [Main Configuration](/docs/cobbleranked/configuration/config/)
