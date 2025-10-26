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
   - Solution: Contact admin to open: `/rankedarena open`

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
   /rankedarena arena list
   ```
   If no arenas: `/rankedarena arena set main_arena`

2. **Check arena world loaded:**
   - Arena dimension must be loaded
   - Try teleporting manually: `/rankedarena arena tp arena_name`

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
   - Report bug on GitHub if persistent

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
  /rankedarena flee reset PlayerName
  ```

---

## Configuration Issues

### Config not reloading

**Symptoms:**
- Changed `config.json5`
- Ran `/rankedarena reload`
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
   /rankedarena reload
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

### Language not changing

**Symptoms:**
- Changed language in config
- Still shows English

**Solutions:**

1. **Check language code:**
   ```json5
   {
     "language": "ja-Jp"  // Must match file name exactly
   }
   ```
   Available: `en-Us`, `ja-Jp`, `pt-Br`, `ru-Ru`

2. **Check file exists:**
   ```bash
   ls config/cobbleranked/language/
   ```
   Should see `ja-Jp.json5`

3. **Reload config:**
   ```bash
   /rankedarena reload
   ```

4. **Check console:**
   ```bash
   grep -i "language" logs/latest.log
   ```
   Should see: "Message configurations for language ja-Jp loaded successfully!"

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
   /rankedarena reload
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
   - Permission commands require LuckPerms/PermissionsEx

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
   /rankedarena reload
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

- **GitHub Issues:** [Report a Bug](https://github.com/gqrshy/CobbleRanked/issues)
- **Documentation:** [FAQ](faq.md)
- **Email:** garshy.gaming@gmail.com
- **Discord:** @gashicha

---

**Next:** Check [FAQ](faq.md) for frequently asked questions.
