# Blacklist Configuration

Pokemon, move, ability, and item restrictions for ranked battles.

---

## Overview

The blacklist system allows you to restrict specific Pokemon, moves, abilities, and items from ranked battles. Restrictions are defined in season presets.

---

## Preset System

Create preset files in `config/cobbleranked/presets/`:

```
config/cobbleranked/presets/
├── default.yaml
├── competitive.yaml
├── vgc.yaml
└── smogon-ou.yaml
```

Reference presets in `season.yaml`:

```yaml
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "competitive"  # Uses presets/competitive.yaml
```

---

## Preset Structure

```yaml
# presets/competitive.yaml
blacklist:
  pokemon:
    - "mewtwo"
    - "rayquaza"
    - "arceus"
  moves:
    - "dark_void"
    - "baton_pass"
  abilities:
    - "moody"
    - "shadow_tag"
  items:
    - "kings_rock"
  labels:
    - "mythical"
    - "restricted"
```

---

## Blacklist Categories

### Pokemon

Ban specific Pokemon by species ID:

```yaml
pokemon:
  - "mewtwo"
  - "rayquaza"
  - "arceus"
  - "zacian"
  - "calyrex"
```

### Moves

Ban specific moves:

```yaml
moves:
  - "dark_void"
  - "baton_pass"
  - "last_respects"
  - "shed_tail"
  - "fissure"
  - "sheer_cold"
  - "horn_drill"
  - "guillotine"
```

### Abilities

Ban specific abilities:

```yaml
abilities:
  - "moody"
  - "shadow_tag"
  - "arena_trap"
  - "power_construct"
```

### Items

Ban specific held items:

```yaml
items:
  - "kings_rock"
  - "razor_fang"
  - "bright_powder"
  - "lax_incense"
```

### Labels

Ban Pokemon by Cobblemon label categories:

```yaml
labels:
  - "legendary"
  - "mythical"
  - "restricted"
  - "ultra_beast"
  - "paradox"
```

| Label | Description |
|-------|-------------|
| `legendary` | Legendary Pokemon |
| `mythical` | Mythical Pokemon |
| `restricted` | Restricted Legendaries |
| `ultra_beast` | Ultra Beasts |
| `paradox` | Paradox Pokemon |

---

## Preset Examples

<details>
<summary><strong>Casual (Minimal Restrictions)</strong></summary>

```yaml
# presets/casual.yaml
blacklist:
  pokemon: []
  moves:
    - "fissure"
    - "sheer_cold"
    - "horn_drill"
    - "guillotine"
  abilities: []
  items: []
  labels: []
```

</details>

<details>
<summary><strong>Smogon OU</strong></summary>

```yaml
# presets/smogon-ou.yaml
blacklist:
  pokemon:
    - "mewtwo"
    - "lugia"
    - "ho_oh"
    - "kyogre"
    - "groudon"
    - "rayquaza"
    - "dialga"
    - "palkia"
    - "giratina"
    - "arceus"
    - "reshiram"
    - "zekrom"
    - "kyurem_white"
    - "kyurem_black"
    - "xerneas"
    - "yveltal"
    - "zygarde_complete"
    - "cosmog"
    - "cosmoem"
    - "solgaleo"
    - "lunala"
    - "necrozma_dusk_mane"
    - "necrozma_dawn_wings"
    - "zacian"
    - "zamazenta"
    - "eternatus"
    - "calyrex_ice_rider"
    - "calyrex_shadow_rider"
    - "koraidon"
    - "miraidon"
  moves:
    - "baton_pass"
    - "last_respects"
    - "shed_tail"
  abilities:
    - "moody"
    - "shadow_tag"
    - "arena_trap"
  items: []
  labels:
    - "mythical"
```

</details>

<details>
<summary><strong>VGC 2024</strong></summary>

```yaml
# presets/vgc.yaml
blacklist:
  pokemon: []
  moves:
    - "dark_void"
  abilities:
    - "moody"
  items: []
  labels:
    - "mythical"

# VGC uses restricted limits instead of bans
restrictedLimits:
  restricted: 2  # Max 2 restricted legends per team
```

</details>

<details>
<summary><strong>Random Battle</strong></summary>

```yaml
# presets/random.yaml
blacklist:
  pokemon: []
  moves: []
  abilities: []
  items: []
  labels: []
```

</details>

---

## Creating a Preset

1. Create a new YAML file in `config/cobbleranked/presets/`:

```yaml
# presets/my-preset.yaml
blacklist:
  pokemon:
    - "ditto"  # No Transform cheese
  moves:
    - "baton_pass"
    - "last_respects"
  abilities:
    - "moody"
  items: []
  labels:
    - "mythical"
    - "restricted"
```

2. Reference in season configuration:

```yaml
# season.yaml
schedule:
  - name: "My Season"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "my-preset"
```

3. Reload configuration:

```bash
/rankedadmin reload
```

---

## Validation

When a player queues:
1. Team is checked against active season's preset
2. If any banned Pokemon/moves/abilities/items found → player is notified
3. Player must adjust team before re-queueing

---

## See Also

- [Seasons](seasons.md) - Season and preset linking
- [Battle Config](battle.md) - Format settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
