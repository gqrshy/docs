# GUI Customization

Customize CobbleRanked GUI appearance and layout.

---

## GUI Files

**Location:** `config/cobbleranked/gui/`

CobbleRanked uses two types of GUI configuration files:

### 1. Language-Specific Main GUI Files

```
gui/
├── gui-enUs.json5    # English (main menu, top ranked, etc.)
├── gui-jaJp.json5    # Japanese
└── gui-frFr.json5    # French
```

These files contain the main menu (`gui_ranked`), leaderboard display (`gui_top_ranked`), and other primary GUIs.

### 2. Specialized GUI Config Files

```
gui/
├── reward_gui.json5       # Season & milestone rewards
├── leaderboard_gui.json5  # Pyramid leaderboard layout
├── blacklist_gui.json5    # Banned Pokemon/moves/items viewer
├── selection_gui.json5    # Team & lead selection
└── match_ready_gui.json5  # Pre-battle ready check
```

These files provide detailed customization for specific GUIs.

**Which file is used?**
- Language-specific files (`gui-enUs.json5`, etc.) are determined by the `language` setting in `config/cobbleranked/config.json5`
- Specialized config files are always loaded regardless of language setting

## Available GUIs

| GUI | Config File | Description |
|-----|-------------|-------------|
| **gui_ranked** | `gui-{lang}.json5` | Main menu (queue buttons, stats, navigation) |
| **gui_top_ranked** | `gui-{lang}.json5` | Legacy leaderboard display |
| **gui_prepare_combat** | `gui-{lang}.json5` | Pre-battle team preview |
| **gui_match_ready** | `gui-{lang}.json5` / `match_ready_gui.json5` | Ready check before battle |
| Pyramid Leaderboard | `leaderboard_gui.json5` | Advanced leaderboard with pyramid layout |
| Rewards | `reward_gui.json5` | Season & milestone rewards |
| Blacklist | `blacklist_gui.json5` | Banned Pokemon/moves/items viewer |
| Team Selection | `selection_gui.json5` | Pokemon team selection for battle |
| Lead Selection | `selection_gui.json5` | Lead Pokemon selection |

## Slot Numbering

> ⚠️ **Important:** Config files use **1-indexed** slot numbers (1-54 for a 6-row chest).
> This is automatically converted to Minecraft's 0-indexed system internally.

**Example:** `"slot": 5` in config → Minecraft slot 4 (top row, 5th position)

```
Config (1-indexed):
 1  2  3  4  5  6  7  8  9
10 11 12 13 14 15 16 17 18
19 20 21 22 23 24 25 26 27
28 29 30 31 32 33 34 35 36
37 38 39 40 41 42 43 44 45
46 47 48 49 50 51 52 53 54
```

---

## Basic Customization

### Change Item Display

```json5
{
  "gui_ranked": {
    "title": "&cRanked Menu",
    "size": 4,  // Number of rows (1-6)
    "items": {
      "singles_queue": {
        "slot": 11,                            // Position (1-indexed)
        "id": "cobblemon:poke_ball",           // Item ID
        "display": "&bSingles Battle",         // Display name
        "lore": [
          "",
          "&71v1 Ranked Match",
          " &7Players in queue: &c{queue_singles}",
          "",
          "&aClick to join queue",
          ""
        ],
        "custom_model_data": 0  // Custom model data (resource packs)
      }
    }
  }
}
```

### Item Fields

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Item ID (e.g., `minecraft:diamond`, `cobblemon:poke_ball`, `PLAYER_SKIN`) | Yes |
| `display` | Display name (supports color codes and placeholders) | Yes |
| `slot` | Inventory slot (1-54, 1-indexed) | Yes |
| `lore` | Array of lore lines (supports color codes and placeholders) | No |
| `custom_model_data` | Custom model data value for resource packs | No |

**Special Item IDs:**

