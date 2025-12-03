# Player Restrictions

Control what players can do during ranked and casual matches.

**File:** `config/cobbleranked/restrictions.json5` (auto-generated on first run)

## Configuration Structure

```json5
{
  "queue_phase": { /* Waiting for match */ },
  "preparation_phase": { /* Team selection, countdown */ },
  "battle_phase": { /* Active battle */ }
}
```

Each phase uses the same restriction categories below.

## Available Restrictions

### Item Usage

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

### Block Interactions

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

### Entity Interactions

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

### Combat

```json5
"combat": {
  "allow_pvp": false,                   // Player vs Player
  "allow_pve": false,                   // Player vs Entity (mobs)
  "allow_projectiles": false,           // Bows, crossbows, tridents
  "allow_explosion_damage": true,       // Taking explosion damage
  "allow_fall_damage": true             // Taking fall damage
}
```

### Movement

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

### System Actions

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

### Inventory

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

## Default Behavior

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

<details>
<summary><strong>Common Examples</strong></summary>

### Allow Teleportation During Queue

```json5
"queue_phase": {
  "movement": {
    "allow_teleport_commands": true
  }
}
```

### Allow PC Access in Battle

```json5
"battle_phase": {
  "system_actions": {
    "allow_pc_access": true
  }
}
```

### Block Specific Commands

```json5
"queue_phase": {
  "system_actions": {
    "allow_commands": false,
    "blocked_commands": ["tp", "warp", "home", "spawn", "tpa"]
  }
}
```

</details>

---

## See Also

- [Inventory Restrictions](../features/inventory-restrictions.md) - Pokemon/item restrictions
- [Blacklist System](blacklist.md) - Pokemon and move bans
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
