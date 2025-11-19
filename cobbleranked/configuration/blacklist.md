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
  - ✅ LEGAL: Landorus-T, Heatran, Tapu Koko, Raging Bolt, Iron Valiant, etc.
  - ❌ BANNED: Mewtwo, Zacian, Calyrex, Koraidon, Miraidon, etc.
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
