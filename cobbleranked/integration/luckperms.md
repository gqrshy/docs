# LuckPerms Integration

CobbleRanked can automatically sync your players' ranks with LuckPerms, giving them custom prefixes, suffixes, and groups based on their Elo rating. This guide will show you how to set it up step-by-step.

## What is LuckPerms?

LuckPerms is a popular permissions plugin/mod that manages player permissions, groups, prefixes, and suffixes. When integrated with CobbleRanked, your players will automatically get rank tags in chat based on their competitive rating.

**Why use this integration?**
- Show off rank badges in chat (e.g., `[Master] PlayerName`)
- Grant special permissions to high-ranked players
- Use custom Unicode symbols for beautiful rank displays

---

## Quick Start

### Step 1: Install LuckPerms

Download and install LuckPerms for your server platform:
- **Fabric/Forge**: [LuckPerms Fabric/Forge mod](https://luckperms.net/download)
- **Arclight (Hybrid)**: [LuckPerms Bukkit plugin](https://luckperms.net/download)

### Step 2: Enable Integration

1. Open `config/cobbleranked/luckperms.json5`
2. Choose your sync mode:
   - `"suffix"` - Rank tag after name (default)
   - `"prefix"` - Rank tag before name
   - `"all"` - Both prefix and suffix

**Example configuration:**
```json5
{
  "enabled": true,
  "syncMode": "suffix",
  "removeOnRankLoss": true,
  "updateInterval": 0
}
```

### Step 3: Restart Server

Restart your server and you're done! Players will automatically get rank tags when they play ranked battles.

---

## Configuration Guide

<details>
<summary><strong>📝 Understanding Sync Modes</strong></summary>

CobbleRanked supports 4 sync modes:

| Mode | Description | Example Display |
|------|-------------|----------------|
| `"suffix"` | Tag after name (recommended) | `PlayerName [Master]` |
| `"prefix"` | Tag before name | `[Master] PlayerName` |
| `"group"` | Only LuckPerms group assignment | No visible tag |
| `"all"` | Prefix + suffix + group | `[Master] PlayerName [Master]` |

</details>

<details>
<summary><strong>⚙️ Basic Settings Explained</strong></summary>

### `removeOnRankLoss`
**Default:** `true`

When a player drops to a lower rank tier, should we remove their old tag?

- `true` - Remove old tags automatically (recommended)
- `false` - Keep highest rank achieved forever

### `updateInterval`
**Default:** `0` (instant)

How often to sync ranks with LuckPerms, in seconds.

- `0` - Update immediately after every battle
- `60` - Update every minute (reduces database load)
- `300` - Update every 5 minutes (for very large servers)

**Recommendation:** Keep at `0` unless you have performance issues.

</details>

---

## Setting Up Rank Prefixes and Suffixes

<details>
<summary><strong>🎨 Customizing Rank Tags (Click to expand)</strong></summary>

### Default Rank Tags

CobbleRanked comes with pre-configured rank tags:

| Rank | Elo Range | Default Suffix | Color |
|------|-----------|----------------|-------|
| Bronze | 0-999 | `[Bronze]` | &6 (Gold) |
| Silver | 1000-1499 | `[Silver]` | &7 (Gray) |
| Gold | 1500-1999 | `[Gold]` | &e (Yellow) |
| Platinum | 2000-2499 | `[Platinum]` | &b (Aqua) |
| Diamond | 2500-2999 | `[Diamond]` | &3 (Dark Aqua) |
| Master | 3000+ | `[Master]` | &5 (Dark Purple) |

### Customizing Tags

Open `config/cobbleranked/luckperms.json5` and edit the `tierMappings` section:

```json5
"tierMappings": {
  "BRONZE": {
    "group": "bronze_rank",
    "prefix": "&6[Bronze] &r",
    "suffix": " &6[Bronze]&r",
    "weight": 100
  },
  "MASTER": {
    "group": "master_rank",
    "prefix": "&d&l[MASTER] &r",
    "suffix": " &d&l[MASTER]&r",
    "weight": 105
  }
}

**Example:**
```json5
"suffix": " &6&l[GOLD]&r"  // Bold yellow [GOLD]
```

</details>

<details>
<summary><strong>✨ Using Unicode Custom Rank Symbols</strong></summary>

Want fancy rank symbols instead of text? You can use Unicode characters or custom resource pack symbols!

### Method 1: Unicode Emoji/Symbols

You can use any Unicode character directly in your config:

```json5
"tierMappings": {
  "BRONZE": {
    "suffix": " &6⚔&r",  // Crossed swords
    "weight": 100
  },
  "SILVER": {
    "suffix": " &7★&r",  // Star
    "weight": 101
  },
  "GOLD": {
    "suffix": " &e♔&r",  // Crown
    "weight": 102
  },
  "MASTER": {
    "suffix": " &d✦&r",  // Four pointed star
    "weight": 105
  }
}
```

### Method 2: Custom Resource Pack Symbols

For completely custom rank badges, use a resource pack with custom Unicode mappings.

**Step 1:** Create a resource pack with custom font glyphs

Your resource pack should include:
```
assets/
  minecraft/
    font/
      default.json  (font configuration)
    textures/
      font/
        rank_bronze.png
        rank_silver.png
        rank_gold.png
        ...
```

**Step 2:** Map Unicode characters to your textures

In `assets/minecraft/font/default.json`:
```json
{
  "providers": [
    {
      "type": "bitmap",
      "file": "minecraft:font/rank_bronze.png",
      "ascent": 8,
      "height": 8,
      "chars": ["\uE001"]
    },
    {
      "type": "bitmap",
      "file": "minecraft:font/rank_master.png",
      "ascent": 8,
      "height": 8,
      "chars": ["\uE006"]
    }
  ]
}
```

**Step 3:** Use the Unicode characters in your config

```json5
"tierMappings": {
  "BRONZE": {
    "suffix": " &6\uE001&r",  // Your custom bronze badge
    "weight": 100
  },
  "MASTER": {
    "suffix": " &d\uE006&r",  // Your custom master badge
    "weight": 105
  }
}
```

**Step 4:** Distribute the resource pack

Players need to install your resource pack to see the custom symbols. You can:
- Host it and add to `server.properties`: `resource-pack=https://your-url/rankpack.zip`
- Share the download link on Discord
- Use a mod like ServerPackLocator

### Example: Pokémon Ball Rank Symbols

```json5
"tierMappings": {
  "POKEBALL": {
    "suffix": " \uE001",  // Custom Poké Ball symbol
    "weight": 100
  },
  "GREATBALL": {
    "suffix": " \uE002",  // Custom Great Ball symbol
    "weight": 101
  },
  "ULTRABALL": {
    "suffix": " \uE003",  // Custom Ultra Ball symbol
    "weight": 102
  },
  "MASTERBALL": {
    "suffix": " \uE004",  // Custom Master Ball symbol
    "weight": 103
  }
}
```

**Tips:**
- Keep symbols small (8x8 or 16x16 pixels)
- Use transparent backgrounds (PNG)
- Test symbols at different scales
- Provide a fallback pack for players who decline

</details>

---

## LuckPerms Group Management

<details>
<summary><strong>👥 Assigning LuckPerms Groups by Rank</strong></summary>

You can automatically assign players to LuckPerms groups based on their rank tier.

### Basic Setup

In `luckperms.json5`, add group names to each tier:

```json5
"tierMappings": {
  "BRONZE": {
    "group": "bronze_rank",
    "suffix": " &6[Bronze]&r",
    "weight": 100
  },
  "MASTER": {
    "group": "master_rank",
    "suffix": " &d[Master]&r",
    "weight": 105
  }
}
```

### Creating Groups in LuckPerms

1. **Create the groups:**
   ```
   /lp creategroup bronze_rank
   /lp creategroup master_rank
   ```

2. **Set group display names:**
   ```
   /lp group bronze_rank meta setdisplayname "&6Bronze Rank"
   /lp group master_rank meta setdisplayname "&dMaster Rank"
   ```

3. **Add permissions to groups:**
   ```
   /lp group master_rank permission set special.perk true
   /lp group master_rank permission set shop.discount.10 true
   ```

### Example: Master Rank Perks

Grant special abilities to Master tier players:

```
/lp group master_rank permission set cobblemon.legendaryspawn.boost true
/lp group master_rank permission set essentials.fly true
/lp group master_rank meta addprefix 100 "&d&l[MASTER] &r"
```

### Group Weight System

The `weight` value determines which group takes priority if a player has multiple groups:

```json5
"BRONZE": { "weight": 100 },  // Lowest priority
"SILVER": { "weight": 101 },
"GOLD": { "weight": 102 },
"PLATINUM": { "weight": 103 },
"DIAMOND": { "weight": 104 },
"MASTER": { "weight": 105 }    // Highest priority
```

Higher weight = higher priority in LuckPerms prefix/suffix resolution.

</details>

<details>
<summary><strong>🔄 Format-Specific Rank Groups</strong></summary>

Want different groups for Singles vs Doubles players? Use `customMappings`:

```json5
"customMappings": {
  "SINGLES:MASTER": {
    "group": "singles_master",
    "suffix": " &d[Singles Master]&r",
    "weight": 200
  },
  "DOUBLES:MASTER": {
    "group": "doubles_master",
    "suffix": " &5[Doubles Master]&r",
    "weight": 201
  }
}
```

**Format names:**
- `SINGLES` - Singles battles
- `DOUBLES` - Doubles battles
- `TRIPLES` - Triples battles
- `MULTI` - Multi battles

Players will get format-specific groups when they reach Master in that format!

</details>

---

## Troubleshooting

<details>
<summary><strong>❌ Rank tags not showing in chat</strong></summary>

**Problem:** Players have ranks but tags don't appear in chat.

**Solutions:**

1. **Check if LuckPerms is loaded:**
   ```
   /lp info
   ```
   If this command doesn't work, LuckPerms isn't installed correctly.

2. **Verify CobbleRanked detects LuckPerms:**
   Check server logs for:
   ```
   [CobbleRanked] LuckPerms integration enabled (mod version)
   ```
   or
   ```
   [CobbleRanked] LuckPerms integration enabled (Bukkit plugin version)
   ```

3. **Check sync mode:**
   Make sure `syncMode` in `luckperms.json5` is set to `"suffix"`, `"prefix"`, or `"all"` (not `"group"`).

4. **Install a chat formatting plugin:**
   LuckPerms doesn't format chat by default. Install one of these:
   - **Fabric:** [Styled Chat](https://modrinth.com/mod/styled-chat)
   - **Bukkit/Arclight:** [LuckPerms default](https://luckperms.net/wiki/Prefixes,-Suffixes-&-Meta) or [EssentialsX Chat](https://essentialsx.net/)

5. **Check player's actual LuckPerms data:**
   ```
   /lp user <playername> info
   ```
   Look for the prefix/suffix under "Meta". If it's not there, CobbleRanked hasn't synced yet.

6. **Force a rank update:**
   ```
   /rankedadmin reload
   ```
   Then have the player win a ranked battle.

</details>

<details>
<summary><strong>⚠️ Unicode symbols showing as boxes/question marks</strong></summary>

**Problem:** Custom Unicode symbols display as � or ▯.

**Solutions:**

1. **Ensure proper file encoding:**
   - Save `luckperms.json5` with UTF-8 encoding (not ANSI)
   - Use a proper text editor (VS Code, Notepad++, Sublime Text)

2. **Test with simple Unicode first:**
   ```json5
   "suffix": " ★"  // Basic star symbol
   ```
   If this doesn't work, your client doesn't support Unicode.

3. **For custom resource pack symbols:**
   - Verify players have the resource pack enabled
   - Check `server.properties` resource pack URL
   - Ensure resource pack uses correct Unicode mappings

4. **Client compatibility:**
   - Minecraft Java Edition supports all Unicode
   - Bedrock Edition (via Geyser) may have issues with some symbols

</details>

<details>
<summary><strong>🔧 Ranks not updating after battles</strong></summary>

**Problem:** Player wins battles but rank tag doesn't change.

**Solutions:**

1. **Check `updateInterval`:**
   ```json5
   "updateInterval": 0  // Should be 0 for instant updates
   ```

2. **Verify player actually changed rank tiers:**
   Check their Elo with `/ranked` - you need to cross tier thresholds (1000, 1500, 2000, etc.)

3. **Check server logs for errors:**
   Look for LuckPerms-related errors:
   ```
   [ERROR] [CobbleRanked] Failed to sync LuckPerms rank
   ```

4. **Ensure removeOnRankLoss is configured:**
   ```json5
   "removeOnRankLoss": true
   ```

5. **Check LuckPerms permissions:**
   CobbleRanked needs permission to modify user data. Ensure the server's LuckPerms configuration allows this.

</details>

<details>
<summary><strong>💥 Multiple rank tags stacking</strong></summary>

**Problem:** Player has multiple rank tags like `PlayerName [Bronze] [Silver]`.

**Solutions:**

1. **Enable automatic removal:**
   ```json5
   "removeOnRankLoss": true
   ```

2. **Manually remove old tags:**
   ```
   /lp user <playername> meta clear
   /rankedadmin reload
   ```

3. **Check weight values:**
   Ensure each tier has a unique, increasing weight:
   ```json5
   "BRONZE": { "weight": 100 },
   "SILVER": { "weight": 101 },
   "GOLD": { "weight": 102 }
   ```

4. **Verify you're not manually assigning groups:**
   Don't use `/lp user add suffix` manually - let CobbleRanked manage it.

</details>

---

## Frequently Asked Questions

<details>
<summary><strong>Can I use both prefix and suffix at the same time?</strong></summary>

Yes! Set `syncMode: "all"`:

```json5
{
  "enabled": true,
  "syncMode": "all",
  "tierMappings": {
    "MASTER": {
      "prefix": "&d[Master] &r",
      "suffix": " &d⚔&r"
    }
  }
}
```

Result: `[Master] PlayerName ⚔`

</details>

<details>
<summary><strong>Can I give different permissions to different rank tiers?</strong></summary>

Absolutely! Use the `group` feature:

1. Set up groups in luckperms.json5:
   ```json5
   "MASTER": {
     "group": "master_rank",
     "suffix": " [Master]"
   }
   ```

2. Grant permissions to the group:
   ```
   /lp group master_rank permission set special.ability true
   /lp group master_rank permission set shop.discount.20 true
   ```

Now all Master players get those permissions automatically!

</details>

<details>
<summary><strong>Will players keep their rank tag if they drop Elo?</strong></summary>

It depends on your `removeOnRankLoss` setting:

- `"removeOnRankLoss": true` - Tag removed when dropping to lower tier (recommended)
- `"removeOnRankLoss": false` - Players keep their highest rank tag forever

</details>

<details>
<summary><strong>Can I have different tags for Singles vs Doubles ranks?</strong></summary>

Yes! Use `customMappings`:

```json5
"customMappings": {
  "SINGLES:MASTER": {
    "suffix": " &d[1v1 Master]&r"
  },
  "DOUBLES:MASTER": {
    "suffix": " &5[2v2 Master]&r"
  }
}
```

Players can have multiple tags if they're high rank in multiple formats!

</details>

<details>
<summary><strong>How do I disable LuckPerms integration?</strong></summary>

Simply set `enabled: false` in `luckperms.json5`:

```json5
{
  "enabled": false
}
```

Then restart or `/rankedadmin reload`.

</details>

<details>
<summary><strong>Can I preview what my rank tag will look like?</strong></summary>

Yes! Manually test it with LuckPerms:

```
/lp user YourName meta setsuffix 100 " &d[Master]&r"
```

Type in chat to see how it looks. Then remove it:

```
/lp user YourName meta clear
```

</details>

---

## Advanced Examples

<details>
<summary><strong>📦 Complete Configuration Examples</strong></summary>

### Example 1: Simple Colored Tags

```json5
{
  "enabled": true,
  "syncMode": "suffix",
  "removeOnRankLoss": true,
  "updateInterval": 0,
  "tierMappings": {
    "BRONZE": {
      "suffix": " &6[Bronze]&r",
      "weight": 100
    },
    "SILVER": {
      "suffix": " &7[Silver]&r",
      "weight": 101
    },
    "GOLD": {
      "suffix": " &e[Gold]&r",
      "weight": 102
    },
    "MASTER": {
      "suffix": " &d&l[MASTER]&r",
      "weight": 105
    }
  }
}
```

### Example 2: Unicode Symbols Only

```json5
{
  "enabled": true,
  "syncMode": "suffix",
  "removeOnRankLoss": true,
  "tierMappings": {
    "BRONZE": { "suffix": " &6⚔&r", "weight": 100 },
    "SILVER": { "suffix": " &7★&r", "weight": 101 },
    "GOLD": { "suffix": " &e◆&r", "weight": 102 },
    "PLATINUM": { "suffix": " &b❖&r", "weight": 103 },
    "DIAMOND": { "suffix": " &3♔&r", "weight": 104 },
    "MASTER": { "suffix": " &d✦&r", "weight": 105 }
  }
}
```

### Example 3: Full Integration with Groups and Permissions

```json5
{
  "enabled": true,
  "syncMode": "all",
  "removeOnRankLoss": true,
  "updateInterval": 0,
  "tierMappings": {
    "BRONZE": {
      "group": "rank_bronze",
      "prefix": "&6[B] &r",
      "suffix": " &6⚔&r",
      "weight": 100
    },
    "SILVER": {
      "group": "rank_silver",
      "prefix": "&7[S] &r",
      "suffix": " &7★&r",
      "weight": 101
    },
    "MASTER": {
      "group": "rank_master",
      "prefix": "&d&l[M] &r",
      "suffix": " &d✦&r",
      "weight": 105,
      "metadata": {
        "rank_display": "Master Tier",
        "special_tag": "competitive"
      }
    }
  },
  "customMappings": {
    "SINGLES:MASTER": {
      "group": "singles_champion",
      "suffix": " &d[Singles Champ]&r",
      "weight": 200
    }
  }
}
```

Then grant permissions to groups:
```
/lp creategroup rank_master
/lp group rank_master permission set special.masterperk true
/lp group rank_master permission set cobblemon.shiny.boost true
```

</details>

---

## Related Documentation

- [Configuration Overview](../configuration/README.md)
- [Placeholder API](placeholders.md) - Use rank data in other plugins
- [Seasons](../features/seasons.md) - Seasonal rank resets
- [Elo System](../features/elo-system.md) - How Elo ratings work

---

## Need More Help?

- **Discord:** Join our [support server](https://discord.gg/gashi)
- **GitHub:** [Report issues](https://github.com/GashiStudios/CobbleRanked/issues)
- **Email:** gashistudios.llc@gmail.com

---

*Last updated: 2025-11-30*
