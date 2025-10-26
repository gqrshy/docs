# GUI Customization

Learn how to customize the CobbleRanked GUI appearance and behavior.

## Overview

CobbleRanked features fully customizable GUIs for:
- **Main ranked menu** - Queue selection, stats, leaderboards
- **Leaderboard display** - Top player rankings
- **Blacklist viewer** - View banned Pokemon/moves/items/abilities
- **Rewards menu** - Claim season and milestone rewards
- **Prepare combat** - Pre-battle team preview

All GUI elements (items, names, lore, positions) are configurable via language-specific JSON5 files.

---

## GUI Files

### File Structure

**⚠️ IMPORTANT**: CobbleRanked uses **language-specific GUI files**, not separate GUI type files.

**Actual file structure:**
```
config/cobbleranked/gui/
├── gui-enUs.json5    # English (US) GUI definitions
├── gui-jaJp.json5    # Japanese GUI definitions
├── gui-ptBr.json5    # Portuguese (Brazil) GUI definitions
└── gui-ruRu.json5    # Russian GUI definitions
```

**Each language file contains ALL GUI definitions** for that language:
- `gui_ranked` - Main ranked menu
- `gui_top_ranked` - Leaderboard display
- `gui_prepare_combat` - Pre-battle screen
- `gui_rewards` - Rewards menu
- `gui_ranked_blocked` - Blacklist viewer
- `closeGui` - Close button shared across GUIs

**Default files are generated automatically** on first server startup.

###File Format

All GUI files use **JSON5** format:
- Supports comments (`//` or `/* */`)
- Allows trailing commas
- More readable than standard JSON

---

## Main Ranked Menu

### gui_ranked

**Section:** `gui_ranked` in `gui-enUs.json5`

This is the main menu opened with `/ranked` command.

```json5
{
  "gui_ranked": {
    // GUI window title
    "title": "&cRanked Menu",

    // GUI size (rows, 1-6)
    // 3 rows = 27 slots (0-26)
    "size": 3,

    // All items in the GUI
    "items": {
      // Player information display
      "player_info": {
        "slot": 4,                  // Center top slot
        "id": "PLAYER_SKIN",        // Special: shows player head
        "display": "&7Information about &c{player}",
        "lore": [
          "",
          " &8▸ &7Matches Played: &f{matches}",
          " &8▸ &7Wins/Losses: &a{wins}&f/&c{losses} &7(&f{win_rate}&7%)",
          " &8▸ &7Win Streak: &b{win_streak}",
          " &8▸ &7Elo: &e{elo}",
          ""
        ]
      },

      // Leaderboard button
      "leaderboard": {
        "slot": 10,
        "display": "&aTop Players",
        "id": "cobblemon:kings_rock",
        "lore": [
          "",
          " &7Click to see the &astrongest",
          " &7players in the ranked",
          ""
        ]
      },

      // Singles queue button
      "singles_queue": {
        "slot": 12,
        "id": "cobblemon:poke_ball",
        "display": "&bSingles Battle",
        "lore": [
          "",
          "&71v1 Ranked Match",
          "&7Battle with one Pokemon",
          "",
          " &7Players in queue: &c{queue_singles}",
          "",
          "&aClick to join queue",
          ""
        ]
      },

      // Doubles queue button
      "doubles_queue": {
        "slot": 14,
        "id": "cobblemon:great_ball",
        "display": "&dDoubles Battle",
        "lore": [
          "",
          "&72v2 Ranked Match",
          "&7Battle with two Pokemon on field",
          "",
          " &7Players in queue: &c{queue_doubles}",
          "",
          "&aClick to join queue",
          ""
        ]
      },

      // Blacklist viewer button
      "blacklist": {
        "slot": 16,
        "id": "cobblemon:red_card",
        "display": "&cBanned Pokémon",
        "lore": [
          "",
          "&7Click here to view",
          "&7the banned pokémons &7in the ranked.",
          ""
        ]
      },

      // Rewards button
      "rewards": {
        "slot": 22,
        "id": "cobblemon:gilded_chest",
        "display": "&aRewards",
        "lore": [
          "",
          " &aCollect rewards from the ranked!",
          ""
        ]
      }
    }
  }
}
```

### Available Placeholders

Placeholders are automatically replaced with player data:

