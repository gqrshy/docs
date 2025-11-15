# Migration Guide

Learn how to migrate from older CobbleRanked versions to the latest release.

## Overview

This guide covers migrating between major CobbleRanked versions:
- **YAML to JSON5** - Configuration format change (v2.0+)
- **Database schema updates** - Automatic migrations
- **Cross-server setup** - New features in v2.1+
- **Multi-format system** - Singles/Doubles separation (v2.2+)

**Always backup before migrating!**

---

## Migration Checklist

### Pre-Migration Steps

**1. Backup everything:**
```bash
# Backup config folder
cp -r config/cobbleranked config/cobbleranked.backup

# Backup database (SQLite)
cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup

# Backup database (MySQL)
mysqldump -u cobbleranked -p cobbleranked > cobbleranked_backup.sql
```

**2. Check current version:**
```bash
/rankedadmin version
```

**3. Review update notes:**
- Check Discord announcements for breaking changes
- Note deprecated features
- Review new configuration options

**4. Stop server:**
```bash
/stop
```

### Migration Steps

**1. Update mod file:**
```bash
# Remove old version
rm mods/CobbleRanked-v2.0.jar

# Add new version
# Download from GitHub and place in mods/
```

**2. Start server:**
- CobbleRanked automatically detects old configs
- Migration runs on first startup
- Check console for migration messages

**3. Verify migration:**
```bash
# Check config files exist
ls config/cobbleranked/*.json5

# Verify database
/rankedadmin database info

# Test player stats
/stats YourName
```

**4. Test functionality:**
- Join queue
- Start battle
- Check leaderboard
- View rewards
- Test admin commands

**5. Delete old files (after verification):**
```bash
# Only after confirming new configs work!
rm config/cobbleranked/*.yml
rm config/cobbleranked.backup -rf
```

---

## Version-Specific Migrations

### v1.x → v2.0 (YAML to JSON5)

**Major changes:**
- Configuration format changed from YAML to JSON5
- GUI files split into separate files
- New reward system structure

#### Automatic Migration

CobbleRanked **automatically converts** YAML configs to JSON5 on first v2.0 startup.

**Console output:**
```
[CobbleRanked] Detected legacy YAML configuration
[CobbleRanked] Migrating config.yml → config.json5
[CobbleRanked] Migrating blacklist.yml → blacklist.json5
[CobbleRanked] Migrating rewards.yml → rewards.json5
[CobbleRanked] Migration complete!
[CobbleRanked] Old YAML files preserved as .yml.backup
```

**What's migrated:**
- All config values
- Blacklist entries
- Reward configurations
- Arena definitions
- Language files

**Manual cleanup:**
```bash
# After verifying configs work
cd config/cobbleranked
rm *.yml.backup
```

#### Manual Migration (if automatic fails)

**1. Convert config.yml:**

**Old (YAML):**
```yaml
ranked_match:
  reset_days: 30
  levelMatch: 70
  maxTurns: 100
```

**New (JSON5):**
```json5
{
  "ranked_match": {
    "reset_days": 30,
    "levelMatch": 70,
    "maxTurns": 100
  }
}
```

**2. Convert blacklist.yml:**

**Old (YAML):**
```yaml
blacklist:
  pokemon:
    - Mewtwo
    - Rayquaza
  moves:
    - Fissure
```

**New (JSON5):**
```json5
{
  "blacklist": {
    "pokemon": ["Mewtwo", "Rayquaza"],
    "moves": ["Fissure"]
  }
}
```

**3. Convert rewards.yml:**

**Old (YAML):**
```yaml
season_rewards:
  rank_1:
    rank_range: "1"
    commands:
      - "give {player} minecraft:diamond 64"
```

**New (JSON5):**
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "commands": ["give {player} minecraft:diamond 64"]
      }
    }
  }
}
```

**Key differences:**
- YAML uses `:` and indentation
- JSON5 uses `{}` and `,`
- JSON5 allows comments (`//` or `/* */`)
- JSON5 requires quotes around strings

---

### v2.0 → v2.1 (Cross-Server Support)

**Major changes:**
- Added MySQL and Redis support
- New `cross_server` configuration section
- Season management centralized on battle server

#### Migration Steps

**1. Add cross-server config:**

Edit `config/cobbleranked/config.json5`:

```json5
{
  // ... existing config ...

  "cross_server": {
    "enabled": false,  // Set to true when ready
    "server_id": "lobby1",
    "battle_server": "battle1",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**2. Migrate SQLite to MySQL (optional):**

```bash
# After MySQL is configured
/rankedadmin database migrate sqlite mysql
```

**Console output:**
```
[CobbleRanked] Starting SQLite → MySQL migration
[CobbleRanked] Migrating player stats... 150 players
[CobbleRanked] Migrating seasons... 5 seasons
[CobbleRanked] Migration complete!
[CobbleRanked] Old SQLite database preserved at ranked.db.backup
```

**3. Enable cross-server mode:**

```json5
{
  "cross_server": {
    "enabled": true  // Changed from false
  }
}
```

**4. Reload:**
```bash
/rankedadmin reload
```

See [Cross-Server Setup](../advanced/cross-server.md) for detailed guide.

---

### v2.1 → v2.2 (Multi-Format System)

**Major changes:**
- Separate Elo for Singles and Doubles
- New `format_stats` database table
- Format-specific leaderboards and rewards

#### Automatic Migration

Database automatically creates `format_stats` table on first v2.2 startup.

**Console output:**
```
[CobbleRanked] Detected v2.1 database schema
[CobbleRanked] Creating format_stats table
[CobbleRanked] Migrating player_ranked_stats → format_stats
[CobbleRanked] Copying 150 players to Singles format
[CobbleRanked] Migration complete!
```

**What happens:**
- Old stats copied to Singles format
- Doubles starts fresh (1000 Elo)
- Legacy table preserved for rollback

#### Update Rewards Config

**Old (v2.1):**
```json5
{
  "season_rewards": {
    "rank_1": {
      "rank_range": "1",
      "commands": ["give {player} minecraft:diamond 64"]
    }
  }
}
```

**New (v2.2):**
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "commands": ["give {player} minecraft:diamond 64"]
      }
    },
    "doubles": {
      "rank_1": {
        "rank_range": "1",
        "commands": ["give {player} minecraft:diamond 64"]
      }
    }
  }
}
```

**Migration script:**

Run this command to auto-migrate rewards config:

```bash
/rankedadmin migrate rewards
```

**Manual migration:**
1. Add `"singles": {` wrapper around existing rewards
2. Copy entire section as `"doubles": {`
3. Adjust rewards as desired

---

## Database Migrations

### SQLite to MySQL

**Use case:** Moving from single-server to cross-server

**Requirements:**
- MySQL server installed and configured
- MySQL credentials in `config.json5`
- `cross_server.enabled: true`

**Steps:**

**1. Configure MySQL in config:**
```json5
{
  "cross_server": {
    "enabled": true,
    "mysql": {
      "host": "192.168.1.100",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password"
    }
  }
}
```

**2. Test MySQL connection:**
```bash
mysql -h 192.168.1.100 -u cobbleranked -p cobbleranked
```

**3. Run migration:**
```bash
/rankedadmin database migrate sqlite mysql
```

**4. Verify data:**
```bash
# Check player count
/rankedadmin database stats

# Check individual stats
/stats PlayerName
```

**What's migrated:**
- All player stats (Elo, wins, losses)
- Format-specific stats (Singles, Doubles)
- Season data
- Reward collection flags

**Backup created:**
- SQLite file renamed to `ranked.db.backup`
- Can rollback if needed

### MySQL to SQLite

**Use case:** Downgrading from cross-server to single-server

**Steps:**

**1. Run migration:**
```bash
/rankedadmin database migrate mysql sqlite
```

**2. Disable cross-server mode:**
```json5
{
  "cross_server": {
    "enabled": false
  }
}
```

**3. Reload:**
```bash
/rankedadmin reload
```

**Warning:** Only migrates data from MySQL to local SQLite. Other servers' queues won't be accessible.

---

## Configuration Migrations

### Elo System Updates

**v2.0+ introduced Pokemon Showdown Elo system.**

**Old (Legacy):**
```json5
{
  "eloSystem": {
    "mode": "LEGACY",
    "legacy": {
      "minGain": 10,
      "maxGain": 25,
      "minLose": 10,
      "maxLose": 25
    }
  }
}
```

