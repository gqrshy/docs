# Troubleshooting

Solutions for common CobbleRanked issues.

---

## Installation Issues

<details>
<summary><strong>Mod not loading</strong></summary>

**Symptoms:**
- CobbleRanked doesn't appear in mod list
- No config files generated

**Solutions:**

1. **Check Fabric Loader version:**
   - Required: 0.17.2+
   - Update Fabric Loader if needed

2. **Verify dependencies:**
   - Fabric API
   - Fabric Language Kotlin
   - Cobblemon

3. **Check server log:**
   ```bash
   grep -i "cobbleranked" logs/latest.log
   grep -i "error" logs/latest.log
   ```

4. **Verify JAR file:**
   - Correct filename (no duplicates)
   - Not corrupted (re-download)

</details>

<details>
<summary><strong>Config files not generating</strong></summary>

**Symptoms:**
- No `config/cobbleranked/` folder

**Solutions:**

1. **Check permissions:**
   ```bash
   ls -la config/
   chmod 755 config/
   ```

2. **Check disk space:**
   ```bash
   df -h
   ```

3. **Check for errors:**
   ```bash
   grep -i "config" logs/latest.log
   ```

</details>

---

## Configuration Issues

<details>
<summary><strong>YAML syntax error</strong></summary>

**Symptoms:**
- Server uses default values
- Error in console about parsing

**Solutions:**

1. **Validate YAML syntax:**
   - Use online YAML validator
   - Check indentation (2 spaces, no tabs)
   - Check for special characters

2. **Common mistakes:**
   ```yaml
   # Wrong
   key:value

   # Correct
   key: value
   ```

3. **Reset config:**
   - Delete problematic file
   - Restart server
   - New default file generated

</details>

<details>
<summary><strong>Changes not applying</strong></summary>

**Symptoms:**
- Edited config but no effect

**Solutions:**

1. **Reload configuration:**
   ```bash
   /rankedadmin reload
   ```

2. **Check correct file:**
   - Editing the right YAML file?
   - Correct directory?

3. **Restart server:**
   - Some changes require restart

</details>

---

## Queue Issues

<details>
<summary><strong>Cannot join queue</strong></summary>

**Symptoms:**
- Error message when trying to queue
- Queue button doesn't work

**Solutions:**

1. **Check team requirements:**
   - Minimum Pokemon count
   - No fainted Pokemon
   - No banned Pokemon/moves

2. **Check flee penalty:**
   - May be banned from disconnecting
   - Wait for ban to expire

3. **Check season:**
   - Is there an active season?
   - Check `season.yaml`

4. **Check format enabled:**
   - Is format in `enabledFormats`?

</details>

<details>
<summary><strong>Long queue times</strong></summary>

**Symptoms:**
- Waiting very long for match

**Solutions:**

1. **Check player count:**
   - Need other players online
   - Check if anyone else queuing

2. **Widen Elo range:**
   ```yaml
   # matchmaking.yaml
   formatRules:
     SINGLES:
       initialRange: 300     # Increase
       maxMultiplier: 5.0    # Increase
   ```

3. **Disable Elo matching:**
   ```yaml
   formatRules:
     SINGLES:
       enforceEloRange: false
   ```

</details>

---

## Battle Issues

<details>
<summary><strong>Battle doesn't start</strong></summary>

**Symptoms:**
- Players matched but battle never begins
- Stuck in countdown

**Solutions:**

1. **Check arena setup:**
   ```bash
   /rankedadmin arena status
   ```
   - Are arenas configured?
   - Are arenas enabled?

2. **Reset arena status:**
   ```bash
   /rankedadmin arena reset
   ```

3. **Check Cobblemon:**
   - Is Cobblemon working normally?
   - Can normal battles start?

</details>

<details>
<summary><strong>Players not teleporting</strong></summary>

**Symptoms:**
- Match found but no teleport
- Players stay in place

**Solutions:**

1. **Check arena positions:**
   ```bash
   /rankedadmin teleportArena <name>
   ```
   - Verify positions exist
   - Check world is correct

2. **Check restrictions:**
   - `blockTeleport` should be false in queue restrictions

3. **Check world dimension:**
   ```yaml
   # arenas.yaml
   world: "minecraft:overworld"  # Correct dimension?
   ```

</details>

<details>
<summary><strong>Players stuck in arena</strong></summary>

**Symptoms:**
- Battle ends but players don't return

**Solutions:**

1. **Check exit position:**
   ```bash
   /rankedadmin setArena <name> exit
   ```

2. **Set global exit:**
   ```bash
   /rankedadmin setexit
   ```

3. **Reset arena:**
   ```bash
   /rankedadmin arena reset
   ```

4. **Manual teleport:**
   ```bash
   /tp <player> <x> <y> <z>
   ```

</details>

---

## Database Issues

<details>
<summary><strong>Database connection failed</strong></summary>

**Symptoms:**
- Error in console about database
- Data not saving

**Solutions:**

1. **Check database running:**
   ```bash
   # MySQL
   systemctl status mysql

   # MongoDB
   systemctl status mongod
   ```

2. **Verify credentials:**
   - Check username/password
   - Test connection manually

3. **Check network:**
   - Firewall rules
   - Port accessibility

4. **Check config:**
   ```yaml
   database:
     type: "mysql"
     mysql:
       host: "localhost"  # Correct host?
       port: 3306         # Correct port?
   ```

</details>

<details>
<summary><strong>Data not syncing (cross-server)</strong></summary>

**Symptoms:**
- Different stats on different servers

**Solutions:**

1. **Verify same database:**
   - All servers using same connection string?
   - Same database name?

2. **Check Redis:**
   - Redis running?
   - Same Redis on all servers?

3. **Reload all servers:**
   ```bash
   /rankedadmin reload
   ```

</details>

---

## Performance Issues

<details>
<summary><strong>Server lag during matches</strong></summary>

**Symptoms:**
- TPS drops during battles
- Slow response

**Solutions:**

1. **Check server resources:**
   - CPU usage
   - Memory usage
   - Disk I/O

2. **Reduce concurrent matches:**
   - Limit arena count

3. **Database optimization:**
   - Use MySQL instead of SQLite for large servers
   - Increase connection pool

4. **Disable debug:**
   ```yaml
   # config.yaml
   debug:
     enabled: false
   ```

</details>

---

## Still Need Help?

If none of these solutions work:

1. **Check server log:**
   - Full error message
   - Stack trace

2. **Join Discord:**
   - [Discord](https://discord.gg/VVVvBTqqyP)
   - #feedback channel

3. **Provide information:**
   - CobbleRanked version
   - Cobblemon version
   - Minecraft version
   - Full error log

---

## See Also

- [FAQ](faq.md) - Common questions
- [Installation](../getting-started/installation.md) - Setup guide
- [Discord](https://discord.gg/VVVvBTqqyP) - Community support
