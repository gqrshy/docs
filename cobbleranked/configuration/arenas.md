# Arena Configuration

Learn how to set up battle arenas for ranked matches.

## File Location

`config/cobbleranked/arenas.json5`

## Overview

Arenas are physical locations where ranked battles take place. When a match is found, both players are teleported to a randomly selected arena.

**Key Features:**
- Multiple arenas supported
- Random arena selection
- Cross-dimensional support (Overworld, Nether, End, custom dimensions)
- Automatic teleportation
- Return to previous location after battle

## Quick Start

### Create Your First Arena

1. **Build your arena** in-game (or use an existing location)
2. **Stand at the spawn point** where you want players to appear
3. **Run the command:**
   ```
   /rankedadmin arena set main_arena
   ```

That's it! Your arena is now configured.

### Verify Arena

List all configured arenas:
```
/rankedadmin arena list
```

Output:
```
Configured Arenas (1):
  1. main_arena (world: minecraft:overworld, x: 100, y: 64, z: 200)
```

## Arena Management

### Add Multiple Arenas

CobbleRanked randomly selects from available arenas for variety:

```bash
/rankedadmin arena set volcano_arena
/rankedadmin arena set ice_arena
/rankedadmin arena set forest_arena
/rankedadmin arena set desert_arena
```

**Recommendation:** Create at least 3-5 arenas for variety.

### Remove an Arena

Delete an arena configuration:

```
/rankedadmin arena remove old_arena
```

**Warning:** This does not delete the physical build, only removes it from rotation.

### Teleport to Arena

Preview an arena location:

```
/rankedadmin arena tp main_arena
```

Useful for:
- Testing spawn points
- Showing off arenas to players
- Quick travel for admins

### List All Arenas

View all configured arenas:

```
/rankedadmin arena list
```

Output shows:
- Arena name
- World/dimension
- Coordinates (x, y, z)

## File Format

### JSON5 Structure

<details>
<summary><strong>Click to view full arenas.json5 structure</strong></summary>

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  BATTLE ARENAS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "arenas": [
    {
      "name": "main_arena",
      "world": "minecraft:overworld",
      "x": 100.5,
      "y": 64.0,
      "z": 200.5,
      "yaw": 180.0,        // Player facing direction (0-360)
      "pitch": 0.0         // Player head tilt (-90 to 90)
    },
    {
      "name": "nether_arena",
      "world": "minecraft:the_nether",
      "x": 50.5,
      "y": 80.0,
      "z": -150.5,
      "yaw": 0.0,
      "pitch": 0.0
    }
  ]
}
```

</details>

### Field Reference

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | String | Unique arena identifier | `"main_arena"` |
| `world` | String | Minecraft dimension ID | `"minecraft:overworld"` |
| `x` | Number | X coordinate | `100.5` |
| `y` | Number | Y coordinate (height) | `64.0` |
| `z` | Number | Z coordinate | `200.5` |
| `yaw` | Number | Player facing direction (0-360) | `180.0` |
| `pitch` | Number | Player head tilt (-90 to 90) | `0.0` |

### Dimension IDs

Common dimension identifiers:

| Dimension | ID |
|-----------|-----|
| Overworld | `minecraft:overworld` |
| Nether | `minecraft:the_nether` |
| End | `minecraft:the_end` |
| Custom | `modname:dimension_name` |

## Arena Design Guidelines

### Size Recommendations

| Battle Format | Recommended Size |
|---------------|------------------|
| Singles (1v1) | 20x20 blocks |
| Doubles (2v2) | 25x25 blocks |

**Note:** Design your arena with enough space for spectating players and aesthetic elements.

## Spawn Point Positioning

### Player Placement

When creating an arena, players spawn at:
- **Exact coordinates** specified in config
- **Facing direction** based on `yaw` value
- **Head tilt** based on `pitch` value

<details>
<summary><strong>Understanding Yaw and Pitch (Click to expand)</strong></summary>

### Understanding Yaw and Pitch

**Yaw** controls the horizontal direction (left-right rotation):
- Think of it as a compass direction
- `0°` = South, `90°` = West, `180°` = North, `270°` or `-90°` = East

**Pitch** controls the vertical angle (up-down tilt):
- Think of it as looking up or down
- `-90°` = Looking straight up at the sky
- `0°` = Looking straight ahead (horizontal)
- `90°` = Looking straight down at the ground

### Yaw (Horizontal Direction)

Visual guide using Minecraft compass directions:

```
        North
       (180°)
          ↑
          |
West ←────┼────→ East
(90°)     |    (270° or -90°)
          |
          ↓
       South
        (0°)
```

**Common Values:**
- `0.0` → Player faces **South** ⬇️
- `90.0` → Player faces **West** ⬅️
- `180.0` → Player faces **North** ⬆️
- `270.0` or `-90.0` → Player faces **East** ➡️

**Tip:** To find the right yaw value, stand where you want players to spawn, face the direction you want them to look, and press **F3**. Look for "Facing: [direction] (X: yaw)" in the debug screen.

### Pitch (Vertical Angle)

```
     -90° ↑  (Looking straight up)
          |
          |
       0° →  (Looking straight ahead - RECOMMENDED)
          |
          |
      90° ↓  (Looking straight down)
