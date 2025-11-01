# Elo Rating System

Calculate player skill levels for matchmaking and leaderboards.

---

## Overview

Elo rating determines:
- **Matchmaking** - Who you're paired against
- **Leaderboard rank** - Your position
- **Skill progression** - Visible improvement

**Starting Elo:** 1000 (default)  
**Format-Specific:** Singles, Doubles, and Multi track separate Elo

---

## How Elo Works

- **Win** → Gain Elo
- **Lose** → Lose Elo
- **Points exchanged** depend on rating difference

### Examples

| Scenario | Your Elo | Opponent | Result | Change |
|----------|----------|----------|--------|--------|
| Even match | 1000 | 1000 | Win | +16 |
| Upset win | 900 | 1200 | Win | +28 |
| Expected win | 1200 | 900 | Win | +4 |

**Key:** Beating stronger opponents = more Elo!

---

## Calculation Modes

### Pokemon Showdown (Recommended)

Uses K-factor system (similar to Chess/Pokemon Showdown).

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,           // Minimum Elo
      "kFactor": 32,               // Standard K-factor
      "provisionalMatches": 10,    // New player period
      "provisionalKFactor": 64     // Higher for new players
    }
  }
}
```

**K-Factor:**
- New players (< 10 matches): K = 64 (rating changes faster)
- Established players: K = 32 (stable)

### Legacy (Simple)

Random Elo change between min and max.

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

Winner gains +10 to +30 Elo (random).

### Glicko-2 (Advanced)

Most accurate system. Tracks rating uncertainty (RD).

```json5
{
  "eloSystem": {
    "mode": "GLICKO2",
    "glicko2": {
      "initialRating": 1500.0,
      "initialRD": 350.0,          // Rating uncertainty
      "initialVolatility": 0.06,
      "tau": 0.5,
      "rdDecayDays": 30
    }
  }
}
```

**When to use:**
- ✅ Large competitive server (100+ players)
- ❌ Small casual server (use Pokemon Showdown)

---

## Configuration

### K-Factor Guide

| K-Factor | Volatility | Use Case |
|----------|------------|----------|
| 16 | Very low | Top players only |
| 24 | Low | Competitive |
| **32** | **Standard** | **Recommended** |
| 40 | High | Casual |
| 64 | Very high | New players |

### Elo Decay

Inactive players lose Elo to prevent ladder stagnation.

```json5
{
  "pokemonShowdown": {
    "decay": {
      "enabled": true,
      "runAtUtcHour": 9,
      "slowDecayReduction": 2    // -2 Elo per day
    }
  }
}
```

**Example:** 10 days inactive = -20 Elo

---

## Elo Ranges

| Elo Range | Skill Level | % of Players |
|-----------|-------------|--------------|
| 800-999 | Beginner | ~15% |
| 1000-1199 | Intermediate | ~35% |
| 1200-1399 | Advanced | ~30% |
| 1400-1599 | Expert | ~15% |
| 1600-1799 | Master | ~4% |
| 1800+ | Grandmaster | ~1% |

---

## Troubleshooting

**Elo not changing?**
- Check battle completed (not draw)
- Verify Elo mode is set
- Check database connection

**Changes too fast/slow?**
- Adjust K-factor (`kFactor: 32` → higher/lower)
- Check if still provisional (first 10 matches)

**Everyone stuck at 1000?**
- Verify battles completing
- Check database saving
- Reload config

---

**Related:** [Dynamic Matchmaking](dynamic-matchmaking.md) · [Battle Formats](battle-formats.md) · [Configuration](../configuration/config.md)
