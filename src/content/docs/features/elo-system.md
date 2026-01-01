---
title: ELO Rating System
description: Your skill, quantified. Beat the best, climb the fastest.
---

Your skill, quantified. Beat the best, climb the fastest.

## How Ratings Work

CobbleRanked uses a proven rating system that rewards skill:

- **Beat a stronger player** → Big ELO gain
- **Beat a weaker player** → Small ELO gain
- **Lose to a stronger player** → Small ELO loss
- **Lose to a weaker player** → Big ELO loss

The system finds your true skill level fast. Upsets are rewarded. Playing it safe yields less.

## Rating Tiers

| ELO | Tier |
|-----|------|
| 2000+ | Master |
| 1800–1999 | Expert |
| 1600–1799 | Veteran |
| 1400–1599 | Skilled |
| 1200–1399 | Intermediate |
| Below 1200 | Beginner |

New players start at **1500 ELO** — right in the middle. Win your way up or fall trying.

## The Math (Simplified)

```
New Rating = Old Rating + K × (Result - Expected)
```

**K-factor** controls volatility. Higher K means bigger swings. Default is 32.

### Example: Even Match

Two 1500-rated players face off. 50/50 odds.

- Winner: 1500 → **1516** (+16)
- Loser: 1500 → **1484** (-16)

### Example: Upset Victory

A 1400 player beats a 1600 player. Big reward for the underdog.

- Underdog: 1400 → **1424** (+24)
- Favorite: 1600 → **1576** (-24)

### Example: Expected Win

A 1700 player beats a 1400 player. Small gains for the favorite.

- Favorite: 1700 → **1705** (+5)
- Underdog: 1400 → **1395** (-5)

## Configuration

```json5
{
  "elo": {
    "defaultElo": 1500,    // Starting rating
    "minElo": 100,         // Floor
    "maxElo": 3000,        // Ceiling
    "kFactor": 32          // Volatility
  }
}
```

### K-Factor Tuning

- **K=16**: Stable ratings, slow progression. Good for established servers.
- **K=32**: Balanced. The default.
- **K=64**: Volatile ratings, fast changes. Good for new servers finding player skill levels.

## Season Resets

Optionally reset all ratings when a new season starts:

```json5
{
  "season": {
    "resetEloOnNewSeason": true,
    "seasonResetElo": 1500
  }
}
```

Everyone starts fresh. New opportunities to claim the top spot.

## Check Your Rating

Open `/ranked` and view your stats. See your ELO, win rate, and ranking across all formats.

---

**Related**: [Ranked Battles](/features/ranked-battles/) | [Leaderboards](/features/leaderboards/) | [Seasons](/features/seasons/)
