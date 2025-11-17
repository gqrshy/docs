# Leaderboards

---
**CobbleRanked** > **Features** > **Leaderboards**
---

View top-ranked players by Elo rating.

## Features

- Format-specific (Singles, Doubles separate)
- Real-time updates after battles
- Top 10 players displayed
- Access via GUI or command

## Viewing Leaderboards

### Via Command

```bash
/leaderboard singles
/leaderboard doubles
```

### Via GUI

1. Open ranked menu: `/ranked`
2. Click "Leaderboard" button
3. Select format (Singles/Doubles)

## Leaderboard Display

Shows for each player:
- Rank position (#1, #2, etc.)
- Player name
- Current Elo rating
- Win/Loss record

Example:
```
1. PlayerA - 1847 Elo (25W - 10L)
2. PlayerB - 1726 Elo (30W - 15L)
3. PlayerC - 1689 Elo (28W - 14L)
```

> **[📸 IMAGE NEEDED: リーダーボード表示画面（トップ10プレイヤーのランキング、Elo、勝敗記録が表示されたGUI）]**

## Ranking Criteria

Players are ranked by:
1. **Elo rating** (primary)
2. **Win count** (tiebreaker)
3. **Join date** (secondary tiebreaker)

## Configuration

**File:** `config/cobbleranked/config.json5`

```json5
{
  "leaderboard": {
    "display_size": 10,          // Top N players shown
    "min_battles": 5,            // Minimum battles to appear
    "update_interval": 60        // Update frequency (seconds)
  }
}
```

## Cross-Server Leaderboards

In cross-server mode, leaderboards show all players across the network (shared database).

## Resetting Leaderboards

Leaderboards reset automatically when a new season starts. To manually reset:

```bash
/rankedarena season create <days> <name>
```

## Troubleshooting

**Leaderboard not updating:**
- Wait up to 60 seconds for cache refresh
- Check player has minimum battles (default: 5)

**Player missing from leaderboard:**
- Verify player has played at least `min_battles` matches
- Check player's Elo is above 0

---

## Next Steps

### For Display
1. **[PlaceholderAPI Integration](../integration/placeholders.md)** - Show leaderboards in holograms
2. **[GUI Customization](../configuration/gui.md)** - Customize leaderboard interface
3. **[Viewing Commands](../getting-started/commands.md#player-commands)** - Access leaderboards

### For Understanding Rankings
1. **[Elo System](elo-system.md)** - How ratings determine ranks
2. **[Battle Formats](ranked-battles.md#format-specific-rewards)** - Format-specific leaderboards
3. **[Season System](seasons.md)** - Leaderboard resets

### For Competitive Servers
1. **[Rewards Configuration](../configuration/rewards.md)** - Prize top-ranked players
2. **[Cross-Server Leaderboards](../advanced/cross-server.md)** - Network-wide rankings
3. **[Database Optimization](../advanced/database.md)** - Performance for large player bases

---

## Related Pages
- [Elo System](elo-system.md) - Rating calculations
- [Seasons](seasons.md) - Competitive periods and resets
- [Placeholder API](../integration/placeholders.md) - Display rankings externally
