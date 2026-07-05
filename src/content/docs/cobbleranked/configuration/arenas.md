---
title: Arena Setup
description: Configure battle arenas for CobbleRanked.
---

Arenas are where battles take place. Configure them in `config/cobbleranked/arenas.yaml`.

## Quick Setup

The fastest way to set up an arena:

1. Stand at Player 1's position
2. Run `/rankedadmin arena create myarena pos1`
3. Move to Player 2's position
4. Run `/rankedadmin arena create myarena pos2`
5. Move to the exit location
6. Run `/rankedadmin arena create myarena exit`

> 📝 The exit step records both the position **and the dimension** you're standing in. Stand in your lobby dimension (even a different one from the arena) to set up a **cross-dimension exit** — for example, return players from a Nether arena back to an Overworld lobby. If you skip the exit step entirely, players are returned to wherever they were before the match.

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
    # exitPosition and exitWorld are optional. If omitted, players return to
    # their pre-match location after the battle.
    exitPosition:
      x: 0.5
      y: 64.0
      z: 0.5
      yaw: 0.0
      pitch: 0.0
    exitWorld: "minecraft:overworld"   # optional, supports cross-dimension exits
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
| `exitPosition` | object (optional) | Where players teleport after battle. Omit to restore the pre-match location. |
| `exitWorld` | string (optional) | Destination dimension for the exit. Defaults to the arena's `world`. Supports cross-dimension exits (e.g. battle in a Nether arena, return to an Overworld lobby). |

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
| `/rankedadmin arena create <name> pos1` | Set player 1 spawn |
| `/rankedadmin arena create <name> pos2` | Set player 2 spawn |
| `/rankedadmin arena create <name> exit` | Set exit location |
| `/rankedadmin arena create <name> spectator` | Set spectator position |
| `/rankedadmin arena setcenter <name> [radius]` | Set field effect center (default radius: 8) |
| `/rankedadmin arena setexit <name>` | Set the exit position for an arena |
| `/rankedadmin arena status` | View all arena statuses |
| `/rankedadmin arena enable <name>` | Enable an arena |
| `/rankedadmin arena disable <name>` | Disable an arena |
| `/rankedadmin arena teleport <name>` | Teleport to an arena |
| `/rankedadmin arena reset` | Reset all arena in-use flags |

## Arena Design Tips

- Place players facing each other (180° yaw difference)
- Recommended distance: 8-12 blocks apart
- Build walls to prevent escape

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions and troubleshooting
