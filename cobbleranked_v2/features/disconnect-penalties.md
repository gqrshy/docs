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

Default penalty configuration:

| Flee Count | Queue Ban | Tier |
|------------|-----------|------|
| 1-5 | 5 minutes | Warning |
| 6-10 | 15 minutes | Serious |
| 11+ | 30 minutes | Severe |

---

## Configuration

Edit `config/cobbleranked/battle.yaml`:

```yaml
competitive:
  fleePenalty:
    enabled: true
    tiers:
      - minFlees: 1
        maxFlees: 5
        penaltyMinutes: 5
      - minFlees: 6
        maxFlees: 10
        penaltyMinutes: 15
      - minFlees: 11
        maxFlees: 999
        penaltyMinutes: 30

  fleeDecay:
    enabled: true
    decayRate: 1
    decayIntervalHours: 24

  pendingMatchTimeoutMinutes: 5
```

### Flee Penalty Fields

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable flee penalty system |
| `minFlees` | - | Minimum flee count for tier |
| `maxFlees` | - | Maximum flee count for tier |
| `penaltyMinutes` | - | Queue ban duration in minutes |

---

## Flee Decay

Automatically reduces flee count over time to forgive past disconnects.

```yaml
fleeDecay:
  enabled: true
  decayRate: 1              # Flee count reduced per interval
  decayIntervalHours: 24    # Hours between reductions
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable flee decay |
| `decayRate` | `1` | Flee count reduction per interval |
| `decayIntervalHours` | `24` | Hours between decay cycles |

**Example:** Player with 10 flee count → 0 after 10 days (1 per day).

---

## Configuration Examples

<details>
<summary><strong>Lenient (Casual Server)</strong></summary>

```yaml
competitive:
  fleePenalty:
    enabled: true
    tiers:
      - minFlees: 1
        maxFlees: 3
        penaltyMinutes: 0
      - minFlees: 4
        maxFlees: 999
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
competitive:
  fleePenalty:
    enabled: true
    tiers:
      - minFlees: 1
        maxFlees: 2
        penaltyMinutes: 10
      - minFlees: 3
        maxFlees: 5
        penaltyMinutes: 30
      - minFlees: 6
        maxFlees: 999
        penaltyMinutes: 60

  fleeDecay:
    enabled: true
    decayRate: 1
    decayIntervalHours: 168  # Weekly
```

</details>

<details>
<summary><strong>Disabled</strong></summary>

```yaml
competitive:
  fleePenalty:
    enabled: false
```

</details>

---

## Pending Match Timeout

If a player accepts a match but doesn't arrive at the arena:

```yaml
competitive:
  pendingMatchTimeoutMinutes: 5
```

After the timeout, the match is cancelled and the missing player receives a flee count.

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
