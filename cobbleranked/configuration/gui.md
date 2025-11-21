# GUI Customization

Customize CobbleRanked GUI appearance and layout.

## GUI Files

**Location:** `config/cobbleranked/gui/`

CobbleRanked uses language-specific GUI files:

```
gui/
├── gui-enUs.json5    # English
├── gui-jaJp.json5    # Japanese
├── gui-ptBr.json5    # Portuguese
└── gui-ruRu.json5    # Russian
```

Each file contains **all** GUI definitions for that language.

## Available GUIs

- **gui_ranked** - Main menu (queue, stats, leaderboards)
- **gui_top_ranked** - Leaderboard display
- **gui_prepare_combat** - Pre-battle team preview
- **gui_rewards** - Season/milestone rewards
- **gui_ranked_blocked** - Blacklist viewer
- **closeGui** - Close button (shared)

## Basic Customization

### Change Item Display

```json5
{
  "gui_ranked": {
    "title": "Ranked Battles",
    "rows": 3,
    "items": {
      "queue_singles": {
        "item": "minecraft:iron_sword",  // Change item
        "name": "Queue Singles",           // Change name
        "slot": 11,                        // Change position
        "lore": [
          "Click to join singles queue"
        ]
      }
    }
  }
}
```

### Item Fields

| Field | Description | Required |
|-------|-------------|----------|
| `item` | Item ID (e.g., `minecraft:diamond`) | Yes |
| `name` | Display name (supports color codes) | Yes |
| `slot` | Inventory slot (0-53) | Yes |
| `lore` | Array of lore lines | No |
| `amount` | Item stack size (1-64) | No |
| `glow` | Add enchantment glow | No |

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

## GUI Layout

Slots are numbered 0-53 (6 rows × 9 columns):

```
 0  1  2  3  4  5  6  7  8
 9 10 11 12 13 14 15 16 17
18 19 20 21 22 23 24 25 26
27 28 29 30 31 32 33 34 35
36 37 38 39 40 41 42 43 44
45 46 47 48 49 50 51 52 53
```

## Placeholders

Use placeholders for dynamic content:

| Placeholder | Description |
|-------------|-------------|
| `{elo}` | Player's Elo rating |
| `{wins}` | Win count |
| `{losses}` | Loss count |
| `{rank}` | Player's rank position |
| `{tier}` | Player's tier (Pokeball, Greatball, etc.) |
| `{season}` | Current season name |
| `{queue_count}` | Players in queue |

Example:
```json5
"lore": [
  "Your Elo: &e{elo}",
  "Wins: &a{wins} &7| Losses: &c{losses}"
]
```

## Common Customizations

### Change Queue Button Position

```json5
"queue_singles": {
  "slot": 20  // Move to different slot
}
```

### Add Custom Decoration Items

```json5
"decoration": {
  "item": "minecraft:black_stained_glass_pane",
  "name": " ",
  "slot": 0
}
```

### Modify Leaderboard Display

```json5
"gui_top_ranked": {
  "title": "&6&lTop Players",
  "rows": 6
}
```

## Applying Changes

1. Edit GUI file
2. Run `/rankedadmin reload`
3. Reopen GUI to see changes

**Note:** Config reloads automatically detect language from `config.json5`.
