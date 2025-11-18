# Blacklist Configuration

Restrict Pokemon, moves, abilities, and held items in ranked battles.

**Config File:** `config/cobbleranked/blacklist.json5`

---

## Quick Start

### Minimal Example

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Reload:** `/rankedadmin reload`

**Effect:** Bans all legendaries/mythicals + OHKO moves

---

## Pokemon Restrictions

### Ban by Label (Recommended)

Most efficient way to ban multiple Pokemon:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**Available Labels:**

| Label | Count | Examples |
|-------|-------|----------|
| `legendary` | ~60 | Mewtwo, Lugia, Rayquaza, Dialga |
| `mythical` | ~20 | Mew, Celebi, Jirachi, Victini |
| `restricted` | ~40 | Box legendaries (VGC restricted) |
| `ultra_beast` | 11 | Nihilego, Buzzwole, Xurkitree |
| `paradox` | 16 | Iron Treads, Great Tusk, Flutter Mane |
| `starter` | ~30 | Bulbasaur line, Charmander line, etc. |
| `fossil` | ~15 | Omanyte, Kabuto, Aerodactyl |
| `baby` | ~20 | Pichu, Cleffa, Igglybuff |
| `powerhouse` | ~12 | 600 BST Pokemon (Dragonite, Garchomp) |
| `gen1` - `gen9` | Varies | Filter by generation |

> **[📸 INSERT: Screenshot showing validation error when trying to use banned legendary]**

### Quantity Limits

Allow limited quantities instead of complete bans:

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // Max 1 legendary per team
    "restricted": 2,     // Max 2 restricted (VGC format)
    "powerhouse": 3      // Max 3 pseudo-legendaries
  }
}
```

**Example:** VGC Series 1 format (2 restricted Pokemon allowed)

### Ban Specific Pokemon

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // All forms banned
    "rayquaza:mega",     // Only Mega Rayquaza
    "charizard:mega_x",  // Only Mega Charizard X
    "weezing:galar"      // Only Galarian Weezing
  ]
}
```

**Form Syntax:**
- No form (`mewtwo`) = **All forms** banned
- With form (`mewtwo:mega_x`) = **Only that form** banned

**Common Forms:**
- Mega: `:mega`, `:mega_x`, `:mega_y`
- Regional: `:alola`, `:galar`, `:hisui`
- Other: `:primal`, `:origin`, `:10` (Zygarde 10%)

---

## Move Restrictions

### Ban Moves

```json5
{
  "black_list_moves": [
    // OHKO moves
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine",

    // Smogon bans
    "baton_pass",        // Speed Boost passing
    "last_respects",     // Gen 9 OP move
    "shed_tail"          // Gen 9 OP move
  ]
}
```

> **[📸 IMAGE NEEDED: 禁止技（Fissure、Baton Passなど）使用時のエラーメッセージ画面]**

**Move Names:** Lowercase snake_case (spaces → underscores)

<details>
<summary><strong>Common Banned Moves Reference</strong></summary>

| Display Name | Internal Name | Reason |
|--------------|---------------|--------|
| Fissure | `fissure` | OHKO |
| Sheer Cold | `sheer_cold` | OHKO |
| Horn Drill | `horn_drill` | OHKO |
| Guillotine | `guillotine` | OHKO |
| Baton Pass | `baton_pass` | Smogon OU ban |
| Last Respects | `last_respects` | Smogon Gen 9 ban |
| Shed Tail | `shed_tail` | Smogon Gen 9 ban |
| Double Team | `double_team` | Evasion (if evasion_clause: false) |
| Minimize | `minimize` | Evasion (if evasion_clause: false) |

</details>

---

## Ability Restrictions

### Ban Abilities

```json5
{
  "black_list_ability": [
    "moody",             // Random stat boosts (Smogon ban)
    "shadow_tag",        // Prevents switching (Smogon ban)
    "arena_trap"         // Traps grounded Pokemon (Smogon ban)
  ]
}
```

**Ability Names:** Lowercase snake_case

