# Frequently Asked Questions

Common questions and answers about CobbleRanked.

## General Questions

### What is CobbleRanked?

CobbleRanked is a competitive ranked battle system for Minecraft servers running Cobblemon. It provides:
- Elo-based matchmaking
- Multiple battle formats (Singles, Doubles, Multi)
- Seasonal leaderboards
- Customizable Pokemon/move/ability restrictions
- Cross-server support

### Is CobbleRanked compatible with my server?

**Requirements:**
- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.7.0+
- Fabric API 0.116.6+

If your server meets these requirements, CobbleRanked will work!

### Can I use CobbleRanked with other mods?

Yes! CobbleRanked is compatible with most Fabric mods. Tested with:
- Cobblemon addons (Cobbledex, Cobblepedia)
- WorldGuard/GriefPrevention (for arena protection)
- Economy mods (for reward commands)
- Permission mods (LuckPerms, PermissionsEx)

### Is cross-server support required?

No! CobbleRanked works in two modes:
- **Single-server:** Uses SQLite, no additional setup
- **Cross-server:** Uses MySQL + Redis, requires configuration

Most servers use single-server mode.

## Installation & Setup

### Where do I download CobbleRanked?

Download from:
- GitHub Releases (recommended)
- Modrinth
- CurseForge

Always download from official sources!

### How do I install CobbleRanked?

1. Download the JAR file
2. Place in `mods/` folder
3. Ensure dependencies are installed
4. Start server (configs auto-generate)

See [Installation Guide](../getting-started/installation.md) for details.

### Configuration files not generating?

**Solution:**
1. Verify CobbleRanked is in `mods/` folder
2. Check `logs/latest.log` for errors
3. Ensure Fabric Loader is installed correctly
4. Remove conflicting mods (if any)

### How do I update CobbleRanked?

1. **Backup:** Copy `config/cobbleranked/` folder
2. **Stop server**
3. **Replace JAR:** Delete old version, add new version to `mods/`
4. **Start server:** Configs will migrate automatically
5. **Test:** Run `/rankedarena reload`

## Configuration

### Can I ban legendary Pokemon?

Yes! Use the blacklist system:

```json5
{
  "black_list_labels": [
    "legendary",  // Bans all legendaries
    "mythical"    // Bans all mythicals
  ]
}
```

See [Blacklist Configuration](../configuration/blacklist.md).

### How do I change the season length?

Edit `config.json5`:

```json5
{
  "ranked_match": {
    "reset_days": 30  // Change to desired days
  }
}
```

Reload: `/rankedarena reload`

### Can I customize rewards?

Yes! Edit `rewards.json5`:

```json5
{
  "season_rewards": {
    "first_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 64"
      ]
    }
  }
}
```

See [Rewards Configuration](../configuration/rewards.md).

### How do I add multiple languages?

CobbleRanked includes 4 languages:
- English (`en-Us`)
- Japanese (`ja-Jp`)
- Portuguese (`pt-Br`)
- Russian (`ru-Ru`)

Change language in `config.json5`:
```json5
{
  "language": "ja-Jp"  // Change here
}
```

Custom languages: Create new files in `language/` and `gui/` folders.

### Can I disable certain battle formats?

No direct disable, but you can:
1. Hide GUI buttons (edit `gui-*.json5`)
2. Use permissions to restrict access
3. Only promote one format to players

All formats are always available via commands.

## Gameplay

### How does Elo rating work?

Elo is a skill-based rating system:
- Start at 1000 Elo
- Win: Gain Elo (10-30 points default)
- Lose: Lose Elo (10-30 points default)
- Higher Elo = better rank

Two systems available:
- **Legacy:** Random points (10-30)
- **Pokemon Showdown:** K-factor based (recommended)

See [Elo System Guide](../features/elo-system.md).

### Do stats reset each season?

**What resets:**
- Reward collection flags (can claim rewards again)

**What persists:**
- Elo rating
- Win/loss record
- Flee count
- All statistics

This allows long-term progression!

### What happens if I disconnect during a battle?

**Penalties:**
- Flee count +1
- Counts as loss
- Elo penalty applied
- Opponent wins

**Note:** Legitimate crashes are treated the same to prevent abuse. Contact an admin to reset flee count if needed.

### Can I have different Elo for each format?

Yes! Each format has independent:
- Elo rating
- Win/loss record
- Leaderboard ranking

Example:
- Singles: 1200 Elo
- Doubles: 1000 Elo
- Multi: 1100 Elo

### How does matchmaking work?

1. Join queue for a format
2. System searches for opponent with similar Elo (±200 default)
3. Range expands over time if no match found
4. When match found, battle starts

See [Ranked Battles](../features/ranked-battles.md) for details.

### What is flee count?

Flee count tracks disconnects during battles:
- Increases by 1 per disconnect
- Visible in player stats
- Never decreases automatically
- Admin can reset: `/rankedarena flee reset <player>`

