# Pokemon Blacklist & Restrictions

Configure Pokemon, move, ability, and item restrictions for ranked battles.

**Configuration file:** `config/cobbleranked/config.json5` (section: `"blacklist"`)

---

## Quick Start

The blacklist system allows you to:
- Ban specific Pokemon species or forms
- Ban Pokemon by labels (legendary, mythical, restricted, etc.)
- Limit quantities of labeled Pokemon (e.g., max 2 restricted)
- Ban specific moves, abilities, or held items

---

## Finding Internal Names

### Item IDs

#### In-Game Method (Recommended)

1. Press `F3 + H` in Minecraft to enable advanced tooltips
2. Hover over any item in your inventory
3. The item ID appears at the bottom (e.g., `cobblemon:bright_powder`)

#### Command Method

```
/give @s <tab>
```
Autocomplete shows available item IDs.

**Supported Formats:**
- Full item ID: `cobblemon:bright_powder`
- Cobblemon internal name: `bright_powder` (automatically checks both)
- Minecraft items: `minecraft:diamond`, `minecraft:netherite_sword`

**Important:** Always use the full format `mod_id:item_name` (e.g., `cobblemon:bright_powder`, not "Bright Powder"). This prevents conflicts between mods with similar item names.

### Ability Names

Ability internal names use **snake_case** format (lowercase with underscores).

#### In-Game Method

1. Press `F3 + H` in Minecraft to enable advanced tooltips
2. Open your Pokemon's summary screen
3. Hover over the ability icon
4. The internal name appears in the tooltip (e.g., `intimidate`, `drought`)

#### Common Ability Names Reference

| Display Name | Internal Name | Notes |
|--------------|---------------|-------|
| Intimidate | `intimidate` | Lowers opponent's Attack |
| Drought | `drought` | Summons harsh sunlight |
| Drizzle | `drizzle` | Summons rain |
| Sand Stream | `sand_stream` | Summons sandstorm |
| Snow Warning | `snow_warning` | Summons snow |
| Moody | `moody` | Banned in Smogon (random stat changes) |
| Shadow Tag | `shadow_tag` | Banned in Smogon (prevents switching) |
| Arena Trap | `arena_trap` | Banned in Smogon (traps grounded Pokemon) |
| Huge Power | `huge_power` | Doubles Attack stat |
| Pure Power | `pure_power` | Same as Huge Power |
| Wonder Guard | `wonder_guard` | Only super-effective moves hit |
| Protean | `protean` | Changes type to move used |
| Libero | `libero` | Same as Protean |
| As One (Ice Rider) | `as_one_ice_rider` | Combines Unnerve + Chilling Neigh |
| As One (Shadow Rider) | `as_one_shadow_rider` | Combines Unnerve + Grim Neigh |

**Pattern:**
- Replace spaces with underscores: "Shadow Tag" → `shadow_tag`
- Use lowercase: "Huge Power" → `huge_power`
- Parentheses in display name become separate words: "As One (Ice Rider)" → `as_one_ice_rider`

#### Data Files Method

Cobblemon's ability data is stored in:
```
.minecraft/data/cobblemon/species/
```

Each Pokemon's JSON file lists its abilities with internal names:
```json
{
  "abilities": [
    "intimidate",
    "moxie",
    "h:sheer_force"
  ]
}
```

**Format:**
- Regular abilities: `"intimidate"`
- Hidden abilities: `"h:sheer_force"` (prefix with `h:`)

#### Testing Method

1. Set up a test team with the ability you want to ban
2. Enable debug logging in config:
   ```json5
   "debug_queue": true
   ```
3. Try to join queue
4. Check server logs for ability validation messages

---

## Configuration Options

### 1. Ban by Label (Recommended)

Ban all Pokemon with specific labels:

```json5
"black_list_labels": [
  "legendary",
  "mythical",
  "ultra_beast"
]
```

**Available Labels:**

