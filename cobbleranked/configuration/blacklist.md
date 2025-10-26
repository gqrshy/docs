# Blacklist Configuration

Learn how to ban Pokemon, moves, abilities, and items from ranked battles.

## File Location

`config/cobbleranked/blacklist.json`

## Overview

The blacklist system allows you to restrict:
- **Individual Pokemon** (by name or form)
- **Pokemon categories** (legendary, mythical, etc.)
- **Moves** (OHKO moves, evasion moves, etc.)
- **Abilities** (Shadow Tag, Moody, etc.)
- **Held Items** (evasion items, etc.)
- **Special formats** (Baby Cup, Little Cup, Monotype, etc.)

## Quick Start

### Ban Individual Pokemon

```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Rayquaza",
    "Groudon"
  ]
}
```

### Ban by Category

```json
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ]
}
```

## Pokemon Blacklist

### Basic Format

Ban all forms of a Pokemon:
```json
"black_list_pokemon": [
  "Mewtwo",
  "Lugia"
]
```

### Specific Forms

Ban only specific forms using the format `"PokemonName:FormName"`:

```json
"black_list_pokemon": [
  "Zygarde:10",           // Ban 10% Zygarde only
  "Mewtwo:Mega X",        // Ban Mega Mewtwo X
  "Mewtwo:Mega Y",        // Ban Mega Mewtwo Y
  "Pikachu:Custom"        // Ban custom form
]
```

### Example: Uber Tier Ban

```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",
    "Ho-Oh",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Dialga",
    "Palkia",
    "Giratina",
    "Arceus",
    "Reshiram",
    "Zekrom",
    "Kyurem",
    "Xerneas",
    "Yveltal",
    "Zacian",
    "Zamazenta",
    "Eternatus",
    "Koraidon",
    "Miraidon"
  ]
}
```

## Label-Based Blacklist

### Available Labels

| Label | Description | Examples |
|-------|-------------|----------|
| `legendary` | Legendary Pokemon | Mewtwo, Lugia, Rayquaza |
| `mythical` | Mythical Pokemon | Mew, Celebi, Jirachi |
| `ultra_beast` | Ultra Beasts | Nihilego, Buzzwole, Xurkitree |
| `paradox` | Paradox Pokemon (Gen 9) | Iron Treads, Great Tusk |
| `restricted` | VGC Restricted | Most legendaries |
| `fakemon` | Custom Pokemon | From addon mods |
| `starter` | Starter Pokemon | Bulbasaur, Charmander, Squirtle |
| `fossil` | Fossil Pokemon | Omanyte, Kabuto, Aerodactyl |
| `baby` | Baby Pokemon | Pichu, Cleffa, Igglybuff |
| `powerhouse` | Pseudo-legendaries | Dragonite, Garchomp, Metagross |
| `gen1` - `gen9` | By generation | `gen1` = Kanto, `gen9` = Paldea |

### Format Presets

#### Competitive Standard (No Ubers)
```json
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ]
}
```

#### VGC-Style (Allow Restricted)
```json
{
  "black_list_labels": [
    "mythical",
    "ultra_beast"
  ]
}
```

#### No Legends
```json
{
  "black_list_labels": [
    "legendary",
    "mythical"
  ]
}
```

#### Gen 1-8 Only (No Gen 9)
```json
{
  "black_list_labels": [
    "gen9",
    "paradox"
  ]
}
```

#### No Custom Pokemon
```json
{
  "black_list_labels": [
    "fakemon"
  ]
}
```

## Move Blacklist

### Common Banned Moves

```json
{
  "black_list_moves": [
    // OHKO Moves
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill",

    // Evasion Moves
    "Double Team",
    "Minimize",

    // Problematic Moves
    "Baton Pass",
    "Swagger"
  ]
}
```

### Smogon OU Ban List
```json
{
  "black_list_moves": [
    "Baton Pass"
  ]
}
```

## Item Blacklist

### Common Banned Items

```json
{
  "black_list_items_pokemon": [
    // Evasion Items
    "Bright Powder",
    "Lax Incense",

    // Format-Specific
    "Soul Dew"
  ]
}
```

## Ability Blacklist

### Common Banned Abilities

```json
{
  "black_list_ability": [
    // Trapping Abilities
    "Shadow Tag",
    "Arena Trap",

    // RNG-Based
    "Moody",

    // Evasion
    "Sand Veil",
    "Snow Cloak"
  ]
}
```

### Smogon OU Bans
```json
{
  "black_list_ability": [
    "Shadow Tag",
    "Arena Trap",
    "Moody"
  ]
}
```

## Special Formats

Enable format-specific rules for alternative battle modes.

### Baby Cup

Only baby Pokemon that can evolve:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "baby_cup"
  }
}
```

Requirements:
- Must be first evolution stage
- Must be able to evolve further

### Little Cup

Only first-stage Pokemon:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  }
}
```

### Monotype

All Pokemon must share a type:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "monotype"
  }
}
```

Example: All Pokemon must be Water-type or have Water as one of their types.

### Shiny Only

Only shiny Pokemon allowed:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "shiny_only"
  }
}
```

### Pokedex Range

Limit by National Dex numbers:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "dex_range",
    "dex_range_min": 1,
    "dex_range_max": 151
  }
}
```

Example: `1-151` = Gen 1 (Kanto) only

Popular ranges:
- `1-151` - Gen 1 (Kanto)
- `152-251` - Gen 2 (Johto)
- `252-386` - Gen 3 (Hoenn)
- `1-493` - Gen 1-4
- `1-649` - Gen 1-5

### NFE (Not Fully Evolved)

Only Pokemon that can still evolve:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "nfe"
  }
}
```

## Complete Example

A competitive VGC-style configuration:

```json
{
  "_comments": {
    "black_list_pokemon": "Individual Pokemon bans",
    "black_list_labels": "Ban entire categories",
    "black_list_moves": "Banned moves",
    "black_list_items_pokemon": "Banned held items",
    "black_list_ability": "Banned abilities"
  },

  "black_list_pokemon": [],

  "black_list_labels": [
    "mythical",
    "ultra_beast"
  ],

  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill"
  ],

  "black_list_items_pokemon": [
    "Bright Powder",
    "Lax Incense"
  ],

  "black_list_ability": [
    "Shadow Tag",
    "Moody"
  ],

  "special_format": {
    "enabled": false,
    "format_type": "none",
    "dex_range_min": 1,
    "dex_range_max": 300
  }
}
```

## Testing Your Configuration

1. **Save the file**
2. **Reload**: `/rankedarena reload`
3. **Test**: Try joining queue with banned Pokemon
4. **Check logs**: Look for validation errors

## Troubleshooting

### Pokemon not being banned

- Check spelling (case-insensitive but must match species name)
- Check if using correct form name
- Reload configuration: `/rankedarena reload`

### Syntax errors

- Validate JSON: https://jsonlint.com
- Check for trailing commas
- Ensure double quotes around strings

### Form bans not working

- Use format: `"PokemonName:FormName"`
- Check form name matches Cobblemon's form data
- Forms are case-insensitive

## Advanced: Combining Bans

You can combine individual bans with label bans:

```json
{
  "black_list_pokemon": [
    "Ditto"  // Ban Ditto specifically
  ],
  "black_list_labels": [
    "legendary"  // Also ban all legendaries
  ]
}
```

Result: Ditto + all legendaries are banned.
