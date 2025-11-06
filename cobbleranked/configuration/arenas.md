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

## Spawn Point Positioning

### Player Placement

When creating an arena, players spawn at:
- **Exact coordinates** specified in config
- **Facing direction** based on `yaw` value
- **Head tilt** based on `pitch` value

### Yaw (Facing Direction)

```
     North (180°)
          |
West (90°)—+— East (-90° or 270°)
          |
     South (0°)
```

**Examples:**
- `0.0` - Facing south
- `90.0` - Facing west
- `180.0` - Facing north
- `-90.0` or `270.0` - Facing east

### Pitch (Head Tilt)

```
-90° = Looking straight up
  0° = Looking straight ahead
 90° = Looking straight down
```

**Recommendation:** Use `0.0` pitch for normal battles.

## Advanced Configuration

### Manual JSON5 Editing

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

### Arena Selection Logic

How CobbleRanked chooses arenas:

1. **Load all arenas** from `arenas.json5`
2. **Filter valid arenas** (world exists, coordinates valid)
3. **Random selection** from valid arenas
4. **Teleport both players** to selected arena
5. **Start battle** immediately

**Weighting:** All arenas have equal probability (no weighting system).

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

## Troubleshooting

### Players not teleporting

**Symptom:** Match found but players stay in place

**Solution:**
1. Check arena exists: `/rankedadmin arena list`
2. Verify world is loaded
3. Check console for errors
4. Test arena: `/rankedadmin arena tp arena_name`

### Invalid world error

**Symptom:** `World 'modname:dimension' does not exist`

**Solution:**
1. Check dimension ID spelling in `arenas.json5`
2. Ensure dimension mod is installed
3. Use correct format: `modname:dimension_name` (no spaces)

### Players spawn in wrong location

**Symptom:** Players spawn in blocks or fall

**Solution:**
1. Re-create arena: Stand at correct spot, `/rankedadmin arena set arena_name`
2. Verify Y coordinate is correct (ground level, not underground)
3. Check `arenas.json5` coordinates manually

### Arena not in rotation

**Symptom:** Specific arena never selected

**Solution:**
1. Verify arena in list: `/rankedadmin arena list`
2. Check world is loaded (cross-dimensional arenas)
3. Reload config: `/rankedadmin reload`

### Coordinates off-center

**Symptom:** Players spawn at edge of arena

**Solution:**

Coordinates save with decimals:
- Stand at exact center
- Use F3 coordinates
- Manually edit `arenas.json5` to `.5` decimal (e.g., `100.5` centers on block)

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

Production server with variety:

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

---

**Next:** Configure [Rewards System](rewards.md) for season and milestone rewards.
