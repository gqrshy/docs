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
  "removeOnRankLoss": true
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

Controls how often rank updates are synced with LuckPerms, in seconds.

- `0` - Update immediately when rank changes (default, no batching)
- `60` - Batch updates and flush every 60 seconds (reduces LuckPerms database writes)

**Benefits of batching:**
- Reduces database write load if you have many concurrent battles
- Updates are automatically flushed when players disconnect or server stops
- No data loss - all pending updates are saved before shutdown

**Example:** Set to `60` if you have 50+ concurrent battles and want to reduce LuckPerms database writes.

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

## Permission Nodes

CobbleRanked provides fine-grained permission nodes when LuckPerms is installed, allowing you to control exactly which commands each player or group can use.

<details>
<summary><strong>📋 Available Permission Nodes</strong></summary>

### Player Commands

| Permission Node | Command | Description |
|-----------------|---------|-------------|
| `cobbleranked.command.ranked` | `/ranked` | Access to ranked GUI and queue |
| `cobbleranked.command.season` | `/season` | View current season information |
| `cobbleranked.command.casual` | `/casual` | Access to casual battles and missions |

### Admin Commands

| Permission Node | Command | Description |
|-----------------|---------|-------------|
| `cobbleranked.command.admin.*` | All admin commands | Full admin access |
| `cobbleranked.command.admin.reload` | `/rankedadmin reload` | Reload configuration files |
| `cobbleranked.command.admin.arena` | `/rankedadmin setArena ...` | Arena management commands |
| `cobbleranked.command.admin.elo` | `/rankedadmin setelo ...` | Elo manipulation commands |
| `cobbleranked.command.admin.season` | `/rankedadmin season ...` | Season management commands |

### Assigning Permissions

**Grant all admin permissions to a group:**

```
/lp group admin permission set cobbleranked.command.admin.* true
```

**Grant specific permission to a player:**

```
/lp user PlayerName permission set cobbleranked.command.ranked true
```

**Revoke a permission:**

```
/lp user PlayerName permission unset cobbleranked.command.season
```

</details>

### Fallback Behavior

**Important:** If LuckPerms is not installed, CobbleRanked falls back to Minecraft's default OP level 2 checks for admin commands. Player commands remain available to everyone.

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

The `weight` value determines which group takes priority when LuckPerms selects which prefix/suffix to display:

```json5
"BRONZE": { "weight": 100 },  // Lowest priority
"SILVER": { "weight": 101 },
"GOLD": { "weight": 102 },
"PLATINUM": { "weight": 103 },
"DIAMOND": { "weight": 104 },
"MASTER": { "weight": 105 }    // Highest priority
```

**How it works:**
- Higher weight = higher priority in LuckPerms prefix/suffix resolution
- By default, LuckPerms displays only the prefix/suffix with the **highest** weight
- When CobbleRanked assigns a new rank, it uses this weight for the LuckPerms meta node

**Important:** LuckPerms' `meta-formatting` setting controls how prefixes/suffixes are selected. The default is `format = ["highest"]`, which means only the highest-weight prefix/suffix will be displayed. If you want to display multiple rank tags (e.g., `[Master] PlayerName [Gold]`), you need to modify LuckPerms' configuration - see the next section.

</details>

<details>
<summary><strong>📚 Displaying Multiple Rank Tags (Advanced)</strong></summary>

By default, LuckPerms only displays the **highest-weight** prefix or suffix. If you want to show multiple rank tags at once (e.g., showing both Singles and Doubles rank), you need to modify LuckPerms' configuration.

### Step 1: Edit LuckPerms Configuration

Open `config/luckperms/luckperms.conf` and find the `meta-formatting` section:

```
meta-formatting {
  prefix {
    format = [
      "highest"
    ]
    duplicates = "first-only"
    start-spacer = ""
    middle-spacer = " "
    end-spacer = ""
  }
  suffix {
    format = [
      "highest"
    ]
    duplicates = "first-only"
    start-spacer = ""
    middle-spacer = " "
    end-spacer = ""
  }
}
```

### Step 2: Enable Prefix/Suffix Stacking

To display multiple tags, change the `format` option. For example, to show all suffixes:

```
suffix {
  format = [
    "highest",
    "lowest"
  ]
  duplicates = "retain-all"
  middle-spacer = " "
}
```

