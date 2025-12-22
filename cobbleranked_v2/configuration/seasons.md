# Season Configuration

Complete reference for `config/cobbleranked/season.yaml`.

---

## Overview

The season configuration controls season scheduling, reset behavior, and archival.

---

## Basic Settings

```yaml
checkIntervalMinutes: 1    # How often to check for season changes

# Server timezone (all dates use this timezone)
timezone: "Asia/Tokyo"
```

Common timezone values:
- `UTC` - Coordinated Universal Time
- `America/New_York` - Eastern Time
- `America/Los_Angeles` - Pacific Time
- `Europe/London` - British Time
- `Asia/Tokyo` - Japan Standard Time
- `Asia/Seoul` - Korea Standard Time

---

## Season Schedule

Define your competitive seasons:

```yaml
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Season 2"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "default"

  - name: "Summer Championship"
    startDate: "2025-07-01 00:00:00"
    endDate: "2025-08-31 23:59:59"
    preset: "competitive"
```

### Date Formats

| Format | Example | Meaning |
|--------|---------|---------|
| `YYYY-MM-DD` | `2025-01-01` | Starts at 00:00:00 |
| `YYYY-MM-DD HH:mm:ss` | `2025-01-01 12:00:00` | Precise time |

### Endless Mode

Leave `schedule` empty for no season rotation:

```yaml
schedule: []  # Endless mode - no automatic resets
```

---

## Season End Behavior

What happens when a season ends:

```yaml
onSeasonEnd:
  resetElo: false          # Full Elo reset to starting value
  softResetElo: true       # Partial reset toward starting Elo
  softResetFactor: 0.5     # 50% toward starting Elo
  resetWinLoss: true       # Reset win/loss records
  resetStreak: true        # Reset win streaks
```

### Reset Options

| Option | Description |
|--------|-------------|
| `resetElo` | Full reset to `startingElo` |
| `softResetElo` | Partial reset (see formula below) |
| `softResetFactor` | How much to reset (0.0-1.0) |
| `resetWinLoss` | Clear win/loss records |
| `resetStreak` | Clear win streak |

### Soft Reset Formula

```
newElo = currentElo + (startingElo - currentElo) × softResetFactor
```

**Example with factor 0.5:**
- Player at 1800 Elo → resets to 1650
- Player at 1200 Elo → resets to 1350
- Player at 1500 Elo → stays at 1500

**Example calculations:**
```
Current: 1800, Starting: 1500, Factor: 0.5
New Elo = 1800 + (1500 - 1800) × 0.5 = 1800 - 150 = 1650

Current: 1200, Starting: 1500, Factor: 0.5
New Elo = 1200 + (1500 - 1200) × 0.5 = 1200 + 150 = 1350
```

---

## Off-Season Settings

What players can do between seasons:

```yaml
offSeason:
  allowCasual: true       # Allow casual battles
  allowRankedView: true   # Allow viewing ranked stats/leaderboards
```

---

## Archive Settings

Preserve season history:

```yaml
archive:
  enabled: true
  keepAllPlayers: false      # Keep all player data (large storage)
  topPlayersCount: 100       # Keep top N players per format
  includeStatistics: true    # Include win/loss/streak data
```

| Setting | Description |
|---------|-------------|
| `enabled` | Enable season archival |
| `keepAllPlayers` | Archive all players (uses more storage) |
| `topPlayersCount` | If not keeping all, archive top N per format |
| `includeStatistics` | Include detailed stats in archive |

---

## Announcements

Notify players about season status:

```yaml
announcements:
  enabled: true
  intervalMinutes: 30        # Broadcast interval
  showRemainingDays: true    # Show days until season end
```

---

## Season Presets

Reference blacklist presets per season:

```yaml
schedule:
  - name: "VGC Season"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "vgc"           # Uses presets/vgc.yaml blacklist

  - name: "Smogon OU"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "smogon-ou"     # Uses presets/smogon-ou.yaml
```

Create preset files in `config/cobbleranked/presets/`:

```yaml
# presets/vgc.yaml
blacklist:
  pokemon: []
  moves:
    - "dark_void"
  abilities:
    - "moody"
  items: []
  labels:
    - "mythical"
```

---

## Configuration Examples

<details>
<summary><strong>Monthly Competitive Seasons</strong></summary>

```yaml
timezone: "UTC"

schedule:
  - name: "January 2025"
    startDate: "2025-01-01"
    endDate: "2025-01-31"
    preset: "default"

  - name: "February 2025"
    startDate: "2025-02-01"
    endDate: "2025-02-28"
    preset: "default"

  # Continue for each month...

onSeasonEnd:
  resetElo: false
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
  resetStreak: true

archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
```

</details>

<details>
<summary><strong>Quarterly Seasons</strong></summary>

```yaml
timezone: "America/New_York"

schedule:
  - name: "Q1 2025"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Q2 2025"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "default"

  - name: "Q3 2025"
    startDate: "2025-07-01"
    endDate: "2025-09-30"
    preset: "default"

  - name: "Q4 2025"
    startDate: "2025-10-01"
    endDate: "2025-12-31"
    preset: "default"

onSeasonEnd:
  softResetElo: true
  softResetFactor: 0.3    # Gentler reset
  resetWinLoss: true
```

</details>

<details>
<summary><strong>Endless Mode (No Resets)</strong></summary>

```yaml
timezone: "UTC"

schedule: []  # Empty = endless mode

onSeasonEnd:
  resetElo: false
  softResetElo: false
  resetWinLoss: false
  resetStreak: false

archive:
  enabled: false
```

</details>

---

## Full Example

<details>
<summary><strong>Complete season.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Season Configuration

checkIntervalMinutes: 1
timezone: "Asia/Tokyo"

schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Season 2"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "default"

onSeasonEnd:
  resetElo: false
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
  resetStreak: true

offSeason:
  allowCasual: true
  allowRankedView: true

archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
  includeStatistics: true

announcements:
  enabled: true
  intervalMinutes: 30
  showRemainingDays: true
```

</details>

---

## See Also

- [Rewards](rewards.md) - Season-end rewards
- [Elo Config](elo.md) - Starting Elo and reset
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
