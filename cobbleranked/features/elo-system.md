# Elo Rating System

Understand how the Elo rating system works in CobbleRanked and how ratings are calculated.

## Overview

The Elo rating system is a method for calculating the relative skill levels of players in competitive games. In CobbleRanked, your Elo rating determines:
- **Matchmaking** - Who you're paired against
- **Leaderboard position** - Your rank compared to other players
- **Skill progression** - Visible improvement over time

**Starting Elo:** 1000 (default)

---

## How Elo Works

### Basic Concept

1. **Everyone starts at 1000 Elo**
2. **Win a battle** → Gain Elo points
3. **Lose a battle** → Lose Elo points
4. **Points exchanged** depend on rating difference

### Example

**Scenario 1: Equal ratings**
- Player A: 1000 Elo
- Player B: 1000 Elo
- Result: A wins
- **Outcome:** A gains ~16 Elo, B loses ~16 Elo

**Scenario 2: Upset victory**
- Player A: 900 Elo (underdog)
- Player B: 1200 Elo (favorite)
- Result: A wins (upset!)
- **Outcome:** A gains ~28 Elo, B loses ~28 Elo

**Scenario 3: Expected victory**
- Player A: 1200 Elo (favorite)
- Player B: 900 Elo (underdog)
- Result: A wins (expected)
- **Outcome:** A gains ~4 Elo, B loses ~4 Elo

**Key insight:** Beating stronger opponents gives more Elo!

---

## Elo Calculation Modes

CobbleRanked supports two Elo calculation systems:

### Pokemon Showdown (Recommended)

