# Player Restrictions Configuration

Complete reference for `config/cobbleranked/restrictions.json5`.

The restriction system controls what actions players can perform during different ranked match states (queue, match preparation, and active battles). This WorldGuard-style flag system provides fine-grained control over player behavior to ensure fair competitive matches.

---

## File Location

`config/cobbleranked/restrictions.json5`

> **Note:** This is a separate file from the main `config.json5` for better organization and easier management.

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

## Game States

The restriction system has three independent profiles:

### 1. Queue State
**When:** Player is waiting for a match in the matchmaking queue

**Default Behavior:** Minimal restrictions
- Block PC access (prevents team changes)
- Block teleport commands (prevents queue dodging)
- Allow normal gameplay (building, farming, etc.)

### 2. Match Preparation State
**When:** Match found → ReadyGUI appears → 5-second countdown

**Default Behavior:** Queue restrictions + inventory restrictions
- Block PC access
- Block teleport commands
- Block ender chests, shulker boxes (prevents team swapping)
- Allow normal gameplay

### 3. Battle State
**When:** Player is actively in a ranked Pokémon battle

**Default Behavior:** Maximum restrictions
- Block ALL item usage (including ender pearls, chorus fruit)
- Block ALL block interactions
- Block ALL entity interactions (except battle mechanics)
- Block PvP and PvE combat
- Block inventory access
- Allow chat for communication

---

## Flag States

Each flag can have one of three states:

| State | Behavior | Example |
|-------|----------|---------|
| `allow` | Explicitly allow the action | Override a parent "deny" |
| `deny` | Explicitly block the action | Prevent teleportation |
| `inherit` | Use default behavior (usually allow) | No restriction |

### Custom Messages

Each flag can have an optional custom deny message:

```json5
{
  "state": "deny",
  "message": "&cYou cannot use ender pearls during a ranked battle!"
}
```

Messages support Minecraft color codes (`&a`, `&c`, `&e`, etc.)

---

## Item Flags

Control what items players can use.

