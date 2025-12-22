# Placeholder API

Use CobbleRanked data in other plugins.

---

## Overview

CobbleRanked provides placeholders for displaying player stats in scoreboards, tab lists, and other plugins.

---

## Requirements

- Text Placeholder API (Fabric)
- A plugin that uses placeholders (e.g., scoreboard plugin)

---

## Available Placeholders

### Player Stats

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_elo_singles%` | Player's Singles Elo |
| `%cobbleranked_elo_doubles%` | Player's Doubles Elo |
| `%cobbleranked_elo_triples%` | Player's Triples Elo |
| `%cobbleranked_wins_singles%` | Singles wins |
| `%cobbleranked_wins_doubles%` | Doubles wins |
| `%cobbleranked_losses_singles%` | Singles losses |
| `%cobbleranked_losses_doubles%` | Doubles losses |
| `%cobbleranked_winrate_singles%` | Singles win rate (%) |
| `%cobbleranked_winrate_doubles%` | Doubles win rate (%) |
| `%cobbleranked_rank_singles%` | Singles leaderboard rank |
| `%cobbleranked_rank_doubles%` | Doubles leaderboard rank |
| `%cobbleranked_tier_singles%` | Singles rank tier name |
| `%cobbleranked_tier_doubles%` | Doubles rank tier name |
| `%cobbleranked_streak%` | Current win streak |
| `%cobbleranked_matches%` | Total matches played |

### Leaderboard

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_1_singles%` | #1 Singles player name |
| `%cobbleranked_top_1_singles_elo%` | #1 Singles player Elo |
| `%cobbleranked_top_2_singles%` | #2 Singles player name |
| `%cobbleranked_top_2_singles_elo%` | #2 Singles player Elo |
| ... | Up to top 100 |
| `%cobbleranked_top_1_doubles%` | #1 Doubles player name |
| `%cobbleranked_top_1_doubles_elo%` | #1 Doubles player Elo |

### Season

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_season_name%` | Current season name |
| `%cobbleranked_season_days_remaining%` | Days until season ends |
| `%cobbleranked_season_end_date%` | Season end date |

---

## Usage Examples

### Scoreboard

```yaml
# Example scoreboard plugin config
lines:
  - "&6&lRanked Stats"
  - "&7Singles: &f%cobbleranked_elo_singles%"
  - "&7Rank: &f#%cobbleranked_rank_singles%"
  - "&7Tier: &f%cobbleranked_tier_singles%"
  - "&7W/L: &a%cobbleranked_wins_singles%&7/&c%cobbleranked_losses_singles%"
```

### Tab List

```yaml
# Example tab list config
format: "&8[&f%cobbleranked_tier_singles%&8] &7%player_name%"
```

### Chat Format

```yaml
# Example chat format
format: "&8[&e%cobbleranked_elo_singles%&8] &7%player_name%&f: %message%"
```

---

## Refresh Rate

Placeholders are cached and update:

- Player stats: Every 5 seconds
- Leaderboard: Every 30 seconds
- Season info: Every minute

---

## Null Values

If data unavailable, placeholders return:

| Condition | Return Value |
|-----------|--------------|
| No matches played | `0` for numeric, `---` for text |
| Not on leaderboard | `---` |
| No active season | `Off-Season` |

---

## See Also

- [Leaderboards](../features/leaderboards.md) - Ranking system
- [Elo System](../features/elo-system.md) - Rating explanation
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
