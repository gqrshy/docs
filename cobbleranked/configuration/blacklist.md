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

<details>
<summary><strong>legendary</strong> - Major legendary Pokemon</summary>

Articuno, Zapdos, Moltres, Mewtwo, Raikou, Entei, Suicune, Lugia, Ho-Oh, Regirock, Regice, Registeel, Latias, Latios, Kyogre, Groudon, Rayquaza, Uxie, Mesprit, Azelf, Dialga, Palkia, Heatran, Regigigas, Giratina, Cresselia, Cobalion, Terrakion, Virizion, Tornadus, Thundurus, Reshiram, Zekrom, Landorus, Kyurem, Xerneas, Yveltal, Zygarde, Type: Null, Silvally, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Cosmog, Cosmoem, Solgaleo, Lunala, Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Necrozma, Zacian, Zamazenta, Eternatus, Kubfu, Urshifu, Regieleki, Regidrago, Glastrier, Spectrier, Calyrex, Enamorus, Wo-Chien, Chien-Pao, Ting-Lu, Chi-Yu, Koraidon, Miraidon, Walking Wake, Iron Leaves, Okidogi, Munkidori, Fezandipiti, Ogerpon, Terapagos, Pecharunt

</details>

<details>
<summary><strong>mythical</strong> - Mythical Pokemon (event-exclusive)</summary>

Mew, Celebi, Jirachi, Deoxys, Phione, Manaphy, Darkrai, Shaymin, Arceus, Victini, Keldeo, Meloetta, Genesect, Diancie, Hoopa, Volcanion, Magearna, Marshadow, Zeraora, Meltan, Melmetal, Zarude

</details>

<details>
<summary><strong>restricted</strong> - VGC restricted Pokemon (box legendaries)</summary>

Mewtwo, Lugia, Ho-Oh, Kyogre, Groudon, Rayquaza, Dialga, Palkia, Giratina, Reshiram, Zekrom, Kyurem, Xerneas, Yveltal, Zygarde, Cosmog, Cosmoem, Solgaleo, Lunala, Necrozma, Zacian, Zamazenta, Eternatus, Calyrex, Koraidon, Miraidon, Terapagos

</details>

<details>
<summary><strong>ultra_beast</strong> - Ultra Beasts from Gen 7</summary>

Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Poipole, Naganadel, Stakataka, Blacephalon

</details>

<details>
<summary><strong>paradox</strong> - Paradox Pokemon from Scarlet/Violet</summary>

Great Tusk, Scream Tail, Brute Bonnet, Flutter Mane, Slither Wing, Sandy Shocks, Iron Treads, Iron Bundle, Iron Hands, Iron Jugulis, Iron Moth, Iron Thorns, Roaring Moon, Iron Valiant, Walking Wake, Iron Leaves, Gouging Fire, Raging Bolt, Iron Boulder, Iron Crown

</details>

<details>
<summary><strong>starter</strong> - Starter Pokemon (all evolutions)</summary>

Bulbasaur, Ivysaur, Venusaur, Charmander, Charmeleon, Charizard, Squirtle, Wartortle, Blastoise, Chikorita, Bayleef, Meganium, Cyndaquil, Quilava, Typhlosion, Totodile, Croconaw, Feraligatr, Treecko, Grovyle, Sceptile, Torchic, Combusken, Blaziken, Mudkip, Marshtomp, Swampert, Turtwig, Grotle, Torterra, Chimchar, Monferno, Infernape, Piplup, Prinplup, Empoleon, Snivy, Servine, Serperior, Tepig, Pignite, Emboar, Oshawott, Dewott, Samurott, Chespin, Quilladin, Chesnaught, Fennekin, Braixen, Delphox, Froakie, Frogadier, Greninja, Rowlet, Dartrix, Decidueye, Litten, Torracat, Incineroar, Popplio, Brionne, Primarina, Grookey, Thwackey, Rillaboom, Scorbunny, Raboot, Cinderace, Sobble, Drizzile, Inteleon, Sprigatito, Floragato, Meowscarada, Fuecoco, Crocalor, Skeledirge, Quaxly, Quaxwell, Quaquaval

