# Casual Missions

Complete mission and reward system for casual battles with daily, weekly, and milestone challenges.

---

## Overview

The Casual Mission System provides players with daily and weekly objectives to earn rewards while playing casual battles. Complete missions to earn items, experience candies, and exclusive titles.

**Key Features:**
- Daily missions (reset at configured time)
- Weekly missions (reset on configured day)
- Milestone rewards for long-term achievements
- Automatic progress tracking
- Pending rewards for offline players

---

## Mission Types

### MATCH_COUNT
Play a specific number of matches.

**Example:** "Play 3 casual matches"

### WIN_COUNT
Win a specific number of matches.

**Example:** "Win 2 matches"

### POKEMON_TYPE_USAGE
Use Pokemon of specific types in matches.

**Example:** "Use Fire-type Pokemon in 5 matches"

**Supported Types:** normal, fire, water, grass, electric, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy

### FORMAT_PARTICIPATION
Play matches in a specific format.

**Example:** "Play 10 Singles matches"

**Supported Formats:** SINGLES, DOUBLES, TRIPLES, MULTI

### POKEMON_DEFEATED
Defeat a cumulative number of Pokemon.

**Example:** "Defeat 30 Pokemon total"

**Note:** Counts all defeated Pokemon across all matches.

### WIN_STREAK
Achieve consecutive wins.

**Example:** "Win 3 matches in a row"

**Note:** Resets when you lose a match.

### GENERATION_USAGE
Use Pokemon from specific generations.

**Example:** "Use Gen 1 Pokemon in 2 matches"

**Generations:**
- 1 = Kanto
- 2 = Johto
- 3 = Hoenn
- 4 = Sinnoh
- 5 = Unova
- 6 = Kalos
- 7 = Alola
- 8 = Galar
- 9 = Paldea

### EVOLUTION_STAGE
Use Pokemon at specific evolution stages.

**Example:** "Use fully evolved Pokemon in 5 matches"

**Stages:**
- `FIRST` - Basic/unevolved Pokemon (e.g., Bulbasaur, Pikachu)
- `MIDDLE` - Middle evolution (e.g., Ivysaur, Charmeleon)
- `FINAL` - Final evolution (e.g., Venusaur, Charizard)
- `SINGLE` - Pokemon with no evolutions (e.g., Ditto, Unown)

---

## Default Missions

### Daily Missions

Reset daily at configured time (default: 00:00 UTC).

| Mission | Type | Goal | Rewards |
|---------|------|------|---------|
| Daily Challenge | MATCH_COUNT | Play 3 matches | 2x Exp Candy M |
| Daily Victor | WIN_COUNT | Win 2 matches | 1x Exp Candy L |
| Singles Starter | FORMAT_PARTICIPATION | Play 1 Singles match | 3x Potion |
| Pokemon Hunter | POKEMON_DEFEATED | Defeat 5 Pokemon | 3x Exp Candy S |
| Kanto Nostalgia | GENERATION_USAGE | Use Gen 1 Pokemon in 2 matches | Old Amber + Helix Fossil |

### Weekly Missions

Reset weekly on configured day (default: Monday 00:00 UTC).

| Mission | Type | Goal | Rewards |
|---------|------|------|---------|
| Weekly Warrior | MATCH_COUNT | Play 15 matches | 10x Exp Candy M |
| Victory Streak | WIN_COUNT | Win 10 matches | 5x Exp Candy L |
| Fire Master | POKEMON_TYPE_USAGE | Use Fire Pokemon in 5 matches | Charcoal + 5x Exp Candy M |
| Water Expert | POKEMON_TYPE_USAGE | Use Water Pokemon in 5 matches | Mystic Water + 5x Exp Candy M |
| Singles Specialist | FORMAT_PARTICIPATION | Play 10 Singles matches | Choice Band |
| Doubles Expert | FORMAT_PARTICIPATION | Play 10 Doubles matches | Choice Scarf |
| Mass Defeat | POKEMON_DEFEATED | Defeat 30 Pokemon | 10x Exp Candy L |
| Win Streak Master | WIN_STREAK | Win 3 matches in a row | Lucky Egg |
| Final Form Focus | EVOLUTION_STAGE | Use fully evolved Pokemon in 5 matches | 5x Rare Candy |
| Unevolved Challenge | EVOLUTION_STAGE | Use unevolved Pokemon in 3 matches | Eviolite |
| Modern Era | GENERATION_USAGE | Use Gen 8-9 Pokemon in 5 matches | 5x Exp Candy XL |

