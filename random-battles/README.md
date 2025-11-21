# Random Battles Mode

A highly engaging battle mode where both players receive fully built, random teams from a curated Pokémon pool — similar to Showdown's most popular casual format.

## What is Random Battles?

When players queue for Random Battles, the system gives each participant a randomized team with:

- ✅ **Balanced Pokémon selection** - No duplicates, fair matchmaking
- ✅ **Predetermined movesets** - 4 moves randomly selected from each Pokemon's movepool
- ✅ **Pre-set EVs, IVs, items, abilities** - Everything configured automatically
- ✅ **Tera types** (if enabled) - Random selection for unpredictability
- ✅ **Level balancing** - Weaker Pokemon get higher levels for fairness

**No team building required. Just queue and battle.**

## Why Add This?

🎮 **Extremely accessible** - No barrier to entry for new players
🔄 **Highly replayable** - Every battle has different teams
🎓 **Educational** - Players discover Pokemon, strategies, and moves they wouldn't try
⚡ **Keeps queues active** - Most played format on Pokemon Showdown
🎉 **Casual competitive** - No perfect team needed, just skill

---

## Configuration

### Pool Files

Random battle pools are configured in `config/cobbleranked/randombattle/pools/`

Each pool is a JSON5 file with this structure:

```json5
{
  "name": "Random OU",
  "description": "Standard random battles with OU-tier Pokemon",
  "teamSize": 6,        // How many Pokemon per team (default: 6)
  "leadCount": 1,       // How many sent out initially (1=Singles, 2=Doubles)
  "enabled": true,      // Whether this pool is active

  "pokemon": [
    {
      "species": "venusaur",  // Pokemon species (lowercase)
      "data": {
        "level": 84,           // Battle level (71-100 typical)
        "sets": [
          {
            "role": "Bulky Support",
            "movepool": [
              "Giga Drain",
              "Leech Seed",
              "Sleep Powder",
              "Sludge Bomb",
              "Earth Power",
              "Synthesis"
            ],
            "abilities": ["Chlorophyll", "Overgrow"],
            "teraTypes": ["Steel", "Water", "Fire"],
            "items": ["Leftovers", "Life Orb"],
            "natures": ["Bold", "Calm", "Modest"],
            "evs": "252/0/252/4/0/0"  // HP/Atk/Def/SpA/SpD/Spe
          }
        ]
      }
    }
    // ... more Pokemon
  ]
}
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `species` | ✅ | Pokemon species identifier (lowercase) |
| `level` | ✅ | Battle level (71-100 recommended) |
| `role` | ✅ | Battle role (e.g., "Fast Attacker", "Bulky Support") |
| `movepool` | ✅ | Available moves (system picks 4 randomly) |
| `abilities` | ✅ | Available abilities (system picks 1 randomly) |
| `teraTypes` | ✅ | Tera type options (system picks 1 randomly) |
| `items` | ❌ | Held items (defaults based on role if omitted) |
| `natures` | ❌ | Nature options (defaults based on role if omitted) |
| `evs` | ❌ | EV spread (defaults based on role if omitted) |
| `ivs` | ❌ | IV spread (defaults to 31/31/31/31/31/31) |

### Default Role-Based Values

If `items`, `natures`, or `evs` are not specified, the system uses intelligent defaults:

**Fast Attacker:**
- Natures: Jolly / Timid
- Items: Choice Scarf / Life Orb
- EVs: 0/252/0/0/4/252 (Physical) or 0/0/0/252/4/252 (Special)

**Bulky Support:**
- Natures: Bold / Calm / Careful / Impish
- Items: Leftovers / Heavy-Duty Boots / Rocky Helmet
- EVs: 252/0/252/0/4/0 (Physical) or 252/0/0/0/252/4 (Special)

**Wallbreaker:**
- Natures: Adamant / Modest
- Items: Life Orb / Choice Band / Choice Specs
- EVs: 0/252/4/0/0/252 (Physical) or 0/0/4/252/0/252 (Special)

---

## Creating Custom Pools

### Example: Random UU Pool

Create `config/cobbleranked/randombattle/pools/random-uu.json5`:

```json5
{
  "name": "Random UU",
  "description": "Random battles with UU-tier Pokemon",
  "teamSize": 6,
  "leadCount": 1,
  "enabled": true,

  "pokemon": [
    {
      "species": "scizor",
      "data": {
        "level": 80,
        "sets": [
          {
            "role": "Physical Sweeper",
            "movepool": ["Bullet Punch", "U-turn", "Swords Dance", "Close Combat", "Knock Off"],
            "abilities": ["Technician"],
            "teraTypes": ["Steel", "Bug", "Flying"],
            "items": ["Choice Band", "Life Orb"],
            "natures": ["Adamant", "Jolly"],
            "evs": "0/252/4/0/0/252"
          }
        ]
      }
    }
    // ... add 20-30 UU Pokemon for variety
  ]
}
```

### Example: 3v3 Fast Queue

Create `config/cobbleranked/randombattle/pools/random-3v3.json5`:

```json5
{
  "name": "Random 3v3",
  "description": "Quick 3v3 random battles",
  "teamSize": 3,      // Only 3 Pokemon!
  "leadCount": 1,
  "enabled": true,

  "pokemon": [
    // Same Pokemon entries, but battles are faster
  ]
}
```

### Example: Monotype Random

Create `config/cobbleranked/randombattle/pools/random-fire.json5`:

```json5
{
  "name": "Random Fire",
  "description": "Random battles with Fire-type Pokemon only",
  "teamSize": 6,
  "leadCount": 1,
  "enabled": true,

  "pokemon": [
    {"species": "charizard", "data": {...}},
    {"species": "arcanine", "data": {...}},
    {"species": "talonflame", "data": {...}},
    {"species": "volcarona", "data": {...}},
    // ... more Fire-types
  ]
}
```

---

## Importing from Showdown

You can import Pokemon data from Showdown's random battle sets:

**Source:** https://github.com/smogon/pokemon-showdown/blob/master/data/random-battles/gen9/sets.json

### Example Conversion

**Showdown format:**
```json
{
  "venusaur": {
    "level": 84,
    "sets": [
      {
        "role": "Bulky Support",
        "movepool": ["Giga Drain", "Leech Seed", "Sleep Powder"],
        "abilities": ["Chlorophyll", "Overgrow"],
        "teraTypes": ["Steel", "Water"]
      }
    ]
  }
}
```

**CobbleRanked format:**
```json5
{
  "species": "venusaur",
  "data": {
    "level": 84,
    "sets": [
      {
        "role": "Bulky Support",
        "movepool": ["Giga Drain", "Leech Seed", "Sleep Powder", "Sludge Bomb", "Earth Power", "Synthesis"],
        "abilities": ["Chlorophyll", "Overgrow"],
        "teraTypes": ["Steel", "Water", "Fire"],
        "items": ["Leftovers", "Life Orb"],
        "natures": ["Bold", "Calm"],
        "evs": "252/0/252/4/0/0"
      }
    ]
  }
}
```

**Additions:**
- Expanded `movepool` with more moves (recommend 6-8 moves)
- Added `items`, `natures`, `evs` for complete configuration
- Can add multiple sets per Pokemon for variety

---

## Admin Commands

### Reload Pools

```
/rankedadmin randombattle reload
```

Reloads all pool configurations from disk.

### List Pools

```
/rankedadmin randombattle list
```

Shows all available random battle pools and their status.

### Test Generation

```
/rankedadmin randombattle generate <pool> [player]
```

Generates a random team from specified pool for testing.

---

## Integration with Ranked System

### Queue Selection

Players choose Random Battles format from the ranked GUI:

```
/ranked
→ Click "Random OU" button
→ System generates team automatically
→ Player joins queue
→ Match starts with pre-generated teams
```

### Multiple Pool Support

Admins can enable multiple pools:
- Random OU
- Random UU
- Random 3v3
- Random Monotype
- Themed pools (Gen 1 only, Starters only, etc.)

Each pool has its own queue and matchmaking.

### Elo System

Random battles use separate Elo ratings per pool:
- `Random OU` Elo
- `Random UU` Elo
- `Random 3v3` Elo

This prevents cross-contamination between formats.

---

## Performance Considerations

### Pool Size

**Minimum:** 10-12 Pokemon (for 6v6)
**Recommended:** 30-50 Pokemon (good variety)
**Maximum:** 100+ Pokemon (excellent variety, but slower selection)

### Team Generation

Teams are generated when:
1. Player clicks random battle queue button
2. Cached until battle ends
3. Regenerated for next battle

**Performance:** ~10-50ms per team (negligible)

### Memory Usage

Each active random team consumes ~5KB memory.
For 100 concurrent battles: ~500KB total.

---

## Balancing Tips

### Level Scaling

Give weaker Pokemon higher levels:

```json5
{"species": "pikachu", "data": {"level": 93, ...}}    // Weak stats
{"species": "garchomp", "data": {"level": 76, ...}}   // Strong stats
{"species": "metagross", "data": {"level": 78, ...}}  // Very strong
```

### Role Distribution

Aim for balanced pool composition:
- 30% Fast Attackers
- 25% Wallbreakers
- 20% Bulky Supports
- 15% Setup Sweepers
- 10% Utility/Support

### Move Pool Size

**4 moves:** No variety (boring)
**6-8 moves:** Good variety (recommended)
**10+ moves:** High variety (can be random/inconsistent)

### Testing

Test pools with:
1. Generate 10 teams
2. Check for balance (no OP teams)
3. Verify move/item variety
4. Ensure all Pokemon are viable

---

## Troubleshooting

Having issues with random battles? See the [FAQ](../cobbleranked/support/faq.md#random-battles) for solutions.

---

**See Also:**
- [Battle Formats](../cobbleranked/features/battle-formats.md)
- [Configuration Guide](../cobbleranked/configuration/README.md)
- [Admin Commands](../cobbleranked/getting-started/commands.md)
- [FAQ & Troubleshooting](../cobbleranked/support/faq.md)
