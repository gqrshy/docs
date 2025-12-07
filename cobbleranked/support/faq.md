# Frequently Asked Questions (FAQ)

Common questions and answers about CobbleRanked.

---

## Basic Information

<details>
<summary><strong>What is CobbleRanked?</strong></summary>

A competitive ranked battle system for Cobblemon servers.

- Elo-based matchmaking
- Singles/Doubles/Triples/Multi battles
- Season system with rewards
- Pokemon/move/ability/item restrictions
- Cross-server support (optional)

</details>

<details>
<summary><strong>Where can I purchase it?</strong></summary>

**Official:** [Polymart](https://polymart.org/product/8733/cobbleranked)

CobbleRanked is a premium mod available exclusively on Polymart.

</details>

<details>
<summary><strong>What are the requirements?</strong></summary>

- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.6.1+ (1.7.0+ recommended)
- Fabric API 0.116.6+
- Fabric Language Kotlin 1.13.6+

</details>

<details>
<summary><strong>Is cross-server required?</strong></summary>

No. Single-server mode works with zero configuration.

Cross-server is only needed if you want to share rankings across multiple servers.

</details>

---

## Installation & Setup

<details>
<summary><strong>Config files not generating</strong></summary>

1. Verify all dependencies are installed
2. Fully start the server
3. Check `logs/latest.log` for errors

</details>

<details>
<summary><strong>How do I change the language?</strong></summary>

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "ja-Jp"  // en-Us, ja-Jp, fr-Fr
}
```

Save and run `/rankedadmin reload`.

</details>

<details>
<summary><strong>Config changes not applying</strong></summary>

1. Confirm file is saved
2. Run `/rankedadmin reload`
3. Check JSON5 syntax (commas, brackets)
4. Look for `[CobbleRanked] Configuration loaded` in server logs

</details>

---

## Pokemon Form Reference

<details>
<summary><strong>How do I ban specific Pokemon forms (e.g., White Kyurem only)?</strong></summary>

Use the form syntax: `species:form_name` in blacklist configuration.

**Example - Ban only White Kyurem:**
```json5
{
  "black_list_pokemon": [
    "Kyurem:white-fusion"  // Only White Kyurem banned
  ]
}
```

**Common Form Examples:**

| Pokemon | Form Name | Blacklist Syntax |
|---------|-----------|------------------|
| White Kyurem | white-fusion | `Kyurem:white-fusion` |
| Black Kyurem | black-fusion | `Kyurem:black-fusion` |
| Ice Rider Calyrex | ice-rider | `Calyrex:ice-rider` |
| Shadow Rider Calyrex | shadow-rider | `Calyrex:shadow-rider` |
| Heat Rotom | heat | `Rotom:heat` |
| Wash Rotom | wash | `Rotom:wash` |
| Frost Rotom | frost | `Rotom:frost` |
| Fan Rotom | fan | `Rotom:fan` |
| Mow Rotom | mow | `Rotom:mow` |
| Attack Deoxys | attack | `Deoxys:attack` |
| Defense Deoxys | defense | `Deoxys:defense` |
| Speed Deoxys | speed | `Deoxys:speed` |

**Tips:**
- No form specified (`Kyurem`) bans **all forms** (normal, white, black)
- Form specified (`Kyurem:white-fusion`) bans **only that form**

</details>

<details>
<summary><strong>Complete Pokemon Form List</strong></summary>

### Legendary Forms

**Kyurem (646)**
- Normal: `Kyurem`
- White: `Kyurem:white-fusion`
- Black: `Kyurem:black-fusion`

**Calyrex (898)**
- Normal: `Calyrex`
- Ice Rider: `Calyrex:ice-rider`
- Shadow Rider: `Calyrex:shadow-rider`

**Necrozma (800)**
- Normal: `Necrozma`
- Dusk Mane: `Necrozma:dusk-mane`
- Dawn Wings: `Necrozma:dawn-wings`
- Ultra: `Necrozma:ultra`

**Zygarde (718)**
- 10% Form: `Zygarde:formid=10`
- 50% Form: `Zygarde` (default)
- Complete Form: `Zygarde:formid=100`

**Giratina (487)**
- Altered: `Giratina` (default)
- Origin: `Giratina:origin`

**Shaymin (492)**
- Land: `Shaymin` (default)
- Sky: `Shaymin:sky`

**Tornadus/Thundurus/Landorus**
- Incarnate: `Tornadus` (default)
- Therian: `Tornadus:therian`

**Hoopa (720)**
- Confined: `Hoopa` (default)
- Unbound: `Hoopa:unbound`

---

### Mega Evolutions

**Gen 1 Starters**
- `Venusaur:mega`
- `Charizard:mega_x`
- `Charizard:mega_y`
- `Blastoise:mega`

**Mewtwo**
- `Mewtwo:mega_x`
- `Mewtwo:mega_y`

**Pseudo-Legendaries**
- `Garchomp:mega`
- `Salamence:mega`
- `Metagross:mega`
- `Tyranitar:mega`

**Popular Megas**
- `Lucario:mega`
- `Gengar:mega`
- `Alakazam:mega`
- `Kangaskhan:mega`
- `Rayquaza:mega`

---

### Rotom Forms (479)

- Heat (Oven): `Rotom:heat`
- Wash (Washing Machine): `Rotom:wash`
- Frost (Refrigerator): `Rotom:frost`
- Fan (Electric Fan): `Rotom:fan`
- Mow (Lawn Mower): `Rotom:mow`

---

### Deoxys Forms (386)

- Normal: `Deoxys` (default)
- Attack: `Deoxys:attack`
- Defense: `Deoxys:defense`
- Speed: `Deoxys:speed`

---

### Lycanroc Forms (745)

- Midday: `Lycanroc` (default)
- Midnight: `Lycanroc:midnight`
- Dusk: `Lycanroc:dusk`

---

### Oricorio Forms (741)

- Baile (Fire/Flying): `Oricorio` (default)
- Pom-Pom (Electric/Flying): `Oricorio:pom-pom`
- Pa'u (Psychic/Flying): `Oricorio:pau`
- Sensu (Ghost/Flying): `Oricorio:sensu`

---

### Regional Forms

**Alolan Forms**
- `Meowth:alola`
- `Persian:alola`
- `Raichu:alola`
- `Vulpix:alola`
- `Ninetales:alola`
- `Sandshrew:alola`
- `Sandslash:alola`
- `Diglett:alola`
- `Dugtrio:alola`
- `Geodude:alola`
- `Graveler:alola`
- `Golem:alola`
- `Grimer:alola`
- `Muk:alola`
- `Exeggutor:alola`
- `Marowak:alola`

**Galarian Forms**
- `Meowth:galar`
- `Ponyta:galar`
- `Rapidash:galar`
- `Slowpoke:galar`
- `Slowbro:galar`
- `Slowking:galar`
- `Farfetchd:galar`
- `Weezing:galar`
- `Mr. Mime:galar`
- `Articuno:galar`
- `Zapdos:galar`
- `Moltres:galar`
- `Corsola:galar`
- `Zigzagoon:galar`
- `Linoone:galar`
- `Darumaka:galar`
- `Darmanitan:galar`
- `Yamask:galar`
- `Stunfisk:galar`

**Hisuian Forms**
- `Growlithe:hisui`
- `Arcanine:hisui`
- `Voltorb:hisui`
- `Electrode:hisui`
- `Typhlosion:hisui`
- `Qwilfish:hisui`
- `Sneasel:hisui`
- `Samurott:hisui`
- `Lilligant:hisui`
- `Zorua:hisui`
- `Zoroark:hisui`
- `Braviary:hisui`
- `Sliggoo:hisui`
- `Goodra:hisui`
- `Avalugg:hisui`
- `Decidueye:hisui`

**Paldean Forms**
- `Tauros:paldea-combat`
- `Tauros:paldea-blaze`
- `Tauros:paldea-aqua`
- `Wooper:paldea`

---

### Practical Blacklist Examples

**Example 1: Ban all Kyurem forms**
```json5
{
  "black_list_pokemon": ["Kyurem"]
}
```

**Example 2: Ban only fusion forms, allow normal Kyurem**
```json5
{
  "black_list_pokemon": [
    "Kyurem:white-fusion",
    "Kyurem:black-fusion"
  ]
}
```

**Example 3: Ban all Mega Evolutions but allow normal forms**
```json5
{
  "black_list_pokemon": [
    "Charizard:mega_x",
    "Charizard:mega_y",
    "Mewtwo:mega_x",
    "Mewtwo:mega_y",
    "Rayquaza:mega"
  ]
}
```

**Example 4: Ban all Alolan forms**
```json5
{
  "black_list_pokemon": [
    "Raichu:alola",
    "Vulpix:alola",
    "Ninetales:alola",
    "Sandshrew:alola",
    "Sandslash:alola",
    "Exeggutor:alola",
    "Marowak:alola",
    "Grimer:alola",
    "Muk:alola"
  ]
}
```

**Example 5: Competitive VGC Series 2 (Restricted Legendaries)**
```json5
{
  "black_list_pokemon": [
    "Kyurem:white-fusion",
    "Kyurem:black-fusion",
    "Calyrex:ice-rider",
    "Calyrex:shadow-rider",
    "Necrozma:ultra"
  ],
  "restricted_label_limits": {
    "restricted": 2  // Allow max 2 restricted legendaries
  }
}
```

---

**Finding Form Names:**

1. **Check Cobblemon Wiki** - Most reliable source
2. **Use `/pokespawn <species> form=<form_name>`** - Test in-game
3. **Press F3+H and hover over Pokemon** - Shows internal form data
4. **Check server logs** - Form names appear when Pokemon spawn

</details>

---

## Blacklist Configuration

<details>
<summary><strong>How do I find move names?</strong></summary>

Move names use **lowercase snake_case** format.

| Display Name | Internal Name |
|--------------|---------------|
| Fissure | `fissure` |
| Sheer Cold | `sheer_cold` |
| Baton Pass | `baton_pass` |
| Last Respects | `last_respects` |
| Thunderbolt | `thunderbolt` |

**Pattern:** Replace spaces with underscores, use lowercase

</details>

<details>
<summary><strong>How do I find ability names?</strong></summary>

### In-Game Method

1. Press `F3 + H`
2. Open Pokemon summary screen
3. Hover over ability icon

### Common Abilities

| Display Name | Internal Name |
|--------------|---------------|
| Intimidate | `intimidate` |
| Drought | `drought` |
| Moody | `moody` |
| Shadow Tag | `shadow_tag` |
| Arena Trap | `arena_trap` |
| Huge Power | `huge_power` |

</details>

<details>
<summary><strong>How do I find item IDs?</strong></summary>

### Easiest Method

1. Press `F3 + H`
2. Hover over item in inventory
3. ID appears at bottom (e.g., `cobblemon:bright_powder`)

### Using Commands

```bash
/give @s <TAB>
```

Tab key shows item ID list.

### Format

Must use `cobblemon:item_name` format.

```text
Correct: "cobblemon:bright_powder"
Wrong: "Bright Powder", "brightpowder"
```

</details>

<details>
<summary><strong>How do I ban specific forms (Megas, etc.)?</strong></summary>

### Basic Rules

- **No form** (`mewtwo`): **All forms** banned
- **With form** (`mewtwo:mega_x`): **Only that form** banned

### Examples

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // Normal + Mega X + Mega Y all banned
    "charizard:mega_x",  // Only Mega Charizard X banned (normal/Y allowed)
    "weezing:galar",     // Only Galarian Weezing banned
    "muk:alola"          // Only Alolan Muk banned
  ]
}
```

