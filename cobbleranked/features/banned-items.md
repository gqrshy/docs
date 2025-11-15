# Banned Inventory Items

Prevent players with specific items from joining ranked queues.

## Overview

Players cannot queue if they have banned items in their inventory. Useful for blocking battle gimmick items like Tera Orbs or Dynamax Bands.

## Configuration

**File:** `config/cobbleranked/inventory.json5`

```json5
{
  "banned_items": [
    "mega_showdown:tera_orb",
    "mega_showdown:dynamax_band",
    "mega_showdown:mega_bracelet",
    "mega_showdown:z_ring"
  ]
}
```

## Finding Item IDs

1. Hold the item in-game
2. Press F3+H (show advanced tooltips)
3. Check tooltip for ID (e.g., `mega_showdown:tera_orb`)

## Common Banned Items

**Battle Gimmicks:**
- `mega_showdown:tera_orb` - Terastallization
- `mega_showdown:dynamax_band` - Dynamax
- `mega_showdown:mega_bracelet` - Mega Evolution
- `mega_showdown:z_ring` - Z-Moves
- `mega_showdown:omni_ring` - All gimmicks

## Error Messages

When a player tries to queue with banned items:

> ⚠ Cannot join queue - Banned items in inventory:
> • mega_showdown:tera_orb
> • mega_showdown:dynamax_band
>
> Please remove these items.

## Tips

- Ban items that provide unfair advantages
- Keep the list minimal - only truly problematic items
- Communicate banned items to players via server rules
