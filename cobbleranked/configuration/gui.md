# GUI Customization

Customize CobbleRanked GUI appearance and layout.

---

## GUI Files

**Location:** `config/cobbleranked/gui/`

CobbleRanked uses language-specific GUI files:

```
gui/
├── gui-enUs.json5    # English
├── gui-jaJp.json5    # Japanese
└── gui-frFr.json5    # French (v1.0.13+)
```

Each file contains **all** GUI definitions for that language.

**Which file is used?**
The active GUI file is determined by the `language` setting in `config/cobbleranked/config.json5`.

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
| `id` | Item ID (e.g., `minecraft:diamond`, `cobblemon:poke_ball`) | Yes |
| `display` | Display name (supports color codes) | Yes |
| `slot` | Inventory slot (0-53, 1-indexed in config) | Yes |
| `lore` | Array of lore lines | No |
| `amount` | Item stack size (1-64) | No |
| `glow` | Add enchantment glow | No |
| `custom_model_data` | Custom model data value for resource packs | No |

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

### Add Custom Decoration Items

```json5
"decoration": {
  "id": "minecraft:black_stained_glass_pane",
  "display": " ",
  "slot": 0,
  "custom_model_data": 0
}
```

### Modify Leaderboard Display

```json5
"gui_top_ranked": {
  "title": "&6&lTop Players",
  "size": 6  // 6 rows
}
```

## Applying Changes

1. Edit GUI file
2. Run `/rankedadmin reload`
3. Reopen GUI to see changes

**Note:** Config reloads automatically detect language from `config.json5`.

---

## See Also

- [Language Files](languages.md) - Message customization
- [Placeholder API](../integration/placeholders.md) - GUI placeholders
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
