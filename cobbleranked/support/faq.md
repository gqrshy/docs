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
<summary><strong>Only support cross-servers?</strong></summary>

**No!** CobbleRanked works in two modes!

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
5. **Create arena:** `/rankedadmin setArena main_arena pos1` (repeat for pos2)
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
   /rankedadmin reload
   /ranked
   ```

See [Migration Guide](../getting-started/migration.md) for version-specific instructions.

</details>

<details>
<summary><strong>Is Cobblemon 1.6.x supported?</strong></summary>

**Yes, with limitations:**

CobbleRanked fully supports Cobblemon 1.6.x for **core ranked battle features**, but **custom background music is disabled** due to technical limitations.

**What works on Cobblemon 1.6.x:**
- ✅ Ranked battles (Singles, Doubles, Multi)
- ✅ Elo system and matchmaking
- ✅ Leaderboards and statistics
- ✅ Season management
- ✅ Cross-server support (Redis)
- ✅ Rewards and item collection
- ✅ All GUI menus
- ✅ Commands and permissions

**What doesn't work on Cobblemon 1.6.x:**
- ❌ Custom background music (queue music, battle music, etc.)

**Why is music disabled?**

Cobblemon 1.6.x uses a different music packet system (`SoundEvent` vs `ResourceLocation`) that requires classes not consistently available at runtime due to Fabric's obfuscation. Attempting to use music on 1.6.x would cause:
```
ClassNotFoundException: net.minecraft.core.registries.BuiltInRegistries
ClassNotFoundException: net.minecraft.sounds.SoundEvent
```

**What you'll see on startup (Cobblemon 1.6.x):**
```
[MusicUtil] Detected Cobblemon V1_6_X - Custom music DISABLED (not supported in 1.6.x)
```

**Recommended versions:**
- **Cobblemon 1.7.0+** for full feature support including custom music
- **Cobblemon 1.6.1** works perfectly for all ranked battle features (just no custom music)

**Upgrade path:**
If you want custom music, upgrade to Cobblemon 1.7.0+. All other features work identically between versions.

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
/rankedadmin reload
```

**Check current season:**
```bash
/rankedadmin season info
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
- Admins can reset: `/rankedadmin setflee <player> 0`

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
/rankedadmin setflee <player> <amount>

# Examples:
/rankedadmin setflee PlayerName 0      # Reset to 0 (clear penalty)
/rankedadmin setflee PlayerName 5      # Set to 5
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
/rankedadmin reload
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
   /rankedadmin reload
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
/rankedadmin setArena nether_arena pos1
# Move to opposite corner
/rankedadmin setArena nether_arena pos2
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
   /rankedadmin setArena arena_name pos1
   # Move to opposite corner
   /rankedadmin setArena arena_name pos2
   ```

3. **Verify Y coordinate:**
   - Use F3 debug screen
   - Y should be at ground level (not air or inside blocks)

4. **Test arena:**
   ```bash
   /rankedadmin teleportArena arena_name
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
<summary><strong>How does cross-server work? One mod for multiple servers?</strong></summary>

**Yes, it's one mod that connects everything.**

You install the **same CobbleRanked mod** on each backend server in your network. The mod works differently depending on how you configure it:

**Architecture:**
- **Battle Server** (1 server): Handles all ranked battles, matchmaking, and season management
- **Entry/Lobby Servers** (1+ servers): Provide the GUI, accept queue joins, and transfer players to the battle server

**No separate registrations needed.** Just install the mod, set a few config values, and Velocity/BungeeCord handles the rest.

**Player experience example:**

Network: `main1` (survival), `main2` (survival), `arena` (battles only) — all behind Velocity proxy.

1. **Player A** is on `main1` (survival server)
2. **Player B** is on `main2` (survival server)
3. Both open `/ranked` and join the Singles queue
4. **Match found!** Both players are transferred to `arena` server via Velocity
5. Battle starts on `arena` server
6. Battle ends, results saved to MySQL
7. Players are returned to their original servers (`main1` and `main2`)

**From the player's perspective:** Seamless. They queue, get transferred, battle, and return.

**Minimal config required:**

Entry servers (main1, main2):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",        // Must match Velocity server name
    "battle_server": "arena"     // Where to send players
  }
}
```

