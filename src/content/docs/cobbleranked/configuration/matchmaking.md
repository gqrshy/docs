---
title: Matchmaking Configuration
description: Configure how players are matched together.
---

Matchmaking is split into two locations:
- **Global settings** (`matchmaking.yaml`) - Recent opponent avoidance
- **Per-format settings** (`season_presets/*.yml`) - ELO range rules per format

## Recent Opponent Avoidance (Global)

Prevent the same players from battling repeatedly. This applies to all formats:

```yaml
# matchmaking.yaml
recentOpponentAvoidance:
  enabled: true
  avoidCount: 3
  expirationSeconds: 300
  relaxAfterSeconds: 120
  minimumQueueSize: 4
```

| Setting | Default | Description |
|---------|---------|-------------|
| `avoidCount` | `3` | Number of recent opponents to avoid |
| `expirationSeconds` | `300` | How long opponents stay on avoid list |
| `relaxAfterSeconds` | `120` | Seconds before rules relax (longer queue) |
| `minimumQueueSize` | `4` | Don't avoid if queue has fewer players |

### How Avoidance Works

1. Player A battles Player B
2. Both players are added to each other's avoid list
3. For the next 5 minutes (300 seconds), they won't be matched again
4. After 2 minutes (120 seconds), avoidance relaxes if queue has 4+ players
5. Avoid list entry expires after 5 minutes

<details>
<summary><strong>Relaxation Behavior</strong></summary>

When the queue is small, waiting for a perfect match takes too long. The relaxation feature helps:

**Before relaxation (first 2 minutes):**
- Strict avoidance enforced
- Players wait longer for matches

**After relaxation (2+ minutes, 4+ players):**
- Avoidance rules relaxed
- Faster matching at cost of rematches

**Example scenario:**
1. Player A and B battle
2. Both rejoin queue immediately
3. After 30 seconds, system won't match them again
4. After 2 minutes with 4+ players queued, system may match them again
5. After 5 minutes, avoid entry expires completely

</details>

## Per-Format Matchmaking (Season Presets)

ELO range settings are configured per-format in season presets:

```yaml
# season_presets/default.yml
singles:
  matchmaking:
    enforceEloRange: true
    initialRange: 200
    expansionDelay: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100
```

<details>
<summary><strong>Matchmaking Settings Explained</strong></summary>

| Setting | Default | Description |
|---------|---------|-------------|
| `enforceEloRange` | `true` | Require similar ratings to match |
| `initialRange` | `200` | Starting ELO range for matching |
| `expansionDelay` | `30` | Seconds before range expands |
| `expansionRate` | `50` | ELO points added per expansion |
| `maxMultiplier` | `3.0` | Max range = initialRange × multiplier |
| `immediateMatchRange` | `100` | Instant match if within this range |

**How range expansion works:**

1. Player (1500 ELO) joins queue
2. System looks for opponents in 1500 ± 200 (1300-1700)
3. After 30 seconds: expands to 1500 ± 250
4. After 60 seconds: expands to 1500 ± 300
5. Max range: 1500 ± 600 (200 × 3.0)

**Immediate match:**
- If two players are within 100 ELO, they match instantly
- No waiting for better matches

</details>

## Format-Specific Settings

Each format can have different matchmaking rules:

```yaml
# season_presets/default.yml
singles:
  enabled: true
  matchmaking:
    enforceEloRange: true
    initialRange: 200
    expansionDelay: 30
    maxMultiplier: 3.0

doubles:
  enabled: true
  matchmaking:
    enforceEloRange: true
    initialRange: 150      # Tighter range for Doubles
    expansionDelay: 20     # Faster expansion
    maxMultiplier: 2.5     # Lower maximum

triples:
  enabled: true
  matchmaking:
    enforceEloRange: false  # Disabled for Triples
```

### When to Disable ELO Enforcement

Set `enforceEloRange: false` for:
- Smaller player bases
- Casual formats
- Testing environments

**Trade-off:** Faster matches vs. less balanced matchups

## Tuning Tips

| Goal | Setting Change |
|------|----------------|
| Faster matches | Decrease `expansionDelay`, increase `expansionRate` |
| More balanced matches | Increase `initialRange`, decrease `maxMultiplier` |
| Reduce rematches | Increase `avoidCount`, `expirationSeconds` |
| Faster matching in small queues | Decrease `minimumQueueSize` |

---

## See Also

- [ELO Configuration](/docs/cobbleranked/configuration/elo/) - Rating system settings
- [Battle Formats](/docs/cobbleranked/features/battle-formats/) - Format-specific settings
- [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) - How matchmaking works for players
