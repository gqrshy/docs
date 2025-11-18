# Battle Formats

Independent rankings for Singles, Doubles, and Multi (2v2 Singles) formats.

---

## Overview

Each battle format has:
- **Separate Elo ratings**
- **Independent leaderboards**
- **Format-specific stats** (wins, losses, matches)
- **Separate queues**

**Winning in Singles doesn't affect your Doubles Elo.**

---

## Available Formats

### Competitive Formats

| Format | Description | Team Size | Party Size | Ranked |
|--------|-------------|-----------|------------|--------|
| **SINGLES** | 1v1 battles | 3-6 Pokemon | 1 player | ✅ |
| **DOUBLES** | 2v2 battles | 4-6 Pokemon | 1 player | ✅ |
| **TRIPLES** | 3v3 battles | 5-6 Pokemon | 1 player | ✅ |
| **MULTI** | 2v2 team battles | 1-3 Pokemon each | 2 players | ✅ |

### Random Battle Formats

| Format | Description | Team Size | Generation | Ranked |
|--------|-------------|-----------|------------|--------|
| **RANDOM_SINGLES** | Random 1v1 | 6 Pokemon (auto) | Pool-based | ✅ |
| **RANDOM_DOUBLES** | Random 2v2 | 6 Pokemon (auto) | Pool-based | ✅ |
| **RANDOM_3V3** | Quick random | 3 Pokemon (auto) | Pool-based | ✅ |

---

## Singles

Traditional 1v1 Pokemon battles.

**Rules:**
- Bring 3-6 Pokemon
- 1v1 format
- Select lead Pokemon before battle

**Example:** Player A vs Player B (solo)

---

## Doubles

1 player controls 2 Pokemon simultaneously.

**Rules:**
- Bring 4-6 Pokemon
- Both Pokemon on field at once
- Select 2 leads before battle

**Example:** Player A (2 Pokemon) vs Player B (2 Pokemon)

---

## Multi (2v2 Singles)

Team battles - 2 players vs 2 players.

**Rules:**
- Each player brings 1-3 Pokemon
- Partners must be in same party
- Both players select leads

**Example:** Party (Player A + Player B) vs Party (Player C + Player D)

### How to Queue

1. Form party with partner
2. Both players open `/ranked` GUI
3. Select "Multi" format
4. Both must click queue

**Matchmaking:** System pairs two parties with similar combined Elo.

---

## Format Selection

Players choose format before queuing:

1. Open `/ranked` GUI
2. Click format selection (Singles/Doubles/Multi)
3. Click "Join Queue"

---

## Independent Stats

Each format tracks separately:

| Stat | Per Format |
|------|-----------|
| Elo Rating | ✅ |
| Wins | ✅ |
| Losses | ✅ |
| Win Streak | ✅ |
| Total Matches | ✅ |

**Example:**
- Singles: 1500 Elo, 50 wins, 30 losses
- Doubles: 1000 Elo, 5 wins, 5 losses
- Multi: 1200 Elo, 20 wins, 15 losses

---

## Leaderboards

Each format has separate leaderboard.

**Access:**
1. `/ranked` GUI
2. Click "Leaderboards"
3. Select format

**Display:**
- Top players by Elo
- Format-specific rankings
- Filter by Singles/Doubles/Multi

---

## Rewards

Season and milestone rewards can be format-specific.

**Example:**
```json5
{
  "season_rewards": {
    "singles": { /* Singles rewards */ },
    "doubles": { /* Doubles rewards */ }
  }
}
```

Players can earn rewards in **all formats**.

See [Rewards System](../configuration/rewards.md) for configuration.

---

## Configuration

### Team Size Limits

`config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,
      "max_team_size": 3
    }
  }
}
```

---

**Related:** [Dynamic Matchmaking](dynamic-matchmaking.md) · [Elo System](elo-system.md) · [Rewards](../configuration/rewards.md)
