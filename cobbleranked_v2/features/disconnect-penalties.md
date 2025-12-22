# Disconnect Penalties

Prevent abuse by penalizing players who disconnect during ranked battles.

---

## Overview

When a player disconnects during a ranked battle:
- **Flee count** increases by 1
- **Battle forfeit** - Opponent wins automatically
- **Elo penalty** - Loses Elo as if they lost normally
- **Queue ban** - Temporary ban based on flee count tier

---

## Penalty Tiers

| Flee Count | Queue Ban | Tier |
|------------|-----------|------|
| 1-5 | 5 minutes | Warning |
| 6-10 | 15 minutes | Serious |
| 11+ | 30 minutes | Severe |

---

## Configuration

Edit `config/cobbleranked/battle.yaml`:

```yaml
fleePenalty:
  tiers:
    - fleeMin: 1
      fleeMax: 5
      penaltyMinutes: 5
    - fleeMin: 6
      fleeMax: 10
      penaltyMinutes: 15
    - fleeMin: 11
      fleeMax: 999
      penaltyMinutes: 30
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `fleeMin` | Number | Minimum flee count for tier |
| `fleeMax` | Number | Maximum flee count for tier |
| `penaltyMinutes` | Number | Queue ban duration |

---

## Flee Decay

Automatically reduces flee count over time to forgive past disconnects.

```yaml
fleeDecay:
  enabled: true
  decayRate: 1              # Flee count reduced per interval
  decayIntervalHours: 24    # Hours between reductions
```

**Example:** Player with 10 flee count -> 0 after 10 days (1 per day).

---

## Configuration Presets

<details>
<summary><strong>Lenient (Casual Server)</strong></summary>

```yaml
fleePenalty:
  tiers:
    - fleeMin: 1
      fleeMax: 3
      penaltyMinutes: 0
    - fleeMin: 4
      fleeMax: 999
      penaltyMinutes: 5

fleeDecay:
  enabled: true
  decayRate: 2
  decayIntervalHours: 12
```

</details>

<details>
<summary><strong>Strict (Competitive Server)</strong></summary>

```yaml
fleePenalty:
  tiers:
    - fleeMin: 1
      fleeMax: 2
      penaltyMinutes: 10
    - fleeMin: 3
      fleeMax: 5
      penaltyMinutes: 30
    - fleeMin: 6
      fleeMax: 999
      penaltyMinutes: 60

fleeDecay:
  enabled: true
  decayRate: 1
  decayIntervalHours: 168  # Weekly
```

</details>

---

## Admin Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin getflee <player> <format>` | Check player's flee count |
| `/rankedadmin resetflee <player> <format>` | Reset flee count to 0 |

---

## See Also

- [Ranked Battles](ranked-battles.md) - Battle system overview
- [Battle Config](../configuration/battle.md) - Full battle settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
