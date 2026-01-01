---
title: FAQ & Troubleshooting
description: Frequently asked questions and solutions for common issues.
---

Find answers to common questions and solutions for issues you may encounter.

## Basic Information

<details>
<summary><strong>What is CobbleRanked?</strong></summary>

A competitive ranked battle system for Cobblemon servers with:

- ELO-based matchmaking
- Singles/Doubles/Triples battles
- Season system with rewards
- Pokemon/move/ability/item restrictions
- Cross-server support (optional)

</details>

<details>
<summary><strong>What are the requirements?</strong></summary>

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21.1 |
| Fabric Loader | 0.17.2+ |
| Cobblemon | 1.7.1+ |
| GashiLibs | 1.0.3+ |
| MailLib | 1.0.1+ |
| Fabric Language Kotlin | 1.13.6+ |

</details>

<details>
<summary><strong>Is cross-server required?</strong></summary>

No. Single-server mode works with zero configuration. Cross-server is only needed for multi-server networks.

</details>

## Installation Issues

<details>
<summary><strong>Mod not loading</strong></summary>

**Symptoms:** No CobbleRanked in logs, commands don't work

**Solutions:**
1. Check all dependencies are installed (GashiLibs, MailLib)
2. Verify Minecraft version is 1.21.1
3. Check for JAR file conflicts
4. Review `logs/latest.log` for errors

</details>

<details>
<summary><strong>Config files not generating</strong></summary>

**Symptoms:** No `config/cobbleranked/` folder

**Solutions:**
1. Verify all dependencies are installed
2. Let server fully start once
3. Check write permissions on config folder
4. Check `logs/latest.log` for errors

</details>

<details>
<summary><strong>How do I change the language?</strong></summary>

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "ja-Jp"  // en-Us, ja-Jp
}
```

Then run `/rankedadmin reload`.

</details>

## Battle Issues

<details>
<summary><strong>"No arenas available" error</strong></summary>

**Symptoms:** Can't start battles, error message appears

**Solutions:**
1. Set up at least one arena:
   ```
   /rankedadmin setArena arena1 pos1
   /rankedadmin setArena arena1 pos2
   ```
2. Check `arenas.yaml` syntax
3. Run `/rankedadmin arena status`

</details>

<details>
<summary><strong>Queue not finding matches</strong></summary>

**Symptoms:** Long wait times, no matches

**Solutions:**
1. Ensure players are in same format queue
2. Check ELO range settings in config
3. Verify multiple arenas are available
4. For cross-server: check Redis connection

</details>

<details>
<summary><strong>How does matchmaking work?</strong></summary>

1. Player joins queue
2. System searches for opponent with similar ELO
3. Range expands over time if no match found
4. When matched, both players select teams
5. Battle begins

</details>

<details>
<summary><strong>What happens if I disconnect?</strong></summary>

| Situation | Result |
|-----------|--------|
| During battle | Automatic loss, ELO penalty |
| During queue | Removed from queue |
| During selection | Match cancelled |

</details>

<details>
<summary><strong>Battle camera stuck</strong></summary>

**Symptoms:** Camera won't disable, stuck in air

**Solutions:**
1. Run `/battlecamera toggle`
2. Disconnect and reconnect
3. Admin can teleport player if needed

</details>

## Blacklist & Restrictions

<details>
<summary><strong>How do I ban specific Pokemon forms?</strong></summary>

Use the form syntax: `species:form_name`

```yaml
black_list_pokemon:
  - "Kyurem:white-fusion"  # Only White Kyurem banned
```

</details>

<details>
<summary><strong>How do I find move names?</strong></summary>

Move names use lowercase snake_case:

| Display Name | Internal Name |
|--------------|---------------|
| Sheer Cold | `sheer_cold` |
| Baton Pass | `baton_pass` |

</details>

## ELO & Rankings

<details>
<summary><strong>What is my starting ELO?</strong></summary>

New players start at **1500 ELO** (configurable).

</details>

<details>
<summary><strong>How much ELO do I gain or lose?</strong></summary>

| Result | Against Higher ELO | Against Lower ELO |
|--------|-------------------|-------------------|
| Win | Large gain | Small gain |
| Loss | Small loss | Large loss |

</details>

<details>
<summary><strong>Leaderboard loading slowly</strong></summary>

**Symptoms:** Long load times for rankings

**Solutions:**
1. Leaderboard is cached automatically
2. Check database performance
3. Consider MySQL for large player bases

</details>

## Seasons & Rewards

<details>
<summary><strong>What happens when a season ends?</strong></summary>

1. Final rankings calculated
2. Rewards sent via MailLib
3. Leaderboard archived
4. ELO may reset (if configured)
5. New season begins

</details>

<details>
<summary><strong>How do I claim rewards?</strong></summary>

```
/mailbox
```

</details>

## Database Issues

<details>
<summary><strong>SQLite errors</strong></summary>

**Symptoms:** Data not saving, crashes

**Solutions:**
1. Check file permissions on `cobbleranked.db`
2. Ensure disk space available
3. Delete corrupt DB and restart (data loss)

</details>

<details>
<summary><strong>MySQL connection failed</strong></summary>

**Symptoms:** "Connection refused" or "Access denied"

**Solutions:**
1. Verify MySQL is running
2. Check host/port/credentials
3. Test connection manually:
   ```bash
   mysql -h localhost -u cobbleranked -p cobbleranked
   ```
4. Check user has proper permissions

</details>

## Cross-Server Issues

<details>
<summary><strong>Redis not connecting</strong></summary>

**Symptoms:** Queue not syncing across servers

**Solutions:**
1. Verify Redis is running:
   ```bash
   redis-cli PING
   ```
2. Check Redis host/port in config
3. Check firewall rules
4. Verify password if set

</details>

<details>
<summary><strong>Players not transferring between servers</strong></summary>

**Symptoms:** Match found but players don't move

**Solutions:**
1. Check Velocity server names match config
2. Verify battle server is online
3. Check `battleServer` config value
4. Review Velocity logs

</details>

## Performance

<details>
<summary><strong>Lag during battles</strong></summary>

**Symptoms:** Stuttering, delays

**Solutions:**
1. Reduce battle camera speed
2. Check server TPS
3. Verify database connection stable
4. Reduce concurrent battle limit

</details>

## Commands Reference

<details>
<summary><strong>Available commands</strong></summary>

**Players:**
- `/ranked` - Open ranked menu
- `/casual` - Open casual menu
- `/battlecamera toggle` - Toggle camera

**Admins:**
- `/rankedadmin reload` - Reload config
- `/rankedadmin setArena <name> <pos>` - Set arena
- `/rankedadmin season info` - View season

</details>

## Getting Help

If your issue isn't listed above:

1. Collect `logs/latest.log`
2. Export config files
3. Note steps to reproduce
4. Ask in [Discord](https://discord.gg/VVVvBTqqyP) #feedback
