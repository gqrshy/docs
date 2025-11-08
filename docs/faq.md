# Frequently Asked Questions (FAQ)

Common questions and solutions for CobbleRanked players and server owners.

## Table of Contents

**For Players:**
1. [How do I start playing ranked?](#how-do-i-start-playing-ranked)
2. [Why can't I join the queue?](#why-cant-i-join-the-queue)
3. [How does the Elo system work?](#how-does-the-elo-system-work)
4. [What happens if I disconnect during a battle?](#what-happens-if-i-disconnect-during-a-battle)
5. [How do I check what Pokemon are banned?](#how-do-i-check-what-pokemon-are-banned)
6. [Can I play both Singles and Doubles?](#can-i-play-both-singles-and-doubles)
7. [How do seasons work?](#how-do-seasons-work)
8. [When do I get rewards?](#when-do-i-get-rewards)

**For Server Owners:**
9. [How do I install CobbleRanked?](#how-do-i-install-cobbleranked)
10. [Do I need MySQL/Redis for a single server?](#do-i-need-mysqlredis-for-a-single-server)
11. [How do I ban specific Pokemon?](#how-do-i-ban-specific-pokemon)
12. [How do I change the Elo system?](#how-do-i-change-the-elo-system)
13. [Can I customize rewards?](#can-i-customize-rewards)
14. [How do I set up cross-server ranked?](#how-do-i-set-up-cross-server-ranked)
15. [Why aren't my config changes working?](#why-arent-my-config-changes-working)
16. [How do I backup player data?](#how-do-i-backup-player-data)

---

## For Players

### How do I start playing ranked?

**Simple steps:**

1. **Get enough Pokemon**
   - Singles: Need at least 3 Pokemon
   - Doubles: Need at least 4 Pokemon

2. **Open the ranked menu**
   ```
   /ranked
   ```

3. **Click "Join Queue"**
   - Select Singles or Doubles format
   - Wait for a match (usually 30-60 seconds)

4. **Accept the match**
   - Click the green checkmark when match is found
   - You have 30 seconds to accept

5. **Select your team**
   - Choose which Pokemon to bring
   - Select your lead Pokemon
   - Confirm and battle!

**Tip:** Make sure you don't have any banned Pokemon or items before queueing!

---

### Why can't I join the queue?

**Common reasons and solutions:**

**"Not enough Pokemon to queue"**
- **Problem:** You need 3 Pokemon for Singles, 4 for Doubles
- **Solution:** Catch more Pokemon or retrieve them from PC

**"Cannot queue with banned items"**
- **Problem:** You have banned items in your inventory (like Tera Orb)
- **Solution:** Remove items listed in error message
- **Common banned items:** Tera Orb, Dynamax Band

**"Your Pokemon contains banned species/moves/abilities"**
- **Problem:** Your team has banned Pokemon, moves, or abilities
- **Solution:**
  1. Open `/ranked`
  2. Click "Blacklist" button
  3. See what's banned
  4. Remove banned Pokemon from your party

**"You are banned from queue for X minutes"**
- **Problem:** You have flee penalties from disconnecting
- **Solution:** Wait for the ban to expire, or ask admin to reset with `/rankedarena setflee YourName 0`

**"Queue system not available"**
- **Problem:** Ranked system is disabled or you're on the battle server
- **Solution:**
  - Ask server admin if system is enabled
  - If cross-server, use `/server main1` to go to lobby server

**"You are already in a battle"**
- **Problem:** You're already in an active battle
- **Solution:** Finish your current battle first

---

### How does the Elo system work?

**Basic explanation:**

**What is Elo?**
- A rating number that shows your skill level
- Higher Elo = better player
- Default start: 1000 Elo

**How do you gain/lose Elo?**
- **Win:** Elo goes up
- **Lose:** Elo goes down
- **Amount depends on opponent's rating:**
  - Beat higher-rated opponent = more Elo gained
  - Beat lower-rated opponent = less Elo gained
  - Lose to higher-rated opponent = less Elo lost
  - Lose to lower-rated opponent = more Elo lost

**Elo Tiers (approximate):**
| Elo Range | Skill Level |
|-----------|-------------|
| 1000-1199 | Beginner |
| 1200-1499 | Intermediate |
| 1500-1799 | Advanced |
| 1800-2099 | Expert |
| 2100+ | Master |

**Can you drop below 1000 Elo?**
- No! (in Pokemon Showdown mode)
- 1000 is the "floor" - you can't go lower
- This prevents complete beginners from having too low ratings

**Inactive decay:**
- If you don't play for a while, Elo slowly decreases
- Default: -2 Elo per day of inactivity
- Encourages regular participation

---

### What happens if I disconnect during a battle?

**Immediate effects:**

1. **You lose the battle**
   - Counts as a forfeit
   - Opponent wins automatically

2. **Elo loss**
   - You lose Elo as if you lost normally
   - Opponent gains Elo

3. **Flee count increases**
   - Your "flee count" goes up by 1
   - This tracks how many times you've disconnected

**Flee penalties:**

| Flee Count | Penalty |
|------------|---------|
| 1-5 flees | 5 minute queue ban |
| 6-10 flees | 15 minute queue ban |
| 11+ flees | 30 minute queue ban |

**Flee count reduction:**
- Automatically decreases by 1 every 24 hours (default)
- Admin can manually reset: `/rankedarena setflee YourName 0`

**Important tips:**
- **Always finish your battles!**
- If you have connection issues, warn your opponent
- Ask admin for flee reset if disconnect was accidental (network issue, power outage, etc.)

---

### How do I check what Pokemon are banned?

**In-game method (recommended):**

1. Type `/ranked`
2. Click the **"Blacklist"** button (usually a barrier block icon)
3. Browse banned Pokemon with visual icons
4. Click **"Format Toggle"** to switch between Singles and Doubles

**File method:**

Check these config files:
- Singles rules: `config/cobbleranked/blacklist/singles.json5`
- Doubles rules: `config/cobbleranked/blacklist/doubles.json5`

**Common bans:**
- Legendary Pokemon (Mewtwo, Rayquaza, etc.)
- Mythical Pokemon (Mew, Celebi, etc.)
- OHKO moves (Fissure, Sheer Cold)
- Evasion moves (Double Team, Minimize)
- Problematic abilities (Moody, Shadow Tag)

**Different for each format!**
- Singles often bans legendaries completely
- Doubles (VGC-style) may allow 2 restricted legendaries
- Check both formats if you play both!

---

### Can I play both Singles and Doubles?

**Yes! Each format has separate rankings.**

**What this means:**
- Your Singles Elo is separate from Doubles Elo
- You can be 1500 in Singles and 1200 in Doubles
- Wins/losses tracked separately
- Separate leaderboards for each format

**How to switch formats:**

1. Open `/ranked`
2. Click "Join Queue"
3. Select the format you want to play
4. Queue and battle!

**Strategy differences:**
- **Singles (1v1):** Individual Pokemon strength, classic battles
- **Doubles (2v2):** Team synergy, VGC-style, support moves crucial

**Tip:** Try both formats! You might prefer one over the other.

---

### How do seasons work?

**What is a season?**
- A competitive period (usually 30 days)
- Time to climb the leaderboards
- Compete for end-of-season rewards

**Season lifecycle:**

1. **Season starts**
   - Elo may reset to starting value (default: 1000)
   - Win/loss record may reset (or kept as all-time stats)
   - Leaderboards start fresh

2. **During season**
   - Play ranked matches
   - Climb the leaderboard
   - Earn milestone rewards

3. **Season ends**
   - Top players get special rewards
   - Rankings finalized
   - New season starts automatically

**Check current season:**
```
/season
```

Shows:
- Season name
- Time remaining
- Your current rank

**How long do seasons last?**
- Default: 30 days (monthly)
- Server-specific (admin can customize)
- Check `/season` for exact end date

**What gets reset?**
- Depends on server settings
- Typically: Elo resets, stats kept
- Ask your server admin

---

### When do I get rewards?

**Three types of rewards:**

**1. Milestone Rewards (During Season)**

Earn rewards for reaching goals:
- **Match milestones:** Play 10, 50, 100 matches
- **Win milestones:** Win 10, 25, 50, 100 matches
- **Elo milestones:** Reach 1200, 1500, 1800, 2000 Elo

**When you get them:**
- Automatically when you reach the milestone
- Claimed via `/ranked` → Rewards GUI
- Once per milestone per season

**2. Battle Rewards (After Each Match)**

Some servers give items after every battle:
- **Victory rewards:** Items when you win
- **Loss rewards:** Consolation prizes when you lose

**When you get them:**
- Immediately after battle ends
- Automatically added to inventory

**3. Season Rewards (End of Season)**

Top players get exclusive rewards:
- **1st place:** Best rewards + special title
- **2nd-3rd place:** Great rewards + title
- **4th-10th place:** Good rewards + title
- **11th-25th place:** Participation rewards

**When you get them:**
- When season ends
- Distributed automatically
- Based on your final rank

**Check available rewards:**
1. Open `/ranked`
2. Look for rewards GUI
3. See what milestones you can earn

---

## For Server Owners

### How do I install CobbleRanked?

**Quick installation:**

1. **Download the mod**
   - Get latest `.jar` file from Discord or Modrinth
   - Ensure it's the correct version for Cobblemon 1.6.1+

2. **Install on server**
   - Place `.jar` in server's `mods/` folder
   - Ensure Cobblemon and Fabric API are installed

3. **Start server**
   - CobbleRanked will generate default configs
   - Config folder: `config/cobbleranked/`

4. **Set up first arena**
   ```
   /rankedarena setArena arena1 pos1
   /rankedarena setArena arena1 pos2
   /rankedarena setexit
   ```

5. **Configure blacklists** (optional)
   - Edit `config/cobbleranked/blacklist/singles.json5`
   - Edit `config/cobbleranked/blacklist/doubles.json5`
   - Run `/rankedarena reload`

6. **Test**
   - Have a player run `/ranked`
   - Try joining queue
   - Verify battle starts correctly

**Full guide:** See [Admin Guide](admin-guide.md)

---

### Do I need MySQL/Redis for a single server?

**No! Single server uses SQLite automatically.**

**Single Server (Simple Setup):**
- No MySQL needed
- No Redis needed
- Uses built-in SQLite database
- Everything works out of the box
- Perfect for most servers

**When you need MySQL/Redis:**
- **Only** for multi-server networks (Velocity proxy)
- Need cross-server matchmaking
- 2+ servers sharing ranked system

**Configuration:**
```json5
"cross_server": {
  "enabled": false  // ← Keep this false for single server
}
```

**Benefits of SQLite (single server):**
- Zero setup required
- No external databases
- Automatic backups (just copy the file)
- Perfect for 99% of servers

**When to upgrade to MySQL:**
- Running 2+ servers with Velocity
- Need cross-server features
- Want centralized database management

---

### How do I ban specific Pokemon?

**Easy method - Edit blacklist file:**

1. **Open the blacklist file**
   - Singles: `config/cobbleranked/blacklist/singles.json5`
   - Doubles: `config/cobbleranked/blacklist/doubles.json5`

2. **Add Pokemon to ban list**
   ```json5
   "black_list_pokemon": [
     "Mewtwo",
     "Rayquaza",
     "Arceus"
   ]
   ```

3. **Save and reload**
   ```
   /rankedarena reload
   ```

**Ban entire categories:**

```json5
"black_list_labels": [
  "legendary",      // All legendaries
  "mythical",       // All mythicals
  "ultra_beast"     // All Ultra Beasts
]
```

**Limit instead of ban:**

```json5
"restricted_label_limits": {
  "legendary": 1    // Allow max 1 legendary per team
}
```

**Full guide:** See [Blacklist Guide](blacklist-guide.md)

---

### How do I change the Elo system?

**Edit config.json5:**

```json5
"eloSystem": {
  "mode": "POKEMON_SHOWDOWN"  // or "GLICKO2" or "LEGACY"
}
```

**Available modes:**

**1. Pokemon Showdown (Default - Recommended)**
```json5
"mode": "POKEMON_SHOWDOWN",
"pokemonShowdown": {
  "initialElo": 1000,
  "floorElo": 1000
}
```
- Same as Pokemon Showdown competitive
- Balanced and fair
- Prevents dropping below 1000

**2. Glicko-2 (Advanced)**
```json5
"mode": "GLICKO2",
"glicko2": {
  "initialRating": 1500.0,
  "initialRD": 350.0
}
```
- More statistically accurate
- Best for smaller player pools
- Used by chess federations

**3. Legacy (Simple)**
```json5
"mode": "LEGACY"
```
- Random point gain/loss
- Win: +50-100 Elo
- Lose: -30-50 Elo
- Not recommended for competitive

**After changing:**
1. Save `config.json5`
2. Restart server (required for Elo system changes)

**Full guide:** See [Configuration Guide](configuration.md#elo-system)

---

### Can I customize rewards?

**Yes! Edit `config/cobbleranked/rewards.json5`**

**Types of rewards:**

**1. Season Rewards**
```json5
"season_rewards": {
  "singles": {
    "rank_1": {
      "rank_range": "1",
      "display": "&6&l🏆 Champion Reward",
      "item": "minecraft:diamond",
      "commands": [
        "give {player} minecraft:diamond 64",
        "eco give {player} 1000"
      ]
    }
  }
}
```

**2. Milestone Rewards**
```json5
"milestone_rewards": {
  "singles": {
    "wins_10": {
      "type": "WINS",
      "requirement": 10,
      "display": "&e⚡ First Victories",
      "commands": [
        "give {player} minecraft:gold_ingot 10"
      ]
    }
  }
}
```

**Reward placeholders:**
- `{player}` - Player name
- Use any command the server can execute

**Supported commands:**
- `/give` - Give items
- `/eco give` - Give money (requires economy plugin)
- `/lp user permission set` - Give permissions/titles

**Example custom reward:**
```json5
"elo_2500": {
  "type": "ELO",
  "requirement": 2500,
  "display": "&d&lLegendary Status",
  "item": "minecraft:netherite_ingot",
  "commands": [
    "give {player} minecraft:netherite_ingot 10",
    "eco give {player} 5000",
    "lp user {player} permission set rank.legend true",
    "broadcast &6{player} reached 2500 Elo!"
  ]
}
```

**After editing:**
```
/rankedarena reload
```

---

### How do I set up cross-server ranked?

**Requirements:**
- Velocity proxy
- MySQL or MongoDB database
- Redis server
- 2+ Fabric servers with CobbleRanked

**Quick setup:**

**1. Install databases**
```sql
-- MySQL
CREATE DATABASE cobbleranked;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'password';
GRANT ALL ON cobbleranked.* TO 'cobbleranked'@'%';
```

```bash
# Redis (Ubuntu)
sudo apt install redis-server
```

**2. Configure battle server**

File: `config/cobbleranked/config.json5` on battle server

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // ← Empty = this IS battle server

    "mysql": {
      "host": "localhost",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

**3. Configure main/lobby servers**

File: `config/cobbleranked/config.json5` on main1, main2, etc.

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // Change for each server: main1, main2, etc.
    "battle_server": "battle",  // ← Points to battle server

    "mysql": {
      "host": "localhost",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

**4. Configure Velocity**

File: `velocity.toml`

```toml
[servers]
main1 = "localhost:25566"
main2 = "localhost:25567"
battle = "localhost:25568"

try = [
  "main1"
]
```

**5. Test**
- Players join main1 or main2
- Both can queue for matches
- System transfers them to battle server
- After battle, returns to origin server

**Full guide:** See [Admin Guide - Cross-Server Setup](admin-guide.md#cross-server-setup-advanced)

---

### Why aren't my config changes working?

**Common issues:**

**1. Forgot to restart/reload**
- **Solution:** Restart server or run `/rankedarena reload`
- **Some settings require restart** (Elo system, cross-server, database)

**2. JSON5 syntax error**
- **Problem:** Typo, missing comma, wrong bracket
- **Solution:** Check console for error messages
- **Validate:** Use online JSON5 validator

**3. Wrong file edited**
- **Problem:** Edited wrong blacklist file (singles vs doubles)
- **Solution:**
  - Singles rules: `blacklist/singles.json5`
  - Doubles rules: `blacklist/doubles.json5`

**4. Case sensitivity**
- **Problem:** Pokemon names must match exactly
- **Wrong:** `"mewtwo"`, `"Rayquaza:Mega"`
- **Right:** `"Mewtwo"`, `"Rayquaza:mega"`

**5. Item ID format**
- **Problem:** Item IDs need full format
- **Wrong:** `"bright_powder"`
- **Right:** `"cobblemon:bright_powder"`

**6. Cached data**
- **Problem:** Server cached old config
- **Solution:**
  1. Stop server
  2. Delete cache if exists
  3. Start server fresh

**Debugging steps:**

1. **Check console logs**
   - Look for `[CobbleRanked]` errors
   - Error messages usually very specific

2. **Test incrementally**
   - Change one thing at a time
   - Restart after each change
   - Verify each change works

3. **Validate config syntax**
   - Use JSON5 validator online
   - Check for missing commas, brackets

4. **Ask for help**
   - Join Discord
   - Share config file and error logs

---

### How do I backup player data?

**Single-Server (SQLite):**

**Automatic backup:**
```bash
# Stop server
# Copy database file
cp config/cobbleranked/cobbleranked.db config/cobbleranked/cobbleranked.db.backup

# Add date to backup
cp config/cobbleranked/cobbleranked.db backups/cobbleranked-$(date +%Y%m%d).db
```

**Restore from backup:**
```bash
# Stop server
# Replace current with backup
cp backups/cobbleranked-20250108.db config/cobbleranked/cobbleranked.db
# Start server
```

**Multi-Server (MySQL):**

**Backup MySQL database:**
```bash
mysqldump -u cobbleranked -p cobbleranked > backup-$(date +%Y%m%d).sql
```

**Restore MySQL backup:**
```bash
mysql -u cobbleranked -p cobbleranked < backup-20250108.sql
```

**Automated backup script (SQLite):**

Create `backup-cobbleranked.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/path/to/backups"
DB_FILE="/path/to/server/config/cobbleranked/cobbleranked.db"

# Create backup
cp "$DB_FILE" "$BACKUP_DIR/cobbleranked-$DATE.db"

# Delete backups older than 30 days
find "$BACKUP_DIR" -name "cobbleranked-*.db" -mtime +30 -delete

echo "Backup created: cobbleranked-$DATE.db"
```

**Schedule with cron:**
```bash
# Daily backup at 3 AM
0 3 * * * /path/to/backup-cobbleranked.sh
```

**What gets backed up:**
- Player Elo ratings (both Singles and Doubles)
- Win/loss records
- Flee counts
- Season history
- Milestone reward claims

**What doesn't need backup:**
- Config files (version controlled separately)
- Arena definitions (in `arenas.json5`)
- Blacklist rules (in `blacklist/*.json5`)

**Best practices:**
- **Backup before season rotations**
- **Backup before major config changes**
- **Keep at least 7 days of backups**
- **Test restore process** (don't wait for emergency!)

---

## Quick Troubleshooting

### Player Issues

| Problem | Solution |
|---------|----------|
| Can't join queue | Check banned items/Pokemon, enough Pokemon in party |
| Matchmaking takes forever | Wait longer, server may have low population |
| Disconnected during battle | Accept flee penalty, ask admin for reset if accidental |
| Stats not updating | Wait a moment, try reopening `/ranked` GUI |
| Can't see rewards | Check `/ranked` rewards GUI, may need to claim |

### Server Issues

| Problem | Solution |
|---------|----------|
| Config changes not working | Restart server (some changes require restart) |
| Players stuck in queue | Check Redis/database connection (cross-server) |
| Battles not starting | Verify arenas are set up correctly |
| Rewards not given | Check console for command errors |
| Season not rotating | Check `season_check.enabled: true` in config |

---

## Still Have Questions?

**Check these resources:**
- [Player Guide](player-guide.md) - How to play ranked
- [Admin Guide](admin-guide.md) - Server setup
- [Configuration Guide](configuration.md) - Config reference
- [Blacklist Guide](blacklist-guide.md) - Battle rules
- [Commands Reference](commands.md) - All commands

**Get help:**
- Join our Discord server (link in game)
- Report bugs on GitHub Issues
- Ask server staff for help

---

**Good luck and have fun battling!** 🏆
