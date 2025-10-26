# Season Management

Learn how seasonal rankings work and how to configure automatic season rotation.

## Overview

Seasons are time-based competitive periods where players compete for leaderboard positions and rewards. At the end of each season:
- Top players receive season rewards
- Reward collection flags reset
- New season begins
- Player stats (Elo, wins, losses) are **preserved**

**Default season length:** 30 days

---

## How Seasons Work

### Season Lifecycle

```
Season Start → Players Compete → Season End → Rewards Distributed → New Season
     ↓              ↓                ↓                ↓                 ↓
  Day 1         Days 2-29          Day 30          Day 31            Day 1
```

### What Happens During a Season

1. **Players compete** in ranked battles
2. **Elo changes** based on wins/losses
3. **Leaderboard updates** in real-time
4. **Milestone rewards** unlock as players progress

### What Happens at Season End

1. **Leaderboard finalized** based on final Elo
2. **Season rewards calculated** for top players
3. **Rewards become claimable** via GUI
4. **Reward flags reset** (milestone rewards can be earned again)
5. **New season starts** automatically

### What Persists Across Seasons

**✅ Preserved:**
- Elo rating
- Total wins
- Total losses
- Flee count
- Player stats

**❌ Reset:**
- Milestone reward collection flags
- Season reward claims

---

## Configuration

### Season Duration

Edit `config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    "reset_days": 30  // Season length in days
  }
}
```

**Common configurations:**

| Duration | Use Case |
|----------|----------|
| 7 days | Weekly competitions |
| 14 days | Bi-weekly seasons |
| 30 days | **Monthly (recommended)** |
| 60 days | Long-term competitive |
| 90 days | Quarterly seasons |

**Recommendation:** 30 days balances competitiveness with reasonable time commitment.

---

## Season Information

### Check Current Season

```bash
/rankedarena season info
```

**Output:**
```
Current Season: Season 5
Season ID: 5
Started: 2025-10-26 00:00:00
Ends: 2025-11-25 23:59:59
Days Remaining: 30
```

### Season Data

Each season tracks:
- **Season ID** - Sequential number (1, 2, 3, ...)
- **Season Name** - Optional custom name
- **Start Date** - When season began
- **End Date** - When season ends (23:59:59 on last day)
- **Status** - Active or ended

---

## Manual Season Management

### Rotate Season Manually

Force end current season and start new one:

```bash
/rankedarena season rotate
```

**What happens:**
1. Current season ends immediately
2. Top 3 players receive season rewards
3. Reward flags reset for all players
4. New season starts
5. Announcement sent to all online players

**Use cases:**
- Testing season rotation
- Special events (tournament seasons)
- Adjusting season schedule

**Warning:** Cannot be undone!

### Season Announcements

When season rotates, all online players receive:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SEASON 5 HAS ENDED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Top 3 Players:
  🥇 1st: PlayerA (1847 Elo)
  🥈 2nd: PlayerB (1726 Elo)
  🥉 3rd: PlayerC (1689 Elo)

Congratulations to all participants!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SEASON 6 BEGINS NOW!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Season Rewards

### How Season Rewards Work

1. **Season ends** (automatically or manually)
2. **Final leaderboard calculated**
3. **Rewards assigned** based on rank
4. **Players notified** of available rewards
5. **Players claim** via `/ranked` GUI

### Reward Distribution

**By format:**
- Singles leaderboard → Singles rewards
- Doubles leaderboard → Doubles rewards

**By rank:**
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "commands": ["give {player} minecraft:diamond 64"]
      },
      "rank_2_3": {
        "rank_range": "2-3",
        "commands": ["give {player} minecraft:gold_ingot 32"]
      },
      "rank_4_10": {
        "rank_range": "4-10",
        "commands": ["give {player} minecraft:iron_ingot 16"]
      }
    }
  }
}
```

See [Rewards System](../configuration/rewards.md) for details.

### Claiming Season Rewards

1. **Open ranked GUI:** `/ranked`
2. **Unclaimed rewards appear** as items
3. **Click reward item** to claim
4. **Commands execute** (items given, permissions granted, etc.)

**One-time claim:**
- Each season reward can only be claimed once
- After claiming, item disappears from GUI

---

## Milestone Rewards & Seasons

### What Happens to Milestones

Milestone rewards (10 wins, 50 wins, 1500 Elo, etc.) reset at season rotation:

**Before season end:**
- Player has claimed "10 wins" reward
- Flag set: ✅ Collected

**After season rotation:**
- Flag reset: ❌ Not collected
- Player can earn again in new season

**Example:**
```
Season 1: Earned 10 wins reward → Claimed
Season 2: Can earn 10 wins reward again → Must reach 10 wins
```

**Why reset?**
- Encourages continued participation
- Rewards consistent players
- Keeps ladder active

---

## Automatic Season Rotation

### How Automatic Rotation Works

CobbleRanked checks for season end every 10 minutes:

1. **Server tick** (every 10 minutes)
2. **Check current season end date**
3. **If past end date** → Rotate season
4. **Announce to players**
5. **Distribute rewards**

**Example:**
- Season ends: 2025-11-25 23:59:59
- Next check: 2025-11-26 00:10:00
- Result: Season rotates automatically

**Precision:**
- Season ends within 10 minutes of configured time
- Typically rotates at :00, :10, :20, :30, :40, :50 minutes

### Disabling Automatic Rotation

To disable automatic rotation:

```json5
{
  "ranked_match": {
    "reset_days": 0  // 0 = no automatic rotation
  }
}
```

**Manual rotation only:**
- Seasons never end automatically
- Must use `/rankedarena season rotate` manually
- Useful for custom tournament schedules

---

## Season Statistics

### Viewing Season Stats

Check individual player stats:

```bash
/stats PlayerName
```

**Output:**
```
═══════════════════════════════
  Ranked Stats - PlayerName
