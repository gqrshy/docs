# Season Management

Competitive time-based periods with automatic rotation, rewards, and cross-server synchronization.

---

## Overview

Seasons are competitive periods where players compete for leaderboard positions and earn exclusive rewards.

**Key Features:**
- ⏰ Automatic rotation based on duration
- 🏆 Top player rewards (customizable per format)
- 📊 Season history tracking
- 🌐 Cross-server synchronization (Redis)
- ⚙️ Manual admin controls

**Default Duration:** 30 days (configurable)

---

## Season Lifecycle

```
Season Start → Competition → Season End → Rewards → New Season
    ↓             ↓              ↓           ↓          ↓
  Day 1       Days 2-29        Day 30      Auto      Day 1
```

### During Season

- Players compete in ranked battles
- Elo changes based on match results
- Leaderboards update in real-time
- Stats accumulate across all formats

### Season End

**Automated Process:**
1. Battle server detects season end (checks every 10 minutes)
2. Distribute rewards to top 25 players per format
3. Create pending rewards for offline players
4. Mark old season as ended in database
5. Create new season automatically
6. Broadcast rotation to all servers (cross-server)
7. Online players receive rewards immediately
8. Offline players receive rewards on next login

### What's Preserved

**✅ Preserved Across Seasons:**
- Elo ratings (unless configured to reset)
- Win/loss records (unless configured to reset)
- Flee count
- Player UUID associations

**❌ Reset Each Season:**
- Milestone reward claim flags
- Season reward eligibility
- Season-specific leaderboard rankings

---

## Configuration

### Basic Settings

**File:** `config/cobbleranked/config.json5`

```json5
{
  "ranked_match": {
    "reset_days": 30,  // Season duration in days
    "seasonReset": {
      "resetElo": false,         // Reset Elo to initial value
      "resetWinsLosses": false   // Reset win/loss counts
    }
  },
  "seasonAnnouncement": {
    "defaultSeasonName": "",  // Leave empty for auto-generated names (YYYY-MM format)
    "announceBeforeEnd": [7, 3, 1]  // Days before end to announce
  }
}
```

### Common Durations

| Duration | Use Case | Command Example |
|----------|----------|-----------------|
| 7 days | Weekly competitions | `/rankedarena season create 7 "Weekly Cup"` |
| 14 days | Bi-weekly tournaments | `/rankedarena season create 14` |
| **30 days** | **Monthly (recommended)** | Default |
| 60 days | Long-term seasons | `/rankedarena season create 60` |
| 90 days | Quarterly competitions | `/rankedarena season create 90` |

---

## Automatic Rotation

Seasons rotate automatically when the configured duration expires.

### How It Works

**Check Interval:** Every 10 minutes (battle server only)

**Rotation Process:**
1. **Check:** `if (current_time >= season_end_time)`
2. **Distribute Rewards:** Top 25 players per format receive season rewards
3. **End Season:** Mark old season as inactive in database
4. **Reset Stats:** Apply Elo/wins/losses reset if configured
5. **Create New Season:** Generate new season with configured duration
6. **Notify Players:** Broadcast season change to all online players
7. **Redis Sync:** Update season cache for cross-server synchronization

**Automatic:** No admin intervention required (unless manual control desired)

---

## Admin Commands

### View Season Information

**Current Season:**
```bash
/rankedarena season info
```

**Output:**
```
╔══════════════════════════════════════╗
║      Current Season Information      ║
╠══════════════════════════════════════╣
║ Season ID: 5                         ║
║ Name: 2025-01                        ║
║ Status: Active                       ║
║ Started: 2025-01-01 00:00:00         ║
║ Ends: 2025-01-31 00:00:00            ║
║ Time Remaining: 12 days, 5 hours     ║
╚══════════════════════════════════════╝
```

**Season History:**
```bash
/rankedarena season history [limit]
```

**Examples:**
```bash
/rankedarena season history        # Show last 10 seasons
/rankedarena season history 5      # Show last 5 seasons
```

---

### Create New Season

**Syntax:**
```bash
/rankedarena season create <days> [name]
```

**Examples:**
```bash
# Auto-generated name (YYYY-MM format)
/rankedarena season create 30

# Custom name
/rankedarena season create 30 "Summer Championship 2025"
/rankedarena season create 14 "Weekly Tournament #52"
```

**Behavior:**
- Ends current season immediately
- Distributes rewards to top players
- Creates new season with specified duration
- Announces to all online players

**Permission:** OP level 2 required

---

### Force Season Rotation

**Immediate Rotation:**
```bash
/rankedarena season rotate
```

