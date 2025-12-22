# Rewards Configuration

Complete reference for `config/cobbleranked/rewards.yaml`.

---

## Overview

The rewards configuration defines three types of rewards:
- **Rank Rewards** - One-time rewards for reaching a rank tier
- **Season Rewards** - Rewards for leaderboard placement at season end
- **Milestones** - Achievement-based rewards (wins, Elo, streaks)

---

## Placeholders

Available placeholders for commands and messages:

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player name |
| `{tier}` | Rank tier name |
| `{season}` | Season name |
| `{format}` | Battle format |
| `{rank}` | Leaderboard position |

---

## Rank Rewards

One-time rewards when reaching a rank tier:

```yaml
rankRewards:
  POKEBALL:
    tier: "POKEBALL"
    commands: []
    mailSender: "Rank Achievement"
    mailTitle: "Reached {tier} Rank!"
    mailMessage: "Congratulations on reaching {tier} rank in Season {season}!"

  GREATBALL:
    tier: "GREATBALL"
    commands:
      - "give {player} cobblemon:poke_ball 10"
    mailSender: "Rank Achievement"
    mailTitle: "Reached {tier} Rank!"
    mailMessage: "Congratulations on reaching {tier} rank!"

  ULTRABALL:
    tier: "ULTRABALL"
    commands:
      - "give {player} cobblemon:great_ball 10"

  MASTERBALL:
    tier: "MASTERBALL"
    commands:
      - "give {player} cobblemon:ultra_ball 10"

  BEASTBALL:
    tier: "BEASTBALL"
    commands:
      - "give {player} cobblemon:master_ball 1"

  CHERISH:
    tier: "CHERISH"
    commands:
      - "give {player} cobblemon:master_ball 3"
```

### Rank Reward Properties

| Property | Description |
|----------|-------------|
| `tier` | Must match a tier name from `elo.yaml` |
| `commands` | Commands executed when tier is reached |
| `mailSender` | Sender name for mail notification |
| `mailTitle` | Mail subject line |
| `mailMessage` | Mail body content |

---

## Season Rewards

Rewards for leaderboard placement at season end:

```yaml
seasonRewards:
  SINGLES:
    - id: "singles_champion"
      rankRange: "1"
      displayName: "&6&lSingles Champion"
      displayItem: "minecraft:nether_star"
      customModelData: 0
      lore:
        - "&7The best singles player!"
      commands:
        - "give {player} minecraft:diamond 10"
      mailSender: "Season Rewards"
      mailTitle: "Season {season} - Top #{rank} in {format}"
      mailMessage: "Congratulations! You placed #{rank}!"

    - id: "singles_top3"
      rankRange: "2-3"
      displayName: "&eSingles Elite"
      displayItem: "minecraft:diamond"
      commands:
        - "give {player} minecraft:diamond 5"

    - id: "singles_top10"
      rankRange: "4-10"
      displayName: "&bSingles Veteran"
      displayItem: "minecraft:gold_ingot"
      commands:
        - "give {player} minecraft:gold_ingot 3"

  DOUBLES:
    - id: "doubles_champion"
      rankRange: "1"
      displayName: "&6&lDoubles Champion"
      displayItem: "minecraft:nether_star"
      commands:
        - "give {player} minecraft:diamond 10"
```

### Season Reward Properties

| Property | Description |
|----------|-------------|
| `id` | Unique identifier |
| `rankRange` | Rank range (e.g., "1", "2-3", "4-10") |
| `displayName` | Name shown in GUI (supports color codes) |
| `displayItem` | Item icon in GUI |
| `customModelData` | Custom model data for resource packs |
| `lore` | Item lore in GUI |
| `commands` | Commands executed on claim |

### Rank Range Format

| Format | Meaning |
|--------|---------|
| `"1"` | Rank 1 only |
| `"2-3"` | Ranks 2 and 3 |
| `"4-10"` | Ranks 4 through 10 |
| `"11-25"` | Ranks 11 through 25 |

---

## Milestones

Achievement-based rewards:

```yaml
milestones:
  SINGLES:
    - id: "singles_10_wins"
      type: "WINS"
      requirement: 10
      displayName: "&eSingles Rookie"
      displayItem: "minecraft:iron_ingot"
      lore:
        - "&7Win 10 ranked singles matches"
      commands:
        - "give {player} minecraft:iron_block 1"

    - id: "singles_50_wins"
      type: "WINS"
      requirement: 50
      displayName: "&bSingles Veteran"
      displayItem: "minecraft:gold_ingot"
      commands:
        - "give {player} minecraft:gold_block 1"

    - id: "singles_1500_elo"
      type: "ELO"
      requirement: 1500
      displayName: "&6Singles Expert"
      displayItem: "minecraft:diamond"
      commands:
        - "give {player} minecraft:diamond 3"

    - id: "singles_5_streak"
      type: "WIN_STREAK"
      requirement: 5
      displayName: "&dOn Fire!"
      displayItem: "minecraft:blaze_rod"
      commands:
        - "give {player} minecraft:blaze_rod 5"

  DOUBLES:
    - id: "doubles_10_wins"
      type: "WINS"
      requirement: 10
      displayName: "&eDoubles Rookie"
      displayItem: "minecraft:iron_ingot"
      commands:
        - "give {player} minecraft:iron_block 1"
```

