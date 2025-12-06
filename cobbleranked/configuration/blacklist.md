# Blacklist Configuration

Restrict Pokemon, moves, abilities, and held items in ranked battles.

---

## File Locations

**Format-Specific Configurations:**

| Format | File |
|--------|------|
| Singles (1v1) | `config/cobbleranked/blacklist/singles.json5` |
| Doubles (2v2) | `config/cobbleranked/blacklist/doubles.json5` |
| Triples (3v3) | `config/cobbleranked/blacklist/triples.json5` |
| Multi (2v2 Teams) | `config/cobbleranked/blacklist/multi.json5` |

Each format has independent blacklist rules!

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
<summary><strong>legendary</strong> - Legendary Pokemon (71 total)</summary>

Articuno, Zapdos, Moltres, Mewtwo, Raikou, Entei, Suicune, Lugia, Ho-Oh, Regirock, Regice, Registeel, Latias, Latios, Kyogre, Groudon, Rayquaza, Uxie, Mesprit, Azelf, Dialga, Palkia, Heatran, Regigigas, Giratina, Cresselia, Cobalion, Terrakion, Virizion, Tornadus, Thundurus, Reshiram, Zekrom, Landorus, Kyurem, Xerneas, Yveltal, Zygarde, Type: Null, Silvally, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Cosmog, Cosmoem, Solgaleo, Lunala, Necrozma, Zacian, Zamazenta, Eternatus, Kubfu, Urshifu, Regieleki, Regidrago, Glastrier, Spectrier, Calyrex, Enamorus, Wo-Chien, Chien-Pao, Ting-Lu, Chi-Yu, Koraidon, Miraidon, Okidogi, Munkidori, Fezandipiti, Ogerpon, Terapagos

</details>

<details>
<summary><strong>mythical</strong> - Mythical Pokemon (23 total)</summary>

Mew, Celebi, Jirachi, Deoxys, Phione, Manaphy, Darkrai, Shaymin, Arceus, Victini, Keldeo, Meloetta, Genesect, Diancie, Hoopa, Volcanion, Magearna, Marshadow, Zeraora, Meltan, Melmetal, Zarude, Pecharunt

</details>

<details>
<summary><strong>restricted</strong> - VGC restricted Pokemon (27 total)</summary>

Mewtwo, Lugia, Ho-Oh, Kyogre, Groudon, Rayquaza, Dialga, Palkia, Giratina, Reshiram, Zekrom, Kyurem, Xerneas, Yveltal, Zygarde, Cosmog, Cosmoem, Solgaleo, Lunala, Necrozma, Zacian, Zamazenta, Eternatus, Calyrex, Koraidon, Miraidon, Terapagos

</details>

<details>
<summary><strong>ultra_beast</strong> - Ultra Beasts (11 total)</summary>

Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Poipole, Naganadel, Stakataka, Blacephalon

</details>

<details>
<summary><strong>paradox</strong> - Paradox Pokemon (20 total)</summary>

Great Tusk, Scream Tail, Brute Bonnet, Flutter Mane, Slither Wing, Sandy Shocks, Iron Treads, Iron Bundle, Iron Hands, Iron Jugulis, Iron Moth, Iron Thorns, Roaring Moon, Iron Valiant, Walking Wake, Iron Leaves, Gouging Fire, Raging Bolt, Iron Boulder, Iron Crown

</details>

<details>
<summary><strong>starter</strong> - Starter Pokemon (all evolutions)</summary>

Bulbasaur, Ivysaur, Venusaur, Charmander, Charmeleon, Charizard, Squirtle, Wartortle, Blastoise, Chikorita, Bayleef, Meganium, Cyndaquil, Quilava, Typhlosion, Totodile, Croconaw, Feraligatr, Treecko, Grovyle, Sceptile, Torchic, Combusken, Blaziken, Mudkip, Marshtomp, Swampert, Turtwig, Grotle, Torterra, Chimchar, Monferno, Infernape, Piplup, Prinplup, Empoleon, Snivy, Servine, Serperior, Tepig, Pignite, Emboar, Oshawott, Dewott, Samurott, Chespin, Quilladin, Chesnaught, Fennekin, Braixen, Delphox, Froakie, Frogadier, Greninja, Rowlet, Dartrix, Decidueye, Litten, Torracat, Incineroar, Popplio, Brionne, Primarina, Grookey, Thwackey, Rillaboom, Scorbunny, Raboot, Cinderace, Sobble, Drizzile, Inteleon, Sprigatito, Floragato, Meowscarada, Fuecoco, Crocalor, Skeledirge, Quaxly, Quaxwell, Quaquaval

