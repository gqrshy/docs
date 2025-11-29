# Troubleshooting

Common issues and their solutions for CobbleRanked.

## Installation Issues

### Mod not loading

**Symptoms:**
- No CobbleRanked messages in console
- `/ranked` command doesn't work
- Mod doesn't appear in mod list

**Solutions:**

1. **Verify Fabric Loader installed:**
   ```bash
   # Check mods folder
   ls mods/ | grep fabric
   ```
   Should see `fabric-loader-*.jar`

2. **Check dependencies:**
   - Fabric API (`fabric-api-*.jar`)
   - Cobblemon (`cobblemon-*.jar`)
   - Fabric Language Kotlin (`fabric-language-kotlin-*.jar`)

3. **Check server logs:**
   ```bash
   cat logs/latest.log | grep CobbleRanked
   ```
   Look for errors during mod loading

4. **Ver Minecraft version:**
   - CobbleRanked requires Minecraft 1.21.1
   - Check `server.properties` for correct version

### Configuration files not generating

**Symptoms:**
- No `config/cobbleranked/` folder
- Missing configuration files

**Solutions:**

1. **Start server at least once:**
   - Configs generate on first launch
   - Wait for "Done!" message

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

### Music errors (Cobblemon 1.6.x)

**Symptoms:**
- Errors like `ClassNotFoundException: net.minecraft.core.registries.BuiltInRegistries`
- Errors like `ClassNotFoundException: net.minecraft.sounds.SoundEvent`
- Warning: `[MusicUtil] Custom music DISABLED (not supported in 1.6.x)`

**Cause:**
Custom background music is **intentionally disabled** on Cobblemon 1.6.x due to compatibility issues with Fabric's runtime class obfuscation.

**Solutions:**

1. **This is normal behavior** - No action required
   - CobbleRanked detects Cobblemon 1.6.x and automatically disables music
   - All other features work perfectly
   - Music silently skips without errors

2. **Expected log message:**
   ```
   [MusicUtil] Detected Cobblemon V1_6_X - Custom music DISABLED (not supported in 1.6.x)
   ```

3. **To enable custom music:**
   - Upgrade to **Cobblemon 1.7.0+**
   - All other features work identically between versions

**What still works on 1.6.x:**
- ✅ Ranked battles
- ✅ Matchmaking and Elo
- ✅ All GUIs and commands
- ✅ Cross-server support
- ❌ Custom background music only

---

## Queue & Matchmaking Issues

### Can't join queue

**Symptoms:**
- Click queue button, nothing happens
- Error message when joining

**Solutions:**

1. **Check team size:**
   - Default requires 6 Pokemon
   - Error: "You need to have 6 Pokémon"
   - Solution: Catch/breed more Pokemon

2. **Check Pokemon are alive:**
   - All Pokemon must have HP > 0
   - Error: "Your Pokémon need to be alive!"
   - Solution: Heal at Pokemon Center

3. **Check blacklist violations:**
   - Banned Pokemon in party
   - Banned moves/abilities/items
   - Error: "You are using a Pokémon that is on the blacklist"
   - Solution: Remove banned Pokemon, see [Blacklist](../configuration/blacklist.md)

4. **Check ranked status:**
   - System might be closed
   - Error: "Ranked match is not open"
   - Solution: Contact admin to open: `/rankedadmin open`

### Queue taking forever

**Symptoms:**
- In queue for 5+ minutes
- No match found

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

4. **Check cross-server:**
   - If cross-server enabled, verify Redis connection
   - Check other servers have players

### Match found but battle doesn't start

**Symptoms:**
- "Match Found!" message
- No teleport to arena
- Stuck in queue

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

---

## Battle Issues

### Battle not starting after teleport

**Symptoms:**
- Teleported to arena
- No battle GUI appears
- Standing in arena doing nothing

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

4. **Try manual battle command:**
   - Not officially supported, but may help diagnose
   - Report bug in Discord #feedback if persistent

### Elo not updating after battle

**Symptoms:**
- Battle completed (win/loss)
- Elo stayed the same

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
   - MySQL: Test connection with `mysql -u user -p -h host database`

4. **Check console for errors:**
   ```bash
   grep -i "elo" logs/latest.log | grep -i "error"
   ```

### Disconnect during battle

**Symptoms:**
- Player disconnected mid-battle
- What happens?

**Behavior:**
- Disconnected player **counts as loss**
- Opponent **counts as win**
- Flee count incremented for disconnected player
- Full Elo penalty applied