**Options:**
- `"highest"` - Highest weight prefix/suffix
- `"lowest"` - Lowest weight prefix/suffix
- `"highest_own"` - Highest weight directly assigned (not inherited)
- `"highest_inherited"` - Highest weight inherited from groups
- `"highest_on_track_<trackname>"` - Highest on a specific track
- `"highest_from_group_<groupname>"` - Highest from specific group

### Step 3: Restart LuckPerms

```
/lp reload
```

### Example: Show Both Prefix and Suffix

**LuckPerms Config:**
```
prefix {
  format = ["highest"]
}
suffix {
  format = ["highest", "lowest"]
  middle-spacer = " "
}
```

**CobbleRanked Config:**
```json5
"MASTER": {
  "prefix": "&d[Master] &r",
  "suffix": " &d⚔&r",
  "weight": 105
}
```

**Result:** `[Master] PlayerName ⚔`

**Learn more:** [LuckPerms Prefix & Suffix Stacking Guide](https://luckperms.net/wiki/Prefix-&-Suffix-Stacking)

</details>

<details>
<summary><strong>🔄 Format-Specific Rank Tags (Custom Mappings)</strong></summary>

**Status:** ✅ Fully implemented in v1.0.23+

This feature allows different rank tags for Singles vs Doubles vs Triples formats using `customMappings`. For example, you can give a player different suffixes for being Master rank in Singles vs Doubles.

**Example configuration:**

```json5
"customMappings": {
  "SINGLES:MASTER": {
    "group": "singles_master",
    "suffix": " &d[1v1 Master]&r",
    "weight": 200
  },
  "DOUBLES:MASTER": {
    "group": "doubles_master",
    "suffix": " &5[2v2 Master]&r",
    "weight": 201
  },
  "TRIPLES:DIAMOND": {
    "suffix": " &3[3v3 Diamond]&r",
    "weight": 104
  }
}
```

**Key format:** `"FORMAT_NAME:TIER_KEY"`
- `FORMAT_NAME`: SINGLES, DOUBLES, TRIPLES, MULTI (must be uppercase)
- `TIER_KEY`: The rank tier key from your `config.json5` (case-insensitive)

**How it works:**
1. When a player's rank changes in a specific format (e.g., Singles), CobbleRanked checks for a custom mapping first
2. If `"SINGLES:MASTER"` exists in customMappings, it uses that configuration
3. If not found, it falls back to the regular `tierMappings["MASTER"]`
4. This allows you to override specific format+tier combinations while keeping defaults for others

**Use cases:**
- Show which format a player excels in (e.g., "1v1 Master" vs "2v2 Master")
- Grant format-specific permissions (e.g., only Singles Champions can access certain features)
- Create prestige tags for multi-format top players

**Important notes:**
- Custom mappings override tier mappings only for the specific format+tier combination
- If a player is Master in both Singles and Doubles with different custom mappings, only the most recently updated one will display (unless you set `removeOnRankLoss: false`)
- Weights determine priority when multiple prefixes/suffixes exist

</details>

---

## Troubleshooting

Having issues with LuckPerms integration? See the [LuckPerms Integration section](../support/troubleshooting.md#luckperms-integration-issues) in the Troubleshooting guide for solutions to common problems.

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

**Yes!** This is fully supported via `customMappings` (added in v1.0.23+).

Configure format-specific rank tags like this:

```json5
"customMappings": {
  "SINGLES:MASTER": {
    "suffix": " &d[1v1 Master]&r",
    "weight": 200
  },
  "DOUBLES:MASTER": {
    "suffix": " &5[2v2 Master]&r",
    "weight": 201
  }
}
```

**How it works:**
- When a player ranks up in Singles, they get the `SINGLES:MASTER` tag
- When a player ranks up in Doubles, they get the `DOUBLES:MASTER` tag
- If no custom mapping exists, the default `tierMappings` is used

**See the "Format-Specific Rank Tags" section above for full documentation.**

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
  "updateInterval": 60,  // Batch updates every 60 seconds (optional)
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
      "suffix": " &d[1v1 Master]&r",
      "weight": 200
    }
  }
}
```

**Note:** Both `customMappings` and `updateInterval` are now fully implemented (v1.0.23+).

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