</details>

<details>
<summary><strong>Other Labels</strong></summary>

| Label | Description |
|-------|-------------|
| `fossil` | Fossil Pokemon (Omanyte, Kabuto, Aerodactyl, etc.) |
| `baby` | Baby Pokemon (Pichu, Cleffa, Igglybuff, etc.) |
| `powerhouse` | Pseudo-legendaries (Dragonite, Tyranitar, Garchomp, etc.) |
| `fakemon` | Custom/Fakemon from addon mods |
| `gen1` - `gen9` | All Pokemon from specific generation |
| `alolan_form` | Alolan regional forms |
| `galarian_form` | Galarian regional forms |
| `hisuian_form` | Hisuian regional forms |
| `paldean_form` | Paldean regional forms |

</details>

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

**Move Names:** Lowercase snake_case (spaces to underscores)

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
| Double Team | `double_team` | Evasion |
| Minimize | `minimize` | Evasion |
| Dark Void | `dark_void` | VGC ban (Gen 7+) |

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

**Item Format:** `namespace:item_name`

> 📝 **Note:** Supports item tags! Use `#namespace:tag_name` to ban all items with that tag.

```json5
{
  "black_list_items_pokemon": [
    "#cobblemon:held_items",      // Ban all held items with this tag
    "cobblemon:choice_band"       // Ban specific item
  ]
}
```

### Item Clause (Duplicate Items)

Control how many Pokemon can hold the same item:

```json5
{
  "max_duplicate_items": 1  // VGC Item Clause (no two Pokemon may hold same item)
}
```

| Value | Description |
|-------|-------------|
| `0` | Disabled (no restriction) |
| `1` | VGC/Smogon Item Clause (each item can only be held once) |
| `2` | Allow up to 2 Pokemon with same item |

---

## Inventory Restrictions

Ban items from player inventory during queue/battle (format-specific):

```json5
{
  "banned_inventory_items": [
    "mega_showdown:tera_orb",     // Ban Terastallization
    "mega_showdown:mega_bracelet", // Ban Mega Evolution
    "mega_showdown:dynamax_band",  // Ban Dynamax
    "mega_showdown:z_ring",        // Ban Z-Moves
    "mega_showdown:omni_ring"      // Ban all gimmicks
  ]
}
```

**Use Case:** Ban Tera Orb in Singles but allow in Doubles:
- `singles.json5`: `"banned_inventory_items": ["mega_showdown:tera_orb"]`
- `doubles.json5`: `"banned_inventory_items": []`

> 📝 **Note:** Supports item tags with `#namespace:tag_name` syntax.

---

## Healing Item Restrictions

Control healing item usage during battles.

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

### Selective Blocking

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

> 📝 **Note:** Supports item tags! Use `#cobblemon:healing_items` to ban all items with that tag.

### Item Categories

| Category | Block All Flag | Individual List |
|----------|---------------|-----------------|
| **Healing** | `block_all_healing_items` | `blocked_healing_items` |
| **Status Cure** | `block_status_healing_items` | `blocked_status_healing_items` |
| **Revival** | `block_revival_items` | `blocked_revival_items` |

---

## Special Formats

