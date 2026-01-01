---
title: FAQ
description: Frequently asked questions about CobbleRanked.
---

Common questions and answers about CobbleRanked.

## Basic Information

### What is CobbleRanked?

A competitive ranked battle system for Cobblemon servers with:

- ELO-based matchmaking
- Singles/Doubles/Triples battles
- Season system with rewards
- Pokemon/move/ability/item restrictions
- Cross-server support (optional)

### What are the requirements?

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21.1 |
| Fabric Loader | 0.17.2+ |
| Cobblemon | 1.7.1+ |
| GashiLibs | 1.0.3+ |
| MailLib | 1.0.1+ |
| Fabric Language Kotlin | 1.13.6+ |

### Is cross-server required?

No. Single-server mode works with zero configuration. Cross-server is only needed for multi-server networks.

## Installation

### Config files not generating

1. Verify all dependencies are installed
2. Fully start the server
3. Check `logs/latest.log` for errors

### How do I change the language?

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "ja-Jp"  // en-Us, ja-Jp
}
```

Then run `/rankedadmin reload`.

## Blacklist

### How do I ban specific Pokemon forms?

Use the form syntax: `species:form_name`

```yaml
black_list_pokemon:
  - "Kyurem:white-fusion"  # Only White Kyurem banned
```

### How do I find move names?

Move names use lowercase snake_case:

| Display Name | Internal Name |
|--------------|---------------|
| Sheer Cold | `sheer_cold` |
| Baton Pass | `baton_pass` |

## Battles

### How does matchmaking work?

1. Player joins queue
2. System searches for opponent with similar ELO
3. Range expands over time if no match found
4. When matched, both players select teams
5. Battle begins

### What happens if I disconnect?

| Situation | Result |
|-----------|--------|
| During battle | Automatic loss, ELO penalty |
| During queue | Removed from queue |
| During selection | Match cancelled |

## ELO System

### What is my starting ELO?

New players start at **1500 ELO** (configurable).

### How much ELO do I gain or lose?

| Result | Against Higher ELO | Against Lower ELO |
|--------|-------------------|-------------------|
| Win | Large gain | Small gain |
| Loss | Small loss | Large loss |

## Seasons

### What happens when a season ends?

1. Final rankings calculated
2. Rewards sent via MailLib
3. Leaderboard archived
4. ELO may reset (if configured)
5. New season begins

### How do I claim rewards?

```
/mailbox
```

## Commands

### What commands are available?

**Players:**
- `/ranked` - Open ranked menu
- `/casual` - Open casual menu
- `/battlecamera toggle` - Toggle camera

**Admins:**
- `/rankedadmin reload` - Reload config
- `/rankedadmin setArena <name> <pos>` - Set arena
- `/rankedadmin season info` - View season

## Support

### Need more help?

1. Check [Troubleshooting](/support/troubleshooting/)
2. Ask in [Discord](https://discord.gg/VVVvBTqqyP) #feedback
3. Include server logs when reporting issues
