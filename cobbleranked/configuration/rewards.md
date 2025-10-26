# Rewards System

Configure season-end and milestone rewards for your ranked players.

## File Location

`config/cobbleranked/rewards.json5`

## Overview

The rewards system provides two types of rewards:
- **Season Rewards** - Distributed at the end of each season based on final leaderboard position
- **Milestone Rewards** - Automatic rewards when players reach certain achievements (wins, matches, Elo)

Both reward types support:
- Custom items with lore
- Command execution (give items, economy, permissions, etc.)
- Separate rewards for Singles and Doubles formats

## Quick Example

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000"
        ]
      }
    }
  },
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ First Victories",
        "commands": [
          "give {player} minecraft:gold_ingot 10"
        ]
      }
    }
  }
}
```

---

## Season Rewards

### Structure

Season rewards are distributed when a season ends, based on final leaderboard rankings.

```json5
{
  "season_rewards": {
    "singles": {           // Format: singles or doubles
      "rank_1": {          // Unique reward ID
        "rank_range": "1", // Rank requirement
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": [
          "&7You finished in &6&l1st Place!"
        ],
        "commands": [
          "give {player} minecraft:diamond 64"
        ]
      }
    }
  }
}
```

### Field Reference

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `rank_range` | String | Rank requirement (e.g., `"1"`, `"2-3"`, `"4-10"`) | ✅ |
| `display` | String | Display name (supports color codes) | ✅ |
| `item` | String | Minecraft item ID | ✅ |
| `custom_model_data` | Number | Custom model data for resource packs | ❌ |
| `lore` | Array | Item lore (supports color codes) | ❌ |
| `commands` | Array | Commands to execute when claimed | ✅ |

### Rank Ranges

**Single rank:**
```json5
"rank_range": "1"  // Exactly 1st place
```

**Range of ranks:**
```json5
"rank_range": "2-3"   // 2nd or 3rd place
"rank_range": "4-10"  // 4th through 10th place
"rank_range": "11-25" // 11th through 25th place
```

### Example: Top 3 Rewards

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&eConratulations!",
          "&7You finished the season in",
          "&6&l1st Place!",
          "&7━━━━━━━━━━━━━━━━━",
          "&aRewards:",
          "  &7• &fLegend Title",
          "  &7• &b64x Diamond",
          "  &7• &e1000 PokeCoins"
        ],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000",
          "lp user {player} permission set cobbleranked.title.legend true"
        ]
      },
      "rank_2_3": {
        "rank_range": "2-3",
        "display": "&e&l⭐ Master Reward",
        "item": "minecraft:gold_ingot",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&eGreat job!",
          "&7You finished in",
          "&e&lTop 3!",
          "&7━━━━━━━━━━━━━━━━━",
          "&aRewards:",
          "  &7• &fMaster Title",
          "  &7• &632x Gold Ingot",
          "  &7• &e500 PokeCoins"
        ],
        "commands": [
          "give {player} minecraft:gold_ingot 32",
          "eco give {player} 500",
          "lp user {player} permission set cobbleranked.title.master true"
        ]
      }
    }
  }
}
```

---

## Milestone Rewards

### Structure

Milestone rewards are automatically given when players reach certain achievements.

```json5
{
  "milestone_rewards": {
    "singles": {           // Format: singles or doubles
      "wins_10": {         // Unique milestone ID
        "type": "WINS",    // Type: WINS, MATCHES, or ELO
        "requirement": 10, // Number required
        "display": "&e⚡ First Victories",
        "item": "minecraft:gold_ingot",
        "custom_model_data": 0,
        "lore": [
          "&7Win &f10 &7ranked matches",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:gold_ingot 10"
        ]
      }
    }
  }
}
```

### Milestone Types

| Type | Description | Example |
|------|-------------|---------|
| `WINS` | Total wins in this format | 10, 25, 50, 100 wins |
| `MATCHES` | Total matches played (wins + losses) | 10, 50, 100 matches |
| `ELO` | Elo rating threshold | 1200, 1500, 1800, 2000 Elo |

### Field Reference

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `type` | String | `WINS`, `MATCHES`, or `ELO` | ✅ |
| `requirement` | Number | Amount needed to unlock | ✅ |
| `display` | String | Display name (supports color codes) | ✅ |
| `item` | String | Minecraft item ID | ✅ |
| `custom_model_data` | Number | Custom model data for resource packs | ❌ |
| `lore` | Array | Item lore (supports color codes) | ❌ |
| `commands` | Array | Commands to execute when claimed | ✅ |

### Example: Win Milestones

