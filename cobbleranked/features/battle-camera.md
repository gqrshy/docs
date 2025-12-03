# Battle Camera

Cinematic camera system that provides dynamic viewing angles during ranked battles.

---

## Overview

The Battle Camera system automatically controls the player's viewpoint during ranked matches, providing smooth cinematic angles and event-based camera reactions. Supports three different camera modes with customizable behavior.

**Key Features:**
- Automatic camera control during battles
- Multiple camera modes (Simple, Dynamic, ML-Enhanced)
- Event reactions (critical hits, super effective moves, etc.)
- Machine learning-based preference learning
- Performance-aware operation

---

## Commands

### Player Commands

| Command | Description |
|---------|-------------|
| `/battlecamera toggle` | Turn battle camera ON/OFF |
| `/battlecamera status` | Show current camera settings |

### Admin Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/battlecamera ml` | OP level 2 | Toggle ML-enhanced mode |

---

## Camera Modes

| Mode | Description | Recommendation |
|------|-------------|----------------|
| **SIMPLE** | Fixed orbital camera with basic controls | Low-end servers |
| **DYNAMIC** | Smooth transitions with event reactions | Recommended |
| **ML_ENHANCED** | Learns player preferences over time | Advanced |

### SIMPLE Mode

Basic orbital camera that rotates around the battle arena at a fixed speed.

- Minimal resource usage
- Consistent viewing experience
- No event reactions

### DYNAMIC Mode

Intelligent camera that responds to battle events with cinematic effects.

- Smooth transitions between angles
- Zooms and pans on important events
- Adjusts based on battle intensity

### ML_ENHANCED Mode

Uses machine learning to learn individual player preferences and optimize camera behavior.

- Tracks player camera adjustments
- Learns preferred viewing angles
- Adapts to playing style over time
- Requires more server resources

---

## Configuration

**File:** `config/cobbleranked/camera/battle_camera.json5`

```json5
{
  "enabled": true,
  "mode": "DYNAMIC",  // SIMPLE, DYNAMIC, ML_ENHANCED

  "orbit": {
    "radius": 15.0,           // Distance from battle center
    "height": 8.0,            // Camera height offset
    "speed": 0.5              // Rotation speed
  }
}
```

<details>
<summary><strong>Full Configuration Options</strong></summary>

```json5
{
  "enabled": true,
  "mode": "DYNAMIC",

  "orbit": {
    "radius": 15.0,
    "height": 8.0,
    "speed": 0.5,
    "min_radius": 10.0,
    "max_radius": 25.0
  },

  "events": {
    "super_effective": {
      "enabled": true,
      "zoom_factor": 1.2,
      "duration_ticks": 20
    },
    "critical_hit": {
      "enabled": true,
      "shake_intensity": 0.3,
      "duration_ticks": 15
    },
    "mega_evolution": {
      "enabled": true,
      "zoom_factor": 1.5,
      "duration_ticks": 40
    },
    "terastallize": {
      "enabled": true,
      "zoom_factor": 1.4,
      "duration_ticks": 35
    },
    "faint": {
      "enabled": true,
      "slow_motion": true,
      "duration_ticks": 30
    }
  },

  "ml_settings": {
    "learning_rate": 0.1,
    "preference_weight": 0.7,
    "min_samples": 10
  },

  "performance": {
    "tps_threshold": 18.0,      // Disable below this TPS
    "max_players_enhanced": 20  // Max players for ML mode
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable battle camera system |
| `mode` | `DYNAMIC` | Camera mode (SIMPLE/DYNAMIC/ML_ENHANCED) |
| `orbit.radius` | `15.0` | Camera distance from battle center |
| `orbit.height` | `8.0` | Camera height above arena |
| `orbit.speed` | `0.5` | Orbital rotation speed |
| `performance.tps_threshold` | `18.0` | Auto-disable below this TPS |

</details>

---

## Event Reactions

In DYNAMIC and ML_ENHANCED modes, the camera reacts to battle events:

| Event | Camera Effect |
|-------|---------------|
| Super Effective | Quick zoom-in on target |
| Critical Hit | Camera shake effect |
| Mega Evolution | Dramatic zoom with slow pan |
| Terastallization | Zoom focus on transforming Pokemon |
| Pokemon Faint | Slow-motion effect |
| KO Move | Dramatic angle shift |

---

## Player Preferences

Players can toggle the battle camera per their preference:

```bash
/battlecamera toggle
```

**When enabled:**
- Camera automatically controls viewpoint during battles
- Player cannot manually look around
- Provides cinematic experience

**When disabled:**
- Normal first-person view during battles
- Player has full camera control
- Standard gameplay experience

Player preferences are saved and persist across sessions.

---

## Performance Considerations

The battle camera system monitors server performance:

- **TPS Threshold:** Camera effects automatically reduce when server TPS drops below configured threshold
- **Player Limit:** ML mode limits concurrent users to prevent lag
- **Resource Cleanup:** Camera resources are released immediately when battles end

<details>
<summary><strong>Recommended Settings by Server Size</strong></summary>

### Small Server (< 20 players)

```json5
{
  "mode": "ML_ENHANCED",
  "performance": {
    "tps_threshold": 18.0,
    "max_players_enhanced": 20
  }
}
```

### Medium Server (20-50 players)

```json5
{
  "mode": "DYNAMIC",
  "performance": {
    "tps_threshold": 19.0,
    "max_players_enhanced": 10
  }
}
```

### Large Server (50+ players)

```json5
{
  "mode": "SIMPLE",
  "performance": {
    "tps_threshold": 19.5,
    "max_players_enhanced": 0
  }
}
```

</details>

---

## See Also

- [Ranked Battles](ranked-battles.md) - Battle system overview
- [Custom Music](custom-music.md) - Audio customization
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
