---
title: Seasons
description: Fresh starts. New champions. Exclusive rewards for the best.
---

Fresh starts. New champions. Exclusive rewards for the best.

## Why Seasons?

Seasons keep competition alive. Every few weeks or months, the slate wipes clean. Last season's champion? They start at the same spot as everyone else. New players get a real shot at glory.

**Top performers earn exclusive rewards** — items, Pokemon, titles, whatever you configure. Give your players something to fight for.

## Season Lifecycle

```
Season Active → Season Ends → Rewards Sent → Off-Season → New Season
```

### During Active Season

Ranked battles count. ELO changes apply. The leaderboard updates in real-time. Every match matters.

### When Season Ends

Final rankings lock in. Rewards are automatically distributed to top players via MailLib. The leaderboard is archived for history.

### Off-Season

A brief pause between seasons. Players can view final rankings from the ended season. Optionally disable ranked battles during this period.

### New Season Starts

Everyone resets (if configured). Fresh leaderboard. The race begins again.

## Automatic Season Rotation

Set an end date and CobbleRanked handles the rest:

1. Calculates final rankings
2. Sends rewards to qualifying players
3. Archives the leaderboard
4. Starts the next season automatically

Season rotation triggers on server start or when the end date is reached. No manual intervention needed.

## Configuration

```json5
{
  "season": {
    "currentSeason": "Season 1",
    "resetEloOnNewSeason": true,   // Fresh start each season
    "seasonResetElo": 1500         // Starting ELO after reset
  }
}
```

### Reset or Carry Over?

- **Reset enabled**: Everyone starts fresh. Equal opportunity. Recommended for most servers.
- **Reset disabled**: ELO carries over. Rewards skill investment over time.

## Season Rewards

The real motivation. Configure rewards in `rewards.yaml`:

```yaml
seasonRewards:
  enabled: true
  rewards:
    - minRank: 1
      maxRank: 1
      commands:
        - "give {player} diamond_block 64"
        - "give {player} cobblemon:master_ball 10"
    - minRank: 2
      maxRank: 10
      commands:
        - "give {player} diamond 64"
```

Rewards are delivered via MailLib. Players claim them from their mailbox at their convenience.

See [Rewards Configuration](/configuration/rewards/) for the full setup guide.

## Admin Commands

```
/rankedadmin season info      # View current season details
/rankedadmin season rotate    # Manually trigger rotation check
```

---

**Related**: [Rewards](/configuration/rewards/) | [Leaderboards](/features/leaderboards/) | [ELO System](/features/elo-system/)
