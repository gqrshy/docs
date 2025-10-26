# GUI Customization

Learn how to customize the CobbleRanked GUI appearance and behavior.

## Overview

CobbleRanked features fully customizable GUIs for:
- **Main ranked menu** - Queue selection, stats, leaderboards
- **Format selection** - Choose Singles or Doubles
- **Leaderboard display** - Top 10 rankings
- **Rewards menu** - Claim season and milestone rewards

All GUI elements (items, names, lore, positions) are configurable via JSON5 files.

---

## GUI Files

### File Locations

**GUI configuration files:**
```
config/cobbleranked/gui/
├── gui-main.json5        # Main ranked menu
├── gui-format.json5      # Format selection screen
├── gui-leaderboard.json5 # Leaderboard display
└── gui-rewards.json5     # Rewards claim menu
```

**Default files are generated automatically** on first server startup.

### File Format

All GUI files use **JSON5** format:
- Supports comments (`//` or `/* */`)
- Allows trailing commas
- More readable than standard JSON

---

## Main Ranked Menu

### gui-main.json5

**File:** `config/cobbleranked/gui/gui-main.json5`

```json5
{
  // GUI Properties
  "title": "&8&lRanked Menu",
  "rows": 3,  // 1-6 rows (9 slots per row)

  // GUI Items
  "items": {
    "join_singles": {
      "slot": 11,
      "item": "minecraft:iron_sword",
      "display": "&6&lJoin Singles Queue",
      "lore": [
        "&71v1 ranked battles",
        "",
        "&eClick to join queue"
      ],
      "action": "JOIN_SINGLES"
    },

    "join_doubles": {
      "slot": 13,
      "item": "minecraft:diamond_sword",
      "display": "&b&lJoin Doubles Queue",
      "lore": [
        "&72v2 ranked battles",
        "",
        "&eClick to join queue"
      ],
      "action": "JOIN_DOUBLES"
    },

    "view_stats": {
      "slot": 15,
      "item": "minecraft:paper",
      "display": "&a&lView Stats",
      "lore": [
        "&7Check your Elo rating",
        "&7and win/loss record",
        "",
        "&eClick to view"
      ],
      "action": "VIEW_STATS"
    },

    "leaderboard": {
      "slot": 20,
      "item": "minecraft:gold_block",
      "display": "&e&lLeaderboard",
      "lore": [
        "&7View top 10 ranked players",
        "",
        "&eClick to view"
      ],
      "action": "VIEW_LEADERBOARD"
    },

    "rewards": {
      "slot": 24,
      "item": "minecraft:emerald",
      "display": "&2&lRewards",
      "lore": [
        "&7Claim season and milestone rewards",
        "",
        "&eClick to view"
      ],
      "action": "VIEW_REWARDS"
    },

    "filler": {
      "slots": [0, 1, 2, 3, 5, 6, 7, 8, 9, 17, 18, 19, 21, 23, 25, 26],
      "item": "minecraft:gray_stained_glass_pane",
      "display": " ",
      "lore": []
    }
  }
}
```

### Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Integer | Inventory slot (0-53) |
| `slots` | Array | Multiple slots (for filler items) |
| `item` | String | Minecraft item ID |
| `display` | String | Item display name (supports color codes) |
| `lore` | Array | Item lore lines (supports color codes) |
| `action` | String | Click action (see Actions below) |
| `enchanted` | Boolean | Add enchantment glint (optional) |
| `amount` | Integer | Item stack size (optional, default 1) |

### Available Actions

| Action | Description |
|--------|-------------|
| `JOIN_SINGLES` | Open Singles queue |
| `JOIN_DOUBLES` | Open Doubles queue |
| `VIEW_STATS` | Show player stats |
| `VIEW_LEADERBOARD` | Open leaderboard menu |
| `VIEW_REWARDS` | Open rewards menu |
| `CLOSE` | Close GUI |

### Slot Numbering

