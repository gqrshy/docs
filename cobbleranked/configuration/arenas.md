# Arena Configuration

Learn how to set up battle arenas for ranked matches.

---

## Overview

Arenas are physical locations where ranked battles take place. When a match is found, players are teleported to a randomly selected arena.

**Key Features:**

- Multiple arenas supported
- Random arena selection
- Cross-dimensional support (Overworld, Nether, End, custom dimensions)
- Automatic teleportation
- Return to previous location after battle
- Battle camera support (optional)

---

## Quick Start

### Create Your First Arena

1. **Build your arena** in-game (or use an existing location)

2. **Stand at Player 1's spawn point** and run:

   ```text
   /rankedadmin setArena main_arena pos1
   ```

3. **Move to Player 2's spawn point** (facing Player 1) and run:

   ```text
   /rankedadmin setArena main_arena pos2
   ```

4. **Verify creation:**

   ```text
   /rankedadmin arena status
   ```

That's it! Your arena is now configured.

---

## Arena Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> pos1` | Set Player 1 spawn (Team 1) |
| `/rankedadmin setArena <name> pos2` | Set Player 2 spawn (Team 2) |
| `/rankedadmin setArena <name> pos3` | Set Player 3 spawn (Team 1 - MULTI) |
| `/rankedadmin setArena <name> pos4` | Set Player 4 spawn (Team 2 - MULTI) |
| `/rankedadmin arena status` | Show all arenas and their status |
| `/rankedadmin arena enable <name>` | Enable an arena |
| `/rankedadmin arena disable <name>` | Disable an arena (keeps config) |
| `/rankedadmin arena setcenter <name>` | Set battle camera center point |
| `/rankedadmin teleportArena <name>` | Teleport to arena's pos1 |
| `/rankedadmin setexit` | Set global exit location |

---

## MULTI Format Setup (4-Player Battles)

For MULTI format, set all 4 spawn positions:

```bash
# Team 1: pos1 + pos3 (facing Team 2)
/rankedadmin setArena multi_arena pos1
/rankedadmin setArena multi_arena pos3

# Team 2: pos2 + pos4 (facing Team 1)
/rankedadmin setArena multi_arena pos2
/rankedadmin setArena multi_arena pos4
```

**Position Layout:**

```text
      Team 1                    Team 2
  ┌─────────────┐          ┌─────────────┐
  │ pos1   pos3 │  ←─────→ │ pos2   pos4 │
  └─────────────┘  facing  └─────────────┘
```

> 📝 **Note:** If pos3/pos4 are not set, teammates are auto-positioned 2 blocks from pos1/pos2 (fallback mode).

---

## Adding Multiple Arenas

CobbleRanked randomly selects from available arenas for variety:

```bash
# Basic arenas (Singles/Doubles/Triples)
/rankedadmin setArena volcano_arena pos1
/rankedadmin setArena volcano_arena pos2

/rankedadmin setArena ice_arena pos1
/rankedadmin setArena ice_arena pos2

# MULTI-ready arena (4-player)
/rankedadmin setArena tournament_arena pos1
/rankedadmin setArena tournament_arena pos2
/rankedadmin setArena tournament_arena pos3
/rankedadmin setArena tournament_arena pos4
```

**Recommendation:** Create at least 3-5 arenas for variety.

---

## Battle Camera Setup (Optional)

For the battle camera feature, set where the camera should focus during battles:

1. **Stand at the center of your arena**

2. **Run:**

   ```text
   /rankedadmin arena setcenter main_arena
   ```

3. **Optionally set a custom radius:**

   ```text
   /rankedadmin arena setcenter main_arena 12
   ```

See [Battle Camera](../features/battle-camera.md) for detailed configuration.

---

## Exit Location

Set where players return if their original position is unavailable:

```text
/rankedadmin setexit
```

This sets the global exit location at your current position. Players will be teleported here if their original pre-battle location cannot be restored.

---

## Enable/Disable Arenas

Temporarily disable an arena without deleting it:

```bash
# Disable arena
/rankedadmin arena disable main_arena

# Enable arena
/rankedadmin arena enable main_arena
```

Disabled arenas are skipped during random selection.

---

## File Location

