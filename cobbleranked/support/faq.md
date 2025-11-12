# Frequently Asked Questions (FAQ)

Common questions and answers about CobbleRanked. Click any question to expand the answer.

---

## 📌 General Questions

<details>
<summary><strong>What is CobbleRanked?</strong></summary>

CobbleRanked is a competitive ranked battle system for Cobblemon servers.

**Main Features:**
- **Elo-based matchmaking** - Skill-based player matching
- **Multiple battle formats** - Singles (1v1), Doubles (2v2)
- **Season leaderboards** - Automatic rotation with rewards
- **Customizable restrictions** - Ban Pokemon/moves/abilities/items
- **Cross-server support** - Multi-server networks via MySQL + Redis

</details>

<details>
<summary><strong>Will it work on my server?</strong></summary>

**Requirements:**
- Minecraft **1.21.1**
- Fabric Loader **0.17.2+**
- Cobblemon **1.7.0+** (1.6.x works but without custom music)
- Fabric API **0.116.6+**
- Fabric Language Kotlin **1.13.6+**

If you meet these requirements, it will work!

**Check versions:**
```bash
/version
/fabric
```

</details>

<details>
<summary><strong>Is it compatible with other mods?</strong></summary>

**Yes!** CobbleRanked is compatible with most Fabric mods.

**Confirmed working:**
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
<summary><strong>Is cross-server required?</strong></summary>

**No!** CobbleRanked works in two modes:

**Single-Server Mode (Default):**
- Uses SQLite (built-in)
- No additional setup required
- Perfect for 1-100 players

**Cross-Server Mode (Optional):**
- Uses MySQL + Redis
- Requires configuration
- For multi-server networks (lobby + battle servers)

**Most servers use single-server mode.**

</details>

<details>
<summary><strong>Where can I download it?</strong></summary>

