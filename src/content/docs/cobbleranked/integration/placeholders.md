---
title: Placeholders
description: Use CobbleRanked stats in other mods.
---


## Requirements

- Text Placeholder API (mod)
- CobbleRanked 2.0+

> **Note:** PlaceholderAPI (PAPI) is a Spigot/Paper plugin and is not supported on Fabric. CobbleRanked uses [Text Placeholder API](https://github.com/Patbox/TextPlaceholderAPI) which is the Fabric equivalent.
>
> A future Arclight version is planned that will support PlaceholderAPI, but functionality will be significantly limited.

## ⚠️ HoloDisplays Compatibility

HoloDisplays v0.26+ **requires colon format** for placeholders.

**Correct:**

```json5
"lines": [
  "§eELO: %cobbleranked:singles_elo%"
]
```

**Incorrect (will not work):**

```json5
"lines": [
  "§eELO: %cobbleranked_singles_elo%"  // Missing colon
]
```

All placeholders must use the format: `%cobbleranked:<namespace>_<value>%`

---

## Player Stats

Stats are available per format: `singles`, `doubles`, `triples`.

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked:<format>_elo%` | Player's Elo rating |
| `%cobbleranked:<format>_rank%` | Player's rank position |
| `%cobbleranked:<format>_wins%` | Total wins |
| `%cobbleranked:<format>_losses%` | Total losses |
| `%cobbleranked:<format>_games%` | Total games played |
| `%cobbleranked:<format>_winrate%` | Win percentage (e.g., `75.0%`) |
| `%cobbleranked:<format>_tier%` | Tier name (e.g., `Poke Ball`, `Great Ball`) |

### Examples

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked:singles_elo%` | Singles Elo |
| `%cobbleranked:doubles_wins%` | Doubles wins |
| `%cobbleranked:triples_tier%` | Triples tier |

## Season Info

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked:season_name%` | Current season name |
| `%cobbleranked:season_status%` | `active` or `ended` |
| `%cobbleranked:season_remaining%` | Formatted time (e.g., `5 days`) |
| `%cobbleranked:season_remaining_short%` | Short format (e.g., `5d`) |
| `%cobbleranked:season_remaining_days%` | Days remaining |
| `%cobbleranked:season_remaining_hours%` | Hours remaining (0-23) |
| `%cobbleranked:season_remaining_minutes%` | Minutes remaining (0-59) |
| `%cobbleranked:season_end_date%` | End date (`yyyy-MM-dd`) |

## Top Players

Leaderboard placeholders for ranks 1-10.

### Default (Singles)

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked:top_<rank>_name%` | Player name |
| `%cobbleranked:top_<rank>_elo%` | Elo rating |
| `%cobbleranked:top_<rank>_wins%` | Wins |
| `%cobbleranked:top_<rank>_losses%` | Losses |
| `%cobbleranked:top_<rank>_games%` | Total games |
| `%cobbleranked:top_<rank>_winrate%` | Win percentage |

### Format-Specific

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked:top_singles_<rank>_<field>%` | Singles leaderboard |
| `%cobbleranked:top_doubles_<rank>_<field>%` | Doubles leaderboard |
| `%cobbleranked:top_triples_<rank>_<field>%` | Triples leaderboard |

### Top Player Examples

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked:top_1_name%` | #1 Singles player name |
| `%cobbleranked:top_3_elo%` | #3 Singles Elo |
| `%cobbleranked:top_doubles_1_name%` | #1 Doubles player name |
| `%cobbleranked:top_triples_5_winrate%` | #5 Triples winrate |

## Usage Examples

### Scoreboard

```text
ELO: %cobbleranked:singles_elo%
Rank: #%cobbleranked:singles_rank%
W/L: %cobbleranked:singles_wins%/%cobbleranked:singles_losses%
```

### Tab List

```text
[%cobbleranked:singles_elo% ELO] %player%
```

### Leaderboard Display

```text
#1 %cobbleranked:top_1_name% - %cobbleranked:top_1_elo% ELO
#2 %cobbleranked:top_2_name% - %cobbleranked:top_2_elo% ELO
#3 %cobbleranked:top_3_name% - %cobbleranked:top_3_elo% ELO
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
