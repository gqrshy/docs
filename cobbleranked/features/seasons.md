# Season Management

Time-based competitive periods with automatic rotation and rewards.

---

## Overview

Seasons are competitive periods where players compete for leaderboard positions and rewards.

**At season end:**
- Top players receive season rewards
- Reward flags reset
- New season begins automatically
- Player stats (Elo, wins, losses) **preserved**

**Default duration:** 30 days

---

## Season Lifecycle

```
Season Start → Compete → Season End → Rewards → New Season
    ↓            ↓           ↓           ↓          ↓
  Day 1      Days 2-29     Day 30      Day 31    Day 1
```

**During season:**
- Players compete in ranked battles
- Elo changes based on results
- Leaderboard updates in real-time

**At season end:**
- Leaderboard finalized
- Season rewards calculated
- Rewards become claimable in GUI
- Milestone rewards reset

**Preserved:**
- ✅ Elo rating
- ✅ Total wins/losses
- ✅ Flee count

**Reset:**
- ❌ Milestone reward flags
- ❌ Season reward claims

---

## Configuration

`config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    "reset_days": 30  // Season length in days
  }
}
```

### Common Durations

| Duration | Use Case |
|----------|----------|
| 7 days | Weekly competitions |
| 14 days | Bi-weekly |
| **30 days** | **Monthly (recommended)** |
| 60 days | Long-term |
| 90 days | Quarterly |

---

## Automatic Rotation

Seasons rotate automatically when duration expires.

**How it works:**
1. Check runs every 10 minutes (battle server only)
2. If `current_time >= end_time`:
   - Current season ends
   - New season creates automatically
   - Players notified in chat

**Configuration:** None required (automatic).

---

## Manual Commands

### End Current Season

```
/rankedadmin endseason
```

Forces current season to end immediately.

### Create New Season

```
/rankedadmin createseason <days> [name]
```

**Examples:**
```
/rankedadmin createseason 30
/rankedadmin createseason 30 "Summer Championship"
```

### Season Info

```
/rankedadmin seasoninfo
```

Shows:
- Current season ID
- Start date
- End date  
- Days remaining

---

## Cross-Server Behavior

⚠️ **Battle Server Singleton**

Only ONE server should manage seasons (battle server).

**Config:**
```json5
{
  "battle_server": ""  // Empty = manages seasons
}
```

**Other servers:**
```json5
{
  "battle_server": "battle1"  // Does NOT manage seasons
}
```

**Why:** Multiple battle servers cause duplicate season rotations.

---

**Related:** [Rewards System](../configuration/rewards.md) · [Cross-Server Setup](../advanced/cross-server.md) · [Configuration](../configuration/config.md)