```

**Common Values:**
- `-90.0` → Looking straight **up** (useful for sky arenas)
- `0.0` → Looking **straight ahead** (default for battles) ✅
- `45.0` → Looking **slightly down**
- `90.0` → Looking straight **down** (bird's eye view)

**Recommendation:** Use `0.0` pitch for normal battles to provide a natural perspective.

</details>

## Advanced Configuration

<details>
<summary><strong>Manual JSON5 Editing</strong></summary>

You can manually edit `arenas.json5` for bulk changes:

```json5
{
  "arenas": [
    {
      "name": "arena_1",
      "world": "minecraft:overworld",
      "x": 100.5,
      "y": 64.0,
      "z": 200.5,
      "yaw": 180.0,
      "pitch": 0.0
    },
    // Copy and modify for multiple arenas
    {
      "name": "arena_2",
      "world": "minecraft:overworld",
      "x": 300.5,
      "y": 64.0,
      "z": 200.5,
      "yaw": 180.0,
      "pitch": 0.0
    }
  ]
}
```

**After editing:**
```
/rankedadmin reload
```

</details>

<details>
<summary><strong>WorldGuard Integration</strong></summary>

### WorldGuard Integration

Protect arenas from griefing:

```bash
# Create region
//pos1
//pos2
/region define main_arena

# Prevent block breaking/placing
/region flag main_arena build deny

# Prevent PvP (battle uses Cobblemon, not PvP)
/region flag main_arena pvp deny

# Prevent mob spawning
/region flag main_arena mob-spawning deny
```

</details>

<details>
<summary><strong>Arena Selection Logic</strong></summary>

### Arena Selection Logic

How CobbleRanked chooses arenas:

1. **Load all arenas** from `arenas.json5`
2. **Filter valid arenas** (world exists, coordinates valid)
3. **Random selection** from valid arenas
4. **Teleport both players** to selected arena
5. **Start battle** immediately

**Weighting:** All arenas have equal probability (no weighting system).

</details>

<details>
<summary><strong>Return System</strong></summary>

## Return System

After battle ends:

1. **Battle concludes** (win/loss/draw/flee)
2. **Players return** to their previous location
3. **Previous location:** Where they were when battle started
4. **Dimension preserved:** Returns to correct world

**Example:**
- Player was in Nether at `(100, 64, 200)`
- Battle teleports to Overworld arena
- After battle, returns to Nether `(100, 64, 200)`

</details>

## Examples

### Single Arena Setup

Minimal configuration for testing:

```json5
{
  "arenas": [
    {
      "name": "test_arena",
      "world": "minecraft:overworld",
      "x": 0.5,
      "y": 100.0,
      "z": 0.5,
      "yaw": 0.0,
      "pitch": 0.0
    }
  ]
}
```

### Multi-Arena Setup

<details>
<summary><strong>Click to view production multi-arena example</strong></summary>

Production server with variety across multiple dimensions:

```json5
{
  "arenas": [
    {
      "name": "volcano_arena",
      "world": "minecraft:overworld",
      "x": 1000.5,
      "y": 64.0,
      "z": 1000.5,
      "yaw": 180.0,
      "pitch": 0.0
    },
    {
      "name": "ice_arena",
      "world": "minecraft:overworld",
      "x": -500.5,
      "y": 70.0,
      "z": -500.5,
      "yaw": 90.0,
      "pitch": 0.0
    },
    {
      "name": "forest_arena",
      "world": "minecraft:overworld",
      "x": 200.5,
      "y": 65.0,
      "z": 800.5,
      "yaw": 0.0,
      "pitch": 0.0
    },
    {
      "name": "nether_arena",
      "world": "minecraft:the_nether",
      "x": 50.5,
      "y": 80.0,
      "z": 50.5,
      "yaw": 180.0,
      "pitch": 0.0
    },
    {
      "name": "end_arena",
      "world": "minecraft:the_end",
      "x": 0.5,
      "y": 50.0,
      "z": 0.5,
      "yaw": 0.0,
      "pitch": 0.0
    }
  ]
}
```

</details>

<details>
<summary><strong>Performance Considerations</strong></summary>

## Performance Considerations

### Number of Arenas

- **1-5 arenas:** Negligible performance impact
- **5-20 arenas:** No noticeable impact
- **20+ arenas:** Minimal impact (arena selection is O(n) random)

**Recommendation:** 5-10 arenas is ideal for variety without overwhelming.

### Cross-Dimensional Arenas

Teleporting across dimensions:
- **Chunk loading:** May cause brief delay (< 1 second)
- **Render distance:** Players may see chunks loading
- **TPS impact:** Negligible on modern servers

**Best Practice:** Pre-load arena chunks using chunk loaders.

</details>

---

## See Also

- [FAQ & Troubleshooting](../support/faq.md) - Common issues and solutions
- [Rewards System](rewards.md) - Season and milestone rewards
- [Commands](../getting-started/commands.md) - Arena management commands
