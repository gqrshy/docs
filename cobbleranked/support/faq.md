# Frequently Asked Questions

Common questions and answers about CobbleRanked. Click on any question to expand the answer.

---

## 📌 General Questions

<details>
<summary><strong>What is CobbleRanked?</strong></summary>

CobbleRanked is a competitive ranked battle system for Minecraft servers running Cobblemon. It provides:
- **Elo-based matchmaking** - Skill-based player matching
- **Multiple battle formats** - Singles (1v1), Doubles (2v2)
- **Seasonal leaderboards** - Automatic rotation and rewards
- **Customizable restrictions** - Ban Pokemon/moves/abilities/items
- **Cross-server support** - MySQL + Redis for multi-server networks

</details>

<details>
<summary><strong>Is CobbleRanked compatible with my server?</strong></summary>

**Requirements:**
- Minecraft **1.21.1**
- Fabric Loader **0.17.2+**
- Cobblemon **1.7.0+**
- Fabric API **0.116.6+**

If your server meets these requirements, CobbleRanked will work!

**Check your versions:**
```bash
/version
/fabric
```

</details>

<details>
<summary><strong>Can I use CobbleRanked with other mods?</strong></summary>

**Yes!** CobbleRanked is compatible with most Fabric mods.

**Tested with:**
- ✅ Cobblemon addons (Cobbledex, Cobblepedia)
- ✅ World protection (WorldGuard, GriefPrevention)
- ✅ Economy mods (for reward commands)
- ✅ Permission mods (LuckPerms, PermissionsEx)
- ✅ Chat mods
- ✅ Utility mods

**Potential conflicts:**
- ❌ Mods that modify battle mechanics
- ❌ Mods that override Pokemon stats

</details>

<details>
<summary><strong>Is cross-server support required?</strong></summary>

**No!** CobbleRanked works in two modes:

**Single-Server Mode (Default):**
- Uses SQLite (built-in)
- No additional setup needed
- Perfect for 1-100 players

**Cross-Server Mode (Optional):**
- Uses MySQL + Redis
- Requires configuration
- For networks with multiple servers (lobby + battle servers)

**Most servers use single-server mode.**

</details>

<details>
<summary><strong>Where can I download CobbleRanked?</strong></summary>

