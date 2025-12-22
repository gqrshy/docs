# Battle Formats

Independent rankings for Singles, Doubles, and Triples formats.

---

## Overview

Each battle format has:

- **Separate Elo ratings** - Progress independently per format
- **Independent leaderboards** - Format-specific rankings
- **Format-specific stats** - Wins, losses, win streaks per format
- **Separate queues** - Match with players in the same format

**Winning in Singles doesn't affect your Doubles Elo.**

---

## Available Formats

| Format | Description | Team Size | Select Count | Turn Timeout |
|--------|-------------|-----------|--------------|--------------|
| **SINGLES** | Traditional 1v1 | 3 | 3 | 90s |
| **DOUBLES** | 2v2 battle | 4 | 4 | 120s |
| **TRIPLES** | 3v3 battle | 6 | 6 | 150s |

---

## Singles

Traditional 1v1 Pokemon battles.

**Battle Setup:**

- Select **3 Pokemon** from your party
- Choose **1 lead** to start the battle
- 2 Pokemon remain as backups

**Default Settings:**

```yaml
SINGLES:
  teamSize: 3
  selectCount: 3
  turnTimeoutSeconds: 90
  matchDurationMinutes: 15
  levelCap: 100
  allowShiny: true
```

---

## Doubles

One player controls 2 Pokemon simultaneously.

**Battle Setup:**

- Select **4 Pokemon** from your party
- Choose **2 leads** to start on the field
- 2 Pokemon remain as backups

**Default Settings:**

```yaml
DOUBLES:
  teamSize: 4
  selectCount: 4
  turnTimeoutSeconds: 120
  matchDurationMinutes: 15
  levelCap: 100
  allowShiny: true
```

---

## Triples

One player controls 3 Pokemon simultaneously.

**Battle Setup:**

- Select **6 Pokemon** from your party
- All **6 Pokemon** available for battle
- 3 active at a time

**Positioning:**

- Pokemon are positioned left, center, and right
- Targeting depends on position (left cannot directly attack far right)
- Center Pokemon can attack all opponents

**Default Settings:**

```yaml
TRIPLES:
  teamSize: 6
  selectCount: 6
  turnTimeoutSeconds: 150
  matchDurationMinutes: 15
  levelCap: 100
  allowShiny: true
```

---

## Format Selection

Players choose format before queuing:

1. Open `/ranked` GUI
2. Click format button (Singles/Doubles/Triples)
3. Click "Join Queue"

---

## Independent Stats

Each format tracks stats separately:

| Stat | Per Format |
|------|-----------|
| Elo Rating | ✅ |
| Wins | ✅ |
| Losses | ✅ |
| Win Streak | ✅ |
| Total Matches | ✅ |
| Leaderboard Position | ✅ |

**Example:**

- Singles: 1200 Elo, 50 wins, 30 losses
- Doubles: 1100 Elo, 20 wins, 15 losses
- Triples: 1000 Elo, 5 wins, 5 losses

---

## Configuration

Edit `config/cobbleranked/battle.yaml`:

### Enabling/Disabling Formats

```yaml
enabledFormats:
  - "SINGLES"
  - "DOUBLES"
  - "TRIPLES"
```

### Format Settings

```yaml
formats:
  SINGLES:
    teamSize: 3
    selectCount: 3
    turnTimeoutSeconds: 90
    matchDurationMinutes: 15
    levelCap: 100
    allowShiny: true

  DOUBLES:
    teamSize: 4
    selectCount: 4
    turnTimeoutSeconds: 120
    matchDurationMinutes: 15
    levelCap: 100
    allowShiny: true

  TRIPLES:
    teamSize: 6
    selectCount: 6
    turnTimeoutSeconds: 150
    matchDurationMinutes: 15
    levelCap: 100
    allowShiny: true
```

### Format Config Fields

| Field | Default | Description |
|-------|---------|-------------|
| `teamSize` | Varies | Pokemon to select from party |
| `selectCount` | Varies | Pokemon used in battle |
| `turnTimeoutSeconds` | 90 | Time limit per turn |
| `matchDurationMinutes` | 15 | Maximum match length |
| `levelCap` | 100 | Force Pokemon to this level (100 = no cap) |
| `allowShiny` | true | Allow shiny Pokemon in battles |

---

## Timer Settings

Global timer settings in `config/cobbleranked/battle.yaml`:

```yaml
timers:
  teamSelectionSeconds: 60    # Time to select team
  leadSelectionSeconds: 30    # Time to select lead
  matchReadySeconds: 17       # Time to accept match
  countdownSeconds: 5         # Pre-battle countdown
  battleMinutes: 15           # Maximum battle duration
  battleTimeWarningSeconds:   # Warning sound triggers
    - 300
    - 60
    - 30
```

---

## Matchmaking per Format

Each format has separate matchmaking settings in `matchmaking.yaml`:

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

| Field | Description |
|-------|-------------|
| `enforceEloRange` | Enable Elo-based matchmaking |
| `initialRange` | Starting Elo range (±X) |
| `expansionDelaySeconds` | Delay before range expands |
| `expansionRate` | Elo added per expansion cycle |
| `maxMultiplier` | Max range = initialRange × this |
| `immediateMatchRange` | Instant match if Elo diff ≤ this |

> 📝 **Note:** Triples has wider matchmaking range because fewer players queue for it.

---

## Arena Requirements

All formats require 2 spawn positions:

| Position | Description |
|----------|-------------|
| pos1 | Player 1 spawn location |
| pos2 | Player 2 spawn location |
| exit | Return location after battle |

```bash
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2
/rankedadmin setArena arena1 exit
```

See [Arena Configuration](../configuration/arenas.md) for details.

---

## See Also

- [Dynamic Matchmaking](dynamic-matchmaking.md) - Matchmaking details
- [Elo System](elo-system.md) - Rating calculation
- [Arena Configuration](../configuration/arenas.md) - Battle locations
- [Rewards](../configuration/rewards.md) - Format-specific rewards
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