Enable special battle format rules:

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"  // none, baby_cup, little_cup, monotype, shiny_only, dex_range, nfe
  }
}
```

### Available Format Types

| Format | Description | Rules |
|--------|-------------|-------|
| `none` | Disabled | No special rules |
| `baby_cup` | Baby Cup | First-stage Pokemon that can evolve only |
| `little_cup` | Little Cup | First-stage Pokemon only (official format) |
| `monotype` | Monotype | All Pokemon must share a type |
| `shiny_only` | Shiny Only | All Pokemon must be shiny |
| `dex_range` | Dex Range | Pokemon within specified dex number range |
| `nfe` | NFE (Not Fully Evolved) | Pokemon that can still evolve |

### Dex Range Configuration

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "dex_range",
    "dex_range_min": 1,
    "dex_range_max": 151  // Only Gen 1 Pokemon
  }
}
```

<details>
<summary><strong>Format Rules Details</strong></summary>

### Baby Cup

- Must be first-stage (no pre-evolution)
- Must be able to evolve

**Valid:** Pichu, Bulbasaur, Charmander
**Invalid:** Pikachu (has pre-evolution), Ditto (cannot evolve)

### Little Cup (Official)

- Must be first-stage (no pre-evolution)
- Non-evolving Pokemon allowed

**Valid:** Pichu, Bulbasaur, Ditto
**Invalid:** Pikachu, Ivysaur, Raichu

### Monotype

- All Pokemon must share at least one type
- Dual-types can overlap (Fire/Flying + Fire/Fighting = Fire team)

### Shiny Only

- All Pokemon must be shiny variants

### NFE (Not Fully Evolved)

- Pokemon must be able to evolve
- Final evolutions are banned

**Valid:** Pikachu (can evolve to Raichu), Ivysaur
**Invalid:** Raichu (fully evolved), Venusaur

</details>

---

## Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `black_list_pokemon` | List | Banned Pokemon names/forms |
| `black_list_labels` | List | Banned category labels |
| `restricted_label_limits` | Map | Label quantity limits |
| `black_list_moves` | List | Banned moves |
| `black_list_ability` | List | Banned abilities |
| `black_list_items_pokemon` | List | Banned held items (supports tags) |
| `max_duplicate_items` | Number | Item clause limit (0 = disabled) |
| `banned_inventory_items` | List | Banned player inventory items |
| `special_format` | Object | Special format rules |
| `consumables` | Object | Healing item restrictions |

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
  ],

  "max_duplicate_items": 1  // Item Clause
}
```

**Also set in `config.json5`:** `levelMatch: 100`

### VGC Series

Official VGC format:

```json5
{
  "restricted_label_limits": {
    "restricted": 2  // Max 2 restricted Pokemon
  },
  "black_list_labels": ["mythical"],  // Mythicals not allowed
  "black_list_moves": [
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ],
  "max_duplicate_items": 1  // Item Clause
}
```

**Also set:** `levelMatch: 50`

### Little Cup

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  },
  "black_list_labels": ["legendary", "mythical"],
  "max_duplicate_items": 1
}
```

**Also set:** `levelMatch: 5`

### Casual (Minimal Bans)

Only ban unfair moves:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"],
  "max_duplicate_items": 0  // No Item Clause
}
```

</details>

---

<details>
<summary><strong>Validation Flow (Technical Details)</strong></summary>

## Validation Flow

When player joins queue:

```text
1. Check label blacklist
   ❌ FAIL: "Blacklisted Pokemon: Mewtwo (legendary)"

2. Check name/form blacklist
   ❌ FAIL: "Blacklisted Pokemon: Mewtwo"

3. Check label limits
   ❌ FAIL: "Too many legendary: 2/1"

4. Check duplicate species (species clause)
   ❌ FAIL: "Duplicate species: Pikachu"

5. Check moves
   ❌ FAIL: "Blacklisted move: Fissure"

6. Check abilities
   ❌ FAIL: "Blacklisted ability: Moody"

7. Check held items
   ❌ FAIL: "Blacklisted item: cobblemon:bright_powder"

8. Check duplicate items (item clause)
   ❌ FAIL: "Duplicate item: Choice Band (2/1)"

9. Check special format rules
   ❌ FAIL: "Not a first-stage Pokemon (Little Cup)"