<details>
<summary><strong>Commonly Banned Abilities</strong></summary>

| Display Name | Internal Name | Reason |
|--------------|---------------|--------|
| Moody | `moody` | Smogon OU (random +2/-1 stats) |
| Shadow Tag | `shadow_tag` | Smogon OU (trapping) |
| Arena Trap | `arena_trap` | Smogon OU (trapping) |
| Power Construct | `power_construct` | Zygarde transformation |
| Huge Power | `huge_power` | Doubles Attack (balance choice) |
| Wonder Guard | `wonder_guard` | Only super-effective hits |

</details>

**Find Ability Names:**
1. Press `F3 + H` in-game
2. Open Pokemon summary
3. Hover over ability icon
4. Internal name shown in tooltip

---

## Item Restrictions

### Ban Held Items

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // +10% evasion
    "cobblemon:lax_incense",      // +10% evasion
    "cobblemon:quick_claw",       // 20% priority
    "cobblemon:soul_dew"          // Latios/Latias boost
  ]
}
```

**Item Format:** `cobblemon:item_name` (required!)

**Find Item IDs:**
1. Press `F3 + H`
2. Hover over item in inventory
3. ID appears at bottom of tooltip

> **[📸 INSERT: Screenshot showing F3+H tooltip with item ID]**

<details>
<summary><strong>Commonly Banned Items</strong></summary>

| Item | ID | Reason |
|------|-----|--------|
| Bright Powder | `cobblemon:bright_powder` | Evasion boost |
| Lax Incense | `cobblemon:lax_incense` | Evasion boost |
| Quick Claw | `cobblemon:quick_claw` | RNG priority |
| Soul Dew | `cobblemon:soul_dew` | Lati@s specific boost |
| King's Rock | `cobblemon:kings_rock` | Flinch chance |

</details>

---

<details>
<summary><strong>Pre-made Configurations</strong></summary>

### Smogon OU

Competitive standard format:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": [
    "baton_pass", "last_respects", "shed_tail",
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

**Also set:** `levelMatch: 50` in `config.json5`

### VGC Series 1

Official VGC format:

```json5
{
  "restricted_label_limits": {
    "restricted": 2  // Max 2 restricted Pokemon
  },
  "black_list_labels": ["mythical"],  // Mythicals not allowed
  "black_list_moves": [
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ]
}
```

**Also set:** `item_clause: true` + `levelMatch: 50`

### Casual (Minimal Bans)

Only ban unfair moves:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

</details>

---

<details>
<summary><strong>Advanced Examples</strong></summary>

### Mix Limits + Bans

Allow 1 legendary, but ban specific ones:

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // Max 1 legendary
  },
  "black_list_pokemon": [
    "mewtwo",            // Exception: Mewtwo always banned
    "rayquaza"           // Exception: Rayquaza always banned
  ]
}
```

**Result:** Can use 1 legendary (Lugia, Dialga, etc.) but NOT Mewtwo or Rayquaza

### Generation Filter

Ban Gen 9 Pokemon only:

```json5
{
  "black_list_labels": ["gen9", "paradox"]
}
```

### Monotype Support

No additional config needed - players manage teams manually

Recommended blacklist:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["baton_pass"]
}
```

</details>

---

## Validation Flow

When player joins queue:

```
1. Check label blacklist
   ❌ "Blacklisted Pokemon: Mewtwo (legendary)"

2. Check name/form blacklist
   ❌ "Blacklisted Pokemon: Mewtwo"

3. Check label limits
   ❌ "Too many legendary: 2/1"

4. Check moves
   ❌ "Blacklisted move: Fissure"

5. Check abilities
   ❌ "Blacklisted ability: Moody"

6. Check held items
   ❌ "Blacklisted item: cobblemon:bright_powder"

✅ All pass → Join queue
```

> **[📸 INSERT: Screenshot of validation error message]**

---

**Related:**
- [Main Config](config.md) - Season, Elo, clauses
- [Battle Formats](../features/battle-formats.md) - Format details
- [Commands](../getting-started/commands.md) - `/rankedadmin` reference
