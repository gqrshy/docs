---
title: Camera Configuration
description: Configure the cinematic battle camera system for immersive battles.
---

Transform every battle into a cinematic experience. Fine-tune camera angles, event reactions, and player protections.

## Configuration File

Edit `config/cobbleranked/camera/camera.yaml` to customize the camera system.

> 📝 **Note:** Run `/rankedadmin reload` or restart the server to apply changes.

---

## Global Settings

Control the overall camera system behavior.

```yaml
enabled: true
allowPlayerOptOut: true
defaultEnabled: true
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Master switch for the camera system |
| `allowPlayerOptOut` | `true` | Let players disable camera with `/battlecamera toggle` |
| `defaultEnabled` | `true` | Camera on by default for new players |

---

## Camera Parameters

Define how the camera moves around the battlefield.

```yaml
parameters:
  radius:
    min: 2.0
    max: 12.0
    default: 4.0
  height:
    min: 3.0
    max: 8.0
    default: 4.0
  speed:
    min: 8.0
    max: 45.0
    default: 20.0
```

| Parameter | Description |
|-----------|-------------|
| `radius` | Distance from battle center (blocks) |
| `height` | Camera elevation above Pokemon |
| `speed` | Orbit speed (degrees per second) |

### Dynamic Height

Automatically adjusts camera based on Pokemon sizes:

```yaml
parameters:
  useDynamicHeight: true
  dynamicHeightBuffer: 0.5
```

| Setting | Default | Description |
|---------|---------|-------------|
| `useDynamicHeight` | `true` | Auto-adjust for large Pokemon (Wailord, etc.) |
| `dynamicHeightBuffer` | `0.5` | Extra height buffer above Pokemon |

> ⚠️ **Warning:** Set `useDynamicHeight: false` only if you want full manual control.

### Smoothing

Control camera transition smoothness:

```yaml
parameters:
  smoothing:
    radius: 0.03
    height: 0.05
    speed: 0.02
```

Lower values = smoother but slower transitions. Higher values = snappier camera.

---

## Event Reactions

The camera reacts dynamically to battle events. Each event can zoom, pan, or speed up.

### Reaction Parameters

| Parameter | Description |
|-----------|-------------|
| `enabled` | Enable/disable this reaction |
| `radiusModifier` | Multiplier for orbit radius (< 1.0 = zoom in) |
| `heightModifier` | Multiplier for camera height |
| `speedModifier` | Multiplier for orbit speed |
| `duration` | Effect duration in milliseconds |
| `intensity` | Blend strength (1.0 = normal) |

### Example: Customize Move Reactions

```yaml
eventReactions:
  POKEMON_MOVE_USED:
    enabled: true
    radiusModifier: 0.6    # Zoom in 40%
    heightModifier: 0.8    # Lower camera
    speedModifier: 0.8     # Slow down orbit
    duration: 3500         # 3.5 seconds
    intensity: 1.5         # Strong effect
```

<details>
<summary><strong>All Event Types</strong></summary>

**Battle Lifecycle:**
- `BATTLE_START` — Match begins
- `BATTLE_END` — Match ends

**Pokemon Actions:**
- `POKEMON_SENDOUT` — Pokemon enters battle
- `POKEMON_RECALLED` — Pokemon returns to ball
- `POKEMON_MOVE_USED` — Move is executed
- `POKEMON_HIT` — Move connects
- `POKEMON_FAINT` — Pokemon faints

**Hit Types:**
- `CRITICAL_HIT` — Critical hit lands
- `SUPER_EFFECTIVE_HIT` — Super effective damage
- `NOT_VERY_EFFECTIVE_HIT` — Resisted damage

**Transformations:**
- `MEGA_EVOLUTION` — Mega evolution activates
- `TERASTALLIZATION` — Tera type changes
- `FORME_CHANGE` — Form changes
- `ZPOWER_USED` — Z-Move used
- `DYNAMAX_USED` — Dynamax activates

**Status:**
- `STATUS_APPLIED` — Status condition inflicted
- `STATUS_CURED` — Status healed

**Custom Presets:**
- `CUSTOM_CLOSE_UP` — Dramatic close shot
- `CUSTOM_WIDE_SHOT` — Panoramic view
- `CUSTOM_ACTION_SEQUENCE` — Fast action mode
- `CUSTOM_FOCUS_POKEMON` — Focus on single Pokemon
- `CUSTOM_DRAMATIC_MOMENT` — Slow dramatic effect

**Combo Events:**
- `COMBO_CRITICAL_SUPER_EFFECTIVE` — Crit + Super effective
- `COMBO_FAINT_ON_CRITICAL` — KO with critical hit
- `COMBO_MEGA_EVOLUTION_MOVE` — Move after Mega evolving

</details>

<details>
<summary><strong>Full Event Reactions Configuration</strong></summary>

```yaml
eventReactions:
  BATTLE_START:
    enabled: true
    radiusModifier: 1.4
    heightModifier: 1.5
    speedModifier: 0.8
    duration: 6000
    intensity: 1.0

  BATTLE_END:
    enabled: true
    radiusModifier: 1.3
    heightModifier: 1.4
    speedModifier: 0.5
    duration: 4000
    intensity: 0.9

  POKEMON_SENDOUT:
    enabled: true
    radiusModifier: 0.7
    heightModifier: 0.8
    speedModifier: 0.6
    duration: 4000
    intensity: 1.2

  POKEMON_MOVE_USED:
    enabled: true
    radiusModifier: 0.6
    heightModifier: 0.8
    speedModifier: 0.8
    duration: 3500
    intensity: 1.5

  POKEMON_HIT:
    enabled: true
    radiusModifier: 0.6
    heightModifier: 0.7
    speedModifier: 0.8
    duration: 2000
    intensity: 1.4

  POKEMON_FAINT:
    enabled: true
    radiusModifier: 0.9
    heightModifier: 1.1
    speedModifier: 0.4
    duration: 5000
    intensity: 0.8

  CRITICAL_HIT:
    enabled: true
    radiusModifier: 1.2
    heightModifier: 1.3
    speedModifier: 1.8
    duration: 3500
    intensity: 1.6

  SUPER_EFFECTIVE_HIT:
    enabled: true
    radiusModifier: 0.5
    heightModifier: 0.9
    speedModifier: 1.5
    duration: 2500
    intensity: 1.8

  MEGA_EVOLUTION:
    enabled: true
    radiusModifier: 0.6
    heightModifier: 1.2
    speedModifier: 0.3
    duration: 8000
    intensity: 2.0

  TERASTALLIZATION:
    enabled: true
    radiusModifier: 0.7
    heightModifier: 1.1
    speedModifier: 0.4
    duration: 6000
    intensity: 1.9
