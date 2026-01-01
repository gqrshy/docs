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

- **Green** (60–30s): Plenty of time
- **Yellow** (30–10s): Think faster
- **Red** (10–0s): Decide now

## Configuration

```json5
{
  "battle": {
    "turnTimer": {
      "enabled": true,
      "secondsPerTurn": 60,
      "showWarningAt": 10
    }
  }
}
```

### Recommended Settings

- **Competitive**: 45–60 seconds
- **Casual**: 90–120 seconds
- **Tournament**: 30–45 seconds

## Team & Lead Selection

Separate timers control the pre-battle phases:

```json5
{
  "battle": {
    "teamSelection": {
      "timeoutSeconds": 90
    },
    "leadSelection": {
      "timeoutSeconds": 30
    }
  }
}
```

## On Timeout

When the timer hits zero:

1. A random valid move is selected automatically
2. If no moves are available, Struggle is used
3. The turn proceeds without waiting

This applies to faint switches and turn-based switching too.

## Disabling Timers

For casual servers that prefer unlimited time:

```json5
{
  "battle": {
    "turnTimer": {
      "enabled": false
    }
  }
}
```

Not recommended for ranked battles — stalling becomes possible.

---

**Related**: [Ranked Battles](/features/ranked-battles/) | [Casual Battles](/features/casual-battles/)