**Official source:**
- **[Discord Server](https://discord.gg/VVVvBTqqyP)** - Join for latest releases
- Modrinth _(coming soon)_
- CurseForge _(coming soon)_

**⚠️ Currently only distributed via Discord!**

Do not download from unofficial sources:
- May contain outdated versions
- May contain malware
- May contain modified/malicious code

</details>

---

## ⚙️ Installation & Setup

<details>
<summary><strong>How do I install CobbleRanked?</strong></summary>

**Quick installation:**

1. **Download** the JAR file from our [Discord Server](https://discord.gg/VVVvBTqqyP)
2. **Place** in `mods/` folder
3. **Ensure dependencies** are installed (Cobblemon, Fabric API)
4. **Start server** - Configs auto-generate in `config/cobbleranked/`
5. **Create arena:** `/rankedarena setArena main_arena pos1` (repeat for pos2)
6. **Test:** `/ranked`

See [Installation Guide](../getting-started/installation.md) for detailed steps.

</details>

<details>
<summary><strong>Configuration files not generating?</strong></summary>

**Troubleshooting steps:**

1. **Verify CobbleRanked is loaded:**
   ```bash
   /mod list
   ```
   Should show "CobbleRanked" in the list.

2. **Check logs for errors:**
   ```bash
   tail -f logs/latest.log | grep CobbleRanked
   ```

3. **Ensure dependencies installed:**
   - Cobblemon 1.7.0+
   - Fabric API 0.116.6+

4. **Remove conflicting mods** (if any)

5. **Reinstall:**
   - Delete CobbleRanked from `mods/`
   - Download latest version
   - Restart server

**Still broken?** Check [Troubleshooting](troubleshooting.md).

</details>

<details>
<summary><strong>How do I update CobbleRanked?</strong></summary>

**Safe update procedure:**

1. **Backup configs:**
   ```bash
   cp -r config/cobbleranked config/cobbleranked.backup
   ```

2. **Backup database (SQLite):**
   ```bash
   cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup
   ```

3. **Stop server:**
   ```bash
   /stop
   ```

4. **Replace JAR:**
   - Delete old `CobbleRanked-*.jar` from `mods/`
   - Add new version to `mods/`

5. **Start server:**
   - Configs migrate automatically
   - Check console for migration messages

6. **Test:**
   ```bash
   /rankedarena reload
   /ranked
   ```

See [Migration Guide](../getting-started/migration.md) for version-specific instructions.

</details>

---

## 🔧 Configuration

<details>
<summary><strong>Can I ban legendary Pokemon?</strong></summary>

**Yes!** Use the label-based blacklist system:

```json5
{
  "black_list_labels": [
    "legendary",  // Bans all legendary Pokemon
    "mythical",   // Bans all mythical Pokemon
    "ultra_beast" // Bans all Ultra Beasts
  ]
}
```

**File:** `config/cobbleranked/blacklist.json5`

**Available labels:**
- `legendary` - Mewtwo, Rayquaza, Dialga, etc.
- `mythical` - Mew, Celebi, Jirachi, etc.
- `ultra_beast` - Nihilego, Buzzwole, etc.
- `paradox` - Iron Treads, Great Tusk, etc.
- `powerhouse` - Dragonite, Garchomp, etc.

See [Blacklist Configuration](../configuration/blacklist.md) for full list.

</details>

<details>
<summary><strong>How do I change the season length?</strong></summary>

**Edit config.json5:**

```json5
{
  "ranked_match": {
    "reset_days": 30  // Change to desired days (0 = disabled)
  }
}
```

**Examples:**
- `reset_days: 7` - Weekly seasons
- `reset_days: 30` - Monthly seasons (default)
- `reset_days: 90` - Quarterly seasons
- `reset_days: 0` - Disable automatic rotation

**Reload config:**
```bash
/rankedarena reload
```

**Check current season:**
```bash
/rankedarena season info
```

</details>

<details>
<summary><strong>Can I customize rewards?</strong></summary>

**Yes!** Edit `rewards.json5`:

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Champion Reward",
        "item": "minecraft:diamond",
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000",
          "lp user {player} permission set cobbleranked.title.legend true"
        ]
      }
    }
  },
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "commands": ["give {player} minecraft:gold_ingot 10"]
      }
    }
  }
}
```

**Placeholders:**
- `{player}` - Player username
- `{elo}` - Player's Elo rating
- `{rank}` - Player's rank position

See [Rewards Configuration](../configuration/rewards.md) for detailed guide.

</details>

<details>
<summary><strong>How do I add multiple languages?</strong></summary>

**Built-in languages:**
- English (`en-Us`)
- Japanese (`ja-Jp`)
- Portuguese (`pt-Br`)
- Russian (`ru-Ru`)

**Change language:**

Edit `config.json5`:
```json5
{
  "language": "ja-Jp"  // Change to desired language
}
```

**Create custom language:**

1. **Copy existing language file:**
   ```bash
   cp config/cobbleranked/language/en-Us.json5 config/cobbleranked/language/fr-Fr.json5
   ```

2. **Translate all text** in the new file

3. **Copy GUI file:**
   ```bash
   cp config/cobbleranked/gui/gui-enUs.json5 config/cobbleranked/gui/gui-frFr.json5
   ```

4. **Translate GUI text**

5. **Set language in config:**
   ```json5
   {
     "language": "fr-Fr"
   }
   ```

See [Language Customization](../configuration/languages.md).

</details>

<details>
<summary><strong>Can I disable certain battle formats?</strong></summary>

**No direct disable**, but you can effectively hide formats:

**Method 1: Hide GUI buttons**

Edit `gui-enUs.json5` and remove or hide the queue button:

```json5
{
  "gui_ranked": {
    "items": {
      // Remove or comment out this entire section
      // "doubles_queue": { ... }
    }
  }
}
```

**Method 2: Set extremely high minimum Pokemon requirement**

```json5
{
  "ranked_match": {
    "limitPokemon_doubles": 999  // Effectively disables Doubles
  }
}
```

**Method 3: Use permissions** (requires permission plugin)

Grant only Singles permission:
```bash
/lp group default permission set cobbleranked.queue.singles true
/lp group default permission set cobbleranked.queue.doubles false
```

**Note:** All formats are always available via commands to players with permissions.

</details>

---

## 🎮 Gameplay

<details>
<summary><strong>How does Elo rating work?</strong></summary>

Elo is a skill-based rating system that adjusts based on your battle performance.

**How it works:**
- **Start:** 1000 Elo (default)
- **Win:** Gain Elo (amount depends on opponent's rating)
- **Lose:** Lose Elo (amount depends on opponent's rating)
- **Higher Elo = Better rank**

**Three systems available:**

**1. LEGACY (Simple Random)**
- Win: +10 to +30 points (random)
- Loss: -10 to -30 points (random)

**2. POKEMON_SHOWDOWN (Recommended)**
- K-factor based calculation
- Win against higher Elo = more points
- Provisional period: First 10 matches use higher K-factor (faster adjustment)
- Elo decay for inactive players

**3. GLICKO2 (Advanced)**
- Rating Deviation (RD) measures uncertainty
- Volatility tracks rating stability
- More accurate for competitive play
- Recommended for serious ranked servers

**Formula (Pokemon Showdown):**
```
Expected Score = 1 / (1 + 10^((Opponent Elo - Your Elo) / 400))
New Elo = Old Elo + K * (Actual Score - Expected Score)
```

See [Elo System Guide](../features/elo-system.md) for detailed explanation.

</details>

<details>
<summary><strong>Do stats reset each season?</strong></summary>

**What resets:**
- ✅ Reward collection flags (can claim rewards again)

**What persists (does NOT reset):**
- ✅ Elo rating (unless configured to reset)
- ✅ Win/loss record (unless configured to reset)
- ✅ Flee count
- ✅ All match history

**Configurable in config.json5:**
```json5
{
  "ranked_match": {
    "season_reset": {
      "reset_elo": false,          // Set true to reset Elo
      "reset_wins_losses": false   // Set true to reset W/L
    }
  }
}
```

**Default:** Stats persist for long-term progression!

</details>

<details>
<summary><strong>What happens if I disconnect during a battle?</strong></summary>

**Immediate effects:**
- **Flee count +1** (tracked permanently)
- **Counts as loss** (Elo penalty applied)
- **Opponent wins** (receives Elo gain)

**Flee count tracking:**
- Never decreases automatically
- Visible in player stats
- Admins can reset: `/rankedarena setflee <player> 0`

**Disconnect penalties:**
- Same for crashes and intentional disconnects (prevents abuse)
- Contact admin to reset flee count if crash was legitimate

**Prevention:**
- Ensure stable connection before queuing
- Don't queue during server restarts
- Fix client crashes before playing ranked

</details>

<details>
<summary><strong>Can I have different Elo for each format?</strong></summary>

**Yes!** Each format has completely independent stats:

**Per-Format Tracking:**
- ✅ Separate Elo rating
- ✅ Separate win/loss record
- ✅ Separate leaderboard ranking
- ✅ Separate rewards

**Example player stats:**
- **Singles:** 1450 Elo, 28W-14L (Rank #5)
- **Doubles:** 1100 Elo, 8W-6L (Rank #23)

**Why separate?**
- Different formats require different skills
- Encourages trying multiple formats
- Fair competition within each format

</details>

<details>
<summary><strong>How does matchmaking work?</strong></summary>

**Matchmaking flow:**

1. **Join queue** for a format (`/ranked` → select format)

2. **Initial search** for opponent with similar Elo:
   - Range: ±100 Elo (immediate match)
   - Same format only (Singles vs Singles, etc.)

3. **Dynamic range expansion** (if no match found):
   - Every 30 seconds: Range expands by +5 Elo
   - Max expansion: 3x initial range (±600 Elo)

4. **Match found:**
   - Both players notified
   - Teleported to random arena
   - Battle starts after 10-second countdown

**Configuration:**

```json5
{
  "matchmaking": {
    "dynamicEloRange": {
      "enabled": true,
      "initialRange": 200,        // ±200 Elo initial
      "expansionDelay": 30,        // Wait 30s before expanding
      "expansionRate": 5,          // +5 Elo per second after delay
      "maxMultiplier": 3.0,        // Max 3x initial range
      "immediateMatchRange": 100   // ±100 Elo = instant match
    }
  }
}
```

See [Ranked Battles](../features/ranked-battles.md) for details.

</details>

<details>
<summary><strong>What is flee count and how does it work?</strong></summary>

**Flee count** tracks how many times a player disconnected during ranked battles.

**How it increases:**
- +1 every time you disconnect during an active battle
- Includes crashes, timeouts, and intentional disconnects
- Same penalty for all disconnect types (prevents abuse)

**Automatic penalties (configurable):**
Based on total flee count, you receive temporary queue bans. Default tiers:
- **1-5 flee count**: 5 minute queue ban
- **6-10 flee count**: 15 minute queue ban
- **11+ flee count**: 30 minute queue ban

**⚠️ Admins can customize these tiers in [config.json5](../configuration/README.md#flee-penalty-system):**
```json5
"flee_penalty": {
  "tiers": [
    { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
    { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
    { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
  ]
}
```

**✅ Automatic decay system (NEW):**
Flee count now **automatically decreases** over time:
- **Default**: -1 flee count every 24 hours
- Decay works **even while offline** (based on time elapsed)
- When flee count reaches 0, queue bans are cleared
- Admins can configure decay rate and interval

**Decay configuration ([config.json5](../configuration/README.md#flee-decay-system)):**
```json5
"flee_decay": {
  "enabled": true,              // Enable automatic decay
  "decay_rate": 1,              // Reduce by 1 per interval
  "decay_interval_hours": 24    // Every 24 hours
}
```

**Example decay scenarios:**
- **flee count = 10** → After 24h → **flee count = 9**
- **flee count = 5, offline for 3 days** → After login → **flee count = 2** (3 intervals elapsed)
- **flee count = 2, offline for 2 days** → After login → **flee count = 0** (penalty cleared)

**Manual reset (admin command):**
```bash
/rankedarena setflee <player> 0
```

**For legitimate crashes:**
Contact an admin on Discord with:
- Crash report (`crash-reports/` folder)
- Server logs showing disconnect
- Explanation of what happened

**Admins can:**
- Disable decay entirely (`"enabled": false`)
- Speed up decay (`"decay_interval_hours": 12` = every 12 hours)
- Increase decay rate (`"decay_rate": 2` = -2 per interval)
- Create custom penalty tiers (e.g., 1-minute ban for first offense)

</details>

---

## ⚔️ Battles

<details>
<summary><strong>My Pokemon is banned but it's not in the blacklist?</strong></summary>

**Possible causes:**

**1. Label-based ban:**

Check `blacklist.json5` for label bans:
```json5
{
  "black_list_labels": [
    "legendary",  // Bans ALL legendary Pokemon
    "mythical",
    "ultra_beast"
  ]
}
```

If your Pokemon has a banned label, it's blocked even if not explicitly listed.

**2. Move/ability/item ban:**

Your Pokemon may have:
- Banned move (e.g., "Fissure")
- Banned ability (e.g., "Moody")
- Banned held item (e.g., "Bright Powder")

Check these sections in `blacklist.json5`:
```json5
{
  "black_list_moves": ["Fissure", "Double Team"],
  "black_list_ability": ["Moody", "Shadow Tag"],
  "black_list_items_pokemon": ["Bright Powder"]
}
```

**3. Special format restriction:**

Check if special format is enabled:
```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"  // Only first-stage Pokemon
  }
}
```

**Format types:**
- `baby_cup` - Only Pokemon that can evolve
- `little_cup` - Only base-form Pokemon
- `monotype` - All Pokemon must share a type
- `shiny_only` - Only shiny Pokemon
- `dex_range` - Specific National Dex range
- `nfe` - Not Fully Evolved only

**4. Config not reloaded:**

Reload configuration:
```bash
/rankedarena reload
```

**Debug:**
```bash
/ranked  # Try to queue and see validation error message
```

</details>

<details>
<summary><strong>Battle ends in draw every time?</strong></summary>

**Cause:** Turn limit reached before either player won.

**Solution:** Increase turn limit in `config.json5`:

```json5
{
  "battle": {
    "maxTurns": 200  // Increase from default 100
  }
}
```

**Recommended limits:**
- **Singles:** 100-150 turns
- **Doubles:** 150-200 turns (battles end faster)
- **Stall teams:** 300+ turns

**Check turn count:**
Battle logs show: `"Battle ended after {N} turns"`

**Alternative:** Use time limit instead of turn limit (custom plugin required).

</details>

<details>
<summary><strong>Can I use Mega Evolution/Z-Moves/Terastallization?</strong></summary>

**Mega Evolution:** Supported by Cobblemon

**Z-Moves:** Not yet implemented in Cobblemon

**Terastallization:** Not yet implemented in Cobblemon

**Configuration (when available):**
```json5
{
  "competitive": {
    "allowMegaEvolution": true,   // Enable/disable Mega
    "allowZMoves": false,          // Future feature
    "allowTeraType": false         // Future feature
  }
}
```

**Current limitations:** Depends on Cobblemon's battle system implementation.

</details>

<details>
<summary><strong>Level scaling not working?</strong></summary>

**Verify configuration:**

```json5
{
  "battle": {
    "levelMatch": 70  // All Pokemon forced to level 70
  }
}
```

**Troubleshooting:**

1. **Reload config:**
   ```bash
   /rankedarena reload
   ```

2. **Check console for errors:**
   ```bash
   tail -f logs/latest.log | grep level
   ```

3. **Verify Cobblemon version:**
   ```bash
   /mod list | grep Cobblemon
   ```
   Requires Cobblemon 1.7.0+

4. **Test in battle:**
   - Join ranked queue
   - Check Pokemon levels during battle
   - Should show `Lv. 70` regardless of actual level

**Still broken?** See [Troubleshooting](troubleshooting.md).

</details>

---

## 🏟️ Arenas

<details>
<summary><strong>How many arenas should I create?</strong></summary>

**Recommendations:**

**Minimum:** 1 arena
- For testing only
- Not recommended for production

**Ideal:** 3-5 arenas
- Provides variety
- Not overwhelming
- Easy to maintain

**Maximum:** 10+ arenas
- Large servers only
- Requires good organization
- 20+ arenas is overkill

**Quality > Quantity:**
- 3 great arenas > 10 mediocre arenas
- Theme each arena (forest, desert, ocean, etc.)
- Ensure balanced terrain (no advantage for either player)

</details>

<details>
<summary><strong>Can arenas be in different dimensions?</strong></summary>

**Yes!** Arenas support all dimensions:

**Vanilla dimensions:**
- Overworld (`minecraft:overworld`)
- Nether (`minecraft:the_nether`)
- End (`minecraft:the_end`)

**Custom dimensions:**
- Any dimension added by mods
- Twilight Forest
- Aether
- Custom world gen mods

**Example setup:**

Create arena in Nether:
```bash
# In Nether dimension
/rankedarena setArena nether_arena pos1
# Move to opposite corner
/rankedarena setArena nether_arena pos2
```

**Important:**
- Set exit location in Overworld (or main lobby)
- Players teleport to exit after battle, not back to queue location

</details>

<details>
<summary><strong>Players spawn in walls/underground?</strong></summary>

**Fix steps:**

1. **Stand at correct spawn point:**
   - At ground level (not floating or underground)
   - Clear 3x3 area around spawn
   - No blocks above head

2. **Re-create arena positions:**
   ```bash
   /rankedarena setArena arena_name pos1
   # Move to opposite corner
   /rankedarena setArena arena_name pos2
   ```

3. **Verify Y coordinate:**
   - Use F3 debug screen
   - Y should be at ground level (not air or inside blocks)

4. **Test arena:**
   ```bash
   /rankedarena teleportArena arena_name
   ```
   Verifies spawn point is safe.

**Prevention:**
- Use flat, even terrain
- Build proper battle platforms
- Test arenas before enabling for players

</details>

<details>
<summary><strong>How do I protect arenas from griefing?</strong></summary>

**WorldGuard (recommended):**

```bash
# Create region
/region define arena_name

# Set flags
/region flag arena_name build deny           # No breaking/placing
/region flag arena_name pvp deny             # No PvP damage
/region flag arena_name mob-spawning deny    # No mob spawns
/region flag arena_name enderman-grief deny  # No enderman griefing
/region flag arena_name creeper-explosion deny
```

**GriefPrevention:**

```bash
# Create claim at arena
/claim

# Trust only admins
/trust public
```

**Other protection mods:** Similar commands, check mod documentation.

**Important:** Protection mods don't interfere with Cobblemon battles!

See [Arena Configuration](../configuration/arenas.md).

</details>

---

## 🌐 Cross-Server

<details>
<summary><strong>Do I need Redis for cross-server?</strong></summary>

**Short answer:** No, but strongly recommended.

**MySQL (Required):**
- ✅ Shares player data across servers
- ✅ Stores Elo, wins, losses
- ✅ Synchronizes seasons
- ✅ Handles rewards

**Redis (Optional but recommended):**
- ✅ Real-time queue synchronization
- ✅ Instant matchmaking across servers
- ✅ Faster than database polling
- ✅ Reduces MySQL load

**Without Redis:**
- ❌ Queue updates slower (5-10 second delay)
- ❌ Higher database load
- ❌ Matchmaking less responsive
- ✅ But still works!

**Recommendation:** Use Redis for 2+ servers.

</details>

<details>
<summary><strong>Can I have multiple battle servers?</strong></summary>

**❌ NO!** Only **ONE** server should be the battle server.

**Correct configuration:**

**Battle Server (battle1):**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle1",
    "battle_server": ""  // EMPTY = This IS the battle server
  }
}
```

**Lobby Server (lobby1):**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",
    "battle_server": "battle1"  // Points to battle server
  }
}
```

**Why only one?**
- ❌ Prevents duplicate season management
- ❌ Avoids conflicting matchmaking
- ❌ Single source of truth for rankings

**Error detection:**
If multiple battle servers detected, CobbleRanked logs:
```
CRITICAL ERROR: Multiple Battle Servers Detected!
FIX: Only ONE server should have battle_server: ""
```

See [Cross-Server Setup](../advanced/cross-server.md) for detailed guide.

</details>

<details>
<summary><strong>How do I migrate SQLite to MySQL?</strong></summary>

**Prerequisites:**

1. **Configure MySQL** in `config.json5`:
   ```json5
   {
     "cross_server": {
       "enabled": true,
       "mysql": {
         "host": "localhost",
         "database": "cobbleranked",
         "username": "your_username",
         "password": "your_password"
       }
     }
   }
   ```

2. **Create MySQL database:**
   ```sql
   CREATE DATABASE cobbleranked;
   CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
   FLUSH PRIVILEGES;
   ```

3. **Test MySQL connection:**
   ```bash
   mysql -u cobbleranked -p -h localhost cobbleranked
   ```

**Migration:**

```bash
/rankedarena database migrate sqlite mysql
```

**What's migrated:**
- ✅ All player stats (Elo, wins, losses)
- ✅ Format-specific stats (Singles, Doubles)
- ✅ Season data
- ✅ Reward collection flags

**Backup created:**
- SQLite file renamed to `ranked.db.backup`
- Rollback possible if needed

**Verify migration:**
```bash
/stats YourUsername
```

See [Database Migration](../advanced/database.md).

</details>

<details>
<summary><strong>Cross-server stats not syncing?</strong></summary>

**Troubleshooting checklist:**

**1. MySQL connection:**
```bash
mysql -u username -p -h host database
```
If fails, check:
- Host/port correct?
- Firewall allows port 3306?
- MySQL user has permissions?

**2. Config verification:**
```json5
{
  "cross_server": {
    "enabled": true,  // Must be true!
    "mysql": {
      "host": "correct_ip_here",
      "database": "cobbleranked",
      "username": "correct_user",
      "password": "correct_password"
    }
  }
}
```

**3. All servers use same database:**
- Check every server's `config.json5`
- Must connect to SAME MySQL instance
- Same database name

**4. Restart all servers:**
```bash
/stop  # On each server
# Restart all servers
```

**5. Test sync:**
```bash
# On server 1:
/setelo gashi 1500 SINGLES