| Label | Description | Examples |
|-------|-------------|----------|
| `legendary` | Legendary Pokemon | Mewtwo, Lugia, Rayquaza, Dialga |
| `mythical` | Mythical Pokemon | Mew, Celebi, Jirachi, Victini |
| `restricted` | VGC restricted Pokemon | Box legendaries, cover legendaries |
| `ultra_beast` | Ultra Beasts | Nihilego, Buzzwole, Xurkitree |
| `paradox` | Paradox Pokemon (Gen 9) | Iron Treads, Great Tusk, Flutter Mane |
| `starter` | Starter Pokemon | Bulbasaur, Charmander, Squirtle |
| `fossil` | Fossil Pokemon | Omanyte, Kabuto, Aerodactyl |
| `baby` | Baby Pokemon | Pichu, Cleffa, Igglybuff |
| `powerhouse` | Pseudo-legendaries | Dragonite, Garchomp, Salamence |
| `gen1` - `gen9` | By generation | `gen1` = Kanto, `gen9` = Paldea |

### 2. Limit Pokemon by Label

Allow limited quantities instead of complete bans:

```json5
"restricted_label_limits": {
  "legendary": 1,      // Max 1 legendary per team
  "mythical": 0,       // Ban mythicals (same as black_list_labels)
  "restricted": 2      // Max 2 VGC restricted Pokemon
}
```

**VGC Series 1 Example:**
```json5
"restricted_label_limits": {
  "restricted": 2      // Allows 2 restricted Pokemon (VGC rule)
}
```

This automatically applies to all Pokemon with the `restricted` label - no need to list individual species.

### 3. Ban Specific Pokemon

Ban individual Pokemon by species name:

```json5
"black_list_pokemon": [
  "mewtwo",
  "rayquaza",
  "zacian"
]
```

**Case-insensitive:** "Mewtwo", "MEWTWO", and "mewtwo" all work.

### 4. Ban Specific Forms

Ban only specific forms using `species:form` syntax:

```json5
"black_list_pokemon": [
  "mewtwo:mega_x",           // Ban Mega Mewtwo X only
  "mewtwo:mega_y",           // Ban Mega Mewtwo Y only
  "zygarde:10",              // Ban Zygarde 10% only
  "lycanroc:midday:dusk"     // Ban multiple forms
]
```

**Note:** Blacklisting "mewtwo" (without form) bans ALL forms. Blacklisting "mewtwo:mega_x" bans ONLY that form.

### 5. Ban Moves

Ban specific moves by name:

```json5
"black_list_moves": [
  "baton_pass",
  "last_respects",
  "shed_tail",
  "fissure",
  "sheer_cold"
]
```

### 6. Ban Abilities

Ban specific abilities by name:

```json5
"black_list_ability": [
  "moody",
  "shadow_tag",
  "arena_trap"
]
```

### 7. Ban Held Items

Ban items Pokemon can hold using **Minecraft item IDs**:

```json5
"black_list_items_pokemon": [
  "cobblemon:bright_powder",       // Evasion boost
  "cobblemon:lax_incense",         // Evasion boost
  "cobblemon:soul_dew",            // Latios/Latias boost
  "cobblemon:quick_claw"           // Priority boost
]
```

**How to find item IDs:** Press `F3 + H` in-game, hover over the item, copy the ID shown.

**Why use item IDs?**
- **Mod compatibility:** Distinguishes `cobblemon:potion` vs `minecraft:potion`
- **No translation issues:** Works in any language
- **Exact matching:** Prevents accidental bans

---

## Common Configurations

### Smogon OU (Over Used)

```json5
{
  "blacklist": {
    "black_list_labels": [
      "legendary",
      "mythical",
      "restricted"
    ],
    "black_list_moves": [
      "baton_pass",
      "last_respects",
      "shed_tail"
    ],
    "black_list_ability": [
      "moody",
      "shadow_tag",
      "arena_trap"
    ],
    "black_list_items_pokemon": [
      "cobblemon:bright_powder",
      "cobblemon:lax_incense"
    ]
  }
}
```

### VGC Series 1 (2 Restricted Pokemon)

```json5
{
  "blacklist": {
    "restricted_label_limits": {
      "restricted": 2      // Max 2 restricted Pokemon
    },
    "black_list_labels": [
      "mythical"           // Mythicals not allowed in VGC
    ],
    "black_list_moves": [
      "fissure",
      "sheer_cold",
      "guillotine",
      "horn_drill"
    ]
  }
}
```

### Monotype (Species Clause + Evasion Clause)

```json5
{
  "blacklist": {
    "black_list_labels": [
      "legendary",
      "mythical"
    ],
    "black_list_moves": [
      "baton_pass"
    ],
    "black_list_items_pokemon": [
      "cobblemon:bright_powder",
      "cobblemon:lax_incense"
    ]
  }
}
```

