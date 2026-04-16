---
title: ELO Configuration
description: Configure the rating system that determines player rankings.
---

The heart of competitive ranking. Configure how player ratings change after each battle.

## Rating System Selection

```yaml
# elo.yaml
ratingSystem: POKEMON_SHOWDOWN  # or GLICKO2
startingElo: 1000
floorElo: 1000
```

| Setting | Default | Description |
|---------|---------|-------------|
| `ratingSystem` | `POKEMON_SHOWDOWN` | Rating algorithm to use |
| `startingElo` | `1000` | Rating for new players |
| `floorElo` | `1000` | Minimum possible rating |

## Pokemon Showdown Mode (Default)

Uses the classic Elo formula with **K-Factor** adjustments. Same system as Pokemon Showdown and chess.

```yaml
# elo.yaml
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
  streakBonus:
    enabled: false
    threshold3Wins: 3
    threshold5Wins: 5
```

<details>
<summary><strong>K-Factor Bands Explained</strong></summary>

**K-Factor** determines how much rating changes per match. Higher K = bigger swings.

| Player Type | K-Factor | Reason |
|-------------|----------|--------|
| New players (first 30 games) | 50 | Quickly find true skill level |
| Low rating (< 1100) | 40 | Easier to climb out |
| Mid rating (1100-1300) | 32 | Balanced progression |
| Mid-high (1300-1600) | 24 | More stable |
| High (1600-2000) | 16 | Stable rankings |
| Top (2000+) | 12 | Very stable, small changes |

**Example:**
- Player A (1500 ELO, K=24) beats Player B (1500 ELO, K=24)
- Player A gains: 24 × (1 - 0.5) = **+12 ELO**

</details>

<details>
<summary><strong>Win Streak Bonus</strong></summary>

Players on winning streaks receive a K-Factor boost. Disabled by default.

```yaml
streakBonus:
  enabled: false       # Enable to boost K-Factor on streaks
  threshold3Wins: 3    # Bonus equal to this value after 3 wins
  threshold5Wins: 5    # Bonus equal to this value after 5+ wins
```

| Win Streak | K-Factor Bonus |
|------------|----------------|
| 3 wins | +3 |
| 5+ wins | +5 |

</details>

## Glicko-2 Mode (Advanced)

Tracks rating **and** uncertainty (Rating Deviation). Better for servers where players have varying activity.

```yaml
# elo.yaml
ratingSystem: GLICKO2

glicko2:
  startingRD: 150.0
  startingVolatility: 0.06
  systemConstant: 0.5
  rdDecayDays: 30
  maxRatingChange: 100
```

| Setting | Default | Description |
|---------|---------|-------------|
| `startingRD` | `150.0` | Rating Deviation — uncertainty in rating |
| `startingVolatility` | `0.06` | Expected rating fluctuation |
| `systemConstant` | `0.5` | Controls volatility changes (0.3-1.2) |
| `rdDecayDays` | `30` | Days of inactivity before RD increases |
| `maxRatingChange` | `100` | Maximum rating change per match |

<details>
<summary><strong>RD vs K-Factor</strong></summary>

| System | What Changes | How |
|--------|--------------|-----|
| Pokemon Showdown | K-Factor (fixed bands) | Based on rating only |
| Glicko-2 | RD (dynamic per player) | Based on certainty + activity |

**When to use Glicko-2:**
- Players have varying activity levels
- You want more accurate matchmaking for returning players

**When to use Pokemon Showdown:**
- Simpler to understand for players
- More predictable rating changes

</details>

## ELO Decay

Inactive players lose ELO over time to keep the leaderboard competitive. Disabled by default.

```yaml
# elo.yaml
eloDecay:
  enabled: false
  thresholdDays: 14       # Days before decay starts
  minimumElo: 1000        # Won't decay below this
  decayPerDay: 2          # ELO lost per day
  checkIntervalHours: 24  # How often to check
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable/disable ELO decay |
| `thresholdDays` | `14` | Grace period before decay starts |
| `minimumElo` | `1000` | Floor — players won't drop below this |
| `decayPerDay` | `2` | ELO lost per day after threshold |
| `checkIntervalHours` | `24` | How often the decay check runs |

## Rank Tiers

Cosmetic ranks displayed in GUI and leaderboard:

```yaml
# elo.yaml
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

> 📝 These are **display only** - they don't affect matchmaking or rewards. Use [LuckPerms Integration](/docs/cobbleranked/integration/luckperms/) for rank-based permissions.

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - Basic settings
- [Matchmaking Settings](/docs/cobbleranked/configuration/matchmaking/) - ELO range configuration
- [Season Settings](/docs/cobbleranked/configuration/season/) - Season reset behavior
- [ELO System Feature](/docs/cobbleranked/features/elo-system/) - Player-facing guide
