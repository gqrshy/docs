# Inventory Restrictions

Prevent players with specific items in their inventory from joining ranked queues.

## Overview

The inventory restriction system checks players' inventories before allowing them to join ranked queues. This is useful for blocking battle gimmick items or other items that could provide unfair advantages.

**Common Use Cases:**
- Block battle gimmick items (Tera Orbs, Dynamax Bands)
- Prevent usage of special items during battles
- Enforce fair competition rules

**Note:** This is different from the [Blacklist System](../configuration/blacklist.md), which restricts Pokemon, moves, abilities, and held items on Pokemon.

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
