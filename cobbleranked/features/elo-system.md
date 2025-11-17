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

### Examples (Pokemon Showdown mode, K=32)

| Scenario | Your Elo | Opponent | Win Probability | Win | Lose |
|----------|----------|----------|-----------------|-----|------|
| Even match | 1000 | 1000 | 50% | **+16** | -16 |
| Upset win | 900 | 1200 | 24% | **+24** | -8 |
| Expected win | 1200 | 900 | 76% | **+8** | -24 |
| Major upset | 800 | 1400 | 5% | **+30** | -2 |

**Key insights:**
- Even match (50/50): ±16 Elo
- Beating higher-ranked = big gain, small loss risk
- Losing to lower-ranked = big loss, small gain potential
- Total Elo in system stays constant (zero-sum)

> **[📸 IMAGE NEEDED: Elo変動の計算例を示す図解（対戦前後のElo変化、期待勝率と実際の結果）]**

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

> **[📸 IMAGE NEEDED: K因子の違いによるElo変化のグラフ（K=16, 32, 64での変化率比較）]**

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

Most accurate system used by Chess.com and Lichess. Tracks **rating uncertainty (RD)** in addition to rating.

```json5
{
  "eloSystem": {
    "mode": "GLICKO2",
    "glicko2": {
      "initialRating": 1500.0,        // Starting rating (higher than standard Elo)
      "initialRD": 350.0,              // Rating Deviation (uncertainty)
      "initialVolatility": 0.06,       // How erratic rating changes are
      "tau": 0.5,                      // System volatility constraint
      "rdDecayDays": 30                // RD increases if inactive
    }
  }
}
```

**How it works:**
- **Rating (R):** Your skill level (like Elo)
- **Rating Deviation (RD):** Confidence in your rating
  - New player: RD = 350 (uncertain)
  - After 20+ matches: RD ≈ 50-100 (confident)
  - Inactive players: RD increases (uncertainty grows)
- **Volatility (σ):** How consistently you perform

**Rating changes:**
- New players (high RD): **±100 points** per match
- Established players (low RD): **±20-40 points** per match
- Beating uncertain players (high RD): smaller gain
- Beating confident players (low RD): larger gain

> **[📸 IMAGE NEEDED: RD（Rating Deviation）変化の視覚化（試合数に応じたRD減少グラフ、不活動時の増加）]**

**When to use:**
- ✅ Large competitive server (100+ active players)
- ✅ Want fair ratings for returning players
- ✅ Need to account for rating confidence
- ❌ Small casual server (use Pokemon Showdown instead)

---

## Configuration

### K-Factor Guide (Pokemon Showdown Mode)

K-Factor controls how much Elo changes per match. Higher = faster changes.

**Formula:** `Elo change = K × (actual result - expected result)`

| K-Factor | Rating Change | Use Case | Example |
|----------|---------------|----------|---------|
| 16 | ±4 to ±12 | Very stable, top-ranked players only | Chess grandmasters |
| 24 | ±6 to ±18 | Competitive, slower progression | Ranked competitive |
| **32** | **±8 to ±24** | **Standard** | **Pokemon Showdown default** |
| 40 | ±10 to ±30 | Faster progression, casual | Casual competitive |
| 64 | ±16 to ±48 | Very fast (new players only) | First 10 matches |

**Recommendation:**
- **Competitive server:** K = 32 (standard: 64), provisional K = 64
- **Casual server:** K = 40 (standard: 64), provisional K = 80
- **High activity:** Lower K-factor (ratings stabilize faster)
- **Low activity:** Higher K-factor (ratings adjust faster)

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

> **[📸 IMAGE NEEDED: Elo減衰システムの動作例（不活動日数とElo減少の関係グラフ）]**

**Note:** Glicko-2 mode uses RD decay instead (rating stays, uncertainty increases).

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
