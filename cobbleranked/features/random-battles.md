# Random Battle System

The Random Battle system generates balanced, preset teams for players, similar to Pokemon Showdown's Random Battle format.

---

## Overview

Random Battles eliminate team building and focus purely on battling skill. Teams are auto-generated from curated pools with preset movesets, EVs, and items.

**Key Features:**
- **Pokemon Showdown-style** preset teams
- **Role-based** EV spreads and movesets
- **Multiple pools** for different tiers (OU, Ubers, LC, etc.)
- **Three battle formats:** RANDOM_SINGLES, RANDOM_DOUBLES, RANDOM_3V3
- **No team building required** - perfect for new players

---

## Battle Formats

### RANDOM_SINGLES (6v6)

Full random battle with 6 Pokemon team.

**Format Details:**
- **Team Size:** 6 Pokemon
- **Lead Count:** 1 (single battle)
- **Team Selection:** Teams generated from pool when queue is joined
- **Use Case:** Standard Pokemon Showdown random battles

### RANDOM_DOUBLES (6v6)

Random doubles battle with 6 Pokemon team.

**Format Details:**
- **Team Size:** 6 Pokemon
- **Lead Count:** 2 (doubles battle)
- **Team Selection:** Same pool as singles, different battle format
- **Use Case:** Random VGC-style doubles

### RANDOM_3V3 (3v3)

Quick random battle with smaller teams.

**Format Details:**
- **Team Size:** 3 Pokemon
- **Lead Count:** 1 (single battle)
- **Team Selection:** 3 Pokemon selected from same pool
- **Use Case:** Fast-paced battles, events, testing

---

## Pokemon Pools

### Pool Files

**Location:** `config/cobbleranked/randombattle/pools/`

**Supported Formats:**
- JSON5 (`.json5`) - Recommended (supports comments)
- JSON (`.json`) - Standard JSON format

**Default Pool:** `random-ou.json5` (created automatically on first run)

### Pool Structure

```json5
{
  // Pool metadata
  name: "Random OU",
  description: "Standard random battles with OU-tier Pokemon",
  teamSize: 6,      // Number of Pokemon per team
  leadCount: 1,     // Number of leads (1 = singles, 2 = doubles)
  enabled: true,    // Enable/disable this pool

  // Pokemon list
  pokemon: [
    {
      species: "venusaur",  // Cobblemon species ID (lowercase)
      data: {
        level: 84,          // Level for this Pokemon
        sets: [             // Multiple sets = random selection
          {
            role: "Bulky Support",
            movepool: [
              "Giga Drain",
              "Sludge Bomb",
              "Leech Seed",
              "Synthesis"
            ],
            abilities: ["Chlorophyll", "Overgrow"],
            teraTypes: ["Steel", "Water", "Fire"],
            items: ["Leftovers", "Life Orb"],
            natures: ["Bold", "Calm", "Modest"],
            evs: "252/0/252/4/0/0"  // HP/Atk/Def/SpA/SpD/Spe
          },
          {
            role: "Offensive Wallbreaker",
            movepool: [
              "Solar Beam",
              "Weather Ball",
              "Earth Power",
              "Growth"
            ],
            abilities: ["Chlorophyll"],
            teraTypes: ["Fire", "Ground"],
            items: ["Heat Rock", "Life Orb"],
            natures: ["Modest", "Timid"],
            evs: "0/0/0/252/4/252"  // SpA/SpD/Spe focus
          }
        ]
      }
    }
    // ... more Pokemon
  ]
}
```

### EV Spread Format

**Syntax:** `"HP/Atk/Def/SpA/SpD/Spe"`

**Common Spreads:**

| Spread | Stats | Description |
|--------|-------|-------------|
| `252/0/0/252/4/0` | SpA/HP | Special Attacker |
| `252/252/0/0/4/0` | Atk/HP | Physical Attacker |
| `252/0/252/0/4/0` | HP/Def | Physical Wall |
| `252/0/0/0/252/4` | HP/SpD | Special Wall |
| `0/0/0/252/4/252` | SpA/Spe | Fast Special Attacker |
| `0/252/0/0/4/252` | Atk/Spe | Fast Physical Attacker |
| `252/0/128/0/128/0` | HP/Def/SpD | Balanced Bulk |

**Total EVs:** Must equal 510 or less (standard Pokemon limit: 510)

---

## Role System

### Available Roles

Random Battle sets use role-based generation for natural builds:

| Role | Typical EVs | Natures | Description |
|------|------------|---------|-------------|
| **Fast** | Spe/Atk or SpA focus | Jolly, Timid | Speed-focused sweepers |
| **Physical** | Atk/HP | Adamant, Jolly | Physical attackers |
| **Special** | SpA/HP | Modest, Timid | Special attackers |
| **Bulky** | HP/Def/SpD | Bold, Calm, Impish | Defensive walls |
| **Support** | HP/Def or SpD | Bold, Calm | Status moves, utility |
| **Wallbreaker** | Atk or SpA maxed | Adamant, Modest | High-power attackers |

