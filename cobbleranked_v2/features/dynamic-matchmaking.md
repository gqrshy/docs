# Dynamic Matchmaking

Intelligent matchmaking system that balances match quality with queue times.

---

## Overview

CobbleRanked uses a sophisticated matchmaking system with:

- **Dynamic Elo Range** - Automatically expands search range over time
- **Recent Opponent Avoidance** - Prevents repeated matches against same players
- **Immediate Match Threshold** - Instant matching for very close Elo ratings
- **Format-Specific Settings** - Each format has optimized parameters

---

## How It Works

1. **Player joins queue** → Start with narrow Elo range (±initialRange)
2. **Wait for expansion delay** → Range stays fixed during this period
3. **After delay** → Range expands by `expansionRate` per cycle
4. **Match found** → Battle starts

**Expansion Formula:**

```text
expansions = (waitTime - expansionDelay) / expansionDelay
expandedRange = initialRange + (expansions × expansionRate)
maxRange = initialRange × maxMultiplier
finalRange = min(expandedRange, maxRange)
```

---

## Configuration

Edit `config/cobbleranked/matchmaking.yaml`:

### Format-Specific Rules

```yaml
formatRules:
  SINGLES:
    enforceEloRange: true
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100

  DOUBLES:
    enforceEloRange: true
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100

  TRIPLES:
    enforceEloRange: true
    initialRange: 250
    expansionDelaySeconds: 25
    expansionRate: 80
    maxMultiplier: 4.0
    immediateMatchRange: 100
```

### Field Reference

| Field | Default | Description |
|-------|---------|-------------|
| `enforceEloRange` | `true` | Enable Elo-based matchmaking |
| `initialRange` | `200` | Starting Elo range (±X from player's rating) |
| `expansionDelaySeconds` | `30` | Seconds before range starts expanding |
| `expansionRate` | `50` | Elo increase per expansion cycle |
| `maxMultiplier` | `3.0` | Maximum range = initialRange × this value |
| `immediateMatchRange` | `100` | Instant match if Elo difference ≤ this |

---

## Example Timeline

**Player with 1200 Elo (Singles defaults):**

| Wait Time | Expansions | Elo Range |
|-----------|------------|-----------|
| 0-30s | 0 | ±200 (1000-1400) |
| 30-60s | 1 | ±250 (950-1450) |
| 60-90s | 2 | ±300 (900-1500) |
| 90-120s | 3 | ±350 (850-1550) |
| 120s+ | Capped | ±600 (600-1800) |

> 📝 **Note:** Maximum range is capped at `initialRange × maxMultiplier` (200 × 3.0 = 600 for Singles).

---

## Format Comparison

| Format | Initial | Expansion | Max Range | Notes |
|--------|---------|-----------|-----------|-------|
| SINGLES | ±200 | 50/cycle | ±600 | Standard |
| DOUBLES | ±200 | 50/cycle | ±600 | Same as Singles |
| TRIPLES | ±250 | 80/cycle | ±1000 | Faster expansion |

---

## Recent Opponent Avoidance

Prevents players from being matched against the same opponents repeatedly.

```yaml
recentOpponentAvoidance:
  enabled: true
  avoidCount: 3
  expirationSeconds: 300
  relaxAfterSeconds: 120
  minimumQueueSize: 4
```

### Fields

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable opponent avoidance |
| `avoidCount` | `3` | Number of recent opponents to avoid |
| `expirationSeconds` | `300` | Remove from list after X seconds |
| `relaxAfterSeconds` | `120` | Allow recent opponents after waiting |
| `minimumQueueSize` | `4` | Only apply if queue has X+ players |

### Behavior

**Relaxation Logic:**

- If player waits longer than `relaxAfterSeconds`, recent opponents become valid
- Prevents infinite queue times on small servers

**Minimum Queue Size:**

- If queue size < `minimumQueueSize`, avoidance is disabled
- Prevents issues when only 2-3 players are online

---

## Queue Announcements

Configure in `battle.yaml`:

```yaml
announcements:
  broadcastMatchStart: true
  broadcastMatchResult: true
  showActionbarWhileQueued: true
  queueJoin:
    enabled: false
    showPlayerName: true
    showFormat: true
    showQueueCount: true
    showTier: false
    showElo: false
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `false` | Broadcast queue join |
| `showPlayerName` | `true` | Show joining player's name |
| `showFormat` | `true` | Show format (Singles, etc.) |
| `showQueueCount` | `true` | Show players in queue |
| `showTier` | `false` | Show player's rank tier |
| `showElo` | `false` | Show player's Elo |

---

## Default Elo Range

Fallback for formats not explicitly configured:

```yaml
defaultEloRange:
  enforceEloRange: true
  initialRange: 200
  expansionDelaySeconds: 30
  expansionRate: 50
  maxMultiplier: 3.0
  immediateMatchRange: 100
```

---

## Disabling Elo-Based Matching

For casual servers that want quick matches regardless of skill:

```yaml
formatRules:
  SINGLES:
    enforceEloRange: false
```

When `enforceEloRange: false`, any two players in queue will be matched immediately.

---

## Configuration Examples

<details>
<summary><strong>Fast Matching (Casual Server)</strong></summary>

```yaml
formatRules:
  SINGLES:
    enforceEloRange: true
    initialRange: 300
    expansionDelaySeconds: 15
    expansionRate: 100
    maxMultiplier: 5.0
    immediateMatchRange: 200

recentOpponentAvoidance:
  enabled: true
  avoidCount: 2
  expirationSeconds: 180
  relaxAfterSeconds: 60
  minimumQueueSize: 3
```

</details>

<details>
<summary><strong>Strict Matching (Competitive Server)</strong></summary>

```yaml
formatRules:
  SINGLES:
    enforceEloRange: true
    initialRange: 100
    expansionDelaySeconds: 60
    expansionRate: 25
    maxMultiplier: 2.0
    immediateMatchRange: 50

recentOpponentAvoidance:
  enabled: true
  avoidCount: 5
  expirationSeconds: 600
  relaxAfterSeconds: 300
  minimumQueueSize: 6
```

</details>

---

## Cross-Server Behavior

In cross-server setups:

- Queue data synchronized via Redis
- Matchmaking processed on battle server
- Recent opponent tracking works across all servers

See [Cross-Server Setup](../advanced/cross-server.md) for details.

---

## See Also

- [Battle Formats](battle-formats.md) - Format-specific settings
- [Elo System](elo-system.md) - Rating calculations
- [Cross-Server](../advanced/cross-server.md) - Multi-server setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