</details>

<details>
<summary><strong>fossil</strong> - Fossil Pokemon</summary>

Omanyte, Omastar, Kabuto, Kabutops, Aerodactyl, Lileep, Cradily, Anorith, Armaldo, Cranidos, Rampardos, Shieldon, Bastiodon, Tirtouga, Carracosta, Archen, Archeops, Tyrunt, Tyrantrum, Amaura, Aurorus, Dracozolt, Arctozolt, Dracovish, Arctovish

</details>

<details>
<summary><strong>baby</strong> - Baby Pokemon</summary>

Pichu, Cleffa, Igglybuff, Togepi, Tyrogue, Smoochum, Elekid, Magby, Azurill, Wynaut, Budew, Chingling, Bonsly, Mime Jr., Happiny, Munchlax, Riolu, Mantyke, Toxel

</details>

<details>
<summary><strong>powerhouse</strong> - 600 BST Pokemon (pseudo-legendaries)</summary>

Dragonite, Tyranitar, Salamence, Metagross, Garchomp, Hydreigon, Goodra, Kommo-o, Dragapult, Baxcalibur

</details>

**Note:** `gen1` through `gen9` labels contain all Pokemon from their respective generations and are too numerous to list here.

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
    "weezing:galarian"   // Only Galarian Weezing
  ]
}
```

<details>
<summary><strong>Form Syntax Reference</strong></summary>

**Form Syntax:**
- No form (`mewtwo`) = **All forms** banned
- With form (`kyurem:white-fusion`) = **Only that form** banned

**Supported syntax:**
- **Aspect names** (recommended): `kyurem:white-fusion`, `charizard:mega_x`, `weezing:galarian`
- **Form names** (also works): `kyurem:White`, `charizard:Mega-X`, `weezing:Galar`

Both syntaxes work! Use aspect names for consistency with game data.

**Common Forms:**

| Pokemon | Aspect Name | Form Name | Example |
|---------|------------|-----------|---------|
| Mega Rayquaza | `:mega` | `:Mega` | `rayquaza:mega` |
| Mega Charizard X | `:mega_x` | `:Mega-X` | `charizard:mega_x` |
| Mega Charizard Y | `:mega_y` | `:Mega-Y` | `charizard:mega_y` |
| White Kyurem | `:white-fusion` | `:White` | `kyurem:white-fusion` |
| Black Kyurem | `:black-fusion` | `:Black` | `kyurem:black-fusion` |
| Galarian Weezing | `:galarian` | `:Galar` | `weezing:galarian` |
| Alolan Raichu | `:alolan` | `:Alola` | `raichu:alolan` |
| Hisuian Typhlosion | `:hisuian` | `:Hisui` | `typhlosion:hisuian` |
| Primal Kyogre | `:primal` | `:Primal` | `kyogre:primal` |
| Origin Giratina | `:origin` | `:Origin` | `giratina:origin` |
| Zygarde 10% | `:10` | `:10` | `zygarde:10` |

**MegaShowdown Compatibility:**

If using MegaShowdown mod, the aspect-based syntax is fully supported:
```json5
{
  "black_list_pokemon": [
    "kyurem:white-fusion",   // White Kyurem (MegaShowdown)
    "kyurem:black-fusion",   // Black Kyurem (MegaShowdown)
    "rayquaza:mega"          // Mega Rayquaza (MegaShowdown)
  ]
}
```

</details>

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

<details>
<summary><strong>How to Find Ability Names</strong></summary>

1. Press `F3 + H` in-game
2. Open Pokemon summary
3. Hover over ability icon
4. Internal name shown in tooltip

</details>

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

<details>
<summary><strong>How to Find Item IDs</strong></summary>

1. Press `F3 + H`
2. Hover over item in inventory
3. ID appears at bottom of tooltip

</details>

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

## Healing Item Restrictions

Control healing item usage during battles (added in v1.0.7+).

### Configuration Location

**Per-Format Config Files:**
- `config/cobbleranked/blacklist/singles.json5`
- `config/cobbleranked/blacklist/doubles.json5`
- `config/cobbleranked/blacklist/triples.json5`
- `config/cobbleranked/blacklist/multi.json5`

Each format has independent healing item restrictions!

### Basic Example

```json5
{
  "consumables": {
    // Block ALL healing items (recommended for competitive)
    "block_all_healing_items": true,

    // Block ALL status cure items
    "block_status_healing_items": true,

    // Block ALL revival items
    "block_revival_items": true
  }
}
```

**Result:** Players cannot use Potions, Full Restores, Revives, Antidotes, etc. during battle

### Advanced Example (Selective Blocking)

```json5
{
  "consumables": {
    // Allow healing items, but block specific ones
    "block_all_healing_items": false,
    "blocked_healing_items": [
      "cobblemon:max_potion",
      "cobblemon:full_restore"
    ],

    // Allow status cures
    "block_status_healing_items": false,
    "blocked_status_healing_items": [],

    // Block all revival items
    "block_revival_items": true,
    "blocked_revival_items": [
      "cobblemon:revive",
      "cobblemon:max_revive"
    ]
  }
}
```

**Result:** Players can use Potions/Super Potions/Hyper Potions, but NOT Max Potions or Full Restores

### Item Categories

| Category | Block All Flag | Individual List | Common Items |
|----------|---------------|-----------------|--------------|
| **Healing** | `block_all_healing_items` | `blocked_healing_items` | Potion, Super Potion, Hyper Potion, Max Potion, Full Restore |
| **Status Cure** | `block_status_healing_items` | `blocked_status_healing_items` | Antidote, Paralyze Heal, Awakening, Burn Heal, Ice Heal, Full Heal |
| **Revival** | `block_revival_items` | `blocked_revival_items` | Revive, Max Revive |

### Configuration Modes

**Mode 1: Block All (Recommended for Competitive)**
```json5
{
  "block_all_healing_items": true,
  "blocked_healing_items": []  // Ignored when block_all = true
}
```

**Mode 2: Selective Blocking (Casual/Custom Rules)**
```json5
{
  "block_all_healing_items": false,
  "blocked_healing_items": [
    "cobblemon:max_potion",
    "cobblemon:full_restore"
  ]
}
```

### Per-Format Examples

**Singles (Competitive):** No items allowed
```json5
// config/cobbleranked/blacklist/singles.json5
{
  "consumables": {
    "block_all_healing_items": true,
    "block_status_healing_items": true,
    "block_revival_items": true
  }
}
```

**Doubles (VGC-Style):** No items allowed
```json5
// config/cobbleranked/blacklist/doubles.json5
{
  "consumables": {
    "block_all_healing_items": true,
    "block_status_healing_items": true,
    "block_revival_items": true
  }
}
```

**Casual Format:** Allow basic items only
```json5
// config/cobbleranked/blacklist/casual.json5
{
  "consumables": {
    "block_all_healing_items": false,
    "blocked_healing_items": [
      "cobblemon:max_potion",
      "cobblemon:full_restore"
    ],

    "block_status_healing_items": false,
    "blocked_status_healing_items": [
      "cobblemon:full_heal"
    ],

    "block_revival_items": true  // No revives
  }
}
```

### Finding Item IDs

1. **Press F3+H** (advanced tooltips)
2. **Hover over item** in inventory
3. **Check tooltip** for ID (e.g., `cobblemon:potion`)
4. **Add to list** with full namespace: `"cobblemon:potion"`

### Default Values

All blacklist files ship with competitive defaults:

```json5
{
  "consumables": {
    "block_all_healing_items": true,
    "blocked_healing_items": [
      "cobblemon:potion",
      "cobblemon:super_potion",
      "cobblemon:hyper_potion",
      "cobblemon:max_potion",
      "cobblemon:full_restore"
    ],

    "block_status_healing_items": true,
    "blocked_status_healing_items": [
      "cobblemon:antidote",
      "cobblemon:paralyze_heal",
      "cobblemon:awakening",
      "cobblemon:burn_heal",
      "cobblemon:ice_heal",
      "cobblemon:full_heal"
    ],

    "block_revival_items": true,
    "blocked_revival_items": [
      "cobblemon:revive",
      "cobblemon:max_revive"
    ]
  }
}
```

**To allow ALL items:** Set all `block_all_*` flags to `false` and clear the lists

### Technical Details

**When are items blocked?**
- During queue (team validation)
- During match preparation (ready screen)
- During battle (item usage listener)

**What happens when player tries to use blocked item?**
1. Item usage is cancelled
2. Player receives error message
3. Item remains in inventory (not consumed)
4. Battle continues normally

**Log output:**
```
[ItemUsageListener] ✅ BLOCKED healing item usage on Pikachu
(owned by GASHI) during COMPETITIVE SINGLES battle
```

---

<details>
<summary><strong>Pre-made Configurations</strong></summary>

### Smogon OU

Competitive standard format (Singles 6v6 at Level 100):

```json5
{
  // Ban only Ubers-tier Pokemon (restricted legendaries)
  // NOTE: Ultra Beasts, Paradox Pokemon, and some legendaries (Landorus-T, Heatran, etc.) are LEGAL in OU
  "black_list_labels": ["restricted"],  // Ubers only (Mewtwo, Zacian, Calyrex, etc.)

  "black_list_pokemon": [
    // Additional Ubers bans not covered by "restricted" label
    "blaziken",          // Speed Boost Blaziken is Ubers
    "flutter_mane",      // Paradox Pokemon banned in OU
    "chi_yu",            // Ruinous Pokemon banned
    "annihilape"         // Banned in Gen 9 OU
  ],

  "black_list_moves": [
    // OHKO moves
    "fissure", "sheer_cold", "horn_drill", "guillotine",

    // Smogon OU banned moves
    "baton_pass",        // Banned when passing stat boosts
    "last_respects",     // Gen 9 OU ban
    "shed_tail"          // Gen 9 OU ban
  ],

  "black_list_ability": [
    "moody",             // Random stat boosts (Smogon OU ban)
    "shadow_tag",        // Prevents switching (Smogon OU ban)
    "arena_trap"         // Traps grounded Pokemon (Smogon OU ban)
  ],

  "black_list_items_pokemon": [
    "cobblemon:bright_powder",  // Evasion boost
    "cobblemon:lax_incense"     // Evasion boost
  ]
}
```

**Also set in `config.json5`:**
- `levelMatch: 100` (Smogon uses Level 100, not 50!)
- `species_clause: true`
- `sleep_clause: true`
- `evasion_clause: true`
- `ohko_clause: true`

**Important Notes:**
- **Level 100:** Smogon OU uses Level 100 (Showdown's default), NOT Level 50
- **Legendaries:** NOT all legendaries are banned! Only Ubers-tier (restricted label)
  - **LEGAL:** Landorus-T, Heatran, Tapu Koko, Raging Bolt, Iron Valiant, etc.
  - **BANNED:** Mewtwo, Zacian, Calyrex, Koraidon, Miraidon, etc.
- **Ultra Beasts:** Most are LEGAL (Kartana, Celesteela, etc.)
- **Paradox Pokemon:** Most are LEGAL (Iron Hands, Great Tusk, etc.), but some banned individually

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

<details>
<summary><strong>Validation Flow (Technical Details)</strong></summary>

## Validation Flow

When player joins queue:

```
1. Check label blacklist
   FAIL: "Blacklisted Pokemon: Mewtwo (legendary)"

2. Check name/form blacklist
   FAIL: "Blacklisted Pokemon: Mewtwo"

3. Check label limits
   FAIL: "Too many legendary: 2/1"

4. Check moves
   FAIL: "Blacklisted move: Fissure"

5. Check abilities
   FAIL: "Blacklisted ability: Moody"

6. Check held items
   FAIL: "Blacklisted item: cobblemon:bright_powder"

PASS: All pass → Join queue
```

</details>

---

## See Also

- [Main Config](config.md) - Season, Elo, clauses
- [Battle Formats](../features/battle-formats.md) - Format details
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
