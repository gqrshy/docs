---
title: Blacklist Configuration
description: Control which Pokemon, moves, abilities, and items are allowed in battles.
---

Blacklist settings are part of **Season Presets**, allowing different rules for each season.

File: `config/cobbleranked/season_presets/<preset_name>.yml`

## Structure Overview

Blacklists are configured per-format within the `formats` section of a season preset:

```yaml
name: "Default Rules"
levelCap: 50

formats:
  SINGLES:
    enabled: true
    teamSize: 3
    selectCount: 3
    blacklist:
      pokemon: []
      moves: []
      abilities: []
      items: []
      labels: ["restricted", "mythical"]
      labelLimits:
        legendary: 1
      # ... more options
```

## Blacklist Options

| Option | Type | Description |
|--------|------|-------------|
| `pokemon` | List | Banned Pokemon species/forms |
| `moves` | List | Banned moves |
| `abilities` | List | Banned abilities |
| `items` | List | Banned held items |
| `labels` | List | Cobblemon labels to ban completely |
| `labelLimits` | Map | Limit count of Pokemon with label |
| `maxDuplicateItems` | Integer | Item clause (1 = no duplicates) |
| `bannedInventoryItems` | List | Items banned from player inventory |
| `bannedTrinketItems` | List | Items banned from trinket slots |
| `consumables` | Object | Battle consumable restrictions |
| `specialFormat` | Object | Special format rules (Little Cup, etc.) |

## Pokemon Blacklist

Ban specific Pokemon species or forms:

```yaml
blacklist:
  pokemon:
    - "Mewtwo"              # Ban all Mewtwo forms
    - "Kyurem-Black"        # Ban specific form
    - "Kyurem-White"
    - "Zygarde-Complete"
    - "Necrozma-Ultra"
    - "Calyrex-Ice-Rider"
    - "Calyrex-Shadow-Rider"
```

### Pokemon Name Format

| Format | Example | Description |
|--------|---------|-------------|
| Species | `Mewtwo` | Bans all forms |
| Species-Form | `Kyurem-Black` | Bans specific form |
| Regional | `Meowth-Alolan` | Regional variant |
| Mega | `Charizard-Mega-X` | Mega evolution |

## Move Blacklist

Ban specific moves:

```yaml
blacklist:
  moves:
    - "sheer_cold"
    - "fissure"
    - "guillotine"
    - "horn_drill"
    - "double_team"
    - "minimize"
    - "baton_pass"
```

> Move names use snake_case format (e.g., `baton_pass`, not `Baton Pass`).

## Ability Blacklist

Ban specific abilities:

```yaml
blacklist:
  abilities:
    - "moody"        # Random stat changes
    - "shadow_tag"   # Prevents switching
    - "arena_trap"   # Traps grounded Pokemon
```

> Ability names use snake_case format.

## Item Blacklist

Ban held items. Supports item tags with `#` prefix:

```yaml
blacklist:
  items:
    - "cobblemon:choice_band"      # Specific item
    - "#cobblemon:mega_stones"     # All items in tag
```

## Label-Based Restrictions

Cobblemon Pokemon have labels (legendary, mythical, restricted, etc.). Use these for broad bans:

### Complete Label Bans

Ban all Pokemon with specific labels:

```yaml
blacklist:
  labels:
    - "restricted"   # Restricted legendaries
    - "mythical"     # Mythical Pokemon
```

### Label Limits

Allow limited Pokemon with labels:

```yaml
blacklist:
  labelLimits:
    legendary: 1     # Max 1 legendary per team
    restricted: 0    # No restricted Pokemon
```

### Removing Label Limits

For formats like Smogon OU where you want **no label limits** at all, use an empty value:

```yaml
blacklist:
  labelLimits: []    # No label limits (both [] and {} work)
  labels: []         # No label bans either
```

> **Note:** Both `[]` and `{}` are accepted for empty `labelLimits`. Use whichever you prefer for consistency with `labels: []`.

## Item Clause

Control duplicate held items:

```yaml
blacklist:
  maxDuplicateItems: 1   # Standard item clause (no duplicates)
```

| Value | Effect |
|-------|--------|
| `1` | Standard item clause - each held item can only appear once |
| `2` | Allow up to 2 of same item |
| `0` | No item clause (unlimited duplicates) |

## Inventory Restrictions

Ban items from player inventory during battles. Supports item tags:

```yaml
blacklist:
  bannedInventoryItems:
    - "#cobblemon:potions"
    - "#cobblemon:restores"
    - "#cobblemon:revives"
    - "#cobblemon:remedies"
    - "cobblemon:rare_candy"
    - "#cobblemon:experience_candies"
```

## Consumables Config

