# Season System

Competitive periods with scheduled rotation, Elo resets, and seasonal rewards.

---

## Overview

Seasons are competitive periods where players compete for leaderboard positions and earn exclusive rewards.

**Key Features:**

- ✅ Scheduled season rotation
- ✅ Elo soft reset between seasons
- ✅ Season-specific blacklist presets
- ✅ Top player archival
- ✅ Automatic announcements
- ✅ Cross-server synchronization

---

## Configuration

**File:** `config/cobbleranked/season.yaml`

### Basic Settings

```yaml
checkIntervalMinutes: 1
timezone: "Asia/Tokyo"
```

| Field | Default | Description |
|-------|---------|-------------|
| `checkIntervalMinutes` | `1` | How often to check for season changes |
| `timezone` | `"Asia/Tokyo"` | Timezone for schedule interpretation |

### Common Timezones

| Region | Timezone |
|--------|----------|
| Japan | `Asia/Tokyo` |
| US Eastern | `America/New_York` |
| US Pacific | `America/Los_Angeles` |
| UK | `Europe/London` |
| Central Europe | `Europe/Paris` |
| UTC | `UTC` |

> ⚠️ **Warning:** Use IANA format. Do NOT use abbreviations like `JST`, `EST`, `PST`.

---

## Season Schedule

Define seasons with specific start and end dates:

```yaml
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Season 2"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "competitive"

  - name: "Summer Championship"
    startDate: "2025-07-01"
    endDate: "2025-08-31"
    preset: "summer_rules"
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Season display name |
| `startDate` | String | Start date (`YYYY-MM-DD` or `YYYY-MM-DD HH:mm:ss`) |
| `endDate` | String | End date |
| `preset` | String | Blacklist preset file name (without `.yaml`) |

### Date Formats

```yaml
# Date only (starts at 00:00:00)
startDate: "2025-01-01"

# Date with time
startDate: "2025-01-01 09:00:00"
```

### Blacklist Presets

Each season can use different ban rules:

```yaml
schedule:
  - name: "Casual Season"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "casual"      # Uses presets/casual.yaml

  - name: "Competitive Season"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "competitive"  # Uses presets/competitive.yaml
```

Preset files location: `config/cobbleranked/presets/`

---

## Season End Behavior

Configure what happens when a season ends:

```yaml
onSeasonEnd:
  resetElo: false
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
  resetStreak: true
```

| Field | Default | Description |
|-------|---------|-------------|
| `resetElo` | `false` | Full reset to startingElo |
| `softResetElo` | `true` | Partial reset toward startingElo |
| `softResetFactor` | `0.5` | Reset intensity (0.0 = no change, 1.0 = full reset) |
| `resetWinLoss` | `true` | Reset win/loss records |
| `resetStreak` | `true` | Reset win streak |

### Soft Reset Formula

```
newElo = currentElo - ((currentElo - startingElo) × softResetFactor)
```

**Examples (startingElo = 1000):**

| Current Elo | Factor | New Elo |
|-------------|--------|---------|
| 1500 | 0.5 | 1250 |
| 1500 | 0.75 | 1125 |
| 800 | 0.5 | 900 |
| 1200 | 0.25 | 1150 |

---

## Off-Season Settings

Configure behavior when no season is active:

```yaml
offSeason:
  allowCasual: true
  allowRankedView: true
```

| Field | Default | Description |
|-------|---------|-------------|
| `allowCasual` | `true` | Allow casual battles during off-season |
| `allowRankedView` | `true` | Allow viewing ranked stats/leaderboards |

---

## Archive Settings

Preserve historical season data:

```yaml
archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
  includeStatistics: true
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable season archival |
| `keepAllPlayers` | `false` | Archive all player data |
| `topPlayersCount` | `100` | Archive top N players per format |
| `includeStatistics` | `true` | Include detailed statistics |

### Archived Data

When a season ends, the following is archived:

- Top player rankings per format
- Player Elo ratings
- Win/loss records
- Match history (if enabled)
- Season metadata

---