**Effect:**
- Ends current season now (ignoring remaining time)
- Follows full rotation process (rewards, reset, create new)
- Use case: Manual season end for events/tournaments

---

### End Current Season

**Mark Season as Ended:**
```bash
/rankedarena season end
```

**Effect:**
- Sets season end date to current time
- Does NOT immediately rotate
- Next automatic check (within 10 minutes) will trigger rotation
- Use case: Schedule season end without immediate rotation

---

### Adjust Season End Time

**Set End Time:**
```bash
/rankedarena season setend <minutes>
```

**Examples:**
```bash
/rankedarena season setend 60      # End in 1 hour
/rankedarena season setend 1440    # End in 1 day (24 hours)
/rankedarena season setend 10080   # End in 1 week (7 days)
```

**Use Cases:**
- Testing season rotation
- Extending/shortening current season
- Synchronizing season end with server events

---

### Rename Current Season

**Change Season Name:**
```bash
/rankedarena season rename <new_name>
```

**Example:**
```bash
/rankedarena season rename "Winter Championship 2025"
```

**Effect:**
- Updates season name in database
- Updates Redis cache (cross-server)
- Announces to all online players

---

## Player Commands

### View Current Season

**Command:**
```bash
/season
```

**Output:**
```
═══════════════════════════════════
       Current Season: 2025-01
═══════════════════════════════════
Status: Active
Time Remaining: 12 days, 5 hours
═══════════════════════════════════
Compete in ranked battles to earn
exclusive season rewards!
```

**Permission:** None (all players)

---

## Reward System Integration

### Season Rewards

**Configuration:** `config/cobbleranked/rewards.json5`

**Example:**
```json5
{
  "seasonRankRewards": {
    "singles": [
      {
        "id": "season_top1_singles",
        "displayName": "&6&l🏆 Champion Reward",
        "minRank": 1,
        "maxRank": 1,
        "commands": [
          "give {player} minecraft:diamond 64",
          "lp user {player} permission set ranked.champion true"
        ]
      },
      {
        "id": "season_top3_singles",
        "displayName": "&e&l🥇 Top 3 Reward",
        "minRank": 1,
        "maxRank": 3,
        "commands": [
          "give {player} minecraft:gold_ingot 32"
        ]
      }
    ],
    "doubles": [
      // Similar structure for Doubles format
    ]
  }
}
```

### Reward Distribution

**Automatic:**
- Top 25 players per format receive rewards at season end
- Online players: Rewards execute immediately
- Offline players: Rewards stored as "pending" in database
- Next login: Pending rewards automatically distributed

**Manual Check:**
```bash
/ranked
# Opens GUI → Click "Rewards" button → View pending season rewards
```

---

## Cross-Server Behavior

### Battle Server Singleton

**⚠️ Critical:** Only ONE server should manage seasons globally.

**Battle Server Configuration:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": ""  // Empty string = this is the battle server
  }
}
```

**Other Servers (Main/Lobby):**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle"  // Points to battle server
  }
}
```

### How Cross-Server Works

**Battle Server:**
- Manages season lifecycle (create, rotate, end)
- Distributes rewards to database
- Publishes season changes to Redis
- Runs automatic rotation checks every 10 minutes

**Main/Lobby Servers:**
- Read season info from Redis cache (60s TTL)
- Display season info to players via `/season` command
- Distribute pending rewards to local online players
- Listen for `SEASON_ROTATED` Redis messages

**Redis Synchronization:**
- Season info cached with 60-second TTL
- Key: `ranked:current_season`
- Fields: `season_id`, `season_name`, `start_date`, `end_date`, `is_active`
- Broadcasts: `SEASON_ROTATED` message on rotation

**Why Singleton?**
- Multiple battle servers would cause duplicate rotations
- Redis heartbeat detects duplicate battle servers
- SEVERE errors emitted if multiple battle servers detected

---

## Season Naming

### Auto-Generated Names

**Format:** `YYYY-MM`

**Examples:**
- `2025-01` (January 2025)
- `2025-12` (December 2025)

**Configuration:**
```json5
{
  "seasonAnnouncement": {
    "defaultSeasonName": ""  // Empty = auto-generate
  }
}
```

### Custom Names

**Set Default Name:**
```json5
{
  "seasonAnnouncement": {
    "defaultSeasonName": "Winter Season"  // All new seasons use this
  }
}
```

**Override on Create:**
```bash
/rankedarena season create 30 "Summer Championship"
```

**Rename Current Season:**
```bash
/rankedarena season rename "Spring Tournament 2025"
```

---

## Season Announcements

### Automatic Announcements

**End-of-Season Warnings:**
- Default: 7 days, 3 days, 1 day before end
- Sent to all online players
- Only announces once per threshold

