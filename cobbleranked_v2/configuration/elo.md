# Elo Configuration

Complete reference for `config/cobbleranked/elo.yaml`.

---

## Overview

The Elo configuration controls the rating system and rank tiers.

---

## Rating System

Choose between two rating algorithms:

```yaml
ratingSystem: POKEMON_SHOWDOWN  # or GLICKO2
```

| System | Description | Recommendation |
|--------|-------------|----------------|
| **POKEMON_SHOWDOWN** | K-factor based, similar to Pokemon Showdown | Recommended |
| GLICKO2 | Rating deviation based, handles uncertainty | Advanced servers |

---

## Basic Settings

```yaml
startingElo: 1000   # New player starting rating
floorElo: 1000      # Minimum possible rating
```

---

## Pokemon Showdown Mode

K-factor based calculation with bands:

```yaml
pokemonShowdown:
  newPlayerGames: 30      # Games until fully established
  newPlayerKFactor: 50    # K-factor for new players

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

### K-Factor Explained

K-factor determines how much Elo changes per match:
- Higher K = larger swings (faster rating changes)
- Lower K = smaller swings (more stable ratings)

**Example calculation:**
```
Player A (1200) vs Player B (1200)
Expected win chance: 50%

If Player A wins:
  K=32: A gains 16, B loses 16
  K=16: A gains 8, B loses 8
```

### K-Factor Bands

Players at different Elo have different K-factors:

| Elo Range | K-Factor | Rating Volatility |
|-----------|----------|-------------------|
| 0 - 1100 | 40 | High (climb quickly) |
| 1101 - 1300 | 32 | Medium-high |
| 1301 - 1600 | 24 | Medium |
| 1601 - 2000 | 16 | Low (stable) |
| 2001+ | 12 | Very low (elite) |

---

## Glicko-2 Mode

Rating deviation based system for advanced servers:

```yaml
glicko2:
  startingRD: 150.0           # Initial rating deviation
  startingVolatility: 0.06    # Initial volatility
  systemConstant: 0.5         # System constant (tau)
  rdDecayDays: 30             # Days before RD increases
  maxRatingChange: 100        # Maximum rating change per match
```

### Glicko-2 Explained

Glicko-2 uses Rating Deviation (RD) to track uncertainty:
- New players: High RD → larger rating changes
- Active players: Low RD → smaller changes
- Inactive players: RD increases over time

| Setting | Description |
|---------|-------------|
| `startingRD` | Initial uncertainty (higher = more volatile) |
| `startingVolatility` | How much RD changes per game |
| `systemConstant` | Controls volatility changes (0.3-1.2 typical) |
| `rdDecayDays` | Days of inactivity before RD starts increasing |
| `maxRatingChange` | Cap on single-match rating change |

---

## Rank Tiers

Cosmetic rank names based on Elo:

```yaml
rankTiers:
  - name: "POKEBALL"
    displayName: "Poke Ball"
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

### Default Tier Distribution

| Tier | Elo Range | Expected % |
|------|-----------|------------|
| Poke Ball | 0 - 1299 | ~30% |
| Great Ball | 1300 - 1499 | ~25% |
| Ultra Ball | 1500 - 1699 | ~25% |
| Master Ball | 1700 - 1899 | ~12% |
| Beast Ball | 1900 - 2099 | ~5% |
| Cherish Ball | 2100+ | ~3% |

### Custom Tiers

Create your own tier system:

```yaml
rankTiers:
  - name: "ROOKIE"
    displayName: "Rookie"
    minElo: 0

  - name: "TRAINER"
    displayName: "Trainer"
    minElo: 1400

  - name: "EXPERT"
    displayName: "Expert"
    minElo: 1600

  - name: "MASTER"
    displayName: "Master"
    minElo: 1800

  - name: "CHAMPION"
    displayName: "Champion"
    minElo: 2000
```

---

## Configuration Examples

<details>
<summary><strong>Competitive Server</strong></summary>

```yaml
ratingSystem: POKEMON_SHOWDOWN
startingElo: 1000
floorElo: 1000

pokemonShowdown:
  newPlayerGames: 50
  newPlayerKFactor: 40
  kFactorBands:
    - maxElo: 1200
      kFactor: 32
    - maxElo: 1500
      kFactor: 24
    - maxElo: 1800
      kFactor: 16
    - maxElo: 999999
      kFactor: 12
```

</details>

<details>
<summary><strong>Casual Server (Faster Changes)</strong></summary>

```yaml
ratingSystem: POKEMON_SHOWDOWN
startingElo: 1000
floorElo: 1000

pokemonShowdown:
  newPlayerGames: 10
  newPlayerKFactor: 64
  kFactorBands:
    - maxElo: 999999
      kFactor: 40
```

</details>

<details>
<summary><strong>Large Server (Glicko-2)</strong></summary>

```yaml
ratingSystem: GLICKO2
startingElo: 1000
floorElo: 1000

glicko2:
  startingRD: 150.0
  startingVolatility: 0.06
  systemConstant: 0.5
  rdDecayDays: 14
  maxRatingChange: 75
```

</details>

---

## Full Example

<details>
<summary><strong>Complete elo.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Elo Rating Configuration

ratingSystem: POKEMON_SHOWDOWN

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
    displayName: "Poke Ball"
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

</details>

---

## See Also

- [Elo System](../features/elo-system.md) - Detailed explanation
- [Rewards](rewards.md) - Tier rewards
- [Seasons](seasons.md) - Season reset behavior
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
