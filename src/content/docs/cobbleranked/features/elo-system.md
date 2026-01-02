---
title: ELO Rating System
description: Your skill, quantified. Beat the best, climb the fastest.
---

## How Ratings Work

CobbleRanked uses a proven rating system that rewards skill:

- **Beat a stronger player** → Big ELO gain
- **Beat a weaker player** → Small ELO gain
- **Lose to a stronger player** → Small ELO loss
- **Lose to a weaker player** → Big ELO loss

The system finds your true skill level fast. Upsets are rewarded. Playing it safe yields less.

## Rating Systems

CobbleRanked supports two rating algorithms:

### Pokemon Showdown (Default)

The same system used by Pokemon Showdown. Features dynamic K-factors based on your rating and experience level.

### Glicko-2

A more advanced system that tracks rating uncertainty. Better for servers with irregular play patterns.

## Rank Tiers

| ELO | Tier |
|-----|------|
| 2100+ | Cherish Ball |
| 1900-2099 | Beast Ball |
| 1700-1899 | Master Ball |
| 1500-1699 | Ultra Ball |
| 1300-1499 | Great Ball |
| Below 1300 | Poke Ball |

New players start at **1500 ELO** — right in the middle. Win your way up or fall trying.

## K-Factor Bands

The K-factor controls how much your rating changes per match. CobbleRanked uses dynamic K-factors:

| ELO Range | K-Factor | Effect |
|-----------|----------|--------|
| New players (first 30 games) | 50 | Fast calibration |
| Below 1100 | 40 | Larger swings |
| 1100-1299 | 32 | Moderate changes |
| 1300-1599 | 24 | Balanced |
| 1600-1999 | 16 | Stable ratings |
| 2000+ | 12 | Very stable |

Higher K-factor means bigger rating changes. New players calibrate quickly, while established players have stable ratings.

## The Math (Simplified)

```
New Rating = Old Rating + K × (Result - Expected)
```

### Example: Even Match

Two 1500-rated players face off. 50/50 odds.

- Winner: 1500 → **1512** (+12, K=24)
- Loser: 1500 → **1488** (-12)

### Example: Upset Victory

A 1400 player beats a 1600 player. Big reward for the underdog.

- Underdog: 1400 → **1424** (+24)
- Favorite: 1600 → **1592** (-8)

### Example: Expected Win

A 1700 player beats a 1400 player. Small gains for the favorite.

- Favorite: 1700 → **1704** (+4)
- Underdog: 1400 → **1392** (-8)

## Configuration

```yaml
# elo.yaml
ratingSystem: POKEMON_SHOWDOWN  # or GLICKO2

startingElo: 1000
floorElo: 1000

pokemonShowdown:
  newPlayerGames: 30
  newPlayerKFactor: 50
  kFactorBands:
    - maxElo: 1100
      kFactor: 40
    - maxElo: 1300
      kFactor: 32
    - maxElo: 1600
      kFactor: 24
    - maxElo: 2000
      kFactor: 16
    - maxElo: 999999
      kFactor: 12

glicko2:
  startingRD: 150.0
  startingVolatility: 0.06
  systemConstant: 0.5
  rdDecayDays: 30
  maxRatingChange: 100

rankTiers:
  - name: "POKEBALL"
    displayName: "Poké Ball"
    minElo: 0
  - name: "GREATBALL"
    displayName: "Great Ball"
    minElo: 1300
  - name: "ULTRABALL"
    displayName: "Ultra Ball"
    minElo: 1500
  - name: "MASTERBALL"
    displayName: "Master Ball"
    minElo: 1700
  - name: "BEASTBALL"
    displayName: "Beast Ball"
    minElo: 1900
  - name: "CHERISH"
    displayName: "Cherish Ball"
    minElo: 2100
```

### Key Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `startingElo` | `1000` | Starting rating for new players |
| `floorElo` | `1000` | Minimum possible rating |
| `newPlayerGames` | `30` | Games before K-factor normalizes |
| `newPlayerKFactor` | `50` | K-factor for new players |

## Season Resets

Optionally reset ratings when a new season starts:

```yaml
# season.yaml
onSeasonEnd:
  resetElo: false        # Hard reset to starting ELO
  softResetElo: true     # Partial reset
  softResetFactor: 0.5   # How much to reset (0.5 = halfway to starting)
```

**Soft reset example**: A 1800 player with factor 0.5 resets to 1650 (halfway between 1800 and 1500).

## Check Your Rating

Open `/ranked` and view your stats. See your ELO, win rate, and ranking across all formats.

---

**Related**: [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) | [Leaderboards](/docs/cobbleranked/features/leaderboards/) | [Seasons](/docs/cobbleranked/features/seasons/)