**New (Pokemon Showdown):**
```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,
      "kFactor": 32,
      "provisionalMatches": 10,
      "provisionalKFactor": 64,
      "decay": {
        "enabled": true,
        "slowDecayThreshold": 1500
      }
    }
  }
}
```

**Migration:**
- Existing Elo ratings are preserved
- K-factor automatically applied to new matches
- Provisional status calculated from match count

**Recommendation:** Switch to `POKEMON_SHOWDOWN` for competitive balance.

### Blacklist Format Changes

**v2.0+ uses JSON5 format.**

**Old (YAML):**
```yaml
blacklist:
  pokemon:
    - Mewtwo
    - Rayquaza
  moves:
    - Fissure
  abilities:
    - Moody
  items:
    - Soul Dew
```

**New (JSON5):**
```json5
{
  "blacklist": {
    "pokemon": ["Mewtwo", "Rayquaza"],
    "moves": ["Fissure"],
    "abilities": ["Moody"],
    "items": ["Soul Dew"]
  }
}
```

**Migration:** Automatically handled by v2.0+ startup script.

### Reward System Changes

**v2.2+ requires format separation.**

**Old (v2.1):**
```json5
{
  "milestone_rewards": {
    "wins_10": {
      "type": "WINS",
      "requirement": 10,
      "commands": ["give {player} minecraft:gold_ingot 10"]
    }
  }
}
```

**New (v2.2):**
```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "commands": ["give {player} minecraft:gold_ingot 10"]
      }
    },
    "doubles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "commands": ["give {player} minecraft:gold_ingot 10"]
      }
    }
  }
}
```

**Migration:** Run `/rankedadmin migrate rewards` to auto-convert.

---

## Rollback Procedures

### Rolling Back to Previous Version

**If migration fails or causes issues:**

**1. Stop server:**
```bash
/stop
```

**2. Restore backups:**
```bash
# Restore configs
rm -rf config/cobbleranked
cp -r config/cobbleranked.backup config/cobbleranked

# Restore database (SQLite)
rm config/cobbleranked/ranked.db
cp config/cobbleranked/ranked.db.backup config/cobbleranked/ranked.db

# Restore database (MySQL)
mysql -u cobbleranked -p cobbleranked < cobbleranked_backup.sql
```

**3. Downgrade mod:**
```bash
# Remove new version
rm mods/CobbleRanked-v2.2.jar

# Restore old version
# Download previous version from GitHub releases
```

**4. Start server:**
```bash
# Server should start with old version and configs
```

### Partial Rollback (Keep Data)

**If you want to downgrade but keep player data:**

**1. Export player stats:**
```bash
/rankedadmin database export players.json
```

**2. Downgrade mod (as above)**

**3. Import player stats:**
```bash
/rankedadmin database import players.json
```

**Note:** Only works if database schema is compatible.

---

## Troubleshooting Migrations

### Migration failed: Parse error

**Symptoms:** Config files not loading after migration

**Cause:** JSON5 syntax error in migrated file

**Solution:**
1. Check console for specific error line
2. Validate JSON5 syntax: https://json5.org/
3. Common issues:
   - Missing closing brace `}`
   - Unclosed quotes `"`
   - Invalid escape characters

**Quick fix:**
```bash
# Restore original YAML
cp config/cobbleranked/*.yml.backup config/cobbleranked/

# Manually convert to JSON5 (see examples above)
```

### Migration failed: Database locked

**Symptoms:** SQLite database locked during migration

**Cause:** Server still running or file in use

**Solution:**
1. Stop server completely: `/stop`
2. Verify no processes using database: `lsof ranked.db`
3. Kill processes if needed
4. Restart server

### Player data missing after migration

**Symptoms:** Some players' stats not migrated

**Cause:** Corrupted database entries or schema mismatch

**Solution:**
1. Check backup exists: `ls config/cobbleranked/*.backup`
2. Restore backup (see Rollback section)
3. Run migration again
4. If still failing, manually migrate:

```bash
# Export from old database
/rankedadmin database export players.json

# Import to new database
/rankedadmin database import players.json
```

### Rewards not working after format migration

**Symptoms:** Rewards not appearing or not claimable

**Cause:** Reward config not migrated to format structure

**Solution:**

Run reward migration command:
```bash
/rankedadmin migrate rewards
```