Battle server (arena):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "arena",
    "battle_server": ""          // Empty = this IS the battle server
  }
}
```

You'll also need MySQL (shared database) and Redis (real-time queue sync).

See [Cross-Server Setup](../advanced/cross-server.md) for full configuration guide.

</details>

<details>
<summary><strong>Is cross-server setup out-of-the-box or complex?</strong></summary>

**Pretty much out-of-the-box — once you're on Velocity.**

**You don't need to:**
- Manually enter other servers' IP addresses
- Create custom API keys or tokens
- Set up complex routing rules

**You DO need to:**
- Install Velocity/BungeeCord proxy (standard for multi-server networks)
- Set up MySQL (shared database) — one-time setup
- Set up Redis (real-time queue sync) — one-time setup
- Match `server_id` in CobbleRanked to Velocity's server names

**After initial setup:** Adding new lobby/main servers is just copying the mod + config.

**Time estimate:**
- Velocity setup: 15-30 minutes (if new to proxies)
- MySQL setup: 10-15 minutes
- Redis setup: 5-10 minutes
- CobbleRanked config: 5 minutes per server

**Total:** 1-2 hours for first-time setup. Adding more servers later: 5 minutes each.

</details>

<details>
<summary><strong>Can different modded servers link up?</strong></summary>

**Yes, but with requirements:**

✅ **Can link:**
- Multiple Cobblemon servers with the same mod versions
- Same Minecraft version + loader (Fabric/Forge)
- Compatible mod sets across all servers

❌ **Cannot link:**
- Different Minecraft versions (1.20.1 vs 1.21.1)
- Different loaders (Fabric vs Forge)
- Incompatible mod sets (client registry mismatches kick players)

**Recommendation:** Keep all backend servers on the **exact same modpack version**. Mixing very different modpacks across servers under one proxy is risky.

**Best practice:** Keep the battle server lightweight (void/superflat world + arenas only). This keeps TPS stable and makes matches predictable.

**Example safe setup:**
```
main1: Cobblemon 1.7.0 + 50 addon mods (survival)
main2: Cobblemon 1.7.0 + 50 addon mods (survival)
arena: Cobblemon 1.7.0 + 50 addon mods (void world, arenas only)
```

All three servers use identical mod lists, just different world types.

</details>

<details>
<summary><strong>How many players can cross-server handle?</strong></summary>

**Theoretical limit:** ~500 concurrent players across multiple servers.

**Why it scales well:**
- Survival/lobby servers don't run heavy logic (they just transfer players)
- TPS impact on entry servers is near zero
- All matchmaking + battle logic runs on the lightweight arena server
- Multiple lobby servers distribute GUI/queue load

**Example topology:**
```
[lobby]     ──┐
[main1]     ──┤
[main2]     ──┼──► [Velocity] ──► [arena] (battles)
[main3]     ──┤                     ↓
[creative]  ──┘                  [MySQL + Redis]
```

In this setup:
- 5 entry servers accept queue joins (100 players each = 500 total)
- 1 arena server handles all battles (sequential battles, not concurrent)
- MySQL stores rankings
- Redis syncs queues in real-time

**Real-world performance:**
- Small network (2-3 servers): 50-100 players no problem
- Medium network (4-6 servers): 150-300 players comfortable
- Large network (7+ servers): 500+ players possible with optimization

**Bottlenecks:**
- MySQL (can handle thousands of queries/sec)
- Redis (extremely fast, not a bottleneck)
- Arena server TPS (keep world lightweight)

</details>

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
/rankedadmin database migrate sqlite mysql
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
/rankedadmin season info
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

---

## 🎮 Disconnect Penalties

<details>
<summary><strong>How does the flee penalty system work?</strong></summary>

When a player disconnects during a ranked battle:
1. **Flee count** increases by 1
2. **Battle forfeit** - Opponent wins
3. **Elo penalty** - Same as losing normally
4. **Queue ban** - Based on flee count tier

**Default tiers:**
- 1-5 flee count: 5 minute ban
- 6-10 flee count: 15 minute ban
- 11+ flee count: 30 minute ban

**Flee decay:** Automatically reduces by 1 every 24 hours (configurable).

See [Disconnect Penalties](../features/disconnect-penalties.md) for configuration.

</details>

<details>
<summary><strong>What if my internet disconnected accidentally?</strong></summary>

**Flee decay forgives accidental disconnects:**
- Default: -1 flee count every 24 hours
- Player with 5 disconnects → clean slate in 5 days
- Can be configured faster for lenient servers

**Admin can also reset:**
```
/rankedadmin resetflee <player> <format>
```

**Server crashes don't count** - Only player disconnects trigger penalties.

</details>

<details>
<summary><strong>Can I disable disconnect penalties?</strong></summary>

**Not recommended**, but you can set penalties to 0:

```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 999, "penalty_minutes": 0 }
    ]
  }
}
```

Better option: **Lenient settings**
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 3, "penalty_minutes": 0 },  // First 3 free
      { "flee_min": 4, "flee_max": 999, "penalty_minutes": 5 }
    ]
  },
  "flee_decay": {
    "decay_rate": 2,              // Faster forgiveness
    "decay_interval_hours": 12    // Every 12 hours
  }
}
```

