# Battle Formats

Learn about the different battle formats available in CobbleRanked.

## Overview

CobbleRanked supports **two battle formats**, each with independent rankings:

- **Singles (1v1)** - Classic one-on-one battles
- **Doubles (2v2)** - Two Pokemon active per side

Each format has:
- ✅ Separate Elo rating
- ✅ Independent leaderboard
- ✅ Format-specific statistics
- ✅ Separate reward tracks

**Players can compete in both formats simultaneously!**

---

## Singles Format

### Overview

**Format:** 1v1
**Active Pokemon:** 1 per side
**Team size:** 6 Pokemon
**Showdown format:** `GEN_9_SINGLES`

The classic Pokemon battle format where one Pokemon from each side is active at a time.

### How Singles Works

1. **Select lead Pokemon** at battle start
2. **One Pokemon active** per side
3. **Switch freely** (following standard battle rules)
4. **First to defeat** all opponent Pokemon wins

### Strategy

**Singles emphasizes:**
- **Individual Pokemon strength** - Each Pokemon must hold its own
- **Type coverage** - Need answers to many threats
- **Momentum control** - Switching vs staying in
- **Prediction** - Anticipating opponent switches

**Common archetypes:**
- **Balanced** - Mix of offense, defense, utility
- **Hyper Offense** - Fast, hard-hitting sweepers
- **Stall** - Defensive walls, recovery, status
- **Weather teams** - Rain, Sun, Sand, Snow synergy

### Example Team Structure

```
1. Lead (usually fast or bulky setup)
2. Physical Attacker
3. Special Attacker
4. Defensive Wall
5. Support/Utility
6. Late-game Sweeper
```

---

## Doubles Format

### Overview

**Format:** 2v2
**Active Pokemon:** 2 per side
**Team size:** 6 Pokemon
**Showdown format:** `GEN_9_DOUBLES`

Similar to VGC (Video Game Championships) format where two Pokemon are active per side.

### How Doubles Works

1. **Select lead pair** (2 Pokemon) at battle start
2. **Two Pokemon active** per side
3. **Target selection** - Choose which opponent to attack
4. **Switch either Pokemon** freely
5. **First to defeat** all opponent Pokemon wins

### Strategy

**Doubles emphasizes:**
- **Team synergy** - Pokemon must work together
- **Spread moves** - Attacks hitting both opponents (Earthquake, Dazzling Gleam)
- **Redirection** - Follow Me, Rage Powder, Storm Drain
- **Speed control** - Tailwind, Trick Room, Icy Wind
- **Protect usage** - Essential for surviving focused attacks

**Common strategies:**
- **Trick Room** - Slow, powerful Pokemon dominate
- **Tailwind** - Speed boost for 4 turns
- **Weather + Abusers** - Rain + Swift Swim, etc.
- **Redirection + Setup** - Protect partner while setting up

### Example Team Structure

```
1. Fast Support (Tailwind, Fake Out)
2. Primary Attacker
3. Secondary Attacker
4. Defensive Support (Redirection)
5. Weather Setter
6. Trick Room Attacker
```

---

## Format Comparison

| Aspect | Singles | Doubles |
|--------|---------|---------|
| **Complexity** | Moderate | High |
| **Battle Length** | Longer | Shorter |
| **Teambuilding** | Individual strength | Team synergy |
| **Key Skills** | Prediction, momentum | Positioning, synergy |
| **Switching** | Frequent | Selective |
| **Popular Abilities** | Speed Boost, Regenerator | Intimidate, Follow Me |
| **Common Items** | Choice items, Leftovers | Focus Sash, Sitrus Berry |

---

## Independent Rankings

### Format-Specific Stats

Each format tracks separately:

**Player A's stats:**
```
Singles:
  - Elo: 1200
  - Wins: 15
  - Losses: 8
  - Win Rate: 65%

Doubles:
  - Elo: 1000
  - Wins: 0
  - Losses: 0
  - Win Rate: N/A
```

**Why independent?**
- Different skill sets
- Different team building
- Fair competition within format
- Encourages trying both formats

### Viewing Format Stats

**Check your stats:**
```bash
/stats
```

Shows stats for all formats.

**Leaderboard:**
```bash
/leaderboard singles
/leaderboard doubles
```

---

## Format Selection

### Joining Queue

1. **Open ranked GUI:** `/ranked`
2. **Click format button:**
   - "Join Singles Queue" button
   - "Join Doubles Queue" button
3. **Wait for match**
4. **Battle starts** when opponent found

### Format-Specific Matchmaking

**Players only match with same format:**
- Singles queue → Only matches Singles players
- Doubles queue → Only matches Doubles players

**Example:**
- Player A joins Singles queue (1200 Elo)
- Player B joins Doubles queue (1200 Elo)
- Result: **No match** (different formats)

---

## Format-Specific Rewards

### Season Rewards

