# GUI Customization

Customize CobbleRanked GUI appearance and layout.

---

## Overview

CobbleRanked uses YAML-based GUI configuration files for full customization of menus, buttons, and layouts.

**Location:** `config/cobbleranked/gui/`

---

## GUI Files

### Language-Specific Main GUI Files

```
gui/
├── gui-enUs.yaml    # English (main menu, leaderboard, etc.)
├── gui-jaJp.yaml    # Japanese
└── gui-frFr.yaml    # French
```

These files contain the main menu (`gui_ranked`), leaderboard display (`gui_top_ranked`), and other primary GUIs.

### Specialized GUI Config Files

```
gui/
├── reward_gui.yaml       # Season & milestone rewards
├── leaderboard_gui.yaml  # Pyramid leaderboard layout
├── blacklist_gui.yaml    # Banned Pokemon/moves/items viewer
├── selection_gui.yaml    # Team & lead selection
└── match_ready_gui.yaml  # Pre-battle ready check
```

| File | Description |
|------|-------------|
| `gui-{lang}.yaml` | Main menus (determined by `language` in config) |
| `reward_gui.yaml` | Season and milestone reward displays |
| `leaderboard_gui.yaml` | Pyramid-style leaderboard |
| `blacklist_gui.yaml` | Restricted Pokemon/moves/items viewer |
| `selection_gui.yaml` | Team and lead selection screens |
| `match_ready_gui.yaml` | Ready check before battle |

---

## Available GUIs

| GUI | Config File | Description |
|-----|-------------|-------------|
| `gui_ranked` | `gui-{lang}.yaml` | Main menu (queue buttons, stats) |
| `gui_top_ranked` | `gui-{lang}.yaml` | Legacy leaderboard display |
| `gui_prepare_combat` | `gui-{lang}.yaml` | Pre-battle team preview |
| `gui_match_ready` | `match_ready_gui.yaml` | Ready check before battle |
| Pyramid Leaderboard | `leaderboard_gui.yaml` | Advanced pyramid layout |
| Rewards | `reward_gui.yaml` | Season & milestone rewards |
| Blacklist | `blacklist_gui.yaml` | Banned items viewer |
| Team Selection | `selection_gui.yaml` | Pokemon team selection |
| Lead Selection | `selection_gui.yaml` | Lead Pokemon selection |

---

## Slot Numbering

Slots are numbered 1-54 for a 6-row chest (1-indexed):

```
 1  2  3  4  5  6  7  8  9
10 11 12 13 14 15 16 17 18
19 20 21 22 23 24 25 26 27
28 29 30 31 32 33 34 35 36
37 38 39 40 41 42 43 44 45
46 47 48 49 50 51 52 53 54
```

---

## Basic Customization

### Item Configuration

```yaml
gui_ranked:
  title: "&cRanked Menu"
  size: 4  # Number of rows (1-6)
  items:
    singles_queue:
      slot: 11
      id: "cobblemon:poke_ball"
      display: "&bSingles Battle"
      lore:
        - ""
        - "&71v1 Ranked Match"
        - " &7Players in queue: &c{queue_singles}"
        - ""
        - "&aClick to join queue"
        - ""
      customModelData: 0
```

### Item Fields

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Item ID (Minecraft, Cobblemon, or special) | ✅ |
| `display` | Display name (supports colors/placeholders) | ✅ |
| `slot` | Inventory slot (1-54, 1-indexed) | ✅ |
| `lore` | Array of lore lines | ❌ |
| `customModelData` | Custom model data for resource packs | ❌ |

### Special Item IDs

| ID | Description |
|----|-------------|
| `PLAYER_SKIN` | Player's head with their skin |
| `minecraft:*` | Any vanilla Minecraft item |
| `cobblemon:*` | Any Cobblemon item |

---

## Color Codes

Use `&` prefix for colors and formatting:

| Code | Color | Code | Color |
|------|-------|------|-------|
| `&0` | Black | `&8` | Dark Gray |
| `&1` | Dark Blue | `&9` | Blue |
| `&2` | Dark Green | `&a` | Green |
| `&3` | Dark Aqua | `&b` | Aqua |
| `&4` | Dark Red | `&c` | Red |
| `&5` | Dark Purple | `&d` | Light Purple |
| `&6` | Gold | `&e` | Yellow |
| `&7` | Gray | `&f` | White |

| Code | Style |
|------|-------|
| `&l` | **Bold** |
| `&o` | *Italic* |
| `&n` | Underline |
| `&m` | ~~Strikethrough~~ |
| `&r` | Reset |

**Example:**

```yaml
display: "&a&lQueue Singles"  # Bold green text
```

---

## Placeholders

