# Blacklist Configuration Guide

Complete guide to configuring battle rules, restrictions, and format-specific banlists in CobbleRanked.

## Table of Contents

1. [Overview](#overview)
2. [File Locations](#file-locations)
3. [Pokemon Blacklist](#pokemon-blacklist)
4. [Label-Based Blacklist](#label-based-blacklist)
5. [Restricted Label Limits](#restricted-label-limits)
6. [Move Blacklist](#move-blacklist)
7. [Ability Blacklist](#ability-blacklist)
8. [Held Item Blacklist](#held-item-blacklist)
9. [Common Rulesets](#common-rulesets)
10. [In-Game Blacklist Viewer](#in-game-blacklist-viewer)

---

## Overview

CobbleRanked uses **separate blacklist files** for Singles and Doubles formats. This allows you to create format-specific rules similar to Pokemon Showdown tiers or VGC regulations.

### Why Separate Blacklists?

**Singles (1v1) and Doubles (2v2) have different competitive environments:**

- **Singles:** Often bans Uber-tier legendaries entirely
- **Doubles:** Uses VGC-style "restricted" limits instead of full bans
- Different moves/abilities are problematic in each format
- Allows flexibility for different playstyles

---

## File Locations

After first server start:

```
config/cobbleranked/blacklist/singles.json5  # Singles (1v1) rules
config/cobbleranked/blacklist/doubles.json5  # Doubles (2v2) rules
```

**How to apply changes:**
1. Edit the `.json5` file
2. Run `/rankedadmin reload` or restart server
3. Changes take effect immediately

**Important:** Both files use the same format, just with different rules.

---

## Pokemon Blacklist

Ban specific Pokemon by name.

### Basic Format

```json5
"black_list_pokemon": [
  "Mewtwo",
  "Rayquaza",
  "Arceus"
]
```

**Simple name bans:**
- Bans all forms of that Pokemon
- Case-sensitive (use exact Cobblemon names)
- Applies to both normal and shiny variants

### Advanced Form Syntax

**Ban specific forms:**

```json5
"black_list_pokemon": [
  "Pikachu:custom",           // Only custom form Pikachu
  "Zygarde:formid=10",        // Only 10% form Zygarde
  "Pikachu:shiny"             // Only shiny Pikachu
]
```

**Form specifications:**
- `:custom` - Ban only custom forms
- `:formid=X` - Ban specific form ID
- `:shiny` - Ban only shiny variants
- No suffix - Bans all forms

### Common Pokemon to Ban

**Uber Tier Legendaries:**
```json5
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
  "Zygarde",
  "Solgaleo",
  "Lunala",
  "Necrozma",
  "Zacian",
  "Zamazenta",
  "Eternatus",
  "Calyrex",
  "Koraidon",
  "Miraidon"
]
```

**Smogon OU Banned Pokemon (Gen 9):**
```json5
"black_list_pokemon": [
  "Annihilape",
  "Chi-Yu",
  "Chien-Pao",
  "Flutter Mane",
  "Houndstone",
  "Iron Bundle",
  "Palafin"
]
```

---

## Label-Based Blacklist

Ban entire categories of Pokemon with a single label.

### Available Labels

**Category Labels:**

| Label | Bans |
|-------|------|
| `legendary` | All legendary Pokemon |
| `mythical` | All mythical Pokemon (Mew, Celebi, etc.) |
| `ultra_beast` | All Ultra Beasts |
| `paradox` | All Paradox Pokemon |
| `restricted` | VGC restricted legendaries |
| `fakemon` | Custom/addon Pokemon |
| `starter` | All starter Pokemon |
| `fossil` | All fossil Pokemon |
| `baby` | All baby Pokemon |
| `powerhouse` | Pseudo-legendaries (Dragonite, Garchomp, etc.) |

**Generation Labels:**

| Label | Bans |
|-------|------|
| `gen1` | Generation 1 Pokemon |
| `gen2` | Generation 2 Pokemon |
| `gen3` | Generation 3 Pokemon |
| `gen4` | Generation 4 Pokemon |
| `gen5` | Generation 5 Pokemon |
| `gen6` | Generation 6 Pokemon |
| `gen7` | Generation 7 Pokemon |
| `gen8` | Generation 8 Pokemon |
| `gen9` | Generation 9 Pokemon |

**Regional Form Labels:**

| Label | Bans |
|-------|------|
| `alolan_form` | Alolan regional variants |
| `galarian_form` | Galarian regional variants |
| `hisuian_form` | Hisuian regional variants |
| `paldean_form` | Paldean regional variants |

### Usage Examples

**Ban all legendaries and mythicals:**
```json5
"black_list_labels": [
  "legendary",
  "mythical"
]
```

**Ban Ultra Beasts and Paradox Pokemon:**
```json5
"black_list_labels": [
  "ultra_beast",
  "paradox"
]
```

**Only allow Gen 1-8 (ban Gen 9):**
```json5
"black_list_labels": [
  "gen9",
  "paradox"  // Gen 9 Paradox Pokemon
]
```

**No Fakemon allowed:**
```json5
"black_list_labels": [
  "fakemon"
]
```

**Competitive Standard (OU-like):**
```json5
"black_list_labels": [
  "legendary",
  "mythical",
  "ultra_beast"
]
```

---

## Restricted Label Limits

**Limit** how many Pokemon with a label can be on a team, instead of banning them completely.

### VGC-Style Rules (Doubles)

**Format:**
```json5
"restricted_label_limits": {
  "label": max_count
}
```

**Common VGC Series configurations:**

**Series 1 (2 Restricted):**
```json5
"restricted_label_limits": {
  "restricted": 2
}
```

**Series 2 (No Restricted):**
```json5
"restricted_label_limits": {
  "restricted": 0
}
```

**Custom (1 Box Legendary):**
```json5
"restricted_label_limits": {
  "restricted": 1
}
```

### Singles Usage

**Allow 1 legendary per team:**
```json5
"restricted_label_limits": {
  "legendary": 1
}
```

**Allow 2 Paradox Pokemon:**
```json5
"restricted_label_limits": {
  "paradox": 2
}
```

### Multiple Limits

You can combine multiple limits:

```json5
"restricted_label_limits": {
  "legendary": 1,
  "mythical": 1,
  "paradox": 2
}
```

**How it works:**
- Max 1 legendary Pokemon
- Max 1 mythical Pokemon
- Max 2 Paradox Pokemon
- Totals are independent (can have 1 legendary + 1 mythical + 2 paradox = 4 special Pokemon)

### Practical Examples

**Lax Rules (Allow More):**
```json5
"black_list_labels": [],  // Nothing fully banned
"restricted_label_limits": {
  "legendary": 2,
  "mythical": 1
}
```

**Standard Competitive:**
```json5
"black_list_labels": ["legendary", "mythical"],
"restricted_label_limits": {}
```

**VGC Simulation:**
```json5
"black_list_labels": ["mythical"],  // Ban mythicals entirely
"restricted_label_limits": {
  "restricted": 2  // Allow 2 box legendaries
}
```

---

## Move Blacklist

Ban specific moves (case-insensitive).

### Format

```json5
"black_list_moves": [
  "Fissure",
  "Sheer Cold",
  "Double Team"
]
```

### Common Bans

**OHKO Moves:**
```json5
"black_list_moves": [
  "Fissure",
  "Sheer Cold",
  "Guillotine",
  "Horn Drill"
]
```

**Evasion Boosters:**
```json5
"black_list_moves": [
  "Double Team",
  "Minimize"
]
```

**Smogon OU Banned Moves:**
```json5
"black_list_moves": [
  "Baton Pass",
  "Last Respects",
  "Shed Tail"
]
```

**VGC-Style (Doubles):**
```json5
"black_list_moves": [
  "Dark Void"  // Restricted to Darkrai
]
```

### Recommended Singles Banlist

```json5
"black_list_moves": [
  "Fissure",
  "Sheer Cold",
  "Guillotine",
  "Horn Drill",
  "Double Team",
  "Minimize",
  "Baton Pass",
  "Last Respects",
  "Shed Tail"
]
```

### Recommended Doubles Banlist

```json5
"black_list_moves": [
  "Fissure",
  "Sheer Cold",
  "Guillotine",
  "Horn Drill",
  "Double Team",
  "Minimize"
]
```

---

## Ability Blacklist

Ban specific abilities.

### Format

```json5
"black_list_ability": [
  "Moody",
  "Shadow Tag"
]
```

### Common Bans

**Smogon OU Banned Abilities:**
```json5
"black_list_ability": [
  "Moody",
  "Shadow Tag",
  "Arena Trap"
]
```

**Evasion Abilities:**
```json5
"black_list_ability": [
  "Sand Veil",
  "Snow Cloak"
]
```

### Recommended Singles Banlist

```json5
"black_list_ability": [
  "Moody",
  "Shadow Tag",
  "Arena Trap"
]
```

### Recommended Doubles Banlist

```json5
"black_list_ability": [
  "Moody"
]
```

**Note:** Shadow Tag and Arena Trap are less problematic in Doubles, so VGC typically doesn't ban them.

---

## Held Item Blacklist

Ban specific held items (use full item ID: `modid:item_name`).

### Format

```json5
"black_list_items_pokemon": [
  "cobblemon:bright_powder",
  "cobblemon:lax_incense"
]
```

### Cobblemon Items

**Common competitive bans:**
```json5
"black_list_items_pokemon": [
  "cobblemon:bright_powder",  // Evasion boost
  "cobblemon:lax_incense"     // Evasion boost
]
```

**Format-specific:**
```json5
"black_list_items_pokemon": [
  "cobblemon:soul_dew"  // Ban in older gen formats
]
```

### Mod Items

**Example - Mega Showdown mod items:**
```json5
"black_list_items_pokemon": [
  "mega_showdown:tera_orb",      // Prevents Terastallization
  "mega_showdown:dynamax_band"   // Prevents Dynamax
]
```

**Note:** Use `banned_inventory_items` in `config.json5` to prevent players from **carrying** these items when queueing.

### How to Find Item IDs

1. **In-game method:**
   - Hold the item
   - Press F3 + H (show advanced tooltips)
   - Hover over item to see ID

2. **Check mod files:**
   - Look in mod's assets folder
   - Find item JSONs
   - Use format: `modid:item_name`

---

## Common Rulesets

Pre-configured rulesets for different competitive styles.

### Smogon OU (Singles)

**File:** `blacklist/singles.json5`

```json5
{
  "black_list_pokemon": [
    "Annihilape",
    "Chi-Yu",
    "Chien-Pao",
    "Flutter Mane",
    "Houndstone",
    "Iron Bundle",
    "Palafin"
  ],
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ],
  "restricted_label_limits": {},
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill",
    "Double Team",
    "Minimize",
    "Baton Pass",
    "Last Respects",
    "Shed Tail"
  ],
  "black_list_ability": [
    "Moody",
    "Shadow Tag",
    "Arena Trap"
  ],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

### VGC Series 1 (Doubles)

**File:** `blacklist/doubles.json5`

```json5
{
  "black_list_pokemon": [],  // No specific bans
  "black_list_labels": [
    "mythical"  // Mythicals not allowed in VGC
  ],
  "restricted_label_limits": {
    "restricted": 2  // Max 2 box legendaries
  },
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill"
  ],
  "black_list_ability": [],
  "black_list_items_pokemon": []
}
```

### No Legendaries (Casual)

**Singles:**
```json5
{
  "black_list_pokemon": [],
  "black_list_labels": [
    "legendary",
    "mythical"
  ],
  "restricted_label_limits": {},
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill",
    "Double Team",
    "Minimize"
  ],
  "black_list_ability": [
    "Moody"
  ],
  "black_list_items_pokemon": []
}
```

### Gen 1-8 Only (No Gen 9)

**Both formats:**
```json5
{
  "black_list_pokemon": [],
  "black_list_labels": [
    "gen9",
    "paradox",
    "legendary",
    "mythical"
  ],
  "restricted_label_limits": {},
  "black_list_moves": [
    "Last Respects",
    "Shed Tail"
  ],
  "black_list_ability": [],
  "black_list_items_pokemon": []
}
```

### Open Format (Anything Goes)

```json5
{
  "black_list_pokemon": [],
  "black_list_labels": [],
  "restricted_label_limits": {},
  "black_list_moves": [],
  "black_list_ability": [],
  "black_list_items_pokemon": []
}
```

**Note:** Still recommended to ban OHKO moves for balance.

---

## In-Game Blacklist Viewer

Players can view banned Pokemon visually in-game!

### How to Access

1. Type `/ranked`
2. Click the **"Blacklist"** button (usually a barrier block)
3. Browse banned Pokemon with visual icons

### Features

**Format Toggle:**
- Click the format toggle button to switch between Singles and Doubles view
- See format-specific bans instantly

**Visual Display:**
- Pokemon icons shown for banned species
- Hover for Pokemon names
- Pagination for large banlists

**Sort Options:**
- Click sort toggle to change ordering
- Alphabetical or by category

**Why this is useful:**
- Players don't need to read config files
- Visual confirmation of what's banned
- Easy format comparison

---

## Testing Your Configuration

### Before Deploying to Production

1. **Start a test server**
   - Use a separate test environment
   - Copy your blacklist config

2. **Test banned Pokemon**
   - Try to queue with banned Pokemon
   - Should show "Your Pokemon contains banned species" error

3. **Test banned moves**
   - Give Pokemon banned moves
   - Should show "Your Pokemon contains banned moves" error

4. **Test banned abilities**
   - Same process as moves
   - Verify error message appears

5. **Test banned items**
   - Equip banned items to Pokemon
   - Should show "Your Pokemon contains banned items" error

6. **Test restricted limits**
   - Build team exceeding limits
   - Should show appropriate error

### Common Testing Mistakes

**Forgetting to reload:**
```
/rankedadmin reload
```

**Case sensitivity:**
- Pokemon names are case-sensitive!
- Use exact Cobblemon names: `"Mewtwo"` not `"mewtwo"`

**Item IDs:**
- Must use full format: `"cobblemon:bright_powder"`
- Not just: `"bright_powder"`

**Label typos:**
- Labels are exact: `"legendary"` not `"legendaries"`
- Check spelling carefully

---

## Tips and Best Practices

### Balance Singles and Doubles Differently

**Singles:**
- More restrictive (ban legendaries)
- Ban setup moves like Baton Pass
- Ban evasion completely

**Doubles:**
- Use restricted limits instead of bans
- Allow more Pokemon variety
- Focus on move bans (OHKO moves)

### Communicate Changes to Players

When changing rules:
1. Announce in Discord/server chat
2. Give players time to adjust teams
3. Post full banlist somewhere accessible
4. Use in-game blacklist GUI

### Start Conservative, Loosen Later

Better to:
- Start with stricter bans
- Observe meta development
- Unban things if not problematic

Than to:
- Allow everything initially
- Have to ban things later (players complain)

### Regional Consistency

If you run multiple servers/regions:
- Keep blacklists consistent
- Sync config files
- Announce changes to all communities

### Document Your Rules

Create a simple document like:
```
Our Server Rules:
- No Uber legendaries (Mewtwo, Rayquaza, etc.)
- No OHKO moves
- No evasion moves/abilities
- VGC-style Doubles (2 restricted allowed)
- Singles follows Smogon OU
```

Post this in Discord/website for player reference.

---

## Troubleshooting

### "My blacklist isn't working"

**Check:**
1. Did you restart server or run `/rankedadmin reload`?
2. Are Pokemon names spelled exactly right?
3. Are item IDs in correct format (`modid:item_name`)?
4. Is the JSON5 syntax valid?

### "Players can still use banned Pokemon"

**Verify:**
1. Check exact Pokemon name in Cobblemon
2. Try F3 + H on a Pokemon to see its exact species name
3. Check for form variants (might need `:formid=X`)

### "Restricted limits not working"

**Common issues:**
- Label name wrong (use exact labels from this guide)
- Set to `-1` accidentally (means unlimited)
- Testing with wrong format (Singles config doesn't affect Doubles)

### "Items not being blocked"

**Remember:**
- `black_list_items_pokemon` = Held items on Pokemon
- `banned_inventory_items` (in `config.json5`) = Items in player inventory
- These are different systems!

---

## Quick Reference

### Blacklist Sections

| Section | Purpose |
|---------|---------|
| `black_list_pokemon` | Ban specific Pokemon by name |
| `black_list_labels` | Ban categories (legendary, mythical, etc.) |
| `restricted_label_limits` | Limit count of labeled Pokemon |
| `black_list_moves` | Ban specific moves |
| `black_list_ability` | Ban specific abilities |
| `black_list_items_pokemon` | Ban held items |

### File Locations

| File | Purpose |
|------|---------|
| `blacklist/singles.json5` | Singles (1v1) rules |
| `blacklist/doubles.json5` | Doubles (2v2) rules |

### Common Labels

| Label | Bans |
|-------|------|
| `legendary` | All legendaries |
| `mythical` | Mythical Pokemon |
| `restricted` | VGC restricted |
| `ultra_beast` | Ultra Beasts |
| `paradox` | Paradox Pokemon |
| `gen9` | Generation 9 |

---

**Next Steps:**
- [Configuration Guide](configuration.md) - Main config reference
- [Commands](commands.md) - Admin commands
- [FAQ](faq.md) - Common questions

---

Need help creating the perfect competitive ruleset? Join our Discord community!
