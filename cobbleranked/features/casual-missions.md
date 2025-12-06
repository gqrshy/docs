# Casual Battles

Non-competitive Pokemon battles with no Elo changes, integrated mission system, and separate rewards.

---

<details>
<summary><strong>Default casual_battles.json5 (Full Configuration)</strong></summary>

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  CASUAL BATTLES CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "enabled": false,

  "battle": {
    "level_match": 50,
    "team_size": 3,
    "turn_timeout_seconds": 60,
    "match_duration_minutes": 10,
    "allow_held_items": true,
    "allow_duplicates": true
  },

  "queue": {
    "separate_queue": true,
    "match_by_elo": false,
    "max_wait_time": 120,
    "min_players_for_match": 2
  },

  "rewards": {
    "enabled": true,
    "victory_commands": [
      "give {player} cobblemon:exp_candy_s 1"
    ],
    "defeat_commands": [
      "give {player} cobblemon:potion 1"
    ],
    "participation_commands": [],
    "daily_limit": -1,
    "cooldown_minutes": 0,
    "announce_rewards": false
  },

  "statistics": {
    "track_wins": true,
    "track_losses": true,
    "track_winrate": true,
    "show_in_stats_command": true,
    "separate_from_ranked": true,
    "reset_with_season": false
  },

  "missions": {
    "enabled": true,
    "daily_reset_time": "00:00",
    "daily_reset_timezone": "UTC",
    "weekly_reset_day": "MONDAY",
    "weekly_reset_time": "00:00",
    "weekly_reset_timezone": "UTC",
    "auto_claim": false,
    "announce_completion": true
  },

  "music": {
    "queue_music": [
      {"music": "cobbleranked:music.queue.bw_10", "volume": 0.5, "pitch": 1.0}
    ],
    "team_selection_music": [
      {"music": "cobbleranked:music.selection.team_selection_music", "volume": 1.0, "pitch": 1.0}
    ],
    "battle_music": [
      {"music": "cobbleranked:music.battle.normal.xy_trainer", "volume": 0.5, "pitch": 1.0}
    ]
  },

  "sounds": {
    "match_found": {"sound": "minecraft:entity.experience_orb.pickup", "volume": 0.8, "pitch": 1.0},
    "ready_countdown": {"sound": "minecraft:entity.experience_orb.pickup", "volume": 0.7, "pitch": 0.7},
    "turn_timer_warning": {"sound": "minecraft:block.note_block.harp", "volume": 2.0, "pitch": 1.5}
  }
}
```

</details>

---

## File Location

`config/cobbleranked/casual/casual_battles.json5`

---

## Overview

Casual Battles provide a relaxed alternative to ranked matches. Players can practice, test teams, and enjoy battles without competitive pressure.

**Key Features:**
- No Elo gain/loss
- Separate queue from ranked
- Daily & weekly missions with rewards
- Match rewards (victory/defeat)
- Separate statistics tracking
- Custom music and sounds

---

## Casual vs Ranked

| Feature | Casual | Ranked |
|---------|--------|--------|
| Elo Changes | ❌ No | ✅ Yes |
| Mission System | ✅ Yes | ❌ No |
| Match Rewards | ✅ Yes | ❌ No |
| Leaderboard | ❌ No | ✅ Yes |
| Season Rewards | ❌ No | ✅ Yes |
| Blacklist Rules | Same | Same |
| Separate Stats | ✅ Yes | ✅ Yes |

---

## Enabling Casual Battles

Set `enabled` to `true` in `casual_battles.json5`:

```json5
{
  "enabled": true
}
```

Then reload:
```
/rankedadmin reload
```

---

## Battle Settings

Configure battle rules for casual mode:

```json5
"battle": {
  "level_match": 50,
  "team_size": 3,
  "turn_timeout_seconds": 60,
  "match_duration_minutes": 10,
  "allow_held_items": true,
  "allow_duplicates": true
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `level_match` | `50` | Force all Pokemon to this level (0 = original levels) |
| `team_size` | `3` | Number of Pokemon per team |
| `turn_timeout_seconds` | `60` | Turn timer in seconds (0 = disabled) |
| `match_duration_minutes` | `10` | Match time limit (0 = unlimited) |
| `allow_held_items` | `true` | Allow Pokemon to hold items |
| `allow_duplicates` | `true` | Allow duplicate Pokemon species |

---

## Queue Settings

Configure matchmaking behavior:

```json5
"queue": {
  "separate_queue": true,
  "match_by_elo": false,
  "max_wait_time": 120,
  "min_players_for_match": 2
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `separate_queue` | `true` | Use separate queue from ranked |
| `match_by_elo` | `false` | Match by Elo similarity (false = random) |
| `max_wait_time` | `120` | Maximum queue wait time in seconds |
| `min_players_for_match` | `2` | Minimum players to start a match |

---

## Match Rewards

Configure rewards given after each casual match:

```json5
"rewards": {
  "enabled": true,
  "victory_commands": [
    "give {player} cobblemon:exp_candy_s 1"
  ],
  "defeat_commands": [
    "give {player} cobblemon:potion 1"
  ],
  "participation_commands": [],
  "daily_limit": -1,
  "cooldown_minutes": 0,
  "announce_rewards": false
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable match rewards |
| `victory_commands` | 1x Exp Candy S | Commands executed on victory |
| `defeat_commands` | 1x Potion | Commands executed on defeat |
| `participation_commands` | none | Commands for both players |
| `daily_limit` | `-1` | Daily reward limit (-1 = unlimited) |
| `cooldown_minutes` | `0` | Cooldown between rewards |
| `announce_rewards` | `false` | Announce rewards in chat |

**Placeholder:** `{player}` = player username

---

## Statistics Tracking

Configure casual battle statistics:

```json5
"statistics": {
  "track_wins": true,
  "track_losses": true,
  "track_winrate": true,
  "show_in_stats_command": true,
  "separate_from_ranked": true,
  "reset_with_season": false
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `track_wins` | `true` | Track win count |
| `track_losses` | `true` | Track loss count |
| `track_winrate` | `true` | Calculate win rate |
| `show_in_stats_command` | `true` | Show in `/stats` command |
| `separate_from_ranked` | `true` | Keep stats separate from ranked |
| `reset_with_season` | `false` | Reset when ranked season resets |

---

## Commands

| Command | Description |
|---------|-------------|
| `/casual` | Open casual battle menu |
| `/casual missions` | Open missions GUI directly |

---

## Mission System

The mission system provides daily and weekly objectives to earn rewards.

### Mission Settings

```json5
"missions": {
  "enabled": true,
  "daily_reset_time": "00:00",
  "daily_reset_timezone": "UTC",
  "weekly_reset_day": "MONDAY",
  "weekly_reset_time": "00:00",
  "weekly_reset_timezone": "UTC",
  "auto_claim": false,
  "announce_completion": true
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable mission system |
| `daily_reset_time` | `"00:00"` | Daily reset time (24h format) |
| `daily_reset_timezone` | `"UTC"` | Timezone for daily reset |
| `weekly_reset_day` | `"MONDAY"` | Day to reset weekly missions |
| `weekly_reset_time` | `"00:00"` | Weekly reset time |
| `auto_claim` | `false` | Auto-claim rewards on completion |
| `announce_completion` | `true` | Announce completion in chat |

**Weekly Reset Days:** `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`

### Mission Configuration File

Mission definitions are in a separate file: `config/cobbleranked/casual/casual_missions.json5`

---

## Mission Types

| Type | Description | Example |
|------|-------------|---------|
| `MATCH_COUNT` | Play matches | "Play 3 casual matches" |
| `WIN_COUNT` | Win matches | "Win 2 matches" |
| `POKEMON_TYPE_USAGE` | Use specific type Pokemon | "Use Fire Pokemon in 5 matches" |
| `FORMAT_PARTICIPATION` | Play specific format | "Play 10 Singles matches" |
| `POKEMON_DEFEATED` | Defeat Pokemon count | "Defeat 30 Pokemon total" |
| `WIN_STREAK` | Consecutive wins | "Win 3 matches in a row" |
| `GENERATION_USAGE` | Use specific gen Pokemon | "Use Gen 1 Pokemon in 2 matches" |
| `EVOLUTION_STAGE` | Use evolution stages | "Use fully evolved Pokemon in 5 matches" |

<details>
<summary><strong>Mission Configuration Example</strong></summary>

```json5
{
  "daily_missions": [
    {
      "id": "daily_matches_3",
      "display_name": "§6Daily Challenge",
      "description": ["§7Play 3 casual matches", "§7Any format counts!"],
      "type": "MATCH_COUNT",
      "target_value": 3,
      "rewards": ["give {player} cobblemon:exp_candy_m 2"],
      "parameters": {}
    }
  ],
  "weekly_missions": [
    {
      "id": "weekly_fire_usage",
      "display_name": "§5Fire Master",
      "description": ["§7Use Fire-type Pokemon", "§7in 5 matches"],
      "type": "POKEMON_TYPE_USAGE",
      "target_value": 5,
      "rewards": ["give {player} cobblemon:fire_stone 2"],
      "parameters": {
        "pokemon_types": ["fire"]
      }
    }
  ],
  "milestone_rewards": [
    {
      "id": "milestone_100_matches",
      "display_name": "§6§lVeteran",
      "description": ["§7Complete 100 total matches"],
      "type": "MATCH_COUNT",
      "target_value": 100,
      "rewards": [
        "give {player} minecraft:diamond 32",
        "give {player} cobblemon:exp_candy_xl 15"
      ]
    }
  ]
}
```

</details>

---

## Default Missions

### Daily Missions

| Mission | Type | Goal | Rewards |
|---------|------|------|---------|
| Daily Challenge | MATCH_COUNT | Play 3 matches | 2x Exp Candy M |
| Daily Victor | WIN_COUNT | Win 2 matches | 1x Exp Candy L |

### Weekly Missions

| Mission | Type | Goal | Rewards |
|---------|------|------|---------|
| Weekly Warrior | MATCH_COUNT | Play 15 matches | 3x Exp Candy XL |
| Weekly Champion | WIN_COUNT | Win 10 matches | 5x Rare Candy |
| Fire Master | POKEMON_TYPE_USAGE | Use Fire Pokemon 5x | 2x Fire Stone |
| Singles Specialist | FORMAT_PARTICIPATION | Play 10 Singles | 2x Exp Candy XL |

---

## Music & Sounds

Casual battles can use different music from ranked:

```json5
"music": {
  "queue_music": [
    {"music": "cobbleranked:music.queue.bw_10", "volume": 0.5, "pitch": 1.0}
  ],
  "team_selection_music": [
    {"music": "cobbleranked:music.selection.team_selection_music", "volume": 1.0, "pitch": 1.0}
  ],
  "battle_music": [
    {"music": "cobbleranked:music.battle.normal.xy_trainer", "volume": 0.5, "pitch": 1.0}
  ]
},

"sounds": {
  "match_found": {"sound": "minecraft:entity.experience_orb.pickup", "volume": 0.8, "pitch": 1.0},
  "ready_countdown": {"sound": "minecraft:entity.experience_orb.pickup", "volume": 0.7, "pitch": 0.7},
  "turn_timer_warning": {"sound": "minecraft:block.note_block.harp", "volume": 2.0, "pitch": 1.5}
}
```

> 📝 **Note:** Unlike ranked, casual battles don't have Elo-based music tiers. Music is randomly selected from the list.

---

## GUI Customization

Customize the casual GUI in `config/cobbleranked/gui/casual_gui.json5`.

See [GUI Customization](../configuration/gui.md) for details.

---

## Blacklist Configuration

Casual battles can have separate blacklist rules in `config/cobbleranked/blacklist/casual.json5`.

See [Blacklist System](../configuration/blacklist.md) for details.

---

## See Also

- [Ranked Battles](ranked-battles.md) - Competitive ranked mode
- [Rewards System](../configuration/rewards.md) - Ranked rewards configuration
- [Custom Music](custom-music.md) - Music pack setup
- [Commands Reference](../getting-started/commands.md) - All commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
