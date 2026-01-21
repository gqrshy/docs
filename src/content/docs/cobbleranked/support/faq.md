---
title: FAQ & Troubleshooting
description: Frequently asked questions and solutions for common issues.
---

Find answers to common questions and solutions for issues you may encounter.

## Basic Information

<details>
<summary><strong>What is CobbleRanked?</strong></summary>

A competitive ranked battle system for Cobblemon servers with:

- ELO-based matchmaking (Pokemon Showdown or Glicko-2)
- Singles/Doubles/Triples battle formats
- Season system with automatic rewards
- Pokemon/move/ability/item blacklists
- Label limits (e.g., max 1 legendary per team)
- Cross-server support via Redis (optional)
- Battle music and camera system

</details>

<details>
<summary><strong>What are the requirements?</strong></summary>

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21.1 |
| Fabric Loader | 0.17.2+ |
| Cobblemon | 1.7.1+ |
| GashiLibs | 1.0.6+ |
| MailLib | 1.0.5+ |
| Fabric Language Kotlin | 1.13.6+ |

</details>

<details>
<summary><strong>What database options are available?</strong></summary>

| Database | Use Case |
|----------|----------|
| **SQLite** | Single server, simple setup (default) |
| **MySQL** | Cross-server, large player bases |
| **MongoDB** | NoSQL alternative, sharded setups |

Cross-server requires MySQL or MongoDB (not SQLite).

</details>

## Configuration

<details>
<summary><strong>How do I change the language?</strong></summary>

Edit `config/cobbleranked/config.yaml`:

```yaml
language: ja-jp  # en-us or ja-jp
```

Then run `/rankedadmin reload`.

</details>

<details>
<summary><strong>What are the battle format defaults?</strong></summary>

| Format | Team Size | Level Cap | Turn Timer | Match Duration |
|--------|-----------|-----------|------------|----------------|
| Singles | 3v3 | 100 | 90s | 15 minutes |
| Doubles | 4v4 | 50 | 120s | 20 minutes |
| Triples | 6v6 | 50 | 150s | 25 minutes |

**Note:** Triples is disabled by default in the preset. Enable it in your season preset if needed.

All formats have 60s team selection and 30s lead selection timers.

</details>

## Arena Setup

<details>
<summary><strong>How do I set up an arena?</strong></summary>

Use these commands in-game:

```
/rankedadmin setArena <name> pos1      # First player spawn
/rankedadmin setArena <name> pos2      # Second player spawn
/rankedadmin setArena <name> exit      # Exit teleport location
/rankedadmin setArena <name> spectator # Optional spectator position
```

Check arena status with `/rankedadmin arena status`.

</details>

<details>
<summary><strong>"No arenas available" error</strong></summary>

**Solutions:**

1. Verify arena exists: `/rankedadmin arena status`
2. Enable the arena: `/rankedadmin arena enable <name>`
3. Ensure all positions are set (pos1, pos2, exit)
4. Check world name matches exactly (case-sensitive)

</details>

## Blacklist & Validation

<details>
<summary><strong>How do I blacklist Pokemon forms?</strong></summary>

Use hyphen (-) as the separator, not colon (:):

```yaml
blacklist:
  pokemon:
    - "Mewtwo"           # Bans all Mewtwo forms
    - "Kyurem-Black"     # Only Black Kyurem
    - "Zygarde-Complete" # Only Complete form
    - "Necrozma-Ultra"   # Only Ultra Necrozma
```

Species-only entries ban ALL forms. Form-specific entries need exact `-Form` suffix.

</details>

<details>
<summary><strong>How do I blacklist items?</strong></summary>

Direct items or item tags:

```yaml
blacklist:
  items:
    - "cobblemon:choice_band"     # Specific item
    - "minecraft:diamond"         # Vanilla item
    - "#cobblemon:mega_stones"    # Item tag (starts with #)
    - "#cobblemon:berries"        # All berries
```

</details>

<details>
<summary><strong>"Team is invalid for this format" error</strong></summary>

**Common causes:**

| Validation Error | Meaning |
|-----------------|---------|
| BLACKLISTED_SPECIES | Pokemon species is banned |
| BLACKLISTED_MOVE | Move not allowed |
| BLACKLISTED_ABILITY | Ability not allowed |
| BLACKLISTED_ITEM | Held item not allowed |
| LABEL_LIMIT_EXCEEDED | Too many legendaries/mythicals |
| DUPLICATE_SPECIES | Species Clause violation |
| DUPLICATE_ITEM | Item Clause violation |

**Solutions:**

1. Check blacklist in season preset
2. Verify label limits (default: max 1 legendary)
3. No duplicate Pokemon species (Species Clause)
4. No duplicate held items (Item Clause)

</details>

## Matchmaking

<details>
<summary><strong>How does matchmaking work?</strong></summary>

1. Player joins queue with `/ranked`
2. System searches within ELO range (default ±200)
3. If no match found, range expands every 30s (+50 ELO)
4. Last 3 recent opponents avoided (expires after 5 minutes)
5. When matched, ready check begins (17s to accept)
6. Team selection begins (60s)
7. Lead selection (30s), then battle starts

</details>

<details>
<summary><strong>Queue not finding matches</strong></summary>

**Solutions:**

1. ELO range expands over time - wait longer
2. Recent opponent avoidance may delay matches
3. With 4+ players in queue, avoidance relaxes after 2 minutes
4. Check if ELO enforcement is too strict in config

</details>

## ELO & Rankings

<details>
<summary><strong>How does the ELO system work?</strong></summary>

**Pokemon Showdown System (Default):**

