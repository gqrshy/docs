# Player Restrictions

Control what players can do during ranked matches.

**File:** `config/cobbleranked/restrictions.json5`

## Quick Start

Default settings work for most servers. Customize only if needed.

### Common Examples

**Allow teleportation during queue:**
```json5
"queue_phase": {
  "movement": {
    "allow_teleport_commands": true
  }
}
```

**Allow PC access in battle:**
```json5
"battle_phase": {
  "system_actions": {
    "allow_pc_access": true
  }
}
```

## Match Phases

Each phase has different restriction levels:

1. **Queue Phase** - Waiting for opponent
2. **Preparation Phase** - Team selection, countdown
3. **Battle Phase** - Active battle

## Restriction Categories

Each phase can restrict:

- **Item Usage** - Ender pearls, chorus fruit
- **Block Interactions** - Breaking, placing blocks
- **Entity Interactions** - Trading, mounting
- **Combat** - PvP, PvE
- **Movement** - Teleportation, portals
- **System Actions** - PC access, commands
- **Inventory** - Ender chests, shulker boxes

## Default Behavior

**Queue:** Normal gameplay, but no teleports or PC
**Preparation:** Movement only, no combat
**Battle:** No actions except battle UI

## Example Configuration

```json5
{
  "queue_phase": {
    "movement": {
      "allow_teleport_commands": false
    },
    "system_actions": {
      "allow_pc_access": false
    }
  },
  "battle_phase": {
    "block_interactions": {
      "allow_break_blocks": false
    }
  }
}
```

## Troubleshooting

See [FAQ - Restrictions](../support/faq.md#restriction-system-troubleshooting)
