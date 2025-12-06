# Rewards System

Configure season-end rewards and milestone achievements for ranked players.

---

<details>
<summary><strong>Default rewards.json5 (Full Configuration)</strong></summary>

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  REWARDS CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&eCongratulations!",
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
      },
      "rank_4_10": {
        "rank_range": "4-10",
        "display": "&b&l⚔ Elite Reward",
        "item": "minecraft:iron_ingot",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&bWell done!",
          "&7You finished in",
          "&b&lTop 10!",
          "&7━━━━━━━━━━━━━━━━━"
        ],
        "commands": [
          "give {player} minecraft:iron_ingot 16",
          "eco give {player} 200"
        ]
      },
      "rank_11_25": {
        "rank_range": "11-25",
        "display": "&a&l✦ Veteran Reward",
        "item": "minecraft:emerald",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&aGood work!",
          "&7You finished in",
          "&a&lTop 25!",
          "&7━━━━━━━━━━━━━━━━━"
        ],
        "commands": [
          "give {player} minecraft:emerald 32",
          "eco give {player} 100"
        ]
      }
    },
    "doubles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Doubles Champion",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": ["&7Doubles Season Champion!"],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000"
        ]
      }
    },
    "triples": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Triples Champion",
        "item": "minecraft:diamond_block",
        "custom_model_data": 0,
        "lore": ["&7Triples Season Champion!"],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1500"
        ]
      }
    },
    "multi": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Multi Champion",
        "item": "minecraft:nether_star",
        "custom_model_data": 0,
        "lore": ["&7Multi Season Champion!"],
        "commands": [
          "give {player} minecraft:nether_star 1",
          "eco give {player} 2000"
        ]
      }
    },
    "random_singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🎲 Random Singles Champion",
        "item": "minecraft:dragon_egg",
        "custom_model_data": 0,
        "lore": ["&7Random Singles Season Champion!"],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1500"
        ]
      }
    },
    "random_doubles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🎲 Random Doubles Champion",
        "item": "minecraft:dragon_egg",
        "custom_model_data": 0,
        "lore": ["&7Random Doubles Season Champion!"],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1500"
        ]
      }
    },
    "random_triples": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🎲 Random Triples Champion",
        "item": "minecraft:dragon_egg",
        "custom_model_data": 0,
        "lore": ["&7Random Triples Season Champion!"],
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 2000"
        ]
      }
    }
  },

  "milestone_rewards": {
    "singles": {
      "matches_10": {
        "type": "MATCHES",
        "requirement": 10,
        "display": "&a✦ Rookie Trainer",
        "item": "minecraft:emerald",
        "custom_model_data": 0,
        "lore": [
          "&7Play &f10 &7ranked matches",
          "&7to unlock this reward!"
        ],
        "commands": [
          "give {player} minecraft:emerald 5"
        ]
      },
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
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
      },
      "wins_100": {
        "type": "WINS",
        "requirement": 100,
        "display": "&e⚡ Battle Legend",
        "item": "minecraft:gold_block",
        "custom_model_data": 0,
        "lore": [
          "&7Win &f100 &7ranked matches"
        ],
        "commands": [
          "give {player} minecraft:gold_block 10",
          "lp user {player} permission set cobbleranked.title.legend true"
        ]
      },
      "elo_1200": {
        "type": "ELO",
        "requirement": 1200,
        "display": "&b❄ Climbing the Ranks",
        "item": "minecraft:iron_ingot",
        "custom_model_data": 0,
        "lore": [
          "&7Reach &f1200 Elo"
        ],
        "commands": [
          "give {player} minecraft:iron_ingot 32"
        ]
      },
      "elo_2000": {
        "type": "ELO",
        "requirement": 2000,
        "display": "&d❄ Grandmaster",
        "item": "minecraft:netherite_ingot",
        "custom_model_data": 0,
        "lore": [
          "&7Reach &f2000 Elo"
        ],
        "commands": [
          "give {player} minecraft:netherite_ingot 5",
          "lp user {player} permission set cobbleranked.title.grandmaster true"
        ]
      }
    },
    "doubles": {
      "matches_10": {
        "type": "MATCHES",
        "requirement": 10,
        "display": "&a✦ Doubles Rookie",
        "item": "minecraft:emerald",
        "custom_model_data": 0,
        "lore": ["&7Play &f10 &7doubles matches"],
        "commands": ["give {player} minecraft:emerald 5"]
      },
      "elo_2000": {
        "type": "ELO",
        "requirement": 2000,
        "display": "&d❄ Doubles Grandmaster",
        "item": "minecraft:netherite_ingot",
        "custom_model_data": 0,
        "lore": ["&7Reach &f2000 Elo &7in doubles"],
        "commands": [
          "give {player} minecraft:netherite_ingot 5",
          "lp user {player} permission set cobbleranked.title.doubles_grandmaster true"
        ]
      }
    }
  }
}
```

</details>

---

## File Location

`config/cobbleranked/rewards.json5`

---

## Reward Types

| Type | Description | Persistence |
|------|-------------|-------------|
| **Season Rewards** | Given to top players when season ends based on leaderboard rank | Reset each season |
| **Milestone Rewards** | Automatically unlock when players reach achievements | Persist across seasons |

---

## Supported Formats

Rewards can be configured independently for each battle format:

| Format | Description |
|--------|-------------|
| `singles` | 1v1 battles |
| `doubles` | 2v2 battles |
| `triples` | 3v3 battles |
| `multi` | 2v2 with 4 players (2 teams of 2) |
| `random_singles` | 1v1 with random teams |
| `random_doubles` | 2v2 with random teams |
| `random_triples` | 3v3 with random teams |

---

## Season Rewards

Distributed to top players when a season ends based on their leaderboard position.

### Structure

```json5
{
  "season_rewards": {
    "singles": {
      "reward_id": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": ["&7Description line 1", "&7Description line 2"],
        "commands": ["give {player} minecraft:diamond 64"]
      }
    }
  }
}
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `rank_range` | ✅ | Rank requirement: `"1"` for 1st place, `"2-3"` for 2nd-3rd, `"4-10"` for 4th-10th |
| `display` | ✅ | Display name in GUI (supports `&` color codes) |
| `item` | ✅ | Minecraft item ID (e.g., `minecraft:diamond`) |
| `custom_model_data` | ❌ | Custom model data for resource packs (default: `0`) |
| `lore` | ✅ | Item description lines (array) |
| `commands` | ✅ | Commands to execute when claimed |

### Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player's username |
| `{rank}` | Player's final rank position |

---

## Milestone Rewards

Unlock automatically when players reach specific achievements. Progress persists across seasons.

### Structure

```json5
{
  "milestone_rewards": {
    "singles": {
      "milestone_id": {
        "type": "WINS",
        "requirement": 50,
        "display": "&e⚡ Champion Material",
        "item": "minecraft:gold_block",
        "custom_model_data": 0,
        "lore": ["&7Win &f50 &7ranked matches"],
        "commands": ["give {player} minecraft:gold_block 5"]
      }
    }
  }
}
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `type` | ✅ | Milestone type: `MATCHES`, `WINS`, or `ELO` |
| `requirement` | ✅ | Value required to unlock |
| `display` | ✅ | Display name in GUI (supports `&` color codes) |
| `item` | ✅ | Minecraft item ID |
| `custom_model_data` | ❌ | Custom model data for resource packs (default: `0`) |
| `lore` | ✅ | Item description lines (array) |
| `commands` | ✅ | Commands to execute when claimed |

### Milestone Types

| Type | Description | Example Values |
|------|-------------|----------------|
| `MATCHES` | Total matches played | 10, 50, 100 |
| `WINS` | Total wins | 10, 25, 50, 100 |
| `ELO` | Elo rating threshold | 1200, 1500, 1800, 2000 |

### Placeholder

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player's username |

---

## Command Examples

<details>
<summary><strong>Common Command Patterns</strong></summary>

### Give Items
```json5
"commands": ["give {player} minecraft:diamond 64"]
```

### Economy (requires economy plugin)
```json5
"commands": ["eco give {player} 1000"]
```

### Permissions (requires LuckPerms)
```json5
"commands": ["lp user {player} permission set cobbleranked.title.legend true"]
```

### Multiple Commands
```json5
"commands": [
  "give {player} minecraft:diamond 64",
  "eco give {player} 1000",
  "lp user {player} permission set cobbleranked.title.legend true",
  "broadcast &6{player} &ehas become a Legend!"
]
```

### Custom Titles (with plugin)
```json5
"commands": [
  "lp user {player} parent add champion",
  "title {player} times 10 70 20",
  "title {player} title {\"text\":\"Champion!\",\"color\":\"gold\"}"
]
```

</details>

---

## Full Example

<details>
<summary><strong>Complete Reward Setup</strong></summary>

```json5
{
  "season_rewards": {
    "singles": {
      // 1st place
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&eCongratulations!",
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
      // 2nd-3rd place
      "rank_2_3": {
        "rank_range": "2-3",
        "display": "&e&l⭐ Master",
        "item": "minecraft:gold_ingot",
        "custom_model_data": 0,
        "lore": [
          "&7━━━━━━━━━━━━━━━━━",
          "&7You finished in &e&lTop 3!",
          "&7━━━━━━━━━━━━━━━━━"
        ],
        "commands": [
          "give {player} minecraft:gold_ingot 32",
          "eco give {player} 500"
        ]
      },
      // 4th-10th place
      "rank_4_10": {
        "rank_range": "4-10",
        "display": "&b&l⚔ Elite",
        "item": "minecraft:iron_ingot",
        "custom_model_data": 0,
        "lore": ["&7Top 10 finisher!"],
        "commands": [
          "give {player} minecraft:iron_ingot 16",
          "eco give {player} 200"
        ]
      }
    }
  },
  "milestone_rewards": {
    "singles": {
      // Play 10 matches
      "matches_10": {
        "type": "MATCHES",
        "requirement": 10,
        "display": "&a✦ Rookie Trainer",
        "item": "minecraft:emerald",
        "custom_model_data": 0,
        "lore": ["&7Play &f10 &7ranked matches"],
        "commands": ["give {player} minecraft:emerald 5"]
      },
      // Win 50 matches
      "wins_50": {
        "type": "WINS",
        "requirement": 50,
        "display": "&e⚡ Champion Material",
        "item": "minecraft:gold_block",
        "custom_model_data": 0,
        "lore": ["&7Win &f50 &7ranked matches"],
        "commands": ["give {player} minecraft:gold_block 5"]
      },
      // Reach 1500 Elo
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "display": "&b❄ Elo Master",
        "item": "minecraft:diamond",
        "custom_model_data": 0,
        "lore": ["&7Reach &f1500 Elo"],
        "commands": ["give {player} minecraft:diamond 3"]
      }
    }
  }
}
```

</details>

---

## Reloading

After editing `rewards.json5`:

```
/rankedadmin reload
```

---

## See Also

- [Season Management](../features/seasons.md) - Season configuration
- [GUI Customization](gui.md) - Reward GUI customization
- [Commands](../getting-started/commands.md) - Admin commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
