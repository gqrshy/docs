---
title: Troubleshooting
description: Solutions for common CobbleRanked issues.
---

Solutions for common issues with CobbleRanked.

## Installation Issues

### Mod not loading

**Symptoms:** No CobbleRanked in logs, commands don't work

**Solutions:**
1. Check all dependencies are installed (GashiLibs, MailLib)
2. Verify Minecraft version is 1.21.1
3. Check for JAR file conflicts
4. Review `logs/latest.log` for errors

### Config not generating

**Symptoms:** No `config/cobbleranked/` folder

**Solutions:**
1. Let server fully start once
2. Check write permissions on config folder
3. Verify no errors in startup logs

## Battle Issues

### "No arenas available"

**Symptoms:** Can't start battles, error message appears

**Solutions:**
1. Set up at least one arena:
   ```
   /rankedadmin setArena arena1 pos1
   /rankedadmin setArena arena1 pos2
   ```
2. Check `arenas.yaml` syntax
3. Run `/rankedadmin arena status`

### Queue not finding matches

**Symptoms:** Long wait times, no matches

**Solutions:**
1. Ensure players are in same format queue
2. Check ELO range settings in config
3. Verify multiple arenas are available
4. For cross-server: check Redis connection

### Battle camera stuck

**Symptoms:** Camera won't disable, stuck in air

**Solutions:**
1. Run `/battlecamera toggle`
2. Disconnect and reconnect
3. Admin can teleport player if needed

## Database Issues

### SQLite errors

**Symptoms:** Data not saving, crashes

**Solutions:**
1. Check file permissions on `cobbleranked.db`
2. Ensure disk space available
3. Delete corrupt DB and restart (data loss)

### MySQL connection failed

**Symptoms:** "Connection refused" or "Access denied"

**Solutions:**
1. Verify MySQL is running
2. Check host/port/credentials
3. Test connection manually:
   ```bash
   mysql -h localhost -u cobbleranked -p cobbleranked
   ```
4. Check user has proper permissions

## Cross-Server Issues

### Redis not connecting

**Symptoms:** Queue not syncing across servers

**Solutions:**
1. Verify Redis is running:
   ```bash
   redis-cli PING
   ```
2. Check Redis host/port in config
3. Check firewall rules
4. Verify password if set

### Players not transferring

**Symptoms:** Match found but players don't move

**Solutions:**
1. Check Velocity server names match config
2. Verify battle server is online
3. Check `battleServer` config value
4. Review Velocity logs

## Performance Issues

### Lag during battles

**Symptoms:** Stuttering, delays

**Solutions:**
1. Reduce battle camera speed
2. Check server TPS
3. Verify database connection stable
4. Reduce concurrent battle limit

### Leaderboard slow

**Symptoms:** Long load times for rankings

**Solutions:**
1. Leaderboard is cached automatically
2. Check database performance
3. Consider MySQL for large player bases

## Getting Help

If issues persist:

1. Collect `logs/latest.log`
2. Export config files
3. Note steps to reproduce
4. Ask in [Discord](https://discord.gg/VVVvBTqqyP) #feedback
