# Random Battles

---
**CobbleRanked** > **Features** > **Random Battles**
---

Auto-generated teams for players who want to battle without team building.

## Overview

Teams are generated from preset pools with fixed movesets, EVs, and items - just like Pokemon Showdown's Random Battles.

**Benefits:**
- No team building needed
- Perfect for new players
- Focus on battle skill, not preparation

## Formats

**RANDOM_SINGLES** - 6v6 singles with generated teams
**RANDOM_DOUBLES** - 6v6 doubles with generated teams
**RANDOM_3V3** - Quick 3v3 battles

## Configuration

**File:** `config/cobbleranked/config.json5`

```json5
"random_battles": {
  "enabled": true,
  "default_pool": "Random OU",  // Pool name from random_pools section
  "format_pools": {
    "RANDOM_SINGLES": "Random OU",
    "RANDOM_DOUBLES": "Random Doubles OU",
    "RANDOM_3V3": "Random 3v3"
  }
}
```

## Creating Pokemon Pools

**File:** `config/cobbleranked/random_pools/`

Create JSON5 files for each tier (e.g., `random_ou.json5`, `random_ubers.json5`).

### Example Pool

```json5
{
  "pool_name": "Random OU",
  "pokemon": [
    {
      "species": "Garchomp",
      "level": 70,
      "moves": ["Earthquake", "Dragon Claw", "Stone Edge", "Swords Dance"],
      "ability": "Rough Skin",
      "nature": "Jolly",
      "evs": {"hp": 0, "atk": 252, "def": 4, "spa": 0, "spd": 0, "spe": 252},
      "item": "cobblemon:choice_scarf"
    }
  ]
}
```

## Pool Parameters

| Field | Description | Required |
|-------|-------------|----------|
| `species` | Pokemon name | Yes |
| `level` | Level (1-100) | Yes |
| `moves` | 4 moves | Yes |
| `ability` | Ability name | No |
| `nature` | Nature | No |
| `evs` | EV spread | No |
| `item` | Held item | No |

## Tips

- Create separate pools for different tiers (OU, Ubers, LC)
- Use role-based EV spreads (Physical Sweeper, Special Wall, etc.)
- Include diverse movesets for each Pokemon
- Test pool balance before deploying

## Troubleshooting

**Teams not generating:** Check that `random_battles.enabled` is `true` and pool files exist.

**Missing Pokemon:** Verify species names match Cobblemon's Pokemon registry.

**Battles failing:** Ensure all Pokemon have 4 moves and valid abilities.

---

## Next Steps

### For Setup
1. **[Creating Pokemon Pools](#creating-pokemon-pools)** - Build your first pool
2. **[Pool Parameters](#pool-parameters)** - Understand all options
3. **[Testing Pools](#troubleshooting)** - Verify teams generate correctly

### For Competitive Pools
1. **[Tier Organization](#tips)** - Create OU/Ubers/LC pools
2. **[EV Spreads](#tips)** - Role-based distributions
3. **[Balance Testing](#tips)** - Ensure fair matchups

---

## Related Pages
- [Main Configuration](../configuration/config.md) - Random battles settings
- [Battle Formats](ranked-battles.md) - Format types
- [Troubleshooting](../support/troubleshooting.md) - Common issues
