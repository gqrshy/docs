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

<details>
<summary><strong>Understanding Rating Deviation (RD)</strong></summary>

**Rating Deviation (RD)** measures how uncertain the system is about a player's true skill level. Unlike Pokemon Showdown's simple ELO, Glicko-2 tracks both rating **and** uncertainty.

### How RD Works

Each player has two values:
- **Rating** - Estimated skill level (like 1500)
- **RD** - Uncertainty in that estimate (like 50)

```
Player A: 1500 ± 50 (high confidence)
Player B: 1500 ± 200 (low confidence, new player)
```

### RD Impact on Matchmaking

| RD Value | Meaning | Matchmaking Impact |
|----------|---------|---------------------|
| **Low (30-50)** | Established skill, high confidence | Precise matchups |
| **Medium (50-100)** | Some uncertainty | Moderate range adjustments |
| **High (100+)** | Very uncertain | Wide ELO range accepted |

When two players match:
- Both with low RD → Normal rating changes
- One with high RD → Larger rating changes to find true skill faster
- Both with high RD → Maximum rating adjustments

### RD Changes Over Time

**After each battle:**
- **RD decreases** (becomes more certain about skill)
- Decrease amount depends on opponent's RD
- Playing against established players (low RD) reduces your RD faster

**During inactivity:**
- **RD increases** over time (less certain about current skill)
- Controlled by `rdDecayDays` setting
- After returning, RD slowly decreases back to normal

### RD vs K-Factor Comparison

| System | What Changes | How |
|--------|--------------|-----|
| Pokemon Showdown | K-Factor (fixed bands) | Based on rating only |
| Glicko-2 | RD (dynamic per player) | Based on certainty + activity |

### Example: RD in Action

```
New Player (1500 ± 150 RD)
├─ Match 1: Wins vs 1400 ± 50 RD
│  → Rating: +30, RD: 150 → 130 (more certain now)
├─ Match 2: Wins vs 1450 ± 40 RD
│  → Rating: +25, RD: 130 → 110
├─ ... 10 matches later ...
└─ Settles at: 1600 ± 40 RD (established)

[Returns after 30 days]
├─ RD increased: 40 → 80 (less certain now)
├─ Match 1: Wins vs 1550 ± 50 RD
│  → Rating: +12, RD: 80 → 72
└─ Slowly returns to low RD with more games
```

### Tuning RD Settings

| Setting | Effect of Increasing |
|---------|---------------------|
| `startingRD` | New players have more uncertainty, larger rating swings |
| `rdDecayDays` | Takes longer for RD to increase during inactivity |
| `systemConstant` | Higher = slower RD changes, lower = faster RD changes |

**Recommendations:**
- **Active servers** (daily players): Lower `rdDecayDays` (7-14)
- **Casual servers** (infrequent players): Higher `rdDecayDays` (30-60)
- **Competitive servers**: Lower `startingRD` (100-120) for faster skill detection

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

> 📝 These are **display only** - they don't affect matchmaking or rewards. Use [LuckPerms Integration](/docs/cobbleranked/integration/luckperms/) for rank-based permissions.

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - Basic settings
- [Matchmaking Settings](/docs/cobbleranked/configuration/matchmaking/) - ELO range configuration
- [Season Settings](/docs/cobbleranked/configuration/season/) - Season reset behavior
- [ELO System Feature](/docs/cobbleranked/features/elo-system/) - Player-facing guide