```
0  1  2  3  4  5  6  7  8   (Row 1)
9  10 11 12 13 14 15 16 17  (Row 2)
18 19 20 21 22 23 24 25 26  (Row 3)
27 28 29 30 31 32 33 34 35  (Row 4)
36 37 38 39 40 41 42 43 44  (Row 5)
45 46 47 48 49 50 51 52 53  (Row 6)
```

**Rows:**
- `rows: 1` = 9 slots (0-8)
- `rows: 3` = 27 slots (0-26)
- `rows: 6` = 54 slots (0-53)

---

## Format Selection GUI

### gui-format.json5

**File:** `config/cobbleranked/gui/gui-format.json5`

```json5
{
  "title": "&8&lSelect Battle Format",
  "rows": 3,

  "items": {
    "singles": {
      "slot": 11,
      "item": "minecraft:iron_sword",
      "display": "&6&lSingles (1v1)",
      "lore": [
        "&7Classic one-on-one battles",
        "&7One Pokemon active per side",
        "",
        "&eCurrent Elo: &f{singles_elo}",
        "&eRank: &f#{singles_rank}",
        "",
        "&aClick to join Singles queue"
      ],
      "action": "SELECT_SINGLES"
    },

    "doubles": {
      "slot": 15,
      "item": "minecraft:diamond_sword",
      "display": "&b&lDoubles (2v2)",
      "lore": [
        "&7VGC-style team battles",
        "&7Two Pokemon active per side",
        "",
        "&eCurrent Elo: &f{doubles_elo}",
        "&eRank: &f#{doubles_rank}",
        "",
        "&aClick to join Doubles queue"
      ],
      "action": "SELECT_DOUBLES"
    },

    "back": {
      "slot": 22,
      "item": "minecraft:barrier",
      "display": "&cBack",
      "lore": [
        "&7Return to main menu"
      ],
      "action": "CLOSE"
    }
  }
}
```

### Format Placeholders

| Placeholder | Description |
|------------|-------------|
| `{singles_elo}` | Player's Singles Elo rating |
| `{singles_rank}` | Player's Singles rank |
| `{singles_wins}` | Singles wins |
| `{singles_losses}` | Singles losses |
| `{doubles_elo}` | Player's Doubles Elo rating |
| `{doubles_rank}` | Player's Doubles rank |
| `{doubles_wins}` | Doubles wins |
| `{doubles_losses}` | Doubles losses |

---

## Leaderboard GUI

### gui-leaderboard.json5

**File:** `config/cobbleranked/gui/gui-leaderboard.json5`

```json5
{
  "title": "&8&lLeaderboard - {format}",
  "rows": 6,

  "items": {
    // Rank 1 (Champion)
    "rank_1": {
      "slot": 13,
      "item": "minecraft:player_head",
      "display": "&6&l🥇 1st Place - {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7Record: &f{wins}W - {losses}L",
        "&7Win Rate: &a{winrate}%",
        "",
        "&6⭐ Current Champion ⭐"
      ],
      "skull_owner": "{player}",
      "enchanted": true
    },

    // Rank 2-3 (Masters)
    "rank_2": {
      "slot": 20,
      "item": "minecraft:player_head",
      "display": "&e&l🥈 2nd Place - {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7Record: &f{wins}W - {losses}L",
        "&7Win Rate: &a{winrate}%"
      ],
      "skull_owner": "{player}"
    },

    "rank_3": {
      "slot": 24,
      "item": "minecraft:player_head",
      "display": "&c&l🥉 3rd Place - {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7Record: &f{wins}W - {losses}L",
        "&7Win Rate: &a{winrate}%"
      ],
      "skull_owner": "{player}"
    },

    // Ranks 4-10 (Elite)
    "rank_4": {
      "slot": 28,
      "item": "minecraft:player_head",
      "display": "&f4. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    "rank_5": {
      "slot": 29,
      "item": "minecraft:player_head",
      "display": "&f5. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    "rank_6": {
      "slot": 30,
      "item": "minecraft:player_head",
      "display": "&f6. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    "rank_7": {
      "slot": 32,
      "item": "minecraft:player_head",
      "display": "&f7. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    "rank_8": {
      "slot": 33,
      "item": "minecraft:player_head",
      "display": "&f8. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    "rank_9": {
      "slot": 34,
      "item": "minecraft:player_head",
      "display": "&f9. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    "rank_10": {
      "slot": 40,
      "item": "minecraft:player_head",
      "display": "&f10. {player}",
      "lore": [
        "&7Elo: &f{elo}",
        "&7{wins}W - {losses}L ({winrate}%)"
      ],
      "skull_owner": "{player}"
    },

    // Navigation
    "back": {
      "slot": 49,
      "item": "minecraft:barrier",
      "display": "&cBack",
      "lore": [
        "&7Return to main menu"
      ],
      "action": "CLOSE"
    }
  }
}
```

