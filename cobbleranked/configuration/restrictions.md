# Player Restrictions Configuration

Complete reference for `config/cobbleranked/restrictions.json5`.

The restriction system controls what actions players can perform during different ranked match states (queue, match preparation, and active battles). This system provides fine-grained control over player behavior to ensure fair competitive matches.

---

## File Location

`config/cobbleranked/restrictions.json5`

> **Note:** This is a separate file from the main `config.json5` for better organization.

---

## Quick Reference

| Category | Flags | Purpose |
|----------|-------|---------|
| [Item Flags](#item-flags) | 11 flags | Control item usage, drops, and special items |
| [Block Flags](#block-flags) | 9 flags | Control block interactions, containers, and redstone |
| [Entity Flags](#entity-flags) | 8 flags | Control entity interactions, trading, and breeding |
| [Combat Flags](#combat-flags) | 5 flags | Control PvP, PvE, and projectiles |
| [Movement Flags](#movement-flags) | 6 flags | Control teleportation, portals, and flight |
| [System Flags](#system-flags) | 5 flags | Control PC access, commands, and chat |
| [Inventory Flags](#inventory-flags) | 7 flags | Control inventory access and item movement |

**Total:** 51 configurable flags across 3 game states

---

## Configuration Format

Each flag is a **boolean** value:
- `true` = **DENY** (block the action)
- `false` = **INHERIT** (allow the action)

**Example:**
```json5
{
  "queue": {
    "movement": {
      "teleport": true,        // Block teleportation
      "respawn": false,        // Allow respawning
      "ender_pearl": false     // Allow ender pearls
    }
  }
}
```

> **Messages:** All error messages are managed in language files (`ja-Jp.json5`, `en-Us.json5`, etc.), not in the config file.

---

## Game States

The restriction system has three independent profiles:

### 1. Queue State
**When:** Player is waiting for a match in the matchmaking queue

**Default Restrictions:**
- ✅ Block PC access (prevents team changes)
- ✅ Block teleport commands (prevents queue dodging)
- ✅ Block `/pc` command
- ❌ Allow normal gameplay (building, farming, etc.)

### 2. Match Preparation State
**When:** Match found → ReadyGUI appears → 5-second countdown

**Default Restrictions:**
- ✅ Queue restrictions +
- ✅ Block ender chests, shulker boxes (prevents team swapping)
- ❌ Allow normal gameplay

### 3. Battle State
**When:** Player is actively in a ranked Pokémon battle

**Default Restrictions:**
- ✅ Block ALL item usage (including ender pearls, chorus fruit)
- ✅ Block ALL block interactions
- ✅ Block ALL entity interactions (except battle mechanics)
- ✅ Block PvP and PvE combat
- ✅ Block inventory access
- ❌ Allow chat for communication

---

## Item Flags

Control what items players can use.

```json5
{
  "queue": {
    "item": {
      "use": false,                  // General item usage
      "drop": false,                 // Dropping items (Q key)
      "pickup": false,               // Picking up items from ground
      "consume_food": false,         // Eating food
      "use_potion": false,           // Drinking potions
      "use_tool": false,             // Using tools (pickaxe, axe, etc.)
      "change_armor": false,         // Equipping/removing armor
      "use_bucket": false,           // Using buckets (water, lava, milk)
      "use_flint_and_steel": false,  // Starting fires
      "use_ender_pearl": false,      // Throwing ender pearls (teleportation)
      "use_chorus_fruit": false      // Eating chorus fruit (teleportation)
    }
  }
}
```

### Flag Details

| Flag | Blocks | Critical? |
|------|--------|-----------|
| `use` | All right-click item actions | |
| `drop` | Q key, dropping from inventory | |
| `pickup` | Collecting items from ground | |
| `consume_food` | Eating food items | |
| `use_potion` | Drinking potions | |
| `use_tool` | Tool usage (dig, chop, etc.) | |
| `change_armor` | Armor equip/unequip | |
| `use_bucket` | Bucket fill/empty | |
| `use_flint_and_steel` | Fire starting | |
| `use_ender_pearl` | **Ender pearl throwing** | **⚠️ YES - Arena escape** |
| `use_chorus_fruit` | **Chorus fruit eating** | **⚠️ YES - Teleport escape** |

> **Critical:** Set `use_ender_pearl` and `use_chorus_fruit` to `true` during battles to prevent arena escapes!

### Example: Block Teleportation Items

```json5
{
  "battle": {
    "item": {
      "use_ender_pearl": true,   // Block ender pearls
      "use_chorus_fruit": true   // Block chorus fruit
    }
  }
}
```

---

## Block Flags

Control block interactions.

```json5
{
  "queue": {
    "block": {
      "break": false,           // Breaking blocks
      "place": false,           // Placing blocks
      "interact": false,        // Right-clicking blocks
      "door_interact": false,   // Opening/closing doors
      "container_access": false, // Chests, furnaces, hoppers
      "button_press": false,    // Pressing buttons
      "lever_use": false,       // Flipping levers
      "crop_trample": false,    // Jumping on farmland
      "pressure_plate": false   // Stepping on pressure plates
    }
  }
}
```

### Example: Block All Building

```json5
{
  "battle": {
    "block": {
      "break": true,   // Block breaking
      "place": true    // Block placing
    }
  }
}
```

---

## Entity Flags

Control entity interactions.

```json5
{
  "queue": {
    "entity": {
      "interact": false,        // Right-clicking entities
      "damage": false,          // Attacking entities (non-player)
      "mount": false,           // Mounting horses, boats, etc.
      "villager_trade": false,  // Trading with villagers
      "animal_breeding": false, // Breeding animals
      "pet_interact": false,    // Interacting with pets
      "npc_interact": false,    // Interacting with NPCs
      "leash_entity": false     // Using leads on entities
    }
  }
}
```

---

## Combat Flags

Control combat actions.

```json5
{
  "queue": {
    "combat": {
      "pvp": false,              // Player vs Player combat
      "pve": false,              // Player vs Entity combat
      "projectile_launch": false, // Shooting arrows, throwing items
      "explosion_damage": false,  // TNT, creeper explosions
      "fire_damage": false        // Fire, lava damage
    }
  }
}
```

> **Note:** During battles, `pvp` and `pve` should be `true` to prevent interference with the Pokémon battle system.

### Example: Block All Combat

```json5
{
  "battle": {
    "combat": {
      "pvp": true,   // Block PvP
      "pve": true    // Block PvE
    }
  }
}
```

---

## Movement Flags

Control player movement and teleportation.

```json5
{
  "queue": {
    "movement": {
      "teleport": true,        // Command teleportation (/tp, /home)
      "respawn": false,        // Respawning after death
      "portal_use": false,     // Nether/End portal entry
      "flight": false,         // Creative/spectator flight
      "ender_pearl": false,    // Ender pearl teleportation
      "chorus_fruit": false    // Chorus fruit teleportation
    }
  }
}
```

### Flag Details

| Flag | Blocks | Critical? |
|------|--------|-----------|
| `teleport` | **/tp, /home, /spawn commands** | **⚠️ YES - Queue dodging** |
| `respawn` | Respawning after death | |
| `portal_use` | Nether/End portal entry | |
| `flight` | Flying (creative/spectator mode) | |
| `ender_pearl` | **Ender pearl teleportation** | **⚠️ YES - Arena escape** |
| `chorus_fruit` | **Chorus fruit teleportation** | **⚠️ YES - Arena escape** |

> **Critical:** Set `teleport`, `ender_pearl`, and `chorus_fruit` to `true` during queue/preparation/battles!

### Example: Block All Teleportation

```json5
{
  "queue": {
    "movement": {
      "teleport": true,       // Block commands
      "ender_pearl": true,    // Block ender pearls
      "chorus_fruit": true    // Block chorus fruit
    }
  }
}
```

---

## System Flags

Control system-level actions.

```json5
{
  "queue": {
    "system": {
      "pc_access": true,         // Cobblemon PC access
      "commands": true,          // Blacklisted commands
      "chat_commands": false,    // Chat commands (/msg, /tell)
      "gui_open": false,         // Opening GUIs
      "chat": false              // Chat messages
    }
  }
}
```

### Flag Details

| Flag | Blocks | Critical? |
|------|--------|-----------|
| `pc_access` | **Cobblemon PC GUI access** | **⚠️ YES - Team changes** |
| `commands` | Commands in `blockedCommands` config | **⚠️ YES - Includes `/pc`** |
| `chat_commands` | Chat commands (/msg, /tell, /w) | |
| `gui_open` | Opening GUIs | |
| `chat` | Sending chat messages | |

> **Critical:** `pc_access` and `commands` should ALWAYS be `true` during queue/preparation/battles!

### Command Blacklist

Commands blocked when `system.commands` is `true` are configured in the main `config.json5`:

```json5
{
  "blockedCommands": [
    "tp",
    "warp",
    "spawn",
    "warps",
    "ranked",
    "home",
    "kit",
    "pc"        // PC command blocked by default!
  ]
}
```

---

## Inventory Flags

Control inventory access and item movement.

```json5
{
  "queue": {
    "inventory": {
      "ender_chest": false,     // Ender chest access
      "shulker_box": false,     // Shulker box opening
      "trapped_chest": false,   // Trapped chest access
      "open": false,            // Opening inventory (E key)
      "hotbar_switch": false,   // Switching hotbar slots
      "item_move": false,       // Moving items in inventory
      "crafting": false         // Using crafting table
    }
  }
}
```

### Flag Details

| Flag | Blocks | Critical? |
|------|--------|-----------|
| `ender_chest` | **Ender chest access** | **⚠️ YES - Team swapping** |
| `shulker_box` | **Shulker box opening** | **⚠️ YES - Team swapping** |
| `trapped_chest` | Trapped chest access | |
| `open` | Opening inventory (E key) | |
| `hotbar_switch` | Switching hotbar slots (1-9 keys) | |
| `item_move` | Moving items in inventory | |
| `crafting` | Crafting table usage | |

> **Critical:** Set `ender_chest` and `shulker_box` to `true` during match preparation and battles to prevent team swapping!

### Example: Block Team Swapping

```json5
{
  "match_preparation": {
    "inventory": {
      "ender_chest": true,   // Block ender chest
      "shulker_box": true    // Block shulker box
    }
  }
}
```

---

## Common Configurations

### 1. Minimal Restrictions (Casual Mode)

Only block team changes and queue dodging:

```json5
{
  "queue": {
    "movement": { "teleport": true },
    "system": { "pc_access": true, "commands": true }
  },
  "match_preparation": {
    "movement": { "teleport": true },
    "system": { "pc_access": true, "commands": true },
    "inventory": { "ender_chest": true, "shulker_box": true }
  },
  "battle": {
    "movement": { "teleport": true, "ender_pearl": true, "chorus_fruit": true },
    "system": { "pc_access": true, "commands": true },
    "combat": { "pvp": true, "pve": true }
  }
}
```

### 2. Progressive Restrictions (Recommended - Default)

Gradually increase restrictions through game states:

- **Queue:** PC + teleport + commands only
- **Match Preparation:** + inventory items (ender chest, shulker box)
- **Battle:** Full restrictions (all interactions blocked)

This is the **default configuration** generated by CobbleRanked.

### 3. Ultra-Strict Mode

Block everything in all states:

Set ALL flags to `true` in queue, match_preparation, and battle sections.

### 4. PvP Prevention Mode

Allow gameplay but prevent all player combat:

```json5
{
  "queue": {
    "combat": { "pvp": true },
    "entity": { "damage": true }
  }
}
```

---

## Error Messages

All error messages are managed in language files, **not** in the restrictions config.

**Example language file (`ja-Jp.json5`):**
```json5
{
  "listener_cannot_use_items": "&cランクマッチ中はアイテムを使用できません！",
  "listener_cannot_use_ender_pearl": "&cエンダーパールを使用できません！",
  "listener_cannot_use_chorus_fruit": "&cコーラスフルーツを使用できません！",
  "listener_cannot_access_pc": "&cPCにアクセスできません！"
}
```

**Supported languages:**
- Japanese (`ja-Jp.json5`)
- English (`en-Us.json5`)
- Portuguese (`pt-Br.json5`)
- Russian (`ru-Ru.json5`)

---

## Reload Configuration

After editing `restrictions.json5`, reload the configuration:

```
/rankedarena reload
```

**Permission:** OP level 2 required

---

## Troubleshooting

### Players Can Still Teleport

**Problem:** Players can use /home or /tp despite restrictions

**Solution 1:** Check `blockedCommands` in `config.json5`:
```json5
{
  "blockedCommands": ["tp", "teleport", "home", "spawn", "warp"]
}
```

**Solution 2:** Set `movement.teleport` to `true` in all three states

**Solution 3:** Set `system.commands` to `true`

### Players Can Swap Teams

**Problem:** Players change Pokémon team during match preparation

**Solution:** Set these flags to `true` in `match_preparation` and `battle`:
```json5
{
  "system": { "pc_access": true },
  "inventory": {
    "ender_chest": true,
    "shulker_box": true
  }
}
```

### Players Can Escape Arena

**Problem:** Players throw ender pearls or eat chorus fruit to escape battle arena

**Solution:** Set these flags to `true` in `battle`:
```json5
{
  "item": {
    "use_ender_pearl": true,
    "use_chorus_fruit": true
  },
  "movement": {
    "ender_pearl": true,
    "chorus_fruit": true
  }
}
```

### Players Can Use /pc Command

**Problem:** Players can open PC with `/pc` command

**Solution:** Verify `/pc` is in `blockedCommands`:
```json5
{
  "blockedCommands": ["tp", "warp", "spawn", "warps", "ranked", "home", "kit", "pc"]
}
```

And set `system.commands` to `true`:
```json5
{
  "system": { "commands": true }
}
```

### Configuration Not Loading

**Problem:** Changes to `restrictions.json5` don't take effect

**Solution:**
1. Check server logs for JSON parsing errors
2. Verify JSON5 syntax (trailing commas are OK)
3. Run `/rankedarena reload`
4. Restart server if reload doesn't work

---

## Complete Example

**Compact, production-ready configuration:**

```json5
{
  "queue": {
    "item": {
      "use": false, "drop": false, "pickup": false, "consume_food": false,
      "use_potion": false, "use_tool": false, "change_armor": false,
      "use_bucket": false, "use_flint_and_steel": false,
      "use_ender_pearl": false, "use_chorus_fruit": false
    },
    "block": {
      "break": false, "place": false, "interact": false, "door_interact": false,
      "container_access": false, "button_press": false, "lever_use": false,
      "crop_trample": false, "pressure_plate": false
    },
    "entity": {
      "interact": false, "damage": false, "mount": false, "villager_trade": false,
      "animal_breeding": false, "pet_interact": false, "npc_interact": false,
      "leash_entity": false
    },
    "combat": {
      "pvp": false, "pve": false, "projectile_launch": false,
      "explosion_damage": false, "fire_damage": false
    },
    "movement": {
      "teleport": true,   // BLOCK
      "respawn": false, "portal_use": false, "flight": false,
      "ender_pearl": false, "chorus_fruit": false
    },
    "system": {
      "pc_access": true,  // BLOCK
      "commands": true,   // BLOCK
      "chat_commands": false, "gui_open": false, "chat": false
    },
    "inventory": {
      "ender_chest": false, "shulker_box": false, "trapped_chest": false,
      "open": false, "hotbar_switch": false, "item_move": false, "crafting": false
    }
  },
  "match_preparation": {
    "item": { /* same as queue */ },
    "block": { /* same as queue */ },
    "entity": { /* same as queue */ },
    "combat": { /* same as queue */ },
    "movement": { "teleport": true /* ... */ },
    "system": { "pc_access": true, "commands": true /* ... */ },
    "inventory": {
      "ender_chest": true,   // BLOCK
      "shulker_box": true,   // BLOCK
      "trapped_chest": true,
      "open": false, "hotbar_switch": false, "item_move": false, "crafting": false
    }
  },
  "battle": {
    "item": {
      "use": true, "drop": true, "pickup": true, "consume_food": true,
      "use_potion": true, "use_tool": true, "change_armor": true,
      "use_bucket": true, "use_flint_and_steel": true,
      "use_ender_pearl": true,   // BLOCK
      "use_chorus_fruit": true   // BLOCK
    },
    "block": { /* all true */ },
    "entity": { /* all true */ },
    "combat": { "pvp": true, "pve": true /* ... */ },
    "movement": {
      "teleport": true,
      "respawn": false,  // Allow respawn
      "portal_use": true, "flight": false,
      "ender_pearl": true,    // BLOCK
      "chorus_fruit": true    // BLOCK
    },
    "system": { "pc_access": true, "commands": true, "gui_open": true /* ... */ },
    "inventory": { /* all true except chat_commands and chat */ }
  }
}
```

---

## See Also

- [Main Configuration](config.md) - Main config.json5 reference
- [Commands](../getting-started/commands.md) - Admin commands for managing restrictions
- [Troubleshooting](../support/troubleshooting.md) - Common issues and solutions
- [Configuration Examples](../../../config-examples/restrictions_compact_format.json5) - Compact format example

---

**Last Updated:** 2025-11-15
**Mod Version:** 1.0.0+
**Format:** Boolean (true=deny, false=inherit)
