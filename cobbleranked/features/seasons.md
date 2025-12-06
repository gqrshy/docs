# Season System

Flexible season scheduling with three modes: scheduled events, yearly recurring seasons, and legacy duration-based rotation.

---

## Overview

Seasons are competitive periods where players compete for leaderboard positions and earn exclusive rewards.

**Key Features:**

- ✅ Three scheduling modes (Scheduled, Recurring, Legacy)
- ✅ IANA timezone support
- ✅ Priority-based conflict resolution
- ✅ Off-season configuration
- ✅ Year-spanning seasons (e.g., Winter: December → February)
- ✅ Automatic announcements before season start/end
- ✅ Cross-server synchronization (Redis)

---

## Scheduling Modes

CobbleRanked supports three season scheduling modes:

| Mode | Use Case | Best For |
|------|----------|----------|
| **Scheduled Seasons** | One-time events with specific dates | Holiday events, tournaments |
| **Recurring Seasons** | Yearly repeating seasons | Spring/Summer/Fall/Winter |
| **Legacy Mode** | Traditional duration-based rotation | Simple setups, backward compatibility |

### Mode Selection

The system automatically selects the appropriate mode:

1. If `legacy_mode.enabled = true` → Uses Legacy Mode
2. Otherwise → Evaluates Scheduled and Recurring seasons by priority

---

## Configuration

**File:** `config/cobbleranked/seasons.json5`

### Basic Structure

```json5
{
  "settings": {
    "timezone": "Asia/Tokyo",
    "fallback_behavior": "OFF_SEASON",
    "off_season": { ... },
    "check_interval_minutes": 5,
    "announce_before_start_hours": [24, 6, 1],
    "announce_before_end_hours": [24, 6, 1]
  },
  "scheduled_seasons": [ ... ],
  "recurring_seasons": [ ... ],
  "legacy_mode": { ... }
}
```

<details>
<summary><strong>Complete Default Configuration</strong></summary>

```json5
{
  "settings": {
    // IANA timezone format (NOT abbreviations like "JST" or "EST")
    // Examples: "Asia/Tokyo", "America/New_York", "Europe/London", "UTC"
    "timezone": "Asia/Tokyo",

    // What happens when no scheduled/recurring season is active?
    // "OFF_SEASON"      - Enter off-season state
    // "EXTEND_PREVIOUS" - Keep previous season active
    // "INSTANT_START"   - Start next scheduled season immediately
    "fallback_behavior": "OFF_SEASON",

    "off_season": {
      "enabled": true,
      "allow_ranked": false,           // Allow ranked battles during off-season
      "announcement_key": "season_off_season_active"
    },

    // How often to check for season transitions (in minutes)
    "check_interval_minutes": 5,

    // Hours before season start/end to send announcements
    "announce_before_start_hours": [24, 6, 1],
    "announce_before_end_hours": [24, 6, 1]
  },

  "scheduled_seasons": [
    // Example: Christmas Event
    // {
    //   "id": "christmas_2025",
    //   "name": "Christmas Ranked 2025",
    //   "start": "2025-12-25 09:00:00",
    //   "end": "2025-12-31 23:59:59",
    //   "priority": 100,
    //   "enabled": true
    // }
  ],

  "recurring_seasons": [
    {
      "id": "spring",
      "name": "Spring Season {year}",
      "start_month": 3, "start_day": 1, "start_time": "00:00:00",
      "end_month": 5, "end_day": 31, "end_time": "23:59:59",
      "crosses_year": false,
      "priority": 50,
      "enabled": true
    },
    {
      "id": "summer",
      "name": "Summer Season {year}",
      "start_month": 6, "start_day": 1, "start_time": "00:00:00",
      "end_month": 8, "end_day": 31, "end_time": "23:59:59",
      "crosses_year": false,
      "priority": 50,
      "enabled": true
    },
    {
      "id": "autumn",
      "name": "Autumn Season {year}",
      "start_month": 9, "start_day": 1, "start_time": "00:00:00",
      "end_month": 11, "end_day": 30, "end_time": "23:59:59",
      "crosses_year": false,
      "priority": 50,
      "enabled": true
    },
    {
      "id": "winter",
      "name": "Winter Season {year}",
      "start_month": 12, "start_day": 1, "start_time": "00:00:00",
      "end_month": 2, "end_day": 28, "end_time": "23:59:59",
      "crosses_year": true,    // December → February spans year boundary
      "priority": 50,
      "enabled": true
    }
  ],

  "legacy_mode": {
    "enabled": false,
    "reset_days": 30,
    "default_season_name": ""   // Empty = auto-generate "YYYY-MM" format
  }
}
```