```json5
{
  "queue": {
    "item": {
      "use": { "state": "inherit" },                  // General item usage
      "drop": { "state": "inherit" },                 // Dropping items (Q key)
      "pickup": { "state": "inherit" },               // Picking up items from ground
      "consume_food": { "state": "inherit" },         // Eating food
      "use_potion": { "state": "inherit" },           // Drinking potions
      "use_tool": { "state": "inherit" },             // Using tools (pickaxe, axe, etc.)
      "change_armor": { "state": "inherit" },         // Equipping/removing armor
      "use_bucket": { "state": "inherit" },           // Using buckets (water, lava, milk)
      "use_flint_and_steel": { "state": "inherit" },  // Starting fires
      "use_ender_pearl": { "state": "inherit" },      // Throwing ender pearls (teleportation)
      "use_chorus_fruit": { "state": "inherit" }      // Eating chorus fruit (teleportation)
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `use` | All right-click item actions | General item restriction |
| `drop` | Q key, dropping from inventory | Prevent item loss |
| `pickup` | Collecting items from ground | Prevent inventory changes |
| `consume_food` | Eating food items | Block healing/saturation |
| `use_potion` | Drinking potions | Block buffs/debuffs |
| `use_tool` | Tool usage (dig, chop, etc.) | Block world modification |
| `change_armor` | Armor equip/unequip | Lock equipment |
| `use_bucket` | Bucket fill/empty | Block fluid manipulation |
| `use_flint_and_steel` | Fire starting | Block griefing |
| `use_ender_pearl` | **Ender pearl throwing** | **Prevent arena escape** |
| `use_chorus_fruit` | **Chorus fruit eating** | **Prevent teleport escape** |

> **Critical:** `use_ender_pearl` and `use_chorus_fruit` should be set to `"deny"` during battles to prevent players from escaping arenas!

### Example: Block Teleportation Items

```json5
{
  "battle": {
    "item": {
      "use_ender_pearl": {
        "state": "deny",
        "message": "&cYou cannot use ender pearls during a ranked battle!"
      },
      "use_chorus_fruit": {
        "state": "deny",
        "message": "&cYou cannot use chorus fruit during a ranked battle!"
      }
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
      "break": { "state": "inherit" },           // Breaking blocks
      "place": { "state": "inherit" },           // Placing blocks
      "interact": { "state": "inherit" },        // Right-clicking blocks
      "door_interact": { "state": "inherit" },   // Opening/closing doors
      "container_access": { "state": "inherit" }, // Chests, furnaces, hoppers
      "button_press": { "state": "inherit" },    // Pressing buttons
      "lever_use": { "state": "inherit" },       // Flipping levers
      "crop_trample": { "state": "inherit" },    // Jumping on farmland
      "pressure_plate": { "state": "inherit" }   // Stepping on pressure plates
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `break` | Block breaking | Prevent world modification |
| `place` | Block placing | Prevent building |
| `interact` | General block right-click | Generic block restriction |
| `door_interact` | Doors, trapdoors, fence gates | Control entry/exit |
| `container_access` | Chests, barrels, furnaces, hoppers | Block storage access |
| `button_press` | Stone/wood buttons | Block redstone activation |
| `lever_use` | Levers | Block redstone activation |
| `crop_trample` | Farmland trampling | Protect farms |
| `pressure_plate` | Pressure plates | Block redstone activation |

### Example: Block All Building

```json5
{
  "battle": {
    "block": {
      "break": {
        "state": "deny",
        "message": "&cYou cannot break blocks during a ranked battle!"
      },
      "place": {
        "state": "deny",
        "message": "&cYou cannot place blocks during a ranked battle!"
      }
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
      "interact": { "state": "inherit" },        // Right-clicking entities
      "damage": { "state": "inherit" },          // Attacking entities (non-player)
      "mount": { "state": "inherit" },           // Mounting horses, boats, etc.
      "villager_trade": { "state": "inherit" },  // Trading with villagers
      "animal_breeding": { "state": "inherit" }, // Breeding animals
      "pet_interact": { "state": "inherit" },    // Interacting with pets
      "npc_interact": { "state": "inherit" },    // Interacting with NPCs
      "leash_entity": { "state": "inherit" }     // Using leads on entities
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `interact` | General entity right-click | Generic entity restriction |
| `damage` | Attacking non-player entities | Block PvE damage |
| `mount` | Mounting horses, boats, minecarts | Block movement utilities |
| `villager_trade` | Villager trading GUI | Block economy access |
| `animal_breeding` | Feeding animals to breed | Block farming |
| `pet_interact` | Interacting with pets (sit/stand) | Block pet control |
| `npc_interact` | Custom NPC interactions | Block NPC systems |
| `leash_entity` | Attaching/detaching leads | Block mob control |

### Example: Block All Entity Interaction

```json5
{
  "battle": {
    "entity": {
      "interact": { "state": "deny" },
      "damage": {
        "state": "deny",
        "message": "&cYou cannot damage entities during a ranked battle!"
      }
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
      "pvp": { "state": "inherit" },              // Player vs Player combat
      "pve": { "state": "inherit" },              // Player vs Entity combat
      "projectile_launch": { "state": "inherit" }, // Shooting arrows, throwing items
      "explosion_damage": { "state": "inherit" },  // TNT, creeper explosions
      "fire_damage": { "state": "inherit" }        // Fire, lava damage
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `pvp` | Attacking other players | Prevent player griefing |
| `pve` | Attacking mobs (zombies, creepers, etc.) | Block mob combat |
| `projectile_launch` | Bow shooting, snowball throwing | Block ranged combat |
| `explosion_damage` | Explosion damage to player | Protect from explosions |
| `fire_damage` | Fire and lava damage | Protect from environmental damage |

> **Note:** During battles, PvP and PvE should be blocked to prevent interference with the Pokémon battle system.

### Example: Block All Combat

```json5
{
  "battle": {
    "combat": {
      "pvp": {
        "state": "deny",
        "message": "&cPlayer vs Player combat is disabled during ranked battles!"
      },
      "pve": {
        "state": "deny",
        "message": "&cYou cannot attack mobs during a ranked battle!"
      }
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
      "teleport": { "state": "deny" },        // Command teleportation (/tp, /home)
      "respawn": { "state": "inherit" },      // Respawning after death
      "portal_use": { "state": "inherit" },   // Nether/End portal entry
      "flight": { "state": "inherit" },       // Creative/spectator flight
      "ender_pearl": { "state": "inherit" },  // Ender pearl teleportation
      "chorus_fruit": { "state": "inherit" }  // Chorus fruit teleportation
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `teleport` | **/tp, /home, /spawn commands** | **Prevent queue dodging** |
| `respawn` | Respawning after death | Allow death recovery |
| `portal_use` | Nether/End portal entry | Block dimension travel |
| `flight` | Flying (creative/spectator mode) | Block flight advantage |
| `ender_pearl` | **Ender pearl teleportation** | **Prevent arena escape** |
| `chorus_fruit` | **Chorus fruit teleportation** | **Prevent arena escape** |

> **Critical:** `teleport`, `ender_pearl`, and `chorus_fruit` should ALWAYS be set to `"deny"` during queue, preparation, and battles to prevent players from leaving the match!

### Example: Block All Teleportation

```json5
{
  "queue": {
    "movement": {
      "teleport": {
        "state": "deny",
        "message": "&cYou cannot teleport while in queue!"
      },
      "ender_pearl": {
        "state": "deny",
        "message": "&cYou cannot throw ender pearls while in queue!"
      },
      "chorus_fruit": {
        "state": "deny",
        "message": "&cYou cannot eat chorus fruit while in queue!"
      }
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
      "pc_access": { "state": "deny" },         // Cobblemon PC access
      "commands": { "state": "deny" },          // Blacklisted commands
      "chat_commands": { "state": "inherit" },  // Chat commands (/msg, /tell)
      "gui_open": { "state": "inherit" },       // Opening GUIs
      "chat": { "state": "inherit" }            // Chat messages
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `pc_access` | **Cobblemon PC GUI access** | **Prevent team changes** |
| `commands` | Commands in `command_blacklist` config | Block specific commands |
| `chat_commands` | Chat commands (/msg, /tell, /w) | Allow player communication |
| `gui_open` | Opening GUIs | Block GUI access |
| `chat` | Sending chat messages | Allow/block communication |

> **Critical:** `pc_access` should ALWAYS be set to `"deny"` during queue, preparation, and battles to prevent players from changing their Pokémon team!

### Example: Block PC Access

```json5
{
  "queue": {
    "system": {
      "pc_access": {
        "state": "deny",
        "message": "&cPC access is blocked while in queue!"
      },
      "commands": {
        "state": "deny",
        "message": "&cThis command is blocked while in queue!"
      }
    }
  }
}
```

**Command Blacklist Configuration:**

Commands blocked by the `commands` flag are configured in the main `config.json5`:

```json5
{
  "competitive": {
    "command_blacklist": [
      "tp",
      "teleport",
      "home",
      "spawn",
      "warp"
    ]
  }
}
```

---

## Inventory Flags

Control inventory access and item movement.

```json5
{
  "queue": {
    "inventory": {
      "ender_chest": { "state": "inherit" },     // Ender chest access
      "shulker_box": { "state": "inherit" },     // Shulker box opening
      "trapped_chest": { "state": "inherit" },   // Trapped chest access
      "open": { "state": "inherit" },            // Opening inventory (E key)
      "hotbar_switch": { "state": "inherit" },   // Switching hotbar slots
      "item_move": { "state": "inherit" },       // Moving items in inventory
      "crafting": { "state": "inherit" }         // Using crafting table
    }
  }
}
```

### Flag Details

| Flag | Blocks | Use Case |
|------|--------|----------|
| `ender_chest` | **Ender chest access** | **Prevent team swapping** |
| `shulker_box` | **Shulker box opening** | **Prevent team swapping** |
| `trapped_chest` | Trapped chest access | Block storage access |
| `open` | Opening inventory (E key) | Lock inventory |
| `hotbar_switch` | Switching hotbar slots (1-9 keys) | Lock selected item |
| `item_move` | Moving items in inventory | Lock inventory state |
| `crafting` | Crafting table usage | Block crafting |

> **Critical:** `ender_chest` and `shulker_box` should be set to `"deny"` during match preparation and battles to prevent players from swapping Pokémon teams stored in those containers!

### Example: Block Team Swapping

```json5
{
  "match_preparation": {
    "inventory": {
      "ender_chest": {
        "state": "deny",
        "message": "&cYou cannot use ender chests during match preparation!"
      },
      "shulker_box": {
        "state": "deny",
        "message": "&cYou cannot use shulker boxes during match preparation!"
      }
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
    "movement": {
      "teleport": { "state": "deny" }
    },
    "system": {
      "pc_access": { "state": "deny" },
      "commands": { "state": "deny" }
    }
  },
  "match_preparation": {
    "movement": {
      "teleport": { "state": "deny" }
    },
    "system": {
      "pc_access": { "state": "deny" },
      "commands": { "state": "deny" }
    },
    "inventory": {
      "ender_chest": { "state": "deny" },
      "shulker_box": { "state": "deny" }
    }
  },
  "battle": {
    "movement": {
      "teleport": { "state": "deny" },
      "ender_pearl": { "state": "deny" },
      "chorus_fruit": { "state": "deny" }
    },
    "system": {
      "pc_access": { "state": "deny" },
      "commands": { "state": "deny" }
    },
    "combat": {
      "pvp": { "state": "deny" },
      "pve": { "state": "deny" }
    }
  }
}
```

### 2. Progressive Restrictions (Recommended)

Gradually increase restrictions through game states:

- **Queue:** PC + teleport only
- **Match Preparation:** + inventory items (ender chest, shulker box)
- **Battle:** Full restrictions (all interactions blocked)

This is the **default configuration** generated by CobbleRanked.

### 3. Ultra-Strict Mode

Block everything in all states for maximum control:

Set ALL flags to `"deny"` in queue, match_preparation, and battle sections.

### 4. PvP Prevention Mode

Allow gameplay but prevent all player combat:

```json5
{
  "queue": {
    "combat": {
      "pvp": { "state": "deny" }
    },
    "entity": {
      "damage": { "state": "deny" }
    }
  }
}
```

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

**Solution 1:** Check `command_blacklist` in `config.json5`:
```json5
{
  "competitive": {
    "command_blacklist": ["tp", "teleport", "home", "spawn", "warp"]
  }
}
```

**Solution 2:** Set `movement.teleport` to `"deny"` in all three states

### Players Can Swap Teams

**Problem:** Players change Pokémon team during match preparation

**Solution:** Set these flags to `"deny"` in `match_preparation` and `battle`:
- `system.pc_access`
- `inventory.ender_chest`
- `inventory.shulker_box`

### Players Can Escape Arena

**Problem:** Players throw ender pearls or eat chorus fruit to escape battle arena

**Solution:** Set these flags to `"deny"` in `battle`:
```json5
{
  "battle": {
    "item": {
      "use_ender_pearl": { "state": "deny" },
      "use_chorus_fruit": { "state": "deny" }
    },
    "movement": {
      "ender_pearl": { "state": "deny" },
      "chorus_fruit": { "state": "deny" }
    }
  }
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

## Technical Details

### Event Handlers

CobbleRanked uses Fabric's event callback system to enforce restrictions:

| Event | Blocked Actions |
|-------|----------------|
| `UseItemCallback` | Item usage, ender pearls, chorus fruit |
| `UseBlockCallback` | Block interactions, containers, doors |
| `UseEntityCallback` | Entity interactions, trading, breeding |
| `AttackEntityCallback` | PvP, PvE, entity damage |
| `PCLinkManager` Mixin | Cobblemon PC access |
| `CommandDispatcher` Mixin | Command execution |

### Performance

- **UUID-based lookups:** O(1) hash map access
- **Config flag checks:** O(1) data class field access
- **Event overhead:** ~1-2 microseconds per event
- **No region queries:** Player-based restrictions only (faster than WorldGuard/YAWP)

### Comparison to YAWP

| Feature | YAWP | CobbleRanked |
|---------|------|--------------|
| Total Flags | 60+ | 51 |
| Flag States | 4 (ALLOWED/DENIED/DISABLED/UNDEFINED) | 3 (allow/deny/inherit) |
| Custom Messages | ✅ Yes | ✅ Yes |
| Region Support | ✅ Yes | ❌ No (player-based only) |
| Performance | ~5-10µs/event | ~1-2µs/event (5x faster) |
| Ender Pearl Block | ✅ Yes | ✅ Yes |
| Chorus Fruit Block | ❌ No | ✅ Yes |
| PC Access Block | ❌ No | ✅ Yes (Cobblemon-specific) |

**See:** [FLAG_COMPARISON.md](../../../FLAG_COMPARISON.md) for detailed analysis

---

## See Also

- [Main Configuration](config.md) - Main config.json5 reference
- [Commands](../getting-started/commands.md) - Admin commands for managing restrictions
- [Troubleshooting](../support/troubleshooting.md) - Common issues and solutions

---

**Last Updated:** 2025-11-15
**Mod Version:** 1.0.0+
