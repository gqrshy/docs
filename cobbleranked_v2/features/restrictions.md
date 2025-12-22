# Player Restrictions

Control player actions during queue and battle phases.

---

## Overview

CobbleRanked restricts certain player actions during competitive phases to ensure fair gameplay and prevent exploitation.

**Two Restriction Phases:**

| Phase | When Active | Purpose |
|-------|-------------|---------|
| **Queue** | While waiting in matchmaking queue | Prevent team changes |
| **Arena** | During active ranked battle | Full competitive lockdown |

---

## Configuration

**File:** `config/cobbleranked/restrictions.yaml`

### Queue Restrictions

Restrictions while waiting in matchmaking queue:

```yaml
queue:
  blockItemUse: false
  blockItemDrop: false
  blockItemPickup: false
  blockEquipmentChange: true
  blockBlockBreak: false
  blockBlockPlace: false
  blockBlockInteract: false
  blockContainerAccess: false
  blockEntityInteract: false
  blockEntityDamage: false
  blockEntityMount: false
  blockPvp: false
  blockPve: false
  blockProjectileLaunch: false
  blockTeleport: true
  blockPortalUse: true
  blockFlight: false
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "warp"
    - "spawn"
    - "home"
    - "pc"
```

### Arena Restrictions

Restrictions during active battle:

```yaml
arena:
  blockItemUse: true
  blockItemDrop: true
  blockItemPickup: true
  blockEquipmentChange: true
  blockBlockBreak: true
  blockBlockPlace: true
  blockBlockInteract: true
  blockContainerAccess: true
  blockEntityInteract: true
  blockEntityDamage: true
  blockEntityMount: true
  blockPvp: true
  blockPve: true
  blockProjectileLaunch: true
  blockTeleport: true
  blockPortalUse: true
  blockFlight: true
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "warp"
    - "spawn"
    - "home"
    - "kit"
    - "pc"
```

---

## Restriction Options

### Item Restrictions

| Option | Default (Queue) | Default (Arena) | Description |
|--------|-----------------|-----------------|-------------|
| `blockItemUse` | `false` | `true` | Block right-click item use |
| `blockItemDrop` | `false` | `true` | Block dropping items (Q key) |
| `blockItemPickup` | `false` | `true` | Block picking up items |
| `blockEquipmentChange` | `true` | `true` | Block armor/equipment changes |

### Block Restrictions

| Option | Default (Queue) | Default (Arena) | Description |
|--------|-----------------|-----------------|-------------|
| `blockBlockBreak` | `false` | `true` | Block breaking blocks |
| `blockBlockPlace` | `false` | `true` | Block placing blocks |
| `blockBlockInteract` | `false` | `true` | Block doors, levers, buttons |
| `blockContainerAccess` | `false` | `true` | Block chests, hoppers, etc. |

### Entity Restrictions

| Option | Default (Queue) | Default (Arena) | Description |
|--------|-----------------|-----------------|-------------|
| `blockEntityInteract` | `false` | `true` | Block interacting with entities |
| `blockEntityDamage` | `false` | `true` | Block damaging entities |
| `blockEntityMount` | `false` | `true` | Block mounting horses, etc. |
| `blockPvp` | `false` | `true` | Block player vs player combat |
| `blockPve` | `false` | `true` | Block player vs entity combat |

### Movement Restrictions

| Option | Default (Queue) | Default (Arena) | Description |
|--------|-----------------|-----------------|-------------|
| `blockTeleport` | `true` | `true` | Block teleportation |
| `blockPortalUse` | `true` | `true` | Block nether/end portals |
| `blockFlight` | `false` | `true` | Block creative/elytra flight |
| `blockProjectileLaunch` | `false` | `true` | Block arrows, ender pearls |

### Cobblemon Restrictions

| Option | Default (Queue) | Default (Arena) | Description |
|--------|-----------------|-----------------|-------------|
| `blockPcAccess` | `true` | `true` | Block Cobblemon PC access |
| `blockMoveSwap` | `true` | `true` | Block move reordering |

### Command Restrictions

| Option | Type | Description |
|--------|------|-------------|
| `blockedCommands` | List | Command names to block (without `/`) |

```yaml
blockedCommands:
  - "tp"
  - "teleport"
  - "warp"
  - "spawn"
  - "home"
  - "sethome"
  - "kit"
  - "pc"
  - "pokestorage"
```