### Role-Based Selection

When generating a team:
1. Pokemon is selected randomly from pool
2. One of its sets is chosen randomly
3. Nature is selected from role's nature list
4. Ability is chosen randomly from set's abilities
5. 4 moves selected randomly from movepool
6. Item selected randomly from set's items (if implemented)

---

## Team Generation

### How Teams Are Built

**File:** `/src/main/kotlin/com/gashi/cobbleranked/manager/RandomBattleManager.kt`

**Generation Process:**

1. **Pool Selection:**
   - Uses active pool (configured in `config.json5`)
   - Falls back to default "Random OU" if not specified

2. **Pokemon Selection:**
   - Randomly selects N Pokemon from pool (N = teamSize)
   - No duplicates (each Pokemon appears once)

3. **Set Application:**
   - For each Pokemon, selects one random set
   - Applies level from pool data
   - Sets EVs from set configuration
   - Sets IVs to 31/31/31/31/31/31 (perfect)

4. **Move Selection:**
   - Randomly selects 4 moves from movepool
   - If movepool has ≤4 moves, uses all
   - Moves are validated against Cobblemon's move registry

5. **Ability & Nature:**
   - Random ability from set's ability list
   - Random nature from set's nature list

6. **Team Caching:**
   - Generated team is cached for player
   - Cleared after battle ends
   - Can be regenerated with `/ranked` GUI

### Methods

```kotlin
// Generate new team for player
fun generateTeam(player: ServerPlayerEntity, poolName: String = "random-ou"): List<Pokemon>

// Get cached team (or generate new)
fun getAvailableTeam(player: ServerPlayerEntity): List<Pokemon>?

// Clear cached team
fun clearTeam(player: ServerPlayerEntity)

// Reload all pools from disk
fun reload()

// Get list of available pools
fun getAvailablePools(): List<String>
```

---

## Configuration

### Enable Random Battles

```json5
{
  "randomBattle": {
    "enabled": true,
    "defaultPool": "random-ou",
    "cacheTeams": true,
    "regenerateOnBattleEnd": false
  }
}
```

**Options:**
- `enabled` - Enable random battle system
- `defaultPool` - Default pool to use for team generation
- `cacheTeams` - Cache generated teams (recommended for performance)
- `regenerateOnBattleEnd` - Auto-regenerate team after battle
  - `true` - New team every battle
  - `false` - Keep same team until manually regenerated

### Queue Configuration

Add random battle formats to matchmaking:

```json5
{
  "matchmaking": {
    "availableFormats": [
      "SINGLES",
      "DOUBLES",
      "RANDOM_SINGLES",
      "RANDOM_DOUBLES",
      "RANDOM_3V3"
    ]
  }
}
```

---

## Creating Custom Pools

### Step 1: Create Pool File

Create a new file in `config/cobbleranked/randombattle/pools/`:

**Example:** `random-ubers.json5`

```json5
{
  name: "Random Ubers",
  description: "Legendary Pokemon and Uber-tier threats",
  teamSize: 6,
  leadCount: 1,
  enabled: true,
  pokemon: [
    // Add Pokemon here (see structure above)
  ]
}
```

### Step 2: Add Pokemon Data

For each Pokemon, define at least one set:

```json5
{
  species: "mewtwo",
  data: {
    level: 76,
    sets: [
      {
        role: "Fast",
        movepool: ["Psystrike", "Ice Beam", "Thunderbolt", "Recover"],
        abilities: ["Pressure", "Unnerve"],
        teraTypes: ["Fighting", "Steel"],
        items: ["Life Orb", "Choice Specs"],
        natures: ["Timid", "Modest"],
        evs: "0/0/0/252/4/252"
      }
    ]
  }
}
```

### Step 3: Set as Active Pool

Edit `config.json5`:

```json5
{
  "randomBattle": {
    "defaultPool": "random-ubers"  // Your new pool name
  }
}
```

### Step 4: Reload

```bash
/rankedadmin reload
```

---

## Pool Management

### Multiple Pools

You can create multiple pools and switch between them:

**Pools:**
- `random-ou.json5` - OU-tier Pokemon
- `random-ubers.json5` - Legendary Pokemon
- `random-lc.json5` - Little Cup (unevolved Pokemon)
- `random-monotype.json5` - Single-type teams

**Switching Pools:**
```json5
{
  "randomBattle": {
    "defaultPool": "random-lc"  // Change active pool
  }
}
```

### Pool Validation

The system validates pools on load:

**Checks:**
- All species exist in Cobblemon registry
- All moves are valid
- All abilities are valid
- EV totals don't exceed 510
- Required fields present