```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ First Victories",
        "item": "minecraft:gold_ingot",
        "lore": [
          "&7Win &f10 &7ranked matches",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:gold_ingot 10"
        ]
      },
      "wins_25": {
        "type": "WINS",
        "requirement": 25,
        "display": "&e⚡ Rising Star",
        "item": "minecraft:gold_ingot",
        "lore": [
          "&7Win &f25 &7ranked matches",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:gold_ingot 25"
        ]
      },
      "wins_50": {
        "type": "WINS",
        "requirement": 50,
        "display": "&e⚡ Champion Material",
        "item": "minecraft:gold_block",
        "lore": [
          "&7Win &f50 &7ranked matches",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:gold_block 5"
        ]
      },
      "wins_100": {
        "type": "WINS",
        "requirement": 100,
        "display": "&e⚡ Battle Legend",
        "item": "minecraft:gold_block",
        "lore": [
          "&7Win &f100 &7ranked matches",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:gold_block 10",
          "lp user {player} permission set cobbleranked.title.legend true"
        ]
      }
    }
  }
}
```

### Example: Elo Milestones

```json5
{
  "milestone_rewards": {
    "singles": {
      "elo_1200": {
        "type": "ELO",
        "requirement": 1200,
        "display": "&b❄ Climbing the Ranks",
        "item": "minecraft:iron_ingot",
        "lore": [
          "&7Reach &f1200 Elo",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:iron_ingot 32"
        ]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "display": "&b❄ Elo Master",
        "item": "minecraft:diamond",
        "lore": [
          "&7Reach &f1500 Elo",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:diamond 3"
        ]
      },
      "elo_2000": {
        "type": "ELO",
        "requirement": 2000,
        "display": "&d❄ Grandmaster",
        "item": "minecraft:netherite_ingot",
        "lore": [
          "&7Reach &f2000 Elo",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:netherite_ingot 5",
          "lp user {player} permission set cobbleranked.title.grandmaster true"
        ]
      }
    }
  }
}
```

---

## Commands

### Placeholders

Use `{player}` placeholder in commands:

```json5
"commands": [
  "give {player} minecraft:diamond 64",     // Give items
  "eco give {player} 1000",                 // Economy plugin
  "lp user {player} permission set ...",   // LuckPerms
  "broadcast {player} reached 100 wins!"   // Announcements
]
```

### Command Examples

**Give items:**
```json5
"give {player} minecraft:diamond 64"
"give {player} cobblemon:master_ball 5"
```

**Economy (requires economy plugin):**
```json5
"eco give {player} 1000"
"money give {player} 500"
```

**Permissions (requires LuckPerms/PermissionsEx):**
```json5
"lp user {player} permission set cobbleranked.title.legend true"
"lp user {player} parent add vip"
```

**Titles (requires plugin):**
```json5
"titles add {player} Legend"
```

**Announcements:**
```json5
"broadcast &6{player} &ehas reached 100 wins!"
```

**Multiple commands:**
```json5
"commands": [
  "give {player} minecraft:diamond 64",
  "eco give {player} 1000",
  "lp user {player} permission set cobbleranked.title.legend true",
  "broadcast &6{player} &ehas become a Legend!"
]
```

---

## Color Codes

Use Minecraft color codes in `display` and `lore` fields:

| Code | Color | Example |
|------|-------|---------|
| `&0` | Black | `&0Black` |
| `&1` | Dark Blue | `&1Dark Blue` |
| `&2` | Dark Green | `&2Dark Green` |
| `&3` | Dark Aqua | `&3Dark Aqua` |
| `&4` | Dark Red | `&4Dark Red` |
| `&5` | Dark Purple | `&5Dark Purple` |
| `&6` | Gold | `&6Gold` |
| `&7` | Gray | `&7Gray` |
| `&8` | Dark Gray | `&8Dark Gray` |
| `&9` | Blue | `&9Blue` |
| `&a` | Green | `&aGreen` |
| `&b` | Aqua | `&bAqua` |
| `&c` | Red | `&cRed` |
| `&d` | Light Purple | `&dLight Purple` |
| `&e` | Yellow | `&eYellow` |
| `&f` | White | `&fWhite` |

**Formatting:**
| Code | Format | Example |
|------|--------|---------|
| `&l` | Bold | `&l&6BOLD GOLD` |
| `&m` | Strikethrough | `&mStrikethrough` |
| `&n` | Underline | `&nUnderline` |
| `&o` | Italic | `&oItalic` |
| `&r` | Reset | `&6Gold&r Normal` |

**Combine colors and formats:**
```json5
"display": "&6&l🏆 Champion Reward"  // Bold gold with trophy emoji
"lore": "&e&lTop 3!"                // Bold yellow
```

