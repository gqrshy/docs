---
title: GUI Customization
description: Customize the CobbleRanked menus and interfaces.
---

Customize menus in `config/cobbleranked/gui/*.json5`.

## GUI Files

| File | Purpose |
|------|---------|
| `ranked_gui.json5` | Ranked battle menu |
| `casual_gui.json5` | Casual battle menu |
| `leaderboard_gui.json5` | Leaderboard display |
| `team_selection_gui.json5` | Team selection screen |
| `lead_selection_gui.json5` | Lead selection screen |
| `blacklist_gui.json5` | Banned Pokemon viewer |

## Basic Structure

```json5
{
  "title": "Ranked Battles",
  "rows": 6,
  "items": {
    "queue_singles": {
      "slot": 10,
      "item": "cobblemon:poke_ball",
      "name": "&eSingles Queue",
      "lore": [
        "&7Click to join singles queue",
        "&7Your ELO: &f{elo_singles}"
      ],
      "action": "JOIN_QUEUE_SINGLES"
    }
  }
}
```

## Item Properties

| Property | Description |
|----------|-------------|
| `slot` | Inventory slot (0-53 for 6 rows) |
| `item` | Minecraft/Cobblemon item ID |
| `name` | Display name (supports color codes) |
| `lore` | Description lines |
| `action` | Click action |

## Available Actions

| Action | Description |
|--------|-------------|
| `JOIN_QUEUE_SINGLES` | Join singles queue |
| `JOIN_QUEUE_DOUBLES` | Join doubles queue |
| `JOIN_QUEUE_TRIPLES` | Join triples queue |
| `LEAVE_QUEUE` | Leave current queue |
| `OPEN_LEADERBOARD` | Open leaderboard |
| `OPEN_STATS` | Open player stats |
| `CLOSE` | Close menu |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player name |
| `{elo_singles}` | Singles ELO |
| `{elo_doubles}` | Doubles ELO |
| `{elo_triples}` | Triples ELO |
| `{rank_singles}` | Singles rank |
| `{wins}` | Total wins |
| `{losses}` | Total losses |
| `{season}` | Current season name |

## Color Codes

| Code | Color |
|------|-------|
| `&0` | Black |
| `&1` | Dark Blue |
| `&2` | Dark Green |
| `&4` | Dark Red |
| `&5` | Purple |
| `&6` | Gold |
| `&7` | Gray |
| `&a` | Green |
| `&b` | Aqua |
| `&c` | Red |
| `&d` | Pink |
| `&e` | Yellow |
| `&f` | White |
| `&l` | Bold |
| `&o` | Italic |
| `&n` | Underline |
| `&r` | Reset |

## Example: Custom Ranked Menu

```json5
{
  "title": "&5Ranked Battles",
  "rows": 5,
  "items": {
    "singles": {
      "slot": 11,
      "item": "minecraft:diamond_sword",
      "name": "&e⚔ Singles",
      "lore": [
        "&7Classic 1v1 battles",
        "",
        "&7Your ELO: &f{elo_singles}",
        "&7Rank: &f#{rank_singles}",
        "",
        "&aClick to queue!"
      ],
      "action": "JOIN_QUEUE_SINGLES"
    },
    "doubles": {
      "slot": 13,
      "item": "minecraft:diamond_axe",
      "name": "&e⚔ Doubles",
      "lore": [
        "&7VGC-style 2v2",
        "",
        "&7Your ELO: &f{elo_doubles}",
        "",
        "&aClick to queue!"
      ],
      "action": "JOIN_QUEUE_DOUBLES"
    },
    "leaderboard": {
      "slot": 31,
      "item": "minecraft:golden_apple",
      "name": "&6🏆 Leaderboard",
      "lore": [
        "&7View top players"
      ],
      "action": "OPEN_LEADERBOARD"
    }
  }
}
```

## Hot Reload

Reload GUI without restart:

```
/rankedadmin reload
```

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [Language Configuration](/docs/cobbleranked/configuration/languages/) - Message customization
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
