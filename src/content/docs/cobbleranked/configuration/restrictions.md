---
title: Restrictions Configuration
description: Control player actions during ranked queue and battles to prevent cheating.
---

Prevent cheating and ensure fair play. Restrict what players can do while in queue or during battle.

File: `config/cobbleranked/restrictions.yaml`

## Why Restrictions?

Competitive integrity matters. Restrictions prevent players from:

- **Swapping Pokemon mid-match**: Changing teams after seeing opponent
- **Healing during battle**: Using potions or PC to gain unfair advantage
- **Escaping losing battles**: Teleporting away to avoid defeat
- **Interfering with arena**: Breaking blocks or accessing storage during match

## Restriction Levels

CobbleRanked applies different restrictions based on player state:

| Level | When Applied | Purpose |
|-------|--------------|---------|
| **NONE** | Default | No restrictions |
| **QUEUE** | Waiting in matchmaking queue | Prevent pre-battle prep |
| **ARENA** | During active battle | Full competitive restrictions |
| **READY_CHECK** | In match ready GUI | Same as arena (prevent last-second changes) |

Players automatically transition between levels:
1. Join queue → **QUEUE** restrictions
2. Match found → **ARENA** restrictions
3. Battle ends → **NONE** (back to normal)

## Configuration Structure

```yaml
# restrictions.yaml
queue:
  # Item Actions
  blockItemUse: false
  blockItemDrop: false
  blockItemPickup: false
  blockEquipmentChange: true

  # World Interaction
  blockBlockBreak: false
  blockBlockPlace: false
  blockBlockInteract: false
  blockContainerAccess: false

  # Entity Interaction
  blockEntityInteract: false
  blockEntityDamage: false
  blockEntityMount: false

  # Combat
  blockPvp: false
  blockPve: false
  blockProjectileLaunch: false

  # Movement
  blockTeleport: true
  blockPortalUse: true
  blockFlight: false

  # Cobblemon Specific
  blockPcAccess: true
  blockMoveSwap: true

  # Blocked Commands
  blockedCommands:
    - "tp"
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "pc"
    - "pokeheal"

arena:
  # Same structure, more restrictive
  blockItemUse: true
  blockItemDrop: true
  # ... (see below)
```

## Queue Restrictions

Applied while player waits in matchmaking queue. More relaxed than arena, but prevents significant advantages.

### Recommended Settings

| Setting | Recommended | Reason |
|---------|-------------|--------|
| `blockEquipmentChange` | `true` | Prevent swapping held items before match |
| `blockTeleport` | `true` | Prevent queue dodging by teleporting away |
| `blockPortalUse` | `true` | Prevent entering Nether/End while queued |
| `blockPcAccess` | `true` | Prevent changing Pokemon team |
| `blockMoveSwap` | `true` | Prevent modifying moves before battle |

### Permissive Options

Keep these `false` during queue:
- `blockItemUse`: Let players use items while waiting
- `blockBlockBreak/Place`: Allow building/mining
- `blockPvp/Pve`: Allow engaging in other combat

## Arena Restrictions

Applied during active ranked battle. Should be strict to ensure competitive integrity.

### Required Settings

Set all these to `true` for competitive play:

```yaml
arena:
  # Items: No using items during battle
  blockItemUse: true
  blockItemDrop: true
  blockItemPickup: true
  blockEquipmentChange: true

  # World: No interfering with arena
  blockBlockBreak: true
  blockBlockPlace: true
  blockBlockInteract: true
  blockContainerAccess: true

  # Entities: No external interference
  blockEntityInteract: true
  blockEntityDamage: true
  blockEntityMount: true

  # Combat: Battle only happens in the arena
  blockPvp: true
  blockPve: true
  blockProjectileLaunch: true

  # Movement: No escaping
  blockTeleport: true
  blockPortalUse: true
  blockFlight: true

  # Cobblemon: No changing Pokemon mid-battle
  blockPcAccess: true
  blockMoveSwap: true
```

## Command Blocking

Prevent specific commands from executing while restricted.

```yaml
blockedCommands:
  - "tp"           # Teleport commands
  - "teleport"
  - "spawn"        # Spawn teleport
  - "home"         # Home/warp commands
  - "warp"
  - "tpa"
  - "pc"           # Cobblemon PC
  - "pokeheal"     # Healing commands
```

### Arena-Only Commands

Arena level should block additional commands:

```yaml
arena:
  blockedCommands:
    # ... queue commands ...
    - "heal"         # Extra healing
    - "feed"         # Feeding
    - "fly"          # Flight
    - "gamemode"     # Gamemode switching
    - "gm"
    - "ranked"       # Prevent re-joining during battle
    - "casual"
```

**Important:** Commands are blocked silently. Players see a message that the command is restricted during ranked battles.

## Restriction Categories

### Item Actions

| Setting | What It Blocks |
|---------|----------------|
| `blockItemUse` | Right-clicking items (eating potions, using tools) |
| `blockItemDrop` | Dropping items from inventory (Q key) |
| `blockItemPickup` | Picking up items from ground |
| `blockEquipmentChange` | Changing armor, off-hand, or hotbar items |

### World Interaction

| Setting | What It Blocks |
|---------|----------------|
| `blockBlockBreak` | Breaking blocks (mining) |
| `blockBlockPlace` | Placing blocks (building) |
| `blockBlockInteract` | Right-clicking blocks (doors, buttons, levers) |
| `blockContainerAccess` | Opening chests, barrels, shulker boxes |

### Entity Interaction

| Setting | What It Blocks |
|---------|----------------|
| `blockEntityInteract` | Right-clicking entities (villagers, Pokemon) |
| `blockEntityDamage` | Attacking entities (wild Pokemon, animals) |
| `blockEntityMount` | Riding horses, boats, minecarts |

### Movement

| Setting | What It Blocks |
|---------|----------------|
| `blockTeleport` | All teleportation (commands, items, portals) |
| `blockPortalUse` | Nether portals, End portals |
| `blockFlight` | Creative flight, elytra flying |

### Cobblemon Specific

| Setting | What It Blocks |
|---------|----------------|
| `blockPcAccess` | Opening Pokemon PC to change team |
| `blockMoveSwap` | Changing Pokemon moves in party view |

## Advanced: Custom Restriction Levels

The restriction system is extensible. You can modify which restrictions apply at each level by editing `restrictions.yaml`.

### Example: Permissive Queue

Allow players to build and explore while waiting:

```yaml
queue:
  blockBlockBreak: false
  blockBlockPlace: false
  blockBlockInteract: false
  blockContainerAccess: false
  blockPvp: false      # Allow PvP while waiting
  blockPve: false      # Allow fighting wild Pokemon
```

### Example: Strict Queue

Prevent any actions besides chatting:

```yaml
queue:
  blockItemUse: true
  blockBlockBreak: true
  blockBlockPlace: true
  blockEntityDamage: true
  # ... enable most restrictions
```

## Troubleshooting

**Players can't use commands during battle:**
- Check `blockedCommands` list in `restrictions.yaml`
- Remove commands you want to allow

**Players can still change Pokemon:**
- Ensure `blockPcAccess: true` in both queue and arena sections

**Restrictions not working:**
- Run `/rankedadmin reload` to apply config changes
- Check server console for errors loading restrictions.yaml

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [Arena Setup](/docs/cobbleranked/configuration/arenas/) - Battle location configuration
- [Troubleshooting](/docs/cobbleranked/support/troubleshooting/) - Common issues
