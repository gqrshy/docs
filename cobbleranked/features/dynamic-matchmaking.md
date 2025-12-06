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

### Format-Specific Settings

Each battle format has independent matchmaking configuration:

`config/cobbleranked/config.json5`:

```json5
{
  "matchmaking": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "initialRange": 200,
        "expansionDelay": 30,
        "expansionRate": 5,
        "maxMultiplier": 3.0,
        "immediateMatchRange": 100
      },
      "DOUBLES": {
        "enabled": true,
        "initialRange": 200,
        "expansionDelay": 30,
        "expansionRate": 5,
        "maxMultiplier": 3.0,
        "immediateMatchRange": 100
      },
      "TRIPLES": {
        "enabled": true,
        "initialRange": 250,
        "expansionDelay": 25,
        "expansionRate": 8,
        "maxMultiplier": 4.0,
        "immediateMatchRange": 150
      },
      "MULTI": {
        "enabled": true,
        "initialRange": 300,
        "expansionDelay": 20,
        "expansionRate": 10,
        "maxMultiplier": 5.0,
        "immediateMatchRange": 200
      }
    }
  }
}
```

### Field Reference

| Field | Description |
|-------|-------------|
| `enabled` | Enable dynamic Elo expansion for this format |
| `initialRange` | Starting Elo range (±X from player's rating) |
| `expansionDelay` | Seconds to wait before range starts expanding |
| `expansionRate` | Elo increase per second after delay |
| `maxMultiplier` | Maximum range = initialRange × this value |
| `immediateMatchRange` | Instant match if Elo difference ≤ this value |

---

## Example Timeline

**Player with 1500 Elo (Singles defaults):**

| Wait Time | Calculation | Elo Range |
|-----------|-------------|-----------|
| 0-30s | ±200 (no expansion) | 1300-1700 |
| 60s | 200 + (30 × 5) = ±350 | 1150-1850 |
| 90s | 200 + (60 × 5) = ±500 | 1000-2000 |
| 120s | 200 + (90 × 5) = ±600 (max) | 900-2100 |

> 📝 **Note:** Maximum range is capped at `initialRange × maxMultiplier` (200 × 3.0 = 600 for Singles).

---

## Format Comparison

| Format | Initial Range | Expansion Rate | Max Range | Notes |
|--------|---------------|----------------|-----------|-------|
| SINGLES | ±200 | 5 Elo/s | ±600 | Standard competitive |
| DOUBLES | ±200 | 5 Elo/s | ±600 | Same as Singles |
| TRIPLES | ±250 | 8 Elo/s | ±1000 | Faster expansion |
| MULTI | ±300 | 10 Elo/s | ±1500 | Widest (4 players needed) |
| RANDOM_* | ±300 | 10-15 Elo/s | Unlimited | Elo less important |

---

## MULTI Format Team Balancing

When 4 players are matched for MULTI format, teams are balanced using a **snake draft algorithm**:

1. Sort all 4 players by Elo (highest to lowest)
2. Assign: Team 1 gets 1st + 4th, Team 2 gets 2nd + 3rd

**Example:**

```text
Players: [1500, 1400, 1100, 1000]

Team 1: Player 1 (1500) + Player 4 (1000) = 2500 total
Team 2: Player 2 (1400) + Player 3 (1100) = 2500 total

Result: Perfectly balanced teams
```

---

## Match Priority Scoring

When multiple potential matches exist, the system prioritizes based on:

```text
score = elo_difference - (combined_wait_time × 0.5)
```

Lower score = better match.

This means:

- Closer Elo = Higher priority
- Longer wait time = Higher priority (players waiting longer get matched first)

---

## Recent Opponent Avoidance

Prevents players from being matched against the same opponents repeatedly.

**Process:**

1. **After a match** → Opponent added to "recent opponents" list
2. **Searching for match** → Recent opponents excluded from candidates
3. **Time passes** → Opponents expire from list
4. **Long wait** → Restriction relaxes to prevent infinite queue

### Avoidance Configuration

```json5
{
  "matchmaking": {
    "recent_opponent_avoidance": {
      "enabled": true,
      "avoid_count": 3,
      "expiration_seconds": 300,
      "relax_after_seconds": 120,
      "minimum_queue_size": 4
    }
  }
}
```

### Avoidance Fields

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable recent opponent avoidance |
| `avoid_count` | `3` | Number of recent opponents to avoid |
| `expiration_seconds` | `300` | Remove opponents from list after X seconds |
| `relax_after_seconds` | `120` | Allow recent opponents after waiting X seconds |
| `minimum_queue_size` | `4` | Only apply if queue has X+ players |

### Behavior Details

**Relaxation Logic:**

- If player waits longer than `relax_after_seconds`, recent opponents become valid matches
- Prevents infinite queue times on small servers

**Minimum Queue Size:**

- If queue size < `minimum_queue_size`, avoidance is disabled
- Prevents issues when only 2-3 players are online

<details>
<summary><strong>Configuration Presets</strong></summary>

**Strict (Competitive Servers)**

```json5
{
  "recent_opponent_avoidance": {
    "enabled": true,
    "avoid_count": 5,
    "expiration_seconds": 600,
    "relax_after_seconds": 300,
    "minimum_queue_size": 6
  }
}
```

**Relaxed (Small Servers)**

```json5
{
  "recent_opponent_avoidance": {
    "enabled": true,
    "avoid_count": 2,
    "expiration_seconds": 180,
    "relax_after_seconds": 60,
    "minimum_queue_size": 3
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

---

## Queue Join Announcements

Broadcast when players join the queue:

```json5
{
  "ranked_match": {
    "queue_announcement": {
      "enabled": true,
      "show_player_name": true,
      "show_format": true,
      "show_queue_count": true,
      "show_tier": false,
      "show_elo": false,
      "anonymous_text": "A player"
    }
  }
}
```

**Example output:** `PlayerName joined Singles queue! (3 players waiting)`

---

## Rate Limiting

To prevent queue spam and protect server performance:

- **1 second cooldown** between queue join attempts per player
- Automatic rejection with error message if spammed

---

## Cross-Server Behavior

In cross-server setups:

- Queue data synchronized via Redis
- Matchmaking processed on battle server
- Recent opponent tracking works across all servers
- Format-specific settings shared from config

See [Cross-Server Setup](../advanced/cross-server.md) for details.

---

## Presets

<details>
<summary><strong>Fast Matching (Casual Server)</strong></summary>

```json5
{
  "matchmaking": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "initialRange": 300,
        "expansionDelay": 15,
        "expansionRate": 10,
        "maxMultiplier": 5.0,
        "immediateMatchRange": 200
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Balanced (Recommended)</strong></summary>

```json5
{
  "matchmaking": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "initialRange": 200,
        "expansionDelay": 30,
        "expansionRate": 5,
        "maxMultiplier": 3.0,
        "immediateMatchRange": 100
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Strict (Competitive)</strong></summary>

```json5
{
  "matchmaking": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "initialRange": 100,
        "expansionDelay": 60,
        "expansionRate": 3,
        "maxMultiplier": 2.0,
        "immediateMatchRange": 50
      }
    }
  }
}
```

</details>

---

## See Also

- [Battle Formats](battle-formats.md) - Format-specific settings
- [Elo System](elo-system.md) - Rating calculations
- [Cross-Server](../advanced/cross-server.md) - Multi-server setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
