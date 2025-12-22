# GUI Customization

Customize CobbleRanked GUI appearance and layout.

---

## GUI Files

**Location:** `config/cobbleranked/gui/`

CobbleRanked uses two types of GUI configuration files:

### 1. Language-Specific Main GUI Files

```
gui/
├── gui-enUs.yaml    # English (main menu, top ranked, etc.)
├── gui-jaJp.yaml    # Japanese
└── gui-frFr.yaml    # French
```

These files contain the main menu (`gui_ranked`), leaderboard display (`gui_top_ranked`), and other primary GUIs.

### 2. Specialized GUI Config Files

```
gui/
├── reward_gui.yaml       # Season & milestone rewards
├── leaderboard_gui.yaml  # Pyramid leaderboard layout
├── blacklist_gui.yaml    # Banned Pokemon/moves/items viewer
├── selection_gui.yaml    # Team & lead selection
└── match_ready_gui.yaml  # Pre-battle ready check
```

**Which file is used?**
- Language-specific files are determined by the `language` setting in `config.yaml`
- Specialized config files are always loaded regardless of language setting

---

## Available GUIs

| GUI | Config File | Description |
|-----|-------------|-------------|
| **gui_ranked** | `gui-{lang}.yaml` | Main menu (queue buttons, stats, navigation) |
| **gui_top_ranked** | `gui-{lang}.yaml` | Legacy leaderboard display |
| **gui_prepare_combat** | `gui-{lang}.yaml` | Pre-battle team preview |
| **gui_match_ready** | `match_ready_gui.yaml` | Ready check before battle |
| Pyramid Leaderboard | `leaderboard_gui.yaml` | Advanced leaderboard with pyramid layout |
| Rewards | `reward_gui.yaml` | Season & milestone rewards |
| Blacklist | `blacklist_gui.yaml` | Banned Pokemon/moves/items viewer |
| Team Selection | `selection_gui.yaml` | Pokemon team selection for battle |
| Lead Selection | `selection_gui.yaml` | Lead Pokemon selection |

---

## Slot Numbering

Slots are numbered 1-54 for a 6-row chest. `slot: 1` places the item in the first slot (top-left).

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

### Change Item Display

```yaml
gui_ranked:
  title: "&cRanked Menu"
  size: 4  # Number of rows (1-6)
  items:
    singles_queue:
      slot: 11                              # Position (1-indexed)
      id: "cobblemon:poke_ball"             # Item ID
      display: "&bSingles Battle"           # Display name
      lore:
        - ""
        - "&71v1 Ranked Match"
        - " &7Players in queue: &c{queue_singles}"
        - ""
        - "&aClick to join queue"
        - ""
      customModelData: 0  # Custom model data (resource packs)
```

### Item Fields

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Item ID (e.g., `minecraft:diamond`, `cobblemon:poke_ball`, `PLAYER_SKIN`) | Yes |
| `display` | Display name (supports color codes and placeholders) | Yes |
| `slot` | Inventory slot (1-54, 1-indexed) | Yes |
| `lore` | Array of lore lines (supports color codes and placeholders) | No |
| `customModelData` | Custom model data value for resource packs | No |

**Special Item IDs:**

| ID | Description |
|----|-------------|
| `PLAYER_SKIN` | Displays the player's head with their skin |
| `minecraft:*` | Any vanilla Minecraft item |
| `cobblemon:*` | Any Cobblemon item (Poke Balls, etc.) |

### Color Codes

Use `&` for colors:

| Code | Color | Code | Style |
|------|-------|------|-------|
| `&a` | Green | `&l` | Bold |
| `&b` | Aqua | `&o` | Italic |
| `&c` | Red | `&n` | Underline |
| `&e` | Yellow | `&m` | Strikethrough |
| `&6` | Gold | `&r` | Reset |

Example:
```yaml
display: "&a&lQueue Singles"  # Bold green text
```

---

## Placeholders

Use placeholders for dynamic content in GUI items.

### Stats Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{stats_elo}` | Player's Elo rating | `1200` |
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

```yaml
player_info:
  slot: 5
  id: PLAYER_SKIN
  display: "&7Information about &c{player_name}"
  lore:
    - ""
    - " &8▸ &7Matches Played: &f{stats_total_games}"
    - " &8▸ &7Wins/Losses: &a{stats_wins}&f/&c{stats_losses} &7(&f{stats_winrate}&7%)"
    - " &8▸ &7Win Streak: &b{stats_win_streak}"
    - " &8▸ &7Elo: &e{stats_elo}"
    - ""
```

---

## Common Customizations

### Use Custom Models (Resource Packs)

You can use `customModelData` to display custom textures from resource packs:

```yaml
singles_queue:
  slot: 11
  id: "minecraft:paper"           # Base item
  display: "&bSingles Battle"
  customModelData: 1001           # Your custom model ID
  lore:
    - "&71v1 Ranked Match"
    - "&aClick to join"
```

### Add Custom Decoration (Fill)

Specialized GUI configs support fill configurations for decoration:

```yaml
fill:
  enabled: true
  material: "minecraft:black_stained_glass_pane"
  displayname: " "
  slots: [1, 2, 3, 7, 8, 9]  # 1-indexed slots to fill
```

---

## Specialized GUI Configuration

### Leaderboard GUI (`leaderboard_gui.yaml`)

Configure the pyramid-style leaderboard display:

```yaml
title: "gui_pyramid_leaderboard_title"
rows: 6

# Pyramid slot layout (1-indexed)
pyramidSlots:
  rank1: [5]                           # 1st place (top center)
  rank2to4: [13, 14, 15]               # 2nd-4th
  rank5to9: [21, 22, 23, 24, 25]       # 5th-9th
  rank10to16: [29, 30, 31, 32, 33, 34, 35]
  rank17to25: [37, 38, 39, 40, 41, 42, 43, 44, 45]

# Player head display
playerHead:
  showRankBadge: true
  rankFormat:
    "1": "&6&l#1 &r{player_name}"
    "2-4": "&e&l#{leaderboard_rank} &r{player_name}"
    "5-9": "&f&l#{leaderboard_rank} &r{player_name}"

refreshCooldown: 30
maxPlayers: 25
```

### Selection GUI (`selection_gui.yaml`)

Configure team and lead selection screens:

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
