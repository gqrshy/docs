# Turn Timer

Enforce time limits on battle turns to prevent stalling.

## Overview

Players have limited time to select a move each turn. If time runs out, a random legal move is chosen automatically.

**Display:**
- Green: > 20 seconds
- Yellow: 11-20 seconds
- Red: ≤ 10 seconds

## Configuration

**File:** `config/cobbleranked/config.json5`

### Basic Setup

```json5
"turnTimer": {
  "enabled": true,
  "defaultTimeSeconds": 30
}
```

### Format-Specific Timers

Different time limits per format:

```json5
"format_timers": {
  "SINGLES": {
    "turn_timeout_seconds": 90
  },
  "DOUBLES": {
    "turn_timeout_seconds": 120
  }
}
```

## Options

| Setting | Description | Default |
|---------|-------------|---------|
| `enabled` | Enable turn timer | `false` |
| `defaultTimeSeconds` | Default time limit | `30` |
| `turn_timeout_seconds` | Per-format override | Varies |

## Tips

- **Singles:** 60-90 seconds is standard
- **Doubles:** 90-120 seconds (more complex decisions)
- **Tournaments:** 60 seconds for faster matches
- **Casual:** 120+ seconds for new players

## Troubleshooting

**Timer not appearing:** Check `turnTimer.enabled` is `true`.

**Wrong time limit:** Format-specific settings override default.
