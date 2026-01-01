---
title: Arena Setup
description: Configure battle arenas for CobbleRanked.
---

Arenas are where battles take place. Configure them in `config/cobbleranked/arenas.yaml`.

## Basic Arena Structure

```yaml
arenas:
  arena_id:
    name: "Display Name"
    world: "minecraft:overworld"
    player1:
      x: 100.0
      y: 65.0
      z: 200.0
      yaw: 0.0
      pitch: 0.0
    player2:
      x: 100.0
      y: 65.0
      z: 210.0
      yaw: 180.0
      pitch: 0.0
```

## Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `arena_id` | string | Unique identifier (no spaces) |
| `name` | string | Display name shown in GUIs |
| `world` | string | World identifier |
| `player1` | object | Position for player 1 |
| `player2` | object | Position for player 2 |

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

You can define multiple arenas for parallel battles:

```yaml
arenas:
  arena_1:
    name: "Arena 1"
    world: "minecraft:overworld"
    player1:
      x: 100.0
      y: 65.0
      z: 200.0
      yaw: 0.0
    player2:
      x: 100.0
      y: 65.0
      z: 210.0
      yaw: 180.0

  arena_2:
    name: "Arena 2"
    world: "minecraft:overworld"
    player1:
      x: 200.0
      y: 65.0
      z: 200.0
      yaw: 0.0
    player2:
      x: 200.0
      y: 65.0
      z: 210.0
      yaw: 180.0
```

## Setting Up via Commands

The easiest way to set up arenas:

1. Stand at Player 1's position
2. Run `/rankedadmin setArena arena1 pos1`
3. Move to Player 2's position
4. Run `/rankedadmin setArena arena1 pos2`

## Arena Design Tips

### Player Positioning

- Place players facing each other (180° difference in yaw)
- Recommended distance: 8-12 blocks apart
- Ensure flat ground at spawn points
- Y coordinate should be at floor level + 0.0

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

## Testing Arenas

Use admin command to test:

```
/rankedadmin teleportArena arena_1
```

This teleports you to player1 position.

## Troubleshooting

### "No arenas available"

- Check arenas.yaml exists
- Verify YAML syntax is valid
- Ensure at least one arena is defined

### Players spawn in wrong location

- Check world identifier matches
- Verify coordinates are correct
- Ensure Y coordinate is at ground level

### Players face wrong direction

- Adjust yaw values
- Player 1 and 2 should face each other (180° difference)