═══════════════════════════════
Elo Rating: 1247
Total Battles: 23
Wins: 15 | Losses: 8
Win Rate: 65.2%
Flee Count: 0
Current Season: Season 5
```

### Leaderboard by Season

View current season leaderboard:

```bash
/leaderboard singles
```

**Historical seasons:**
- Currently, only current season leaderboard is displayed
- Past season data is stored in database (future feature)

---

## Cross-Server Seasons

### Important: Battle Server Only

In cross-server mode, **only the battle server** manages seasons:

```json5
{
  "cross_server": {
    "enabled": true,
    "battle_server": ""  // Empty = this is battle server
  }
}
```

**Why?**
- Prevents duplicate season rotation
- Single source of truth
- Consistent reward distribution

**Lobby/main servers:**
```json5
{
  "cross_server": {
    "enabled": true,
    "battle_server": "battle1"  // Redirect to battle server
  }
}
```

**If multiple battle servers:**
- ⚠️ WARNING: Critical error!
- Each server will rotate seasons independently
- Duplicate rewards distributed
- Database conflicts

**Solution:** Only ONE server should have `battle_server: ""`

See [Cross-Server Setup](../advanced/cross-server.md) for details.

---

## Season Naming (Optional)

### Custom Season Names

Give seasons custom names:

```bash
/rankedarena season setname "Summer Championship 2025"
```

**Default naming:**
- Season 1, Season 2, Season 3, etc.

**Custom naming use cases:**
- Themed seasons (Summer, Winter, Spring, Fall)
- Tournament seasons (Championship Season, Playoff Season)
- Event seasons (Halloween Cup, Holiday Battle)

**Display:**
```
Current Season: Summer Championship 2025
Started: 2025-06-01 00:00:00
Ends: 2025-06-30 23:59:59
```

---

## Best Practices

### Season Length

**Too short (< 7 days):**
- ❌ Not enough time to climb ladder
- ❌ Casual players can't participate
- ❌ Too frequent reward resets

**Too long (> 90 days):**
- ❌ Ladder becomes stagnant
- ❌ Players lose interest
- ❌ Inactive players stay on leaderboard

**Recommended: 30 days**
- ✅ Enough time to compete
- ✅ Keeps ladder fresh
- ✅ Monthly competitive cycle

### Reward Structure

**Balance is key:**

**Too generous:**
- ❌ Economy inflation
- ❌ Rewards lose value
- ❌ No incentive to improve

**Too stingy:**
- ❌ Players don't participate
- ❌ No motivation
- ❌ Inactive ladder

**Recommended structure:**
- Top 1: Significant reward (rare items, titles)
- Top 3: Good reward (valuable items)
- Top 10: Moderate reward (useful items)
- Top 25: Small reward (participation reward)

### Announcements

**Communicate with players:**
- Announce season start date
- Remind players of end date (1 week, 1 day)
- Announce rewards before season starts
- Celebrate winners at season end

**Example Discord announcement:**
```
📅 Season 5 ends in 7 days!

Current Top 3:
🥇 1st: PlayerA (1847 Elo)
🥈 2nd: PlayerB (1726 Elo)
🥉 3rd: PlayerC (1689 Elo)

Top 3 rewards:
• 1st Place: 64 Diamonds + Legend Title
• 2nd-3rd: 32 Gold Ingots + Master Title

Time to climb! 🚀
```

---

## Troubleshooting

### Season not rotating automatically

**Symptoms:** Season past end date but still active

**Solutions:**
1. Check `reset_days` is not 0
2. Verify server is running (rotation checks every 10 minutes)
3. Check console for errors
4. Manually rotate: `/rankedarena season rotate`

### Season rewards not distributing

**Symptoms:** Top players didn't receive rewards

**Solutions:**
1. Verify rewards configured in `rewards.json5`
2. Check rank ranges (e.g., `"rank_range": "1"` for 1st place)
3. Ensure format matches (singles vs doubles)
4. Check console for errors
5. Manually test command execution

### Players can't claim rewards

**Symptoms:** Reward item appears but doesn't work

**Solutions:**
1. Check command syntax in `rewards.json5`
2. Verify required plugins (economy, permissions)
3. Test command manually: `/give PlayerName minecraft:diamond 64`
4. Check player has inventory space

### Multiple seasons created

**Symptoms:** Database shows duplicate seasons

**Solutions:**
1. **Cross-server issue:** Multiple battle servers detected
2. Check all servers have correct `battle_server` setting
3. Only ONE server should manage seasons
4. Check console for "CRITICAL ERROR: Multiple Battle Servers" message

---

## Frequently Asked Questions

### Do I lose my Elo at season end?

**No!** Elo and all stats are preserved across seasons.

**Only reset:**
- Milestone reward flags (can earn again)
- Season reward claims

### Can I extend a season?

**No direct command**, but you can:
1. Change `reset_days` to longer duration
2. Manually rotate when desired
3. New season will use new duration

### What if no one plays during a season?

**Season still rotates** on schedule.

**Result:**
- No rewards distributed (no one ranked)
- New season starts
- Business as usual

### Can I have different season lengths per format?

**No.** All formats (Singles, Doubles) share the same season:
- Same start date
- Same end date
- Simultaneous rotation

**Workaround:** Not supported currently.

---

**Next:** Learn about [Battle Formats](battle-formats.md) for Singles and Doubles battles.