| Placeholder | Description | Example |
|------------|-------------|---------|
| `{player}` | Player username | `"Gashi"` |
| `{matches}` | Total matches played | `"42"` |
| `{wins}` | Total wins | `"28"` |
| `{losses}` | Total losses | `"14"` |
| `{win_rate}` | Win percentage | `"66.7"` |
| `{win_streak}` | Current win streak | `"5"` |
| `{elo}` | Current Elo rating | `"1450"` |
| `{queue_singles}` | Players in Singles queue | `"3"` |
| `{queue_doubles}` | Players in Doubles queue | `"2"` |

### Special Item IDs

| ID | Description |
|----|-------------|
| `PLAYER_SKIN` | Shows player's Minecraft head |
| `POKE_BALL` | Cobblemon Poke Ball item |
| `cobblemon:kings_rock` | Cobblemon item |
| `cobblemon:red_card` | Cobblemon item |
| `cobblemon:gilded_chest` | Cobblemon item |
| `BARRIER` | Minecraft barrier block |
| `ARROW` | Minecraft arrow item |
| `COMPASS` | Minecraft compass item |

---

## Leaderboard GUI

### gui_top_ranked

**Section:** `gui_top_ranked` in `gui-enUs.json5`

Displays top-ranked players in a 6-row GUI.

```json5
{
  "gui_top_ranked": {
    "title": "&aTop Players in the Ranked",
    "size": 6,  // 54 slots for top players

    // Slots where top players are displayed
    "slots_top": [
      10, 11, 12, 13, 14, 15, 16  // Top 7 visible on page 1
    ],

    "items": {
      // Empty slot display (when no player for that rank)
      "empty": {
        "id": "BARRIER",
        "display": "&f{pos}° &cEmpty"
      },

      // Player entry
      "player": {
        "display": "&f{pos}° &a{player}",
        "lore": [
          "",
          "&8» &7Elo: &f{elo}",
          "&8» &7Points: &b{points}",
          "&8» &7Wins: &a{wins}",
          "&8» &7Losses: &c{losses}",
          ""
        ]
      },

      // Back button
      "back": {
        "slot": 49,
        "id": "ARROW",
        "display": "&cGo Back"
      }
    }
  }
}
```

### Leaderboard Placeholders

| Placeholder | Description |
|------------|-------------|
| `{pos}` | Rank position (1, 2, 3...) |
| `{player}` | Player username |
| `{elo}` | Player's Elo rating |
| `{points}` | Total Elo points |
| `{wins}` | Total wins |
| `{losses}` | Total losses |

---

## Blacklist Viewer GUI

### gui_ranked_blocked

**Section:** `gui_ranked_blocked` in `gui-enUs.json5`

Shows banned Pokemon, moves, items, and abilities with pagination.

```json5
{
  "gui_ranked_blocked": {
    "title": "List of banned",
    "size": 6,

    // Display slots for blacklist items
    "slots": [
      10, 11, 12, 13, 14, 15, 16,  // Row 2
      19, 20, 21, 22, 23, 24, 25,  // Row 3
      28, 29, 30, 31, 32, 33, 34   // Row 4
      // 21 items per page
    ],

    "items": {
      // Category selector
      "update": {
        "slot": 49,
        "display": "&6&lCategory: &e{current}",
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&e&lAvailable Categories",
          "&7━━━━━━━━━━━━━━━━━",
          "  ",
          "  {all}",  // List of categories
          "",
          "&7Click to switch"
        ],
        "id": "COMPASS"
      },

      // Next page button
      "nextPage": {
        "slot": 50,
        "display": "&cNext Page",
        "id": "ARROW"
      },

      // Previous page button
      "prevPage": {
        "slot": 48,
        "display": "&cPrevious Page",
        "id": "ARROW"
      }
    }
  }
}
```

### Categories

The GUI shows these blacklist categories:

| Category | Display Line |
|----------|--------------|
| Pokemon | `"line_pokemon": "  Pokemon"` |
| Moves | `"line_moves": "  Moves"` |
| Items | `"line_items": "  Items"` |
| Abilities | `"line_ability": "  Ability"` |

Categories are defined in the `category` section:

```json5
{
  "category": {
    "line_pokemon": "  Pokemon",
    "line_moves": "  Moves",
    "line_items": "  Items",
    "line_ability": "  Ability",
    "select": "  &8▸ &a{value}",  // Selected category
    "defaultColor": "&7"           // Unselected category color
  }
}
```

---

## Rewards GUI

### gui_rewards