## Announcements

Configure automatic season announcements:

```yaml
announcements:
  enabled: true
  intervalMinutes: 30
  showRemainingDays: true
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable season announcements |
| `intervalMinutes` | `30` | Announcement frequency |
| `showRemainingDays` | `true` | Show days remaining in season |

Players receive announcements about:
- Season start/end
- Days remaining
- Current season rewards

---

## Full Configuration Example

<details>
<summary><strong>Complete season.yaml</strong></summary>

```yaml
# Season check frequency
checkIntervalMinutes: 1

# Timezone for schedule interpretation
timezone: "Asia/Tokyo"

# Season schedule
schedule:
  - name: "Season 1 - Spring"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Season 2 - Summer"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "default"

  - name: "Season 3 - Fall"
    startDate: "2025-07-01"
    endDate: "2025-09-30"
    preset: "competitive"

  - name: "Season 4 - Winter"
    startDate: "2025-10-01"
    endDate: "2025-12-31"
    preset: "competitive"

# What happens when season ends
onSeasonEnd:
  resetElo: false
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
  resetStreak: true

# Off-season settings
offSeason:
  allowCasual: true
  allowRankedView: true

# Historical data archival
archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
  includeStatistics: true

# Automatic announcements
announcements:
  enabled: true
  intervalMinutes: 30
  showRemainingDays: true
```

</details>

---

## Admin Commands

### View Current Season

```bash
/rankedadmin season info
```

Shows:
- Season name
- Start/end dates
- Days remaining
- Active preset

### View Season History

```bash
/rankedadmin season history [limit]
```

| Argument | Default | Description |
|----------|---------|-------------|
| `limit` | `10` | Number of past seasons to show |

### Force Season Rotation

```bash
/rankedadmin season rotate
```

Immediately ends current season and starts next scheduled season.

### End Current Season

```bash
/rankedadmin season end
```

Marks current season as ended without starting next.

### Adjust Season End Time

```bash
/rankedadmin season setend <minutes>
```

Extends or shortens current season by specified minutes.

### Rename Current Season

```bash
/rankedadmin season rename <name>
```

Changes the display name of current season.

---

## Player Commands

### View Season Info

```bash
/season
```

Shows current season name and time remaining.

### View Season Rewards

```bash
/rewards
```

Opens GUI showing available season rewards.

---

## Season Lifecycle

### 1. Season Start

- New season begins at scheduled time
- Announcements sent to all players
- Blacklist preset is applied
- Leaderboards reset (if configured)

### 2. During Season

- Players compete in ranked matches
- Elo ratings change based on results
- Leaderboards update in real-time
- Milestones can be achieved

### 3. Season End

1. Season end detected
2. Final rankings calculated
3. Season rewards distributed
4. Player data archived
5. Elo soft reset applied (if configured)
6. Transition to next season or off-season

### 4. Off-Season (Optional)

- Period between scheduled seasons
- Casual battles available (if enabled)
- Stats viewable but frozen
- Next season countdown displayed

---

## Cross-Server Synchronization

For multi-server setups, season data is synchronized:

```yaml
# Only battle server manages seasons
crossServer:
  enabled: true
  serverId: "battle"
  battleServer: ""  # Empty = this is the battle server
```

**Season Sync Features:**

- Season info cached in Redis (60s TTL)
- `SEASON_ROTATED` message broadcast on transitions
- All servers display consistent season information

> ⚠️ **Important:** Only the battle server should manage season transitions.

---

## Examples

### Quarterly Seasons

```yaml
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
```

### Monthly Seasons

```yaml
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
```

### Special Event Season

```yaml
schedule:
  - name: "Summer Championship 2025"
    startDate: "2025-07-15 09:00:00"
    endDate: "2025-08-15 23:59:59"
    preset: "tournament"
```

---

## See Also

- [Elo System](elo-system.md) - Rating system details
- [Rewards Configuration](../configuration/rewards.md) - Season rewards setup
- [Blacklist](../configuration/blacklist.md) - Preset configuration
- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server setup
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
