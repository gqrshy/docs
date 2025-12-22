# Matchmaking Configuration

Complete reference for `config/cobbleranked/matchmaking.yaml`.

---

## Overview

The matchmaking configuration controls how players are paired in the queue.

---

## Format Rules

Configure Elo-based matching per format:

```yaml
formatRules:
  SINGLES:
    enforceEloRange: true       # Enable Elo-based matching
    initialRange: 200           # Starting Elo range (±200)
    expansionDelaySeconds: 30   # Wait before expanding range
    expansionRate: 50           # Elo points added per interval
    maxMultiplier: 3.0          # Max range = 200 * 3 = ±600
    immediateMatchRange: 100    # Instant match if within ±100

  DOUBLES:
    enforceEloRange: true
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100

  TRIPLES:
    enforceEloRange: true
    initialRange: 250           # Wider range for less popular format
    expansionDelaySeconds: 25
    expansionRate: 80
    maxMultiplier: 4.0
    immediateMatchRange: 150
```

### Settings Explained

| Setting | Description |
|---------|-------------|
| `enforceEloRange` | If `false`, matches anyone regardless of Elo |
| `initialRange` | Starting Elo range when joining queue |
| `expansionDelaySeconds` | Seconds before range starts expanding |
| `expansionRate` | Elo range increase per expansion interval |
| `maxMultiplier` | Maximum expansion (initialRange × multiplier) |
| `immediateMatchRange` | Instant match if Elo difference within this |

### How Expansion Works

Example with `initialRange: 200`, `expansionRate: 50`, `maxMultiplier: 3.0`:

| Time in Queue | Elo Range |
|---------------|-----------|
| 0-30 seconds | ±200 |
| 30-60 seconds | ±250 |
| 60-90 seconds | ±300 |
| 90-120 seconds | ±350 |
| ... | ... |
| Max | ±600 (200 × 3) |

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

## Recent Opponent Avoidance

Prevent rematches with the same opponent:

```yaml
recentOpponentAvoidance:
  enabled: true
  avoidCount: 3              # Avoid last 3 opponents
  expirationSeconds: 300     # 5 minutes memory
  relaxAfterSeconds: 120     # Relax after 2 min in queue
  minimumQueueSize: 4        # Only apply if 4+ players in queue
```

### Settings

| Setting | Description |
|---------|-------------|
| `enabled` | Enable opponent avoidance |
| `avoidCount` | Number of recent opponents to avoid |
| `expirationSeconds` | Time before opponents are forgotten |
| `relaxAfterSeconds` | Relax avoidance after this wait time |
| `minimumQueueSize` | Only apply if queue has enough players |

---

## Configuration Examples

<details>
<summary><strong>Competitive Server (Strict Matching)</strong></summary>

```yaml
formatRules:
  SINGLES:
    enforceEloRange: true
    initialRange: 150
    expansionDelaySeconds: 45
    expansionRate: 30
    maxMultiplier: 2.5
    immediateMatchRange: 75

recentOpponentAvoidance:
  enabled: true
  avoidCount: 5
  expirationSeconds: 600
  relaxAfterSeconds: 180
  minimumQueueSize: 6
```

</details>

<details>
<summary><strong>Small Server (Fast Matching)</strong></summary>

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
  enabled: false
```

</details>

<details>
<summary><strong>Casual Server (No Elo Matching)</strong></summary>

```yaml
formatRules:
  SINGLES:
    enforceEloRange: false
  DOUBLES:
    enforceEloRange: false

recentOpponentAvoidance:
  enabled: false
```

</details>

---

## Full Example

<details>
<summary><strong>Complete matchmaking.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Matchmaking Configuration

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
    immediateMatchRange: 150

defaultEloRange:
  enforceEloRange: true
  initialRange: 200
  expansionDelaySeconds: 30
  expansionRate: 50
  maxMultiplier: 3.0
  immediateMatchRange: 100

recentOpponentAvoidance:
  enabled: true
  avoidCount: 3
  expirationSeconds: 300
  relaxAfterSeconds: 120
  minimumQueueSize: 4
```

</details>

---

## See Also

- [Battle Config](battle.md) - Format settings
- [Elo Config](elo.md) - Rating system
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
