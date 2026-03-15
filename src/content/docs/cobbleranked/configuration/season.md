---
title: Season Configuration
description: Configure season schedules and reset behavior.
---

Configure season behavior in `season.yaml`.

## Basic Settings

```yaml
# season.yaml
checkIntervalMinutes: 1
timezone: "Asia/Tokyo"

schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31 23:59:59"
    preset: "default"
```

| Setting | Default | Description |
|---------|---------|-------------|
| `checkIntervalMinutes` | `1` | How often to check for season end |
| `timezone` | Required | IANA timezone ID (e.g., `Asia/Tokyo`, `UTC`) |
| `schedule` | Required | List of seasons in order |

### Season Schedule

Each season in the schedule has these properties:

| Property | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Unique season identifier |
| `startDate` | Yes | When season starts (YYYY-MM-DD) |
| `endDate` | Yes | When season ends (YYYY-MM-DD HH:mm:ss) |
| `preset` | Yes | Which season preset to use |

<details>
<summary><strong>Multiple Seasons Example</strong></summary>

```yaml
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31 23:59:59"
    preset: "default"

  - name: "Season 2"
    startDate: "2025-04-01"
    endDate: "2025-06-30 23:59:59"
    preset: "smogon"

  - name: "Season 3"
    startDate: "2025-07-01"
    endDate: "2025-09-30 23:59:59"
    preset: "vgc"
```

Seasons activate automatically based on the current date and time.

</details>

## Season End Settings

```yaml
# season.yaml
onSeasonEnd:
  resetElo: false
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
  resetStreak: true
```

<details>
<summary><strong>Season End Settings Explained</strong></summary>

| Setting | Default | Description |
|---------|---------|-------------|
| `resetElo` | `false` | Hard reset all ELO to starting value |
| `softResetElo` | `true` | Partial reset towards starting ELO |
| `softResetFactor` | `0.5` | How much to reset (0.5 = halfway to start) |
| `resetWinLoss` | `true` | Clear win/loss records |
| `resetStreak` | `true` | Clear win/loss streaks |

**Soft Reset Example:**
- Player has 1800 ELO, starting ELO is 1500
- `softResetFactor: 0.5`
- New ELO = 1500 + (1800 - 1500) × 0.5 = **1650**

**When to use hard reset:**
- Complete fresh start each season
- New players can compete with veterans

**When to use soft reset:**
- Reward skilled players while compressing the ladder
- Less frustrating for top players

</details>

## Archive Settings

```yaml
# season.yaml
archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
  includeStatistics: true
```

| Setting | Description |
|---------|-------------|
| `keepAllPlayers` | Archive everyone (large database) |
| `topPlayersCount` | Only archive top N players |
| `includeStatistics` | Include detailed stats in archive |

### Archive Behavior

When a season ends:
1. Final leaderboard is determined
2. Top players are archived (if enabled)
3. Archived stats are viewable in GUI
4. Players can see previous season rankings

<details>
<summary><strong>Archive vs. Keep All</strong></summary>

**keepAllPlayers: false** (Default)
- Only top 100 players archived
- Smaller database size
- Faster queries

**keepAllPlayers: true**
- Every player's stats archived
- Complete historical record
- Larger database size

Use `keepAllPlayers: true` only if you need complete records for all players.

</details>

## Timezone Reference

Use IANA timezone identifiers:

| Region | Example Timezones |
|--------|-------------------|
| Asia | `Asia/Tokyo`, `Asia/Seoul`, `Asia/Shanghai` |
| Europe | `Europe/London`, `Europe/Paris`, `Europe/Berlin` |
| Americas | `America/New_York`, `America/Los_Angeles`, `America/Chicago` |
| UTC | `UTC` |

> 📝 **Important**: Always use IANA format, NOT abbreviations like `JST`, `EST`, `PST`.

---

## See Also

- [Seasons Feature](../features/seasons) - How seasons work for players
- [Rewards Configuration](rewards) - Season-end rewards
- [Season Presets](../features/battle-formats) - Format rules per season
