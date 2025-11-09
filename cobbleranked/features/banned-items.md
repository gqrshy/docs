# Banned Inventory Items

CobbleRanked allows server administrators to restrict players from joining ranked queues if they have specific items in their inventory. This feature is useful for preventing unfair advantages from special items added by mods.

## Overview

The banned inventory items system checks a player's entire inventory (hotbar + main inventory) when they attempt to join a ranked queue. If any banned items are found, the player is prevented from queueing and receives a clear error message indicating which items must be removed.

### Key Features

- ✅ **Inventory scanning** - Checks all 36 inventory slots (hotbar + main)
- ✅ **Clear error messages** - Shows exactly which items are banned
- ✅ **Mod support** - Works with any mod's items
- ✅ **Per-item configuration** - Ban specific items by ID
- ✅ **No false positives** - Only exact item ID matches are blocked

## Use Cases

### Competitive Balance

Ban items that provide unfair advantages in battles:
- **Mega Showdown items** - Prevent Terastallization, Dynamax, Z-Moves
- **Custom battle items** - Block items that grant in-battle abilities
- **Consumables** - Prevent use of special potions or power-ups

### Server Rules Enforcement

Enforce specific ranked battle rules:
- Pure Pokemon battles only (no external items)
- Specific metagame restrictions
- Tournament-style limitations

## Configuration

### Basic Setup

Banned inventory items are configured in a **separate file** for easier management alongside Pokemon blacklists.

Edit `config/cobbleranked/blacklist/inventory.json5`:

```json5
{
  "banned_items": [
    "mega_showdown:tera_orb",        // Terastallization
    "mega_showdown:dynamax_band",    // Dynamax/Gigantamax
    "mega_showdown:mega_bracelet",   // Mega Evolution
    "mega_showdown:z_ring",          // Z-Moves
    "mega_showdown:omni_ring"        // All battle gimmicks
  ]
}
```

> **📁 File Location:** `config/cobbleranked/blacklist/inventory.json5`
>
> This file is automatically created on first server start with sensible defaults.

### Default Banned Items

CobbleRanked comes pre-configured to ban all Mega Showdown battle gimmick items:

| Item | Mod | Effect | Reason |
|------|-----|--------|--------|
| `mega_showdown:tera_orb` | Mega Showdown | Enables Terastallization | Gives unfair type advantage |
| `mega_showdown:dynamax_band` | Mega Showdown | Enables Dynamax/Gigantamax | Significantly boosts Pokemon stats |
| `mega_showdown:mega_bracelet` | Mega Showdown | Enables Mega Evolution | Gives significant stat boost |
| `mega_showdown:z_ring` | Mega Showdown | Enables Z-Moves | Allows powerful one-time moves |
| `mega_showdown:omni_ring` | Mega Showdown | Enables all battle gimmicks | Combines all advantages |

### Adding More Banned Items

To ban additional items, add their item IDs to the list in `blacklist/inventory.json5`:

```json5
{
  "banned_items": [
    // Mega Showdown battle gimmick items (default)
    "mega_showdown:tera_orb",          // Terastallization
    "mega_showdown:dynamax_band",      // Dynamax/Gigantamax
    "mega_showdown:mega_bracelet",     // Mega Evolution
    "mega_showdown:z_ring",            // Z-Moves
    "mega_showdown:omni_ring",         // All gimmicks

    // Hypothetical custom mod items
    "custommod:legendary_boost",
    "custommod:infinite_pp_item",

    // Vanilla Minecraft items (if desired)
    "minecraft:netherite_sword",
    "minecraft:totem_of_undying"
  ]
}
```

### Finding Item IDs

**Method 1: F3+H in-game**
1. Press `F3 + H` in Minecraft
2. Hover over the item in your inventory
3. Item ID appears in the tooltip (e.g., `mega_showdown:tera_orb`)

**Method 2: `/give` command**
```
/give @s <tab>
```
Autocomplete will show available item IDs.

**Method 3: Check mod's source code**
Look for item registration in the mod's code:
```java
registerItem("tera_orb", ...)
```

## How It Works

### Queue Join Flow

```
Player clicks queue button
    ↓
Check flee penalty → ❌ Blocked if active
    ↓
Check banned items → ❌ Blocked if found
    ↓
Validate Pokemon → ❌ Blocked if blacklisted
    ↓
Join queue → ✅ Success
```

### Inventory Scanning

```kotlin
// Scans slots 0-35 (hotbar + main inventory)
for (slot in 0 until player.inventory.size()) {
    val stack = player.inventory.getStack(slot)
    val itemId = Registry.ITEM.getId(stack.item).toString()

    if (bannedItems.contains(itemId)) {
        // Block queue join
    }
}
```

**What is checked:**
- ✅ Hotbar (9 slots)
- ✅ Main inventory (27 slots)
- ✅ Trinket slots (if Trinkets mod is installed)
- ❌ Armor slots (not checked)
- ❌ Offhand (not checked)
- ❌ Ender chest (not checked)