</details>

---

## Scheduled Seasons

One-time events with specific start and end dates. Ideal for holiday events, tournaments, and special occasions.

### Scheduled Season Configuration

```json5
{
  "scheduled_seasons": [
    {
      "id": "christmas_2025",             // Unique identifier
      "name": "Christmas Ranked 2025",     // Display name
      "start": "2025-12-25 09:00:00",      // Start date/time
      "end": "2025-12-31 23:59:59",        // End date/time
      "priority": 100,                     // Higher = takes precedence
      "enabled": true                      // Set false to disable
    },
    {
      "id": "new_year_2026",
      "name": "New Year Tournament 2026",
      "start": "2026-01-01 00:00:00",
      "end": "2026-01-07 23:59:59",
      "priority": 100,
      "enabled": true
    }
  ]
}
```

### Scheduled Season Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier for database tracking |
| `name` | String | Display name (supports `{year}`, `{month}`, `{day}` placeholders) |
| `start` | String | Start date/time in `YYYY-MM-DD HH:mm:ss` format |
| `end` | String | End date/time in `YYYY-MM-DD HH:mm:ss` format |
| `priority` | Integer | Conflict resolution priority (default: 100) |
| `enabled` | Boolean | Enable/disable without removing |

### Use Cases

- **Holiday Events:** Christmas, New Year, Halloween
- **Anniversary Events:** Server anniversary celebration
- **Limited-Time Tournaments:** Weekend tournaments, beta events
- **Special Collaborations:** Community events

---

## Recurring Seasons

Yearly repeating seasons that automatically adjust for the current year. Ideal for seasonal content like Spring/Summer/Fall/Winter.

### Recurring Season Configuration

```json5
{
  "recurring_seasons": [
    {
      "id": "spring",
      "name": "Spring Season {year}",      // {year} replaced with current year
      "start_month": 3,                    // March
      "start_day": 1,
      "start_time": "00:00:00",
      "end_month": 5,                      // May
      "end_day": 31,
      "end_time": "23:59:59",
      "crosses_year": false,               // Does NOT span year boundary
      "priority": 50,
      "enabled": true
    }
  ]
}
```

### Recurring Season Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier |
| `name` | String | Display name (supports `{year}` placeholder) |
| `start_month` | Integer | Start month (1-12) |
| `start_day` | Integer | Start day (1-31, auto-clamped) |
| `start_time` | String | Start time in `HH:mm:ss` format |
| `end_month` | Integer | End month (1-12) |
| `end_day` | Integer | End day (1-31, auto-clamped for leap years) |
| `end_time` | String | End time in `HH:mm:ss` format |
| `crosses_year` | Boolean | Set `true` for seasons spanning December → January |
| `priority` | Integer | Conflict resolution priority (default: 50) |
| `enabled` | Boolean | Enable/disable without removing |

### Year-Spanning Seasons

For seasons that cross the year boundary (e.g., Winter: December → February), set `crosses_year: true`:

```json5
{
  "id": "winter",
  "name": "Winter Season {year}",
  "start_month": 12,
  "start_day": 1,
  "end_month": 2,
  "end_day": 28,
  "crosses_year": true,    // ⚠️ Required for December → February
  "priority": 50,
  "enabled": true
}
```

**How it works:**

- If current date is December 2025, season runs Dec 1, 2025 → Feb 28, 2026
- If current date is January/February 2026, still matches the same Winter 2025 season

> 📝 **Note:** Leap years are automatically handled. February 28 is the safe default; February 29 will be used when applicable.

