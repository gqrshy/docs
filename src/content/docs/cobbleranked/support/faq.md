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
| Fabric Loader | 0.17.0+ |
| Cobblemon | 1.7.1+ |
| GashiLibs | 1.0.6+ |
| MailLib | 1.0.5+ |
| Fabric Language Kotlin | 1.13.0+ |

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

**v2.0.21+ Behavior:**
- Species-only entries (e.g., `Landorus`) ban ALL forms
- Form-specific entries (e.g., `Landorus-Therian`) ban ONLY that form

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

**Win Streak Bonus:** Players on 3+ win streaks get +3 K-factor, 5+ wins get +5 K-factor.

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

<details>
<summary><strong>Players not teleported back after battle</strong></summary>

**This issue was fixed in v2.0.21.** Players are now correctly teleported back to their original position after ranked battles (single-server mode).

**If still experiencing issues:**

1. Verify `exitPosition` is set in your arena config
2. Run `/rankedadmin arena status` to check arena configuration
3. Ensure no other plugins are interfering with teleportation
4. Check server logs for teleport-related errors

</details>

## Getting Help

If your issue isn't listed above:

1. Collect `logs/latest.log`
2. Export relevant config files
3. Note exact steps to reproduce
4. Ask in [Discord](https://discord.gg/VVVvBTqqyP) #feedback
