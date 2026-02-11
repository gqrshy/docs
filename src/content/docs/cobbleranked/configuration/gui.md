---
title: GUI Customization
description: Customize menu appearance, borders, and button layouts.
---

Make your ranked menus look unique. Customize borders, materials, and layouts.

## GUI Files

Edit files in `config/cobbleranked/gui/`:

| File | Purpose |
|------|---------|
| `ranked_gui.json5` | Ranked battle menu |
| `casual_gui.json5` | Casual battle menu |
| `leaderboard_gui.json5` | Top players display |
| `blacklist_gui.json5` | Banned content viewer |
| `reward_gui.json5` | Season and milestone rewards |

## Border & Fill

Customize the glass panels that fill empty slots:

```json5
{
  "border": {
    "enabled": true,
    "material": "GRAY_STAINED_GLASS_PANE",
    "displayname": " "
  },
  "fill": {
    "enabled": false,
    "material": "BLACK_STAINED_GLASS_PANE",
    "displayname": " "
  }
}
```

| Property | Description |
|----------|-------------|
| `enabled` | Show/hide the border or fill |
| `material` | Item ID (Minecraft or Cobblemon) |
| `displayname` | Item name (use `" "` for blank) |

<details>
<summary><strong>Available Materials</strong></summary>

Glass panes (most common):
- `WHITE_STAINED_GLASS_PANE`, `ORANGE_STAINED_GLASS_PANE`, `MAGENTA_STAINED_GLASS_PANE`
- `LIGHT_BLUE_STAINED_GLASS_PANE`, `YELLOW_STAINED_GLASS_PENE`, `LIME_STAINED_GLASS_PANE`
- `PINK_STAINED_GLASS_PANE`, `GRAY_STAINED_GLASS_PANE`, `LIGHT_GRAY_STAINED_GLASS_PANE`
- `CYAN_STAINED_GLASS_PANE`, `PURPLE_STAINED_GLASS_PANE`, `BLUE_STAINED_GLASS_PANE`
- `BROWN_STAINED_GLASS_PANE`, `GREEN_STAINED_GLASS_PANE`, `RED_STAINED_GLASS_PANE`
- `BLACK_STAINED_GLASS_PANE`

Other decorative items:
- `BARRIER`, `AIR`, `STONE`, `DIRT`

Use any Minecraft or Cobblemon item ID.

</details>

## Ranked GUI

Format buttons and navigation:

```json5
{
  "title": "ranked_gui_title",
  "rows": 6,

  "format_slots": [21, 23, 25],

  "format_buttons": {
    "singles": {
      "slot": 21,
      "material": "minecraft:iron_sword",
      "displayname": "ranked_gui_format_title",
      "lore": [],
      "custom_model_data": 0
    }
  },

  "blacklist_slot": 38,
  "leaderboard_slot": 41,
  "rewards_slot": 44
}
```

## Leaderboard GUI

Pyramid layout for top 16 players:

```json5
{
  "pyramid_slots": {
    "rank_1": [14],
    "rank_2_4": [22, 23, 24],
    "rank_5_9": [30, 31, 32, 33, 34],
    "rank_10_16": [38, 39, 40, 41, 42, 43, 44]
  },

  "buttons": {
    "player_rank": {
      "slot": 47,
      "material": "PLAYER_HEAD",
      "displayname": "leaderboard_your_rank"
    }
  }
}
```

## Blacklist GUI

Browse banned Pokemon, moves, items, abilities:

```json5
{
  "content_slots": [
    11, 12, 13, 14, 15, 16, 17,
    20, 21, 22, 23, 24, 25, 26,
    29, 30, 31, 32, 33, 34, 35,
    38, 39, 40, 41, 42, 43, 44
  ],

  "buttons": {
    "category_selector": { "slot": 48 },
    "prev_page": { "slot": 49 },
    "format_toggle": { "slot": 50 },
    "next_page": { "slot": 51 },
    "sort": { "slot": 52 }
  }
}
```

## Slot Reference

6-row GUI (54 slots):

| Row | Slots |
|-----|-------|
| 1 | 1-9 |
| 2 | 10-18 |
| 3 | 19-27 |
| 4 | 28-36 |
| 5 | 37-45 |
| 6 | 46-54 |

## Hot Reload

Apply changes without restart:

```bash
/rankedadmin reload
```

---

**See Also**: [Language Configuration](languages/) - Customize text and colors