</details>

---

## 🎯 Dynamic Matchmaking

<details>
<summary><strong>Why is matchmaking taking so long?</strong></summary>

**Possible reasons:**
1. **Not enough players in queue** - Need at least 2 players
2. **Elo range too narrow** - High/low Elo players wait longer
3. **Different formats** - Singles queue won't match with Doubles queue
4. **Peak hours** - More players = faster matches

**Solutions:**
- Adjust dynamic matchmaking settings (see below)
- Encourage more players to join queue
- Consider cross-server setup for larger player pool

</details>

<details>
<summary><strong>How does dynamic matchmaking work?</strong></summary>

Elo range expands gradually as you wait:

**Example (1500 Elo player):**
- 0-30 seconds: ±200 Elo (1300-1700)
- 60 seconds: ±206 Elo (1294-1706)
- 5 minutes: ±254 Elo (1246-1754)
- 10 minutes: ±314 Elo (1186-1814)
- Maximum: ±600 Elo (900-2100)

**Formula:**
```
range = initial_range + (seconds_waited / expansion_rate)
```

See [Dynamic Matchmaking](../features/dynamic-matchmaking.md) for configuration.

</details>

<details>
<summary><strong>Can I make matchmaking faster?</strong></summary>

**Yes! Adjust these settings:**

```json5
{
  "matchmaking": {
    "initial_range": 300,        // Wider starting range
    "expansion_delay": 15,       // Start expanding after 15s
    "expansion_rate": 3,         // Expand faster (1 Elo per 3s)
    "max_multiplier": 4.0        // Allow wider max range
  }
}
```

**Trade-off:** Faster matches but less balanced Elo differences.

</details>

<details>
<summary><strong>Matches are too unbalanced - 1000 Elo vs 1800 Elo!</strong></summary>

**This happens when:**
- One player waited very long (range expanded too much)
- Not enough players in similar Elo range
- Dynamic expansion settings too aggressive

**Solution - Strict matchmaking:**
```json5
{
  "matchmaking": {
    "initial_range": 100,        // Narrower start
    "expansion_delay": 60,       // Wait longer before expanding
    "expansion_rate": 10,        // Expand slower
    "max_multiplier": 2.0        // Lower max range
  }
}
```

**Trade-off:** More balanced matches but longer queue times.

</details>

---

## 🏆 Elo System

<details>
<summary><strong>What's the difference between Pokemon Showdown and Glicko-2?</strong></summary>

| Feature | Pokemon Showdown | Glicko-2 |
|---------|------------------|----------|
| **Complexity** | Simple | Advanced |
| **Accuracy** | Good | Best |
| **New player handling** | K-factor based | Rating Deviation (RD) |
| **Best for** | Most servers | Large competitive servers (100+ players) |
| **Recommended** | ✅ Yes | Only if 100+ active players |

**Pokemon Showdown** is recommended for 95% of servers. Glicko-2 only provides meaningful benefits with large, active player bases.

</details>

<details>
<summary><strong>Why does my Elo change by different amounts each match?</strong></summary>

**Elo change depends on:**
1. **Rating difference** - Beating higher Elo = more gain
2. **Expected outcome** - Upsets give more Elo
3. **K-factor** - New players (K=64) change faster than established (K=32)

**Examples:**
- Beat equal opponent (1000 vs 1000): ±16 Elo
- Upset win (900 vs 1200): +28 Elo
- Expected win (1200 vs 900): +4 Elo

**This is intentional** - rewards beating stronger opponents!

</details>

<details>
<summary><strong>Can I customize K-factor values?</strong></summary>

**Yes:**

```json5
{
  "pokemonShowdown": {
    "kFactor": 32,              // Standard (16-40 recommended)
    "provisionalKFactor": 64    // New players (64-128)
  }
}
```

**K-factor guide:**
- Lower (16-24): Slower, more stable changes
- Standard (32): Balanced (recommended)
- Higher (40-48): Faster progression

**Provisional K-factor** should be ~2x regular K-factor.

</details>

<details>
<summary><strong>What is the Elo floor and why does my Elo stop decreasing?</strong></summary>

**Elo floor** is the minimum Elo rating (default: 1000).

