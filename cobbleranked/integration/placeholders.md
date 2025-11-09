# Placeholder API

CobbleRanked provides a comprehensive placeholder API for displaying ranked statistics in holograms, signs, chat plugins, and other third-party plugins that support PlaceholderAPI.

---

## Overview

Placeholders allow you to display real-time ranked statistics anywhere that supports standard Minecraft placeholder format (`%placeholder%`).

**Common use cases:**
- Leaderboard holograms (FancyHolograms, DecentHolograms)
- Scoreboard displays
- Chat prefixes/suffixes
- MOTD/tab list
- Custom NPCs

**Performance:**
- All placeholders are cached for 60 seconds
- Database queries are minimized
- Safe for high-traffic servers

---

## Placeholder Formats

### All Formats Combined

Display top players across **both** Singles and Doubles formats combined (ranked by total Elo).

**Syntax:**
```
%cobbleranked_top_<rank>_<field>%
```

**Examples:**
```
%cobbleranked_top_1_name%      → "Notch"
%cobbleranked_top_1_elo%       → "1650"
%cobbleranked_top_2_wins%      → "42"
%cobbleranked_top_3_winrate%   → "75.5"
%cobbleranked_top_5_games%     → "128"
```

---

### Singles Format Only

Display top players in **Singles** format only.

**Syntax:**
```
%cobbleranked_top_singles_<rank>_<field>%
```

**Examples:**
```
%cobbleranked_top_singles_1_name%    → "Steve"
%cobbleranked_top_singles_1_elo%     → "1580"
%cobbleranked_top_singles_2_wins%    → "35"
%cobbleranked_top_singles_3_losses%  → "12"
%cobbleranked_top_singles_5_winrate% → "80.0"
```

---

### Doubles Format Only

Display top players in **Doubles** format only.

**Syntax:**
```
%cobbleranked_top_doubles_<rank>_<field>%
```

**Examples:**
```
%cobbleranked_top_doubles_1_name%    → "Alex"
%cobbleranked_top_doubles_1_elo%     → "1720"
%cobbleranked_top_doubles_2_wins%    → "48"
%cobbleranked_top_doubles_3_losses%  → "8"
%cobbleranked_top_doubles_5_games%   → "100"
```

---

## Available Fields

| Field | Description | Example Output |
|-------|-------------|----------------|
| `name` | Player username | `"Notch"` |
| `elo` | Current Elo rating | `"1650"` |
| `wins` | Total wins in format | `"42"` |
| `losses` | Total losses in format | `"15"` |
| `winrate` | Win percentage (1 decimal) | `"73.7"` |
| `games` | Total games played | `"57"` |

**Notes:**
- All numeric fields return plain numbers (no formatting)
- `winrate` is calculated as: `(wins / games) * 100`
- Empty ranks return `"N/A"` for all fields

---

## Supported Ranks

**Range:** 1-100

You can query any rank from 1st place to 100th place.

**Examples:**
```
%cobbleranked_top_1_name%     → 1st place
%cobbleranked_top_10_name%    → 10th place
%cobbleranked_top_100_elo%    → 100th place
```

**Out of range:**
- Rank < 1: Returns `"N/A"`
- Rank > 100: Returns `"N/A"`
- No player at rank: Returns `"N/A"` (or "-" for numeric fields)

---

## Testing Placeholders

### Command Line Testing

Use the `/rankedplaceholder` commands to test placeholders before deploying them.

#### Test a Placeholder

```bash
/rankedplaceholder test %cobbleranked_top_1_name%
```

**Output:**
```
[CobbleRanked Placeholder Test]
Input: %cobbleranked_top_1_name%
Result: Notch
```

#### List All Placeholders

```bash
/rankedplaceholder list
```

**Output shows:**
- All available formats (All, Singles, Doubles)
- All available fields (name, elo, wins, losses, winrate, games)
- Syntax examples for each format
- Rank range information
- Cache TTL info

