# PlaceholderAPI Integration

CobbleRanked provides three types of placeholders:

1. **Leaderboard Placeholders** - Display top player stats in holograms, signs, and other mods
2. **Season Placeholders** - Display current season information (NEW in v1.1.0)
3. **Message Placeholders** - Used internally in language files for dynamic text

---

## Leaderboard Placeholders

### Overview

Leaderboard placeholders integrate with [Text Placeholder API](https://placeholders.pb4.eu/) (Fabric mod) to display real-time ranked statistics.

**Common Use Cases:**
- Leaderboard holograms (Fabric hologram mods)
- Scoreboard displays
- Custom displays via Text Placeholder API

**Platform Support:**
- Fabric servers (via Text Placeholder API)
- Hybrid servers (Arclight) - supports both Text Placeholder API and PlaceholderAPI

**Performance:**
- 60-second cache (reduces database queries by ~98%)
- <0.1% CPU impact
- ~1KB memory per 100 cached placeholders

---

### Supported Formats

#### All Formats Combined

Display top players across **SINGLES**, **DOUBLES**, **TRIPLES**, and **MULTI** formats combined.

**Syntax:**
```
%cobbleranked_top_<rank>_<field>%
```

**Available Fields:**
| Field | Description | Example Output |
|-------|-------------|----------------|
| `name` | Player username | `"Notch"` |
| `elo` | Total Elo (all formats) | `"1650"` |
| `wins` | Total wins (all formats) | `"42"` |
| `losses` | Total losses | `"15"` |
| `winrate` | Win percentage | `"73.7%"` |
| `games` | Total games played | `"57"` |

**Examples:**
```
%cobbleranked_top_1_name%      → "Notch"
%cobbleranked_top_1_elo%       → "1650"
%cobbleranked_top_2_wins%      → "42"
%cobbleranked_top_3_winrate%   → "75.5%"
%cobbleranked_top_5_games%     → "128"
```

---

#### Format-Specific Placeholders

Display top players for a specific battle format only.

**SINGLES Format:**
```
%cobbleranked_top_singles_<rank>_<field>%
```

**DOUBLES Format:**
```
%cobbleranked_top_doubles_<rank>_<field>%
```

**TRIPLES Format:**
```
%cobbleranked_top_triples_<rank>_<field>%
```

**MULTI Format:**
```
%cobbleranked_top_multi_<rank>_<field>%
```

**Random Battle Formats:**
```
%cobbleranked_top_random_singles_<rank>_<field>%
%cobbleranked_top_random_doubles_<rank>_<field>%
%cobbleranked_top_random_3v3_<rank>_<field>%
```

**Example Usage:**
```
%cobbleranked_top_singles_1_name%     → "Steve"
%cobbleranked_top_doubles_1_elo%      → "1720"
%cobbleranked_top_triples_3_winrate%  → "80.0%"
%cobbleranked_top_multi_5_games%      → "100"
```

---

### Rank Range

**Supported Ranks:** 1-100

Query any rank from 1st place to 100th place.

**Out of Range Behavior:**
- Rank < 1: Returns `"N/A"`
- Rank > 100: Returns `"N/A"`
- No player at rank: Returns fallback values

**Fallback Values:**
| Field | Fallback Value |
|-------|----------------|
| `name` | `"N/A"` |
| `elo` | `"-"` |
| `wins` | `"0"` |
| `losses` | `"0"` |
| `winrate` | `"0.0%"` |
| `games` | `"0"` |

---

### Testing Placeholders

Use `/rankedplaceholder` commands to test before deploying:

#### Test a Specific Placeholder

```bash
/rankedplaceholder test %cobbleranked_top_1_name%
```

**Output:**
```
[CobbleRanked Placeholder Test]
Input: %cobbleranked_top_1_name%
Result: Notch
```

#### List All Available Placeholders

```bash
/rankedplaceholder list
```

Shows all formats, fields, syntax examples, and rank range.

#### Clear Cache

```bash
/rankedplaceholder clear
```

Forces immediate cache refresh (normally auto-refreshes every 60 seconds).

---

### Integration Examples

#### Fabric Hologram Mods

Any Fabric hologram mod that supports Text Placeholder API will work.

**Example Hologram Configuration:**
```
Line 1: &6&l◆ Top Ranked Players ◆
Line 2:
Line 3: &e1st: &f%cobbleranked_top_1_name%
Line 4: &7Elo: &a%cobbleranked_top_1_elo% &7| WR: &6%cobbleranked_top_1_winrate%
Line 5:
Line 6: &e2nd: &f%cobbleranked_top_2_name%
Line 7: &7Elo: &a%cobbleranked_top_2_elo% &7| WR: &6%cobbleranked_top_2_winrate%
```

**Find compatible mods:** Check [Text Placeholder API wiki](https://placeholders.pb4.eu/)

#### Hybrid Servers (Arclight)

For hybrid Fabric+Bukkit servers, CobbleRanked supports **both**:
- Text Placeholder API (Fabric side)
- PlaceholderAPI (Bukkit side)

**DecentHolograms Example (Bukkit plugin):**
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
```

> **Note:** Bukkit/Spigot plugin examples only work on **hybrid servers** (Arclight). Pure Fabric servers must use Fabric-compatible mods.

---

### Cache Behavior

**Cache Duration:** 60 seconds

- **First Query:** Database lookup (slow)
- **Subsequent Queries (within 60s):** Cache hit (instant)
- **After 60s:** Cache expires, next query refreshes

**Manual Cache Clear:**
```bash
/rankedplaceholder clear
```

**Automatic Cache Invalidation:**
- Player wins/loses match → Cache invalidated for that player
- Season rotation → Full cache clear

**Performance Impact:**
- **Without cache:** ~1000 database queries/minute
- **With cache:** ~17 queries/minute (60s TTL)
- **CPU:** <0.1%
- **Memory:** ~1KB per 100 cached entries

---

## Message Placeholders

Message placeholders are used in [language files](../configuration/languages.md) to dynamically insert values into text.

### Arena Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{arena_name}` | Arena identifier | `"teleporting": "Teleporting to {arena_name}"` |
| `{arena_location_x}` | Arena X coordinate | `"arena_coords": "X: {arena_location_x}"` |
| `{arena_location_y}` | Arena Y coordinate | `"arena_coords": "Y: {arena_location_y}"` |
| `{arena_location_z}` | Arena Z coordinate | `"arena_coords": "Z: {arena_location_z}"` |

### Battle Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{battle_format}` | Battle format (SINGLES, DOUBLES, etc.) | `"battle_starting": "Starting {battle_format} battle"` |
| `{battle_elo_change}` | Elo gained or lost | `"battle_result": "Elo change: {battle_elo_change}"` |

### Player Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{player_name}` | Current player name | `"welcome": "Welcome, {player_name}!"` |
| `{opponent_name}` | Opponent player name | `"match_found": "Opponent: {opponent_name}"` |
| `{winner}` | Winner name (legacy, still supported) | `"match_finished": "{winner} won!"` |
| `{loser}` | Loser name (legacy, still supported) | `"match_finished": "{winner} defeated {loser}"` |

### Stats Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{stats_elo}` | Player's current Elo rating | `"rank_display": "Your Elo: {stats_elo}"` |
| `{stats_rank}` | Player's rank tier (Bronze, Silver, etc.) | `"rank_up": "You are now {stats_rank}!"` |
| `{stats_wins}` | Total wins | `"profile": "Wins: {stats_wins}"` |
| `{stats_losses}` | Total losses | `"profile": "Losses: {stats_losses}"` |
| `{stats_winrate}` | Win percentage | `"profile": "Win Rate: {stats_winrate}%"` |

### Season Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{season_name}` | Current season name | `"season_info": "Season: {season_name}"` |
| `{season_id}` | Season ID number | `"season_number": "Season #{season_id}"` |
| `{season_remaining_days}` | Days until season ends | `"season_ending": "{season_remaining_days} days left"` |

### Timer Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{timer_seconds}` | Battle turn timer seconds | `"turn_timer": "Time left: {timer_seconds}s"` |
| `{penalty_seconds}` | Penalty cooldown seconds | `"penalty_active": "Cooldown: {penalty_seconds}s"` |
| `{cooldown_seconds}` | Action cooldown seconds | `"cooldown": "Wait {cooldown_seconds}s"` |

### Mission Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{mission_name}` | Mission display name | `"mission_complete": "Completed: {mission_name}"` |
| `{mission_type}` | Mission type (DAILY, WEEKLY) | `"mission_info": "Type: {mission_type}"` |
| `{mission_progress}` | Current progress | `"mission_status": "{mission_progress}/{mission_target}"` |
| `{mission_target}` | Target value | `"mission_status": "{mission_progress}/{mission_target}"` |

### GUI Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{gui_selected_count}` | Number of items selected | `"selection": "Selected: {gui_selected_count}"` |
| `{gui_selection_limit}` | Maximum selectable items | `"selection": "{gui_selected_count}/{gui_selection_limit}"` |

### Legacy Placeholders (Still Supported)

These placeholders are maintained for backward compatibility:

| Old Placeholder | New Placeholder | Status |
|-----------------|-----------------|--------|
| `{arena}` | `{arena_name}` | ⚠️ Deprecated |
| `{format}` | `{battle_format}` | ⚠️ Deprecated |
| `{player}` | `{player_name}` | ⚠️ Deprecated |
| `{opponent}` | `{opponent_name}` | ⚠️ Deprecated |
| `{elo}` | `{stats_elo}` | ⚠️ Deprecated |
| `{rank}` | `{stats_rank}` | ⚠️ Deprecated |
| `{season}` | `{season_name}` | ⚠️ Deprecated |
| `{days}` | `{season_remaining_days}` | ⚠️ Deprecated |

**Usage Example:**

```json5
{
  "match_found": "&aMatch found! &7Opponent: &f{opponent_name}",
  "battle_starting": "&eStarting {battle_format} battle in {arena_name}",
  "battle_result": "&aYou gained {battle_elo_change} Elo! &7New rating: {stats_elo}",
  "season_ending": "&cSeason '{season_name}' ends in {season_remaining_days} days",
  "mission_progress": "&e{mission_name}: &7{mission_progress}/{mission_target}",
  "team_selection": "&7Selected: &a{gui_selected_count}&7/&e{gui_selection_limit}"
}
```

**See Also:** [Language Files Documentation](../configuration/languages.md) for complete message customization.

---

## Developer API

For plugin/mod developers who need to access ranked data programmatically:

### Kotlin/Java Example

```kotlin
import com.gashi.cobbleranked.CobbleRankedMod
import com.gashi.cobbleranked.enums.BattleFormat

// Get top 10 players (all formats combined)
val topPlayers = CobbleRankedMod.playerRankService.getTopPlayers(10)

// Get top 10 players (Singles format only)
val topSingles = CobbleRankedMod.playerRankService.getTopPlayersByFormat(
    format = BattleFormat.SINGLES,
    limit = 10
)

// Get specific player stats
val stats = CobbleRankedMod.playerRankService.getFormatStats(
    playerUuid = player.uuid,
    format = BattleFormat.SINGLES
)

println("Player Elo: ${stats?.eloPoints?.toInt() ?: 1000}")
println("Wins: ${stats?.totalWins ?: 0}")
```

### Direct Placeholder Resolution

```kotlin
import com.gashi.cobbleranked.placeholder.PlaceholderService

// Resolve a placeholder
val playerName = PlaceholderService.resolve("%cobbleranked_top_1_name%")
println("Top player: $playerName")

// Replace all placeholders in text
val text = "Top player is %cobbleranked_top_1_name% with %cobbleranked_top_1_elo% Elo"
val resolved = PlaceholderService.replaceAll(text)
println(resolved) // "Top player is Notch with 1650 Elo"

// Clear cache programmatically
PlaceholderService.clearCache()
```

---

## Complete Placeholder Reference

### Leaderboard Placeholders (All Formats)

```
%cobbleranked_top_<rank>_name%
%cobbleranked_top_<rank>_elo%
%cobbleranked_top_<rank>_wins%
%cobbleranked_top_<rank>_losses%
%cobbleranked_top_<rank>_winrate%
%cobbleranked_top_<rank>_games%
```

### Format-Specific Leaderboards

**Singles:**
```
%cobbleranked_top_singles_<rank>_name%
%cobbleranked_top_singles_<rank>_elo%
%cobbleranked_top_singles_<rank>_wins%
%cobbleranked_top_singles_<rank>_losses%
%cobbleranked_top_singles_<rank>_winrate%
%cobbleranked_top_singles_<rank>_games%
```

**Doubles:**
```
%cobbleranked_top_doubles_<rank>_name%
%cobbleranked_top_doubles_<rank>_elo%
%cobbleranked_top_doubles_<rank>_wins%
%cobbleranked_top_doubles_<rank>_losses%
%cobbleranked_top_doubles_<rank>_winrate%
%cobbleranked_top_doubles_<rank>_games%
```

**Triples:**
```
%cobbleranked_top_triples_<rank>_name%
%cobbleranked_top_triples_<rank>_elo%
%cobbleranked_top_triples_<rank>_wins%
%cobbleranked_top_triples_<rank>_losses%
%cobbleranked_top_triples_<rank>_winrate%
%cobbleranked_top_triples_<rank>_games%
```

**Multi (2v2):**
```
%cobbleranked_top_multi_<rank>_name%
%cobbleranked_top_multi_<rank>_elo%
%cobbleranked_top_multi_<rank>_wins%
%cobbleranked_top_multi_<rank>_losses%
%cobbleranked_top_multi_<rank>_winrate%
%cobbleranked_top_multi_<rank>_games%
```

**Rank Range:** 1-100 for all placeholders

---

### Season Placeholders

Display current season information in holograms and displays.

**Syntax:**
```
%cobbleranked_season_<field>%
```

**Available Fields:**

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%cobbleranked_season_name%` | Current season name | `"Season 1"` |
| `%cobbleranked_season_remaining%` | Formatted remaining time | `"5d 12h 30m"` |
| `%cobbleranked_season_remaining_days%` | Days remaining | `"5"` |
| `%cobbleranked_season_remaining_hours%` | Hours remaining | `"12"` |
| `%cobbleranked_season_remaining_minutes%` | Minutes remaining | `"30"` |
| `%cobbleranked_season_remaining_short%` | Short format (most significant unit) | `"5d"` or `"12h"` |
| `%cobbleranked_season_end_date%` | End date formatted | `"2024-12-31 23:59:59"` |
| `%cobbleranked_season_status%` | Season status | `"active"` or `"ended"` |

**Example Usage:**
```
Season: %cobbleranked_season_name%
Ends in: %cobbleranked_season_remaining%
Status: %cobbleranked_season_status%
```

**Fallback Values (no active season):**

| Placeholder | Fallback |
|-------------|----------|
| `season_name` | `"No Season"` |
| `season_remaining*` | `"-"` or `"0"` |
| `season_status` | `"none"` |

---

## Best Practices

### Performance Optimization

1. **Use format-specific placeholders when possible:**
   ```
   Singles-only server:
   ✅ GOOD: %cobbleranked_top_singles_1_name%
   ❌ AVOID: %cobbleranked_top_1_name%
   ```

2. **Limit leaderboard size:**
   - Display top 10 instead of top 100
   - Reduces database load

3. **Set hologram refresh to 60+ seconds:**
   - Aligns with cache TTL
   - Avoids unnecessary queries

4. **Avoid querying all 100 ranks:**
   - Only query ranks you display
   - Each rank = 1 cache entry

### Cache Management

- **Default TTL:** 60 seconds (auto-refresh)
- **Manual clear:** Use `/rankedplaceholder clear` after database edits
- **Automatic clear:** Season rotation automatically clears cache

---

## See Also

- [Language Files](../configuration/languages.md) - Message placeholder customization
- [Commands Reference](../getting-started/commands.md) - Placeholder testing commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
