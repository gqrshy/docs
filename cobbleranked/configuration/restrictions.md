# Player Restrictions

Control what players can do during ranked and casual matches with fine-grained restrictions for each phase.

**File:** `config/cobbleranked/restrictions.json5` (auto-generated on first run)

---

<details>
<summary><strong>Full Default Configuration File</strong></summary>

```json5
{
  // ============================================================================
  //  PLAYER RESTRICTIONS CONFIGURATION
  // ============================================================================
  //
  // Controls what actions are blocked during each phase:
  //   - queue: Waiting in matchmaking queue
  //   - match_preparation: Ready confirmation and countdown
  //   - battle: Active Pokemon battle
  //
  // Flag values:
  //   true  = DENY (block the action)
  //   false = INHERIT (allow the action)
  //

  "queue": {
    "item": {
      "use": false,
      "drop": false,
      "pickup": false,
      "consume_food": false,
      "use_potion": false,
      "use_tool": false,
      "change_armor": false,
      "use_bucket": false,
      "use_flint_and_steel": false,
      "use_ender_pearl": false,
      "use_chorus_fruit": false
    },
    "block": {
      "break": false,
      "place": false,
      "interact": false,
      "door_interact": false,
      "container_access": false,
      "button_press": false,
      "lever_use": false,
      "crop_trample": false,
      "pressure_plate": false
    },
    "entity": {
      "interact": false,
      "damage": false,
      "mount": false,
      "villager_trade": false,
      "animal_breeding": false,
      "pet_interact": false,
      "npc_interact": false,
      "leash_entity": false
    },
    "combat": {
      "pvp": false,
      "pve": false,
      "projectile_launch": false,
      "explosion_damage": false,
      "fire_damage": false
    },
    "movement": {
      "teleport": true,           // Block teleport commands
      "respawn": false,
      "portal_use": false,
      "flight": false,
      "ender_pearl": false,
      "chorus_fruit": false
    },
    "system": {
      "pc_access": true,          // Block Pokemon PC
      "commands": true,           // Block commands (uses blockedCommands list)
      "chat_commands": false,
      "gui_open": false,
      "chat": false
    },
    "inventory": {
      "ender_chest": false,
      "shulker_box": false,
      "trapped_chest": false,
      "open": false,
      "hotbar_switch": false,
      "item_move": false,
      "crafting": false
    }
  },

  "match_preparation": {
    "item": {
      "use": false,
      "drop": false,
      "pickup": false,
      "consume_food": false,
      "use_potion": false,
      "use_tool": false,
      "change_armor": false,
      "use_bucket": false,
      "use_flint_and_steel": false,
      "use_ender_pearl": false,
      "use_chorus_fruit": false
    },
    "block": {
      "break": false,
      "place": false,
      "interact": false,
      "door_interact": false,
      "container_access": false,
      "button_press": false,
      "lever_use": false,
      "crop_trample": false,
      "pressure_plate": false
    },
    "entity": {
      "interact": false,
      "damage": false,
      "mount": false,
      "villager_trade": false,
      "animal_breeding": false,
      "pet_interact": false,
      "npc_interact": false,
      "leash_entity": false
    },
    "combat": {
      "pvp": false,
      "pve": false,
      "projectile_launch": false,
      "explosion_damage": false,
      "fire_damage": false
    },
    "movement": {
      "teleport": true,           // Block teleport commands
      "respawn": false,
      "portal_use": false,
      "flight": false,
      "ender_pearl": false,
      "chorus_fruit": false
    },
    "system": {
      "pc_access": true,          // Block Pokemon PC
      "commands": true,           // Block commands
      "chat_commands": false,
      "gui_open": false,
      "chat": false
    },
    "inventory": {
      "ender_chest": true,        // Block ender chest
      "shulker_box": true,        // Block shulker boxes
      "trapped_chest": true,      // Block trapped chests
      "open": false,
      "hotbar_switch": false,
      "item_move": false,
      "crafting": false
    }
  },

  "battle": {
    "item": {
      "use": true,                // Block all item use
      "drop": true,               // Block item dropping
      "pickup": true,             // Block item pickup
      "consume_food": false,
      "use_potion": false,
      "use_tool": false,
      "change_armor": false,
      "use_bucket": false,
      "use_flint_and_steel": false,
      "use_ender_pearl": true,    // Block ender pearl teleport
      "use_chorus_fruit": true    // Block chorus fruit teleport
    },
    "block": {
      "break": true,              // Block breaking blocks
      "place": true,              // Block placing blocks
      "interact": true,           // Block block interaction
      "door_interact": false,
      "container_access": false,
      "button_press": false,
      "lever_use": false,
      "crop_trample": false,
      "pressure_plate": false
    },
    "entity": {
      "interact": true,           // Block entity interaction
      "damage": true,             // Block entity damage
      "mount": false,
      "villager_trade": false,
      "animal_breeding": false,
      "pet_interact": false,
      "npc_interact": false,
      "leash_entity": false
    },
    "combat": {
      "pvp": true,                // Block PvP
      "pve": true,                // Block PvE
      "projectile_launch": false,
      "explosion_damage": false,
      "fire_damage": false
    },
    "movement": {
      "teleport": true,           // Block teleport commands
      "respawn": false,
      "portal_use": false,
      "flight": false,
      "ender_pearl": true,        // Block ender pearl
      "chorus_fruit": true        // Block chorus fruit
    },
    "system": {
      "pc_access": true,          // Block Pokemon PC
      "commands": true,           // Block commands
      "chat_commands": false,
      "gui_open": false,
      "chat": false
    },
    "inventory": {
      "ender_chest": true,        // Block ender chest
      "shulker_box": true,        // Block shulker boxes
      "trapped_chest": false,
      "open": true,               // Block inventory opening
      "hotbar_switch": false,
      "item_move": false,
      "crafting": false
    }
  }
}
```

