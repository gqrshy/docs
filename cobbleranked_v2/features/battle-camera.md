# Battle Camera

Cinematic camera system that provides dynamic viewing angles during ranked battles.

---

## Overview

The Battle Camera automatically controls the player's viewpoint during ranked matches, providing smooth cinematic angles and event-based camera reactions.

**Features:**

- Automatic camera control during battles
- Dynamic positioning based on Pokemon sizes
- Event reactions (critical hits, super effective, etc.)
- Machine learning-based preference learning
- Player opt-out option

---

## Commands

### Player Commands

| Command | Description |
|---------|-------------|
| `/battlecamera toggle` | Turn battle camera ON/OFF |
| `/battlecamera status` | Show current camera settings |

---

## Configuration

Edit `config/cobbleranked/camera.json5`:

### Basic Settings

```json5
{
  "enabled": true,
  "allowPlayerOptOut": true,
  "defaultEnabled": true
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable battle camera system |
| `allowPlayerOptOut` | `true` | Let players disable camera |
| `defaultEnabled` | `true` | Camera enabled by default for new players |

---

## Camera Parameters

Control camera position and movement:

```json5
{
  "parameters": {
    "radius": {
      "min": 2.0,
      "max": 12.0,
      "default": 6.0
    },
    "height": {
      "min": 0.5,
      "max": 6.0,
      "default": 2.5
    },
    "speed": {
      "min": 8.0,
      "max": 45.0,
      "default": 20.0
    },
    "smoothing": {
      "radius": 0.05,
      "height": 0.08,
      "speed": 0.03
    },
    "useDynamicHeight": true,
    "dynamicHeightBuffer": 0.5
  }
}
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `radius` | 2-12 (6) | Distance from battle center |
| `height` | 0.5-6 (2.5) | Camera height above ground |
| `speed` | 8-45 (20) | Orbital rotation speed |
| `useDynamicHeight` | `true` | Auto-adjust for large Pokemon |
| `dynamicHeightBuffer` | `0.5` | Extra height buffer |

---

## Event Reactions

Camera reacts to battle events with cinematic effects:

```json5
{
  "eventReactions": {
    "SUPER_EFFECTIVE_HIT": {
      "enabled": true,
      "radiusModifier": 0.5,
      "heightModifier": 0.9,
      "speedModifier": 1.5,
      "duration": 2500,
      "intensity": 1.8
    },
    "CRITICAL_HIT": {
      "enabled": true,
      "radiusModifier": 1.2,
      "heightModifier": 1.3,
      "speedModifier": 1.8,
      "duration": 3500,
      "intensity": 1.6
    },
    "POKEMON_FAINT": {
      "enabled": true,
      "radiusModifier": 0.9,
      "heightModifier": 1.1,
      "speedModifier": 0.4,
      "duration": 5000,
      "intensity": 0.8
    }
  }
}
```

### Available Events

| Event | Description |
|-------|-------------|
| `BATTLE_START` | Battle begins |
| `BATTLE_END` | Battle concludes |
| `POKEMON_SENDOUT` | Pokemon sent to battle |
| `POKEMON_RECALLED` | Pokemon recalled |
| `POKEMON_MOVE_USED` | Move is executed |
| `POKEMON_HIT` | Pokemon takes damage |
| `POKEMON_FAINT` | Pokemon faints |
| `CRITICAL_HIT` | Critical hit lands |
| `SUPER_EFFECTIVE_HIT` | Super effective damage |
| `MEGA_EVOLUTION` | Mega Evolution occurs |
| `TERASTALLIZATION` | Terastallization |
| `DYNAMAX_USED` | Dynamax activation |

### Reaction Parameters

| Field | Description |
|-------|-------------|
| `enabled` | Enable this reaction |
| `radiusModifier` | Multiply radius (< 1 = closer) |
| `heightModifier` | Multiply height |
| `speedModifier` | Multiply rotation speed |
| `duration` | Effect duration in ms |
| `intensity` | Overall effect strength |
| `easing` | Transition type (LINEAR, etc.) |

---

## Machine Learning

Camera learns player preferences over time:

```json5
{
  "machineLearning": {
    "enabled": true,
    "defaultOptIn": true,
    "minBattlesForActivation": 10,
    "neuralNetwork": {
      "inputNodes": 15,
      "hiddenNodes": 12,
      "outputNodes": 6,
      "learningRate": 0.01
    },
    "dataCollection": {
      "collectImplicitFeedback": true,
      "collectExplicitFeedback": true,
      "maxTrainingExamples": 1000
    },
    "modelPersistence": {
      "autoSaveInterval": 300,
      "modelDirectory": "cobbleranked/camera/ml_models"
    }
  }
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable ML features |
| `defaultOptIn` | `true` | Players opt-in by default |
| `minBattlesForActivation` | `10` | Battles before ML activates |
| `learningRate` | `0.01` | Neural network learning rate |

---

## Player Protection

Prevent interference during camera mode:

```json5
{
  "protection": {
    "preventDamage": true,
    "preventHunger": true,
    "preventItemPickup": true,
    "hideChat": false,
    "makeInvisible": true
  }
}
```

---

## Update Rates

Control camera update frequency:

```json5
{
  "updateRates": {
    "parameterUpdate": 100,   // ms between parameter updates
    "positionUpdate": 16      // ms between position updates (~60 FPS)
  }
}
```

---

## Format Overrides

Different camera settings per format:

```json5
{
  "formatOverrides": {
    "DOUBLES": {
      "enabled": true,
      "parameters": {
        "radius": {
          "default": 8.0
        },
        "height": {
          "default": 3.5
        }
      }
    }
  }
}
```

---

## Debug Settings

For troubleshooting:

```json5
{
  "debug": {
    "enabled": false,
    "logEvents": false,
    "logCameraUpdates": false,
    "logMLPredictions": false
  }
}
```

---

## Player Preferences

Players can toggle the battle camera:

```bash
/battlecamera toggle
```

**When enabled:**
- Camera automatically controls viewpoint
- Cinematic experience during battles
- Player cannot manually look around

**When disabled:**
- Normal first-person view
- Player has full camera control

Preferences are saved and persist across sessions.

---

## See Also

- [Ranked Battles](ranked-battles.md) - Battle system overview
- [Custom Music](custom-music.md) - Audio customization
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