**Solutions:**
- Intentional: None (this is intended behavior)
- Unintentional (crash/internet): Admin can reset flee count
  ```bash
  /rankedadmin flee reset PlayerName
  ```

---

## Configuration Issues

### Config not reloading

**Symptoms:**
- Changed `config.json5`
- Ran `/rankedadmin reload`
- Changes not applied

**Solutions:**

1. **Check JSON5 syntax:**
   - Use validator: https://json5.org
   - Common error: Missing commas
   - Common error: Trailing comma on last item (allowed in JSON5!)

2. **Check file saved:**
   - Ensure you saved the file after editing
   - Check file modification time

3. **Restart server:**
   - Some settings require full restart
   - Stop server, restart, test again

4. **Check console for errors:**
   ```bash
   grep -i "error" logs/latest.log | tail -20
   ```

### Blacklist not working

**Symptoms:**
- Added Pokemon to blacklist
- Players can still use them

**Solutions:**

1. **Check spelling:**
   ```json5
   {
     "black_list_pokemon": [
       "Mewtwo"  // Correct capitalization
     ]
   }
   ```

2. **Check reloaded:**
   ```bash
   /rankedadmin reload
   ```

3. **Check validation message:**
   - Player should see: "You are using a Pokémon that is on the blacklist"
   - If not, blacklist isn't loading

4. **Check line endings:**
   - Use LF not CRLF
   ```bash
   dos2unix config/cobbleranked/blacklist.json5
   ```

5. **Check JSON5 syntax:**
   - Ensure no syntax errors
   - Use online validator

### Language not loading

**Symptoms:**
- Changed language in config
- Still shows English after reload

**Solutions:**

1. **Check language code:**
   ```json5
   {
     "language": "ja-Jp"  // Must match file name exactly
   }
   ```
   Available: `en-Us`, `ja-Jp`, `fr-Fr`

   > **Note:** `pt-Br` and `ru-Ru` support has been discontinued as of v1.0

2. **Check file exists:**
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

### Missing language messages

**Symptoms:**
- Some messages show key instead of text (e.g., `match-winner` instead of "Victory!")

**Solutions:**

1. **Ensure all keys exist:**
   - Check your language file has all keys from `en-Us.json5`
   - Copy missing keys from English reference file

2. **Verify JSON5 syntax:**
   - Use validator: https://json5.org
   - Check for missing commas or brackets

3. **Reload configuration:**
   ```bash
   /rankedadmin reload
   ```

### Placeholders not replacing

**Symptoms:**
- Messages show `{player}` instead of actual player name
- Elo shows as `{elo}` instead of number

**Solutions:**

1. **Verify placeholder spelling:**
   - Use exact spelling: `{player}` not `{Player}`
   - Case-sensitive!

