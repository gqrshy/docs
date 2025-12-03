# Rewards System

Configure season-end and milestone rewards for ranked players.

---

## File Location

`config/cobbleranked/rewards.json5`

---

## Reward Types

### Season Rewards
Given to top players when season ends based on leaderboard rank.

### Milestone Rewards
Automatically unlock when players reach achievements (wins, matches, Elo).

---

## Season Rewards

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
  }
}
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `rank_range` | ✅ | Rank requirement (`"1"`, `"2-3"`, `"4-10"`) |
| `display` | ✅ | Display name (supports `&` color codes) |
| `item` | ✅ | Minecraft item ID |
| `commands` | ✅ | Commands to execute when claimed |
| `lore` | ❌ | Item lore (array) |

**Placeholder:** `{player}` = player username

---

## Milestone Rewards

```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ First Victories",
        "item": "minecraft:gold_ingot",
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
| `WINS` | Total wins | 10, 25, 50, 100 |
| `MATCHES` | Total matches played | 10, 50, 100 |
| `ELO` | Elo rating threshold | 1200, 1500, 2000 |

---

<details>
<summary><strong>Quick Examples</strong></summary>

### Top 3 Season Rewards
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion",
        "item": "minecraft:diamond",
        "commands": ["give {player} minecraft:diamond 64"]
      },
      "rank_2_3": {
        "rank_range": "2-3",
        "display": "&e&l⭐ Master",
        "item": "minecraft:gold_ingot",
        "commands": ["give {player} minecraft:gold_ingot 32"]
      }
    }
  }
}
```

### Win Milestones
```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "commands": ["give {player} minecraft:gold_ingot 10"]
      },
      "wins_50": {
        "type": "WINS",
        "requirement": 50,
        "commands": ["give {player} minecraft:gold_block 5"]
      }
    }
  }
}
```

### Elo Milestones
```json5
{
  "milestone_rewards": {
    "singles": {
      "elo_1200": {
        "type": "ELO",
        "requirement": 1200,
        "commands": ["give {player} minecraft:iron_ingot 32"]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "commands": ["give {player} minecraft:diamond 3"]
      }
    }
  }
}
```

</details>

---

<details>
<summary><strong>Command Examples</strong></summary>

### Give Items
```json5
"commands": ["give {player} minecraft:diamond 64"]
```

### Economy (requires economy plugin)

```json5
"commands": ["eco give {player} 1000"]
```

### Permissions

```json5
"commands": ["lp user {player} permission set ranked.legend true"]
```

**Note:** Requires [LuckPerms](../integration/luckperms.md) to be installed.

### Multiple Commands
```json5
"commands": [
  "give {player} minecraft:diamond 64",
  "eco give {player} 1000",
  "lp user {player} permission set ranked.legend true",
  "broadcast &6{player} &ehas become a Legend!"
]
```

</details>

---

## Format-Specific Rewards

Each format has independent rewards:

```json5
{
  "season_rewards": {
    "singles": { /* Singles rewards */ },
    "doubles": { /* Doubles rewards */ }
  }
}
```

Players can earn rewards in **both** formats.

---

## Reloading

After editing `rewards.json5`:

```
/rankedadmin reload
```

---

## See Also

- [Season Management](../features/seasons.md) - Season configuration
- [Commands](../getting-started/commands.md) - Admin commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