Control battle consumable usage:

```yaml
blacklist:
  consumables:
    blockAllHealingItems: true
    blockedHealingItems:
      - "cobblemon:potion"
      - "cobblemon:super_potion"
      - "cobblemon:hyper_potion"
      - "cobblemon:max_potion"
      - "cobblemon:full_restore"
    blockStatusHealingItems: true
    blockedStatusItems:
      - "cobblemon:antidote"
      - "cobblemon:paralyze_heal"
      - "cobblemon:awakening"
      - "cobblemon:burn_heal"
      - "cobblemon:ice_heal"
      - "cobblemon:full_heal"
    blockRevivalItems: true
    blockedRevivalItems:
      - "cobblemon:revive"
      - "cobblemon:max_revive"
```

## Special Formats

Enable special format restrictions:

```yaml
blacklist:
  specialFormat:
    enabled: true
    type: LITTLE_CUP
    dexRangeMin: 1
    dexRangeMax: 1025
```

| Type | Description |
|------|-------------|
| `NONE` | No special restrictions |
| `BABY_CUP` | Baby Pokemon only |
| `LITTLE_CUP` | Unevolved Pokemon only |
| `MONOTYPE` | Single-type teams |
| `SHINY_ONLY` | Shiny Pokemon only |
| `DEX_RANGE` | Limit by Pokedex number |
| `NFE` | Not Fully Evolved only |

## Default Bans

These are applied by default unless overridden:

<details>
<summary>Default Banned Pokemon</summary>

```yaml
pokemon:
  - "Kyurem-Black"
  - "Kyurem-White"
  - "Zygarde-Complete"
  - "Necrozma-Dawn-Wings"
  - "Necrozma-Dusk-Mane"
  - "Necrozma-Ultra"
  - "Calyrex-Ice-Rider"
  - "Calyrex-Shadow-Rider"
  - "Eternatus-Eternamax"
```

</details>

<details>
<summary>Default Banned Moves</summary>

```yaml
moves:
  - "sheer_cold"
  - "fissure"
  - "guillotine"
  - "horn_drill"
  - "double_team"
  - "minimize"
  - "baton_pass"
```

</details>

<details>
<summary>Default Banned Abilities</summary>

```yaml
abilities:
  - "moody"
  - "shadow_tag"
  - "arena_trap"
```

</details>

<details>
<summary>Default Banned Inventory Items</summary>

```yaml
bannedInventoryItems:
  - "#cobblemon:potions"
  - "#cobblemon:restores"
  - "#cobblemon:revives"
  - "#cobblemon:remedies"
  - "cobblemon:rare_candy"
  - "#cobblemon:experience_candies"
```

</details>

## Complete Example

A VGC-style preset with custom blacklist:

```yaml
name: "VGC Rules"
levelCap: 50

clauses:
  speciesClause: true
  maxDuplicateItems: 1
  sleepClause: true
  ohkoClause: true
  evasionClause: true
  endlessBattleClause: true

mechanics:
  megaEvolution: false
  zMoves: false
  dynamax: false
  terastallize: true

formats:
  DOUBLES:
    enabled: true
    teamSize: 6
    selectCount: 4
    turnTimeoutSeconds: 45
    blacklist:
      pokemon: []
      moves:
        - "baton_pass"
      abilities:
        - "moody"
        - "shadow_tag"
      items: []
      labels:
        - "restricted"
        - "mythical"
      labelLimits:
        legendary: 2
      maxDuplicateItems: 1
```

## Smogon OU Example

A Smogon OU-style preset with no label limits:

```yaml
name: "Smogon OU"
levelCap: 100

clauses:
  speciesClause: true
  maxDuplicateItems: 1
  sleepClause: true
  ohkoClause: true
  evasionClause: true
  endlessBattleClause: true

formats:
  SINGLES:
    enabled: true
    teamSize: 6
    selectCount: 6
    turnTimeoutSeconds: 150
    blacklist:
      pokemon:
        - "Koraidon"
        - "Miraidon"
        - "Mewtwo"
        - "Ho-Oh"
        - "Lugia"
        # ... add Ubers here
      moves:
        - "baton_pass"
      abilities:
        - "moody"
        - "shadow_tag"
        - "arena_trap"
      items: []
      labels: []           # No label bans
      labelLimits: {}      # No label limits - allows unlimited legendaries
      maxDuplicateItems: 1
```

## Hot Reload

Reload presets without restart:

```bash
/rankedadmin reload
```

---

## See Also

- [Season Presets](/docs/cobbleranked/configuration/seasons/) - Full preset configuration
- [Battle Formats](/docs/cobbleranked/features/battle-formats/) - Format-specific settings
- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