---

## Milestone Rewards

One-time rewards earned based on cumulative stats. Cannot be claimed again once received.

| Milestone | Requirement | Rewards |
|-----------|-------------|---------|
| Newcomer | 10 total matches | 16x Iron Ingot + 5x Exp Candy M |
| Regular | 50 total matches | 32x Gold Ingot + 10x Exp Candy L |
| Veteran | 100 total matches | 32x Diamond + 15x Exp Candy XL |
| Winner | 25 total wins | 32x Emerald + 10x Rare Candy |
| Champion | 50 total wins | 1x Nether Star + 20x Rare Candy |
| Casual Legend | 100 total wins | 1x Beacon + 50x Rare Candy + Title |

---

## How to Use

### For Players

**Open Mission Menu:**
```bash
/casual
```
Click "Missions" button to view:
- Active daily missions
- Active weekly missions
- Available milestone rewards
- Progress for each mission

**Claim Rewards:**
- Click completed missions to claim rewards
- Rewards are added to your inventory immediately
- If inventory is full, items drop at your location

**Check Progress:**
- Mission progress updates in real-time
- Green checkmark = Completed
- Yellow bar = In progress
- Gray = Not started

### For Server Admins

**Configure Missions:**

Edit `config/cobbleranked/casual_missions.json5`:

<details>
<summary><strong>Click to view example configuration</strong></summary>

```json5
{
  "daily_missions": {
    "daily_matches_3": {
      "type": "MATCH_COUNT",
      "target_value": 3,
      "display_name": "§6Daily Challenge",
      "description": [
        "§7Play 3 casual matches",
        "§7Any format counts!"
      ],
      "rewards": [
        "give {player} cobblemon:exp_candy_m 2"
      ],
      "parameters": {}
    }
  },
  "weekly_missions": {
    "weekly_fire_usage": {
      "type": "POKEMON_TYPE_USAGE",
      "target_value": 5,
      "display_name": "§6Fire Master",
      "description": [
        "§7Use Fire-type Pokemon",
        "§7in 5 matches"
      ],
      "rewards": [
        "give {player} cobblemon:charcoal 1",
        "give {player} cobblemon:exp_candy_m 5"
      ],
      "parameters": {
        "types": ["fire"]
      }
    }
  },
  "milestone_rewards": {
    "milestone_100_matches": {
      "type": "MATCH_COUNT",
      "target_value": 100,
      "display_name": "§6§lVeteran",
      "description": [
        "§7Complete 100 total matches"
      ],
      "rewards": [
        "give {player} minecraft:diamond 32",
        "give {player} cobblemon:exp_candy_xl 15"
      ]
    }
  },
  "reset_settings": {
    "daily_reset_time": "00:00",
    "daily_reset_timezone": "UTC",
    "weekly_reset_day": "MONDAY",
    "weekly_reset_time": "00:00",
    "auto_claim": false,
    "announce_completion": true
  }
}
```

</details>

**Reset Settings:**

| Setting | Description | Default |
|---------|-------------|---------|
| `daily_reset_time` | Time to reset daily missions (24h format) | `"00:00"` |
| `daily_reset_timezone` | Timezone for daily reset | `"UTC"` |
| `weekly_reset_day` | Day to reset weekly missions | `"MONDAY"` |
| `weekly_reset_time` | Time to reset weekly missions | `"00:00"` |
| `auto_claim` | Auto-claim rewards (true) or manual (false) | `false` |
| `announce_completion` | Announce mission completion in chat | `true` |

**Weekly Reset Days:**
`MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`