</details>

<details>
<summary><strong>What's the difference between label limits and bans?</strong></summary>

### Label Limits (Quantity)

```json5
{
  "restricted_label_limits": {
    "legendary": 1  // Max 1 legendary allowed
  }
}
```

### Complete Ban

```json5
{
  "black_list_labels": ["legendary"]  // No legendaries allowed
}
```

### Combined Example

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // Max 1 legendary
  },
  "black_list_pokemon": [
    "mewtwo"             // But Mewtwo is completely banned
  ]
}
```

</details>

<details>
<summary><strong>Casual server config example</strong></summary>

Ban only OHKO moves, everything else allowed:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

</details>

<details>
<summary><strong>Competitive server config example</strong></summary>

Smogon OU format:

`config.json5`:
```json5
{
  "language": "en-Us",
  "ranked_match": {
    "reset_days": 90
  },
  "battle": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "team_size": 6,
        "turn_timeout_seconds": 90,
        "match_duration_minutes": 20
      }
    }
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

`blacklist/singles.json5`:
```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": ["cobblemon:bright_powder", "cobblemon:lax_incense"]
}
```

</details>

---

## Cross-Server

<details>
<summary><strong>Cross-server setup guide (MySQL)</strong></summary>

### 1. Create MySQL Database

```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

### 2. Configure All Servers

**Battle Server:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Empty = this is battle server
    "database_type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**Lobby/Main Servers:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",  // Change per server
    "battle_server": "battle",
    "database_type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**Details:** [Cross-Server Guide](../advanced/cross-server.md)

</details>

<details>
<summary><strong>Redis installation and setup</strong></summary>

### Install (Ubuntu/Debian)

```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### Allow Remote Access

