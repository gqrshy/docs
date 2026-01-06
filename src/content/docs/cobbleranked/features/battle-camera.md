---
title: Battle Camera
description: Cinematic battles. Automatic orbiting camera for immersive viewing.
---

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

Camera settings in `config/cobbleranked/camera/camera.yaml`:

```yaml
enabled: true
defaultEnabled: true

parameters:
  radius:
    default: 4.0
    min: 2.0
    max: 12.0
  height:
    default: 4.0
    min: 3.0
    max: 8.0
  speed:
    default: 20.0

protection:
  makeInvisible: true
  preventHunger: true
  preventItemPickup: true
```

### Camera Parameters

| Setting | Description |
|---------|-------------|
| `radius` | Distance from battle center |
| `height` | Camera elevation |
| `speed` | How fast the camera orbits |

### Player Protection

While in camera mode:

- **Invisible** — Other players can't see you floating
- **No hunger** — Won't starve during battles
- **No item pickup** — Prevents accidental pickups

> 📝 For full configuration options, see [Camera Configuration](/docs/cobbleranked/configuration/camera/).

## Arena Design Tips

Open arenas work best for the camera system. Avoid tight enclosed spaces that block camera movement.

---

## See Also

- [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) - Competitive battles
- [Arena Configuration](/docs/cobbleranked/configuration/arenas/) - Arena setup
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
