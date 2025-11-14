# Frequently Asked Questions (FAQ)

Common questions and answers about CobbleRanked.

---

## Basic Information

<details>
<summary><strong>What is CobbleRanked?</strong></summary>

A competitive ranked battle system for Cobblemon servers.

- Elo-based matchmaking
- Singles/Doubles battles
- Season system with rewards
- Pokemon/move/ability/item restrictions
- Cross-server support (optional)

</details>

<details>
<summary><strong>Where can I download it?</strong></summary>

**Official:** [Discord](https://discord.gg/VVVvBTqqyP) (currently the only distribution channel)

Modrinth/CurseForge coming soon.

</details>

<details>
<summary><strong>What are the requirements?</strong></summary>

- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.7.0+
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
  "language": "ja-Jp"  // en-Us, ja-Jp, pt-Br, ru-Ru
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

```
/give @s <TAB>
```

Tab key shows item ID list.

### Format

Must use `cobblemon:item_name` format.

```
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
    "reset_days": 90,
    "levelMatch": 50,
    "turn_limit": 100
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

`blacklist.json5`:
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
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
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
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
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
```
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

## Troubleshooting

<details>
<summary><strong>Permission errors</strong></summary>

Admin commands require OP:

```
/op YourUsername
```

Or grant `cobbleranked.admin` via permissions plugin

</details>

<details>
<summary><strong>Database connection error</strong></summary>

1. Check MySQL is running:
   ```bash
   sudo systemctl status mysql
   ```

2. Verify credentials (username, password)

3. Check database exists:
   ```bash
   mysql -u cobbleranked -p -e "SHOW DATABASES;"
   ```

4. Verify port 3306 is open

</details>

<details>
<summary><strong>Reset player Elo</strong></summary>

```
/rankedadmin setelo 1000 PlayerName singles
/rankedadmin setelo 1000 PlayerName doubles
```

</details>

<details>
<summary><strong>Manually end season</strong></summary>

```
/rankedadmin season end
/rankedadmin season rotate
```

**Note:** For cross-server, run on battle server only

</details>

---

## Other

<details>
<summary><strong>Text Placeholder API integration</strong></summary>

Rank placeholders available for top 100:

```
%cobbleranked_top_1_name%
%cobbleranked_top_1_elo%
%cobbleranked_top_singles_1_name%
%cobbleranked_top_doubles_1_winrate%
```

**Details:** [Text Placeholder API Integration](../integration/placeholders.md)

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