---

## Legacy Mode

Traditional duration-based seasons for simple setups and backward compatibility.

### Legacy Mode Configuration

```json5
{
  "legacy_mode": {
    "enabled": true,                    // Enable legacy mode
    "reset_days": 30,                   // Season duration in days
    "default_season_name": ""           // Empty = auto-generate "YYYY-MM"
  }
}
```

**When Legacy Mode is Enabled:**

- `scheduled_seasons` and `recurring_seasons` are **ignored**
- Seasons automatically rotate every `reset_days` days
- New season starts immediately when previous ends

### Common Durations

| Duration | Use Case |
|----------|----------|
| 7 days | Weekly tournaments |
| 14 days | Bi-weekly competitions |
| **30 days** | Monthly (recommended) |
| 90 days | Quarterly seasons |

---

## Settings

### Timezone Configuration

All schedule times are interpreted in the configured timezone.

```json5
{
  "settings": {
    "timezone": "Asia/Tokyo"
  }
}
```

**IANA Timezone Format:**

| Region | Timezone |
|--------|----------|
| Japan | `Asia/Tokyo` |
| US Eastern | `America/New_York` |
| US Pacific | `America/Los_Angeles` |
| UK | `Europe/London` |
| Central Europe | `Europe/Paris` |
| UTC | `UTC` |

> ⚠️ **Warning:** Do NOT use timezone abbreviations like `JST`, `EST`, or `PST`. These are ambiguous and may cause errors.

Full list: [IANA Time Zone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### Fallback Behavior

What happens when no scheduled or recurring season is active?

```json5
{
  "settings": {
    "fallback_behavior": "OFF_SEASON"
  }
}
```

| Behavior | Description |
|----------|-------------|
| `OFF_SEASON` | Enter off-season state (may disable ranked battles) |
| `EXTEND_PREVIOUS` | Keep the previous season active until next starts |
| `INSTANT_START` | Immediately start the next scheduled season |

### Off-Season Configuration

When `fallback_behavior = "OFF_SEASON"`:

```json5
{
  "settings": {
    "off_season": {
      "enabled": true,
      "allow_ranked": false,
      "announcement_key": "season_off_season_active"
    }
  }
}
```

| Setting | Description |
|---------|-------------|
| `enabled` | Enable off-season mode |
| `allow_ranked` | Allow ranked battles during off-season |
| `announcement_key` | Language key for off-season announcement |

### Check Interval

How often the server checks for season transitions:

```json5
{
  "settings": {
    "check_interval_minutes": 5
  }
}
```

- Lower values = more responsive, slightly higher server load
- Recommended: 1-10 minutes

### Announcements

Configure advance warnings before season start/end:

```json5
{
  "settings": {
    "announce_before_start_hours": [24, 6, 1],
    "announce_before_end_hours": [24, 6, 1]
  }
}
```

This sends announcements at 24 hours, 6 hours, and 1 hour before the event.

---

## Priority System

When multiple seasons overlap, priority determines which is active:

```json5
{
  "scheduled_seasons": [
    {"id": "christmas", "priority": 100, ...},   // Higher priority
    {"id": "winter_event", "priority": 50, ...}  // Lower priority
  ]
}
```

**Priority Rules:**

1. Higher priority takes precedence
2. Scheduled seasons are evaluated before recurring seasons
3. If equal priority and overlap, first defined wins

**Recommended Priority Values:**

| Priority | Use Case |
|----------|----------|
| 100+ | Special events (holidays, tournaments) |
| 50 | Regular recurring seasons |
| 1-49 | Fallback/default seasons |

---

## Admin Commands

### View Schedule Information

```bash
/rankedadmin season schedule
```

Shows current schedule status including:

- Active season (name, type, end time)
- Off-season status
- Next scheduled season
- Fallback behavior

### Reload Schedule Configuration

```bash
/rankedadmin season schedule reload
```

Reloads `seasons.json5` without server restart. Also validates configuration and reports any issues.

### View Upcoming Seasons

```bash
/rankedadmin season schedule upcoming [days]
```

| Argument | Default | Description |
|----------|---------|-------------|
| `days` | 90 | Number of days to look ahead |

**Example:**

```bash
/rankedadmin season schedule upcoming 365
```

### Validate Configuration

```bash
/rankedadmin season schedule validate
```

Checks for configuration issues:

- Invalid timezone
- Overlapping seasons with same priority
- Invalid date ranges
- Invalid month/day values

### Other Season Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin season info` | Current season details |
| `/rankedadmin season history [limit]` | Past seasons |
| `/rankedadmin season create <days> [name]` | Create new season |
| `/rankedadmin season rotate` | Force immediate rotation |
| `/rankedadmin season end` | Mark current season as ended |
| `/rankedadmin season setend <minutes>` | Adjust end time |
| `/rankedadmin season rename <name>` | Rename current season |

---

## Player Commands

### View Current Season

```bash
/season
```

Shows current season information including name, status, and time remaining.

---

## Season Lifecycle

### During Season

Players compete in ranked battles:

- Elo changes based on match results
- Leaderboards update in real-time
- Stats accumulate across all formats

### Season End

**Automated Process:**

1. Detect season end (based on schedule)
2. Distribute rewards to top players per format
3. Create pending rewards for offline players
4. Mark season as ended in database
5. Transition to next season (or off-season)
6. Broadcast to all servers (cross-server)

### What Resets

| Data | Default Behavior |
|------|------------------|
| Milestone claim flags | Reset |
| Season reward eligibility | Reset |
| Season leaderboard | Reset |
| Elo ratings | Preserved (configurable) |
| Win/loss records | Preserved (configurable) |

---

## Cross-Server Behavior

### Battle Server Singleton

> ⚠️ **Critical:** Only ONE server should manage seasons.

**Battle Server Configuration:**

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": ""   // Empty = this is the battle server
  }
}
```

**Other Servers:**

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle"
  }
}
```