Or manually update `rewards.json5`:

**Before:**
```json5
{
  "season_rewards": {
    "rank_1": { /* ... */ }
  }
}
```

**After:**
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": { /* ... */ }
    },
    "doubles": {
      "rank_1": { /* ... */ }
    }
  }
}
```

### Cross-server migration errors

**Symptoms:** MySQL migration fails, timeout errors

**Cause:** MySQL not configured correctly or network issues

**Solutions:**

**1. Test MySQL connection:**
```bash
mysql -h YOUR_HOST -u cobbleranked -p
```

**2. Check firewall:**
```bash
# Allow MySQL port
sudo ufw allow 3306/tcp
```

**3. Verify credentials:**
- Check `config.json5` has correct host/user/password
- Test connection manually

**4. Check MySQL privileges:**
```sql
SHOW GRANTS FOR 'cobbleranked'@'%';
```

Should show:
```
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%'
```

**5. Increase timeout:**

Edit `config.json5`:
```json5
{
  "cross_server": {
    "mysql": {
      "connectionTimeout": 30000  // 30 seconds
    }
  }
}
```

---

## Best Practices

### Before Migration

**1. Review update notes thoroughly**
- Check Discord announcements
- Note breaking changes
- Review new features

**2. Test on development server**
- Copy production server
- Test migration
- Verify functionality
- Check for errors

**3. Backup everything**
- Config files
- Database files
- Plugin jar
- Server logs

**4. Schedule downtime**
- Announce to players
- Plan for 30-60 minutes
- Have rollback plan ready

### During Migration

**1. Monitor console output**
- Watch for errors
- Note warnings
- Check migration progress

**2. Don't interrupt migration**
- Let it complete fully
- Don't stop server mid-migration
- Database corruption risk

**3. Verify each step**
- Check files created
- Test database connection
- Verify configs loaded

### After Migration

**1. Test thoroughly**
- Join queue
- Battle
- Check stats
- View leaderboard
- Claim rewards

**2. Check logs**
- Review server.log
- Look for errors
- Check plugin warnings

**3. Monitor performance**
- Watch TPS
- Check memory usage
- Monitor database queries

**4. Keep backups**
- Don't delete immediately
- Keep for at least 1 week
- Verify new version stable

---

## Version Compatibility

### Cobblemon Version

| CobbleRanked | Cobblemon | Minecraft |
|--------------|-----------|-----------|
| v2.2+ | 1.7.0+ | 1.21.1 |
| v2.0-2.1 | 1.6.0+ | 1.21.1 |
| v1.x | 1.5.0+ | 1.20.1 |

**Always match versions!** Incompatible versions cause crashes.

### Database Compatibility

| Version | SQLite | MySQL | Redis |
|---------|--------|-------|-------|
| v2.2+ | ✅ | ✅ | ✅ |
| v2.1 | ✅ | ✅ | ✅ |
| v2.0 | ✅ | ❌ | ❌ |
| v1.x | ✅ | ❌ | ❌ |

**Cross-server requires MySQL + Redis.**

---

## Frequently Asked Questions

### Do I need to migrate?

**Only if updating to new major version with breaking changes.**

**Minor updates** typically don't require migration.

### Will I lose player data?

**No!** Migration preserves all player data:
- Elo ratings
- Win/loss records
- Reward claims
- Season history

**Always backup** just in case.

### Can I skip versions?

**Not recommended.** Migrate sequentially:

**Example:** v1.5 → v2.2
1. Migrate v1.5 → v2.0
2. Test and verify
3. Migrate v2.0 → v2.1
4. Test and verify
5. Migrate v2.1 → v2.2

**Skipping versions may cause errors.**

### How long does migration take?

**Depends on player count:**

| Players | SQLite | MySQL |
|---------|--------|-------|
| < 100 | 1-5 sec | 5-10 sec |
| 100-1000 | 5-30 sec | 30-60 sec |
| 1000+ | 30-120 sec | 1-5 min |

**Don't interrupt!**

### Can I undo migration?

**Yes!** Follow rollback procedures (see Rollback section).

**Requirements:**
- Have backups
- Downgrade mod version
- Restore config and database

---

**Next:** Learn about [Cross-Server Setup](../advanced/cross-server.md) for multi-server configurations.