# On server 2:
/stats gashi
```
Should show 1500 Elo.

**Still broken?** Check [Troubleshooting](troubleshooting.md).

</details>

---

## 🎁 Rewards

<details>
<summary><strong>Rewards not giving items?</strong></summary>

**Common issues:**

**1. Placeholder syntax:**

**❌ Wrong:**
```json5
"commands": [
  "give {player} diamond 64"  // Missing minecraft: prefix
]
```

**✅ Correct:**
```json5
"commands": [
  "give {player} minecraft:diamond 64"
]
```

**2. Player already collected:**

Rewards only given once per season.

Check if already collected:
```bash
/rankedarena season info
```

Reset for testing:
```sql
-- MySQL only
UPDATE format_stats SET reward_flags = '[]' WHERE player_uuid = '<uuid>';
```

**3. Reward disabled:**

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        // Missing or set to false
        "enabled": true  // MUST BE TRUE
      }
    }
  }
}
```

**4. Command requires permissions/plugin:**

Example: Economy command requires economy plugin
```json5
"commands": [
  "eco give {player} 1000"  // Requires EssentialsX or similar
]
```

**Test rewards:**
```bash
/give @p minecraft:diamond 64  # Test command manually
```

</details>

<details>
<summary><strong>Can I use custom commands in rewards?</strong></summary>