| ID | Description |
|----|-------------|
| `PLAYER_SKIN` | Displays the player's head with their skin |
| `minecraft:*` | Any vanilla Minecraft item |
| `cobblemon:*` | Any Cobblemon item (Poke Balls, etc.) |

### Color Codes

Use `&` for colors:
- `&a` - Green
- `&c` - Red
- `&e` - Yellow
- `&b` - Aqua
- `&6` - Gold
- `&l` - Bold
- `&r` - Reset

Example:
```json5
"name": "&a&lQueue Singles"  // Bold green text
```

---

## Placeholders

Use placeholders for dynamic content in GUI items. CobbleRanked uses a consistent naming convention with prefixes.

### Stats Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{stats_elo}` | Player's Elo rating | `1500` |
| `{stats_wins}` | Win count | `42` |
| `{stats_losses}` | Loss count | `15` |
| `{stats_winrate}` | Win percentage | `73` |
| `{stats_total_games}` | Total games played | `57` |
| `{stats_win_streak}` | Current win streak | `5` |

### Player Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{player_name}` | Current player name | `Steve` |

### Queue Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{queue_singles}` | Players in Singles queue | `3` |
| `{queue_doubles}` | Players in Doubles queue | `2` |
| `{queue_triples}` | Players in Triples queue | `0` |
| `{queue_multi}` | Players in Multi queue | `4` |

### Format & Season Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{battle_format}` | Current format display name | `Singles` |
| `{format_id}` | Format identifier | `SINGLES` |
| `{season_name}` | Current season name | `Season 1` |
| `{season_id}` | Season ID number | `1` |

### Leaderboard Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{leaderboard_rank}` | Player's leaderboard position | `#5` |

### Example Usage

```json5
"player_info": {
  "slot": 5,
  "id": "PLAYER_SKIN",
  "display": "&7Information about &c{player_name}",
  "lore": [
    "",
    " &8▸ &7Matches Played: &f{stats_total_games}",
    " &8▸ &7Wins/Losses: &a{stats_wins}&f/&c{stats_losses} &7(&f{stats_winrate}&7%)",
    " &8▸ &7Win Streak: &b{stats_win_streak}",
    " &8▸ &7Elo: &e{stats_elo}",
    ""
  ]
}
```

### Legacy Placeholders (Deprecated)

> ⚠️ **Note:** These placeholders still work for backward compatibility but may be removed in future versions. Use the new naming convention instead.

| Legacy | New Replacement |
|--------|-----------------|
| `{player}`, `{username}` | `{player_name}` |
| `{elo}` | `{stats_elo}` |
| `{wins}` | `{stats_wins}` |
| `{losses}` | `{stats_losses}` |
| `{win_rate}`, `{winrate}` | `{stats_winrate}` |
| `{win_streak}` | `{stats_win_streak}` |
| `{matches}`, `{games}` | `{stats_total_games}` |
| `{format}` | `{battle_format}` |
| `{season}` | `{season_name}` |

## Common Customizations

### Use Custom Models (Resource Packs)

You can use `custom_model_data` to display custom textures from resource packs:

```json5
{
  "singles_queue": {
    "slot": 11,
    "id": "minecraft:paper",           // Base item
    "display": "&bSingles Battle",
    "custom_model_data": 1001,         // Your custom model ID
    "lore": [
      "&71v1 Ranked Match",
      "&aClick to join"
    ]
  }
}
```

**How it works:**
1. Create a resource pack with custom models
2. Define models in `assets/minecraft/models/item/paper.json`:
   ```json
   {
     "parent": "item/generated",
     "textures": {
       "layer0": "minecraft:item/paper"
     },
     "overrides": [
       {
         "predicate": { "custom_model_data": 1001 },
         "model": "cobbleranked:item/singles_icon"
       }
     ]
   }
   ```
3. Set `custom_model_data: 1001` in GUI config
4. Players with the resource pack will see your custom texture!

**Common use cases:**
- Custom battle format icons
- Animated button textures
- Themed GUI elements
- Server branding

### Change Queue Button Position