### Leaderboard Placeholders

| Placeholder | Description |
|------------|-------------|
| `{format}` | Battle format (Singles/Doubles) |
| `{player}` | Player username |
| `{elo}` | Player's Elo rating |
| `{wins}` | Total wins |
| `{losses}` | Total losses |
| `{winrate}` | Win percentage (e.g., 65.2) |
| `{rank}` | Player's rank position |

### Player Heads

Use `skull_owner` property to display player heads:

```json5
{
  "rank_1": {
    "item": "minecraft:player_head",
    "skull_owner": "{player}",  // Uses player's skin
    "display": "&6{player}"
  }
}
```

**Static heads:**
```json5
{
  "decoration": {
    "item": "minecraft:player_head",
    "skull_owner": "MHF_Question",  // Minecraft head
    "display": "&eInfo"
  }
}
```

---

## Rewards GUI

### gui-rewards.json5

**File:** `config/cobbleranked/gui/gui-rewards.json5`

```json5
{
  "title": "&8&lRewards - {player}",
  "rows": 5,

  "items": {
    // Unclaimed reward example
    "reward_unclaimed": {
      "slot": 11,
      "item": "minecraft:emerald",
      "display": "&a&lUnclaimed Reward",
      "lore": [
        "&7{reward_name}",
        "",
        "&7Requirements: &f{requirement}",
        "&7Status: &a✓ Unlocked",
        "",
        "&aClick to claim!"
      ],
      "enchanted": true,
      "action": "CLAIM_REWARD"
    },

    // Claimed reward example
    "reward_claimed": {
      "slot": 12,
      "item": "minecraft:gray_dye",
      "display": "&7&lClaimed Reward",
      "lore": [
        "&7{reward_name}",
        "",
        "&7Requirements: &f{requirement}",
        "&7Status: &a✓ Claimed",
        "",
        "&7Already collected"
      ],
      "action": "NONE"
    },

    // Locked reward example
    "reward_locked": {
      "slot": 13,
      "item": "minecraft:barrier",
      "display": "&c&lLocked Reward",
      "lore": [
        "&7{reward_name}",
        "",
        "&7Requirements: &f{requirement}",
        "&7Status: &c✗ Not unlocked",
        "",
        "&cRequirements not met"
      ],
      "action": "NONE"
    },

    // Info item
    "info": {
      "slot": 4,
      "item": "minecraft:book",
      "display": "&e&lReward Information",
      "lore": [
        "&7Earn rewards by:",
        "&8• &7Winning battles",
        "&8• &7Reaching Elo milestones",
        "&8• &7Ranking high in seasons",
        "",
        "&7Unclaimed rewards: &a{unclaimed_count}"
      ]
    },

    // Filter: Season rewards
    "filter_season": {
      "slot": 19,
      "item": "minecraft:diamond",
      "display": "&b&lSeason Rewards",
      "lore": [
        "&7Rewards from season rankings",
        "",
        "&eClick to view"
      ],
      "action": "FILTER_SEASON"
    },

    // Filter: Milestone rewards
    "filter_milestones": {
      "slot": 25,
      "item": "minecraft:gold_ingot",
      "display": "&6&lMilestone Rewards",
      "lore": [
        "&7Rewards from achievements",
        "",
        "&eClick to view"
      ],
      "action": "FILTER_MILESTONES"
    },

    // Back button
    "back": {
      "slot": 40,
      "item": "minecraft:barrier",
      "display": "&cBack",
      "lore": [
        "&7Return to main menu"
      ],
      "action": "CLOSE"
    }
  }
}
```

