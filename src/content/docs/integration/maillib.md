---
title: MailLib
description: Reward delivery system integration.
---

MailLib provides a mailbox system for delivering rewards to players.

## What It Does

- Delivers season-end rewards
- Stores rewards for offline players
- Players claim at their convenience
- Items don't expire immediately

## How Players Claim Rewards

```
/mailbox
```

Opens the mailbox GUI where players can see and claim their rewards.

## Reward Delivery Flow

```
Season Ends → Rewards Calculated → MailLib Notified → Mail Sent → Player Claims
```

## Configuration

Rewards are configured in `config/cobbleranked/rewards.yaml`:

```yaml
seasonRewards:
  enabled: true
  rewards:
    - minRank: 1
      maxRank: 1
      commands:
        - "give {player} diamond_block 64"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player username |
| `{uuid}` | Player UUID |
| `{rank}` | Final rank |
| `{elo}` | Final ELO |

## Installation

1. Download MailLib from [Discord](https://discord.gg/VVVvBTqqyP)
2. Place in `mods/` folder
3. Start server

MailLib configures itself automatically.

## Version Requirements

| CobbleRanked | MailLib |
|--------------|---------|
| 2.0.x | 1.0.1+ |

## Testing

To test reward delivery:

```
/mailbox
```

Check if rewards appear in the mailbox GUI.

## Troubleshooting

### Rewards not appearing

1. Check MailLib is installed
2. Verify rewards.yaml syntax
3. Check server logs for errors
4. Ensure player was online during season end

### "MailLib not found" error

- Verify `maillib-x.x.x.jar` is in `mods/` folder
- Check version compatibility
- Restart server after installation
