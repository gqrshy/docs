---
title: Placeholders
description: Use CobbleRanked stats in other mods.
---

Display CobbleRanked stats using Text Placeholder API.

## Requirements

- Text Placeholder API (mod)
- CobbleRanked 2.0+

## Available Placeholders

### Player Stats

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_elo_singles%` | Singles ELO |
| `%cobbleranked_elo_doubles%` | Doubles ELO |
| `%cobbleranked_elo_triples%` | Triples ELO |
| `%cobbleranked_rank_singles%` | Singles rank |
| `%cobbleranked_rank_doubles%` | Doubles rank |
| `%cobbleranked_rank_triples%` | Triples rank |
| `%cobbleranked_wins%` | Total wins |
| `%cobbleranked_losses%` | Total losses |
| `%cobbleranked_winrate%` | Win percentage |

### Season Info

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_season%` | Current season name |
| `%cobbleranked_season_end%` | Season end date |

## Usage Examples

### Scoreboard

```
Top ELO: %cobbleranked_elo_singles%
Rank: #%cobbleranked_rank_singles%
W/L: %cobbleranked_wins%/%cobbleranked_losses%
```

### Tab List

```
[%cobbleranked_elo_singles% ELO] %player%
```

### Chat Format

```
[Rank #%cobbleranked_rank_singles%] %player%: %message%
```

## Testing Placeholders

Admin command to test:

```
/rankedadmin placeholder test %cobbleranked_elo_singles%
```

List all available:

```
/rankedadmin placeholder list
```

## Cache

Placeholders are cached for performance. Clear cache if needed:

```
/rankedadmin placeholder clear
```

## Without Placeholder API

If Text Placeholder API is not installed, placeholders won't work in external mods. Internal GUI placeholders still function normally.