Used to identify rage quitters.

## Battles

### My Pokemon is banned but not in the blacklist?

**Possible causes:**

1. **Label-based ban:**
   - Check `black_list_labels` in `blacklist.json5`
   - Example: `"legendary"` bans all legendaries

2. **Move/ability/item ban:**
   - Check `black_list_moves`, `black_list_ability`, `black_list_items_pokemon`
   - Your Pokemon may have a banned move/ability/item

3. **Special format:**
   - Check `special_format` section
   - Examples: Little Cup (first stage only), Shiny Only

4. **Config not reloaded:**
   - Run `/rankedarena reload`

### Battle ends in draw every time?

**Cause:** Turn limit reached

**Solution:** Increase turn limit in `config.json5`:

```json5
{
  "battle": {
    "maxTurns": 200  // Increase from 100
  }
}
```

### Can I use Mega Evolution/Terastallization?

**Default:** Both enabled

**Disable in `config.json5`:**
```json5
{
  "competitive": {
    "allowMegaEvolution": false,  // Disable Mega
    "allowTeraType": false         // Disable Tera
  }
}
```

### Level scaling not working?

**Verify configuration:**
```json5
{
  "battle": {
    "levelMatch": 70,         // Desired level
    "forceLevelCap": true     // Must be true!
  }
}
```

**If still broken:**
1. Check console for errors
2. Test with `/rankedarena reload`
3. Verify Cobblemon version (1.7.0+ required)

## Arenas

### How many arenas should I create?

**Recommendations:**
- **Minimum:** 1 (for testing)
- **Ideal:** 5-10 (variety without overwhelming)
- **Maximum:** No limit (but 20+ is overkill)

### Can arenas be in different dimensions?

Yes! Arenas support:
- Overworld (`minecraft:overworld`)
- Nether (`minecraft:the_nether`)
- End (`minecraft:the_end`)
- Custom dimensions (from mods)

Example:
```
/rankedarena arena set nether_arena
```

### Players spawn in walls/underground?

**Fix:**
1. Stand at correct spawn point
2. Re-create arena: `/rankedarena arena set arena_name`
3. Verify Y coordinate is at ground level

**Prevention:**
- Use flat, even terrain
- Test arena: `/rankedarena arena tp arena_name`

### Arena protection (WorldGuard)?

**Recommended flags:**
```bash
/region flag arena_name build deny           # No breaking/placing
/region flag arena_name pvp deny             # No PvP (not needed for Cobblemon)
/region flag arena_name mob-spawning deny    # No mob spawns
```

See [Arena Configuration](../configuration/arenas.md).

## Cross-Server

### Do I need Redis for cross-server?

**MySQL:** Required (shares player data)
**Redis:** Optional but recommended (real-time queue sync)

Without Redis:
- Players can still battle across servers
- Matchmaking slower (database polling)

### Multiple battle servers allowed?

**No!** Only ONE server should have `battle_server: ""` in config.

**Why:**
- Prevents duplicate season management
- Avoids conflicting matchmaking
- Single source of truth

See [Cross-Server Setup](../advanced/cross-server.md).

### How do I migrate SQLite to MySQL?

Use the migration command:

```bash
/rankedarena database migrate sqlite mysql
```

**Before migration:**
1. Configure MySQL in `config.json5`
2. Test MySQL connection
3. Backup SQLite database: `config/cobbleranked/ranked.db`

### Cross-server not syncing stats?

**Checklist:**
1. ✅ MySQL connection working?
2. ✅ All servers use same MySQL database?
3. ✅ `cross_server.enabled: true` in config?
4. ✅ All servers restarted after config change?

**Test connection:**
```bash
mysql -u username -p -h host database
```

## Rewards

### Rewards not giving items?

**Possible causes:**

1. **Syntax error in commands:**
   ```json5
   "commands": [
     "give %player% minecraft:diamond 64"  // Correct
     // NOT: "give {player} diamond 64"
   ]
   ```

2. **Player already collected:**
   - Rewards only given once per season
   - Check `elosColllect` flag in player stats

3. **Reward disabled:**
   ```json5
   {
     "enabled": true  // Must be true!
   }
   ```

### Can I use custom commands?

Yes! Any server command works:

```json5
{
  "commands": [
    "give %player% minecraft:diamond 64",
    "eco give %player% 1000",                    // Economy
    "lp user %player% permission set vip true",  // Permissions
    "broadcast %player% reached 100 wins!"       // Announcements
  ]
}
```

Use `%player%` placeholder for player name.

### Milestone rewards vs season rewards?

**Season rewards:**
- Given at end of season
- Top 3 players only
- Based on leaderboard position

**Milestone rewards:**
- Given immediately upon achievement
- Any player can earn
- Based on total wins (10, 25, 50, 100)

Both can be configured independently!

## Permissions

### What permissions plugin do I need?