#### Clear Cache

```bash
/rankedplaceholder clear
```

Force immediate cache refresh (normally refreshes every 60 seconds automatically).

---

## Integration Examples

### FancyHolograms

Create a leaderboard hologram using FancyHolograms:

```
/holo create top_ranked
/holo addline top_ranked &6&l◆ Top Ranked Players ◆
/holo addline top_ranked &e1st: &f%cobbleranked_top_1_name% &7- &a%cobbleranked_top_1_elo% Elo
/holo addline top_ranked &e2nd: &f%cobbleranked_top_2_name% &7- &a%cobbleranked_top_2_elo% Elo
/holo addline top_ranked &e3rd: &f%cobbleranked_top_3_name% &7- &a%cobbleranked_top_3_elo% Elo
```

**Format-specific holograms:**

Singles leaderboard:
```
/holo create singles_top
/holo addline singles_top &b&l◆ Top Singles Players ◆
/holo addline singles_top &e1st: &f%cobbleranked_top_singles_1_name% &7(&a%cobbleranked_top_singles_1_wins%W &c%cobbleranked_top_singles_1_losses%L&7)
/holo addline singles_top &e2nd: &f%cobbleranked_top_singles_2_name% &7(&a%cobbleranked_top_singles_2_wins%W &c%cobbleranked_top_singles_2_losses%L&7)
```

Doubles leaderboard:
```
/holo create doubles_top
/holo addline doubles_top &d&l◆ Top Doubles Players ◆
/holo addline doubles_top &e1st: &f%cobbleranked_top_doubles_1_name% &7- &6%cobbleranked_top_doubles_1_winrate%% WR
/holo addline doubles_top &e2nd: &f%cobbleranked_top_doubles_2_name% &7- &6%cobbleranked_top_doubles_2_winrate%% WR
```

---

### DecentHolograms

Create a leaderboard with DecentHolograms:

```yaml
# plugins/DecentHolograms/holograms/ranked_top.yml
ranked_top:
  enabled: true
  location:
    world: world
    x: 100.5
    y: 64.0
    z: 200.5
  lines:
    - "&6&l◆ Top Ranked Players ◆"
    - ""
    - "&e1st: &f%cobbleranked_top_1_name%"
    - "&7Elo: &a%cobbleranked_top_1_elo% &7| WR: &6%cobbleranked_top_1_winrate%%"
    - ""
    - "&e2nd: &f%cobbleranked_top_2_name%"
    - "&7Elo: &a%cobbleranked_top_2_elo% &7| WR: &6%cobbleranked_top_2_winrate%%"
    - ""
    - "&e3rd: &f%cobbleranked_top_3_name%"
    - "&7Elo: &a%cobbleranked_top_3_elo% &7| WR: &6%cobbleranked_top_3_winrate%%"
```

---

### Chat Prefix/Suffix

Use with chat plugins (LuckPerms + Vault):

```
/lp group champion meta addprefix "&6[#1] "
```

Then create a script to automatically assign the "champion" group to the top player:

```bash
# Pseudo-code for auto-rank script
top_player=$(placeholder_api_query "%cobbleranked_top_1_name%")
/lp user $top_player parent set champion
```

---

### Scoreboard (via plugin)

Example using a scoreboard plugin that supports PlaceholderAPI:

```yaml
# Scoreboard lines
lines:
  - "&6&lRANKED STATS"
  - ""
  - "&e#1: &f%cobbleranked_top_1_name%"
  - "&7Elo: &a%cobbleranked_top_1_elo%"
  - ""
  - "&e#2: &f%cobbleranked_top_2_name%"
  - "&7Elo: &a%cobbleranked_top_2_elo%"
```

---

## Placeholder Resolution Logic

### How Rankings Are Calculated

1. **All Formats (`%cobbleranked_top_<rank>_<field>%`):**
   - Combines Singles and Doubles stats
   - Ranked by **total Elo** (Singles Elo + Doubles Elo)
   - Example: Player with 1500 Singles + 1600 Doubles = 3100 total