**Why it exists:**
- Prevents discouragement from dropping too low
- Matches Pokemon Showdown's system
- Ensures new players start at baseline

**Can be adjusted:**
```json5
{
  "pokemonShowdown": {
    "floorElo": 1000  // Change to 800, 900, etc.
  }
}
```

**Note:** Setting too low (e.g., 500) may discourage players.

</details>

---

## 🔄 Cross-Server

<details>
<summary><strong>What happens if Redis goes down?</strong></summary>

**Impact:**
- ❌ Cross-server matchmaking stops
- ❌ Queue synchronization fails
- ✅ Local server battles still work (SQLite database)
- ✅ Player stats preserved in MySQL

**Recovery:**
1. Restart Redis server
2. CobbleRanked reconnects automatically
3. Queue resumes normal operation

**Prevention:**
- Monitor Redis uptime
- Use Redis persistence (RDB/AOF)
- Set up Redis alerts

</details>

<details>
<summary><strong>Can I have multiple battle servers?</strong></summary>

**⚠️ Not recommended!**

**Problem:** Multiple battle servers cause:
- Duplicate season rotation
- Conflicting reward distribution
- Database race conditions

**Current limitation:** Only ONE server should have `battle_server: ""` (empty).

**Workaround for high load:**
- Use Velocity load balancing
- Point to multiple battle servers at Velocity level
- CobbleRanked treats them as one logical battle server

**Future feature:** True multi-battle server support may be added.

</details>

<details>
<summary><strong>How do I migrate from single-server to cross-server?</strong></summary>

**Steps:**

1. **Backup SQLite database:**
   ```bash
   cp config/cobbleranked/ranked.db ranked_backup.db
   ```

2. **Set up MySQL and import data:**
   ```bash
   # MySQL import commands (see Migration Guide)
   ```

3. **Install Redis:**
   ```bash
   sudo apt install redis-server
   ```

4. **Update config.json5:**
   ```json5
   {
     "cross_server": {
       "enabled": true,
       "database": { "type": "MYSQL", ... },
       "redis": { ... }
     }
   }
   ```

5. **Restart all servers**

See [Migration Guide](../advanced/migration.md) for detailed steps.

</details>

---

## 🎵 Custom Music

<details>
<summary><strong>Why isn't custom music playing in Cobblemon 1.6.1?</strong></summary>

**It should be playing!** As of the latest update, CobbleRanked **fully supports custom music in Cobblemon 1.6.1**.

**Check these first:**

1. **Verify music is enabled in logs:**
   ```
   [MusicUtil] Detected Cobblemon V1_6_X - Custom music ENABLED
   ```

2. **Ensure music files exist:**
   - Check `assets/cobbleranked/sounds/music/` directory
   - Files must be `.ogg` format
   - Registered in `sounds.json`

3. **Verify players have resource pack:**
   - Music files must be in client-side resource pack
   - Resource pack must be enabled

**If music still doesn't play:**
- Enable debug logging: `"debug_music": true`
- Check for sound errors in client logs
- Verify sound IDs are correct in config

See [Custom Music Documentation](../features/custom-music.md) for full setup guide.

</details>

<details>
<parameter name="summary"><strong>What's the difference between 1.6.x and 1.7.x music support?</strong></summary>

Both versions are **fully supported**, but use different APIs internally:

| Feature | Cobblemon 1.6.x | Cobblemon 1.7.x |
|---------|----------------|----------------|
| Music playback | ✅ Works | ✅ Works |
| API used | `SoundEvent` | `ResourceLocation` |
| Restart existing music | ❌ Not available | ✅ Available |
| Auto-detection | ✅ Automatic | ✅ Automatic |

**As a server admin, you don't need to worry about the differences.** CobbleRanked automatically detects your version and uses the correct API.

**Configuration is identical** across both versions!

</details>

<details>
<parameter name="summary"><strong>Can I disable music for specific phases?</strong></summary>

**Yes!** Set music ID to empty string:

```json5
{
  "ranked_match": {
    "queueMusic": "",  // No queue music
    "teamSelectionMusic": "cobbleranked:team_selection",  // Keep this
    "eloBattleMusic": []  // No battle music
  }
}
```

**Per-phase control:**
- Queue music: `"queueMusic": ""`
- Team selection: `"teamSelectionMusic": ""`
- Battle music: `"eloBattleMusic": []`

</details>

<details>
<parameter name="summary"><strong>How do I add custom music from my own mod?</strong></summary>

**Reference your mod's sounds:**