CobbleRanked works with:
- LuckPerms (recommended)
- PermissionsEx
- Any Fabric permissions plugin

**No plugin?** Defaults to OP system.

### How do I give ranked access to all players?

**LuckPerms:**
```bash
/lp group default permission set cobbleranked.* true
```

**PermissionsEx:**
```yaml
groups:
  default:
    permissions:
      - cobbleranked.*
```

### Admin permissions not working?

**Verify OP status:**
```bash
/op YourUsername
```

**Or grant permission:**
```bash
/lp user YourUsername permission set cobbleranked.admin true
```

## Troubleshooting

### "No arenas configured" error?

**Solution:**
```bash
/rankedarena arena set main_arena
```

Must create at least one arena before battles can start.

### Blacklist not blocking Pokemon?

**Checklist:**
1. ✅ Correct spelling in `blacklist.json5`?
2. ✅ Reloaded config: `/rankedarena reload`?
3. ✅ Testing with correct Pokemon/form?
4. ✅ No JSON syntax errors?

**Test:**
1. Ban Mewtwo: `"black_list_pokemon": ["Mewtwo"]`
2. Reload: `/rankedarena reload`
3. Join queue with Mewtwo in party
4. Should see validation error

### Season not rotating automatically?

**Verify settings:**
```json5
{
  "ranked_match": {
    "reset_days": 30  // Must be > 0
  }
}
```

**Check current season:**
```bash
/rankedarena season info
```

**Manual rotation:**
```bash
/rankedarena season rotate
```

### Elo stuck at 1000?

**Possible causes:**

1. **Draw battles:** Turn limit reached, no Elo change
2. **Database error:** Check console logs
3. **Elo system disabled:** Verify `eloSystem.mode` in config

**Test:**
1. Complete a battle with clear win/loss
2. Check `/elo` after battle
3. If unchanged, check console for errors

### GUI not opening?

**Checklist:**
1. ✅ Permission: `cobbleranked.gui`
2. ✅ GUI files exist: `config/cobbleranked/gui/gui-*.json5`
3. ✅ Language setting correct in `config.json5`
4. ✅ No JSON syntax errors in GUI files

**Test:**
```bash
/ranked
```

**If error, check:**
- Console logs
- GUI file syntax

### Leaderboard empty?

**Causes:**
- No battles completed yet
- Database connection error
- Wrong format selected

**Solution:**
1. Complete at least one battle
2. Check `/leaderboard singles` (or doubles/multi)
3. Verify database connection

## Performance

### Does CobbleRanked lag the server?

**Performance impact:** Minimal

- Database queries: Async (non-blocking)
- Matchmaking: O(n) complexity (very fast)
- Battle tracking: Lightweight event listeners

**Typical overhead:** < 1% TPS impact

### How many players can use CobbleRanked?

**Limits:**
- **Queue:** Thousands of players (tested up to 500 concurrent)
- **Database:** Millions of player records (SQLite: 10K+, MySQL: unlimited)
- **Cross-server:** No limit on server count

**Bottlenecks:**
- MySQL connection pool size (configurable)
- Redis throughput (extremely high)

### Database size concerns?

**Typical sizes:**
- 100 players: ~100 KB (SQLite)
- 1,000 players: ~1 MB
- 10,000 players: ~10 MB

**Growth rate:** ~1 KB per player

**Recommendation:** Use MySQL for 1000+ players.

## Migration & Data

### Can I reset all player stats?

**Warning:** This is irreversible!

**SQLite:**
1. Stop server
2. Delete `config/cobbleranked/ranked.db`
3. Start server (new database created)

**MySQL:**
```sql
TRUNCATE TABLE player_ranked_stats;
TRUNCATE TABLE format_stats;
```

### Can I import stats from another system?

Not natively, but possible with custom SQL:

1. Export data from old system
2. Convert to CobbleRanked format
3. Insert into database

Contact support for migration assistance.

### How do I backup player data?

**SQLite:**
- Copy `config/cobbleranked/ranked.db`

**MySQL:**
```bash
mysqldump -u username -p cobbleranked > backup.sql
```

**Recommendation:** Daily automatic backups!

## Getting Help

### Where can I get support?

- **Documentation:** You're reading it!
- **GitHub Issues:** [Report bugs](https://github.com/your-repo/issues)
- **Discord:** [Join community](https://discord.gg/your-invite) (if available)

### How do I report a bug?

**Include:**
1. CobbleRanked version
2. Cobblemon version
3. Steps to reproduce
4. Console logs (`logs/latest.log`)
5. Configuration files (if relevant)

**GitHub:** [Create issue](https://github.com/your-repo/issues)

### Can I request features?

Yes! Use GitHub issues with `[Feature Request]` tag.

**Popular requests:**
- Ranked tournaments
- Team battles (4v4, 6v6)
- Custom rank titles
- Discord integration

---

**Still have questions?** Check [Troubleshooting](troubleshooting.md) or ask in the community!
