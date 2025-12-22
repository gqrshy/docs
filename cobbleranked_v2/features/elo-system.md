# Elo Rating System

How player ratings are calculated and managed.

---

## Overview

CobbleRanked uses Elo-based rating systems to measure player skill. Two algorithms are available:

| System | Description | Recommendation |
|--------|-------------|----------------|
| **Pokemon Showdown** | K-factor based | Recommended for most servers |
| Glicko-2 | Rating deviation based | Large competitive servers |

---

## Pokemon Showdown Mode

### How It Works

The Pokemon Showdown system uses K-factor based calculations:

1. Calculate expected win probability
2. Compare actual result to expected
3. Adjust rating based on K-factor

### Expected Win Probability

```
E = 1 / (1 + 10^((opponent_elo - your_elo) / 400))
```

**Example:**
- Your Elo: 1500
- Opponent Elo: 1600
- Expected: 36% win chance

### Elo Change Formula

```
New Elo = Old Elo + K × (Result - Expected)
```

Where:
- Result = 1 (win), 0.5 (draw), 0 (loss)
- K = K-factor based on player's Elo band

### K-Factor Bands

Different K-factors for different skill levels:

| Elo Range | K-Factor | Rating Volatility |
|-----------|----------|-------------------|
| New players (< 30 games) | 50 | Very high |
| 0 - 1100 | 40 | High |
| 1101 - 1300 | 32 | Medium-high |
| 1301 - 1600 | 24 | Medium |
| 1601 - 2000 | 16 | Low |
| 2001+ | 12 | Very low |

### Example Calculations

**Close match (same Elo):**
```
You: 1500 Elo, K=24
Opponent: 1500 Elo
Expected: 50%

Win:  1500 + 24 × (1 - 0.5) = 1512 (+12)
Loss: 1500 + 24 × (0 - 0.5) = 1488 (-12)
```

**Upset win (lower beats higher):**
```
You: 1400 Elo, K=32
Opponent: 1600 Elo
Expected: 24%

Win: 1400 + 32 × (1 - 0.24) = 1424 (+24)
```

**Expected win (higher beats lower):**
```
You: 1600 Elo, K=16
Opponent: 1400 Elo
Expected: 76%

Win: 1600 + 16 × (1 - 0.76) = 1604 (+4)
```

---

## Glicko-2 Mode

### How It Works

Glicko-2 adds uncertainty tracking through Rating Deviation (RD):

- High RD = uncertain rating, larger changes
- Low RD = confident rating, smaller changes
- RD increases with inactivity

### Key Concepts

| Term | Description |
|------|-------------|
| Rating | Skill level (similar to Elo) |
| RD | Rating Deviation (uncertainty) |
| Volatility | How much rating varies |

### When to Use

Glicko-2 is better for:
- Large player bases (100+ active players)
- Servers with variable activity
- Players who take breaks

---

## Rank Tiers

Cosmetic ranks based on Elo:

| Tier | Elo Range | Description |
|------|-----------|-------------|
| Poke Ball | 0 - 1299 | Beginner |
| Great Ball | 1300 - 1499 | Intermediate |
| Ultra Ball | 1500 - 1699 | Advanced |
| Master Ball | 1700 - 1899 | Expert |
| Beast Ball | 1900 - 2099 | Elite |
| Cherish Ball | 2100+ | Champion |

---

## Floor Elo

Minimum Elo prevents going too low:

```yaml
# elo.yaml
floorElo: 1000  # Cannot go below 1000
```

---

## Season Reset

At season end, Elo can be reset:

### Full Reset
```yaml
onSeasonEnd:
  resetElo: true  # Everyone starts at startingElo
```

### Soft Reset
```yaml
onSeasonEnd:
  softResetElo: true
  softResetFactor: 0.5  # 50% toward starting Elo
```

**Soft reset formula:**
```
New Elo = Current + (Starting - Current) × Factor
```

**Example with factor 0.5:**
- 1800 → 1650 (pulled down toward 1500)
- 1200 → 1350 (pulled up toward 1500)

---

## Daily Elo Limit

Prevent excessive grinding:

```yaml
# battle.yaml
dailyLimits:
  eloGainLimit: 200  # Max +200 Elo per day
```

Set to `-1` for unlimited.

---

## Admin Commands

Manually adjust Elo:

```bash
# Set specific Elo
/rankedadmin setelo Steve SINGLES 1500

# Add Elo
/rankedadmin addelo 100 Steve SINGLES

# Remove Elo
/rankedadmin removeelo 100 Steve SINGLES
```

---

## Configuration

Full configuration in `elo.yaml`:

```yaml
ratingSystem: POKEMON_SHOWDOWN
startingElo: 1500
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
```

**See:** [Elo Configuration](../configuration/elo.md)

---

## See Also

- [Elo Configuration](../configuration/elo.md) - Full settings
- [Ranked Battles](ranked-battles.md) - Battle flow
- [Leaderboards](leaderboards.md) - Rankings
- [Seasons](../configuration/seasons.md) - Season resets
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