</details>

---

## Phases

Restrictions are applied based on the player's current phase:

| Phase | Description |
|-------|-------------|
| `queue` | Player is waiting in matchmaking queue |
| `match_preparation` | Match found, Ready GUI and countdown phase |
| `battle` | Active Pokemon battle in progress |

---

## Restriction Categories

Each phase has 7 restriction categories. Set to `true` to block, `false` to allow.

### Item Restrictions

```json5
"item": {
  "use": false,               // General item use
  "drop": false,              // Dropping items
  "pickup": false,            // Picking up items
  "consume_food": false,      // Eating food
  "use_potion": false,        // Using potions
  "use_tool": false,          // Using tools
  "change_armor": false,      // Changing armor
  "use_bucket": false,        // Using buckets
  "use_flint_and_steel": false, // Using flint and steel
  "use_ender_pearl": false,   // Ender pearl teleportation
  "use_chorus_fruit": false   // Chorus fruit teleportation
}
```

### Block Restrictions

```json5
"block": {
  "break": false,             // Breaking blocks
  "place": false,             // Placing blocks
  "interact": false,          // General block interaction
  "door_interact": false,     // Doors, trapdoors, gates
  "container_access": false,  // Chests, barrels, hoppers
  "button_press": false,      // Buttons
  "lever_use": false,         // Levers
  "crop_trample": false,      // Farmland trampling
  "pressure_plate": false     // Pressure plates
}
```

### Entity Restrictions

```json5
"entity": {
  "interact": false,          // Right-clicking entities
  "damage": false,            // Attacking entities
  "mount": false,             // Riding entities
  "villager_trade": false,    // Villager trading
  "animal_breeding": false,   // Breeding animals
  "pet_interact": false,      // Pet interactions
  "npc_interact": false,      // NPC interactions
  "leash_entity": false       // Using leads
}
```

### Combat Restrictions

```json5
"combat": {
  "pvp": false,               // Player vs Player
  "pve": false,               // Player vs Environment (mobs)
  "projectile_launch": false, // Bows, crossbows, tridents
  "explosion_damage": false,  // Taking explosion damage
  "fire_damage": false        // Taking fire damage
}
```

### Movement Restrictions

```json5
"movement": {
  "teleport": false,          // Teleport commands (/tp, /warp, /home)
  "respawn": false,           // Respawning after death
  "portal_use": false,        // Nether/End portals
  "flight": false,            // Creative/elytra flight
  "ender_pearl": false,       // Ender pearl teleportation
  "chorus_fruit": false       // Chorus fruit teleportation
}
```

### System Restrictions

```json5
"system": {
  "pc_access": false,         // Pokemon PC access
  "commands": false,          // Command execution (uses blockedCommands list)
  "chat_commands": false,     // Chat-based commands
  "gui_open": false,          // Opening GUIs
  "chat": false               // Sending chat messages
}
```

### Inventory Restrictions

```json5
"inventory": {
  "ender_chest": false,       // Ender chest access
  "shulker_box": false,       // Shulker box access
  "trapped_chest": false,     // Trapped chest access
  "open": false,              // Opening inventory
  "hotbar_switch": false,     // Switching hotbar slots
  "item_move": false,         // Moving items in inventory
  "crafting": false           // Crafting items
}
```

---

## Default Behavior

| Phase | Key Restrictions |
|-------|-----------------|
| **Queue** | PC access blocked, teleport commands blocked |
| **Match Preparation** | PC access blocked, teleport blocked, storage containers blocked |
| **Battle** | Most interactions blocked (items, blocks, entities, combat, inventory) |

---

## Blocked Commands

The `blockedCommands` list in `config.json5` determines which commands are blocked when `system.commands` is `true`:

```json5
// In config.json5
"blockedCommands": ["tp", "warp", "spawn", "warps", "ranked", "home", "kit", "pc"]
```

---

<details>
<summary><strong>Common Customization Examples</strong></summary>

### Allow Teleportation During Queue

```json5
"queue": {
  "movement": {
    "teleport": false    // Allow teleport commands in queue
  },
  "system": {
    "commands": false    // Allow all commands
  }
}
```

### Block All Movement During Battle

```json5
"battle": {
  "movement": {
    "teleport": true,
    "portal_use": true,
    "flight": true,
    "ender_pearl": true,
    "chorus_fruit": true
  }
}
```

### Allow PC Access in Queue

```json5
"queue": {
  "system": {
    "pc_access": false   // Allow Pokemon PC access while queued
  }
}
```

### Block Food During Battle

```json5
"battle": {
  "item": {
    "consume_food": true
  }
}
```

### Prevent Block Griefing During Queue

```json5
"queue": {
  "block": {
    "break": true,
    "place": true
  }
}
```

</details>

---

## Reloading

After editing `restrictions.json5`:

```text
/rankedadmin reload
```

---

## See Also

- [Main Configuration](config.md) - `blockedCommands` list
- [Blacklist System](blacklist.md) - Pokemon and move bans
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