- Starting ELO: 1000
- Floor ELO: 1000
- New players get K-factor 50 for first 30 games

| ELO Range | K-Factor |
|-----------|----------|
| 0-1100 | 40 |
| 1101-1300 | 32 |
| 1301-1600 | 24 |
| 1601-2000 | 16 |
| 2001+ | 12 |

Higher K-factor = bigger rating changes per match.

</details>

<details>
<summary><strong>What are the rank tiers?</strong></summary>

| Tier | ELO Range |
|------|-----------|
| Poke Ball | 0-1299 |
| Great Ball | 1300-1499 |
| Ultra Ball | 1500-1699 |
| Master Ball | 1700-1899 |
| Beast Ball | 1900-2099 |
| Cherish Ball | 2100+ |

</details>

<details>
<summary><strong>ELO didn't change after battle</strong></summary>

**Possible causes:**

1. Daily ELO gain limit reached (default: 200)
2. Battle didn't complete (timeout/disconnect)
3. Casual battle (no ELO change)
4. Very small change due to large ELO difference

</details>

## Seasons & Rewards

<details>
<summary><strong>What happens when a season ends?</strong></summary>

1. Final rankings calculated
2. Rewards distributed via MailLib
3. Leaderboard archived (top 100 by default)
4. ELO reset (hard or soft reset, configurable)
5. New season begins automatically

</details>

<details>
<summary><strong>Season didn't end automatically</strong></summary>

**Solutions:**

1. Check season schedule timezone (IANA format)
2. Verify end date/time in season.yaml
3. Manual rotation: `/rankedadmin season rotate`
4. Check server logs for errors

</details>

<details>
<summary><strong>How do I claim rewards?</strong></summary>

```
/mailbox
```

Rewards are sent via MailLib when the season ends.

</details>

## Database Issues

<details>
<summary><strong>SQLite errors</strong></summary>

**Solutions:**

1. Check `config/cobbleranked/` directory exists
2. Verify file permissions on `data.db`
3. Ensure disk space is available
4. Backup and delete corrupt DB to regenerate

</details>

<details>
<summary><strong>MySQL connection failed</strong></summary>

**Solutions:**

1. Verify MySQL is running
2. Check host, port, database, username, password
3. Test connection: `mysql -h host -u user -p database`
4. Verify firewall allows port 3306
5. Check character set: `utf8mb4_unicode_ci`
6. Increase pool size if "max pool reached" error

</details>

<details>
<summary><strong>MongoDB connection issues</strong></summary>

**Solutions:**

1. Verify connection string format
2. Check MongoDB daemon is running
3. Verify auth credentials if using authentication
4. MongoDB driver is shaded - no conflicts with other mods

</details>

## Cross-Server Issues

<details>
<summary><strong>Redis not connecting</strong></summary>

**Solutions:**

1. Verify Redis is running: `redis-cli ping`
2. Check host, port, password in config.yaml
3. Verify firewall allows port 6379
4. Test with password: `redis-cli -h host -p port -a password ping`

</details>

<details>
<summary><strong>Players not matching across servers</strong></summary>

**Checklist:**

1. All servers use same database (MySQL/MongoDB)
2. `crossServer.enabled: true` on all servers
3. Redis connected on all servers
4. Each server has unique `serverId`
5. One server has empty `battleServer` (handles battles)

</details>

## Commands Reference

<details>
<summary><strong>Player commands</strong></summary>

| Command | Permission | Description |
|---------|------------|-------------|
| `/ranked` | `cobbleranked.player.use` | Open ranked GUI |
| `/casual` | `cobbleranked.player.casual.use` | Open casual GUI |
| `/casual missions` | `cobbleranked.player.casual.use` | Open missions GUI |
| `/battlecamera toggle` | `cobbleranked.player.use` | Toggle battle camera |
| `/battlecamera status` | `cobbleranked.player.use` | Check camera status |

</details>

<details>
<summary><strong>Admin commands</strong></summary>

**Arena Management:**
- `/rankedadmin setArena <name> <pos1|pos2|exit|spectator>`
- `/rankedadmin arena status` - View all arenas
- `/rankedadmin arena enable/disable <name>`
- `/rankedadmin arena setcenter <name> [radius]` - Set arena center with radius
- `/rankedadmin arena reset` - Clear all positions
- `/rankedadmin teleportArena <name>` - Teleport to arena
- `/rankedadmin setexit` - Set global exit location

**ELO Management:**
- `/rankedadmin setelo <player> <format> <elo>`
- `/rankedadmin addelo <amount> <player> <format>`
- `/rankedadmin removeelo <amount> <player> <format>`

**Season Management:**
- `/rankedadmin season info` - Current season details
- `/rankedadmin season rotate` - End season manually
- `/rankedadmin queue clear` - Clear all queues

**Data Management:**
- `/rankedadmin reload` - Reload all configs
- `/rankedadmin usage export [season]` - Export Pokemon usage
- `/rankedadmin leaderboard export [season] [limit]`
- `/rankedadmin migrate ...` - v1 to v2 migration

</details>

## Performance

<details>
<summary><strong>Lag during battles</strong></summary>

**Solutions:**

1. Disable debug logging: `debug.enabled: false`
2. Reduce battle music complexity
3. Check server TPS
4. Increase MySQL connection pool if needed
5. Archive old seasons to reduce database size

</details>

## Getting Help

If your issue isn't listed above:

1. Collect `logs/latest.log`
2. Export relevant config files
3. Note exact steps to reproduce
4. Ask in [Discord](https://discord.gg/VVVvBTqqyP) #feedback
