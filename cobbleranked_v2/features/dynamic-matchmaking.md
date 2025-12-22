# Dynamic Matchmaking

Intelligent matchmaking system that balances match quality with queue times.

---

## Overview

CobbleRanked uses a sophisticated matchmaking system with:

- **Dynamic Elo Range** - Automatically expands search range as wait time increases
- **Recent Opponent Avoidance** - Prevents repeated matches against the same players
- **Immediate Match Threshold** - Instant matching for very close Elo ratings
- **Format-Specific Settings** - Each format has optimized matchmaking parameters
- **MULTI Team Balancing** - Snake draft algorithm for fair 2v2 teams

---

## How It Works

1. **Player joins queue** → Start with narrow Elo range (±initialRange)
2. **Wait for expansion delay** → Range stays fixed during this period
3. **After delay** → Range expands by `expansionRate` Elo per second
4. **Match found** → Battle starts

**Formula:**

```text
If wait_time < expansion_delay:
    range = ±initialRange

If wait_time >= expansion_delay:
    additional = (wait_time - expansion_delay) × expansionRate
    range = ±(initialRange + additional)

Maximum range = initialRange × maxMultiplier
```

---

## Configuration

Edit `config/cobbleranked/matchmaking.yaml`:

### Format-Specific Settings

```yaml
formatRules:
  SINGLES:
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 5
    maxMultiplier: 3.0
    immediateMatchRange: 100

  DOUBLES:
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 5
    maxMultiplier: 3.0
    immediateMatchRange: 100

  TRIPLES:
    initialRange: 250
    expansionDelaySeconds: 25
    expansionRate: 8
    maxMultiplier: 4.0
    immediateMatchRange: 150

  MULTI:
    initialRange: 300
    expansionDelaySeconds: 20
    expansionRate: 10
    maxMultiplier: 5.0
    immediateMatchRange: 200
```

### Field Reference

| Field | Description |
|-------|-------------|
| `initialRange` | Starting Elo range (±X from player's rating) |
| `expansionDelaySeconds` | Seconds to wait before range starts expanding |
| `expansionRate` | Elo increase per second after delay |
| `maxMultiplier` | Maximum range = initialRange × this value |
| `immediateMatchRange` | Instant match if Elo difference ≤ this value |

---

## Example Timeline

**Player with 1200 Elo (Singles defaults):**

| Wait Time | Calculation | Elo Range |
|-----------|-------------|-----------|
| 0-30s | ±200 (no expansion) | 1000-1400 |
| 60s | 200 + (30 × 5) = ±350 | 850-1550 |
| 90s | 200 + (60 × 5) = ±500 | 700-1700 |
| 120s | 200 + (90 × 5) = ±600 (max) | 600-1800 |

> 📝 **Note:** Maximum range is capped at `initialRange × maxMultiplier` (200 × 3.0 = 600 for Singles).

---

## Format Comparison

| Format | Initial Range | Expansion Rate | Max Range | Notes |
|--------|---------------|----------------|-----------|-------|
| SINGLES | ±200 | 5 Elo/s | ±600 | Standard competitive |
| DOUBLES | ±200 | 5 Elo/s | ±600 | Same as Singles |
| TRIPLES | ±250 | 8 Elo/s | ±1000 | Faster expansion |
| MULTI | ±300 | 10 Elo/s | ±1500 | Widest (4 players needed) |

---

## MULTI Format Team Balancing

When 4 players are matched for MULTI format, teams are balanced using a **snake draft algorithm**:

1. Sort all 4 players by Elo (highest to lowest)
2. Assign: Team 1 gets 1st + 4th, Team 2 gets 2nd + 3rd

**Example:**

```text
Players: [1400, 1300, 1100, 1000]

Team 1: Player 1 (1400) + Player 4 (1000) = 2400 total
Team 2: Player 2 (1300) + Player 3 (1100) = 2400 total

Result: Perfectly balanced teams
```

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

### Avoidance Fields

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable recent opponent avoidance |
| `avoidCount` | `3` | Number of recent opponents to avoid |
| `expirationSeconds` | `300` | Remove opponents from list after X seconds |
| `relaxAfterSeconds` | `120` | Allow recent opponents after waiting X seconds |
| `minimumQueueSize` | `4` | Only apply if queue has X+ players |

### Behavior Details

**Relaxation Logic:**

- If player waits longer than `relaxAfterSeconds`, recent opponents become valid matches
- Prevents infinite queue times on small servers

**Minimum Queue Size:**

- If queue size < `minimumQueueSize`, avoidance is disabled
- Prevents issues when only 2-3 players are online

---

## Queue Join Announcements

```yaml
queueAnnouncement:
  enabled: true
  showPlayerName: true
  showFormat: true
  showQueueCount: true
  showTier: false
  showElo: false
  anonymousText: "A player"
```

**Example output:** `PlayerName joined Singles queue! (3 players waiting)`

---

## Configuration Presets

<details>
<summary><strong>Fast Matching (Casual Server)</strong></summary>

```yaml
formatRules:
  SINGLES:
    initialRange: 300
    expansionDelaySeconds: 15
    expansionRate: 10
    maxMultiplier: 5.0
    immediateMatchRange: 200
```

</details>

<details>
<summary><strong>Balanced (Recommended)</strong></summary>

```yaml
formatRules:
  SINGLES:
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 5
    maxMultiplier: 3.0
    immediateMatchRange: 100
```

</details>

<details>
<summary><strong>Strict (Competitive)</strong></summary>

```yaml
formatRules:
  SINGLES:
    initialRange: 100
    expansionDelaySeconds: 60
    expansionRate: 3
    maxMultiplier: 2.0
    immediateMatchRange: 50
```

</details>

---

## Cross-Server Behavior

In cross-server setups:

- Queue data synchronized via Redis
- Matchmaking processed on battle server
- Recent opponent tracking works across all servers
- Format-specific settings shared from config

See [Cross-Server Setup](../advanced/cross-server.md) for details.

---

## See Also

- [Battle Formats](battle-formats.md) - Format-specific settings
- [Elo System](elo-system.md) - Rating calculations
- [Matchmaking Config](../configuration/matchmaking.md) - Full settings
- [Cross-Server](../advanced/cross-server.md) - Multi-server setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
