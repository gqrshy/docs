# Blacklist & Restrictions Configuration

Learn how to ban Pokemon, moves, abilities, and items from ranked battles, and set limits on restricted Pokemon usage.

---

## 📁 File Location

`config/cobbleranked/blacklist.json`

---

## 🎯 What Can You Restrict?

CobbleRanked offers two types of restrictions:

1. **Complete Bans** - Completely prohibit certain Pokemon, moves, abilities, or items
2. **Usage Limits** - Allow restricted Pokemon but limit how many per team (e.g., max 2 legendaries)

---

## 🚫 Complete Bans vs Usage Limits

### Understanding the Difference

| Type | Example | Use Case |
|------|---------|----------|
| **Complete Ban** | Ban Mewtwo entirely | Tournament rules: No Mewtwo allowed |
| **Usage Limit** | Max 2 legendaries per team | VGC-style: Allow some legendaries but not full legendary teams |

**Example Scenario:**
- You want to allow players to use Groudon, Kyogre, or Rayquaza
- But you don't want teams with all three
- **Solution:** Set `max_restricted: 2` - players can use any 2 of them, but not all 3

---

## ⚖️ Usage Limits (Restricted Pokemon)

### How It Works

**NOT YET IMPLEMENTED** - This is a planned feature based on user requests.

When implemented, you'll be able to configure:

```json
{
  "restricted_pokemon": {
    "enabled": true,
    "max_restricted": 2,  // Maximum 2 restricted Pokemon per team

    // Define which Pokemon count as "restricted"
    "restricted_list": [
      "groudon",
      "kyogre",
      "rayquaza",
      "dialga",
      "palkia",
      "giratina",
      "lugia",
      "ho-oh"
      // Add more box legendaries
    ],

    // Error message shown when limit exceeded
    "validation_message": "&cYou can only use up to {max} restricted Pokemon! (Current: {count})"
  }
}
```

### Example Configurations

#### VGC Series 1 Style (2 Restricted)
```json
{
  "restricted_pokemon": {
    "enabled": true,
    "max_restricted": 2,
    "restricted_list": [
      "groudon", "kyogre", "rayquaza",
      "dialga", "palkia", "giratina",
      "lugia", "ho-oh",
      "xerneas", "yveltal", "zygarde",
      "solgaleo", "lunala", "necrozma",
      "zacian", "zamazenta", "eternatus",
      "koraidon", "miraidon"
    ]
  }
}
```

**Result:** Players can use Groudon + Kyogre, but cannot add Rayquaza (would be 3 restricted)

#### Smogon OU Style (0 Restricted)
```json
{
  "restricted_pokemon": {
    "enabled": true,
    "max_restricted": 0,  // No restricted Pokemon allowed
    "restricted_list": [
      "mewtwo", "lugia", "ho-oh",
      // ... all Ubers
    ]
  }
}
```

**Result:** Same as complete ban, but easier to manage

#### Casual Play (4 Restricted)
```json
{
  "restricted_pokemon": {
    "enabled": true,
    "max_restricted": 4,  // Allow 4 legendaries per team
    "restricted_list": ["legendary"]  // Use label instead of list
  }
}
```

### Restricted List Options

You can use either:

1. **Individual Pokemon names:**
   ```json
   "restricted_list": ["groudon", "kyogre", "rayquaza"]
   ```

2. **Label tags** (when implemented):
   ```json
   "restricted_list": ["legendary", "mythical"]
   ```

3. **Combined:**
   ```json
   "restricted_list": [
     "legendary",        // All legendaries
     "ditto",            // Plus Ditto specifically
     "flutter_mane"      // Plus strong paradox Pokemon
   ]
   ```

### How Validation Works

1. Player clicks "Join Queue"
2. System counts restricted Pokemon in their party
3. If count > `max_restricted`, show error message
4. Otherwise, allow matchmaking

**Visual Example:**

```
Player's Team:
✓ Groudon (restricted)
✓ Kyogre (restricted)
✓ Rillaboom (not restricted)
✓ Incineroar (not restricted)
✓ Amoonguss (not restricted)
✗ Rayquaza (restricted) ← ERROR: Would be 3rd restricted Pokemon!

Config: max_restricted = 2
Result: ❌ Cannot join queue
Message: "You can only use up to 2 restricted Pokemon! (Current: 3)"
```

---

## 🚫 Complete Bans

Use complete bans when you want to prohibit Pokemon entirely (no usage allowed).

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

**Result:** These Pokemon cannot be used in ranked battles at all.

### Ban Specific Forms

Use the format `"PokemonName:FormName"`:

```json
{
  "black_list_pokemon": [
    "Zygarde:Complete",     // Ban Complete Zygarde only (allow 10%, 50%)
    "Mewtwo:Mega X",        // Ban Mega Mewtwo X
    "Mewtwo:Mega Y",        // Ban Mega Mewtwo Y
    "Urshifu:Rapid Strike", // Ban Rapid Strike Urshifu
    "Necrozma:Dawn Wings"   // Ban Dawn Wings Necrozma
  ]
}
```

**Tip:** If you don't specify a form, ALL forms are banned.

### Ban by Category (Labels)

Instead of listing every legendary individually, use labels:

```json
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ]
}
```

#### Available Labels

| Label | Description | Examples |
|-------|-------------|----------|
| `legendary` | Legendary Pokemon | Mewtwo, Lugia, Rayquaza, Dialga |
| `mythical` | Mythical Pokemon | Mew, Celebi, Jirachi, Victini |
| `ultra_beast` | Ultra Beasts | Nihilego, Buzzwole, Xurkitree |
| `paradox` | Paradox Pokemon (Gen 9) | Iron Treads, Great Tusk, Flutter Mane |
| `restricted` | VGC Restricted Pokemon | Most box legendaries |
| `fakemon` | Custom/addon Pokemon | From Fakemon mods |
| `starter` | Starter Pokemon | Bulbasaur, Charmander, Squirtle |
| `fossil` | Fossil Pokemon | Omanyte, Kabuto, Aerodactyl |
| `baby` | Baby Pokemon | Pichu, Cleffa, Igglybuff |
| `powerhouse` | Pseudo-legendaries | Dragonite, Garchomp, Salamence |
| `gen1` - `gen9` | By generation | `gen1` = Kanto, `gen9` = Paldea |

---

## 📋 Format Presets

Copy-paste these configurations for common formats:

### Competitive OU (No Ubers)

```json
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Baton Pass"
  ],
  "black_list_ability": [
    "Shadow Tag",
    "Arena Trap",
    "Moody"
  ]
}
```

### VGC 2024 Style

```json
{
  "black_list_labels": [
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill"
  ]
}
```

**Note:** Add `restricted_pokemon` config when implemented for true VGC ruleset.

### No Legends (Casual Play)

```json
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ]
}
```

### Gen 1-8 Only (No Gen 9)

```json
{
  "black_list_labels": [
    "gen9",
    "paradox"
  ]
}
```

### Smogon Little Cup

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  },
  "black_list_moves": [
    "Sonic Boom",
    "Dragon Rage",
    "Baton Pass"
  ],
  "black_list_ability": [
    "Moody"
  ]
}
```

---

## 🎲 Move Blacklist

Ban specific moves:

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
    "Swagger",
    "Moody"
  ]
}
```

**Common Bans:**
- **OHKO moves** - Overpowered in competitive (Fissure, Sheer Cold)
- **Evasion moves** - Creates RNG-heavy battles (Double Team, Minimize)
- **Baton Pass** - Banned in Smogon OU due to stat-passing chains

---

## 🎒 Item Blacklist

Ban held items:

```json
{
  "black_list_items_pokemon": [
    // Evasion Items
    "Bright Powder",
    "Lax Incense",

    // Format-Specific
    "Soul Dew"  // Banned in official VGC
  ]
}
```

---

## ⚡ Ability Blacklist

Ban abilities:

```json
{
  "black_list_ability": [
    // Trapping Abilities
    "Shadow Tag",   // Prevents switching
    "Arena Trap",   // Traps grounded Pokemon

    // RNG-Based
    "Moody",        // Random stat boosts

    // Evasion
    "Sand Veil",    // Evasion boost in sandstorm
    "Snow Cloak"    // Evasion boost in hail
  ]
}
```

---

## 🎮 Special Formats

Enable format-specific rules for alternative battle modes.

### Baby Cup

Only baby Pokemon that can still evolve:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "baby_cup"
  }
}
```

**Allowed:** Pichu, Cleffa, Igglybuff (they can evolve)
**Banned:** Pikachu, Clefairy (not baby stage)

### Little Cup

Only first-stage Pokemon (including those that don't evolve):

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  }
}
```

**Allowed:** Pichu, Pikachu, Larvitar, Dratini
**Banned:** Raichu, Tyranitar, Dragonite (evolved forms)

### Monotype

All Pokemon must share at least one type:

```json
{
  "special_format": {
    "enabled": true,
    "format_type": "monotype"
  }
}
```

**Example Valid Team:**
- Charizard (Fire/Flying)
- Talonflame (Fire/Flying)
- Blaziken (Fire/Fighting)
- Arcanine (Fire)
- Ninetales (Fire)
- Typhlosion (Fire)

All share the Fire type ✓

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

