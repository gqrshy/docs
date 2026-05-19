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
    - maxElo: 1500
      kFactor: 48
    - maxElo: 1700
      kFactor: 36
    - maxElo: 2000
      kFactor: 24
    - maxElo: 2500
      kFactor: 18
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
| Low rating (< 1500) | 48 | Easier to climb out |
| Mid rating (1500-1700) | 36 | Balanced progression |
| Mid-high (1700-2000) | 24 | More stable |
| High (2000-2500) | 18 | Stable rankings |
| Top (2500+) | 12 | Very stable, small changes |

**Example:**
- Player A (1800 ELO, K=24) beats Player B (1800 ELO, K=24)
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

Inactive players lose ELO over time to keep the leaderboard competitive. Forces high-rated players to stay active to maintain their ranking. Inspired by Pokemon Showdown, Chess (FIDE), and League of Legends systems.

```yaml
# elo.yaml
eloDecay:
  enabled: false
  thresholdDays: 7        # Days before decay starts
  minimumElo: 1500        # Must be above this to decay
  decayPerDay: 10         # ELO lost per full day
  checkIntervalHours: 6   # How often to check
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable/disable ELO decay |
| `thresholdDays` | `7` | Days of inactivity before decay starts |
| `minimumElo` | `1500` | Only players above this ELO decay |
| `decayPerDay` | `10` | ELO lost per **full day** of inactivity |
| `checkIntervalHours` | `6` | How often the decay task runs |

> **Note**: Decay stops at the top-level `floorElo` setting (default: 1000).

### How Decay Works

1. Players **above** `minimumElo` who haven't played in `thresholdDays` days start decaying
2. Every full day of inactivity = `decayPerDay` ELO lost
3. Decay stops when player reaches `floorElo`
4. Playing **any** ranked match resets the inactivity timer

**Example:**
- Player has 1800 ELO
- Config: `minimumElo: 1500`, `decayPerDay: 10`, `floorElo: 1000` (top-level setting)
- Player doesn't play for 20 days
- Decay starts after 7 days = 13 days of decay
- ELO loss: 13 × 10 = 130 ELO
- Final ELO: 1800 - 130 = **1670**

<details>
<summary><strong>Cross-Server Setup</strong></summary>

For multi-server networks, the decay task runs on **one server only** using a Redis lock. This prevents duplicate ELO reductions across your network.

**Requirements:**
- Redis enabled in [`cross-server.yaml`](/docs/cobbleranked/advanced/cross-server/)
- All servers share the same database

**No extra configuration needed** — the lock is automatic when Redis is enabled.

</details>

<details>
<summary><strong>Database Schema</strong></summary>

ELO decay requires tracking last match time per player per format.

**SQLite/MySQL:** `last_match_at` column in `format_stats` table
```sql
-- Auto-created on startup
ALTER TABLE format_stats ADD COLUMN last_match_at BIGINT;
```

**MongoDB:** `last_match_at` field in `format_stats` documents (automatic)

</details>

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

> 📝 Tiers affect display and [rank rewards](/docs/cobbleranked/configuration/rewards/) only — they don't change matchmaking. Use [LuckPerms Integration](/docs/cobbleranked/integration/luckperms/) for rank-based permissions.

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - Basic settings
- [Matchmaking Settings](/docs/cobbleranked/configuration/matchmaking/) - ELO range configuration
- [Season Settings](/docs/cobbleranked/configuration/season/) - Season reset behavior
- [ELO System Feature](/docs/cobbleranked/features/elo-system/) - Player-facing guide
