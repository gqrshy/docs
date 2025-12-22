# Player Restrictions

Complete reference for `config/cobbleranked/restrictions.yaml`.

---

## Overview

Player restrictions control what actions are blocked during queue and battle.

---

## Queue Restrictions

Actions blocked while waiting in matchmaking queue:

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
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "tpa"
    - "pc"
    - "pokeheal"
```

---

## Arena Restrictions

Actions blocked during battle (more restrictive):

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
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "tpa"
    - "pc"
    - "pokeheal"
    - "heal"
    - "feed"
    - "fly"
    - "gamemode"
    - "gm"
    - "ranked"
    - "casual"
```

---

## Restriction Types

| Restriction | Description |
|-------------|-------------|
| `blockItemUse` | Block right-click item usage |
| `blockItemDrop` | Block dropping items |
| `blockItemPickup` | Block picking up items |
| `blockEquipmentChange` | Block armor/equipment changes |
| `blockBlockBreak` | Block breaking blocks |
| `blockBlockPlace` | Block placing blocks |
| `blockBlockInteract` | Block interacting with blocks (doors, levers) |
| `blockContainerAccess` | Block opening chests, barrels |
| `blockEntityInteract` | Block interacting with entities |
| `blockEntityDamage` | Block damaging entities |
| `blockEntityMount` | Block mounting entities (horses, boats) |
| `blockPvp` | Block player vs player combat |
| `blockPve` | Block player vs environment combat |
| `blockProjectileLaunch` | Block throwing items (ender pearls, potions) |
| `blockTeleport` | Block teleportation |
| `blockPortalUse` | Block using portals |
| `blockFlight` | Block creative/elytra flight |
| `blockPcAccess` | Block Cobblemon PC access |
| `blockMoveSwap` | Block swapping Pokemon moves |

---

## Command Blocking

Block specific commands during queue or battle:

```yaml
blockedCommands:
  - "tp"        # /tp command
  - "teleport"  # Alternative tp command
  - "spawn"     # Spawn teleport
  - "home"      # Home teleport
  - "warp"      # Warp command
  - "tpa"       # Teleport request
  - "pc"        # Cobblemon PC
  - "pokeheal"  # Pokemon healing
```

> 📝 **Note:** Commands are listed without the leading slash.

---

## Configuration Examples

<details>
<summary><strong>Relaxed Queue Restrictions</strong></summary>

```yaml
queue:
  blockItemUse: false
  blockItemDrop: false
  blockBlockBreak: false
  blockBlockPlace: false
  blockPvp: false
  blockTeleport: true      # Still block teleport
  blockPortalUse: true     # Still block portals
  blockPcAccess: true      # Still block PC
  blockedCommands:
    - "tp"
    - "home"
    - "spawn"
```

</details>

<details>
<summary><strong>Strict Battle Restrictions</strong></summary>

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
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "tpa"
    - "pc"
    - "pokeheal"
    - "heal"
    - "feed"
    - "fly"
    - "gamemode"
    - "gm"
    - "ranked"
    - "casual"
    - "kit"
    - "enderchest"
    - "ec"
```

</details>

---

## Full Example

<details>
<summary><strong>Complete restrictions.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Player Restrictions

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
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "tpa"
    - "pc"
    - "pokeheal"

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
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "tpa"
    - "pc"
    - "pokeheal"
    - "heal"
    - "feed"
    - "fly"
    - "gamemode"
    - "gm"
    - "ranked"
    - "casual"
```

</details>

---

## See Also

- [Battle Config](battle.md) - Battle settings
- [Arenas](arenas.md) - Arena setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