**Yes!** Any server command works.

**Examples:**

**Economy:**
```json5
"commands": [
  "eco give {player} 1000",  // EssentialsX
  "money give {player} 1000"  // Other economy plugins
]
```

**Permissions:**
```json5
"commands": [
  "lp user {player} permission set vip.rank true",  // LuckPerms
  "pex user {player} add vip.rank"  // PermissionsEx
]
```

**Teleportation:**
```json5
"commands": [
  "tp {player} 100 64 200",
  "warp {player} vip_area"
]
```

**Announcements:**
```json5
"commands": [
  "broadcast &6{player} &ehas reached &aRank #1&e!",
  "title @a title {\"text\":\"New Champion!\",\"color\":\"gold\"}"
]
```

**Custom plugin commands:**
```json5
"commands": [
  "customplugin reward {player} legendary_key",
  "crate give {player} legendary 1"
]
```

**Available placeholders:**
- `{player}` - Player username
- `{elo}` - Player's current Elo
- `{rank}` - Player's rank position
- `{format}` - Battle format (SINGLES/DOUBLES)

</details>

<details>
<summary><strong>What's the difference between season rewards and milestone rewards?</strong></summary>

**Season Rewards:**

**When given:** End of season (automatic rotation or admin command)

**Who gets them:** Top-ranked players only

