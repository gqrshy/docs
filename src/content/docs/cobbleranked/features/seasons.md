---
title: Seasons
description: Fresh starts. New champions. Exclusive rewards for the best.
---

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

Configure seasons in `config/cobbleranked/season.yaml`:

```yaml
# season.yaml
checkIntervalMinutes: 1

# Server timezone (IANA format)
# Examples: "Asia/Tokyo", "America/New_York", "Europe/London", "UTC"
timezone: "Asia/Tokyo"

# Season schedule
# Date format: "YYYY-MM-DD" (starts at 00:00:00)
# DateTime format: "YYYY-MM-DD HH:mm:ss" (precise control)
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31 23:59:59"
    preset: "default"

  - name: "Season 2"
    startDate: "2025-04-01"
    endDate: "2025-06-30 23:59:59"
    preset: "default"

# What happens when a season ends
onSeasonEnd:
  resetElo: false           # Hard reset to starting ELO
  softResetElo: true        # Partial reset (recommended)
  softResetFactor: 0.5      # 0.5 = halfway to starting ELO
  resetWinLoss: true        # Clear win/loss records
  resetStreak: true         # Clear win streaks

# Off-season behavior
offSeason:
  allowCasual: true         # Allow casual battles
  allowRankedView: true     # Allow viewing rankings

# Leaderboard archiving
archive:
  enabled: true
  keepAllPlayers: false     # Keep all or just top players
  topPlayersCount: 100      # How many to keep if not all
  includeStatistics: true   # Include detailed stats

# Season end announcements
announcements:
  enabled: true
  intervalMinutes: 30
  showRemainingDays: true
```

### Key Settings

| Setting | Description |
|---------|-------------|
| `timezone` | Server timezone for schedule interpretation |
| `softResetElo` | Partial reset towards starting ELO |
| `softResetFactor` | How much to reset (0.5 = halfway) |
| `resetWinLoss` | Clear win/loss records each season |

### Reset Types

**Hard Reset** (`resetElo: true`):
Everyone returns to the starting ELO (1500). Complete fresh start.

**Soft Reset** (`softResetElo: true`):
ELO moves partway towards starting ELO based on `softResetFactor`.

Example with `softResetFactor: 0.5`:
- 1800 ELO → 1650 (halfway between 1800 and 1500)
- 1200 ELO → 1350 (halfway between 1200 and 1500)

**No Reset** (both false):
ELO carries over. Rewards skill investment over time.

## Season Presets

Use presets to apply different rules for different seasons:

```yaml
# season.yaml
schedule:
  - name: "Standard Season"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Hardcore Season"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "hardcore"
```

Presets are defined in separate files in `config/cobbleranked/season_presets/`.

Each preset contains complete format configuration (team sizes, level caps, mechanics, matchmaking rules, blacklists). See [Blacklist Configuration](/docs/cobbleranked/configuration/blacklist/) for format rules.

## Season Rewards

The real motivation. Configure rewards in `rewards.yaml`:

```yaml
# rewards.yaml
seasonRewards:
  SINGLES:
    - id: "singles_champion"
      rankRange: "1"
      displayName: "&6&l★ Singles Champion ★"
      displayItem: "minecraft:nether_star"
      commands:
        - "pokegiveother {player} victini"
        - "eco give {player} 50000"
      mailSender: "&6Season Champion"
      mailTitle: "&6&l★ {format} Champion - Season {season} ★"
      mailMessage: "&eCongratulations! You are the #1 {format} player!"

    - id: "singles_elite"
      rankRange: "2-10"
      displayName: "&eSingles Elite"
      commands:
        - "eco give {player} 25000"
```

Rewards are delivered via MailLib. Players claim them from their mailbox at their convenience.

See [Rewards Configuration](/docs/cobbleranked/configuration/rewards/) for the full setup guide.

## Endless Mode

Leave the schedule empty for endless mode (no season rotation):

```yaml
# season.yaml
schedule: []
```

In endless mode, rankings accumulate indefinitely with no automatic resets.

## Admin Commands

```bash
/rankedadmin season info      # View current season details
/rankedadmin season rotate    # Manually trigger rotation check
```

---

**Related**: [Rewards](/docs/cobbleranked/configuration/rewards/) | [Leaderboards](/docs/cobbleranked/features/leaderboards/) | [ELO System](/docs/cobbleranked/features/elo-system/)
