# Dynamic Matchmaking

Intelligent matchmaking system that balances match quality with queue times.

---

## Features

- **Dynamic Elo Range** - Automatically expands Elo range as wait time increases
- **Recent Opponent Avoidance** - Prevents repeated matches against the same players
- **Immediate Match Threshold** - Instant matching for very close Elo ratings

---

## How It Works

1. **Player joins queue** → Start with narrow Elo range (±200)
2. **No match found** → Range expands gradually over time
3. **Match found** → Battle starts

**Formula:** `range = initial_range + (seconds_waited / expansion_rate)`

---

## Configuration

`config/cobbleranked/config.json5`:

```json5
{
  "matchmaking": {
    "enabled": true,
    "initial_range": 200,           // Starting Elo range (±200)
    "expansion_delay": 30,          // Wait 30s before expanding
    "expansion_rate": 5,            // +1 Elo per 5 seconds
    "max_multiplier": 3.0,          // Max ±600 (200 × 3.0)
    "immediate_match_range": 100   // Instant match if ±100
  }
}
```

### Fields

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable dynamic expansion |
| `initial_range` | `200` | Starting Elo range |
| `expansion_delay` | `30` | Seconds before expansion starts |
| `expansion_rate` | `5` | Seconds per +1 Elo expansion |
| `max_multiplier` | `3.0` | Maximum range multiplier |
| `immediate_match_range` | `100` | Instant match threshold |

---

<details>
<summary><strong>Example Timeline</strong></summary>

**Player with 1500 Elo:**

| Wait Time | Elo Range | Min | Max |
|-----------|-----------|-----|-----|
| 0-30s | ±200 | 1300 | 1700 |
| 60s | ±206 | 1294 | 1706 |
| 120s | ±218 | 1282 | 1718 |
| 300s | ±254 | 1246 | 1754 |
| 600s | ±314 | 1186 | 1814 |
| 2000s+ | ±600 (max) | 900 | 2100 |

</details>

---

<details>
<summary><strong>Presets</strong></summary>

## Presets

### Fast (Casual Server)
```json5
{
  "initial_range": 300,
  "expansion_delay": 15,
  "expansion_rate": 3,
  "max_multiplier": 4.0
}
```

### Balanced (Recommended)
```json5
{
  "initial_range": 200,
  "expansion_delay": 30,
  "expansion_rate": 5,
  "max_multiplier": 3.0
}
```

### Strict (Competitive)
```json5
{
  "initial_range": 100,
  "expansion_delay": 60,
  "expansion_rate": 10,
  "max_multiplier": 2.0
}
```

</details>

---

## Recent Opponent Avoidance

Prevents players from being matched against the same opponents repeatedly, ensuring variety in matchmaking.

### How It Works

1. **After a match** → Opponent added to "recent opponents" list
2. **Searching for match** → Recent opponents excluded from potential matches
3. **Time passes** → Opponents automatically removed from list

### Configuration

Add to `config/cobbleranked/config.json5`:

```json5
{
  "matchmaking": {
    // ... other settings ...

    "recent_opponent_avoidance": {
      "enabled": true,
      "max_tracked_opponents": 5,    // Avoid last N opponents
      "expiry_seconds": 600          // Reset after 10 minutes
    }
  }
}
```

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable recent opponent avoidance |
| `max_tracked_opponents` | `5` | Number of recent opponents to avoid |
| `expiry_seconds` | `600` | Time (seconds) before opponent can be matched again |

### Examples

<details>
<summary><strong>Configuration Presets</strong></summary>

**Strict Avoidance (Competitive)**
```json5
{
  "recent_opponent_avoidance": {
    "enabled": true,
    "max_tracked_opponents": 10,
    "expiry_seconds": 1800  // 30 minutes
  }
}
```

**Relaxed (Small Server)**
```json5
{
  "recent_opponent_avoidance": {
    "enabled": true,
    "max_tracked_opponents": 3,
    "expiry_seconds": 300  // 5 minutes
  }
}
```

**Disabled**
```json5
{
  "recent_opponent_avoidance": {
    "enabled": false
  }
}
```

</details>

### Notes

- Thread-safe implementation for concurrent queue processing
- Per-format tracking (Singles opponents don't affect Doubles matching)
- Works with cross-server matchmaking

---

## See Also

- [Elo System](elo-system.md) - Rating calculations
- [Battle Formats](battle-formats.md) - Available formats
- [Cross-Server](../advanced/cross-server.md) - Multi-server setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