### Player Stats

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{player_name}` | Player's name | `Steve` |
| `{stats_elo}` | Elo rating | `1200` |
| `{stats_wins}` | Win count | `42` |
| `{stats_losses}` | Loss count | `15` |
| `{stats_winrate}` | Win percentage | `73` |
| `{stats_total_games}` | Total games | `57` |
| `{stats_win_streak}` | Current streak | `5` |

### Queue

| Placeholder | Description |
|-------------|-------------|
| `{queue_singles}` | Players in Singles queue |
| `{queue_doubles}` | Players in Doubles queue |
| `{queue_triples}` | Players in Triples queue |

### Format & Season

| Placeholder | Description |
|-------------|-------------|
| `{battle_format}` | Format display name |
| `{format_id}` | Format identifier |
| `{season_name}` | Current season name |
| `{season_id}` | Season ID |

### Leaderboard

| Placeholder | Description |
|-------------|-------------|
| `{leaderboard_rank}` | Player's position |

### Example Usage

```yaml
player_info:
  slot: 5
  id: PLAYER_SKIN
  display: "&7Information about &c{player_name}"
  lore:
    - ""
    - " &8▸ &7Matches: &f{stats_total_games}"
    - " &8▸ &7W/L: &a{stats_wins}&f/&c{stats_losses} &7(&f{stats_winrate}%&7)"
    - " &8▸ &7Streak: &b{stats_win_streak}"
    - " &8▸ &7Elo: &e{stats_elo}"
    - ""
```

---

## Specialized GUI Configuration

### Leaderboard GUI

**File:** `leaderboard_gui.yaml`

Pyramid-style leaderboard with player heads:

```yaml
title: "gui_pyramid_leaderboard_title"
rows: 6

pyramidSlots:
  rank1: [5]                           # 1st place (top center)
  rank2to4: [13, 14, 15]               # 2nd-4th
  rank5to9: [21, 22, 23, 24, 25]       # 5th-9th
  rank10to16: [29, 30, 31, 32, 33, 34, 35]
  rank17to25: [37, 38, 39, 40, 41, 42, 43, 44, 45]

playerHead:
  showRankBadge: true
  rankFormat:
    "1": "&6&l#1 &r{player_name}"
    "2-4": "&e&l#{leaderboard_rank} &r{player_name}"
    "5-9": "&f&l#{leaderboard_rank} &r{player_name}"

refreshCooldown: 30
maxPlayers: 25

fill:
  enabled: true
  material: "minecraft:black_stained_glass_pane"
  displayname: " "
```

| Field | Default | Description |
|-------|---------|-------------|
| `pyramidSlots` | - | Slot layout for each rank tier |
| `showRankBadge` | `true` | Show rank number on heads |
| `refreshCooldown` | `30` | Seconds between cache refresh |
| `maxPlayers` | `25` | Maximum displayed players |

### Selection GUI

**File:** `selection_gui.yaml`

Team and lead selection screens:

```yaml
teamSelection:
  title: "gui_team_selection_title"
  rows: 6
  confirmButton:
    enabled: true
    slot: 50
    material: "LIME_CONCRETE"

leadSelection:
  title: "gui_lead_selection_title"
  rows: 6

pokemonDisplay:
  showLevel: true
  showAbility: true
  showMoves: true
  showHeldItem: true

timeout:
  teamSelection: 60
  leadSelection: 60
```

| Field | Default | Description |
|-------|---------|-------------|
| `showLevel` | `true` | Display Pokemon level |
| `showAbility` | `true` | Display ability name |
| `showMoves` | `true` | Display moveset |
| `showHeldItem` | `true` | Display held item |
| `timeout.teamSelection` | `60` | Seconds for team selection |
| `timeout.leadSelection` | `60` | Seconds for lead selection |

### Match Ready GUI

**File:** `match_ready_gui.yaml`

Ready check screen before battle:

```yaml
title: "gui_match_ready_title"
rows: 3

acceptButton:
  slot: 12
  material: "LIME_CONCRETE"
  display: "&a&lAccept Match"

declineButton:
  slot: 14
  material: "RED_CONCRETE"
  display: "&c&lDecline Match"

opponentInfo:
  slot: 5
  showElo: true
  showRecord: true

timeout: 17
```

---

## Fill Configuration

Add decorative background items:

```yaml
fill:
  enabled: true
  material: "minecraft:black_stained_glass_pane"
  displayname: " "
  slots: [1, 2, 3, 7, 8, 9]  # 1-indexed slots
```

| Field | Description |
|-------|-------------|
| `enabled` | Enable fill decoration |
| `material` | Fill item material |
| `displayname` | Display name (use `" "` for invisible) |
| `slots` | Specific slots to fill |

---

## Custom Model Data

Use resource pack custom models:

```yaml
singles_queue:
  slot: 11
  id: "minecraft:paper"
  display: "&bSingles Battle"
  customModelData: 1001
  lore:
    - "&71v1 Ranked Match"
    - "&aClick to join"
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
