# Leaderboards

View top players and rankings.

---

## Overview

Leaderboards display the top players for each battle format, ranked by Elo rating.

---

## Viewing Leaderboards

Open leaderboards via GUI:

```bash
/ranked
```

1. Click "Leaderboard" button
2. Select format (Singles/Doubles/Triples)
3. Browse player rankings

---

## Leaderboard Information

Each entry shows:

- **Rank** - Position on leaderboard
- **Player Name** - Username
- **Elo Rating** - Current rating
- **Rank Tier** - Poke Ball, Great Ball, etc.
- **Win/Loss** - Season record
- **Win Rate** - Percentage

---

## Format Separation

Each format has independent leaderboards:

| Format | Leaderboard |
|--------|-------------|
| Singles | Top singles players |
| Doubles | Top doubles players |
| Triples | Top triples players |

Players can be on multiple leaderboards with different ratings.

---

## Leaderboard Size

Configure how many players to display:

```yaml
# battle.yaml
gui:
  leaderboardPageSize: 25  # Players per page
```

Default displays top 100 players.

---

## Season Reset

Leaderboards reset when seasons end:

- Current season rankings cleared
- Previous season archived
- New season starts fresh

**See:** [Seasons](../configuration/seasons.md)

---

## Archive

Past season leaderboards can be preserved:

```yaml
# season.yaml
archive:
  enabled: true
  topPlayersCount: 100  # Keep top 100 per format
```

---

## Placeholder Integration

Display leaderboard data in other plugins:

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_1_singles%` | #1 Singles player name |
| `%cobbleranked_top_1_singles_elo%` | #1 Singles Elo |
| `%cobbleranked_rank_singles%` | Your Singles rank |

**See:** [Placeholder API](../integration/placeholders.md)

---

## See Also

- [Ranked Battles](ranked-battles.md) - Climb the rankings
- [Elo System](elo-system.md) - Rating calculations
- [Seasons](../configuration/seasons.md) - Season management
- [Placeholders](../integration/placeholders.md) - External display
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
