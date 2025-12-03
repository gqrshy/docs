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

| Placeholder | Description |
|-------------|-------------|
| `{arena_name}` | Arena identifier |
| `{arena_location_x}` | Arena X coordinate |
| `{arena_location_y}` | Arena Y coordinate |
| `{arena_location_z}` | Arena Z coordinate |
| `{arena_center_x}` | Arena center X coordinate |
| `{arena_center_y}` | Arena center Y coordinate |
| `{arena_center_z}` | Arena center Z coordinate |
| `{arena_world}` | Arena world name |
| `{arena_pitch}` | Arena spawn pitch |
| `{arena_yaw}` | Arena spawn yaw |
| `{arena_position}` | Position identifier (pos1, pos2, etc.) |
| `{arena_status}` | Arena status (available/in-use) |
| `{arena_field_radius}` | Battle field radius |
| `{arena_exit_pos}` | Exit position coordinates |
| `{arena_count}` | Total arena count |
| `{arena_available_count}` | Available arena count |
| `{arena_in_use_count}` | In-use arena count |

### Battle Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{battle_format}` | Battle format (SINGLES, DOUBLES, etc.) |
| `{battle_elo_change}` | Elo gained or lost |
| `{format_name}` | Localized format name |
| `{match_countdown_seconds}` | Match start countdown |

### Player Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{player_name}` | Current player name |
| `{opponent_name}` | Opponent player name |
| `{winner}` | Winner name |
| `{loser}` | Loser name |

### Stats Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{stats_elo}` | Player's current Elo rating |
| `{stats_rank}` | Player's rank tier (Bronze, Silver, etc.) |
| `{stats_wins}` | Total wins |
| `{stats_losses}` | Total losses |
| `{stats_winrate}` | Win percentage |
| `{stats_total_games}` | Total games played |
| `{stats_win_streak}` | Current win streak |

### Season Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{season_name}` | Current season name |
| `{season_id}` | Season ID number |
| `{season_remaining_days}` | Days until season ends |
| `{season_remaining_time}` | Formatted remaining time |
| `{season_start_date}` | Season start date |
| `{season_end_date}` | Season end date |
| `{season_duration_days}` | Total season duration |
| `{season_status}` | Season status (active/ended) |
| `{season_name_old}` | Previous season name |
| `{season_name_new}` | New season name |
| `{season_end_minutes}` | Minutes until season ends |
| `{season_history_index}` | History entry index |
| `{season_history_limit}` | History display limit |

### Timer Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{timer_seconds}` | Timer in seconds |
| `{timer_minutes}` | Timer in minutes |
| `{penalty_seconds}` | Penalty cooldown seconds |
| `{penalty_minutes}` | Penalty cooldown minutes |
| `{cooldown_seconds}` | Action cooldown seconds |

### Queue Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{queue_size}` | Players in queue |
| `{queue_waiting_count}` | Players waiting |
| `{queue_search_seconds}` | Search time elapsed |
| `{queue_type}` | Queue type (ranked/casual) |

### Mission Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{mission_name}` | Mission display name |
| `{mission_type}` | Mission type (DAILY, WEEKLY) |
| `{mission_current}` | Current progress value |
| `{mission_required}` | Required target value |
| `{mission_target}` | Target value (alias) |
| `{mission_ready_count}` | Claimable missions count |
| `{mission_rewards_count}` | Pending rewards count |
| `{progress_percent}` | Progress percentage |

### Reward Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{reward_name}` | Reward name |
| `{reward_display_name}` | Reward display name |
| `{reward_rank}` | Required rank for reward |
| `{reward_player_rank}` | Player's current rank |
| `{reward_count}` | Pending reward count |
| `{reward_current_count}` | Current reward count |
| `{reward_daily_max}` | Daily reward limit |
| `{reward_current_progress}` | Current progress |
| `{reward_required_progress}` | Required progress |
| `{reward_remaining}` | Remaining to goal |
| `{reward_requirement_text}` | Requirement description |

### Pokemon Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{pokemon_name}` | Pokemon name |
| `{pokemon_species}` | Pokemon species |
| `{pokemon_level}` | Pokemon level |
| `{pokemon_ability}` | Pokemon ability |
| `{pokemon_moves}` | Pokemon moves list |
| `{pokemon_move}` | Single move name |
| `{pokemon_held_item}` | Held item name |
| `{pokemon_hp_current}` | Current HP |
| `{pokemon_hp_max}` | Maximum HP |
| `{pokemon_current_hp}` | Current HP (alias) |
| `{pokemon_max_hp}` | Maximum HP (alias) |
| `{pokemon_dex_number}` | Pokedex number |
| `{pokemon_label}` | Pokemon label |
| `{pokemon_labels}` | All Pokemon labels |

### GUI Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{gui_selected_count}` | Number of items selected |
| `{gui_selection_limit}` | Maximum selectable items |
| `{gui_max_selection}` | Max selection (alias) |
| `{gui_page_number}` | Current page number |
| `{gui_progress_bar}` | Visual progress bar |
| `{gui_color}` | Dynamic color code |
| `{gui_sort_mode}` | Current sort mode |
| `{gui_separator}` | Separator line |

### Leaderboard Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{leaderboard_rank}` | Player's leaderboard rank |
| `{lead_position}` | Lead Pokemon position |

### Validation Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{validation_valid_count}` | Valid Pokemon count |
| `{validation_total_count}` | Total Pokemon count |
| `{validation_required_count}` | Required Pokemon count |
| `{validation_current_count}` | Current Pokemon count |
| `{validation_error_count}` | Number of errors |
| `{validation_error_index}` | Error index number |
| `{validation_error}` | Error message |
| `{validation_more_count}` | Additional errors count |
| `{validation_duplicate_count}` | Duplicate count |
| `{item_clause_limit}` | Item clause limit |

### Battle Camera Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{camera_radius}` | Camera orbit radius |
| `{camera_height}` | Camera height offset |
| `{camera_speed}` | Camera rotation speed |
| `{camera_battles_completed}` | ML training battles done |
| `{camera_battles_remaining}` | ML battles remaining |
| `{camera_min_battles}` | Min battles for ML mode |
| `{camera_training_examples}` | ML training examples count |

### Other Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{blacklist_category}` | Blacklist category name |
| `{banned_items_list}` | List of banned items |
| `{flee_count}` | Player's flee count |
| `{elo_amount}` | Elo amount for admin commands |
| `{error_message}` | Error message text |
| `{my_alive}` | Your alive Pokemon count |
| `{opponent_alive}` | Opponent's alive count |
| `{my_hp}` | Your total HP |
| `{opponent_hp}` | Opponent's total HP |

### Legacy Placeholders (Still Supported)

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
