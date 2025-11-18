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
| 1-5 | 5 minutes | ⚠️ Warning |
| 6-10 | 15 minutes | 🔶 Serious |
| 11+ | 30 minutes | 🔴 Severe |

---

## Configuration

`config/cobbleranked/config.json5`:

```json5
{
  "competitive": {
    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    }
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `flee_min` | Number | Minimum flee count for tier |
| `flee_max` | Number | Maximum flee count for tier |
| `penalty_minutes` | Number | Queue ban duration |

---

## Flee Decay

Automatically reduces flee count over time to forgive past disconnects.

```json5
{
  "flee_decay": {
    "enabled": true,
    "decay_rate": 1,              // Flee count reduced per interval
    "decay_interval_hours": 24    // Hours between reductions
  }
}
```

**Example:** Player with 10 flee count → 0 after 10 days (1 per day).

---

<details>
<summary><strong>Presets</strong></summary>

## Presets

### Lenient (Casual)
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 3, "penalty_minutes": 0 },
      { "flee_min": 4, "flee_max": 999, "penalty_minutes": 5 }
    ]
  },
  "flee_decay": {
    "decay_rate": 2,
    "decay_interval_hours": 12
  }
}
```

### Strict (Competitive)
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 2, "penalty_minutes": 10 },
      { "flee_min": 3, "flee_max": 5, "penalty_minutes": 30 },
      { "flee_min": 6, "flee_max": 999, "penalty_minutes": 60 }
    ]
  },
  "flee_decay": {
    "decay_rate": 1,
    "decay_interval_hours": 168  // Weekly
  }
}
```

</details>

---

## Admin Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin getflee <player> <format>` | Check player's flee count |
| `/rankedadmin resetflee <player> <format>` | Reset flee count to 0 |

---

**Related:** [Season Management](seasons.md) · [Battle Formats](battle-formats.md) · [Configuration](../configuration/config.md)