2. **Singles Only (`%cobbleranked_top_singles_<rank>_<field>%`):**
   - Only considers Singles format stats
   - Ranked by Singles Elo only

3. **Doubles Only (`%cobbleranked_top_doubles_<rank>_<field>%`):**
   - Only considers Doubles format stats
   - Ranked by Doubles Elo only

### Cache Behavior

**Cache TTL:** 60 seconds

- First query: Database lookup
- Subsequent queries (within 60s): Cache hit
- After 60s: Cache expires, next query refreshes from database

**Manual cache clear:**
```bash
/rankedplaceholder clear
```

**Automatic cache clear:**
- Player wins/loses a match → Cache invalidated for that player
- Season rotation → Full cache clear

### Empty Rank Handling

When a rank has no player (e.g., only 5 players on server but querying rank 10):

| Field | Fallback Value |
|-------|----------------|
| `name` | `"N/A"` |
| `elo` | `"-"` |
| `wins` | `"0"` |
| `losses` | `"0"` |
| `winrate` | `"0.0"` |
| `games` | `"0"` |

**Example:**
```
%cobbleranked_top_100_name%   → "N/A" (if < 100 players)
%cobbleranked_top_100_elo%    → "-"
```

---

## Troubleshooting

### Placeholder Shows Raw Text

**Problem:**
```
Hologram displays: %cobbleranked_top_1_name%
Instead of: Notch
```

**Solutions:**

1. **Check PlaceholderAPI is installed:**
   ```bash
   /plugins
   # Should show: PlaceholderAPI (green)
   ```

2. **Register CobbleRanked with PlaceholderAPI:**
   ```bash
   /papi reload
   /papi list
   # Should show: cobbleranked
   ```

3. **Test placeholder manually:**
   ```bash
   /papi parse me %cobbleranked_top_1_name%
   ```

4. **Check hologram plugin supports PlaceholderAPI:**
   - FancyHolograms: Yes (built-in)
   - DecentHolograms: Yes (built-in)
   - HolographicDisplays: Requires PlaceholderAPI expansion

---

### Placeholder Returns "N/A"

**Problem:**
All placeholders return "N/A" or empty values.

**Possible causes:**

1. **No players have played ranked yet:**
   - Solution: Play at least 1 ranked match to populate leaderboard

2. **Database not initialized:**
   ```bash
   # Check server logs for:
   [CobbleRanked] Database initialized
   [CobbleRanked] Loaded X player stats
   ```

3. **Cache is stale:**
   ```bash
   /rankedplaceholder clear
   ```

4. **Wrong format specified:**
   ```bash
   # If no players have played Singles:
   %cobbleranked_top_singles_1_name% → "N/A"

   # But combined might work:
   %cobbleranked_top_1_name% → Shows Doubles players
   ```

---

### Placeholder Returns Old Data

**Problem:**
Placeholder shows outdated stats after a match.

**Solutions:**

1. **Wait for cache to expire (60 seconds):**
   - Automatic refresh after 1 minute

2. **Manually clear cache:**
   ```bash
   /rankedplaceholder clear
   ```

3. **Check if match results saved:**
   ```bash
   # Server logs should show:
   [BattleResult] Saved stats for <player>
   ```

---

### High Rank Returns "N/A" (e.g., rank 50+)

**Problem:**
```
%cobbleranked_top_50_name% → "N/A"
```

**Cause:**
Server has fewer than 50 players with ranked stats.

**Solution:**
This is expected behavior. Use lower ranks or check total players:
```bash
/rankedplaceholder test %cobbleranked_top_10_name%
```

---

## Performance Considerations

### Cache Impact

**Database queries saved:**
- Without cache: ~1000 queries/minute (20 holograms × 50 viewers)
- With cache: ~17 queries/minute (60-second TTL)