**Section:** `gui_rewards` in `gui-enUs.json5`

Displays claimable season and milestone rewards.

```json5
{
  "gui_rewards": {
    "title": "&6Rewards",
    "size": 6,

    // Unclaimed reward item
    "item_menu": {
      "display": "&a&7Reward &8┃ %display%",
      "lore": [
        "&8",
        " &7Requires &6%elo% &7elo to unlock.",
        "&7",
        " &a➤ &fLeft Click &7to collect",
        "&8"
      ]
    },

    // Already collected reward
    "item_collected": {
      "display": "&7[&f!&7] &aCollected",
      "lore": [
        "&7You have already collected this reward."
      ]
    }
  }
}
```

### Reward Placeholders

| Placeholder | Description |
|------------|-------------|
| `%display%` | Reward display name |
| `%elo%` | Required Elo to unlock |

---

## Pre-Battle Combat GUI

### gui_prepare_combat

**Section:** `gui_prepare_combat` in `gui-enUs.json5`

Shows both players' Pokemon before battle starts.

```json5
{
  "gui_prepare_combat": {
    "title": "&cFace off against players in a battle",
    "size": 5,  // 45 slots

    // Slots for player 1's Pokemon (left side)
    "slots_player1": "19,20,21,28,29,30",

    // Slots for player 2's Pokemon (right side)
    "slots_player2": "23,24,25,32,33,34",

    // Player 1 Pokemon display
    "player1": {
      "display": "&a%player%",
      "lore": [
        "&7Prepared for battle",
        "&7Show your power!"
      ]
    },

    // Player 2 Pokemon display
    "player2": {
      "display": "&c%oponente%",
      "lore": [
        "&7Your opponent is ready",
        "&7Will you face them?"
      ]
    }
  }
}
```

### Combat GUI Placeholders

| Placeholder | Description |
|------------|-------------|
| `%player%` | Your username |
| `%oponente%` | Opponent's username |

---

## Shared Components

### Close Button

Defined globally for all GUIs:

```json5
{
  "closeGui": {
    "id": "BARRIER",
    "display": "&cClose"
  }
}
```

---

## Color Codes

### Minecraft Color Codes

Use `&` prefix for colors:

| Code | Color | Usage |
|------|-------|-------|
| `&0` | Black | Dark text |
| `&1` | Dark Blue | Rare items |
| `&2` | Dark Green | Success |
| `&3` | Dark Aqua | Info |
| `&4` | Dark Red | Errors |
| `&5` | Dark Purple | Epic items |
| `&6` | Gold | Legendary items |
| `&7` | Gray | Secondary text |
| `&8` | Dark Gray | Disabled text |
| `&9` | Blue | Uncommon items |
| `&a` | Green | Positive actions |
| `&b` | Aqua | Special items |
| `&c` | Red | Negative actions |
| `&d` | Light Purple | Rare items |
| `&e` | Yellow | Highlights |
| `&f` | White | Primary text |

### Format Codes

| Code | Effect |
|------|--------|
| `&l` | Bold |
| `&m` | Strikethrough |
| `&n` | Underline |
| `&o` | Italic |
| `&r` | Reset (remove all formatting) |

### Examples

```json5
"display": "&6&lLEGENDARY REWARD"  // Bold gold text
"display": "&a&lCLICK TO CLAIM"     // Bold green text
"display": "&7&oRequires 10 wins"   // Italic gray text
"display": "&c&m&lLOCKED"           // Bold strikethrough red text
```

---

## Slot Numbering

GUI slots are numbered 0-53 (for 6-row inventory):

```
Row 1:  0   1   2   3   4   5   6   7   8
Row 2:  9  10  11  12  13  14  15  16  17
Row 3: 18  19  20  21  22  23  24  25  26
Row 4: 27  28  29  30  31  32  33  34  35
Row 5: 36  37  38  39  40  41  42  43  44
Row 6: 45  46  47  48  49  50  51  52  53
```

**Rows configuration:**
- `"size": 1` = 9 slots (0-8)
- `"size": 3` = 27 slots (0-26)
- `"size": 6` = 54 slots (0-53)

---

## Customization Examples

### Example 1: Change Main Menu Title

```json5
{
  "gui_ranked": {
    "title": "&6&l⚔ Competitive Ranked ⚔",  // Changed from default
    // ... rest of config
  }
}
```

### Example 2: Add Multi (2v2singles) Queue Button

