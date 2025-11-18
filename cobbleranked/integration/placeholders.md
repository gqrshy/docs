# Placeholder API

CobbleRanked provides two types of placeholders for displaying ranked statistics:

1. **Leaderboard Placeholders** - Display top player stats in holograms, signs, and other mods
2. **Message Placeholders** - Used internally in language files for dynamic text

---

## Leaderboard Placeholders

### Overview

Leaderboard placeholders integrate with [Text Placeholder API](https://placeholders.pb4.eu/) (Fabric mod) to display real-time ranked statistics.

**Common Use Cases:**
- Leaderboard holograms (Fabric hologram mods)
- Scoreboard displays
- Custom displays via Text Placeholder API

**Platform Support:**
- ✅ Fabric servers (via Text Placeholder API)
- ✅ Hybrid servers (Arclight) - supports both Text Placeholder API and PlaceholderAPI

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

### Player & Queue Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{player}` | Player name | `"match-finished": "{player} has won!"` |
| `{player1}` | First player name | `"ranked-started": "{player1} vs {player2}"` |
| `{player2}` | Second player name | `"prepare-queue-subtitle": "{player1} vs {player2}"` |
| `{remaining}` | Time remaining | `"remaingFila": "Searching... ({remaining})"` |
| `{posicao}` | Queue position | `"remaingFila": "Position: {posicao}"` |

### Battle Result Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{gain}` | Elo points gained | `"match-winner-subtitle": "You gained {gain} ELO"` |
| `{lose}` | Elo points lost | `"match-loser-subtitle": "You lost {lose} ELO"` |
| `{elo}` | Current Elo rating | `"elo-up": "You ranked up to {elo}."` |
| `{winner}` | Winner name | `"match-finished": "{winner} has won!"` |
| `{loser}` | Loser name | `"match-finished": "{winner} defeated {loser}!"` |

### System Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{time}` | Match duration | `"match-started-subtitle": "Duration is {time}m"` |
| `{limit}` | Team size limit | `"limit-pokemon": "You need {limit} Pokémon"` |
| `{arena}` | Arena name | `"arena-not-found": "Arena {arena} not found"` |
| `{pokemon}` | Pokemon name | `"pokemon_switched": "Selected {pokemon}"` |
| `{format}` | Battle format name | `"format_selector_selected": "▶ {format}"` |
| `{error}` | Error details | `"pokemon-label-limit": "Exceeded limit: {error}"` |

### Timer Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{seconds}` | Seconds remaining | `"battle_timer_critical": "Time remaining: {seconds}s"` |
| `{minutes}` | Minutes remaining | `"battle_timer_normal": "{minutes}m {seconds}s"` |
| `{type}` | Selection type | `"selection_timeout_critical": "{type} Selection"` |

### Pokemon & Team Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{level}` | Pokemon level | `"team_selection_pokemon_level": "Level: {level}"` |
| `{current}` | Current HP | `"team_selection_pokemon_hp": "HP: {current}/{max}"` |
| `{max}` | Maximum HP | `"team_selection_pokemon_hp": "HP: {current}/{max}"` |
| `{label}` | Pokemon label/category | `"team_selection_label_limit_item": "{label}: {current}/{limit}"` |
| `{color}` | Color code | `"team_selection_label_limit_item": "{color}• {label}"` |
| `{index}` | List item number | `"validation_error_list_item": "{index}. {pokemon}"` |

### Season Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{season}` | Season name | `"season_current": "Current Season: {season}"` |
| `{season_id}` | Season ID number | `"season_info": "Season #{season_id}"` |
| `{days}` | Days remaining | `"season_ending_soon": "{days} days remaining"` |

**Usage Example:**
```json5
{
  "match-finished": "&8* &f{winner} &chas just won a ranked match against &f{loser}.",
  "elo-up": "&aYou ranked up to &f{elo}.",
  "remaingFila": "&cSearching for a match... &7(&e{remaining}&7) &7(Position: &e{posicao}&7)"
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

## Best Practices

### Performance Optimization

1. **Use format-specific placeholders when possible:**
   ```
   Singles-only server:
   ✅ %cobbleranked_top_singles_1_name%
   ❌ %cobbleranked_top_1_name%
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
- [FAQ & Troubleshooting](../support/faq.md) - Common placeholder issues