### Reward Placeholders

| Placeholder | Description |
|------------|-------------|
| `{player}` | Player username |
| `{reward_name}` | Reward display name |
| `{requirement}` | Requirement description |
| `{unclaimed_count}` | Number of unclaimed rewards |
| `{format}` | Battle format (Singles/Doubles) |

### Reward States

**Unclaimed (Available):**
- `item: "minecraft:emerald"`
- `enchanted: true`
- `action: "CLAIM_REWARD"`
- Green color codes (&a)

**Claimed (Collected):**
- `item: "minecraft:gray_dye"`
- No enchantment
- `action: "NONE"`
- Gray color codes (&7)

**Locked (Not unlocked):**
- `item: "minecraft:barrier"`
- No enchantment
- `action: "NONE"`
- Red color codes (&c)

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

## Customization Examples

### Example 1: Compact Main Menu

```json5
{
  "title": "&8Ranked",
  "rows": 1,

  "items": {
    "singles": {
      "slot": 1,
      "item": "minecraft:iron_sword",
      "display": "&6Singles",
      "lore": ["&eClick to join"],
      "action": "JOIN_SINGLES"
    },
    "doubles": {
      "slot": 3,
      "item": "minecraft:diamond_sword",
      "display": "&bDoubles",
      "lore": ["&eClick to join"],
      "action": "JOIN_DOUBLES"
    },
    "stats": {
      "slot": 5,
      "item": "minecraft:paper",
      "display": "&aStats",
      "action": "VIEW_STATS"
    },
    "leaderboard": {
      "slot": 7,
      "item": "minecraft:gold_block",
      "display": "&eLeaderboard",
      "action": "VIEW_LEADERBOARD"
    }
  }
}
```

### Example 2: Large Leaderboard (Top 25)

```json5
{
  "title": "&8&lTop 25 Leaderboard",
  "rows": 6,

  "items": {
    "rank_1": {
      "slot": 4,
      "item": "minecraft:player_head",
      "display": "&6&l🥇 {player}",
      "lore": ["&7Elo: &f{elo}", "&7{wins}W - {losses}L"],
      "skull_owner": "{player}",
      "enchanted": true
    },
    // Ranks 2-25 in rows...
    "rank_2": { "slot": 9, /* ... */ },
    "rank_3": { "slot": 10, /* ... */ },
    // ... up to rank_25
  }
}
```

### Example 3: Themed Rewards Menu

```json5
{
  "title": "&6&l⭐ Ranked Rewards ⭐",
  "rows": 6,

  "items": {
    "reward_unclaimed": {
      "item": "minecraft:nether_star",
      "display": "&d&l✦ {reward_name} ✦",
      "lore": [
        "&8━━━━━━━━━━━━━━━━",
        "&7Requirement: &f{requirement}",
        "&7Status: &a&l✓ UNLOCKED",
        "&8━━━━━━━━━━━━━━━━",
        "",
        "&d&lCLICK TO CLAIM!"
      ],
      "enchanted": true
    },

    "reward_locked": {
      "item": "minecraft:red_stained_glass_pane",
      "display": "&c&l✗ {reward_name}",
      "lore": [
        "&8━━━━━━━━━━━━━━━━",
        "&7Requirement: &f{requirement}",
        "&7Status: &c&l✗ LOCKED",
        "&8━━━━━━━━━━━━━━━━"
      ]
    }
  }
}
```

---

## Advanced Features

### Dynamic Items

Items can change based on player state:

**Queue button (not in queue):**
```json5
{
  "join_queue": {
    "item": "minecraft:iron_sword",
    "display": "&aJoin Queue",
    "lore": ["&eClick to join"],
    "action": "JOIN_QUEUE"
  }
}
```

