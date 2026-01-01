---
title: Battle Camera
description: Cinematic battles. Automatic orbiting camera for immersive viewing.
---

Cinematic battles. Automatic orbiting camera for immersive viewing.

## What It Does

The battle camera transforms fights into spectacles:

- **Orbits smoothly** around the battlefield
- **Reacts to events** — zooms on big hits, pans on faints
- **Breathing motion** keeps the view alive during pauses
- **Toggle on/off** anytime with a command

## Commands

Toggle the camera:
```
/battlecamera toggle
```

Check current status:
```
/battlecamera status
```

Your preference is saved — it persists across sessions and server restarts.

## Camera Reactions

The camera responds to battle events:

- **Move used** — Brief zoom
- **Super effective hit** — Dramatic angle shift
- **Pokemon faints** — Slow pan
- **Battle ends** — Victory pose angle

## Configuration

Camera settings in `config/cobbleranked/camera/camera.json5`:

```json5
{
  "enabled": true,
  "defaultEnabled": true,

  "parameters": {
    "radius": {
      "default": 6.0,
      "min": 3.0,
      "max": 12.0
    },
    "height": {
      "default": 3.0,
      "min": 1.5,
      "max": 8.0
    },
    "speed": {
      "default": 15.0
    }
  },

  "protection": {
    "makeInvisible": true,
    "preventHunger": true,
    "preventItemPickup": true
  }
}
```

### Camera Parameters

- **radius**: Distance from battle center
- **height**: Camera elevation
- **speed**: How fast the camera orbits

### Player Protection

While in camera mode:

- **Invisible** — Other players can't see you floating
- **No hunger** — Won't starve during battles
- **No item pickup** — Prevents accidental pickups

## Arena Design Tips

Open arenas work best for the camera system. Avoid tight enclosed spaces that block camera movement.

## Troubleshooting

**Camera won't disable?**
Check if you're actually in a ranked battle. Use `/battlecamera status` for debug info.

**Stuttering movement?**
Lower server TPS affects smoothness. Try reducing orbit speed in config.

**Stuck in the air?**
Disconnect and reconnect. Admins can force teleport if needed.

---

**Related**: [Ranked Battles](/features/ranked-battles/) | [Arena Configuration](/configuration/arenas/)
