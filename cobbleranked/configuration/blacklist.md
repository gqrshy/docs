# Blacklist & Restrictions

---
**CobbleRanked** > **Configuration** > **Blacklist**
---

Configure Pokemon, move, ability, item restrictions and control player actions during ranked matches.

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

## Pre-made Configurations

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

---

## Advanced Examples

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

## Troubleshooting

### Config Not Applying
- Run `/rankedadmin reload`
- Check JSON5 syntax (missing commas, brackets)

### Items Not Banned
- Use `cobblemon:item_name` format (not display name)
- Verify with `F3 + H`

### Pokemon Still Allowed
- Check spelling (case-insensitive but typos matter)
- Verify label exists for that Pokemon
- Check form syntax (`:mega` vs `:mega_x`)

### More Help
- [FAQ - Blacklist Section](../support/faq.md#blacklist-configuration)
- [Discord](https://discord.gg/VVVvBTqqyP) #feedback

---

---

## Player Restrictions

Control what players can do during different ranked match phases.

**Config File:** `config/cobbleranked/restrictions.json5`

### Configuration Structure

```json5
{
  "queue_phase": { /* Waiting for match */ },
  "preparation_phase": { /* Team selection, countdown */ },
  "battle_phase": { /* Active battle */ }
}
```

Each phase uses the same restriction categories below.

### Available Restrictions

#### Item Usage

```json5
"item_usage": {
  "allow_ender_pearl": false,           // Ender pearl teleportation
  "allow_chorus_fruit": false,          // Chorus fruit teleportation
  "allow_item_use": true,               // General item usage
  "allow_item_drop": true,              // Dropping items
  "allow_item_pickup": true,            // Picking up items
  "allow_consume_items": true,          // Eating/drinking
  "allow_throw_items": true             // Snowballs, eggs, potions
}
```

#### Block Interactions

```json5
"block_interactions": {
  "allow_break_blocks": false,          // Breaking blocks
  "allow_place_blocks": false,          // Placing blocks
  "allow_interact_blocks": true,        // Buttons, levers, doors
  "allow_open_containers": true,        // Chests, barrels
  "allow_use_doors": true,              // Doors, trapdoors, gates
  "allow_use_buttons": true,            // Buttons, levers
  "allow_use_redstone": true            // Redstone components
}
```

#### Entity Interactions

```json5
"entity_interactions": {
  "allow_damage_entities": false,       // Attacking mobs/players
  "allow_interact_entities": true,      // Right-clicking entities
  "allow_mount_entities": true,         // Riding horses, boats
  "allow_feed_pokemon": true,           // Feeding Pokemon
  "allow_heal_pokemon": true,           // Healing Pokemon
  "allow_trading": false,               // Villager trading
  "allow_breeding": false               // Animal breeding
}
```

#### Combat

```json5
"combat": {
  "allow_pvp": false,                   // Player vs Player
  "allow_pve": false,                   // Player vs Entity (mobs)
  "allow_projectiles": false,           // Bows, crossbows, tridents
  "allow_explosion_damage": true,       // Taking explosion damage
  "allow_fall_damage": true             // Taking fall damage
}
```

#### Movement

```json5
"movement": {
  "allow_teleport_commands": false,     // /tp, /warp, /home, etc.
  "allow_portals": true,                // Nether/End portals
  "allow_respawn": true,                // Respawning after death
  "allow_flight": true,                 // Creative/elytra flight
  "allow_swimming": true,               // Swimming
  "allow_riding": true                  // Riding entities
}
```

#### System Actions

```json5
"system_actions": {
  "allow_pc_access": false,             // Opening Pokemon PC
  "allow_commands": false,              // Running commands
  "allow_chat": true,                   // Sending chat messages
  "allow_disconnect": true,             // Disconnecting from server
  "blocked_commands": [                 // Specific blocked commands
    "tp", "warp", "home", "spawn"
  ]
}
```

#### Inventory

```json5
"inventory": {
  "allow_ender_chest": false,           // Ender chest access
  "allow_inventory_click": true,        // Clicking inventory slots
  "allow_inventory_drop": true,         // Dropping from inventory
  "allow_crafting": false,              // Crafting items
  "allow_shulker_boxes": false,         // Shulker box access
  "allow_armor_change": true,           // Changing armor
  "allow_offhand_swap": true            // Swapping offhand
}
```

### Default Behavior

**Queue Phase:**
- Normal gameplay allowed
- Teleport commands blocked
- PC access blocked

**Preparation Phase:**
- Movement allowed
- Combat blocked
- Block interactions blocked

**Battle Phase:**
- Only battle UI allowed
- All other actions blocked

### Common Restriction Examples

#### Allow Teleportation During Queue

```json5
"queue_phase": {
  "movement": {
    "allow_teleport_commands": true
  }
}
```

#### Allow PC Access in Battle

```json5
"battle_phase": {
  "system_actions": {
    "allow_pc_access": true
  }
}
```

#### Block Specific Commands

```json5
"queue_phase": {
  "system_actions": {
    "allow_commands": false,
    "blocked_commands": ["tp", "warp", "home", "spawn", "tpa"]
  }
}
```

---

## Next Steps

### For Competitive Formats
1. **[Smogon OU Format](../features/ranked-battles.md)** - Apply standard competitive rules
2. **[VGC Format](../features/ranked-battles.md)** - Configure official tournament rules
3. **[Custom Formats](#pre-made-configurations)** - Use provided presets

### For Advanced Restrictions
1. **[Label Limits](#quantity-limits)** - Allow limited legendaries (VGC-style)
2. **[Form-Specific Bans](#ban-specific-pokemon)** - Ban only Mega/Regional forms
3. **[Player Restrictions](blacklist.md#player-restrictions)** - Control actions during battles

### For Testing
1. **[Quick Start Validation](../getting-started/quick-start.md#step-2-configure-pokemon-restrictions)** - Test your blacklist
2. **[Troubleshooting](../support/faq.md#blacklist-configuration)** - Common blacklist issues
3. **[Battle Flow](../features/ranked-battles.md#pre-battle-validation)** - Understanding validation

---

## Related Pages
- [Main Config](config.md) - Battle clauses and Elo settings
- [Battle Formats](../features/ranked-battles.md) - Format-specific rules
- [Commands Reference](../getting-started/commands.md) - Admin reload commands