### Synchronization

Season data is synchronized across servers:

- Season info cached in Redis with 60s TTL
- `SEASON_ROTATED` message broadcast on transitions
- All servers display consistent season information

---

## Examples

### Four Seasonal Rotation (Default)

```json5
{
  "settings": {
    "timezone": "America/New_York",
    "fallback_behavior": "OFF_SEASON"
  },
  "recurring_seasons": [
    {"id": "spring", "name": "Spring {year}", "start_month": 3, "start_day": 1, "end_month": 5, "end_day": 31, "priority": 50, "enabled": true},
    {"id": "summer", "name": "Summer {year}", "start_month": 6, "start_day": 1, "end_month": 8, "end_day": 31, "priority": 50, "enabled": true},
    {"id": "autumn", "name": "Autumn {year}", "start_month": 9, "start_day": 1, "end_month": 11, "end_day": 30, "priority": 50, "enabled": true},
    {"id": "winter", "name": "Winter {year}", "start_month": 12, "start_day": 1, "end_month": 2, "end_day": 28, "crosses_year": true, "priority": 50, "enabled": true}
  ],
  "legacy_mode": {"enabled": false}
}
```

### Monthly Rotation (Legacy)

```json5
{
  "legacy_mode": {
    "enabled": true,
    "reset_days": 30,
    "default_season_name": ""
  }
}
```

### Holiday Events Override

```json5
{
  "scheduled_seasons": [
    {
      "id": "christmas_2025",
      "name": "Christmas Championship 2025",
      "start": "2025-12-20 00:00:00",
      "end": "2025-12-27 23:59:59",
      "priority": 100,    // Override recurring Winter season
      "enabled": true
    }
  ],
  "recurring_seasons": [
    {
      "id": "winter",
      "name": "Winter {year}",
      "start_month": 12, "start_day": 1,
      "end_month": 2, "end_day": 28,
      "crosses_year": true,
      "priority": 50,     // Lower priority than Christmas event
      "enabled": true
    }
  ]
}
```

During December 20-27, Christmas Championship takes precedence. Winter season resumes after.

---

## See Also

- [Rewards System](../configuration/rewards.md) - Configure season rewards
- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [Commands Reference](../getting-started/commands.md) - All season commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