**Popular Ranges:**
- `1-151` - Gen 1 (Kanto)
- `152-251` - Gen 2 (Johto)
- `252-386` - Gen 3 (Hoenn)
- `387-493` - Gen 4 (Sinnoh)
- `1-493` - Gen 1-4 (Pre-Gen 5)

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

**Allowed:** Pikachu (evolves to Raichu), Charmeleon (evolves to Charizard)
**Banned:** Raichu, Charizard (fully evolved)

---

## 📝 Complete Configuration Example

A VGC-inspired competitive configuration:

```json
{
  "_comments": {
    "description": "VGC-style competitive ruleset with restricted Pokemon limits",
    "black_list_pokemon": "Individual Pokemon bans",
    "black_list_labels": "Ban entire categories",
    "restricted_pokemon": "Limit usage of restricted Pokemon (NOT YET IMPLEMENTED)",
    "black_list_moves": "Banned moves",
    "black_list_items_pokemon": "Banned held items",
    "black_list_ability": "Banned abilities"
  },

  "restricted_pokemon": {
    "enabled": false,
    "max_restricted": 2,
    "restricted_list": [
      "groudon", "kyogre", "rayquaza",
      "dialga", "palkia", "giratina",
      "lugia", "ho-oh",
      "xerneas", "yveltal", "zygarde",
      "solgaleo", "lunala", "necrozma",
      "zacian", "zamazenta", "eternatus",
      "koraidon", "miraidon"
    ],
    "validation_message": "&cYou can only use up to {max} restricted Pokemon! (Current: {count})"
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
    "dex_range_max": 1025
  }
}
```

---

## 🧪 Testing Your Configuration

1. **Edit the file:** `config/cobbleranked/blacklist.json`
2. **Reload configuration:** `/rankedarena reload`
3. **Test with banned Pokemon:**
   - Try joining queue with a banned Pokemon
   - You should see an error message
4. **Check server logs:** Look for `[Validation]` messages

---

## 🐛 Troubleshooting

### Pokemon not being banned

**Possible causes:**
- Spelling mistake (e.g., `"Mewtoo"` instead of `"Mewtwo"`)
- Form name incorrect (e.g., `"MegaX"` instead of `"Mega X"`)
- Configuration not reloaded

**Solutions:**
1. Check spelling matches Cobblemon species name exactly
2. Use `/rankedarena reload` after editing
3. Check server logs for validation errors

### JSON Syntax Errors

**Common mistakes:**
```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Rayquaza",  // ❌ Trailing comma before closing bracket
  ]
}
```

**Correct:**
```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Rayquaza"  // ✓ No trailing comma
  ]
}
```

**Tool:** Validate your JSON at https://jsonlint.com before saving

### Form Bans Not Working

**Check form name format:**
```json
"black_list_pokemon": [
  "Zygarde:Complete",      // ✓ Correct
  "Zygarde-Complete",      // ❌ Wrong separator
  "zygarde:complete",      // ✓ Case-insensitive, works
  "Zygarde Complete"       // ❌ Missing colon
]
```

---

## 🎯 Best Practices

1. **Start Simple**
   - Begin with label-based bans (`"legendary"`, `"mythical"`)
   - Add individual bans as needed

2. **Test After Changes**
   - Always reload: `/rankedarena reload`
   - Test with a banned Pokemon before announcing changes

3. **Document Your Ruleset**
   - Use `_comments` field to explain your choices
   - Players appreciate knowing the reasoning

4. **Combine Bans Strategically**
   ```json
   {
     "black_list_labels": ["legendary"],  // Ban most legendaries
     "black_list_pokemon": ["Ditto"]      // Plus specific threats
   }
   ```

5. **Use Restricted Limits (When Available)**
   - More flexible than complete bans
   - Allows diverse teambuilding while preventing abuse

---

## 🔮 Upcoming Features

### Restricted Pokemon Limits (Planned)

Based on community feedback, we're planning to implement:

- ✅ Usage limits for restricted Pokemon
- ✅ Flexible restricted lists (individual names or labels)
- ✅ Format-specific restrictions (different limits for Singles vs Doubles)
- ✅ Tag-based restrictions (e.g., "uber", "restricted", "mythical")
- ✅ Item restrictions (ban specific held items)

**Want this feature?** Let us know in our Discord or GitHub Issues!

---

## 📚 Related Documentation

- [Battle Formats](../features/battle-formats.md) - Singles, Doubles, Multi
- [Elo System](../features/elo-system.md) - Rating calculation
- [Season Management](../features/season-management.md) - Season rotation and rewards

---

**Last Updated:** 2025-11-04
**Version:** 1.0.0
**Compatible With:** CobbleRanked 1.0.0+