```json5
{
  "gui_ranked": {
    "items": {
      // ... existing buttons ...

      "multi_queue": {
        "slot": 22,  // Bottom center
        "id": "cobblemon:ultra_ball",
        "display": "&5Multi Battle",
        "lore": [
          "",
          "&72v2 Singles Match",
          "&7Each player controls 2 Pokemon",
          "",
          " &7Players in queue: &c{queue_multi}",
          "",
          "&aClick to join queue",
          ""
        ]
      }
    }
  }
}
```

### Example 3: Customize Leaderboard Display

```json5
{
  "gui_top_ranked": {
    "title": "&e&l★ TOP RANKED PLAYERS ★",  // Custom title

    // Show top 14 (2 rows)
    "slots_top": [
      10, 11, 12, 13, 14, 15, 16,  // Row 2
      19, 20, 21, 22, 23, 24, 25   // Row 3
    ],

    "items": {
      "player": {
        "display": "&6#{pos} &f{player}",  // Custom format
        "lore": [
          "&8━━━━━━━━━━━━━━━━━",
          "&7Elo Rating: &e{elo}",
          "&7Win/Loss: &a{wins}&f/&c{losses}",
          "&8━━━━━━━━━━━━━━━━━"
        ]
      }
    }
  }
}
```

### Example 4: Themed Rewards Menu

```json5
{
  "gui_rewards": {
    "title": "&6&l✦ CLAIM YOUR REWARDS ✦",

    "item_menu": {
      "display": "&d&l★ &f%display% &d&l★",
      "lore": [
        "&8━━━━━━━━━━━━━━━━━",
        "&7Requirement: &6%elo% &7Elo",
        "&7Status: &a&l✓ UNLOCKED",
        "&8━━━━━━━━━━━━━━━━━",
        "",
        "&d&l» &fLeft-click to claim!",
        "&8━━━━━━━━━━━━━━━━━"
      ]
    },

    "item_collected": {
      "display": "&7[&a✓&7] %display%",
      "lore": [
        "&7You already claimed this reward.",
        "&8(Collected on {date})"
      ]
    }
  }
}
```

---

## Multi-Language Support

CobbleRanked automatically loads the GUI file matching your configured language:

**config.json5:**
```json5
{
  "language": "en-Us"  // Loads gui-enUs.json5
}
```

**Available languages:**
- `en-Us` → `gui-enUs.json5` (English)
- `ja-Jp` → `gui-jaJp.json5` (Japanese)
- `pt-Br` → `gui-ptBr.json5` (Portuguese)
- `ru-Ru` → `gui-ruRu.json5` (Russian)

To add a new language:
1. Copy an existing GUI file (e.g., `gui-enUs.json5`)
2. Rename to your language code (e.g., `gui-frFr.json5` for French)
3. Translate all `display` and `lore` text
4. Set `"language": "fr-Fr"` in config.json5

---

## Troubleshooting

### GUI not updating

**Symptoms:** Changes to GUI files don't appear in-game

**Solutions:**
1. Reload config: `/rankedarena reload`
2. Reopen GUI (close and open again)
3. Check console for JSON5 syntax errors
4. Verify file is in correct folder (`config/cobbleranked/gui/`)
5. Ensure filename matches language setting (`gui-enUs.json5` for `"language": "en-Us"`)

### Items not displaying correctly

**Symptoms:** Items show as barriers or missing

**Solutions:**
1. Check item ID is valid Cobblemon or Minecraft item
2. Use `cobblemon:` prefix for Cobblemon items
3. Verify item exists in current Minecraft/Cobblemon version
4. Check console for item loading errors

**Valid examples:**
```json5
"id": "minecraft:diamond"          // Minecraft item
"id": "cobblemon:poke_ball"        // Cobblemon item
"id": "PLAYER_SKIN"                // Special: player head
"id": "BARRIER"                    // Minecraft constant
```

### Placeholders not replacing

**Symptoms:** `{player}` shows literally instead of player name

**Solutions:**
1. Verify placeholder spelling (case-sensitive)
2. Check placeholder is supported for that GUI section
3. Ensure player data is loaded
4. Check console for placeholder errors

**Supported placeholders by GUI:**
- `gui_ranked`: `{player}`, `{matches}`, `{wins}`, `{losses}`, `{win_rate}`, `{elo}`, `{queue_singles}`, `{queue_doubles}`
- `gui_top_ranked`: `{pos}`, `{player}`, `{elo}`, `{points}`, `{wins}`, `{losses}`
- `gui_rewards`: `%display%`, `%elo%`
- `gui_prepare_combat`: `%player%`, `%oponente%`