**CPU impact:** Negligible (<0.1% CPU usage)

**Memory usage:** ~1KB per 100 cached placeholders

### Best Practices

1. **Use cache-friendly update intervals:**
   - Set hologram refresh to 60+ seconds
   - Avoid sub-second refresh rates

2. **Limit leaderboard size:**
   - Display top 10 instead of top 100
   - Reduces database load

3. **Use format-specific placeholders when possible:**
   ```
   Singles-only server:
   ✅ %cobbleranked_top_singles_1_name%
   ❌ %cobbleranked_top_1_name%
   ```

4. **Avoid querying all 100 ranks:**
   - Query only ranks you display
   - Each rank query = 1 cache entry

---

## API for Developers

If you're developing a plugin that needs to access ranked data:

### Kotlin/Java Example

```kotlin
import com.gashi.cobbleranked.CobbleRankedMod
import com.gashi.cobbleranked.enums.BattleFormat

// Get top 10 players (all formats)
val topPlayers = CobbleRankedMod.playerRankService.getTopPlayers(10)

// Get top 10 players (Singles only)
val topSingles = CobbleRankedMod.playerRankService.getTopPlayersByFormat(
    format = BattleFormat.SINGLES,
    limit = 10
)

// Get specific player stats
val stats = CobbleRankedMod.playerRankService.getFormatStats(
    playerUuid = player.uuid,
    format = BattleFormat.SINGLES
)

println("Player Elo: ${stats?.rankedInfo?.elo ?: 1000}")
println("Wins: ${stats?.rankedInfo?.wins ?: 0}")
```

### Direct Placeholder Resolution

```kotlin
import com.gashi.cobbleranked.placeholder.PlaceholderService

// Resolve a placeholder
val playerName = PlaceholderService.resolve("%cobbleranked_top_1_name%")
println("Top player: $playerName")

// Clear cache programmatically
PlaceholderService.clearCache()
```

---

## Complete Placeholder Reference

### All Formats Combined

| Placeholder | Description |
|------------|-------------|
| `%cobbleranked_top_<rank>_name%` | Player username |
| `%cobbleranked_top_<rank>_elo%` | Total Elo (Singles + Doubles) |
| `%cobbleranked_top_<rank>_wins%` | Total wins (Singles + Doubles) |
| `%cobbleranked_top_<rank>_losses%` | Total losses (Singles + Doubles) |
| `%cobbleranked_top_<rank>_winrate%` | Overall win percentage |
| `%cobbleranked_top_<rank>_games%` | Total games played |

### Singles Format

| Placeholder | Description |
|------------|-------------|
| `%cobbleranked_top_singles_<rank>_name%` | Player username |
| `%cobbleranked_top_singles_<rank>_elo%` | Singles Elo |
| `%cobbleranked_top_singles_<rank>_wins%` | Singles wins |
| `%cobbleranked_top_singles_<rank>_losses%` | Singles losses |
| `%cobbleranked_top_singles_<rank>_winrate%` | Singles win percentage |
| `%cobbleranked_top_singles_<rank>_games%` | Singles games played |

### Doubles Format

| Placeholder | Description |
|------------|-------------|
| `%cobbleranked_top_doubles_<rank>_name%` | Player username |
| `%cobbleranked_top_doubles_<rank>_elo%` | Doubles Elo |
| `%cobbleranked_top_doubles_<rank>_wins%` | Doubles wins |
| `%cobbleranked_top_doubles_<rank>_losses%` | Doubles losses |
| `%cobbleranked_top_doubles_<rank>_winrate%` | Doubles win percentage |
| `%cobbleranked_top_doubles_<rank>_games%` | Doubles games played |

**Rank range:** 1-100 for all placeholders

---

## See Also

- [Commands Reference](../getting-started/commands.md) - Placeholder testing commands
- [FAQ](../support/faq.md) - Common placeholder questions
- [Configuration Guide](../configuration/config.md) - Cache settings
