# Arena Configuration

Complete reference for `config/cobbleranked/arenas.yaml` and arena commands.

---

## Overview

Arenas are designated battle locations where players teleport for ranked matches.

---

## Arena Setup Commands

Use admin commands to create and manage arenas:

### Create Arena Positions

Stand at each location and run:

```bash
# Player 1 position (where first player spawns)
/rankedadmin setArena <arena_name> pos1

# Player 2 position (where second player spawns)
/rankedadmin setArena <arena_name> pos2

# Exit position (where players return after battle)
/rankedadmin setArena <arena_name> exit

# Spectator position (optional)
/rankedadmin setArena <arena_name> spectator
```

**Example:**

```bash
/rankedadmin setArena grass_arena pos1
/rankedadmin setArena grass_arena pos2
/rankedadmin setArena grass_arena exit
```

### Arena Management

```bash
# View all arenas and their status
/rankedadmin arena status

# Enable an arena
/rankedadmin arena enable <arena_name>

# Disable an arena (maintenance)
/rankedadmin arena disable <arena_name>

# Set arena center and radius
/rankedadmin arena setcenter <arena_name> [radius]

# Teleport to an arena
/rankedadmin teleportArena <arena_name>

# Reset arena in-use status (if stuck)
/rankedadmin arena reset
```

---

## Configuration File

Arenas are stored in `config/cobbleranked/arenas.yaml`:

```yaml
# Selection mode: RANDOM or SEQUENTIAL
selectionMode: "RANDOM"

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

### Settings

| Setting | Description |
|---------|-------------|
| `selectionMode` | How arenas are selected (`RANDOM` or `SEQUENTIAL`) |
| `name` | Unique arena identifier |
| `world` | Dimension (e.g., `minecraft:overworld`, `minecraft:the_nether`) |
| `enabled` | Whether arena is available for matches |
| `player1Position` | First player spawn point |
| `player2Position` | Second player spawn point |
| `exitPosition` | Return location after battle |

### Position Properties

| Property | Description |
|----------|-------------|
| `x`, `y`, `z` | Coordinates (use 0.5 for block center) |
| `yaw` | Horizontal rotation (0 = south, 90 = west, 180 = north, 270 = east) |
| `pitch` | Vertical rotation (0 = straight, positive = down, negative = up) |

---

## Arena Design Tips

### Position Layout

Players should face each other:

```
Player 1 (yaw: 0)     Player 2 (yaw: 180)
    ↓                      ↓
   [P1] ←--- 10 blocks ---→ [P2]
```

### Recommended Dimensions

| Arena Type | Minimum Size |
|------------|--------------|
| Singles | 15 x 15 blocks |
| Doubles | 20 x 20 blocks |
| Triples | 25 x 25 blocks |

### Cross-Dimension Arenas

Arenas can be in different dimensions:

```yaml
arenas:
  - name: "nether_arena"
    world: "minecraft:the_nether"
    enabled: true
    player1Position:
      x: 100.5
      y: 70.0
      z: 100.5
      yaw: 0.0
      pitch: 0.0
```

---

## Multiple Arenas

Create multiple arenas for variety:

```yaml
selectionMode: "RANDOM"

arenas:
  - name: "grass_arena"
    world: "minecraft:overworld"
    enabled: true
    # ... positions

  - name: "desert_arena"
    world: "minecraft:overworld"
    enabled: true
    # ... positions

  - name: "nether_arena"
    world: "minecraft:the_nether"
    enabled: true
    # ... positions

  - name: "end_arena"
    world: "minecraft:the_end"
    enabled: false  # Disabled for maintenance
    # ... positions
```

---

## Global Exit Position

Set a global exit position for all arenas:

```bash
/rankedadmin setexit
```

Players return here if arena-specific exit position is not set.

---

## Troubleshooting

### Arena Not Appearing

**Symptoms:** Arena doesn't show in status

**Solutions:**
1. Verify you ran all position commands (pos1, pos2, exit)
2. Check `arenas.yaml` for syntax errors
3. Reload config: `/rankedadmin reload`

### Players Stuck in Arena

**Symptoms:** Players don't teleport back

**Solutions:**
1. Run `/rankedadmin arena reset`
2. Set exit position: `/rankedadmin setArena <name> exit`

### Wrong Dimension Teleport

**Symptoms:** Players teleport to wrong world

**Solutions:**
1. Check `world` field in arena config
2. Ensure world is loaded
3. Use correct dimension ID (e.g., `minecraft:overworld`)

---

## Full Example

<details>
<summary><strong>Complete arenas.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Arena Configuration

selectionMode: "RANDOM"

arenas:
  - name: "main_arena"
    world: "minecraft:overworld"
    enabled: true
    player1Position:
      x: 100.5
      y: 64.0
      z: 100.5
      yaw: 0.0
      pitch: 0.0
    player2Position:
      x: 115.5
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

  - name: "indoor_arena"
    world: "minecraft:overworld"
    enabled: true
    player1Position:
      x: 200.5
      y: 70.0
      z: 200.5
      yaw: 90.0
      pitch: 0.0
    player2Position:
      x: 200.5
      y: 70.0
      z: 215.5
      yaw: 270.0
      pitch: 0.0
    exitPosition:
      x: 0.5
      y: 64.0
      z: 0.5
      yaw: 0.0
      pitch: 0.0
```

</details>

---

## See Also

- [Quick Start](../getting-started/quick-start.md) - First arena setup
- [Commands](../getting-started/commands.md) - All admin commands
- [Restrictions](restrictions.md) - Arena restrictions
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
