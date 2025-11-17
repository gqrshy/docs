# Glossary

Technical terms and concepts used in CobbleRanked documentation.

---

## Rating Systems

### Elo Rating
A numerical skill ranking system that calculates player strength based on match results. In CobbleRanked, players start at 1000 Elo by default.

**Related:** [Elo System](features/elo-system.md)

### K-Factor
A coefficient that determines how much Elo changes per match. Higher K-factor = faster rating changes.
- New players (< 10 matches): K = 64
- Established players: K = 32

**Related:** [Elo System Configuration](configuration/config.md#elo-system)

### RD (Rating Deviation)
In Glicko-2 system, represents uncertainty in a player's rating. Higher RD = less certain rating.
- New players: RD = 350
- Experienced players: RD ≈ 50-100
- Increases when inactive

**Related:** [Glicko-2 Mode](features/elo-system.md#glicko-2-advanced)

### Provisional Matches
The first 10 matches for new players where Elo changes more dramatically (K-factor doubled).

**Related:** [K-Factor Guide](features/elo-system.md#k-factor-guide-pokemon-showdown-mode)

### Elo Decay
System that reduces inactive players' Elo over time to prevent ladder stagnation.
- Default: -2 Elo per day after inactivity
- Runs daily at UTC 9:00

**Related:** [Elo Decay Configuration](features/elo-system.md#elo-decay)

---

## Battle System

### Battle Clauses
Rules enforced to ensure fair competitive battles:

#### Species Clause
Prevents duplicate Pokemon on the same team (default: enabled).

#### OHKO Clause
Bans one-hit knockout moves like Fissure, Sheer Cold (default: enabled).

#### Sleep Clause
Prevents putting 2+ opponent Pokemon to sleep simultaneously (default: enabled).

#### Evasion Clause
Bans moves that boost evasion (Minimize, Double Team) (default: enabled).

#### Item Clause
Prevents duplicate held items on the same team (default: disabled).

#### Dynamax Clause
Bans Dynamax/Gigantamax (default: enabled).

**Related:** [Battle Formats](features/ranked-battles.md#battle-clauses)

### OHKO Moves
One-Hit Knockout moves that bypass normal damage calculation:
- Fissure
- Sheer Cold
- Horn Drill
- Guillotine

**Related:** [Blacklist Configuration](configuration/blacklist.md)

### Battle Formats

#### Singles (1v1)
- Team: 3-6 Pokemon
- Active: 1 vs 1
- Independent Elo ranking

#### Doubles (2v2)
- Team: 4-6 Pokemon
- Active: 2 vs 2
- VGC-style format
- Independent Elo ranking

#### Multi Battle (2v2 Teams)
- Team: 1-3 Pokemon per player
- Active: 2 vs 2
- Shares Elo with party members

**Related:** [Battle Formats](features/ranked-battles.md)

---

## Server Systems

### Arena
A designated battle location with saved coordinates and facing direction. Players teleport to arenas when matches start.

**Command:** `/rankedadmin arena set <name>`

**Related:** [Arena Setup](configuration/arenas.md)

### Flee Penalty
Temporary matchmaking ban for abandoning battles:
- 1-5 flees: 5 min ban
- 6-10 flees: 15 min ban
- 11+ flees: 30 min ban
- Decay: -1 flee every 24 hours

**Related:** [Disconnect Penalties](features/disconnect-penalties.md)

### Cross-Server
Multi-server architecture sharing rankings across network:
- Requires: MySQL/MongoDB + Redis
- Separates lobby servers from battle servers
- Synchronizes Elo in real-time

**Related:** [Cross-Server Setup](advanced/cross-server.md)

### Matchmaking Range
The Elo difference allowed when finding opponents:
- Initial: ±200 Elo
- Expands after 30 seconds
- Maximum: ±600 Elo (3.0x multiplier)

**Related:** [Elo System](features/elo-system.md)

---

## Configuration

### JSON5
An extended JSON format that allows comments (`//` and `/* */`). All CobbleRanked config files use JSON5.

**Example:**
```json5
{
  // This is a comment
  "initialElo": 1000,  // Trailing comma allowed
}
```

**Related:** All configuration pages

### Blacklist
System for restricting Pokemon, moves, abilities, and items in ranked battles.

**Categories:**
- Pokemon labels (legendary, mythical, etc.)
- Specific Pokemon (Mewtwo, Rayquaza)
- Moves (Baton Pass, Last Respects)
- Abilities (Moody, Shadow Tag)
- Items (King's Rock, Berserk Gene)

**Related:** [Blacklist Configuration](configuration/blacklist.md)

### Label
Pokemon category tags used for blacklisting:
- `legendary` - Legendary Pokemon
- `mythical` - Mythical Pokemon
- `restricted` - VGC restricted Pokemon
- `ultra_beast` - Ultra Beasts
- `paradox` - Paradox Pokemon
- `sub_legendary` - Lesser legendaries

**Related:** [Blacklist Labels](configuration/blacklist.md#label-categories)

### Restricted Label Limits
VGC-style restrictions allowing limited usage instead of full ban.

**Example:** Allow max 2 restricted legendaries per team
```json5
{
  "restricted_label_limits": {
    "restricted": 2
  }
}
```

**Related:** [Label Limits](configuration/blacklist.md#label-limits-vgc-style)

---

## Season System

### Season
Time-limited competitive period (default: 30 days) after which rankings reset.

**Features:**
- Auto-rotation
- Top 3 player rewards
- Elo reset to initial value
- Win/loss statistics reset

**Related:** [Seasons](features/seasons.md)

### Season Rewards
Prizes given to top-ranked players at season end, configured per format (Singles/Doubles/Multi).

**Example:**
```json5
{
  "rewards": {
    "1": ["give %player% diamond 64"],
    "2": ["give %player% emerald 48"],
    "3": ["give %player% gold_ingot 32"]
  }
}
```

**Related:** [Rewards Configuration](configuration/rewards.md)

### Milestone Rewards
Achievement-based rewards for reaching win count or Elo milestones.

**Example:**
```json5
{
  "win_milestones": {
    "10": ["give %player% rare_candy 5"],
    "50": ["give %player% master_ball 1"]
  }
}
```

**Related:** [Milestone Rewards](configuration/rewards.md#milestone-rewards)

---

## Technical Terms

### Redis
In-memory data store used for real-time cross-server communication and queue synchronization.

**Required for:** Cross-server setups

**Related:** [Database Configuration](advanced/database.md#redis-configuration)

### SQLite
Default embedded database. Stores player stats, Elo, and match history locally.

**Limitations:** Single-server only (no cross-server)

**Related:** [Database Configuration](advanced/database.md)

### MySQL
Relational database for cross-server setups (2-5 servers recommended).

**Related:** [Database Configuration](advanced/database.md#mysql)

### MongoDB
NoSQL database for cross-server setups (5+ servers, cloud-friendly).

**Related:** [Database Configuration](advanced/database.md#mongodb)

### Velocity
Modern Minecraft proxy for connecting multiple servers in a network.

**Required for:** Cross-server ranked battles

**Related:** [Cross-Server Setup](advanced/cross-server.md)

---

## Player Systems

### Queue
Matchmaking system that pairs players based on Elo and format preference.

**Behavior:**
- Searches within Elo range
- Expands range every 30 seconds
- Auto-cancels after max range reached

**Related:** [Ranked Battles](features/ranked-battles.md)

### Leaderboard
Real-time top 10 rankings per format, updated after each match.

**Display:** `/ranked` GUI or in-game commands

**Related:** [Leaderboards](features/leaderboards.md)

### Turn Timer
Optional time limit per turn to prevent stalling.

**Default:** Disabled (no time limit)

**Related:** [Turn Timer](features/turn-timer.md)

---

## Next Steps

### For Learning the System
1. **[Elo System](features/elo-system.md)** - Deep dive into rating calculations
2. **[Battle Formats](features/ranked-battles.md)** - Understand Singles, Doubles, and Multi
3. **[Season System](features/seasons.md)** - Learn how competitive periods work

### For Configuration
1. **[Main Configuration](configuration/config.md)** - Apply glossary terms to real settings
2. **[Blacklist Configuration](configuration/blacklist.md)** - Use labels and restrictions
3. **[Cross-Server Setup](advanced/cross-server.md)** - Implement distributed architecture

---

## Related Pages
- [FAQ](support/faq.md) - Common questions answered
- [Troubleshooting](support/troubleshooting.md) - Problem solving guide
- [README](README.md) - Project overview and features