```json5
{
  "ranked_match": {
    "queueMusic": "yourmod:your_queue_music",
    "teamSelectionMusic": "yourmod:your_team_music",
    "eloBattleMusic": [
      {
        "min_elo": 0,
        "max_elo": 99999,
        "music": "yourmod:your_battle_music",
        "volume": 1.0,
        "pitch": 1.0
      }
    ]
  }
}
```

**Your mod must:**
1. Register sounds in `assets/yourmod/sounds.json`
2. Include `.ogg` files in `assets/yourmod/sounds/`
3. Be installed on client side (as resource pack or mod)

</details>

---

## 🚫 Banned Items

<details>
<parameter name="summary"><strong>What are banned inventory items?</strong></summary>

Banned inventory items prevent players from joining ranked queues if they have specific items in their inventory.

**Default banned items:**
- `mega_showdown:tera_orb` - Prevents Terastallization
- `mega_showdown:dynamax_band` - Prevents Dynamax/Gigantamax

**Use cases:**
- Competitive balance (no unfair mod items)
- Server rules enforcement
- Tournament restrictions

**Configuration:**
```json5
{
  "ranked_match": {
    "banned_inventory_items": [
      "mega_showdown:tera_orb",
      "mega_showdown:dynamax_band",
      "custommod:overpowered_item"
    ]
  }
}
```

See [Banned Items Documentation](../features/banned-items.md) for full guide.

</details>

<details>
<parameter name="summary"><strong>How do I find an item's ID to ban it?</strong></summary>

**Method 1: F3+H in-game**
1. Press `F3 + H` in Minecraft
2. Hover over item in inventory
3. Item ID shows in tooltip (e.g., `mega_showdown:tera_orb`)

**Method 2: /give command**
```
/give @s <tab>
```
Autocomplete shows available item IDs.

**Method 3: Check mod source**
Look for item registration in mod code:
```java
registerItem("tera_orb", ...)
```

**Format:** Always `modid:item_name` (e.g., `minecraft:diamond`, `cobblemon:poke_ball`)

</details>

<details>
<parameter name="summary"><strong>Player says they removed the item but still can't queue?</strong></summary>

**Common causes:**

1. **Multiple instances of the item:**
   - Check all inventory slots (hotbar + main)
   - Item may be in multiple places

2. **Ghost item (rare):**
   ```
   /clear @s <item_id>
   ```
   This force-removes the item.

3. **Wrong item removed:**
   - Error message shows exact item ID
   - Must match exactly (case-sensitive)

4. **Server cache (very rare):**
   - Have player reconnect

**Verification:**
1. Press `F3 + H`
2. Check every inventory slot
3. Ensure item ID matches exactly

</details>

<details>
<parameter name="summary"><strong>Can I ban items from armor slots or offhand?</strong></summary>

**Current limitations:**

✅ **Checked:**
- Hotbar (9 slots)
- Main inventory (27 slots)

❌ **Not checked:**
- Armor slots (head, chest, legs, feet)
- Offhand
- Ender chest

**Workaround for armor/offhand:**
Use the Pokemon blacklist system if the item affects Pokemon directly (e.g., held items).

**Future update:** Armor slot checking may be added if requested.

</details>

---

## 🐛 Bug Fixes & Known Issues

<details>
<parameter name="summary"><strong>I selected 4 Pokemon but 6 appeared in battle!</strong></summary>

**This bug was fixed in the latest version!**

**If you're still experiencing this:**

1. **Update to latest CobbleRanked:**
   - Download from Discord
   - Replace old JAR file
   - Restart server

2. **Verify fix in logs:**
   ```
   [Battle] Pokemon selection mode - filtering to selected Pokemon only
   [Battle] Player1: 4 selected, Player2: 4 selected
   ```

3. **If still broken:**
   - Report to Discord with logs
   - Include server version and Cobblemon version

**Technical details:** Now uses `BattleBuilder.pvp1v1()` with custom `partyAccessor` to correctly filter Pokemon.

</details>

<details>
<parameter name="summary"><strong>Arena shows "not available" after someone disconnected during selection!</strong></summary>

**This bug was fixed in the latest version!**

**Symptoms:**
- Player disconnects during Pokemon/Lead selection
- Next match shows "no arena available"
- Arena stuck in "in use" state

**Fix (in latest version):**
- Arenas are now properly released when players disconnect
- Includes detailed logging: `[Selection] Released arena 'arena1' after disconnect`

**If still occurring:**
1. Update to latest CobbleRanked
2. Restart server
3. Check logs for arena release messages

**Manual workaround (if update unavailable):**
```
/rankedadmin reload
```
This resets all arena states.

</details>