Separate rewards for each format:

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "display": "&6&l🏆 Singles Champion",
        "commands": ["give {player} minecraft:diamond 64"]
      }
    },
    "doubles": {
      "rank_1": {
        "display": "&6&l🏆 Doubles Champion",
        "commands": ["give {player} minecraft:diamond 64"]
      }
    }
  }
}
```

**Players can earn rewards in BOTH formats!**

### Milestone Rewards

Format-specific milestones:

```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ Singles Winner",
        "commands": ["give {player} minecraft:gold_ingot 10"]
      }
    },
    "doubles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ Doubles Winner",
        "commands": ["give {player} minecraft:gold_ingot 10"]
      }
    }
  }
}
```

**Same milestones, different formats = can earn twice!**

See [Rewards System](../configuration/rewards.md) for details.

---

## Battle Mechanics

### Level Cap

Force all Pokemon to same level:

```json5
{
  "battle": {
    "levelMatch": 70,        // Battle at level 70
    "forceLevelCap": true    // Enforce level cap
  }
}
```

**Common levels:**
- **50** - VGC official format
- **70** - Balanced competitive level
- **100** - Full power battles

### Turn Limit

Prevent infinitely long battles:

```json5
{
  "battle": {
    "maxTurns": 100  // Battle ends in draw after 100 turns
  }
}
```

**Typical turn counts:**
- Singles: 20-50 turns
- Doubles: 10-30 turns
- Stall battles: 50-100 turns

**If turn limit reached:**
- Battle ends in draw
- No Elo change
- No win/loss recorded

### Battle Clauses

Competitive rules enforced:

```json5
{
  "battle": {
    "clauses": {
      "sleepClause": true,      // Only 1 opponent can be asleep
      "speciesClause": false,   // No duplicate Pokemon
      "evasionClause": true,    // Ban evasion moves
      "ohkoClause": true,       // Ban OHKO moves
      "moodyClause": true       // Ban Moody ability
    }
  }
}
```

See [Main Configuration](../configuration/config.md#battle-clauses) for details.

---

## Teambuilding Tips

### Singles Tips

**✅ DO:**
- Include both physical and special attackers
- Have speed tiers covered (fast, medium, slow)
- Bring status moves (Thunder Wave, Will-O-Wisp)
- Pack healing (Leftovers, Regenerator)
- Consider setup sweepers (Dragon Dance, Calm Mind)

**❌ DON'T:**
- Use all physical or all special attackers
- Ignore defensive Pokemon entirely
- Rely on one win condition
- Forget about priority moves

**Core types to cover:**
- Steel, Fairy, Ground, Water, Dragon

### Doubles Tips

**✅ DO:**
- Practice with spread moves (Earthquake, Rock Slide)
- Include speed control (Tailwind, Trick Room)
- Use Protect liberally
- Consider redirection (Follow Me, Rage Powder)
- Bring supportive abilities (Intimidate, Friend Guard)

**❌ DON'T:**
- Ignore your partner (friendly fire!)
- Use all slow Pokemon without Trick Room
- Forget about Focus Sash
- Overlook weather/terrain synergy

**Popular combos:**
- Tailwind + Fast Sweepers
- Trick Room + Slow Attackers
- Rain + Swift Swim
- Fake Out + Setup Move

---

## Format-Specific Blacklist

You can ban Pokemon/moves differently per format:

**Example: Ban Ditto in Singles only**

Not directly supported, but you can:
1. Ban globally in `blacklist.json5`
2. Communicate rules to players
3. Manual enforcement

**Future feature:** Format-specific blacklists may be added.

---

## Switching Between Formats

### Can I play both?

**Yes!** Players can compete in both formats:

**Player journey:**
1. Play 10 Singles matches → Earn Singles rewards
2. Switch to Doubles → Start at 1000 Elo
3. Play 10 Doubles matches → Earn Doubles rewards
4. Continue either format anytime

**No penalty for switching!**

### Which format should I play?

**Play Singles if you like:**
- 1v1 battles
- Individual Pokemon strength
- Prediction-based gameplay
- Traditional Pokemon battles

**Play Doubles if you like:**
- Team synergy
- Strategic complexity
- VGC-style battles
- Faster battles

**Play both if you want:**
- Maximum rewards
- Variety in gameplay
- Test different teams
- Complete ladder experience

---

## Leaderboard

### Format-Filtered Leaderboards

View top players by format:

```bash
/leaderboard singles
/leaderboard doubles
```

**Output (Singles):**
```
━━━━━━━━━━━━━━━━━━━━━━━━
   SINGLES LEADERBOARD
━━━━━━━━━━━━━━━━━━━━━━━━

1. PlayerA - 1847 Elo
2. PlayerB - 1726 Elo
3. PlayerC - 1689 Elo
4. PlayerD - 1654 Elo
5. PlayerE - 1621 Elo
```

**Separate rankings:**
- Singles leaderboard only shows Singles Elo
- Doubles leaderboard only shows Doubles Elo
- Players can be top 1 in both!

---

## Statistics

### Format Statistics

Track your performance per format:

**Singles:**
- Elo: 1200
- Matches: 23 (15W - 8L)
- Win Rate: 65.2%
- Current Rank: #5

**Doubles:**
- Elo: 1050
- Matches: 12 (7W - 5L)
- Win Rate: 58.3%
- Current Rank: #12

**Overall:**
- Total Matches: 35
- Total Wins: 22
- Total Win Rate: 62.9%

---

## Frequently Asked Questions

### Do I need different teams for each format?

**Yes!** Teams optimized for Singles usually don't work well in Doubles and vice versa.

**Differences:**
- Singles: Individual strength focus
- Doubles: Team synergy focus

**Recommendation:** Build separate teams.

### Can I earn rewards in both formats?

**Yes!** Format rewards are independent.

**Example:**
- Rank 1 in Singles → Singles Champion Reward
- Rank 1 in Doubles → Doubles Champion Reward
- Total: Both rewards!

### Which format is more popular?

**Varies by server**, but typically:
- **Singles:** More popular (traditional format)
- **Doubles:** Competitive scene (VGC players)

**Check your server:**
```bash
/leaderboard singles
/leaderboard doubles
```

Compare player counts.

### Can I switch formats mid-season?

**Yes!** Switch anytime.

**Elo and stats:**
- Format Elo stays separate
- Can earn milestones in both
- Season rewards based on format

---

**Next:** Learn about [Leaderboards](leaderboards.md) for ranking display and tracking.
