# Placeholder API

CobbleRanked integrates with [Text Placeholder API](https://placeholders.pb4.eu/) to display ranked statistics in holograms, signs, and other Fabric mods that support placeholders.

---

## Overview

Placeholders allow you to display real-time ranked statistics anywhere that supports the Text Placeholder API format (`%placeholder%`).

**Common use cases:**
- Leaderboard holograms (Fabric-based hologram mods)
- Scoreboard displays (Fabric scoreboard mods)
- Chat formatting (compatible Fabric chat mods)
- Custom displays via Text Placeholder API

**Note:** This uses **Text Placeholder API** (Fabric mod), not PlaceholderAPI (Bukkit/Spigot plugin). For hybrid servers (Arclight), both APIs are supported.

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

### Fabric Hologram Mods

CobbleRanked placeholders work with any Fabric hologram mod that supports Text Placeholder API.

**Example placeholder usage:**

```
%cobbleranked_top_1_name% - Top player name
%cobbleranked_top_1_elo% - Top player Elo
%cobbleranked_top_singles_1_name% - Top Singles player
%cobbleranked_top_doubles_1_elo% - Top Doubles Elo
```

**Recommended Fabric hologram mods:**
- Check [Text Placeholder API's wiki](https://placeholders.pb4.eu/) for compatible hologram mods
- Most Fabric hologram mods with placeholder support will work

---

### Hybrid Servers (Arclight)

For hybrid Fabric+Bukkit servers (like Arclight), CobbleRanked supports **both**:
- **Text Placeholder API** (Fabric side)
- **PlaceholderAPI** (Bukkit/Spigot side)

**Bukkit/Spigot plugin examples (Arclight only):**

#### DecentHolograms (Bukkit plugin)

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
```

#### LuckPerms Chat Prefix (Bukkit plugin)

```bash
# Set champion prefix for top player
/lp group champion meta addprefix "&6[#1] "
/lp user <top_player> parent set champion
```

**Note:** These Bukkit/Spigot examples only work on **hybrid servers** (Arclight). Pure Fabric servers should use Fabric-compatible mods only.

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

## See Also

- [FAQ & Troubleshooting](../support/faq.md) - Common issues and solutions
- [Commands Reference](../getting-started/commands.md) - Placeholder testing commands
- [Configuration Guide](../configuration/config.md) - Cache settings

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
