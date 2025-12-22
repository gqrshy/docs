# Turn Timer

Enforce time limits on battle turns to prevent stalling.

---

## Overview

Players have limited time to select a move each turn. If time runs out, a random legal move is chosen automatically.

**Display Colors:**
- Green: > 20 seconds
- Yellow: 11-20 seconds
- Red: ≤ 10 seconds

---

## Configuration

Edit `config/cobbleranked/battle.yaml`:

### Basic Setup

```yaml
turnTimer:
  enabled: true
  defaultTimeSeconds: 30
```

### Format-Specific Timers

Different time limits per format:

```yaml
formats:
  SINGLES:
    turnTimeoutSeconds: 90
  DOUBLES:
    turnTimeoutSeconds: 120
  TRIPLES:
    turnTimeoutSeconds: 150
```

---

## Options

| Setting | Description | Default |
|---------|-------------|---------|
| `enabled` | Enable turn timer | `false` |
| `defaultTimeSeconds` | Default time limit | `30` |
| `turnTimeoutSeconds` | Per-format override | Varies |

---

## Recommended Settings

| Server Type | Recommended Time | Notes |
|-------------|------------------|-------|
| **Competitive** | 60-90 seconds | Standard for serious play |
| **Doubles/Triples** | 90-120 seconds | More complex decisions |
| **Tournament** | 60 seconds | Faster matches |
| **Casual** | 120+ seconds | Friendly for new players |

---

## Full Example

```yaml
turnTimer:
  enabled: true
  defaultTimeSeconds: 90

formats:
  SINGLES:
    turnTimeoutSeconds: 90
  DOUBLES:
    turnTimeoutSeconds: 120
  TRIPLES:
    turnTimeoutSeconds: 150
  MULTI:
    turnTimeoutSeconds: 120
```

---

## See Also

- [Battle Formats](battle-formats.md) - Available formats
- [Battle Config](../configuration/battle.md) - Full settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