> 📝 **Note:** Commands are matched by prefix. Blocking `tp` also blocks `tpa`, `tpaccept`, etc.

---

## Configuration Examples

<details>
<summary><strong>Minimal Queue Restrictions</strong></summary>

Allow most actions while queued, only block critical ones:

```yaml
queue:
  blockItemUse: false
  blockItemDrop: false
  blockItemPickup: false
  blockEquipmentChange: false
  blockBlockBreak: false
  blockBlockPlace: false
  blockBlockInteract: false
  blockContainerAccess: false
  blockEntityInteract: false
  blockEntityDamage: false
  blockEntityMount: false
  blockPvp: false
  blockPve: false
  blockProjectileLaunch: false
  blockTeleport: true
  blockPortalUse: true
  blockFlight: false
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "warp"
```

</details>

<details>
<summary><strong>Strict Queue Restrictions</strong></summary>

Lock down most actions while queued:

```yaml
queue:
  blockItemUse: true
  blockItemDrop: true
  blockItemPickup: true
  blockEquipmentChange: true
  blockBlockBreak: true
  blockBlockPlace: true
  blockBlockInteract: true
  blockContainerAccess: true
  blockEntityInteract: false
  blockEntityDamage: true
  blockEntityMount: true
  blockPvp: true
  blockPve: true
  blockProjectileLaunch: true
  blockTeleport: true
  blockPortalUse: true
  blockFlight: true
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "warp"
    - "spawn"
    - "home"
    - "kit"
    - "pc"
    - "give"
    - "gamemode"
```

</details>

<details>
<summary><strong>Custom Arena Restrictions</strong></summary>

Allow viewing but not interaction:

```yaml
arena:
  blockItemUse: true
  blockItemDrop: true
  blockItemPickup: true
  blockEquipmentChange: true
  blockBlockBreak: true
  blockBlockPlace: true
  blockBlockInteract: false   # Allow opening doors
  blockContainerAccess: true
  blockEntityInteract: false  # Allow looking at entities
  blockEntityDamage: true
  blockEntityMount: true
  blockPvp: true
  blockPve: true
  blockProjectileLaunch: true
  blockTeleport: true
  blockPortalUse: true
  blockFlight: true
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands: []
```

</details>

---

## Inventory Restrictions

To restrict specific items from entering ranked queues, configure the blacklist system:

**File:** `config/cobbleranked/presets/default.yaml`

```yaml
blacklist:
  items:
    - "mega_showdown:tera_orb"
    - "mega_showdown:dynamax_band"
    - "mega_showdown:mega_bracelet"
    - "mega_showdown:z_ring"
```

This prevents players from queueing if these items are in their inventory.

### Finding Item IDs

1. Hold the item in-game
2. Press F3+H (show advanced tooltips)
3. Check tooltip for ID (e.g., `mega_showdown:tera_orb`)

### Common Banned Items

| Item | ID |
|------|-----|
| Tera Orb | `mega_showdown:tera_orb` |
| Dynamax Band | `mega_showdown:dynamax_band` |
| Mega Bracelet | `mega_showdown:mega_bracelet` |
| Z-Ring | `mega_showdown:z_ring` |
| Omni Ring | `mega_showdown:omni_ring` |

---

## Error Messages

### Queue Restrictions

When a player tries a blocked action while queued:

```
You cannot do that while in the ranked queue.
```

### Arena Restrictions

When a player tries a blocked action during battle:

```
You cannot do that during a ranked battle.
```

### Blocked Command

When a player tries a blocked command:

```
That command is blocked during ranked battles.
```

### Inventory Items

When a player tries to queue with banned items:

```
Cannot join queue - Remove banned items from inventory:
• mega_showdown:tera_orb
• mega_showdown:dynamax_band
```

---

## Best Practices

| Recommendation | Reason |
|----------------|--------|
| Always block PC access | Prevents team changes mid-queue |
| Always block move swap | Prevents moveset manipulation |
| Block teleport commands | Prevents leaving arena |
| Keep arena restrictions strict | Ensures fair battles |
| Document blocked items | Communicate rules to players |

---

## See Also

- [Blacklist Configuration](../configuration/blacklist.md) - Pokemon/move/item bans
- [Battle Formats](battle-formats.md) - Format-specific rules
- [Arenas](../configuration/arenas.md) - Battle location setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