`/etc/redis/redis.conf`:
```text
bind 0.0.0.0
requirepass your_password
```

```bash
sudo systemctl restart redis-server
```

### Configure All Servers

```json5
{
  "cross_server": {
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

### Test Connection

```bash
redis-cli -h localhost -p 6379 PING
# Response: PONG
```

</details>

<details>
<summary><strong>Cross-server matchmaking not working</strong></summary>

### Checklist

1. **Check Redis connection:**
   ```bash
   redis-cli
   > KEYS cobbleranked:queue:*
   ```

2. **Check MySQL connection:**
   ```sql
   SELECT * FROM player_ranked_stats;
   ```

3. **Verify server_id is unique**

4. **Check battle_server config:**
   - Battle server: `battle_server: ""`
   - Others: `battle_server: "battle"`

5. **Verify Velocity server names match**

</details>

<details>
<summary><strong>Players not returning after battle</strong></summary>

### Solutions

1. **Check Velocity server names**
   - `battle_server` must exactly match `velocity.toml` name
   - Case-sensitive

2. **Check Redis origin data:**
   ```bash
   redis-cli
   > GET player_origin:{UUID}
   ```

3. **Check logs:**
   - Look for `[BATTLE-END] Transferring players back to: lobby1`

</details>

---

## Arena Setup

<details>
<summary><strong>How do I set up arenas?</strong></summary>

1. Stand at first corner: `/rankedadmin setArena arena1 pos1`
2. Stand at opposite corner: `/rankedadmin setArena arena1 pos2`
3. Set exit point: `/rankedadmin setexit`
4. Test: `/rankedadmin teleportArena arena1`

**Both pos1 and pos2 must be in the same world.**

**For MULTI format (2v2):** Also set pos3 and pos4 for the second team's players.

</details>

<details>
<summary><strong>Can arenas be selected randomly?</strong></summary>

Yes! In `config/cobbleranked/arenas.json5`:

```json5
{
  "selection_mode": "random"  // or "sequential"
}
```

- **random**: Pick random arena each match
- **sequential**: Always use first available arena

</details>

<details>
<summary><strong>Arena shows as "in use" but no battle</strong></summary>

Arena may be stuck. Fix:

1. `/rankedadmin arena status` - Check all arenas
2. `/rankedadmin reload` - Reset arena states
3. If still stuck, restart server

</details>

---

## Format-Specific Features

<details>
<summary><strong>Can I ban Tera Orb in singles but allow in doubles?</strong></summary>

Yes! Use format-specific blacklist files.

`blacklist/singles.json5`:
```json5
{
  "banned_inventory_items": ["mega_showdown:tera_orb"]
}
```

`blacklist/doubles.json5`:
```json5
{
  "banned_inventory_items": []  // Allow Tera Orb
}
```

Players with banned items can't queue for that format.

</details>

<details>
<summary><strong>How do I find item IDs for banning?</strong></summary>

1. Hold item in-game
2. Press F3+H (advanced tooltips)
3. Check tooltip for ID (e.g., `mega_showdown:tera_orb`)
4. Add to `banned_inventory_items` in format blacklist

</details>

<details>
<summary><strong>Different Elo for singles and doubles?</strong></summary>

Yes, formats have separate Elo ratings:
- Singles: Your singles Elo
- Doubles: Your doubles Elo
- Triples: Your triples Elo
- Multi: Your multi Elo

All tracked independently in database.

</details>

---

## Turn Timer & Matchmaking

<details>
<summary><strong>How do I configure turn timers?</strong></summary>

Turn timers are format-specific. In `config.json5`:

```json5
{
  "battle": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "team_size": 3,
        "turn_timeout_seconds": 90,
        "match_duration_minutes": 15
      },
      "DOUBLES": {
        "enabled": true,
        "team_size": 4,
        "turn_timeout_seconds": 120,
        "match_duration_minutes": 20
      },
      "TRIPLES": {
        "enabled": false,
        "team_size": 6,
        "turn_timeout_seconds": 150,
        "match_duration_minutes": 25
      },
      "MULTI": {
        "enabled": false,
        "team_size": 3,
        "turn_timeout_seconds": 120,
        "match_duration_minutes": 20
      }
    }
  }
}
```

| Setting | Description |
|---------|-------------|
| `turn_timeout_seconds` | Time limit for move selection |
| `match_duration_minutes` | Total match time limit |

</details>

<details>
<summary><strong>Matchmaking takes too long</strong></summary>

**Solutions:**
1. Increase Elo range (happens automatically after expansion delay)
2. Enable cross-server mode (larger player pool)
3. Check if arenas available: `/rankedadmin arena status`
4. Verify Redis working (cross-server only)

**Wait time increases range:**
- 0-30s: ±200 Elo (default)
- After 30s: Expands by 5 Elo per second
- Maximum: ±600 Elo (3x initial range)

See [Dynamic Matchmaking](../features/dynamic-matchmaking.md) for details.

</details>

<details>
<summary><strong>Players matched with wrong Elo</strong></summary>

This is normal for long waits. System expands range to find matches.

To limit range, reduce `maxMultiplier` in format-specific matchmaking config:

```json5
{
  "matchmaking": {
    "format_rules": {
      "SINGLES": {
        "initialRange": 200,
        "maxMultiplier": 2.0  // Max range = 200 × 2.0 = 400
      }
    }
  }
}
```

</details>

---

## Flee Penalty System

<details>
<summary><strong>How does flee penalty work?</strong></summary>

Players who disconnect or flee during battles receive temporary queue bans.

**Penalty Tiers (default):**

| Flee Count | Penalty Duration |
|------------|------------------|
| 1-5 times | 5 minutes |
| 6-10 times | 15 minutes |
| 11+ times | 30 minutes |

**Configuration:**

```json5
{
  "competitive": {
    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    },
    "flee_decay": {
      "enabled": true,
      "decay_interval_hours": 24,
      "decay_amount": 1
    }
  }
}
```

</details>

<details>
<summary><strong>What is pendingMatchTimeout?</strong></summary>

`competitive.pendingMatchTimeout: 5` (default, in minutes)

Time limit for pending match states. If a match doesn't start within this time, it's automatically cancelled and players are returned to queue.

**Increase if:** Players report being kicked from queue prematurely.

</details>

---

## Player Restrictions

<details>
<summary><strong>How do I block commands during queue/battle?</strong></summary>

In `config.json5`:

```json5
{
  "blockedCommands": ["tp", "warp", "spawn", "warps", "ranked", "home", "kit", "pc"]
}
```

These commands are blocked during queue, match preparation, and battle when `block_commands` is enabled.

</details>

<details>
<summary><strong>How do I configure restrictions per state?</strong></summary>

In `config.json5`:

```json5
{
  "restrictions": {
    "queue": {
      "block_item_usage": false,
      "block_block_interaction": false,
      "block_entity_interaction": false,
      "block_pc_access": true,
      "block_commands": true,
      "block_inventory_access": false
    },
    "match_preparation": {
      "block_item_usage": false,
      "block_block_interaction": false,
      "block_entity_interaction": false,
      "block_pc_access": true,
      "block_commands": true,
      "block_inventory_access": true
    },
    "battle": {
      "block_item_usage": true,
      "block_block_interaction": true,
      "block_entity_interaction": true,
      "block_pc_access": true,
      "block_commands": true,
      "block_inventory_access": true
    }
  }
}
```

| Setting | Description |
|---------|-------------|
| `block_item_usage` | Block using items (ender pearls, etc.) |
| `block_block_interaction` | Block placing/breaking blocks |
| `block_entity_interaction` | Block interacting with entities |
| `block_pc_access` | Block opening PC |
| `block_commands` | Block commands in blockedCommands list |
| `block_inventory_access` | Block inventory access |

</details>

---

## Custom Music

<details>
<summary><strong>How do I add custom battle music?</strong></summary>

1. Create resource pack with `.ogg` files
2. Add `sounds.json` mapping
3. Configure music IDs in `config.json5`
4. Players load resource pack

**Configuration:**
```json5
{
  "ranked_match": {
    "queueMusic": [
      { "music": "cobbleranked:queue_music", "volume": 1.0, "pitch": 1.0 }
    ],
    "battleMusic": [
      {
        "min_elo": 0,
        "max_elo": 1500,
        "musicList": [
          { "music": "cobbleranked:battle_normal", "volume": 1.0, "pitch": 1.0 }
        ]
      },
      {
        "min_elo": 1500,
        "max_elo": 9999,
        "musicList": [
          { "music": "cobbleranked:battle_elite", "volume": 1.0, "pitch": 1.0 }
        ]
      }
    ]
  },
  "music": {
    "enabled": true
  }
}
```

[Full Guide](../features/custom-music.md)

</details>

<details>
<summary><strong>Music not playing for players</strong></summary>

Check:
1. `music.enabled: true` in config
2. Players have resource pack loaded
3. Sound IDs match between config and `sounds.json`
4. OGG files in correct path: `assets/cobbleranked/sounds/`

</details>

---

## GUI & Commands

<details>
<summary><strong>How do I customize GUI items?</strong></summary>

Edit `config/cobbleranked/gui/gui-<language>.json5`:

```json5
{
  "gui_ranked": {
    "items": {
      "queue_singles": {
        "item": "minecraft:diamond_sword",  // Change item
        "name": "&a&lQueue Singles",        // Change name
        "slot": 11                           // Change position
      }
    }
  }
}
```

Save and run `/rankedadmin reload`.

</details>

<details>
<summary><strong>GUI changes not showing</strong></summary>

1. Check JSON5 syntax (commas, brackets)
2. Run `/rankedadmin reload`
3. Close and reopen GUI
4. Check logs for config errors

</details>

<details>
<summary><strong>What commands are available?</strong></summary>

**Players:**
- `/ranked` - Open ranked menu
- `/season` - Show season info
- `/casual` - Open casual battles menu

**Admins:**
- `/rankedadmin setArena <name> <pos1|pos2|pos3|pos4>` - Set arena
- `/rankedadmin setexit` - Set exit location
- `/rankedadmin teleportArena <name>` - Test teleport to arena
- `/rankedadmin arena status` - Show arena status
- `/rankedadmin setelo <amount> <player> <format>` - Set Elo
- `/rankedadmin season info` - Show current season
- `/rankedadmin season create <days> <name>` - Create new season
- `/rankedadmin season rotate` - Force season rotation
- `/rankedadmin season end` - End current season
- `/rankedadmin season schedule info` - Show schedule info
- `/rankedadmin season schedule reload` - Reload schedule config
- `/rankedadmin season schedule upcoming` - Show upcoming seasons
- `/rankedadmin reload` - Reload configs

[Full Command List](../getting-started/commands.md)

</details>

---

## Leaderboards & Stats

<details>
<summary><strong>Leaderboard not updating</strong></summary>

Leaderboards cache for 60 seconds. Wait and check again.

Force refresh:
1. Close and reopen GUI
2. Run `/rankedadmin reload`
3. Wait 60 seconds for cache expiry

</details>

<details>
<summary><strong>Player missing from leaderboard</strong></summary>

Check:
1. Player has minimum battles (default: 5)
2. Player's Elo > 0
3. Player hasn't been reset this season

</details>

<details>
<summary><strong>How do I reset all stats?</strong></summary>

Create new season:
```bash
/rankedadmin season create 30 "Season 2"
```

This:
- Ends current season
- Archives old stats
- Resets Elo to default
- Clears leaderboards

</details>

---

## Placeholders

<details>
<summary><strong>Text Placeholder API integration</strong></summary>

Rank placeholders available for top 100:

```text
%cobbleranked_top_1_name%
%cobbleranked_top_1_elo%
%cobbleranked_top_singles_1_name%
%cobbleranked_top_doubles_1_winrate%
```

**Details:** [Text Placeholder API Integration](../integration/placeholders.md)

</details>

<details>
<summary><strong>Placeholder shows raw text</strong></summary>

**Problem:**
```text
Hologram displays: %cobbleranked_top_1_name%
Instead of: Notch
```

**Solutions for Fabric servers:**

1. Check Text Placeholder API is installed
2. Check CobbleRanked is loaded
3. Test placeholder manually:
   ```bash
   /rankedplaceholder test %cobbleranked_top_1_name%
   ```

</details>

<details>
<summary><strong>Placeholder returns "N/A"</strong></summary>

**Possible causes:**

1. **No players have played ranked yet:**
   - Solution: Play at least 1 ranked match to populate leaderboard

2. **Database not initialized:**
   - Check server logs for `[CobbleRanked] Database initialized`

3. **Wrong format specified:**
   - If no players have played Singles: `%cobbleranked_top_singles_1_name%` → "N/A"

</details>

---

## Other

<details>
<summary><strong>Can I use this with Mega Showdown mod?</strong></summary>

Yes! CobbleRanked works with:
- Mega Showdown
- Custom move mods
- Custom Pokemon addons

Just configure blacklists for any overpowered additions.

</details>

<details>
<summary><strong>Need support?</strong></summary>

1. Check [Troubleshooting Guide](troubleshooting.md)
2. Ask in [Discord](https://discord.gg/VVVvBTqqyP) #feedback channel
3. For bug reports, include:
   - Server logs (`logs/latest.log`)
   - Config file (`config/cobbleranked/config.json5`)
   - Steps to reproduce

</details>
