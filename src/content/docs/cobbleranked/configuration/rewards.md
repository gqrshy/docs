---
title: Rewards Configuration
description: Configure season-end rewards for top players.
---

Configure season-end rewards in `config/cobbleranked/rewards.yaml`.

## Basic Structure

```yaml
seasonRewards:
  enabled: true
  rewards:
    - minRank: 1
      maxRank: 1
      commands:
        - "give {player} diamond_block 64"
    - minRank: 2
      maxRank: 10
      commands:
        - "give {player} diamond 32"
```

## Reward Fields

| Field | Description |
|-------|-------------|
| `enabled` | Enable/disable season rewards |
| `minRank` | Minimum rank to receive this reward |
| `maxRank` | Maximum rank to receive this reward |
| `commands` | List of commands to execute |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player username |
| `{uuid}` | Player UUID |
| `{rank}` | Final ranking position |
| `{elo}` | Final ELO rating |

## Example Configurations

### Basic Tiered Rewards

```yaml
seasonRewards:
  enabled: true
  rewards:
    # Champion (Rank 1)
    - minRank: 1
      maxRank: 1
      commands:
        - "give {player} diamond_block 64"
        - "give {player} cobblemon:master_ball 10"
        - "title {player} prefix &6[Champion]"

    # Top 10
    - minRank: 2
      maxRank: 10
      commands:
        - "give {player} diamond 64"
        - "give {player} cobblemon:ultra_ball 32"

    # Top 50
    - minRank: 11
      maxRank: 50
      commands:
        - "give {player} gold_ingot 32"
        - "give {player} cobblemon:great_ball 32"

    # Top 100
    - minRank: 51
      maxRank: 100
      commands:
        - "give {player} iron_ingot 32"
        - "give {player} cobblemon:poke_ball 32"
```

### Pokemon Rewards

```yaml
seasonRewards:
  enabled: true
  rewards:
    - minRank: 1
      maxRank: 1
      commands:
        - "pokegive {player} mew"
        - "give {player} cobblemon:shiny_charm 1"
```

### Economy Integration

```yaml
seasonRewards:
  enabled: true
  rewards:
    - minRank: 1
      maxRank: 1
      commands:
        - "eco give {player} 100000"
    - minRank: 2
      maxRank: 10
      commands:
        - "eco give {player} 50000"
```

## Reward Delivery

Rewards are delivered via **MailLib**. Players claim them using:

```
/mailbox
```

Benefits:
- Offline players receive rewards when they log in
- Players can claim at their convenience
- Rewards don't expire immediately

## Per-Format Rewards

Each battle format has separate rankings and rewards:

```yaml
# rewards.yaml
seasonRewards:
  enabled: true
  perFormat: true  # Enable per-format rewards

  formats:
    SINGLES:
      rewards:
        - minRank: 1
          maxRank: 1
          commands:
            - "give {player} diamond_block 64"

    DOUBLES:
      rewards:
        - minRank: 1
          maxRank: 1
          commands:
            - "give {player} emerald_block 64"

    TRIPLES:
      rewards:
        - minRank: 1
          maxRank: 1
          commands:
            - "give {player} gold_block 64"
```

## Testing Rewards

Test reward commands before season ends:

```
/rankedadmin reward test <player> <rank>
```

## See Also

- [Seasons](/features/seasons/) - Season mechanics
- [MailLib Integration](/integration/maillib/) - Reward delivery