**Configuration:**
```json5
{
  "seasonAnnouncement": {
    "announceBeforeEnd": [7, 3, 1]  // Days before end
  }
}
```

**Customize Announcements:**
```json5
{
  "seasonAnnouncement": {
    "announceBeforeEnd": [14, 7, 3, 1]  // More frequent warnings
  }
}
```

### Rotation Announcements

**Sent to All Players:**
- Previous season ended
- New season started
- Reminder to collect rewards

**Language Keys:**
```json5
{
  "season_ended_announcement": "&c&l═══════════════════════════",
  "season_previous": "&7Previous Season: &f{season}",
  "season_new": "&aNew Season Started: &f{season}",
  "season_collect_rewards": "&eCollect your season rewards: &f/ranked"
}
```

---

## Season History

### Database Storage

**Table:** `seasons`

**Schema:**
```sql
CREATE TABLE seasons (
    season_id INT AUTO_INCREMENT PRIMARY KEY,
    season_name VARCHAR(255) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
```

### View History

**Command:**
```bash
/rankedarena season history [limit]
```

**Output:**
```
╔═══════════════════════════════════════════════════════╗
║               Season History (Last 5)                  ║
╠═══════════════════════════════════════════════════════╣
║ ID │ Name        │ Start Date │ End Date   │ Status   ║
╟────┼─────────────┼────────────┼────────────┼──────────╢
║ 5  │ 2025-01     │ 2025-01-01 │ 2025-01-31 │ Active   ║
║ 4  │ 2024-12     │ 2024-12-01 │ 2024-12-31 │ Ended    ║
║ 3  │ 2024-11     │ 2024-11-01 │ 2024-11-30 │ Ended    ║
║ 2  │ 2024-10     │ 2024-10-01 │ 2024-10-31 │ Ended    ║
║ 1  │ 2024-09     │ 2024-09-01 │ 2024-09-30 │ Ended    ║
╚═══════════════════════════════════════════════════════╝
```

---

## Testing & Debugging

### Test Season Rotation

**Quick Rotation Test:**
```bash
# 1. Set season to end in 5 minutes
/rankedarena season setend 5

# 2. Wait 5 minutes (or use /rankedarena season rotate for immediate test)
# 3. Check logs for rotation process
tail -f logs/latest.log | grep Season

# 4. Verify new season created
/rankedarena season info
```

### Check Season State

**Redis Cache (Cross-Server):**
```bash
redis-cli
> HGETALL ranked:current_season
```

**Database:**
```sql
SELECT * FROM seasons ORDER BY season_id DESC LIMIT 5;
```

### Common Issues

**Season Not Rotating:**
- Check battle server configuration (must have `battle_server: ""`)
- Verify automatic checks are running (look for "[Season]" logs every 10 minutes)
- Ensure `reset_days` is configured correctly

**Rewards Not Distributed:**
- Check rewards configuration: `config/cobbleranked/rewards.json5`
- Verify top players exist in database: `SELECT * FROM format_stats`
- Check logs for reward distribution errors

**Cross-Server Season Info Not Syncing:**
- Verify Redis connection on all servers
- Check Redis cache: `HGETALL ranked:current_season`
- Ensure battle server is publishing season updates

---

## Best Practices

### Recommended Settings

**Monthly Seasons (Most Common):**
```json5
{
  "ranked_match": {
    "reset_days": 30,
    "seasonReset": {
      "resetElo": false,          // Preserve long-term progression
      "resetWinsLosses": false    // Keep historical stats
    }
  }
}
```

**Weekly Tournaments:**
```json5
{
  "ranked_match": {
    "reset_days": 7,
    "seasonReset": {
      "resetElo": true,           // Fresh start each week
      "resetWinsLosses": true     // Reset for fair competition
    }
  }
}
```

**Long-Term Competitive:**
```json5
{
  "ranked_match": {
    "reset_days": 90,
    "seasonReset": {
      "resetElo": false,          // Preserve skill rating
      "resetWinsLosses": false    // Track all-time stats
    }
  }
}
```

### Admin Guidelines

**✅ DO:**
- Use default auto-rotation for hands-off management
- Configure meaningful season names for events
- Test rotation on staging server before production
- Monitor logs during season rotation

**❌ DON'T:**
- Run multiple battle servers without singleton check
- Manually edit database during rotation
- Force rotate during active battles
- Forget to configure season rewards

---

## See Also

- [Rewards System](../configuration/rewards.md) - Configure season rewards
- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [Commands Reference](../getting-started/commands.md) - All season commands
- [FAQ & Troubleshooting](../support/faq.md) - Common season issues
