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

Define multiple arenas for parallel battles:

```yaml
arenas:
  - name: "arena_1"
    world: "minecraft:overworld"
    enabled: true
    player1Position:
      x: 100.0
      y: 65.0
      z: 200.0
      yaw: 0.0
      pitch: 0.0
    player2Position:
      x: 100.0
      y: 65.0
      z: 210.0
      yaw: 180.0
      pitch: 0.0
    exitPosition:
      x: 0.0
      y: 65.0
      z: 0.0
      yaw: 0.0
      pitch: 0.0

  - name: "arena_2"
    world: "minecraft:overworld"
    enabled: true
    player1Position:
      x: 200.0
      y: 65.0
      z: 200.0
      yaw: 0.0
      pitch: 0.0
    player2Position:
      x: 200.0
      y: 65.0
      z: 210.0
      yaw: 180.0
      pitch: 0.0
    exitPosition:
      x: 0.0
      y: 65.0
      z: 0.0
      yaw: 0.0
      pitch: 0.0
```

## Admin Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> pos1` | Set player 1 spawn |
| `/rankedadmin setArena <name> pos2` | Set player 2 spawn |
| `/rankedadmin setArena <name> exit` | Set exit location |
| `/rankedadmin setArena <name> spectator` | Set spectator position |
| `/rankedadmin arena status` | View all arena statuses |
| `/rankedadmin arena enable <name>` | Enable an arena |
| `/rankedadmin arena disable <name>` | Disable an arena |
| `/rankedadmin teleportArena <name>` | Teleport to arena |

## Arena Design Tips

### Player Positioning

- Place players facing each other (180° difference in yaw)
- Recommended distance: 8-12 blocks apart
- Ensure flat ground at spawn points

### Yaw Reference

| Direction | Yaw |
|-----------|-----|
| South (+Z) | 0° |
| West (-X) | 90° |
| North (-Z) | 180° |
| East (+X) | 270° |

### Arena Environment

- Build walls to prevent escape
- Add seating for spectators
- Good lighting for visibility
- Consider barrier blocks for boundaries

---

## See Also

- [Main Configuration](config/) - General settings
- [FAQ](../support/faq/) - Common questions and troubleshooting
