# PlaceholderAPI Integration

CobbleRanked integrates with external placeholder systems to display player statistics, leaderboards, and season information in scoreboards, holograms, chat plugins, and more.

---

## Platform Support

| Platform | Placeholder System | Status |
|----------|-------------------|--------|
| Fabric (Pure) | [Text Placeholder API](https://placeholders.pb4.eu/) | ✅ Supported |
| Arclight (Hybrid) | PlaceholderAPI (Bukkit) | ✅ Supported |
| Arclight (Hybrid) | Text Placeholder API | ✅ Supported |

> 📝 **Note:** On hybrid servers (Arclight), both PlaceholderAPI and Text Placeholder API work simultaneously. Choose whichever your plugins/mods support.

---

## Player Statistics

Display the viewing player's own ranked statistics. **Requires player context** (the player viewing the placeholder).

**Syntax:**

```text
%cobbleranked_<format>_<stat>%
```

### Available Formats

| Format | Prefix | Description |
|--------|--------|-------------|
| Singles | `singles_` | 1v1 battles |
| Doubles | `doubles_` | 2v2 battles |
| Triples | `triples_` | 3v3 battles |
| Multi | `multi_` | Multi battles |

### Available Stats

| Stat | Description | Example Output |
|------|-------------|----------------|
| `elo` | Player's Elo rating | `"1523"` |
| `rank` | Leaderboard position | `"42"` or `"-"` |
| `wins` | Total wins | `"28"` |
| `losses` | Total losses | `"12"` |
| `winrate` | Win percentage | `"70.0%"` |
| `games` | Total games played | `"40"` |
| `tier` | Current rank tier | `"Gold"` |

### Examples

**Singles Format:**

```text
%cobbleranked_singles_elo%      → "1523"
%cobbleranked_singles_rank%     → "42"
%cobbleranked_singles_wins%     → "28"
%cobbleranked_singles_losses%   → "12"
%cobbleranked_singles_winrate%  → "70.0%"
%cobbleranked_singles_games%    → "40"
%cobbleranked_singles_tier%     → "Gold"
```

**Other Formats:**

```text
%cobbleranked_doubles_elo%      → "1480"
%cobbleranked_triples_tier%     → "Silver"
%cobbleranked_multi_winrate%    → "65.5%"
```

### Fallback Values

When player has no data or error occurs:

| Stat | Fallback |
|------|----------|
| `elo` | Initial Elo from config |
| `rank` | `"-"` |
| `wins`, `losses`, `games` | `"0"` |
| `winrate` | `"0.0%"` |
| `tier` | `"Unranked"` |

---

## Leaderboard Placeholders

Display top player statistics for holograms, signs, and displays. **No player context required.**

### All Formats Combined

**Syntax:**

```text
%cobbleranked_top_<rank>_<field>%
```

**Examples:**

```text
%cobbleranked_top_1_name%       → "Notch"
%cobbleranked_top_1_elo%        → "1850"
%cobbleranked_top_1_wins%       → "156"
%cobbleranked_top_2_winrate%    → "82.5%"
%cobbleranked_top_10_games%     → "200"
```

### Format-Specific Leaderboards

**Syntax:**

```text
%cobbleranked_top_<format>_<rank>_<field>%
```

**Singles:**

```text
%cobbleranked_top_singles_1_name%     → "Steve"
%cobbleranked_top_singles_1_elo%      → "1720"
%cobbleranked_top_singles_3_winrate%  → "78.2%"
```

**Doubles:**

```text
%cobbleranked_top_doubles_1_name%     → "Alex"
%cobbleranked_top_doubles_1_elo%      → "1680"
```

**Triples:**

```text
%cobbleranked_top_triples_1_name%     → "Herobrine"
%cobbleranked_top_triples_5_wins%     → "89"
```

**Multi:**

```text
%cobbleranked_top_multi_1_name%       → "Dream"
%cobbleranked_top_multi_1_winrate%    → "91.0%"
```

### Available Fields

| Field | Description | Example Output |
|-------|-------------|----------------|
| `name` | Player username | `"Notch"` |
| `elo` | Elo rating | `"1650"` |
| `wins` | Total wins | `"42"` |
| `losses` | Total losses | `"15"` |
| `winrate` | Win percentage | `"73.7%"` |
| `games` | Total games played | `"57"` |

### Rank Range

- **Supported:** Rank 1 to 100
- **Out of range:** Returns fallback values

**Leaderboard Fallback Values:**

| Field | Fallback |
|-------|----------|
| `name` | `"N/A"` |
| `elo` | `"-"` |
| `wins`, `losses`, `games` | `"0"` |
| `winrate` | `"0.0%"` |

---

## Season Placeholders

Display current season information. **No player context required.**

**Syntax:**

```text
%cobbleranked_season_<field>%
```

### Season Fields

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%cobbleranked_season_name%` | Season name | `"Season 1"` |
| `%cobbleranked_season_remaining%` | Formatted time remaining | `"5d 12h 30m"` |
| `%cobbleranked_season_remaining_days%` | Days remaining | `"5"` |
| `%cobbleranked_season_remaining_hours%` | Hours remaining | `"12"` |
| `%cobbleranked_season_remaining_minutes%` | Minutes remaining | `"30"` |
| `%cobbleranked_season_remaining_short%` | Short format | `"5d"` or `"12h"` |
| `%cobbleranked_season_end_date%` | End date | `"2024-12-31 23:59:59"` |
| `%cobbleranked_season_status%` | Season status | `"active"` or `"ended"` |

### Season Fallback Values (No Active Season)

| Field | Fallback |
|-------|----------|
| `name` | `"No Season"` |
| `remaining*` | `"-"` or `"0"` |
| `status` | `"none"` |

---

## Integration Examples

### Scoreboard Plugin (PlaceholderAPI)

```yaml
# Example scoreboard configuration
lines:
  - "&6&lRanked Stats"
  - ""
  - "&7Elo: &f%cobbleranked_singles_elo%"
  - "&7Rank: &f#%cobbleranked_singles_rank%"
  - "&7Tier: &f%cobbleranked_singles_tier%"
  - "&7W/L: &a%cobbleranked_singles_wins%&7/&c%cobbleranked_singles_losses%"
  - ""
  - "&7Season: &e%cobbleranked_season_name%"
  - "&7Ends in: &f%cobbleranked_season_remaining_short%"
```

### Hologram (Leaderboard Display)

```yaml
# DecentHolograms / HolographicDisplays example
lines:
  - "&6&l◆ Top Ranked Players ◆"
  - ""
  - "&e1st &f%cobbleranked_top_singles_1_name%"
  - "   &7Elo: &a%cobbleranked_top_singles_1_elo% &7| WR: &6%cobbleranked_top_singles_1_winrate%"
  - ""
  - "&e2nd &f%cobbleranked_top_singles_2_name%"
  - "   &7Elo: &a%cobbleranked_top_singles_2_elo% &7| WR: &6%cobbleranked_top_singles_2_winrate%"
  - ""
  - "&e3rd &f%cobbleranked_top_singles_3_name%"
  - "   &7Elo: &a%cobbleranked_top_singles_3_elo% &7| WR: &6%cobbleranked_top_singles_3_winrate%"
```

### Text Placeholder API (Fabric)

Any Fabric mod supporting Text Placeholder API can use the same placeholders:

```text
%cobbleranked_singles_elo%
%cobbleranked_top_1_name%
%cobbleranked_season_name%
```

---

## Testing Placeholders

### Test a Specific Placeholder

```bash
/rankedplaceholder test %cobbleranked_singles_elo%
```

**Output:**

```text
[CobbleRanked Placeholder Test]
Input: %cobbleranked_singles_elo%
Result: 1523
```

### List All Available Placeholders

```bash
/rankedplaceholder list
```

### Clear Placeholder Cache

```bash
/rankedplaceholder clear
```

---

## Cache Behavior

- **Cache Duration:** 60 seconds
- **Auto-invalidation:** After match completion, season rotation
- **Manual clear:** `/rankedplaceholder clear`

**Performance Impact:**

- 60-second cache reduces database queries by ~98%
- <0.1% CPU impact
- ~1KB memory per 100 cached entries

---

## Complete Reference

<details>
<summary><strong>All Player Stat Placeholders</strong></summary>

**Singles:**

```text
%cobbleranked_singles_elo%
%cobbleranked_singles_rank%
%cobbleranked_singles_wins%
%cobbleranked_singles_losses%
%cobbleranked_singles_winrate%
%cobbleranked_singles_games%
%cobbleranked_singles_tier%
```

**Doubles:**

```text
%cobbleranked_doubles_elo%
%cobbleranked_doubles_rank%
%cobbleranked_doubles_wins%
%cobbleranked_doubles_losses%
%cobbleranked_doubles_winrate%
%cobbleranked_doubles_games%
%cobbleranked_doubles_tier%
```

**Triples:**

```text
%cobbleranked_triples_elo%
%cobbleranked_triples_rank%
%cobbleranked_triples_wins%
%cobbleranked_triples_losses%
%cobbleranked_triples_winrate%
%cobbleranked_triples_games%
%cobbleranked_triples_tier%
```

**Multi:**

```text
%cobbleranked_multi_elo%
%cobbleranked_multi_rank%
%cobbleranked_multi_wins%
%cobbleranked_multi_losses%
%cobbleranked_multi_winrate%
%cobbleranked_multi_games%
%cobbleranked_multi_tier%
```

</details>

<details>
<summary><strong>All Leaderboard Placeholders</strong></summary>

**Combined (All Formats):**

```text
%cobbleranked_top_<1-100>_name%
%cobbleranked_top_<1-100>_elo%
%cobbleranked_top_<1-100>_wins%
%cobbleranked_top_<1-100>_losses%
%cobbleranked_top_<1-100>_winrate%
%cobbleranked_top_<1-100>_games%
```

**Format-Specific:**

```text
%cobbleranked_top_singles_<1-100>_<field>%
%cobbleranked_top_doubles_<1-100>_<field>%
%cobbleranked_top_triples_<1-100>_<field>%
%cobbleranked_top_multi_<1-100>_<field>%
```

</details>

<details>
<summary><strong>All Season Placeholders</strong></summary>

```text
%cobbleranked_season_name%
%cobbleranked_season_remaining%
%cobbleranked_season_remaining_days%
%cobbleranked_season_remaining_hours%
%cobbleranked_season_remaining_minutes%
%cobbleranked_season_remaining_short%
%cobbleranked_season_end_date%
%cobbleranked_season_status%
```

</details>

---

## Internal Message Placeholders

CobbleRanked also uses internal placeholders (format: `{placeholder}`) for language file customization. These are **not** compatible with external placeholder plugins.

For language file placeholders, see [Language Files Documentation](../configuration/languages.md).

---

## See Also

- [Language Files](../configuration/languages.md) - Internal message placeholders
- [Commands Reference](../getting-started/commands.md) - Placeholder testing commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