`config/cobbleranked/arenas.json5`

<details>
<summary><strong>Manual JSON5 Editing</strong></summary>

You can manually edit the arenas file for bulk changes:

```json5
{
  "arenas": [
    {
      "name": "main_arena",
      "displayName": "Main Arena",
      "enabled": true,
      "priority": 0,
      "pos1": {
        "x": 100.5,
        "y": 64.0,
        "z": 200.5,
        "yaw": 180.0,
        "pitch": 0.0,
        "world": "minecraft:overworld"
      },
      "pos2": {
        "x": 120.5,
        "y": 64.0,
        "z": 200.5,
        "yaw": 0.0,
        "pitch": 0.0,
        "world": "minecraft:overworld"
      },
      // pos3/pos4 for MULTI format (optional)
      "pos3": {
        "x": 102.5,
        "y": 64.0,
        "z": 200.5,
        "yaw": 180.0,
        "pitch": 0.0,
        "world": "minecraft:overworld"
      },
      "pos4": {
        "x": 122.5,
        "y": 64.0,
        "z": 200.5,
        "yaw": 0.0,
        "pitch": 0.0,
        "world": "minecraft:overworld"
      },
      "fieldEffectCenter": {
        "x": 110.5,
        "y": 64.0,
        "z": 200.5,
        "world": "minecraft:overworld"
      },
      "fieldEffectRadius": 8
    }
  ],
  "exitLocation": {
    "x": 0.0,
    "y": 64.0,
    "z": 0.0,
    "yaw": 0.0,
    "pitch": 0.0,
    "world": "minecraft:overworld"
  }
}
```

**After editing:**

```text
/rankedadmin reload
```

</details>

---

## Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Unique arena identifier |
| `displayName` | String | Display name (optional) |
| `enabled` | Boolean | Whether arena is active |
| `priority` | Number | Selection priority (higher = more likely) |
| `pos1` | Object | Player 1 spawn (Team 1) |
| `pos2` | Object | Player 2 spawn (Team 2) |
| `pos3` | Object | Player 3 spawn (Team 1 - MULTI, optional) |
| `pos4` | Object | Player 4 spawn (Team 2 - MULTI, optional) |
| `fieldEffectCenter` | Object | Battle camera center (optional) |
| `fieldEffectRadius` | Number | Battle camera radius (default: 8) |

### Position Object

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `x` | Number | X coordinate | `100.5` |
| `y` | Number | Y coordinate | `64.0` |
| `z` | Number | Z coordinate | `200.5` |
| `yaw` | Number | Horizontal rotation (0-360) | `180.0` |
| `pitch` | Number | Vertical rotation (-90 to 90) | `0.0` |
| `world` | String | Dimension ID | `"minecraft:overworld"` |

---

## Arena Design Guidelines

### Size Recommendations

| Battle Format | Recommended Size |
|---------------|------------------|
| Singles (1v1) | 20x20 blocks |
| Doubles (2v2) | 25x25 blocks |
| Triples (3v3) | 30x30 blocks |
| Multi (4 players) | 30x30 blocks |

### Player Facing

When setting positions, players automatically face each other:

- **pos1** player faces toward pos2
- **pos2** player faces toward pos1

<details>
<summary><strong>Understanding Yaw and Pitch</strong></summary>

**Yaw** controls horizontal direction:

```text
        North
       (180°)
          ↑
West ←────┼────→ East
(90°)     |    (270°)
          ↓
       South
        (0°)
```

**Pitch** controls vertical angle:

- `-90°` = Looking up
- `0°` = Looking straight ahead (recommended)
- `90°` = Looking down

**Tip:** Press **F3** in Minecraft to see your current yaw/pitch values.

</details>

---

## Dimension IDs

Common dimension identifiers:

| Dimension | ID |
|-----------|-----|
| Overworld | `minecraft:overworld` |
| Nether | `minecraft:the_nether` |
| End | `minecraft:the_end` |
| Custom | `modname:dimension_name` |

---

## See Also

- [Quick Start](../getting-started/quick-start.md) - Initial setup guide
- [Battle Camera](../features/battle-camera.md) - Camera configuration
- [Commands](../getting-started/commands.md) - Full command reference
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
