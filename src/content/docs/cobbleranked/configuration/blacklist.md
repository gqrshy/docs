---
title: Blacklist Configuration
description: Control which Pokemon, moves, abilities, and items are allowed in battles.
---

Create the perfect competitive environment. Ban overpowered Pokemon, restrict broken moves, and enforce species clauses with precision.

Blacklist settings are part of **Season Presets**, allowing different rules for each season.

File: `config/cobbleranked/season_presets/<preset_name>.yml`

## Structure Overview

As of v2.0.13, season presets use a **flattened structure**. Blacklists are configured per-format directly under the format name:

```yaml
# season_presets/default.yml
name: "Default Rules"

singles:
  enabled: true
  teamSize: 3
  selectCount: 3
  levelCap: 100
  blacklist:
    pokemon: []
    moves: []
    abilities: []
    items: []
    labels:
      - "restricted"
      - "mythical"
    labelLimits:
      legendary: 1

doubles:
  enabled: true
  teamSize: 4
  # ... format settings and blacklist
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

> **Move name format:** Use snake_case (e.g., `baton_pass`). CobbleRanked automatically normalizes names to match Cobblemon's internal format, so both `baton_pass` and `batonpass` will work.

## Ability Blacklist

Ban specific abilities:

```yaml
blacklist:
  abilities:
    - "moody"        # Random stat changes
    - "shadow_tag"   # Prevents switching
    - "arena_trap"   # Traps grounded Pokemon
```

> **Ability name format:** Use snake_case (e.g., `shadow_tag`). Names are automatically normalized to match Cobblemon's internal format.

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

A VGC-style preset with custom blacklist (flattened structure):

```yaml
# season_presets/vgc.yml
name: "VGC Rules"

singles:
  enabled: false

doubles:
  enabled: true
  teamSize: 6
  selectCount: 4
  levelCap: 50
  turnTimer: 45
  matchDuration: 20

  # Mechanics (flattened)
  megaEvolution: false
  zMoves: false
  dynamax: false
  terastallize: true

  # Clauses (flattened)
  speciesClause: true
  itemClause: 1
  sleepClause: true
  ohkoClause: true
  evasionClause: true
  endlessBattleClause: true

  # Blacklist
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

triples:
  enabled: false
```

## Smogon OU Example

> **Auto-generated preset**: A `smogon.yml` preset is automatically created with the complete Gen 9 OU banlist. To use it, set `preset: "smogon"` in your season.yaml.

The Smogon OU preset includes:
- **Standard clauses**: Species, Item, Sleep, OHKO, Evasion, Endless Battle
- **No label limits**: Legendaries are controlled via individual bans, not labels
- **Full Gen 9 OU banlist**: All Pokemon currently in Ubers tier

<details>
<summary>Smogon OU Banned Pokemon (Ubers)</summary>

```yaml
pokemon:
  # Box Legendaries
  - "Koraidon"
  - "Miraidon"
  # Gen 9 OU bans
  - "Flutter-Mane"
  - "Houndstone"
  - "Palafin"
  - "Iron-Bundle"
  - "Annihilape"
  - "Chi-Yu"
  - "Espathra"
  - "Chien-Pao"
  - "Regieleki"
  - "Magearna"
  - "Zamazenta"
  - "Urshifu-Rapid-Strike"
  - "Volcarona"
  - "Baxcalibur"
  - "Ogerpon-Hearthflame"
  - "Ursaluna-Bloodmoon"
  - "Roaring-Moon"
  - "Gliscor"
  - "Sneasler"
  - "Terapagos"
  - "Archaludon"
  - "Gouging-Fire"
  - "Kyurem"
  # Standard Ubers
  - "Mewtwo"
  - "Ho-Oh"
  - "Lugia"
  - "Kyogre"
  - "Groudon"
  - "Rayquaza"
  # ... (full list in smogon.yml)
```

</details>

<details>
<summary>Smogon OU Banned Moves</summary>

```yaml
moves:
  # OHKO moves
  - "sheer_cold"
  - "fissure"
  - "guillotine"
  - "horn_drill"
  # Evasion moves
  - "double_team"
  - "minimize"
  # Baton Pass
  - "baton_pass"
  # Sleep moves (SV OU Sleep Clause Mod)
  - "dark_void"
  - "grass_whistle"
  - "hypnosis"
  - "lovely_kiss"
  - "relic_song"
  - "sing"
  - "sleep_powder"
  - "spore"
  - "yawn"
```

</details>

```yaml
# season_presets/smogon.yml (auto-generated)
name: "Smogon OU"