---

## Format-Specific Rewards

### Singles vs Doubles

Each format has independent reward tracking:

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Singles Champion",
        "commands": [
          "give {player} minecraft:diamond 64"
        ]
      }
    },
    "doubles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Doubles Champion",
        "commands": [
          "give {player} minecraft:diamond 64"
        ]
      }
    }
  }
}
```

**Important:**
- Players can earn rewards in **both** formats
- Leaderboards are separate
- Achievements are tracked independently

---

## How Rewards Work

### Season Rewards

1. **Season ends** (automatically or via `/rankedarena season rotate`)
2. **Leaderboard finalized** based on final Elo rankings
3. **Rewards calculated** for each eligible player
4. **Unclaimed rewards stored** in player data
5. **Players claim rewards** via GUI (appears as unclaimed item)

**Claiming:**
- Players open ranked GUI (`/ranked`)
- Unclaimed rewards appear as items
- Click to claim and execute commands

### Milestone Rewards

1. **Player reaches milestone** (e.g., 10 wins)
2. **Reward unlocked** automatically
3. **Notification sent** to player
4. **Commands executed** immediately (items given, etc.)
5. **Flag set** to prevent duplicate rewards

**One-time only:**
- Each milestone can only be claimed once per player per format
- Flags reset at season rotation (players can re-earn)

---

## Complete Example

A balanced reward structure for a competitive server:

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&eConratulations!",
          "&7You finished the season in",
          "&6&l1st Place!",
          "&7━━━━━━━━━━━━━━━━━",
          "&aRewards:",
          "  &7• &fLegend Title",
          "  &7• &b64x Diamond",
          "  &7• &e1000 PokeCoins"
        ],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000",
          "lp user {player} permission set cobbleranked.title.legend true"
        ]
      },
      "rank_2_3": {
        "rank_range": "2-3",
        "display": "&e&l⭐ Master Reward",
        "item": "minecraft:gold_ingot",
        "commands": [
          "give {player} minecraft:gold_ingot 32",
          "eco give {player} 500"
        ]
      },
      "rank_4_10": {
        "rank_range": "4-10",
        "display": "&b&l⚔ Elite Reward",
        "item": "minecraft:iron_ingot",
        "commands": [
          "give {player} minecraft:iron_ingot 16",
          "eco give {player} 200"
        ]
      }
    }
  },
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ First Victories",
        "item": "minecraft:gold_ingot",
        "lore": [
          "&7Win &f10 &7ranked matches"
        ],
        "commands": [
          "give {player} minecraft:gold_ingot 10"
        ]
      },
      "wins_50": {
        "type": "WINS",
        "requirement": 50,
        "display": "&e⚡ Champion Material",
        "item": "minecraft:gold_block",
        "lore": [
          "&7Win &f50 &7ranked matches"
        ],
        "commands": [
          "give {player} minecraft:gold_block 5"
        ]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "display": "&b❄ Elo Master",
        "item": "minecraft:diamond",
        "lore": [
          "&7Reach &f1500 Elo"
        ],
        "commands": [
          "give {player} minecraft:diamond 3"
        ]
      }
    }
  }
}
```

---

## Reloading Configuration

After editing `rewards.json5`:

```
/rankedarena reload
```

This reloads:
- All season rewards
- All milestone rewards
- Display items and lore
- Commands

**Note:** Does not retroactively give rewards for already-reached milestones.

---

## Troubleshooting

### Rewards not appearing in GUI

**Symptoms:** Player finished in top 3 but no reward item in GUI

**Solutions:**
1. Check `rank_range` syntax in `rewards.json5`
2. Verify season ended: `/rankedarena season info`
3. Check player's format (singles vs doubles)
4. Reload config: `/rankedarena reload`

### Commands not executing

**Symptoms:** Reward claimed but items not given

**Solutions:**
1. Check command syntax (use `{player}` placeholder)
2. Test command manually: `/give PlayerName minecraft:diamond 64`
3. Verify required plugins installed (economy, permissions)
4. Check server console for errors

### Milestone rewards given twice

**Symptoms:** Player got 10-win reward multiple times

**Solutions:**
1. This should not happen (bug if it does)
2. Check `logs/latest.log` for errors
3. Report as bug on GitHub

### Color codes not working

**Symptoms:** Lore shows `&6Gold` instead of gold color

**Solutions:**
1. Use `&` not `§` for color codes
2. Check JSON syntax (proper escaping)
3. Verify Minecraft version supports color codes

---

**Next:** Learn about [Language Files](languages.md) for multi-language support.