### Gen 1-8 Only (No Gen 9)

```json5
{
  "blacklist": {
    "black_list_labels": [
      "gen9",
      "paradox"
    ]
  }
}
```

---

## Validation Flow

When a player joins the ranked queue:

```
1. Check label-based blacklist
   ❌ Banned → "Blacklisted Pokemon: <name> (blacklisted label)"

2. Check name/form-based blacklist
   ❌ Banned → "Blacklisted Pokemon: <name>"

3. Check label limits
   ❌ Over limit → "Too many <label>: <count>/<limit>"

4. Check moves
   ❌ Banned move → "Blacklisted move: <move>"

5. Check abilities
   ❌ Banned ability → "Blacklisted ability: <ability>"

6. Check held items
   ❌ Banned item → "Blacklisted item: <item_id>"

✅ All checks pass → Join queue
```

---

## Advanced Examples

### Ban All Megas Except One

```json5
"black_list_pokemon": [
  "charizard:mega_x",
  "charizard:mega_y",
  "mewtwo:mega_x",
  "mewtwo:mega_y"
  // Allow Lucario Mega by omitting it
]
```

### Ban Specific Regional Forms

```json5
"black_list_pokemon": [
  "weezing:galar",      // Ban Galarian Weezing only
  "muk:alola"           // Ban Alolan Muk only
]
```

### Mix Label Limits and Bans

```json5
{
  "restricted_label_limits": {
    "legendary": 1           // Max 1 legendary
  },
  "black_list_pokemon": [
    "mewtwo",                // But ban Mewtwo specifically
    "rayquaza"               // And Rayquaza
  ]
}
```

This allows 1 legendary EXCEPT Mewtwo and Rayquaza.

---

## Troubleshooting

### Items Not Being Banned

**Problem:** Player can still queue with a banned item.

**Solution:**
1. Verify item ID format:
   ```json5
   // ❌ Wrong
   "Bright Powder"
   "brightpowder"

   // ✅ Correct
   "cobblemon:bright_powder"
   ```

2. Enable debug logging:
   ```json5
   "debug_queue": true
   ```

3. Check server logs for:
   ```
   [Queue] Player has banned item: cobblemon:bright_powder
   ```

### Pokemon Not Being Banned

**Problem:** Player can queue with a banned Pokemon.

**Solution:**
1. Check spelling (case-insensitive but typos matter)
2. Verify label exists for the Pokemon
3. Check form syntax: `species:form`

### Label Limits Not Working

**Problem:** Player can use more restricted Pokemon than allowed.

**Solution:**
1. Verify label name matches Cobblemon's labels (lowercase)
2. Check if Pokemon has that label in Cobblemon's species data

---

<details>
<summary><strong>📝 Complete Configuration Example (Click to expand)</strong></summary>

```json5
{
  "blacklist": {
    // Ban Pokemon by label (legendary, mythical, etc.)
    "black_list_labels": [
      "mythical"
    ],

    // Ban specific Pokemon by name or form
    "black_list_pokemon": [
      "mewtwo",
      "rayquaza:mega"
    ],

    // Limit Pokemon with specific labels
    "restricted_label_limits": {
      "restricted": 2,      // Max 2 VGC restricted Pokemon
      "legendary": 1        // Max 1 legendary
    },

    // Ban specific moves
    "black_list_moves": [
      "baton_pass",
      "fissure",
      "sheer_cold"
    ],

    // Ban specific abilities
    "black_list_ability": [
      "moody",
      "shadow_tag"
    ],

    // Ban held items (use item IDs from F3+H)
    "black_list_items_pokemon": [
      "cobblemon:bright_powder",
      "cobblemon:lax_incense",
      "cobblemon:soul_dew"
    ]
  }
}
```

</details>

---

## Best Practices

1. **Use labels when possible** - Easier to maintain than individual lists
2. **Test after changes** - Run `/rankedadmin reload` and test with banned Pokemon
3. **Use item IDs (F3+H)** - Never use display names for items
4. **Document your ruleset** - Add comments explaining your choices

---

## See Also

- [Configuration Guide](config.md) - Full configuration reference
- [Matchmaking System](../features/matchmaking.md) - How queue system works
- [Battle Formats](../features/formats.md) - Singles vs Doubles
- [FAQ](../support/faq.md) - Common questions