**Supported Timezones:**
`UTC`, `America/New_York`, `Europe/London`, `Asia/Tokyo`, etc. (Java timezone IDs)

---

## Pending Rewards System

When players complete missions while offline or when the server restarts, rewards are saved as "pending" and delivered on next login.

**Features:**
- Rewards persist across server restarts
- Automatic notification on login
- View pending rewards in `/casual` menu
- Database-backed (SQLite/MySQL/MongoDB)

**Player Experience:**
```
[CobbleRanked] You have 3 pending rewards!
[CobbleRanked] Use /casual to claim them.
```

---

## GUI Customization

Customize mission GUI appearance in `config/cobbleranked/gui/casual_missions_gui.json5`.

**Configurable Elements:**
- Background pattern
- Mission item icons
- Progress bar colors
- Button positions
- Text formatting

---

## Database Tables

### casual_mission_progress
Tracks mission progress for each player.

**Columns:**
- `player_uuid` - Player UUID
- `mission_id` - Mission identifier
- `mission_type` - Mission type (DAILY/WEEKLY/MILESTONE)
- `current_progress` - Current progress value
- `is_completed` - Completion status
- `last_updated` - Last progress update timestamp

### casual_milestone_claims
Records claimed milestone rewards.

**Columns:**
- `player_uuid` - Player UUID
- `milestone_id` - Milestone identifier
- `claimed_at` - Claim timestamp

### pending_rewards
Stores unclaimed rewards for offline players.

**Columns:**
- `player_uuid` - Player UUID
- `reward_type` - Type of reward
- `reward_data` - Reward details (JSON)
- `created_at` - When reward was earned

---

## Commands

### Player Commands

```bash
/casual                  # Open casual battle menu
```

**Permissions:** None (available to all players)

### Admin Commands

No admin commands specific to missions. Configure via files.

---

## Configuration Examples

### Custom Daily Mission

Create a mission to use Dragon-type Pokemon:

```json5
"daily_dragon_master": {
  "type": "POKEMON_TYPE_USAGE",
  "target_value": 3,
  "display_name": "§5Dragon Tamer",
  "description": [
    "§7Use Dragon-type Pokemon",
    "§7in 3 matches"
  ],
  "rewards": [
    "give {player} cobblemon:dragon_fang 1",
    "give {player} cobblemon:exp_candy_l 3"
  ],
  "parameters": {
    "types": ["dragon"]
  }
}
```

### Custom Milestone

Create a milestone for 200 wins:

```json5
"milestone_200_wins": {
  "type": "WIN_COUNT",
  "target_value": 200,
  "display_name": "§6§lGrandmaster",
  "description": [
    "§7Win 200 total matches"
  ],
  "rewards": [
    "give {player} minecraft:nether_star 5",
    "give {player} cobblemon:rare_candy 100",
    "lp user {player} permission set ranked.title.grandmaster true"
  ]
}
```

### Multiple Type Mission

Create a mission requiring both Fire and Water types:

```json5
"weekly_fire_water_combo": {
  "type": "POKEMON_TYPE_USAGE",
  "target_value": 10,
  "display_name": "§6Elemental Balance",
  "description": [
    "§7Use Fire or Water Pokemon",
    "§7in 10 matches"
  ],
  "rewards": [
    "give {player} cobblemon:charcoal 1",
    "give {player} cobblemon:mystic_water 1",
    "give {player} cobblemon:exp_candy_xl 5"
  ],
  "parameters": {
    "types": ["fire", "water"]
  }
}
```

---

## Troubleshooting

Having issues with missions? See the [Troubleshooting Guide](../support/troubleshooting.md#casual-missions-issues) for solutions to common problems:

- Missions not resetting
- Progress not tracking
- Rewards not received
- Mission not completing
- Pending rewards not appearing

---

## See Also

- [Casual Battles Overview](../features/casual-battles.md) - Main casual battle system
- [Rewards System](../configuration/rewards.md) - Other reward configurations
- [Commands Reference](../getting-started/commands.md) - All available commands