### Milestone Types

| Type | Description |
|------|-------------|
| `WINS` | Total wins in format |
| `MATCHES` | Total matches played |
| `ELO` | Reach specific Elo rating |
| `WIN_STREAK` | Consecutive wins |

---

## Configuration Examples

<details>
<summary><strong>Competitive Server Rewards</strong></summary>

```yaml
rankRewards:
  CHERISH:
    tier: "CHERISH"
    commands:
      - "give {player} cobblemon:master_ball 5"
      - "lp user {player} permission set cobbleranked.champion true"
    mailSender: "Ranked System"
    mailTitle: "Champion Rank Achieved!"
    mailMessage: "You have reached the highest rank - Cherish Ball!"

seasonRewards:
  SINGLES:
    - id: "singles_champion"
      rankRange: "1"
      displayName: "&6&l✦ CHAMPION ✦"
      displayItem: "minecraft:nether_star"
      commands:
        - "give {player} minecraft:diamond_block 5"
        - "give {player} cobblemon:master_ball 10"
        - "lp user {player} permission set cobbleranked.season_champion.singles true"

milestones:
  SINGLES:
    - id: "singles_100_wins"
      type: "WINS"
      requirement: 100
      displayName: "&6&lCentury Club"
      displayItem: "minecraft:gold_block"
      commands:
        - "give {player} minecraft:gold_block 3"
        - "give {player} cobblemon:master_ball 1"
```

</details>

<details>
<summary><strong>Casual Server Rewards</strong></summary>

```yaml
rankRewards:
  GREATBALL:
    tier: "GREATBALL"
    commands:
      - "give {player} cobblemon:great_ball 5"

milestones:
  SINGLES:
    - id: "first_win"
      type: "WINS"
      requirement: 1
      displayName: "&aFirst Victory!"
      displayItem: "minecraft:cake"
      commands:
        - "give {player} cobblemon:poke_ball 10"
```

</details>

---

## Full Example

<details>
<summary><strong>Complete rewards.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Rewards Configuration

rankRewards:
  POKEBALL:
    tier: "POKEBALL"
    commands: []

  GREATBALL:
    tier: "GREATBALL"
    commands:
      - "give {player} cobblemon:poke_ball 10"

  ULTRABALL:
    tier: "ULTRABALL"
    commands:
      - "give {player} cobblemon:great_ball 10"

  MASTERBALL:
    tier: "MASTERBALL"
    commands:
      - "give {player} cobblemon:ultra_ball 10"

  BEASTBALL:
    tier: "BEASTBALL"
    commands:
      - "give {player} cobblemon:master_ball 1"

  CHERISH:
    tier: "CHERISH"
    commands:
      - "give {player} cobblemon:master_ball 3"

seasonRewards:
  SINGLES:
    - id: "singles_champion"
      rankRange: "1"
      displayName: "&6&lSingles Champion"
      displayItem: "minecraft:nether_star"
      commands:
        - "give {player} minecraft:diamond 10"

    - id: "singles_top3"
      rankRange: "2-3"
      displayName: "&eSingles Elite"
      displayItem: "minecraft:diamond"
      commands:
        - "give {player} minecraft:diamond 5"

    - id: "singles_top10"
      rankRange: "4-10"
      displayName: "&bSingles Veteran"
      displayItem: "minecraft:gold_ingot"
      commands:
        - "give {player} minecraft:gold_ingot 3"

milestones:
  SINGLES:
    - id: "singles_10_wins"
      type: "WINS"
      requirement: 10
      displayName: "&eSingles Rookie"
      displayItem: "minecraft:iron_ingot"
      commands:
        - "give {player} minecraft:iron_block 1"

    - id: "singles_50_wins"
      type: "WINS"
      requirement: 50
      displayName: "&bSingles Veteran"
      displayItem: "minecraft:gold_ingot"
      commands:
        - "give {player} minecraft:gold_block 1"

    - id: "singles_1500_elo"
      type: "ELO"
      requirement: 1500
      displayName: "&6Singles Expert"
      displayItem: "minecraft:diamond"
      commands:
        - "give {player} minecraft:diamond 3"
```

</details>

---

## See Also

- [Elo Config](elo.md) - Rank tiers
- [Seasons](seasons.md) - Season scheduling
- [Missions](missions.md) - Daily/weekly missions
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