2. **Check placeholder in correct message:**
   - Not all placeholders work in all messages
   - See [Language File Documentation](../configuration/languages.md#placeholders)

3. **Test with different message:**
   - Try a known working placeholder to verify system works

### Color codes not working

**Symptoms:**
- Shows `&a` instead of green color
- Colors display as raw text

**Solutions:**

1. **Use correct symbol:**
   - Use `&` not `§` for color codes
   - Example: `&aGreen` not `§aGreen`

2. **Check Minecraft version:**
   - Ensure version supports color codes (all modern versions do)
   - Verify client can display colors

3. **Verify JSON5 escaping:**
   - Don't escape `&` in JSON5
   - Example: `"message": "&aGreen"` (correct)
   - NOT: `"message": "\\&aGreen"` (wrong)

---

## Reward Issues

### Rewards not appearing in GUI

**Symptoms:**
- Reached milestone (e.g., 10 wins)
- No reward item in GUI

**Solutions:**

1. **Check reward configured:**
   - Open `rewards.json5`
   - Verify milestone exists for your format (Singles/Doubles)

2. **Check already claimed:**
   - Rewards are one-time per season
   - Check if you already claimed it this season

3. **Check format:**
   - Singles milestones only appear for Singles players
   - Doubles milestones only for Doubles players

4. **Reload rewards:**
   ```bash
   /rankedadmin reload
   ```

### Reward commands not executing

**Symptoms:**
- Claimed reward
- Items not received

**Solutions:**

1. **Check command syntax:**
   ```json5
   {
     "commands": [
       "give {player} minecraft:diamond 64"  // Correct
     ]
   }
   ```
   NOT: `"give PlayerName diamond 64"` (wrong)

2. **Check placeholder:**
   - Must use `{player}` not `{username}` or `%player%`

3. **Test command manually:**
   ```bash
   /give YourName minecraft:diamond 64
   ```
   If manual works, issue is with placeholder

4. **Check required plugins:**
   - Economy commands require economy plugin (EssentialsX, etc.)
   - Permission commands require [LuckPerms](../integration/luckperms.md)

5. **Check console errors:**
   ```bash
   grep -i "reward" logs/latest.log | grep -i "error"
   ```

---

## Cross-Server Issues

### Players can't see each other across servers

**Symptoms:**
- Multi-server setup
- Players on Server A can't match with Server B

**Solutions:**

1. **Check MySQL connection:**
   - All servers must connect to same MySQL database
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

See [Cross-Server Setup](../advanced/cross-server.md) for detailed guide.

### Multiple battle servers detected

**Symptoms:**
- Console error: "CRITICAL ERROR: Multiple Battle Servers Detected!"

**Problem:**
- Multiple servers have `battle_server: ""` (empty string)
- Causes duplicate season management, duplicate rewards

**Solution:**
1. Check all server configs
2. Only ONE server should have `battle_server: ""`
3. All others: `battle_server: "actual_battle_server_name"`
4. Restart all servers

---

## Performance Issues

### Server lag during battles

**Symptoms:**
- TPS drops during battles
- Players experience lag

**Solutions:**

1. **Check server resources:**
   ```bash
   top
   ```
   CPU and RAM usage

2. **Reduce turn limit:**
   ```json5
   {
     "battle": {
       "maxTurns": 50  // Reduce from 100
     }
   }
   ```

3. **Limit concurrent battles:**
   - Not configurable currently
   - Upgrade server hardware if needed

4. **Check other plugins:**
   - Disable other plugins temporarily to diagnose
   - CobbleRanked alone has minimal performance impact

### Database growing too large

**Symptoms:**
- `ranked.db` file very large (> 100MB)

**Solutions:**

1. **Normal growth:**
   - ~1 KB per player
   - 10,000 players = ~10 MB
   - 100 MB indicates ~100,000 players (unlikely)

2. **Check for duplicates:**
   - Shouldn't happen, but check database
   ```bash
   sqlite3 config/cobbleranked/ranked.db "SELECT COUNT(*) FROM player_ranked_stats;"
   ```

3. **Migrate to MySQL:**
   - Better for large player bases (1000+ players)
   - See [Database Guide](../advanced/database.md)

---

## GUI Issues

### GUI not opening

**Symptoms:**
- `/ranked` command runs
- No GUI appears

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

3. **Check language setting:**
   - GUI file must match language
   - English: `gui-enUs.json5`
   - Japanese: `gui-jaJp.json5`

4. **Check console errors:**
   ```bash
   grep -i "gui" logs/latest.log | grep -i "error"
   ```

### GUI items not rendering

**Symptoms:**
- GUI opens but items wrong/missing

**Solutions:**

1. **Check item IDs:**
   ```json5
   {
     "item": "minecraft:diamond"  // Must be valid item ID
   }
   ```

2. **Check custom_model_data:**
   - If using resource pack, verify custom model exists
   - Set to `0` if not using custom models

3. **Reload GUI:**
   ```bash
   /rankedadmin reload
   ```

---

## Database Issues

### Database connection failed (MySQL)

**Symptoms:**
- Console error: "Failed to connect to MySQL database"

**Solutions:**

1. **Check MySQL running:**
   ```bash
   systemctl status mysql
   ```

2. **Check credentials:**
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

See [Database Guide](../advanced/database.md) for setup.

### Database corrupted (SQLite)

**Symptoms:**
- Console error: "database disk image is malformed"

**Solutions:**

1. **Backup database:**
   ```bash
   cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup
   ```

2. **Try repair:**
   ```bash
   sqlite3 config/cobbleranked/ranked.db "PRAGMA integrity_check;"
   ```

3. **If repair fails, restore from backup:**
   ```bash
   cp config/cobbleranked/ranked.db.backup config/cobbleranked/ranked.db
   ```

4. **If no backup, reset database:**
   ```bash
   rm config/cobbleranked/ranked.db
   ```
   **Warning:** All player data will be lost!

---

## Casual Missions Issues

### Missions Not Resetting

**Symptoms:**
- Daily missions not resetting at configured time
- Weekly missions not resetting on configured day

**Solutions:**

1. **Check timezone configuration:**
   ```json5
   {
     "reset_settings": {
       "daily_reset_timezone": "UTC"  // Verify this matches your server timezone
     }
   }
   ```

2. **Check reset time:**
   ```json5
   {
     "reset_settings": {
       "daily_reset_time": "00:00",  // 24-hour format
       "weekly_reset_day": "MONDAY"
     }
   }
   ```

3. **Check server logs:**
   ```bash
   grep -i "mission" logs/latest.log | grep -i "reset"
   ```
   Should see:
   ```
   [CobbleRanked] Daily missions reset at 00:00 UTC
   [CobbleRanked] Weekly missions reset on MONDAY at 00:00 UTC
   ```

4. **Verify server time:**
   ```bash
   date
   ```
   Ensure server time is correct

### Progress Not Tracking

**Symptoms:**
- Completed matches but mission progress not updating
- Progress stuck at same number

**Solutions:**

1. **Verify mission is active:**
   - Open `/casual` menu
   - Check mission list
   - Ensure mission not already completed

2. **Check mission type:**
   - WIN_STREAK resets on any loss
   - POKEMON_DEFEATED counts across ALL matches (cumulative)
   - GENERATION_USAGE requires Pokemon from specified generation in active team
   - FORMAT_PARTICIPATION must match the format you played

3. **Check format:**
   - Format-specific missions only count matches in that format
   - Example: "Singles Specialist" only counts Singles matches

4. **Reload GUI:**
   - Close and reopen `/casual` menu
   - Progress may need to refresh

5. **Check console:**
   ```bash
   grep -i "casual" logs/latest.log | tail -20
   ```

### Rewards Not Received

**Symptoms:**
- Claimed reward but items not in inventory
- Click claim button nothing happens

**Solutions:**

1. **Check inventory space:**
   - Full inventory causes items to drop at your location
   - Look around for dropped items
   - Clear inventory and claim again

2. **Check pending rewards:**
   ```bash
   /casual
   ```
   Look for "Pending Rewards" section

3. **Verify reward commands:**
   - Check `casual_missions.json5` for correct commands
   - Test command manually:
     ```bash
     /give YourName cobblemon:exp_candy_m 2
     ```

4. **Check console errors:**
   ```bash
   grep -i "reward" logs/latest.log | grep -i "error"
   ```

5. **Check already claimed:**
   - Milestone rewards are one-time only
   - Can't claim same milestone twice

### Mission Not Completing

**Symptoms:**
- Progress reached target value
- Mission still shows as incomplete

**Solutions:**

1. **Check exact requirements:**
   - WIN_STREAK: Must win consecutively (no losses between)
   - POKEMON_TYPE_USAGE: Pokemon must be in active team (not just party)
   - EVOLUTION_STAGE: Check evolution stage is correct (FIRST/MIDDLE/FINAL/SINGLE)

2. **Check progress value:**
   - Some missions count unique matches, not cumulative
   - GENERATION_USAGE counts matches where you used Gen X Pokemon, not total Pokemon used

3. **Claim reward:**
   - Mission completes but requires manual claim
   - Click the mission item in GUI

4. **Check mission configuration:**
   ```json5
   {
     "target_value": 3,  // Must reach exactly this value
     "type": "MATCH_COUNT"
   }
   ```

### Pending Rewards Not Appearing

**Symptoms:**
- Completed mission while offline
- No rewards when logging in

**Solutions:**

1. **Check database:**
   - Pending rewards stored in database
   - Verify database connection working

2. **Check console on login:**
   ```bash
   grep -i "pending" logs/latest.log
   ```
   Should see: `[CobbleRanked] You have X pending rewards!`

3. **Open casual menu:**
   ```bash
   /casual
   ```
   Pending rewards should show automatically

4. **Check reward data:**
   - May be corrupted if server crashed during reward creation
   - Check console for errors

---

## Getting Help

### Information to Provide

When asking for help, include:

1. **CobbleRanked version:**
   - Check mod JAR file name

2. **Cobblemon version:**
   ```bash
   ls mods/ | grep cobblemon
   ```

3. **Minecraft version:**
   - Check `server.properties`

4. **Error messages:**
   ```bash
   tail -100 logs/latest.log
   ```

5. **Configuration files:**
   - `config.json5`
   - `blacklist.json5` (if relevant)

6. **Steps to reproduce:**
   - What were you doing when issue occurred?

### Where to Get Help

- **Discord Server:** [Join for Support](https://discord.gg/VVVvBTqqyP) (#feedback channel)
- **Documentation:** [FAQ](faq.md)
- **Email:** garshy.gaming@gmail.com
- **Discord DM:** @gashicha

---

**Next:** Check [FAQ](faq.md) for frequently asked questions.
