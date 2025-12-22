# Turn Timer

Enforce time limits on battle turns to prevent stalling.

---

## Overview

Players have limited time to select a move each turn. If time runs out, a random legal move is chosen automatically.

**Timer Feedback:**

- Sound effects at 30% and 20% remaining time
- Visual display with remaining seconds

---

## Configuration

Edit `config/cobbleranked/battle.yaml`:

### Timer Settings

```yaml
timers:
  teamSelectionSeconds: 60    # Time to select team
  leadSelectionSeconds: 30    # Time to select lead Pokemon
  matchReadySeconds: 17       # Time to accept match
  countdownSeconds: 5         # Pre-battle countdown
  battleMinutes: 15           # Maximum battle duration
  battleTimeWarningSeconds:   # Warning sound triggers
    - 300
    - 60
    - 30
```

| Field | Default | Description |
|-------|---------|-------------|
| `teamSelectionSeconds` | `60` | Time to select battle team |
| `leadSelectionSeconds` | `30` | Time to select lead Pokemon |
| `matchReadySeconds` | `17` | Time to click Ready button |
| `countdownSeconds` | `5` | Countdown before battle starts |
| `battleMinutes` | `15` | Maximum battle duration |
| `battleTimeWarningSeconds` | `[300, 60, 30]` | Warning sound triggers |

---

## Format-Specific Turn Timers

Each format can have different turn time limits:

```yaml
formats:
  SINGLES:
    turnTimeoutSeconds: 90

  DOUBLES:
    turnTimeoutSeconds: 120

  TRIPLES:
    turnTimeoutSeconds: 150
```

| Format | Default | Notes |
|--------|---------|-------|
| SINGLES | 90s | Standard time |
| DOUBLES | 120s | More decisions required |
| TRIPLES | 150s | Complex positioning |

---

## Timer Sounds

Sound effects for timer warnings:

```yaml
sounds:
  enabled: true
  battle:
    turnTimer30Percent:
      sound: "minecraft:block.note_block.harp"
      volume: 2.0
      pitch: 1.5
    turnTimer20Percent:
      sound: "minecraft:block.note_block.pling"
      volume: 3.0
      pitch: 2.0
    battleTime60s:
      sound: "minecraft:block.note_block.bell"
      volume: 2.0
      pitch: 1.0
    battleTime30s:
      sound: "minecraft:block.anvil.land"
      volume: 1.0
      pitch: 1.2
    battleTime10s:
      sound: "minecraft:block.note_block.pling"
      volume: 3.0
      pitch: 2.0
```

---

## Recommended Settings

| Server Type | Turn Timer | Battle Duration | Notes |
|-------------|------------|-----------------|-------|
| **Competitive** | 60-90s | 15 min | Standard for serious play |
| **Doubles/Triples** | 90-150s | 20 min | More complex decisions |
| **Tournament** | 60s | 10 min | Faster matches |
| **Casual** | 120s+ | 20 min | Friendly for new players |

---

## Configuration Examples

<details>
<summary><strong>Competitive Server</strong></summary>

```yaml
timers:
  teamSelectionSeconds: 45
  leadSelectionSeconds: 20
  matchReadySeconds: 15
  countdownSeconds: 3
  battleMinutes: 10
  battleTimeWarningSeconds:
    - 180
    - 60
    - 30

formats:
  SINGLES:
    turnTimeoutSeconds: 60
  DOUBLES:
    turnTimeoutSeconds: 90
```

</details>

<details>
<summary><strong>Casual Server</strong></summary>

```yaml
timers:
  teamSelectionSeconds: 90
  leadSelectionSeconds: 45
  matchReadySeconds: 30
  countdownSeconds: 5
  battleMinutes: 20
  battleTimeWarningSeconds:
    - 300
    - 60

formats:
  SINGLES:
    turnTimeoutSeconds: 120
  DOUBLES:
    turnTimeoutSeconds: 150
```

</details>

---

## See Also

- [Battle Formats](battle-formats.md) - Format configuration
- [Battle Config](../configuration/battle.md) - Full settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