**Based on:** Leaderboard position

**Example:**
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",  // 1st place only
        "commands": ["give {player} minecraft:diamond 64"]
      },
      "rank_2_3": {
        "rank_range": "2-3",  // 2nd and 3rd place
        "commands": ["give {player} minecraft:gold_ingot 32"]
      }
    }
  }
}
```

**Milestone Rewards:**

**When given:** Immediately upon reaching milestone

**Who gets them:** Any player who reaches the milestone

**Based on:** Total stats (wins, matches played, Elo reached)

**Example:**
```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,  // 10 wins total
        "commands": ["give {player} minecraft:gold_ingot 10"]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,  // Reach 1500 Elo
        "commands": ["give {player} minecraft:diamond 3"]
      }
    }
  }
}
```

**Comparison:**

| Feature | Season Rewards | Milestone Rewards |
|---------|---------------|------------------|
| **Timing** | End of season | Immediate |
| **Who gets** | Top 3-25 players | Anyone who qualifies |
| **Based on** | Rank position | Total stats |
| **Repeatable** | Every season | Once per milestone |
| **Competitiveness** | High (top players only) | Low (anyone can earn) |

**Both can be configured independently!**

</details>

---

**Still have questions?** Check [Troubleshooting](troubleshooting.md) or ask in our [Discord Server](https://discord.gg/VVVvBTqqyP) (#feedback channel)!