singles:
  enabled: true
  teamSize: 6
  selectCount: 6
  levelCap: 100
  turnTimer: 150
  matchDuration: 30
  terastallize: true

  speciesClause: true
  itemClause: 1
  sleepClause: true
  ohkoClause: true
  evasionClause: true
  endlessBattleClause: true

  blacklist:
    pokemon: [...]        # Full Ubers list
    moves: [...]          # OHKO, evasion, sleep moves
    abilities:
      - "moody"
      - "shadow_tag"
      - "arena_trap"
    items: []
    labels: []            # No label bans
    labelLimits: {}       # No label limits

doubles:
  enabled: false

triples:
  enabled: false
```

## VGC + Smogon Combined Preset

> **Auto-generated preset**: A `vgc_smogon.yml` preset combines both competitive formats. Use `preset: "vgc_smogon"` in season.yaml.

Best of both worlds:
- **Singles**: Smogon OU rules (6v6, level 100, full OU banlist)
- **Doubles**: VGC rules (bring 6, pick 4, level 50, restricted legendaries)

```yaml
# season_presets/vgc_smogon.yml (auto-generated)
name: "VGC + Smogon OU"

singles:
  enabled: true
  teamSize: 6
  selectCount: 6
  levelCap: 100
  terastallize: true
  blacklist:
    pokemon: [...]        # Full Smogon OU banlist
    labels: []            # No label limits
    labelLimits: {}

doubles:
  enabled: true
  teamSize: 6
  selectCount: 4
  levelCap: 50
  terastallize: true
  blacklist:
    labels:
      - "restricted"
      - "mythical"
    labelLimits:
      legendary: 2

triples:
  enabled: false
```

## National Dex OU Example

> **Auto-generated preset**: A `national_dex.yml` preset is automatically created with National Dex OU rules. To use it, set `preset: "national_dex"` in your season.yaml.

The National Dex OU preset includes:
- **Mega Evolution**: Enabled (key feature of this format)
- **Z-Moves**: Enabled
- **Terastallization**: Disabled (banned in National Dex)
- **Dynamax**: Disabled (banned)
- **All generations**: Pokemon from Gen 1-9 allowed (except banned ones)

<details>
<summary>National Dex OU Banned Pokemon</summary>

```yaml
pokemon:
  # Banned Mega Evolutions
  - "Alakazam-Mega"
  - "Blaziken-Mega"
  - "Gengar-Mega"
  - "Kangaskhan-Mega"
  - "Lucario-Mega"
  - "Metagross-Mega"
  - "Salamence-Mega"
  - "Rayquaza-Mega"
  - "Mawile-Mega"
  - "Medicham-Mega"
  - "Sableye-Mega"
  # Regular Pokemon
  - "Annihilape"
  - "Archaludon"
  - "Baxcalibur"
  - "Blaziken"
  - "Chi-Yu"
  - "Chien-Pao"
  - "Cyclizar"
  - "Darkrai"
  - "Dracovish"
  - "Flutter-Mane"
  - "Gliscor"
  - "Gouging-Fire"
  - "Kingambit"
  - "Landorus"
  - "Volcarona"
  # ... (full list in national_dex.yml)
```

</details>

<details>
<summary>National Dex OU Banned Moves</summary>

```yaml
moves:
  # OHKO moves
  - "sheer_cold"
  - "fissure"
  - "guillotine"
  - "horn_drill"
  # Evasion moves
  - "double_team"
  - "minimize"
  # Baton Pass
  - "baton_pass"
  # Other
  - "last_respects"
```

</details>

<details>
<summary>National Dex OU Banned Items</summary>

```yaml
items:
  - "cobblemon:king_rock"    # King's Rock flinch abuse
  - "cobblemon:razor_fang"   # Razor Fang flinch abuse
```

</details>

```yaml
# season_presets/national_dex.yml (auto-generated)
name: "National Dex OU"

singles:
  enabled: true
  teamSize: 6
  selectCount: 6
  levelCap: 100
  megaEvolution: true       # Key feature!
  zMoves: true              # Allowed
  dynamax: false            # Banned
  terastallize: false       # Banned in National Dex

  speciesClause: true
  itemClause: 1
  sleepClause: true
  ohkoClause: true
  evasionClause: true
  endlessBattleClause: true

  blacklist:
    pokemon: [...]          # Full National Dex OU banlist
    moves: [...]            # OHKO, evasion, baton pass, last respects
    abilities:
      - "moody"
      - "shadow_tag"
      - "arena_trap"
      - "power_construct"
    items:
      - "cobblemon:king_rock"
      - "cobblemon:razor_fang"
    labels: []              # No label bans
    labelLimits: {}         # No label limits

doubles:
  enabled: false

triples:
  enabled: false
```

## Hot Reload

Reload presets without restart:

```bash
/rankedadmin reload
```

---

## See Also

- [Seasons](../features/seasons/) - Full preset configuration
- [Battle Formats](../features/battle-formats/) - Format-specific settings
- [Main Configuration](config/) - General settings
- [FAQ](../support/faq/) - Common questions and troubleshooting
