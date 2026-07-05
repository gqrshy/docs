---
title: GUI Customization
description: Customize menu appearance, borders, and button layouts.
---

Make your ranked menus look unique. Customize borders, materials, and layouts.

## GUI Files

Edit YAML files in `config/cobbleranked/gui/`:

| File | Purpose |
|------|---------|
| `ranked_gui.yaml` | Ranked battle menu |
| `casual_gui.yaml` | Casual battle menu |
| `leaderboard_gui.yaml` | Top players display |
| `blacklist_gui.yaml` | Banned content viewer |
| `reward_gui.yaml` | Season and milestone rewards |
| `rank_reward_gui.yaml` | Rank reward display |
| `missions_gui.yaml` | Daily/weekly missions display |
| `ready_gui.yaml` | Match ready confirmation |
| `team_selection_gui.yaml` | Pokemon team selection |
| `lead_selection_gui.yaml` | Lead Pokemon selection |

Every value is optional. Missing keys fall back to defaults, and `displayname` values are language keys resolved from your [language files](/docs/cobbleranked/configuration/languages/).

---

## Border & Fill

Customize the glass panels that fill empty slots:

```yaml
# ranked_gui.yaml
border:
  enabled: false
  material: "GRAY_STAINED_GLASS_PANE"
  custom_model_data: 0
  displayname: " "

fill:
  enabled: false
  material: "BLACK_STAINED_GLASS_PANE"
  custom_model_data: 0
  displayname: " "
```

| Property | Description |
|----------|-------------|
| `enabled` | Show/hide the border or fill |
| `material` | Item ID (Minecraft or Cobblemon) |
| `displayname` | Item name (use `" "` for blank) |
| `custom_model_data` | Custom model ID for resource pack |

---

## Custom Model Data

Apply custom resource pack models to any GUI element:

```yaml
buttons:
  leaderboard:
    slot: 41
    material: "cobblemon:kings_rock"
    custom_model_data: 1001
    displayname: "ranked_gui_leaderboard_button"
```

<details>
<summary><strong>Creating a resource pack with custom models</strong></summary>

See [Minecraft Wiki: Custom Model Data](https://minecraft.wiki/w/Model#Item_models) for creating resource packs.

</details>

<details>
<summary><strong>Available Materials</strong></summary>

Glass panes (most common):
- `WHITE_STAINED_GLASS_PANE`, `ORANGE_STAINED_GLASS_PANE`, `MAGENTA_STAINED_GLASS_PANE`
- `LIGHT_BLUE_STAINED_GLASS_PANE`, `YELLOW_STAINED_GLASS_PANE`, `LIME_STAINED_GLASS_PANE`
- `PINK_STAINED_GLASS_PANE`, `GRAY_STAINED_GLASS_PANE`, `LIGHT_GRAY_STAINED_GLASS_PANE`
- `CYAN_STAINED_GLASS_PANE`, `PURPLE_STAINED_GLASS_PANE`, `BLUE_STAINED_GLASS_PANE`
- `BROWN_STAINED_GLASS_PANE`, `GREEN_STAINED_GLASS_PANE`, `RED_STAINED_GLASS_PANE`
- `BLACK_STAINED_GLASS_PANE`

Other decorative items:
- `BARRIER`, `AIR`, `STONE`, `DIRT`

Use any Minecraft or Cobblemon item ID.

</details>

---

## Ranked GUI

Format buttons, navigation, and player info:

```yaml
# ranked_gui.yaml
title: "ranked_gui_title"
rows: 6

player_info_slot: 5
player_info_display:
  slot: 5
  material: "PLAYER_HEAD"
  custom_model_data: 0
  displayname: "player_info_title"

format_slots: [21, 23, 25]

format_buttons:
  singles:
    slot: 21
    material: "cobblemon:poke_ball"
    custom_model_data: 0
    displayname: "ranked_gui_format_title"
  doubles:
    slot: 23
    material: "cobblemon:great_ball"
    custom_model_data: 0
    displayname: "ranked_gui_format_title"
  triples:
    slot: 25
    material: "cobblemon:ultra_ball"
    custom_model_data: 0
    displayname: "ranked_gui_format_title"
  # Random Battle variants (shown when battle.yaml -> randomBattle.enabled is true)
  random_singles:
    slot: 30
    material: "cobblemon:verdant_ball"
    custom_model_data: 0
    displayname: "ranked_gui_format_title"
  random_doubles:
    slot: 32
    material: "cobblemon:azure_ball"
    custom_model_data: 0
    displayname: "ranked_gui_format_title"
  random_triples:
    slot: 34
    material: "cobblemon:premier_ball"
    custom_model_data: 0
    displayname: "ranked_gui_format_title"

buttons:
  blacklist:
    slot: 38
    material: "cobblemon:red_card"
    custom_model_data: 0
    displayname: "ranked_gui_blacklist_button"
  leaderboard:
    slot: 41
    material: "cobblemon:kings_rock"
    custom_model_data: 0
    displayname: "ranked_gui_leaderboard_button"
  rewards:
    slot: 44
    material: "cobblemon:gilded_chest"
    custom_model_data: 0
    displayname: "ranked_gui_rewards_button"
```

| Property | Description |
|----------|-------------|
| `player_info_slot` | Slot showing player's ELO and stats |
| `format_slots` | Slots for format selection buttons |
| `format_buttons` | Per-format button configuration (Random variants appear when enabled) |
| `buttons` | Navigation and action buttons |

---

## Leaderboard GUI

Pyramid layout for top 16 players:

```yaml
# leaderboard_gui.yaml
pyramid_slots:
  rank_1: [14]
  rank_2_4: [22, 23, 24]
  rank_5_9: [30, 31, 32, 33, 34]
  rank_10_16: [38, 39, 40, 41, 42, 43, 44]

buttons:
  player_rank:
    slot: 47
    material: "PLAYER_HEAD"
    custom_model_data: 0
    displayname: "leaderboard_your_rank"
```

---

## Blacklist GUI

Browse banned Pokemon, moves, items, abilities:

```yaml
# blacklist_gui.yaml
content_slots: [
  11, 12, 13, 14, 15, 16, 17,
  20, 21, 22, 23, 24, 25, 26,
  29, 30, 31, 32, 33, 34, 35,
  38, 39, 40, 41, 42, 43, 44
]

buttons:
  category_selector: { slot: 48 }
  prev_page: { slot: 49 }
  format_toggle: { slot: 50 }
  next_page: { slot: 51 }
  sort: { slot: 52 }
```

---

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

---

## Hot Reload

Apply changes without restart:

```bash
/rankedadmin reload
```

---

**See Also**: [Language Configuration](/docs/cobbleranked/configuration/languages/) - Customize text and colors
