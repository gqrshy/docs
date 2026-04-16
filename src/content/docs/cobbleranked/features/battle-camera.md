---
title: Battle Camera
description: Cinematic battles. Automatic orbiting camera for immersive viewing.
---

## What It Does

The battle camera provides an immersive viewing experience during ranked and casual battles.

CobbleRanked integrates with Cobblemon's **stadium camera** system via reflection. This means:

- If Cobblemon's stadium camera is available (feat-stadium-camera branch or compatible builds), cinematic cameras activate automatically
- If using standard Cobblemon, the camera gracefully degrades — no errors, no missing features

Every ranked and casual match automatically gets stadium camera when available. Arena lookup uses the `stadiumId` setting (if configured) or falls back to the arena name.

## Commands

Check current status:
```
/battlecamera status
```

Your preference is saved. It persists across sessions and server restarts.

## Camera Reactions

When stadium camera is available, the camera responds to battle events:

- **Pokemon send-out**: Focus animation on entering Pokemon
- **Battle events**: Camera follows the action
- **Battle ends**: Camera returns to normal view

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

- **Invisible**: Other players can't see you floating
- **No hunger**: Won't starve during battles
- **No item pickup**: Prevents accidental pickups

> 📝 For full configuration options, see [Camera Configuration](/docs/cobbleranked/configuration/camera/).

## Arena Design Tips

Open arenas work best for the camera system. Avoid tight enclosed spaces that block camera movement.

---

## See Also

- [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) - Competitive battles
- [Arena Configuration](/docs/cobbleranked/configuration/arenas/) - Arena setup
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