```json5
"queue_singles": {
  "slot": 20  // Move to different slot
}
```

### Add Custom Decoration (Fill)

Specialized GUI configs support fill configurations for decoration:

```json5
"fill": {
  "enabled": true,
  "material": "minecraft:black_stained_glass_pane",
  "displayname": " ",
  "slots": [1, 2, 3, 7, 8, 9]  // 1-indexed slots to fill
}
```

---

## Specialized GUI Configuration

### Leaderboard GUI (`leaderboard_gui.json5`)

Configure the pyramid-style leaderboard display:

```json5
{
  "title": "gui_pyramid_leaderboard_title",
  "rows": 6,

  // Pyramid slot layout (1-indexed)
  "pyramid_slots": {
    "rank_1": [5],                           // 1st place (top center)
    "rank_2_4": [13, 14, 15],                // 2nd-4th
    "rank_5_9": [21, 22, 23, 24, 25],        // 5th-9th
    "rank_10_16": [29, 30, 31, 32, 33, 34, 35],
    "rank_17_25": [37, 38, 39, 40, 41, 42, 43, 44, 45]
  },

  // Player head display
  "player_head": {
    "show_rank_badge": true,
    "rank_format": {
      "1": "&6&l#1 &r{player_name}",
      "2-4": "&e&l#{leaderboard_rank} &r{player_name}",
      "5-9": "&f&l#{leaderboard_rank} &r{player_name}"
    }
  },

  "refresh_cooldown": 30,
  "max_players": 25
}
```

### Blacklist GUI (`blacklist_gui.json5`)

Configure the banned Pokemon/moves/items viewer:

```json5
{
  "title": "gui_blacklist_title",
  "rows": 6,

  // Content display area (1-indexed)
  "content_slots": [
    11, 12, 13, 14, 15, 16, 17,
    20, 21, 22, 23, 24, 25, 26,
    29, 30, 31, 32, 33, 34, 35
  ],

  // Category selector
  "category_buttons": {
    "enabled": true,
    "slot": 50,
    "categories": {
      "pokemon": {
        "displayname": "blacklist_category_pokemon",
        "material": "cobblemon:poke_ball"
      },
      "moves": {
        "displayname": "blacklist_category_moves",
        "material": "minecraft:book"
      }
    }
  }
}
```

### Reward GUI (`reward_gui.json5`)

Configure season and milestone rewards display:

```json5
{
  "title": "gui_new_reward_title",
  "rows": 6,

  // Season rank rewards
  "season_rewards": {
    "enabled": true,
    "slots": [11, 12, 13, 14, 15, 16, 17],
    "locked": {
      "material": "GRAY_STAINED_GLASS_PANE",
      "glow": false
    },
    "claimable": {
      "glow": true
    }
  },

  // Milestone rewards
  "milestone_rewards": {
    "enabled": true,
    "rows": {
      "row1": { "slots": [29, 30, 31, 32, 33, 34, 35] },
      "row2": { "slots": [38, 39, 40, 41, 42, 43, 44] }
    }
  }
}
```

### Selection GUI (`selection_gui.json5`)

Configure team and lead selection screens:

```json5
{
  "team_selection": {
    "title": "gui_team_selection_title",
    "rows": 6,
    "confirm_button": {
      "enabled": true,
      "slot": 50,
      "material": "LIME_CONCRETE"
    }
  },

  "lead_selection": {
    "title": "gui_lead_selection_title",
    "rows": 6
  },

  "pokemon_display": {
    "show_level": true,
    "show_ability": true,
    "show_moves": true,
    "show_held_item": true
  },

  "timeout": {
    "team_selection": 60,
    "lead_selection": 60
  }
}
```

---

## Applying Changes

1. Edit the appropriate GUI config file
2. Run `/rankedadmin reload`
3. Reopen the GUI to see changes

---

## See Also

- [Language Files](languages.md) - Message customization
- [Placeholder API](../integration/placeholders.md) - External placeholder integration
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
