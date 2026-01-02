---
title: Placeholders
description: Use CobbleRanked stats in other mods.
---

Display CobbleRanked stats using Text Placeholder API.

## Requirements

- Text Placeholder API (mod)
- CobbleRanked 2.0+

> **Note:** PlaceholderAPI (PAPI) is a Spigot/Paper plugin and is not supported on Fabric. CobbleRanked uses [Text Placeholder API](https://github.com/Patbox/TextPlaceholderAPI) which is the Fabric equivalent.
>
> A future Arclight version is planned that will support PlaceholderAPI, but functionality will be significantly limited.

## Player Stats

Stats are available per format: `singles`, `doubles`, `triples`.

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_<format>_elo%` | Player's Elo rating |
| `%cobbleranked_<format>_rank%` | Player's rank position |
| `%cobbleranked_<format>_wins%` | Total wins |
| `%cobbleranked_<format>_losses%` | Total losses |
| `%cobbleranked_<format>_games%` | Total games played |
| `%cobbleranked_<format>_winrate%` | Win percentage (e.g., `75.0%`) |
| `%cobbleranked_<format>_tier%` | Tier name (e.g., `Gold`, `Diamond`) |

### Examples

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_singles_elo%` | Singles Elo |
| `%cobbleranked_doubles_wins%` | Doubles wins |
| `%cobbleranked_triples_tier%` | Triples tier |

## Season Info

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_season_name%` | Current season name |
| `%cobbleranked_season_status%` | `active` or `ended` |
| `%cobbleranked_season_remaining%` | Formatted time (e.g., `5 days`) |
| `%cobbleranked_season_remaining_short%` | Short format (e.g., `5d`) |
| `%cobbleranked_season_remaining_days%` | Days remaining |
| `%cobbleranked_season_remaining_hours%` | Hours remaining (0-23) |
| `%cobbleranked_season_remaining_minutes%` | Minutes remaining (0-59) |
| `%cobbleranked_season_end_date%` | End date (`yyyy-MM-dd`) |

## Top Players

Leaderboard placeholders for ranks 1-10.

### Default (Singles)

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_<rank>_name%` | Player name |
| `%cobbleranked_top_<rank>_elo%` | Elo rating |
| `%cobbleranked_top_<rank>_wins%` | Wins |
| `%cobbleranked_top_<rank>_losses%` | Losses |
| `%cobbleranked_top_<rank>_games%` | Total games |
| `%cobbleranked_top_<rank>_winrate%` | Win percentage |

### Format-Specific

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_singles_<rank>_<field>%` | Singles leaderboard |
| `%cobbleranked_top_doubles_<rank>_<field>%` | Doubles leaderboard |
| `%cobbleranked_top_triples_<rank>_<field>%` | Triples leaderboard |

### Top Player Examples

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_1_name%` | #1 Singles player name |
| `%cobbleranked_top_3_elo%` | #3 Singles Elo |
| `%cobbleranked_top_doubles_1_name%` | #1 Doubles player name |
| `%cobbleranked_top_triples_5_winrate%` | #5 Triples winrate |

## Usage Examples

### Scoreboard

```text
ELO: %cobbleranked_singles_elo%
Rank: #%cobbleranked_singles_rank%
W/L: %cobbleranked_singles_wins%/%cobbleranked_singles_losses%
```

### Tab List

```text
[%cobbleranked_singles_elo% ELO] %player%
```

### Leaderboard Display

```text
#1 %cobbleranked_top_1_name% - %cobbleranked_top_1_elo% ELO
#2 %cobbleranked_top_2_name% - %cobbleranked_top_2_elo% ELO
#3 %cobbleranked_top_3_name% - %cobbleranked_top_3_elo% ELO
```

## Cache

Placeholders are cached for 60 seconds for performance. Clear cache if needed:

```bash
/rankedadmin placeholder clear
```

## Without Placeholder API

If Text Placeholder API is not installed, placeholders won't work in external mods. Internal GUI placeholders still function normally.

---

## See Also

- [GUI Customization](/docs/cobbleranked/configuration/gui/) - Internal placeholders
- [Language Configuration](/docs/cobbleranked/configuration/languages/) - Message placeholders
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