**Configuration:**
```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

**How it works:**
- Uses **K-factor** system (similar to Chess, Pokemon Showdown)
- More accurate skill representation
- Provisional period for new players (higher volatility)
- Gradual rating stabilization

**K-Factor:**
- **Provisional players** (< 10 matches): K = 64 (rating changes faster)
- **Established players** (10+ matches): K = 32 (rating changes slower)

**Formula:**
```
Expected Score = 1 / (1 + 10^((Opponent Elo - Your Elo) / 400))
Elo Change = K * (Actual Score - Expected Score)
```

**Example calculation:**
- Your Elo: 1000
- Opponent Elo: 1200
- K-factor: 32 (established player)
- Expected score: 0.24 (24% chance to win)
- You win (actual score = 1)
- Elo change: 32 * (1 - 0.24) = +24 Elo

### Legacy (Simple)

**Configuration:**
```json5
{
  "eloSystem": {
    "mode": "LEGACY"
  }
}
```

**How it works:**
- Random Elo change between min and max
- Winner gains random points, loser loses same amount
- Simple but less accurate

**Example:**
```json5
{
  "eloSystem": {
    "mode": "LEGACY",
    "legacy": {
      "minPoints": 10,
      "maxPoints": 30
    }
  }
}
```

**Result:**
- Winner: +10 to +30 Elo (random)
- Loser: -10 to -30 Elo (same amount)

---

## Configuration Options

### Pokemon Showdown Settings

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,           // Starting Elo for new players
      "floorElo": 1000,             // Minimum Elo (can't drop below)
      "kFactor": 32,                // Standard K-factor
      "provisionalMatches": 10,     // Matches before rating stabilizes
      "provisionalKFactor": 64      // Higher K for new players
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `initialElo` | 1000 | Starting Elo for new players |
| `floorElo` | 1000 | Minimum Elo (prevents dropping below) |
| `kFactor` | 32 | Standard K-factor for established players |
| `provisionalMatches` | 10 | Number of matches before rating stabilizes |
| `provisionalKFactor` | 64 | K-factor for provisional players (higher = more volatile) |

### K-Factor Guide

The K-factor determines how much Elo changes per match:

| K-Factor | Volatility | Use Case |
|----------|------------|----------|
| 16 | Very low | Top players, very stable ratings |
| 24 | Low | Competitive ladders |
| 32 | **Standard** | **Recommended for most servers** |
| 40 | High | Casual servers, faster progression |
| 64 | Very high | New players only (provisional period) |

**Recommendation:** Keep default (32 for established, 64 for provisional).

### Elo Decay System

Inactive players gradually lose Elo to prevent ladder stagnation:

```json5
{
  "eloSystem": {
    "pokemonShowdown": {
      "decay": {
        "enabled": true,
        "runAtUtcHour": 9,          // Run decay at 9 AM UTC daily
        "slowDecayReduction": 2     // Lose 2 Elo per day of inactivity
      }
    }
  }
}
```

**How decay works:**
- Checked daily at configured UTC hour
- Players lose Elo if inactive
- Encourages active participation
- Prevents "sitting on" high ratings

**Example:**
- Player has 1500 Elo
- Doesn't play for 10 days
- Decay: 10 days × 2 Elo = -20 Elo
- New Elo: 1480

**Disable decay:**
```json5
"decay": {
  "enabled": false
}
```

---

## Elo Ranges & Ranks

Common Elo ranges for player skill levels:

| Elo Range | Skill Level | Percentage |
|-----------|-------------|------------|
| 800-999 | Beginner | ~15% |
| 1000-1199 | Intermediate | ~35% |
| 1200-1399 | Advanced | ~30% |
| 1400-1599 | Expert | ~15% |
| 1600-1799 | Master | ~4% |
| 1800+ | Grandmaster | ~1% |

**Note:** Actual distribution depends on your server's player base.

---

## Matchmaking with Elo

### Elo Range Matching

Players are matched based on similar Elo ratings:

```json5
{
  "matchmaking": {
    "initialEloRange": 200,         // Start with ±200 Elo range
    "eloRangeExpansionRate": 50,    // Expand every 50 seconds
    "maxEloRangeMultiplier": 5.0    // Max ±1000 Elo range
  }
}
```

**Example matchmaking:**

**Player A (1000 Elo) joins queue:**
- 0-49s: Matches players 800-1200 Elo
- 50-99s: Matches players 600-1400 Elo
- 100-149s: Matches players 400-1600 Elo
- 150-199s: Matches players 200-1800 Elo
- 200s+: Matches anyone (0-2000+ Elo)

**Why range expands:**
- Faster queue times
- Better than no match
- Still prioritizes similar skill

---

## Provisional Period

### What is Provisional?

New players are "provisional" for their first 10 matches (default).

**Differences:**
- **Higher K-factor** (64 vs 32) = Bigger Elo swings
- **Faster rating adjustment** to find true skill level
- **Less stable** but more responsive

**Why provisional?**
- Starting Elo (1000) might not match actual skill
- New players need to find their correct rating quickly
- After 10 matches, rating becomes more stable

**Example:**

**Provisional Player (Match 1-10):**
- Wins against 1000 Elo opponent: +32 Elo
- Loses against 1000 Elo opponent: -32 Elo

**Established Player (Match 11+):**
- Wins against 1000 Elo opponent: +16 Elo
- Loses against 1000 Elo opponent: -16 Elo

---

## Elo vs Win Rate

Elo and win rate are different metrics:

| Metric | Meaning |
|--------|---------|
| **Elo** | Skill level relative to all players |
| **Win Rate** | Percentage of matches won |

**Example:**
- Player A: 1500 Elo, 60% win rate (plays strong opponents)
- Player B: 1200 Elo, 55% win rate (plays weaker opponents)

Player A is more skilled despite similar win rates!

**Elo is better because:**
- ✅ Accounts for opponent strength
- ✅ Dynamic (changes with skill)
- ✅ Fair matchmaking
- ✅ Comparable across formats

---

## Elo Milestones & Rewards

You can reward players for reaching Elo thresholds:

```json5
{
  "milestone_rewards": {
    "singles": {
      "elo_1200": {
        "type": "ELO",
        "requirement": 1200,
        "display": "&b❄ Climbing the Ranks",
        "commands": [
          "give {player} minecraft:iron_ingot 32"
        ]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "display": "&b❄ Elo Master",
        "commands": [
          "give {player} minecraft:diamond 3"
        ]
      },
      "elo_2000": {
        "type": "ELO",
        "requirement": 2000,
        "display": "&d❄ Grandmaster",
        "commands": [
          "give {player} minecraft:netherite_ingot 5",
          "lp user {player} permission set cobbleranked.title.grandmaster true"
        ]
      }
    }
  }
}
```

See [Rewards System](../configuration/rewards.md) for more details.

---

## Admin Commands

### View Player Elo

```bash
/elo PlayerName
```

### Set Player Elo

```bash
/rankedarena elo set PlayerName 1500
```

### Add Elo

```bash
/rankedarena elo add PlayerName 100
```

### Remove Elo

```bash
/rankedarena elo remove PlayerName 50
```

### Reset Player Stats

```bash
/rankedarena stats reset PlayerName
```

This resets:
- Elo to 1000
- Wins to 0
- Losses to 0
- Flee count to 0

---

## Frequently Asked Questions

### Why did I lose so much Elo?

**Possible reasons:**
1. **Lost to lower-rated opponent** - Bigger penalty for upsets
2. **Provisional period** - Higher K-factor (64) causes bigger swings
3. **Disconnect** - Treated as loss, full Elo penalty

**Solution:** Keep playing! Elo stabilizes after provisional period.

### Can I drop below 1000 Elo?

**Default: No** (`floorElo: 1000`)

You cannot drop below the floor Elo. This prevents:
- Extreme rating drops
- Players giving up after bad streaks
- Rating deflation

**To allow dropping below 1000:**
```json5
{
  "pokemonShowdown": {
    "floorElo": 0  // Can drop to 0 (not recommended)
  }
}
```

### Why is my Elo decaying?

**Elo decay is enabled by default.**

If you don't play for several days, you lose Elo:
- Default: -2 Elo per day of inactivity

**Solution:** Play at least one match every few days.

**To disable decay:**
```json5
{
  "pokemonShowdown": {
    "decay": {
      "enabled": false
    }
  }
}
```

### How do I climb faster?

**Tips:**
1. **Win against higher-rated opponents** - Bigger Elo gains
2. **Play consistently** - Avoid decay penalties
3. **Improve your team** - Better Pokemon, strategies, moves
4. **Study battles** - Learn from losses
5. **Avoid rage quits** - Disconnects count as losses

**Remember:** Elo represents skill, not wins. Focus on improving!

### What's a good Elo?

**Depends on your server**, but generally:
- 1000-1200: Average
- 1200-1400: Above average
- 1400-1600: Skilled
- 1600+: Top tier

**Goal:** Progress steadily, not necessarily reach top 1.

---

## Troubleshooting

### Elo not updating after battle

**Symptoms:** Won battle but Elo stayed same

**Solutions:**
1. Check if battle ended in draw (turn limit)
2. Verify Elo system is enabled in config
3. Check console for errors
4. Restart server and try again

### Everyone has same Elo

**Symptoms:** All players stuck at 1000 Elo

**Solutions:**
1. Verify battles are completing (not disconnecting)
2. Check Elo mode is set correctly (`POKEMON_SHOWDOWN` or `LEGACY`)
3. Ensure database is saving (check `ranked.db` file)
4. Reload config: `/rankedarena reload`

### Elo changes too fast/slow

**Symptoms:** Elo swings too much or too little per match

**Solutions:**

**Too fast (±50+ Elo per match):**
- Lower K-factor: `"kFactor": 16` or `24`
- Check if still provisional (first 10 matches)

**Too slow (±5 Elo per match):**
- Increase K-factor: `"kFactor": 40`
- Check rating difference (close ratings = small changes)

---

**Next:** Learn about [Season Management](seasons.md) for automatic season rotation.
