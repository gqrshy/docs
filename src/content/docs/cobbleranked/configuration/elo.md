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
floorElo: 0
```

| Setting | Default | Description |
|---------|---------|-------------|
| `ratingSystem` | `POKEMON_SHOWDOWN` | Rating algorithm to use |
| `startingElo` | `1000` | Rating for new players |
| `floorElo` | `0` | Minimum possible rating (no floor) |

## Pokemon Showdown Mode (Default)

Uses the classic Elo formula with **K-Factor** adjustments. This is the same system used by Pokemon Showdown and chess.

```yaml
# elo.yaml
pokemonShowdown:
  newPlayerGames: 10
  newPlayerKFactor: 35
  kFactorBands:
    - maxElo: 1100
      kFactor: 30
    - maxElo: 1300
      kFactor: 25
    - maxElo: 1600
      kFactor: 20
    - maxElo: 2000
      kFactor: 16
    - maxElo: 999999
      kFactor: 12
  streakBonus:
    enabled: true
    threshold3Wins: 3
    threshold5Wins: 5
```

<details>
<summary><strong>Understanding K-Factor</strong></summary>

**K-Factor** determines how much your rating changes after each match. Higher K-Factor = bigger rating swings.

**How it works:**
- **K-Factor 35**: Win against equal opponent → gain ~17 points
- **K-Factor 25**: Win against equal opponent → gain ~12 points
- **K-Factor 12**: Win against equal opponent → gain ~6 points

**Why variable K-Factor?**

| Player Type | K-Factor | Reason |
|-------------|----------|--------|
| New players (< 10 games) | 35 | Quickly find true skill level |
| Low rating (< 1100) | 30 | Easier to climb out |
| Mid rating (1100-1300) | 25 | Balanced progression |
| Mid-high rating (1300-1600) | 20 | More stable |
| High rating (1600-2000) | 16 | Stable rankings |
| Top rating (2000+) | 12 | Very stable, small changes |

**Example scenario:**
- Player A (1500 ELO, K=20) beats Player B (1500 ELO, K=20)
- Both have equal 50% expected win rate
- Player A gains: 20 × (1 - 0.5) = **+10 ELO**
- Player B loses: 20 × (0 - 0.5) = **-10 ELO**

</details>

<details>
<summary><strong>Win Streak Bonus</strong></summary>

Players on winning streaks receive a K-Factor boost, making it easier to climb when playing well:

```yaml
streakBonus:
  enabled: true
  threshold3Wins: 3   # +3 K-Factor after 3 wins
  threshold5Wins: 5   # +5 K-Factor after 5+ wins
```

| Win Streak | K-Factor Bonus |
|------------|----------------|
| 3 wins | +3 |
| 5+ wins | +5 |

**Example:**
- Player on 5-win streak with K=20 gets effective K=25
- Win against equal opponent: gain ~12.5 instead of ~10

This rewards consistent performance while keeping the system fair.

</details>

<details>
<summary><strong>K-Factor Bands Explained</strong></summary>

K-Factor Bands assign different K-Factors based on current rating:

```yaml
kFactorBands:
  - maxElo: 1100    # Players below 1100 use K=30
    kFactor: 30
  - maxElo: 1300    # Players 1100-1299 use K=25
    kFactor: 25
  - maxElo: 1600    # Players 1300-1599 use K=20
    kFactor: 20
  - maxElo: 2000    # Players 1600-1999 use K=16
    kFactor: 16
  - maxElo: 999999  # Players 2000+ use K=12
    kFactor: 12
```

**Reading the bands:**
- `maxElo: 1100, kFactor: 30` means "if rating < 1100, use K=30"
- The system checks bands in order, using the first match

**Customization tips:**
- Lower K-Factors at top = more stable leaderboard
- Higher K-Factors overall = faster climbing, more volatility
- Wider bands = simpler system, narrower = more granular control

</details>

<details>
<summary><strong>New Player Settings</strong></summary>

New players get boosted K-Factor to quickly find their true skill level:

| Setting | Default | Description |
|---------|---------|-------------|
| `newPlayerGames` | `10` | Games before considered "established" (industry standard) |
| `newPlayerKFactor` | `35` | K-Factor for new players (balanced for fairer matchmaking) |

**How it works:**
1. Player joins with `startingElo` (e.g., 1000)
2. First 10 games use K=35 (moderate rating swings)
3. After 10 games, K-Factor determined by `kFactorBands`

**Tuning tips:**
- Increase `newPlayerGames` if rankings feel unstable
- Decrease `newPlayerKFactor` if new players climb too fast

</details>

## Glicko-2 Mode (Advanced)

More sophisticated system that tracks rating uncertainty. Better for infrequent players.

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

<details>
<summary><strong>Glicko-2 Settings Explained</strong></summary>

| Setting | Default | Description |
|---------|---------|-------------|
| `startingRD` | `150.0` | Rating Deviation - uncertainty in rating |
| `startingVolatility` | `0.06` | How much rating is expected to fluctuate |
| `systemConstant` | `0.5` | Controls volatility changes (0.3-1.2 recommended) |
| `rdDecayDays` | `30` | Days of inactivity before RD increases |
| `maxRatingChange` | `100` | Maximum rating change per match |

**When to use Glicko-2:**
- Players have varying activity levels
- You want more accurate matchmaking for returning players
- You prefer a more mathematically rigorous system

**When to use Pokemon Showdown:**
- Simpler to understand for players
- More predictable rating changes
- Better for active, consistent player bases

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

> 📝 These are **display only** - they don't affect matchmaking or rewards. Use [LuckPerms Integration](../integration/luckperms/) for rank-based permissions.

---

## See Also

- [Main Configuration](config/) - Basic settings
- [Matchmaking Settings](matchmaking/) - ELO range configuration
- [Season Settings](season/) - Season reset behavior
- [ELO System Feature](../features/elo-system/) - Player-facing guide
