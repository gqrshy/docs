# Troubleshooting

Common issues and their solutions for CobbleRanked. Click on any issue below to expand the solution.

---

## Installation Issues

<details>
<summary><strong>Mod not loading</strong></summary>

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

4. **Verify Minecraft version:**
   - CobbleRanked requires Minecraft 1.21.1
   - Check `server.properties` for correct version

</details>

<details>
<summary><strong>Configuration files not generating</strong></summary>

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

</details>

<details>
<summary><strong>Music errors (Cobblemon 1.6.x)</strong></summary>

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

   ```log
   [MusicUtil] Detected Cobblemon V1_6_X - Custom music DISABLED (not supported in 1.6.x)
   ```

3. **To enable custom music:**
   - Upgrade to **Cobblemon 1.7.0+**
   - All other features work identically between versions

**What still works on 1.6.x:**

- Ranked battles
- Matchmaking and Elo
- All GUIs and commands
- Cross-server support
- Custom background music (disabled)

</details>

---

## Queue & Matchmaking Issues

<details>
<summary><strong>Can't join queue</strong></summary>

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

</details>

<details>
<summary><strong>Queue taking forever</strong></summary>

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

</details>

<details>
<summary><strong>Match found but battle doesn't start</strong></summary>

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

</details>

---

## Battle Issues

<details>
<summary><strong>Battle not starting after teleport</strong></summary>

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

</details>

<details>
<summary><strong>Elo not updating after battle</strong></summary>

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

</details>

<details>
<summary><strong>Disconnect during battle</strong></summary>

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

</details>

---

## Configuration Issues

<details>
<summary><strong>Config not reloading</strong></summary>

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

</details>

<details>
<summary><strong>Blacklist not working</strong></summary>

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

</details>

<details>
<summary><strong>Language not loading</strong></summary>

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

</details>

<details>
<summary><strong>Missing language messages</strong></summary>

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

</details>

<details>
<summary><strong>Placeholders not replacing</strong></summary>

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

</details>

<details>
<summary><strong>Color codes not working</strong></summary>

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

</details>

---

## Reward Issues

<details>
<summary><strong>Rewards not appearing in GUI</strong></summary>

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

</details>

<details>
<summary><strong>Reward commands not executing</strong></summary>

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

</details>

---

## Cross-Server Issues

<details>
<summary><strong>Players can't see each other across servers</strong></summary>

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

</details>

<details>
<summary><strong>Multiple battle servers detected</strong></summary>

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

</details>

---

## Performance Issues

<details>
<summary><strong>Server lag during battles</strong></summary>

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

</details>

<details>
<summary><strong>Database growing too large</strong></summary>

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

</details>

---

## GUI Issues

<details>
<summary><strong>GUI not opening</strong></summary>

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

</details>

<details>
<summary><strong>GUI items not rendering</strong></summary>

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

</details>

---

## LuckPerms Integration Issues

<details>
<summary><strong>Rank tags not showing in chat</strong></summary>

**Symptoms:**

- Players have ranks but tags don't appear in chat

**Solutions:**

1. **Check if LuckPerms is loaded:**

   ```bash
   /lp info
   ```

   If this command doesn't work, LuckPerms isn't installed correctly.

2. **Verify CobbleRanked detects LuckPerms:**
   Check server logs for:

   ```log
   [CobbleRanked] LuckPerms integration enabled (mod version)
   ```

   or

   ```log
   [CobbleRanked] LuckPerms integration enabled (Bukkit plugin version)
   ```

3. **Check sync mode:**
   Make sure `syncMode` in `config/cobbleranked/luckperms.json5` is set to `"suffix"`, `"prefix"`, or `"all"` (not `"group"`).

