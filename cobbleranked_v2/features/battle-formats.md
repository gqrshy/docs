# Battle Formats

Independent rankings for Singles, Doubles, Triples, and Multi formats.

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

| Format | Description | Active Pokemon | Team Size | Players |
|--------|-------------|----------------|-----------|---------|
| **SINGLES** | Traditional 1v1 | 1 | 3 | 1v1 |
| **DOUBLES** | 2v2 with one player | 2 | 4 | 1v1 |
| **TRIPLES** | 3v3 with one player | 3 | 6 | 1v1 |
| **MULTI** | Team battles | 1 per player | 3 per player | 2v2 (4 players) |

---

## Singles

Traditional 1v1 Pokemon battles.

**Battle Setup:**

- Select **3 Pokemon** from your party
- Choose **1 lead** to start the battle
- 2 Pokemon remain as backups

**Example:** Player A vs Player B, each with 3 Pokemon (1 active + 2 backups)

---

## Doubles

One player controls 2 Pokemon simultaneously.

**Battle Setup:**

- Select **4 Pokemon** from your party
- Choose **2 leads** to start on the field
- 2 Pokemon remain as backups

**Example:** Player A (2 active Pokemon) vs Player B (2 active Pokemon)

---

## Triples

One player controls 3 Pokemon simultaneously.

**Battle Setup:**

- Select **6 Pokemon** from your party
- All **3 leads** start on the field
- 3 Pokemon remain as backups

**Positioning:**

- Pokemon are positioned left, center, and right
- Targeting depends on position (left cannot directly attack far right)
- Center Pokemon can attack all opponents

**Example:** Player A (3 active Pokemon) vs Player B (3 active Pokemon)

---

## Multi (2v2 Team Battles)

Team battles with 2 players per side (4 players total).

**Battle Setup:**

- Each player selects **3 Pokemon** from their party
- Each player chooses **1 lead**
- Partners fight together against opposing team

**Requirements:**

- Form party with partner before queuing
- Both players must queue together
- Arenas must have 4 spawn positions (pos1-pos4)

**How to Queue:**

1. Form party with partner (invite them to your party)
2. Both players open `/ranked` GUI
3. Select "Multi" format
4. Both players click "Join Queue"

**Matchmaking:** System pairs two parties with similar combined Elo.

**Example:** Team 1 (Player A + Player B) vs Team 2 (Player C + Player D)

---

## Format Selection

Players choose format before queuing:

1. Open `/ranked` GUI
2. Click format button (Singles/Doubles/Triples/Multi)
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
- Multi: 1050 Elo, 10 wins, 8 losses

---

## Configuration

### Enabling/Disabling Formats

Edit `config/cobbleranked/battle.yaml`:

```yaml
enabledFormats:
  - "SINGLES"
  - "DOUBLES"
  # - "TRIPLES"   # Uncomment to enable
  # - "MULTI"     # Uncomment to enable

formats:
  SINGLES:
    teamSize: 3
    selectCount: 3
    turnTimeoutSeconds: 90
    matchDurationMinutes: 15

  DOUBLES:
    teamSize: 4
    selectCount: 4
    turnTimeoutSeconds: 120
    matchDurationMinutes: 20

  TRIPLES:
    teamSize: 6
    selectCount: 6
    turnTimeoutSeconds: 150
    matchDurationMinutes: 25

  MULTI:
    teamSize: 3
    selectCount: 3
    turnTimeoutSeconds: 120
    matchDurationMinutes: 20
```

| Setting | Description |
|---------|-------------|
| `teamSize` | Pokemon count players select from party |
| `selectCount` | Pokemon actually used in battle |
| `turnTimeoutSeconds` | Time limit per turn |
| `matchDurationMinutes` | Maximum match length |

### Format Matchmaking Settings

Each format has separate matchmaking configuration in `matchmaking.yaml`:

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

| Setting | Description |
|---------|-------------|
| `initialRange` | Starting Elo range (±X from player's rating) |
| `expansionDelaySeconds` | Seconds before range expansion starts |
| `expansionRate` | Elo range increase per second |
| `maxMultiplier` | Maximum expansion (X × initialRange) |
| `immediateMatchRange` | Elo range for instant matches |

> 📝 **Note:** Multi format has wider matchmaking ranges because matching 4 players is more difficult than 2.

---

## Arena Requirements

Different formats have different spawn position requirements:

| Format | Required Positions |
|--------|-------------------|
| SINGLES | pos1, pos2 |
| DOUBLES | pos1, pos2 |
| TRIPLES | pos1, pos2 |
| MULTI | pos1, pos2, pos3, pos4 |

**Setting up Multi arenas:**

```bash
/rankedadmin setArena multi_arena pos1  # Team 1 Player 1
/rankedadmin setArena multi_arena pos2  # Team 2 Player 1
/rankedadmin setArena multi_arena pos3  # Team 1 Player 2
/rankedadmin setArena multi_arena pos4  # Team 2 Player 2
```

See [Arena Configuration](../configuration/arenas.md) for details.

---

## See Also

- [Matchmaking](../configuration/matchmaking.md) - Matchmaking settings
- [Elo System](elo-system.md) - Rating calculation
- [Arena Configuration](../configuration/arenas.md) - Battle locations
- [Rewards](../configuration/rewards.md) - Format-specific rewards
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
