# Migration Guide

Update CobbleRanked to the latest version.

## Before Migrating

### 1. Backup Everything

```bash
# Config folder
cp -r config/cobbleranked config/cobbleranked.backup

# SQLite database
cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup

# MySQL database
mysqldump -u ranked -p cobbleranked > cobbleranked_backup.sql
```

### 2. Stop Server

```bash
/stop
```

## Migration Steps

### 1. Update Mod File

```bash
# Remove old version
rm mods/CobbleRanked-*.jar

# Add new version
cp CobbleRanked-1.0.0.jar mods/
```

### 2. Start Server

CobbleRanked automatically:
- Migrates database schema
- Converts old configs to JSON5
- Creates missing config files

### 3. Verify Migration

```bash
# Check logs for errors
tail -n 100 logs/latest.log | grep CobbleRanked

# Test in-game
/ranked
```

## Version-Specific Changes

### Migrating to 1.0.0+

**Database:**
- Automatic migration from single Elo to format-specific stats
- Old `player_ranked_stats` table → `format_stats` table

**Config:**
- YAML removed, JSON5 only
- New files: `restrictions.json5`, `inventory.json5`

**What to do:**
1. Update mod file
2. Start server (auto-migrates)
3. Check `/ranked` GUI works
4. Verify player stats preserved

### Cross-Server Setup (Fresh Install)

If adding cross-server mode:

1. Install MySQL/MongoDB
2. Install Redis
3. Configure all servers:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // or "battle", "lobby"
    "battle_server": "battle"  // or "" for battle server
  }
}
```

See [Cross-Server Setup](../advanced/cross-server.md)

## Troubleshooting

**Migration fails:**
- Check logs: `logs/latest.log`
- Restore backup and try again
- Report issue on Discord with log snippet

**Player stats lost:**
- Verify backup database exists
- Check `format_stats` table in database
- Use backup to restore if needed

**Configs not converting:**
- Delete `config/cobbleranked/` (after backup!)
- Restart server to regenerate defaults
- Re-apply custom settings

**Cross-server not working:**
- Verify MySQL/Redis running
- Check all servers have same database config
- Test connection: `redis-cli ping`

## Rollback (If Needed)

```bash
# Stop server
/stop

# Restore old mod
rm mods/CobbleRanked-*.jar
cp backup/CobbleRanked-old.jar mods/

# Restore configs
rm -rf config/cobbleranked
cp -r config/cobbleranked.backup config/cobbleranked

# Restore database (SQLite)
cp config/cobbleranked/ranked.db.backup config/cobbleranked/ranked.db

# Restore database (MySQL)
mysql -u ranked -p cobbleranked < cobbleranked_backup.sql

# Start server
```

## Getting Help

**Before asking:**
1. Check logs for error messages
2. Verify backup was made
3. Try clean install on test server

**Where to ask:**
- [Discord](https://discord.gg/cobbleranked) - #support channel
- [GitHub Issues](https://github.com/gqrshy/cobbleranked/issues)