**Official Downloads:**
- **[Discord Server](https://discord.gg/VVVvBTqqyP)** - Get the latest release
- Modrinth _(coming soon)_
- CurseForge _(coming soon)_

**⚠️ Currently only available via Discord!**

Do not download from unofficial sources:
- May contain outdated versions
- May contain malware
- May contain modified/malicious code

</details>

---

## ⚙️ Installation & Setup

<details>
<summary><strong>How do I install CobbleRanked?</strong></summary>

**Step-by-step installation:**

1. **Download the mod** from [Discord](https://discord.gg/VVVvBTqqyP)

2. **Stop your server** if running

3. **Place JAR in mods folder:**
   ```bash
   mods/CobbleRanked-1.0.0.jar
   ```

4. **Verify dependencies installed:**
   - `fabric-api-*.jar`
   - `cobblemon-*.jar`
   - `fabric-language-kotlin-*.jar`

5. **Start the server**
   - Config files generate automatically in `config/cobbleranked/`

6. **Verify installation:**
   ```
   /ranked
   ```
   If the GUI opens, installation succeeded!

See: [Installation Guide](../getting-started/installation.md)

</details>

<details>
<summary><strong>Mod not loading / no CobbleRanked messages in console</strong></summary>

**Problem:** CobbleRanked isn't loading

**Solutions:**

1. **Check Fabric Loader installed:**
   ```bash
   ls mods/ | grep fabric
   ```
   Should see `fabric-loader-*.jar`

2. **Verify dependencies:**
   - Fabric API (`fabric-api-*.jar`)
   - Cobblemon (`cobblemon-*.jar`)
   - Fabric Language Kotlin (`fabric-language-kotlin-*.jar`)

3. **Check server logs for errors:**
   ```bash
   cat logs/latest.log | grep CobbleRanked
   ```

4. **Verify Minecraft version 1.21.1:**
   - Check `server.properties`
   - CobbleRanked only supports 1.21.1

</details>

<details>
<summary><strong>Configuration files not generating</strong></summary>

**Problem:** No `config/cobbleranked/` folder

**Solutions:**

1. **Start server at least once:**
   - Configs generate on first launch
   - Wait for "Done!" message before stopping

2. **Check file permissions:**
   ```bash
   ls -la config/
   ```
   Ensure server can write to `config/` folder

3. **Manually create folder:**
   ```bash
   mkdir -p config/cobbleranked
   ```
   Then restart server

4. **Check for errors:**
   ```bash
   grep -i "error" logs/latest.log | grep -i "cobbleranked"
   ```

</details>

<details>
<summary><strong>How do I create my first battle arena?</strong></summary>

**Quick arena setup:**

1. **Stand at the spawn point** where you want players to teleport

2. **Run the command:**
   ```
   /rankedadmin arena set main_arena
   ```

3. **Verify creation:**
   ```
   /rankedadmin arena list
   ```

**Create multiple arenas:**
```bash
/rankedadmin arena set volcano_arena
/rankedadmin arena set ice_arena
/rankedadmin arena set forest_arena
```

CobbleRanked will randomly select from available arenas.

See: [Arena Configuration](../configuration/arenas.md)

</details>

<details>
<summary><strong>How do I start the first season?</strong></summary>

**Season is automatically created on first launch!**

**Check current season:**
```
/rankedadmin season info
```

**Customize season duration:**

Edit `config/cobbleranked/config.json5`:
```json5
{
  "ranked_match": {
    "reset_days": 30  // Change to 7, 14, 30, 60, 90, etc.
  }
}
```

Reload:
```
/rankedadmin reload
```

**Manually rotate season:**
```
/rankedadmin season rotate
```

See: [Season Management](../features/seasons.md)

</details>

---

## 🔧 Configuration

<details>
<summary><strong>Config changes not applying after reload</strong></summary>

**Problem:** Changed `config.json5`, ran `/rankedadmin reload`, changes not applied

**Solutions:**

1. **Check JSON5 syntax:**
   - Use validator: https://json5.org
   - Common error: Missing commas
   - Common error: Trailing comma on last item (allowed in JSON5!)

2. **Ensure file is saved:**
   - Check file modification time
   - Re-save and try again

3. **Restart server:**
   - Some settings require full restart
   - Stop server, restart, test again

4. **Check console for errors:**
   ```bash
   grep -i "error" logs/latest.log | tail -20
   ```

</details>

<details>
<summary><strong>Blacklist not working / players can still use banned Pokemon</strong></summary>

**Problem:** Added Pokemon to blacklist, players can still use them

**Solutions:**

1. **Check spelling:**
   ```json5
   {
     "black_list_pokemon": [
       "Mewtwo"  // Correct capitalization
     ]
   }
   ```

2. **Reload configuration:**
   ```bash
   /rankedadmin reload
   ```

3. **Check validation message:**
   - Player should see: "You are using a Pokémon that is on the blacklist"
   - If not, blacklist isn't loading

4. **Check line endings (Linux servers):**
   ```bash
   dos2unix config/cobbleranked/blacklist.json5
   ```

5. **Validate JSON5 syntax:**
   - Use online validator
   - Ensure no syntax errors

See: [Blacklist Guide](../configuration/blacklist.md)

</details>

<details>
<summary><strong>Language not changing / still shows English</strong></summary>

**Problem:** Changed language setting but still shows English

**Solutions:**

1. **Check language code matches file name:**
   ```json5
   {
     "language": "ja-Jp"  // Must match exactly
   }
   ```
   Available: `en-Us`, `ja-Jp`, `pt-Br`, `ru-Ru`

2. **Verify language file exists:**
   ```bash
   ls config/cobbleranked/language/
   ```
   Should see `ja-Jp.json5`

3. **Reload config:**
   ```bash
   /rankedadmin reload
   ```

4. **Check console:**
   ```bash
   grep -i "language" logs/latest.log
   ```
   Should see: "Message configurations for language ja-Jp loaded successfully!"

</details>

<details>
<summary><strong>Music errors with Cobblemon 1.6.x</strong></summary>

**Problem:** Errors like `ClassNotFoundException: net.minecraft.sounds.SoundEvent`

**This is normal behavior!**

Custom background music is **intentionally disabled** on Cobblemon 1.6.x due to compatibility issues.

**What works on 1.6.x:**
- ✅ Ranked battles
- ✅ Matchmaking and Elo
- ✅ All GUIs and commands
- ✅ Cross-server support
- ❌ Custom background music only

**To enable custom music on 1.6.1:**
- Use **GUtils mod** (client-side)
- Supports custom BGM functionality
- Players need to install GUtils + server resource pack

**To enable custom music on 1.7.0+:**
- No client mod required!
- Use server resource packs
- All other features work identically

**Expected log message:**
```
[MusicUtil] Detected Cobblemon V1_6_X - Custom music DISABLED (not supported in 1.6.x)
```

See: [How to set up server resource packs](#how-do-i-set-up-server-resource-packs-for-custom-music)

</details>

<details>
<summary><strong>How do I set up server resource packs for custom music?</strong></summary>

**Server resource packs allow you to add custom music without requiring players to manually download files.**

### Step 1: Create Your Resource Pack

1. **Create the pack structure:**
   ```
   cobbleranked-music-pack/
   ├── pack.mcmeta
   └── assets/
       └── cobbleranked/
           └── sounds/
               ├── music/
               │   ├── battle_beginner.ogg
               │   ├── battle_intermediate.ogg
               │   ├── battle_advanced.ogg
               │   ├── battle_expert.ogg
               │   └── battle_master.ogg
               └── sounds.json
   ```

2. **Create `pack.mcmeta`:**
   ```json
   {
     "pack": {
       "pack_format": 34,
       "description": "CobbleRanked Custom Battle Music"
     }
   }
   ```

   **Pack Format Reference:**
   - Minecraft 1.21.1: `34`
   - See [Minecraft Wiki - Pack Format](https://minecraft.wiki/w/Pack_format) for other versions

3. **Create `assets/cobbleranked/sounds.json`:**
   ```json
   {
     "music.battle_beginner": {
       "sounds": [
         {
           "name": "cobbleranked:music/battle_beginner",
           "stream": true
         }
       ]
     },
     "music.battle_intermediate": {
       "sounds": [
         {
           "name": "cobbleranked:music/battle_intermediate",
           "stream": true
         }
       ]
     },
     "music.battle_advanced": {
       "sounds": [
         {
           "name": "cobbleranked:music/battle_advanced",
           "stream": true
         }
       ]
     },
     "music.battle_expert": {
       "sounds": [
         {
           "name": "cobblemon:music/battle_expert",
           "stream": true
         }
       ]
     },
     "music.battle_master": {
       "sounds": [
         {
           "name": "cobbleranked:music/battle_master",
           "stream": true
         }
       ]
     }
   }
   ```

4. **Add your music files:**
   - Place `.ogg` files in `assets/cobbleranked/sounds/music/`
   - Recommended: Use 128-192 kbps OGG Vorbis format
   - File size: Keep individual files under 10MB

5. **Zip the resource pack:**
   ```bash
   cd cobbleranked-music-pack
   zip -r ../cobbleranked-music-pack.zip *
   ```

### Step 2: Host Your Resource Pack

**Option A: mc-packs.net (Recommended)**

1. Visit [mc-packs.net](https://www.mc-packs.net/)
2. Upload your `.zip` file
3. Copy the download URL provided
4. Format: `https://www.mc-packs.net/pack/your-pack-id`

**Option B: Dropbox**
- Upload zip → Get share link → Change `?dl=0` to `?dl=1`

**Option C: Google Drive**
- Upload → Get Link → Use: `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`

**Option D: Your Own Web Server**
- Host the `.zip` with direct HTTP/HTTPS access

### Step 3: Configure Your Server

**For Vanilla/Fabric Servers** - Edit `server.properties`:
```properties
resource-pack=https://www.mc-packs.net/pack/your-pack-id
resource-pack-sha1=YOUR_SHA1_HASH
require-resource-pack=false
resource-pack-prompt=CobbleRanked Custom Music Pack
```

Generate SHA1 hash:
```bash
# Linux/Mac
sha1sum cobbleranked-music-pack.zip

# Windows (PowerShell)
Get-FileHash cobbleranked-music-pack.zip -Algorithm SHA1
```

**For Velocity Proxy** - Edit `velocity.toml`:
```toml
[forced-hosts]
"your-server.com" = [
  {
    resource-pack = "https://www.mc-packs.net/pack/your-pack-id"
    hash = "YOUR_SHA1_HASH"
    prompt = "CobbleRanked Custom Music Pack"
    should-force = false
  }
]
```

### Step 4: Configure CobbleRanked

Edit `config/cobbleranked/config.json5`:

```json5
{
  "music": {
    "elo_based_music": [
      {
        "min_combined_elo": 0,
        "max_combined_elo": 2000,
        "music_list": ["cobbleranked:music.battle_beginner"]
      },
      {
        "min_combined_elo": 2001,
        "max_combined_elo": 2500,
        "music_list": ["cobbleranked:music.battle_intermediate"]
      },
      {
        "min_combined_elo": 2501,
        "max_combined_elo": 3000,
        "music_list": ["cobbleranked:music.battle_advanced"]
      },
      {
        "min_combined_elo": 3001,
        "max_combined_elo": 3500,
        "music_list": ["cobbleranked:music.battle_expert"]
      },
      {
        "min_combined_elo": 3501,
        "max_combined_elo": 999999,
        "music_list": ["cobbleranked:music.battle_master"]
      }
    ]
  }
}
```

### Troubleshooting

**Players can't hear music:**
1. Check resource pack was accepted (press F3 + T)
2. Verify music files are `.ogg` format
3. Check volume settings (Options → Music & Sounds)
4. Cobblemon 1.6.1: Install [GUtils mod](https://modrinth.com/mod/gutils)
5. Cobblemon 1.7.0+: No client mod needed

**Resource pack not downloading:**
1. Test URL in browser
2. Verify SHA1 hash matches
3. Check server.properties syntax
4. File size must be under 100MB

</details>

<details>
<summary><strong>Players get disconnected when joining queue (1.6.1 servers)</strong></summary>

**Problem:** Players without GUtils mod get forcefully disconnected when joining ranked queue on Cobblemon 1.6.1 servers

**Root cause:**
- Cobblemon 1.6.1 doesn't have built-in music packet support
- CobbleRanked uses custom MusicPacket that requires GUtils mod on client
- Vanilla clients crash when receiving the custom packet

**Solution:**

CobbleRanked v1.0.0+ includes automatic client protection:

**Option 1: Disable music for clients without GUtils (recommended)**

Edit `config/cobbleranked/config.json5`:
```json5
{
  "music": {
    "enabled": true,
    "require_client_mod": true  // Safe mode: skip music in 1.6.1
  }
}
```

**Option 2: Require ALL clients to install GUtils**

1. Distribute GUtils mod to all players
2. Set `require_client_mod: false` in config
3. Verify all clients have the mod before enabling

**Option 3: Disable music completely**

```json5
{
  "music": {
    "enabled": false  // Disable all music
  }
}
```

**For Cobblemon 1.7+ servers:**
- No client mod required
- Music works automatically for all clients
- `require_client_mod` setting is ignored

**Technical details:**
- Config check: `music.enabled` (master switch)
- Config check: `music.require_client_mod` (1.6.1 protection)
- Fallback: Silent failure if client incompatible
- Logging: Warns when music is skipped

</details>

<details>
<summary><strong>How do I reload configuration without restarting?</strong></summary>

**Reload all configs:**
```
/rankedadmin reload
```

This reloads:
- `config.json5` (main config)
- `blacklist.json5` (Pokemon restrictions)
- `arenas.json5` (arena locations)
- `rewards.json5` (season rewards)
- GUI files
- Language files

**Note:** Some settings require full restart:
- Cross-server mode enable/disable
- Database type change (SQLite ↔ MySQL)
- Redis connection settings

</details>

---

## 🎮 Gameplay

<details>
<summary><strong>Can't join queue / nothing happens when clicking queue button</strong></summary>

**Problem:** Click queue button, nothing happens or error message

**Common causes & solutions:**

1. **Not enough Pokemon (default: 6 required):**
   - Error: "You need to have 6 Pokémon"
   - Solution: Catch/breed more Pokemon

2. **Pokemon not alive:**
   - Error: "Your Pokémon need to be alive!"
   - Solution: Heal at Pokemon Center

3. **Blacklist violation:**
   - Error: "You are using a Pokémon that is on the blacklist"
   - Solution: Remove banned Pokemon/moves/abilities/items

4. **Ranked system closed:**
   - Error: "Ranked match is not open"
   - Solution: Contact admin to open: `/rankedadmin open`

5. **Banned inventory items (Tera Orb, Dynamax Band, etc.):**
   - Error: Shows which items are banned
   - Solution: Remove banned items from inventory

</details>

<details>
<summary><strong>Queue taking forever / no match found</strong></summary>

**Problem:** In queue for 5+ minutes, no match

**Solutions:**

1. **Check active players:**
   - Need at least 2 players in queue
   - Ask in chat if others are queueing

2. **Check format:**
   - Ensure both players queuing for same format (Singles vs Doubles)
   - Try different format if one is empty

3. **Check Elo range:**
   - Very high/low Elo may have few opponents
   - Range expands over time (default: every 50 seconds)

4. **Check cross-server (if enabled):**
   - Verify Redis connection
   - Check other servers have players

</details>

<details>
<summary><strong>Match found but battle doesn't start</strong></summary>

**Problem:** "Match Found!" message, but no teleport or battle

**Solutions:**

1. **Check arenas configured:**
   ```bash
   /rankedadmin arena list
   ```
   If no arenas: `/rankedadmin arena set main_arena`

2. **Check arena world loaded:**
   - Arena dimension must be loaded
   - Try teleporting manually: `/rankedadmin arena tp arena_name`

3. **Check console errors:**
   ```bash
   tail -f logs/latest.log
   ```
   Look for arena-related errors

4. **Verify both players valid:**
   - Other player might have disconnected
   - Other player might have blacklist violation

</details>

<details>
<summary><strong>What happens if I disconnect during battle?</strong></summary>

**Disconnect behavior:**
- Disconnected player **counts as loss**
- Opponent **counts as win**
- Flee count incremented for disconnected player
- Full Elo penalty applied

**If disconnect was unintentional (crash/internet):**

Admin can reset flee count:
```bash
/rankedadmin flee reset PlayerName
```

See: [Disconnect Penalties](../features/disconnect-penalties.md)

</details>

<details>
<summary><strong>How do I check my stats?</strong></summary>

**View your stats:**

1. **Open ranked GUI:**
   ```
   /ranked
   ```

2. **Your stats display:**
   - Current Elo rating
   - Total wins/losses
   - Win rate percentage
   - Current season rank

**View leaderboards:**
- Click "Leaderboard" in `/ranked` GUI
- Shows top 100 players
- Separate rankings for Singles and Doubles

</details>

<details>
<summary><strong>How do placeholder rankings work?</strong></summary>

**Placeholder system for holograms/signs:**

CobbleRanked provides placeholders to display top player data.

**Examples:**
```
%cobbleranked_top_1_name%           → "Notch"
%cobbleranked_top_singles_1_elo%    → "1650"
%cobbleranked_top_doubles_3_winrate% → "80.0%"
```

**Supported formats:**
- All formats: `%cobbleranked_top_<rank>_<field>%`
- Singles only: `%cobbleranked_top_singles_<rank>_<field>%`
- Doubles only: `%cobbleranked_top_doubles_<rank>_<field>%`

**Supported fields:**
- `name` - Player name
- `elo` - Elo rating
- `wins` - Total wins
- `losses` - Total losses
- `winrate` - Win rate percentage
- `games` - Total games played

**Supported ranks:** 1-100

**Test placeholders:**
```
/rankedplaceholder test %cobbleranked_top_1_name%
```

**Full documentation:** [Placeholder API Guide](../integration/placeholders.md)

</details>

---

## ⚔️ Battles

<details>
<summary><strong>Battle not starting after teleport</strong></summary>

**Problem:** Teleported to arena, no battle GUI appears

**Solutions:**

1. **Wait a moment:**
   - Battle starts after 3-second countdown
   - Be patient

2. **Check Cobblemon version:**
   - Requires Cobblemon 1.7.0+
   - Update if using older version

3. **Check both players teleported:**
   - If one player didn't teleport, battle won't start
   - Check console for teleport errors

4. **Report bug:**
   - If persistent, report in Discord #feedback

</details>

<details>
<summary><strong>Elo not updating after battle</strong></summary>

**Problem:** Battle completed (win/loss), Elo stayed the same

**Solutions:**

1. **Check battle ended in draw:**
   - Turn limit reached (default: 100 turns)
   - Draws don't change Elo
   - Solution: Increase turn limit in config

2. **Check Elo system enabled:**
   ```json5
   {
     "eloSystem": {
       "mode": "POKEMON_SHOWDOWN"  // or "LEGACY"
     }
   }
   ```

3. **Check database connection:**
   - SQLite: Verify `config/cobbleranked/ranked.db` exists
   - MySQL: Test connection: `mysql -u user -p -h host database`

4. **Check console for errors:**
   ```bash
   grep -i "elo" logs/latest.log | grep -i "error"
   ```

</details>

<details>
<summary><strong>How does the Elo system work?</strong></summary>

**Elo rating system:**

CobbleRanked uses skill-based matchmaking with Elo ratings.

**Default settings:**
- Starting Elo: 1000
- Win: +10 to +30 Elo (depends on opponent Elo)
- Loss: -10 to -30 Elo
- Draw: No change

**Elo calculation:**
- Higher Elo opponent = more points for win
- Lower Elo opponent = fewer points for win
- Beating someone 200+ Elo above you = max points

**Modes available:**
1. **POKEMON_SHOWDOWN** (default) - Pokemon Showdown-style Elo
2. **LEGACY** - Simple K-factor system
3. **GLICKO2** - Advanced rating system

See: [Elo System Guide](../features/elo-system.md)

</details>

---

## 🏟️ Arenas

<details>
<summary><strong>How do I create a battle arena?</strong></summary>

**Quick setup:**

1. **Build your arena** (or use existing location)

2. **Stand at spawn point** where players should teleport

3. **Run command:**
   ```
   /rankedadmin arena set <arena_name>
   ```
   Example: `/rankedadmin arena set main_arena`

4. **Verify:**
   ```
   /rankedadmin arena list
   ```

**Create multiple arenas:**
```bash
/rankedadmin arena set arena1
/rankedadmin arena set arena2
/rankedadmin arena set arena3
```

CobbleRanked randomly selects from available arenas.

See: [Arena Configuration](../configuration/arenas.md)

</details>

<details>
<summary><strong>Can I have multiple arenas?</strong></summary>

**Yes!** You can create unlimited arenas.

**Benefits:**
- Variety for players
- Prevents players from fighting in same location
- Can theme arenas (volcano, ice, forest, etc.)

**Create multiple:**
```bash
/rankedadmin arena set volcano
/rankedadmin arena set ice_cave
/rankedadmin arena set forest
```

**Random selection:**
- CobbleRanked randomly picks an available arena
- All arenas have equal chance

</details>

<details>
<summary><strong>How do I teleport to an arena to build it?</strong></summary>

**Teleport to arena:**
```
/rankedadmin arena tp <arena_name>
```

Example:
```
/rankedadmin arena tp main_arena
```

**List all arenas:**
```
/rankedadmin arena list
```

</details>

<details>
<summary><strong>Where do players go after battles?</strong></summary>

**After battle ends:**
- Players automatically teleport back to their **original position**
- Position saved before arena teleport
- Includes: X, Y, Z coordinates, world/dimension, rotation (yaw, pitch)

**If teleport fails:**
- Players go to **exit location** (fallback)
- Set with: `/rankedadmin setexit`

**Cross-server:**
- Players transfer back to **origin server**
- Then teleport to original position on that server

</details>

---

## 🌐 Cross-Server

<details>
<summary><strong>How do I set up cross-server mode?</strong></summary>

**Cross-server architecture:**

```
Lobby Server 1 ──┐
Lobby Server 2 ──┼─→ Battle Server (hosts all battles)
Lobby Server 3 ──┘
```

**Requirements:**
- MySQL database (shared across servers)
- Redis server (real-time queue sync)
- Velocity proxy (player transfers)

**Quick setup:**

1. **Set up MySQL database** (run once):
   ```sql
   CREATE DATABASE cobbleranked;
   CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
   ```

2. **Configure battle server** (`config.json5`):
   ```json5
   {
     "cross_server": {
       "enabled": true,
       "server_id": "battle",
       "battle_server": "",  // Empty = this IS battle server
       "database": { "type": "MYSQL", ... },
       "redis": { ... }
     }
   }
   ```

3. **Configure lobby servers** (`config.json5`):
   ```json5
   {
     "cross_server": {
       "enabled": true,
       "server_id": "main1",  // Unique per server
       "battle_server": "battle",  // Points to battle server
       "database": { "type": "MYSQL", ... },
       "redis": { ... }
     }
   }
   ```

4. **Restart all servers**

See: [Cross-Server Setup Guide](../advanced/cross-server.md)

</details>

<details>
<summary><strong>Players can't see each other across servers</strong></summary>

**Problem:** Multi-server setup, players on Server A can't match with Server B

**Solutions:**

1. **Check MySQL connection:**
   - All servers must connect to **same MySQL database**
   ```bash
   mysql -u username -p -h host database
   ```

2. **Check Redis connection:**
   - Required for real-time queue sync
   ```bash
   redis-cli -h host -p port PING
   ```
   Should respond: `PONG`

3. **Check battle_server setting:**
   - Only ONE server should have `battle_server: ""`
   - All others should point to battle server

4. **Check cross_server enabled:**
   ```json5
   {
     "cross_server": {
       "enabled": true
     }
   }
   ```

</details>

<details>
<summary><strong>Multiple battle servers detected error</strong></summary>

**Error:** `CRITICAL ERROR: Multiple Battle Servers Detected!`

**Problem:** Multiple servers have `battle_server: ""` (empty string)

**Impact:**
- Duplicate season management
- Duplicate reward distribution
- Matchmaking conflicts

**Solution:**

1. Check all server configs
2. Only ONE server should have `battle_server: ""`
3. All others: `battle_server: "actual_battle_server_name"`
4. Restart all servers

**Verify:**
```bash
redis-cli
> KEYS server_heartbeat:*
# Should show all connected servers
```

</details>

<details>
<summary><strong>Players stuck on battle server after match</strong></summary>

**Problem:** Players don't return to origin server after battle

**Solutions:**

1. **Check Velocity server names:**
   - `battle_server` in config must match Velocity `servers` name **exactly**
   - Case-sensitive!

2. **Verify player origin saved:**
   ```bash
   redis-cli
   > GET player_origin:{uuid}
   # Should show origin server ID
   ```

3. **Check console logs:**
   - Look for `[BATTLE-END] Transferring players back`
   - Check for transfer errors

4. **Verify Velocity configuration:**
   - All servers registered in `velocity.toml`
   - Player has permission to join origin server

</details>

<details>
<summary><strong>Database connection failed (MySQL)</strong></summary>

**Error:** `Failed to connect to MySQL database`

**Solutions:**

1. **Check MySQL running:**
   ```bash
   systemctl status mysql
   ```

2. **Verify credentials in config:**
   ```json5
   {
     "cross_server": {
       "database": {
         "host": "localhost",  // Correct IP?
         "port": 3306,         // Correct port?
         "username": "user",   // Correct username?
         "password": "pass"    // Correct password?
       }
     }
   }
   ```

3. **Test connection manually:**
   ```bash
   mysql -u username -p -h host database
   ```

4. **Check firewall:**
   - MySQL port (3306) must be open
   - Allow connections from server IP

See: [Database Guide](../advanced/database.md)

</details>

<details>
<summary><strong>Redis connection issues</strong></summary>

**Problem:** Can't connect to Redis

**Solutions:**

1. **Check Redis running:**
   ```bash
   systemctl status redis
   ```

2. **Test connection:**
   ```bash
   redis-cli -h localhost -p 6379 PING
   ```
   Should respond: `PONG`

3. **Check config:**
   ```json5
   {
     "cross_server": {
       "redis": {
         "host": "localhost",  // Correct IP?
         "port": 6379,         // Correct port?
         "password": "",       // Correct password (if set)?
         "database": 0
       }
     }
   }
   ```

4. **Check firewall:**
   - Redis port (6379) must be open
   - Allow connections from all Minecraft servers

See: [Redis Setup](../advanced/redis.md)

</details>

---

## 🎯 Placeholders

<details>
<summary><strong>How do I use placeholders in holograms?</strong></summary>

**Placeholder system for displaying top player data**

**HolographicDisplays example:**
```bash
/hd create ranked_top3
/hd addline ranked_top3 §6§lTop 3 Players
/hd addline ranked_top3 §e1st: %cobbleranked_top_singles_1_name% §7(%cobbleranked_top_singles_1_elo% Elo)
/hd addline ranked_top3 §e2nd: %cobbleranked_top_singles_2_name% §7(%cobbleranked_top_singles_2_elo% Elo)
/hd addline ranked_top3 §e3rd: %cobbleranked_top_singles_3_name% §7(%cobbleranked_top_singles_3_elo% Elo)
```

**Available placeholders:**
- `%cobbleranked_top_<rank>_name%` - Player name
- `%cobbleranked_top_<rank>_elo%` - Elo rating
- `%cobbleranked_top_<rank>_wins%` - Total wins
- `%cobbleranked_top_<rank>_losses%` - Total losses
- `%cobbleranked_top_<rank>_winrate%` - Win rate
- `%cobbleranked_top_<rank>_games%` - Total games

**Format-specific:**
- Singles: `%cobbleranked_top_singles_<rank>_<field>%`
- Doubles: `%cobbleranked_top_doubles_<rank>_<field>%`

**Supported ranks:** 1-100

</details>

<details>
<summary><strong>How do I test placeholders?</strong></summary>

**Test placeholder resolution:**
```
/rankedplaceholder test %cobbleranked_top_1_name%
```

Shows:
- Input: `%cobbleranked_top_1_name%`
- Output: `Notch` (example)

**Clear cache (for testing):**
```
/rankedplaceholder clear
```

**List all available placeholders:**
```
/rankedplaceholder list
```

</details>

<details>
<summary><strong>Can I use placeholders in signs?</strong></summary>

**Yes!** Use placeholders in any text-based display.

**Sign example:**
```
Line 1: [Rank 1]
Line 2: %cobbleranked_top_1_name%
Line 3: %cobbleranked_top_1_elo% Elo
Line 4: %cobbleranked_top_1_winrate% WR
```

**Scoreboard (CMI, etc.):**
```
§e#1 §f%cobbleranked_top_1_name% §7(%cobbleranked_top_1_wins%W/%cobbleranked_top_1_losses%L)
§e#2 §f%cobbleranked_top_2_name% §7(%cobbleranked_top_2_wins%W/%cobbleranked_top_2_losses%L)
```

**Chat announcements:**
```
Congratulations to %cobbleranked_top_1_name% for reaching #1 with %cobbleranked_top_1_elo% Elo!
```

</details>

<details>
<summary><strong>How do I customize GUI titles with special fonts?</strong></summary>

**GUI title customization for resource packs:**

All GUIs support custom titles with special fonts/image glyphs.

**1. Edit GUI config** (`config/cobbleranked/gui.json5`):
```json5
{
  "gui_ranked": {
    "title": "\uE001",  // Custom unicode character
    // ...
  }
}
```

**2. Create resource pack font definition:**
```json
{
  "providers": [
    {
      "type": "bitmap",
      "file": "cobbleranked:gui/ranked_menu.png",
      "ascent": 8,
      "height": 256,
      "chars": ["\uE001"]
    }
  ]
}
```

**3. Add image file:**
- Path: `assets/cobbleranked/textures/gui/ranked_menu.png`
- Size: 176x166 pixels (standard chest GUI size)

**Supported GUIs:**
- Main ranked menu (`gui_ranked`)
- Team selection (`gui_team_selection`)
- Lead selection (`gui_lead_selection`)
- Match ready (`gui_match_ready`)
- Leaderboard (`gui_leaderboard`)
- Blacklist (`gui_blacklist`)

</details>

---

## 🐛 Troubleshooting

<details>
<summary><strong>GUI not opening when using /ranked</strong></summary>

**Problem:** `/ranked` command runs, no GUI appears

**Solutions:**

1. **Check permission:**
   ```bash
   /lp user YourName permission check cobbleranked.gui
   ```
   Should return: `true`

2. **Check GUI files exist:**
   ```bash
   ls config/cobbleranked/gui/
   ```
   Should see `gui-*.json5` files

3. **Check language setting matches GUI file:**
   - English: `gui-enUs.json5`
   - Japanese: `gui-jaJp.json5`

4. **Check console errors:**
   ```bash
   grep -i "gui" logs/latest.log | grep -i "error"
   ```

</details>

<details>
<summary><strong>Server lag during battles</strong></summary>

**Problem:** TPS drops during battles, players experience lag

**Solutions:**

1. **Check server resources:**
   ```bash
   top
   ```
   Monitor CPU and RAM usage

2. **Reduce turn limit:**
   ```json5
   {
     "battle": {
       "maxTurns": 50  // Reduce from 100
     }
   }
   ```

3. **Upgrade server hardware:**
   - CobbleRanked has minimal performance impact
   - Lag likely caused by other plugins/mods

4. **Disable other plugins temporarily:**
   - Diagnose which plugin causes lag
   - Re-enable one by one

</details>

<details>
<summary><strong>Rewards not appearing / not executing</strong></summary>

**Problem:** Reached milestone, no reward item in GUI or commands not executing

**Solutions:**

1. **Check reward configured:**
   - Open `rewards.json5`
   - Verify milestone exists for your format (Singles/Doubles)

2. **Check already claimed:**
   - Rewards are one-time per season
   - Check if you already claimed it this season

3. **Check command syntax:**
   ```json5
   {
     "commands": [
       "give {player} minecraft:diamond 64"  // Correct
     ]
   }
   ```
   NOT: `"give PlayerName diamond 64"` (wrong)

4. **Test command manually:**
   ```bash
   /give YourName minecraft:diamond 64
   ```
   If manual works, issue is with placeholder

5. **Check console errors:**
   ```bash
   grep -i "reward" logs/latest.log | grep -i "error"
   ```

See: [Rewards Configuration](../configuration/rewards.md)

</details>

---

## 📞 Getting Help

<details>
<summary><strong>Where can I get support?</strong></summary>

**Official Support Channels:**

- **Discord Server:** [Join for Support](https://discord.gg/VVVvBTqqyP)
  - #feedback channel for bug reports
  - #support channel for help

- **Email:** garshy.gaming@gmail.com

- **Discord DM:** @gashicha

**When asking for help, include:**

1. **CobbleRanked version** (check JAR file name)
2. **Cobblemon version** (`ls mods/ | grep cobblemon`)
3. **Minecraft version** (check `server.properties`)
4. **Error messages** (`tail -100 logs/latest.log`)
5. **Configuration files** (if relevant)
6. **Steps to reproduce**

</details>

<details>
<summary><strong>How do I report a bug?</strong></summary>

**Bug reporting:**

1. **Check if it's a known issue:**
   - Read [Troubleshooting Guide](troubleshooting.md)
   - Search Discord #feedback channel

2. **Gather information:**
   - CobbleRanked version
   - Error messages from console
   - Steps to reproduce

3. **Submit bug report:**
   - Discord #feedback channel
   - Email: garshy.gaming@gmail.com

4. **Include:**
   - What you expected to happen
   - What actually happened
   - Screenshots (if applicable)
   - Full error logs

</details>

---

**Related Documentation:**
- [Installation Guide](../getting-started/installation.md)
- [Quick Start Guide](../getting-started/quick-start.md)
- [Configuration Guide](../configuration/README.md)
- [Troubleshooting Guide](troubleshooting.md)
