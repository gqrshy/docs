# Dynamic Matchmaking

Automatically expands Elo range as players wait in queue for faster matches.

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

## Example Timeline

**Player with 1500 Elo:**

| Wait Time | Elo Range | Min | Max |
|-----------|-----------|-----|-----|
| 0-30s | ±200 | 1300 | 1700 |
| 60s | ±206 | 1294 | 1706 |
| 120s | ±218 | 1282 | 1718 |
| 300s | ±254 | 1246 | 1754 |
| 600s | ±314 | 1186 | 1814 |
| 2000s+ | ±600 (max) | 900 | 2100 |

---

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

---

## Troubleshooting

**Queue times too long?**
- Decrease `expansion_delay`
- Decrease `expansion_rate`
- Increase `initial_range`

**Matches too unbalanced?**
- Decrease `initial_range`
- Increase `expansion_delay`
- Decrease `max_multiplier`

**Expansion not working?**
- Check `enabled: true`
- Reload config: `/rankedadmin reload`

---

**Related:** [Elo System](elo-system.md) · [Battle Formats](battle-formats.md) · [Cross-Server](../advanced/cross-server.md)