**Invalid Entries:**
- Logged as warnings
- Skipped during team generation
- Server continues with valid Pokemon

---

## Player Experience

### Queue Flow

1. **Player opens `/ranked` GUI**
2. **Selects "Random Singles" format**
3. **Team auto-generated** (if not cached)
4. **Joins queue** with random team
5. **Match found** - Team is loaded into battle
6. **Battle starts** with random team
7. **Battle ends** - Team cached or regenerated (config setting)

### Team Preview

**Current Implementation:**
- Teams are generated on queue join
- Players don't see team composition before battle
- Team is revealed during battle team selection phase

**Future Enhancement:**
- Preview GUI before queue join
- Regenerate button if player doesn't like team
- Team composition display

---

## Balancing Random Pools

### Level Scaling

Adjust Pokemon levels to balance power:

```json5
// Powerful Pokemon = lower level
{ species: "mewtwo", data: { level: 72, ... } }

// Weaker Pokemon = higher level
{ species: "butterfree", data: { level: 90, ... } }
```

**Pokemon Showdown Formula:**
- Base stat total determines level
- 580+ BST: 72-76 level
- 530-579 BST: 78-82 level
- 480-529 BST: 84-86 level
- <480 BST: 88-92 level

### Move Pool Curation

**Guidelines:**
- 4-8 moves per set (ensures variety)
- Include STAB moves
- Add coverage moves for common threats
- Utility moves for support roles
- Avoid overpowered move combinations

**Example - Balanced Movepool:**
```json5
{
  movepool: [
    "Thunderbolt",    // STAB
    "Ice Beam",       // Coverage
    "Volt Switch",    // Utility
    "Thunder Wave",   // Support
    "Hidden Power",   // Coverage
    "Discharge"       // Alternative STAB
  ]
}
```

**Avoid:**
```json5
{
  movepool: [
    "Shell Smash",
    "Extreme Speed",
    "Earthquake",
    "Ice Shard"
  ]
  // Too powerful - Shell Smash + priority = instant win
}
```

---

## Advanced Features

### Tera Type Support

**Configuration:**
```json5
{
  teraTypes: ["Steel", "Water", "Fire"]
}
```

**Status:** Prepared for future Cobblemon versions with Terastal support

### Held Items

**Configuration:**
```json5
{
  items: ["Leftovers", "Life Orb", "Choice Scarf"]
}
```

**Status:** Framework ready, requires Cobblemon 1.6.1+ item holding implementation

### IV Customization

**Current:** All Pokemon have 31/31/31/31/31/31 IVs (perfect)

**Future:** Per-set IV configuration:
```json5
{
  ivs: "31/0/31/31/31/31"  // 0 Attack IV for special attackers (Foul Play counter)
}
```

---

## Troubleshooting

### Team Generation Fails

**Check:**
1. Pool file exists in `config/cobbleranked/randombattle/pools/`
2. Pool file has valid JSON5 syntax
3. Species names match Cobblemon registry (use lowercase)
4. Move names are valid
5. Server logs for validation errors

### Pokemon Missing Moves

**Cause:** Movepools may have invalid move names

**Fix:**
1. Check Cobblemon move registry
2. Update move names in pool file
3. Run `/rankedadmin reload`

### Unbalanced Teams

**Adjust:**
- Lower levels for strong Pokemon
- Curate movepools more carefully
- Remove overpowered sets
- Add more support-oriented sets

---

## Example Pools

### Competitive OU

```json5
{
  name: "Random OU",
  description: "OverUsed tier competitive Pokemon",
  teamSize: 6,
  leadCount: 1,
  enabled: true,
  pokemon: [
    { species: "landorus", data: { level: 78, sets: [...] } },
    { species: "garchomp", data: { level: 80, sets: [...] } },
    { species: "ferrothorn", data: { level: 84, sets: [...] } },
    { species: "tapu_koko", data: { level: 78, sets: [...] } },
    { species: "toxapex", data: { level: 86, sets: [...] } }
  ]
}
```

### Little Cup

```json5
{
  name: "Random LC",
  description: "Little Cup - unevolved Pokemon only",
  teamSize: 6,
  leadCount: 1,
  enabled: true,
  pokemon: [
    { species: "mienfoo", data: { level: 5, sets: [...] } },
    { species: "pawniard", data: { level: 5, sets: [...] } },
    { species: "foongus", data: { level: 5, sets: [...] } }
  ]
}
```

---

## Related Documentation

- [Battle Formats](battle-formats.md) - All supported battle formats
- [Matchmaking](dynamic-matchmaking.md) - Random battle queue system
- [Configuration Guide](../configuration/config.md) - Random battle settings

---

**Configuration Files:**
- Main: `config/cobbleranked/config.json5` → `randomBattle` section
- Pools: `config/cobbleranked/randombattle/pools/*.json5`