**Queue button (in queue):**
```json5
{
  "leave_queue": {
    "item": "minecraft:barrier",
    "display": "&cLeave Queue",
    "lore": ["&7Currently queued", "&eClick to leave"],
    "action": "LEAVE_QUEUE",
    "enchanted": true
  }
}
```

**Implementation:** Automatically handled by CobbleRanked based on player state.

### Conditional Display

Some placeholders return empty if not applicable:

```json5
{
  "stats": {
    "lore": [
      "&7Elo: &f{elo}",
      "&7Rank: &f#{rank}",  // Empty if not ranked
      "&7Provisional: &e{provisional}"  // Empty if not provisional
    ]
  }
}
```

### Multi-Language Support

Use language keys instead of hardcoded text:

```json5
{
  "join_queue": {
    "display": "{lang:gui.queue.join}",
    "lore": ["{lang:gui.queue.join.lore}"]
  }
}
```

**Language file (language/en-Us.yml):**
```yml
gui:
  queue:
    join: "&aJoin Queue"
    join.lore: "&eClick to join ranked queue"
```

**Not currently implemented** - Future feature planned.

---

## Troubleshooting

### GUI not updating

**Symptoms:** Changes to GUI files don't appear in-game

**Solutions:**
1. Reload config: `/rankedarena reload`
2. Reopen GUI (close and open again)
3. Check console for JSON5 syntax errors
4. Verify file is in correct folder (`config/cobbleranked/gui/`)

### Items not clickable

**Symptoms:** Clicking items does nothing

**Solutions:**
1. Check `action` property is set correctly
2. Verify action name matches available actions
3. Check console for errors when clicking
4. Ensure item is in correct slot

### Placeholders not replacing

**Symptoms:** `{player}` shows literally instead of player name

**Solutions:**
1. Verify placeholder spelling (case-sensitive)
2. Check placeholder is supported for that GUI
3. Ensure player data is loaded
4. Check console for placeholder errors

### GUI title too long

**Symptoms:** GUI title cut off or not displaying

**Solutions:**
1. Shorten title text (max 32 characters)
2. Remove color codes to save space
3. Use abbreviations

### Invalid JSON5 syntax

**Symptoms:** GUI doesn't load, console shows parse errors

**Common mistakes:**
```json5
{
  "item": "minecraft:diamond",  // Missing trailing comma OK in JSON5
  "display": "Test"
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
- Important items: Center slots (13, 22, 31, 40)
- Navigation: Bottom row (45-53)
- Info: Top corners (0, 8)

**2. Consistent styling:**
- Use same color scheme across all GUIs
- Consistent lore format
- Similar item types for similar actions

**3. Clear feedback:**
- Enchanted items = clickable/important
- Gray items = disabled/claimed
- Barrier = close/back/cancel

**4. Spacing:**
- Use filler items to separate sections
- Don't overcrowd slots
- Leave empty spaces for visual breathing room

### Performance

**Optimize GUIs:**
- Avoid excessive lore lines (max 10-15)
- Don't use too many player heads (lag)
- Limit enchantment glints to important items

**Load times:**
- Player heads load slower (fetches skin from Mojang)
- Static items load instantly
- Use static items for decoration

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
    "item": "minecraft:emerald"
  },
  "locked": {
    "display": "&c&l✗ Locked",    // Red + X
    "item": "minecraft:barrier"
  }
}
```

---

## Frequently Asked Questions

### Can I add custom items?

**Yes!** You can use any Minecraft item:

```json5
{
  "custom": {
    "slot": 10,
    "item": "cobblemon:poke_ball",  // Cobblemon item
    "display": "&ePokeball Reward",
    "action": "CUSTOM_ACTION"
  }
}
```

**Note:** Custom actions require mod support.

### Can I change GUI size?

**Yes!** Change `rows` value (1-6):

```json5
{
  "title": "&8Compact Menu",
  "rows": 1  // 9 slots (1 row)
}
```

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
    "slots": [0, 1, 2, 3, 5, 6, 7, 8],
    "item": "minecraft:gray_stained_glass_pane",
    "display": " "
  }
}
```

---

**Next:** Learn about [Migration Guide](migration.md) for updating from older versions.
