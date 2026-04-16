---
title: Arena Setup
description: Configure battle arenas for CobbleRanked.
---

Arenas are where battles take place. Configure them in `config/cobbleranked/arenas.yaml`.

## Quick Setup

The fastest way to set up an arena:

1. Stand at Player 1's position
2. Run `/rankedadmin setArena myarena pos1`
3. Move to Player 2's position
4. Run `/rankedadmin setArena myarena pos2`
5. Move to the exit location
6. Run `/rankedadmin setArena myarena exit`

## Arena Structure

```yaml
# arenas.yaml
selectionMode: "RANDOM"  # or "SEQUENTIAL"

arenas:
  - name: "grass_arena"
    world: "minecraft:overworld"
    enabled: true
    player1Position:
      x: 100.5
      y: 64.0
      z: 100.5
      yaw: 0.0
      pitch: 0.0
    player2Position:
      x: 110.5
      y: 64.0
      z: 100.5
      yaw: 180.0
      pitch: 0.0
    exitPosition:
      x: 0.5
      y: 64.0
      z: 0.5
      yaw: 0.0
      pitch: 0.0
```

## Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `selectionMode` | string | How arenas are chosen: `RANDOM` or `SEQUENTIAL` |
| `name` | string | Unique arena identifier |
| `world` | string | World identifier |
| `enabled` | boolean | Whether this arena is active |
| `player1Position` | object | Spawn position for player 1 |
| `player2Position` | object | Spawn position for player 2 |
| `exitPosition` | object | Where players teleport after battle |

### Position Fields

| Field | Type | Description |
|-------|------|-------------|
| `x` | float | X coordinate |
| `y` | float | Y coordinate |
| `z` | float | Z coordinate |
| `yaw` | float | Horizontal rotation (0-360) |
| `pitch` | float | Vertical rotation (-90 to 90) |

## World Identifiers

| World Type | Identifier |
|------------|------------|
| Overworld | `minecraft:overworld` |
| Nether | `minecraft:the_nether` |
| End | `minecraft:the_end` |
| Custom | `modid:dimension_name` |

## Multiple Arenas

Add more entries under `arenas:` for parallel battles. Each arena needs its own `name`, `world`, positions, and `enabled` flag.

## Admin Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> pos1` | Set player 1 spawn |
| `/rankedadmin setArena <name> pos2` | Set player 2 spawn |
| `/rankedadmin setArena <name> exit` | Set exit location |
| `/rankedadmin setArena <name> spectator` | Set spectator position |
| `/rankedadmin setArena <name> setcenter [radius]` | Set field effect center (default radius: 8) |
| `/rankedadmin setexit` | Set global exit position |
| `/rankedadmin arena status` | View all arena statuses |
| `/rankedadmin arena enable <name>` | Enable an arena |
| `/rankedadmin arena disable <name>` | Disable an arena |
| `/rankedadmin teleportArena <name>` | Teleport to arena |

## Arena Design Tips

- Place players facing each other (180° yaw difference)
- Recommended distance: 8-12 blocks apart
- Build walls to prevent escape

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions and troubleshooting