### GUI title too long

**Symptoms:** GUI title cut off or not displaying

**Solutions:**
1. Shorten title text (max ~32 characters with formatting)
2. Remove color codes to save space
3. Use abbreviations

**Example:**
```json5
// Too long (45 chars):
"title": "&6&l⚔ Welcome to the Competitive Ranked System ⚔"

// Good (28 chars):
"title": "&6&l⚔ Competitive Ranked ⚔"
```

### Invalid JSON5 syntax

**Symptoms:** GUI doesn't load, console shows parse errors

**Common mistakes:**
```json5
// ❌ Missing comma (error in strict JSON, OK in JSON5)
{
  "title": "Test"
  "size": 3  // Missing comma after "Test"
}

// ✓ Correct
{
  "title": "Test",
  "size": 3  // Trailing comma OK in JSON5
}
```

**Check for:**
- Missing closing braces `}`
- Unclosed quotes `"`
- Invalid escape characters
- Comments in wrong places

**Validation:**
Use online JSON5 validator: https://json5.org/

---

## Best Practices

### Design Tips

**1. Visual hierarchy:**
- Important items: Center slots (4, 13, 22, 31, 40, 49)
- Navigation: Bottom row (45-53)
- Info: Top corners (0, 8)
- Actions: Middle area (10-16, 19-25)

**2. Consistent styling:**
- Use same color scheme across all GUIs
- Consistent lore format
- Similar item types for similar actions

**3. Clear feedback:**
- Use bold (`&l`) for actionable items
- Gray (`&7`) for disabled/info text
- Green (`&a`) for positive actions
- Red (`&c`) for negative actions

**4. Spacing:**
- Use empty lore lines (`""`) for visual breathing room
- Don't overcrowd slots
- Leave corners empty for clean look

### Performance

**Optimize GUIs:**
- Avoid excessive lore lines (max 10-15)
- Use static items for decoration (faster than player heads)
- Limit player heads to necessary slots

**Load times:**
- Player heads load slower (fetches skin from Mojang)
- Static items load instantly
- Large GUIs (6 rows) take slightly longer

### Accessibility

**Color blind friendly:**
- Don't rely only on color (use symbols too)
- Green/Red: Use ✓/✗ symbols
- Use textures for differentiation

**Example:**
```json5
{
  "unlocked": {
    "display": "&a&l✓ Unlocked",  // Green + checkmark
    "id": "minecraft:emerald"      // Green texture
  },
  "locked": {
    "display": "&c&l✗ Locked",    // Red + X
    "id": "minecraft:barrier"      // Red texture
  }
}
```

---

## Frequently Asked Questions

### Can I add custom items?

**Yes!** You can use any Minecraft or Cobblemon item:

```json5
{
  "custom": {
    "slot": 10,
    "id": "cobblemon:master_ball",  // Cobblemon item
    "display": "&dMaster Ball Reward"
  }
}
```

### Can I change GUI size?

**Yes!** Change the `size` value (1-6 rows):

```json5
{
  "gui_ranked": {
    "size": 5  // Changed from 3 to 5 rows (45 slots)
  }
}
```

**Note:** Changing size may require adjusting slot numbers.

### Can I use animated items?

**No.** Minecraft GUIs don't support animations. However, you can:
- Use enchantment glint for sparkle effect
- Change items when clicked (reactive)

### Can I add sounds?

**Sounds are hardcoded** in CobbleRanked. Custom sounds not configurable via GUI files.

**Default sounds:**
- Click: `UI_BUTTON_CLICK`
- Close: `BLOCK_CHEST_CLOSE`
- Error: `ENTITY_VILLAGER_NO`

### Can I hide empty slots?

**No.** Empty slots show as transparent. Use filler items (glass panes) to fill empty spaces:

```json5
{
  "filler": {
    "slot": 0,  // Or use array: "slots": [0, 1, 2, ...]
    "id": "minecraft:gray_stained_glass_pane",
    "display": " "  // Empty name
  }
}
```

### Can I use custom model data?

**Not directly in GUI config.** Custom model data must be specified in reward configs or item definitions.

---

**Next:** Learn about [Language Customization](languages.md) for translating menu text.