**Trinket Mod Support:**
CobbleRanked automatically detects if the [Trinkets mod](https://modrinth.com/mod/trinkets) is installed and checks all trinket/accessory slots (necklace, ring, belt, etc.). Players cannot bypass item bans by equipping items in trinket slots.

### Error Messages

When a banned item is detected:

**English:**
```
⚠ Cannot queue with banned items: mega_showdown:tera_orb
Remove these items from your inventory and try again.
```

**Japanese:**
```
⚠ 禁止アイテムを持っているためキューに参加できません: mega_showdown:tera_orb
これらのアイテムをインベントリから削除してから再度お試しください。
```

## Configuration Examples

### Example 1: Ban All Mega Showdown Battle Items

```json5
{
  "banned_items": [
    "mega_showdown:tera_orb",          // Terastallization
    "mega_showdown:dynamax_band",      // Dynamax/Gigantamax
    "mega_showdown:mega_bracelet",     // Mega Evolution
    "mega_showdown:z_ring",            // Z-Moves
    "mega_showdown:omni_ring"          // All gimmicks
  ]
}
```

### Example 2: Strict Competitive Mode (No External Items)

```json5
{
  "banned_items": [
    // Mega Showdown (all battle gimmicks)
    "mega_showdown:tera_orb",
    "mega_showdown:dynamax_band",
    "mega_showdown:mega_bracelet",
    "mega_showdown:z_ring",
    "mega_showdown:omni_ring",

    // Hypothetical power-up items
    "powerups:stat_booster",
    "powerups:exp_share_plus",

    // Hypothetical utility items
    "utilities:instant_heal",
    "utilities:revive_token"
  ]
}
```

### Example 3: Tournament Specific Rules

```json5
{
  "banned_items": [
    // Only ban items that break tournament rules
    "mega_showdown:tera_orb"  // No Tera allowed in this tournament
  ]
}
```

### Example 4: No Banned Items

To disable this feature entirely:

```json5
{
  "banned_items": []
}
```

## Integration with Other Systems

### Blacklist System

Banned inventory items work **alongside** the Pokemon blacklist:

1. **Inventory check** - Blocks queue if banned items found
2. **Pokemon check** - Blocks queue if blacklisted Pokemon in party
3. **Both must pass** - Player needs valid Pokemon AND no banned items

### Cross-Server Mode

In cross-server setups, inventory checks occur on the **main/lobby server** before joining the global queue. This prevents banned items from affecting matchmaking.

## Best Practices

### For Server Administrators

**1. Communicate clearly:**
- Document banned items in server rules
- Use `/rules` command or Discord to inform players
- Provide a list of allowed competitive items

**2. Test thoroughly:**
- Verify item IDs are correct
- Test with actual items before deploying
- Check for mod conflicts

**3. Balance carefully:**
- Don't ban items that are core to mod gameplay
- Consider creating separate "unrestricted" queues
- Listen to player feedback

### For Players

**1. Check inventory before queueing:**
- Remove any special mod items
- Store banned items in chests
- Use separate "battle" inventory loadout

**2. Read error messages:**
- Note the exact item ID that's banned
- Remove ALL instances of that item
- Check both hotbar and main inventory

## Troubleshooting

### Player reports "I removed the item but still can't queue"

**Possible causes:**
1. **Multiple instances** - Player has the item in multiple slots
2. **Item variant** - Similar item with different ID (e.g., damaged vs undamaged)
3. **Server cache** - Rare, but possible. Have player reconnect.

**Solution:**
```
1. Have player type: /clear @s <item_id>
2. Verify item is gone: F3+H and check inventory
3. Try queueing again
```

### Item should be banned but isn't

**Check item ID format:**
```json5
// ❌ Wrong
"tera_orb"
"mega_showdown_tera_orb"

// ✅ Correct
"mega_showdown:tera_orb"
```

**Enable debug logging:**
```json5
"debug_queue": true
```

Check server logs for:
```
[Queue] Player PlayerName has banned items: [mega_showdown:tera_orb]
```

### False positives (item not actually in inventory)

This should not happen. If it does:
1. Check server logs for the exact item ID being detected
2. Use `/clear @s` to remove ghost items
3. Report bug to CobbleRanked developers

## Performance Considerations

- **Negligible overhead** - Inventory scan takes <1ms
- **No network traffic** - Check is server-side only
- **No database queries** - Configuration loaded once at startup

## Limitations

### What Cannot Be Banned

**Armor slots:**
- Items in armor slots are not checked
- Workaround: Use Pokemon blacklist for items attached to Pokemon

**Ender chest:**
- Items in ender chest are not checked
- This is intentional (ender chest is remote storage)

**Offhand:**
- Offhand slot is not currently checked
- May be added in future update if needed

### Item Variants

Damaged/enchanted items are treated as the same base item:
```
mega_showdown:tera_orb (full durability)
mega_showdown:tera_orb (damaged)
→ Both banned if "mega_showdown:tera_orb" is in list
```

## API for Developers

If you're developing a mod that needs to interact with this system:

```kotlin
// Check if player has banned items (server-side only)
val bannedItems = CobbleRankedMod.configManager.inventoryBlacklistConfig.bannedItems

fun checkPlayerInventory(player: ServerPlayerEntity): List<String> {
    val foundItems = mutableListOf<String>()

    for (slot in 0 until player.inventory.size()) {
        val stack = player.inventory.getStack(slot)
        val itemId = Registries.ITEM.getId(stack.item).toString()

        if (bannedItems.contains(itemId)) {
            foundItems.add(itemId)
        }
    }

    return foundItems
}
```

## See Also

- [Pokemon Blacklist](blacklist.md) - Banning specific Pokemon species
- [Configuration Guide](../configuration/config.md) - Full config reference
- [Mega Showdown Mod](https://modrinth.com/mod/mega-showdown) - Compatibility notes