```

</details>

---

## Player Protection

Keep players safe while in camera mode.

```yaml
protection:
  preventDamage: true
  preventHunger: true
  preventItemPickup: true
  hideChat: false
  makeInvisible: true
```

| Setting | Default | Description |
|---------|---------|-------------|
| `preventDamage` | `true` | Immune to all damage |
| `preventHunger` | `true` | Hunger doesn't drain |
| `preventItemPickup` | `true` | Won't pick up ground items |
| `hideChat` | `false` | Hide chat messages |
| `makeInvisible` | `true` | Other players can't see you |

---

## Format Overrides

Different battle formats can have custom camera settings.

```yaml
formatOverrides:
  SINGLES:
    enabled: true

  DOUBLES:
    enabled: true
    parameters:
      radius:
        default: 6.0
      height:
        default: 4.5

  TRIPLES:
    enabled: true
    parameters:
      radius:
        default: 8.0
      height:
        default: 5.0
```

Doubles and Triples battles automatically use wider camera angles to capture all Pokemon.

---

## Machine Learning Enhancement

Optional ML system that learns player preferences over time.

```yaml
machineLearning:
  enabled: true
  defaultOptIn: true
  minBattlesForActivation: 10
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable ML camera optimization |
| `defaultOptIn` | `true` | New players opt-in by default |
| `minBattlesForActivation` | `10` | Battles needed before ML activates |

<details>
<summary><strong>ML Advanced Settings</strong></summary>

```yaml
machineLearning:
  neuralNetwork:
    inputNodes: 15
    hiddenNodes: 12
    outputNodes: 6
    learningRate: 0.01
  dataCollection:
    collectImplicitFeedback: true
    collectExplicitFeedback: true
    maxTrainingExamples: 1000
  modelPersistence:
    autoSaveInterval: 300
    modelDirectory: "cobbleranked/camera/ml_models"
```

The ML system analyzes player behavior to personalize camera angles and reactions.

</details>

---

## Debug Mode

Enable logging for troubleshooting.

```yaml
debug:
  enabled: false
  logEvents: false
  logCameraUpdates: false
  logMLPredictions: false
```

> 📝 **Note:** Only enable debug mode when diagnosing issues. It generates verbose logs.

---

## Update Rates

Fine-tune camera update frequency (advanced).

```yaml
updateRates:
  parameterUpdate: 100
  positionUpdate: 16
```

| Setting | Default | Description |
|---------|---------|-------------|
| `parameterUpdate` | `100` | Parameter smoothing interval (ms) |
| `positionUpdate` | `16` | Position update interval (ms) |

Lower values = smoother but more CPU usage. Default values work well for most servers.

---

## Quick Reference

| Want to... | Setting |
|------------|---------|
| Disable camera globally | `enabled: false` |
| Make camera closer | Lower `parameters.radius.default` |
| Slower camera | Lower `parameters.speed.default` |
| Disable specific event | Set event's `enabled: false` |
| Wider Doubles camera | Increase `formatOverrides.DOUBLES.parameters.radius.default` |

---

## See Also

- [Battle Camera Feature](/docs/cobbleranked/features/battle-camera/) - Camera overview
- [Arena Configuration](/docs/cobbleranked/configuration/arenas/) - Arena setup
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
- [Troubleshooting](/docs/cobbleranked/support/troubleshooting/) - Problem solving