✅ PASS: All pass → Join queue
```

</details>

---

## Pokemon Reference Lists

Complete lists extracted from Cobblemon 1.7.1 and MegaShowdown codebases for blacklist configuration.

<details>
<summary><strong>Legendary Pokemon by Generation (71 total)</strong></summary>

**Generation 1 (4):**
`articuno`, `zapdos`, `moltres`, `mewtwo`

**Generation 2 (6):**
`raikou`, `entei`, `suicune`, `lugia`, `hooh`, `celebi`

**Generation 3 (10):**
`regirock`, `regice`, `registeel`, `latias`, `latios`, `kyogre`, `groudon`, `rayquaza`

**Generation 4 (14):**
`uxie`, `mesprit`, `azelf`, `dialga`, `palkia`, `heatran`, `regigigas`, `giratina`, `cresselia`

**Generation 5 (13):**
`cobalion`, `terrakion`, `virizion`, `tornadus`, `thundurus`, `reshiram`, `zekrom`, `landorus`, `kyurem`

**Generation 6 (3):**
`xerneas`, `yveltal`, `zygarde`

**Generation 7 (11):**
`typenull`, `silvally`, `tapukoko`, `tapulele`, `tapubulu`, `tapufini`, `cosmog`, `cosmoem`, `solgaleo`, `lunala`, `necrozma`

**Generation 8 (11):**
`zacian`, `zamazenta`, `eternatus`, `kubfu`, `urshifu`, `regieleki`, `regidrago`, `glastrier`, `spectrier`, `calyrex`

**Generation 8a (Hisui) (1):**
`enamorus`

**Generation 9 (11):**
`wochien`, `chienpao`, `tinglu`, `chiyu`, `koraidon`, `miraidon`, `okidogi`, `munkidori`, `fezandipiti`, `ogerpon`, `terapagos`

</details>

<details>
<summary><strong>Mythical Pokemon by Generation (23 total)</strong></summary>

**Generation 1 (1):**
`mew`

**Generation 2 (1):**
`celebi`

**Generation 3 (2):**
`jirachi`, `deoxys`

**Generation 4 (5):**
`phione`, `manaphy`, `darkrai`, `shaymin`, `arceus`

**Generation 5 (4):**
`victini`, `keldeo`, `meloetta`, `genesect`

**Generation 6 (3):**
`diancie`, `hoopa`, `volcanion`

**Generation 7 (3):**
`magearna`, `marshadow`, `zeraora`

**Generation 7b (Let's Go) (2):**
`meltan`, `melmetal`

**Generation 8 (1):**
`zarude`

**Generation 9 (1):**
`pecharunt`

</details>

<details>
<summary><strong>Ultra Beasts (11 total)</strong></summary>

All from Generation 7:
`nihilego`, `buzzwole`, `pheromosa`, `xurkitree`, `celesteela`, `kartana`, `guzzlord`, `poipole`, `naganadel`, `stakataka`, `blacephalon`

</details>

<details>
<summary><strong>Restricted Pokemon - VGC (27 total)</strong></summary>

Box legendaries typically restricted in VGC formats:

`mewtwo`, `lugia`, `hooh`, `kyogre`, `groudon`, `rayquaza`, `dialga`, `palkia`, `giratina`, `reshiram`, `zekrom`, `kyurem`, `xerneas`, `yveltal`, `zygarde`, `cosmog`, `cosmoem`, `solgaleo`, `lunala`, `necrozma`, `zacian`, `zamazenta`, `eternatus`, `calyrex`, `koraidon`, `miraidon`, `terapagos`

</details>

<details>
<summary><strong>Paradox Pokemon (20 total)</strong></summary>

**Past Paradox (Ancient):**
`greattusk`, `screentail`, `brutebonnet`, `fluttermane`, `slitherwing`, `sandyshocks`, `roaringmoon`, `walkingwake`, `gougingfire`, `ragingbolt`

**Future Paradox (Futuristic):**
`irontreads`, `ironbundle`, `ironhands`, `ironjugulis`, `ironmoth`, `ironthorns`, `ironvaliant`, `ironleaves`, `ironboulder`, `ironcrown`

</details>

<details>
<summary><strong>Pseudo-Legendary Pokemon (powerhouse label)</strong></summary>

Pokemon with 600 base stat total and 3-stage evolution:

**Generation 1:** `dragonite`
**Generation 2:** `tyranitar`
**Generation 3:** `salamence`, `metagross`
**Generation 4:** `garchomp`
**Generation 5:** `hydreigon`
**Generation 6:** `goodra`
**Generation 7:** `kommo-o`
**Generation 8:** `dragapult`
**Generation 9:** `baxcalibur`

</details>

<details>
<summary><strong>Mega Evolution Pokemon (MegaShowdown - 48 forms)</strong></summary>

**Generation 1:**
`venusaur:mega`, `charizard:mega_x`, `charizard:mega_y`, `blastoise:mega`, `beedrill:mega`, `pidgeot:mega`, `alakazam:mega`, `slowbro:mega`, `gengar:mega`, `kangaskhan:mega`, `pinsir:mega`, `gyarados:mega`, `aerodactyl:mega`, `mewtwo:mega_x`, `mewtwo:mega_y`

**Generation 2:**
`ampharos:mega`, `steelix:mega`, `scizor:mega`, `heracross:mega`, `houndoom:mega`, `tyranitar:mega`

**Generation 3:**
`blaziken:mega`, `gardevoir:mega`, `mawile:mega`, `aggron:mega`, `medicham:mega`, `manectric:mega`, `sharpedo:mega`, `camerupt:mega`, `altaria:mega`, `banette:mega`, `absol:mega`, `glalie:mega`, `salamence:mega`, `metagross:mega`, `latias:mega`, `latios:mega`, `rayquaza:mega`, `sceptile:mega`, `swampert:mega`

**Generation 4:**
`lopunny:mega`, `garchomp:mega`, `lucario:mega`, `abomasnow:mega`, `gallade:mega`

**Generation 6:**
`diancie:mega`, `audino:mega`, `sableye:mega`

</details>

<details>
<summary><strong>Primal Reversion Pokemon (MegaShowdown)</strong></summary>

`kyogre:primal`, `groudon:primal`

</details>

<details>
<summary><strong>Fusion Forms (MegaShowdown)</strong></summary>

**Kyurem Fusions:**
`kyurem:white-fusion` (White Kyurem)
`kyurem:black-fusion` (Black Kyurem)

**Necrozma Fusions:**
`necrozma:dusk-mane` (Dusk Mane Necrozma)
`necrozma:dawn-wings` (Dawn Wings Necrozma)
`necrozma:ultra` (Ultra Necrozma)

**Calyrex Fusions:**
`calyrex:ice-rider` (Ice Rider Calyrex)
`calyrex:shadow-rider` (Shadow Rider Calyrex)

</details>

<details>
<summary><strong>Commonly Banned Combinations (Copy-Paste Ready)</strong></summary>

**Ban All Special Pokemon:**
```json5
{
  "black_list_labels": ["legendary", "mythical", "ultra_beast", "paradox"]
}
```

**Ban Only Box Legendaries:**
```json5
{
  "black_list_labels": ["restricted", "mythical"]
}
```

**Ban Mega Evolution Forms (with MegaShowdown):**
```json5
{
  "black_list_pokemon": [
    "rayquaza:mega",
    "mewtwo:mega_x",
    "mewtwo:mega_y",
    "gengar:mega",
    "kangaskhan:mega",
    "lucario:mega",
    "salamence:mega",
    "blaziken:mega"
  ]
}
```

**Ban Primal and Ultra Forms:**
```json5
{
  "black_list_pokemon": [
    "kyogre:primal",
    "groudon:primal",
    "necrozma:ultra"
  ]
}
```

**Ban Specific Fusion Forms:**
```json5
{
  "black_list_pokemon": [
    "kyurem:white-fusion",
    "kyurem:black-fusion",
    "calyrex:ice-rider",
    "calyrex:shadow-rider"
  ]
}
```

</details>

---

## See Also

- [Main Config](config.md) - Season, Elo settings
- [Battle Formats](../features/battle-formats.md) - Format details
- [Inventory Restrictions](../features/inventory-restrictions.md) - Player inventory rules
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