4. **Install a chat formatting plugin:**
   LuckPerms doesn't format chat by default. Install one of these:
   - **Fabric:** [Styled Chat](https://modrinth.com/mod/styled-chat)
   - **Bukkit/Arclight:** [LuckPerms default](https://luckperms.net/wiki/Prefixes,-Suffixes-&-Meta) or [EssentialsX Chat](https://essentialsx.net/)

5. **Check player's actual LuckPerms data:**

   ```bash
   /lp user <playername> info
   ```

   Look for the prefix/suffix under "Meta". If it's not there, CobbleRanked hasn't synced yet.

6. **Force a rank update:**

   ```bash
   /rankedadmin reload
   ```

   Then have the player win a ranked battle.

</details>

<details>
<summary><strong>Unicode symbols showing as boxes/question marks</strong></summary>

**Symptoms:**

- Custom Unicode symbols display as � or ▯

**Solutions:**

1. **Ensure proper file encoding:**
   - Save `config/cobbleranked/luckperms.json5` with UTF-8 encoding (not ANSI)
   - Use a proper text editor (VS Code, Notepad++, Sublime Text)

2. **Test with simple Unicode first:**

   ```json5
   "suffix": " ★"  // Basic star symbol
   ```

   If this doesn't work, your client doesn't support Unicode.

3. **For custom resource pack symbols:**
   - Verify players have the resource pack enabled
   - Check `server.properties` resource pack URL
   - Ensure resource pack uses correct Unicode mappings

4. **Client compatibility:**
   - Minecraft Java Edition supports all Unicode
   - Bedrock Edition (via Geyser) may have issues with some symbols

</details>

<details>
<summary><strong>Ranks not updating after battles</strong></summary>

**Symptoms:**

- Player wins battles but rank tag doesn't change

**Solutions:**

1. **Verify player actually changed rank tiers:**
   Check their Elo with `/ranked` - you need to cross tier thresholds (1000, 1500, 2000, etc.)

2. **Check server logs for errors:**
   Look for LuckPerms-related errors:

   ```log
   [ERROR] [CobbleRanked] Failed to sync LuckPerms rank
   ```

3. **Ensure removeOnRankLoss is configured:**

   ```json5
   "removeOnRankLoss": true
   ```

4. **Check LuckPerms permissions:**
   CobbleRanked needs permission to modify user data. Ensure the server's LuckPerms configuration allows this.

5. **Reload configuration:**

   ```bash
   /rankedadmin reload
   ```

   Then have the player win another ranked battle to trigger a rank update.

</details>

<details>
<summary><strong>Multiple rank tags stacking</strong></summary>

**Symptoms:**

- Player has multiple rank tags like `PlayerName [Bronze] [Silver]`

**Solutions:**

1. **Enable automatic removal:**

   ```json5
   "removeOnRankLoss": true
   ```

2. **Manually remove old tags:**

   ```bash
   /lp user <playername> meta clear
   /rankedadmin reload
   ```

3. **Check weight values:**
   Ensure each tier has a unique, increasing weight:

   ```json5
   "BRONZE": { "weight": 100 },
   "SILVER": { "weight": 101 },
   "GOLD": { "weight": 102 }
   ```

4. **Verify you're not manually assigning tags:**
   Don't use `/lp user <player> meta addsuffix` manually - let CobbleRanked manage it automatically.

</details>

---

## Database Issues

<details>
<summary><strong>Database connection failed (MySQL)</strong></summary>

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

</details>

<details>
<summary><strong>Database corrupted (SQLite)</strong></summary>

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

</details>

---

## Casual Missions Issues

<details>
<summary><strong>Missions Not Resetting</strong></summary>

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

</details>

<details>
<summary><strong>Progress Not Tracking</strong></summary>

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

</details>

<details>
<summary><strong>Rewards Not Received</strong></summary>

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

</details>

<details>
<summary><strong>Mission Not Completing</strong></summary>

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

</details>

<details>
<summary><strong>Pending Rewards Not Appearing</strong></summary>

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

</details>

---

## Getting Help

<details>
<summary><strong>Information to Provide</strong></summary>

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

</details>

<details>
<summary><strong>Where to Get Help</strong></summary>

- **Discord Server:** [Join for Support](https://discord.gg/VVVvBTqqyP) (#feedback channel)
- **Documentation:** [FAQ](faq.md)
- **Email:** garshy.gaming@gmail.com
- **Discord DM:** @gashicha

</details>

---

## See Also

- [FAQ](faq.md) - Common questions
- [Installation Guide](../getting-started/installation.md) - Setup instructions
- [Commands Reference](../getting-started/commands.md) - All commands
