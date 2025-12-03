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

Or grant `cobbleranked.admin` via [LuckPerms](../integration/luckperms.md#permission-nodes)

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

## Installation Troubleshooting

<details>
<summary><strong>Mod Not Loading</strong></summary>

**Symptom:** No CobbleRanked messages in console

**Fix:**
1. Check all dependencies are in `mods/`:
   - Fabric API
   - Cobblemon
   - Fabric Language Kotlin
2. Review `logs/latest.log` for:
   - Missing dependency errors
   - Version mismatches
   - Mod conflicts

</details>

<details>
<summary><strong>Config Not Updating</strong></summary>

**Symptom:** Changes don't apply in-game

**Fix:**
1. Save file (Ctrl+S)
2. Run `/rankedadmin reload`
3. Check for JSON5 syntax errors:
   - Missing commas
   - Unclosed brackets
   - Invalid comments

**Note:** Cross-server settings require server restart (cannot reload)

</details>

<details>
<summary><strong>Database Connection Failed</strong></summary>

**Symptom:** `Failed to connect to MySQL database`

**Fix:**
1. Verify MySQL is running:
   ```bash
   sudo systemctl status mysql
   ```
2. Test credentials:
   ```bash
   mysql -u cobbleranked -p -h localhost cobbleranked
   ```
3. Check firewall (port 3306)

</details>

<details>
<summary><strong>Permission Denied</strong></summary>

**Symptom:** `You do not have permission to use this command`

**Fix:**
```
/op YourUsername
```

Or grant `cobbleranked.admin` via [LuckPerms](../integration/luckperms.md#permission-nodes)

</details>

---

## Configuration Troubleshooting

<details>
<summary><strong>Config not loading?</strong></summary>

**Symptoms:**
- Changes not taking effect
- Default values appearing in-game
- Missing configuration options

**Solutions:**
- Check JSON5 syntax (commas, brackets)
- Look for errors in server console
- Verify file path: `config/cobbleranked/config.json5`

</details>

<details>
<summary><strong>Changes not applying?</strong></summary>

**Solutions:**
- Run `/rankedadmin reload`
- Restart server if reload fails
- Verify file was saved after editing

</details>

<details>
<summary><strong>Cross-server not working?</strong></summary>

**Solutions:**
- Verify MySQL connection
- Test Redis: `redis-cli PING`
- Check all servers use same database

</details>

---

## Arena Troubleshooting

<details>
<summary><strong>Players not teleporting</strong></summary>

**Symptom:** Match found but players stay in place

**Solution:**
1. Check arena exists: `/rankedadmin arena list`
2. Verify world is loaded
3. Check console for errors
4. Test arena: `/rankedadmin arena tp arena_name`

</details>

<details>
<summary><strong>Invalid world error</strong></summary>

**Symptom:** `World 'modname:dimension' does not exist`

**Solution:**
1. Check dimension ID spelling in `arenas.json5`
2. Ensure dimension mod is installed
3. Use correct format: `modname:dimension_name` (no spaces)

</details>

<details>
<summary><strong>Players spawn in wrong location</strong></summary>

**Symptom:** Players spawn in blocks or fall

**Solution:**
1. Re-create arena: Stand at correct spot, `/rankedadmin arena set arena_name`
2. Verify Y coordinate is correct (ground level, not underground)
3. Check `arenas.json5` coordinates manually

</details>

<details>
<summary><strong>Arena not in rotation</strong></summary>

**Symptom:** Specific arena never selected

**Solution:**
1. Verify arena in list: `/rankedadmin arena list`
2. Check world is loaded (cross-dimensional arenas)
3. Reload config: `/rankedadmin reload`

</details>

<details>
<summary><strong>Coordinates off-center</strong></summary>

**Symptom:** Players spawn at edge of arena

**Solution:**

Coordinates save with decimals:
- Stand at exact center
- Use F3 coordinates
- Manually edit `arenas.json5` to `.5` decimal (e.g., `100.5` centers on block)

</details>

---

## Velocity & Cross-Server Troubleshooting

<details>
<summary><strong>"If you wish to use IP forwarding, please enable it in your BungeeCord config as well!"</strong></summary>

**Problem:** FabricProxy-Lite secret doesn't match Velocity secret

**Solution:**
1. Check `velocity.toml` → `[player-info-forwarding]` → `secret`
2. Check `config/fabricproxy-lite.toml` → `secret` on **all servers**
3. Make sure they are **exactly the same** (case-sensitive)
4. Restart all servers

</details>

<details>
<summary><strong>"Can't connect to server"</strong></summary>

**Problem:** Backend server not reachable from Velocity

**Solution:**
1. Check server IP/port in `velocity.toml` → `[servers]`
2. Verify backend servers are running (`/list` in console)
3. Test connection: `telnet 127.0.0.1 25565`
4. Check firewall rules

</details>

<details>
<summary><strong>"Disconnected: You are not authenticated with the proxy"</strong></summary>

**Problem:** Player connecting directly to backend server instead of proxy

**Solution:**
1. Make sure players connect to proxy port (25577), not backend ports
2. Set `online-mode=false` in backend `server.properties`
3. Configure firewall to block direct connections (see Step 5)

</details>

<details>
<summary><strong>Players stuck after match ready</strong></summary>

**Problem:** CobbleRanked can't transfer players to battle server

**Solution:**
1. Check `battle_server` name in `config/cobbleranked/config.json5` matches Velocity server name
2. Verify ProxyCommand plugin is installed on Velocity
3. Check battle server is online and in Velocity config
4. Review CobbleRanked logs for transfer errors

</details>

<details>
<summary><strong>Players can't match</strong></summary>

**Check:**
- All servers using same MySQL database
- All servers using same Redis database number
- Queue format matches (Singles vs Doubles)
- Verify with: `redis-cli KEYS "*queue*"`

</details>

<details>
<summary><strong>Stats not syncing</strong></summary>

**Check:**
- All servers using same MySQL host
- Check battle server logs for database errors
- Verify Redis connection on all servers

</details>

<details>
<summary><strong>Transfer fails</strong></summary>

**Check:**
- `battle_server` name matches Velocity config
- Velocity can reach battle server
- Battle server is online

</details>

<details>
<summary><strong>Stats not persisting after 60s</strong></summary>

**Check:**
- Battle server database connection
- Check logs for: `[Batch] Saved FormatStats`

</details>

---

## Placeholder API Troubleshooting

<details>
<summary><strong>Placeholder Shows Raw Text</strong></summary>

**Problem:**
```
Hologram displays: %cobbleranked_top_1_name%
Instead of: Notch
```

**Solutions for Fabric servers:**

1. **Check Text Placeholder API is installed:**
   ```bash
   /mods list
   # Should show: text_placeholder_api or placeholder-api
   ```

2. **Check CobbleRanked is loaded:**
   ```bash
   /mods list
   # Should show: cobbleranked
   ```

3. **Test placeholder manually:**
   ```bash
   /rankedplaceholder test %cobbleranked_top_1_name%
   ```

4. **Verify hologram mod supports Text Placeholder API:**
   - Check the hologram mod's documentation
   - Most Fabric hologram mods support Text Placeholder API

**Solutions for Hybrid servers (Arclight only):**

1. **Check PlaceholderAPI is installed:**
   ```bash
   /plugins
   # Should show: PlaceholderAPI (green)
   ```

2. **Register with PlaceholderAPI:**
   ```bash
   /papi reload
   /papi parse me %cobbleranked_top_1_name%
   ```

</details>

<details>
<summary><strong>Placeholder Returns "N/A"</strong></summary>

**Problem:**
All placeholders return "N/A" or empty values.

**Possible causes:**

1. **No players have played ranked yet:**
   - Solution: Play at least 1 ranked match to populate leaderboard

2. **Database not initialized:**
   ```bash
   # Check server logs for:
   [CobbleRanked] Database initialized
   [CobbleRanked] Loaded X player stats
   ```

3. **Cache is stale:**
   ```bash
   /rankedplaceholder clear
   ```

4. **Wrong format specified:**
   ```bash
   # If no players have played Singles:
   %cobbleranked_top_singles_1_name% → "N/A"

   # But combined might work:
   %cobbleranked_top_1_name% → Shows Doubles players
   ```

</details>

<details>
<summary><strong>Placeholder Returns Old Data</strong></summary>

**Problem:**
Placeholder shows outdated stats after a match.

**Solutions:**

1. **Wait for cache to expire (60 seconds):**
   - Automatic refresh after 1 minute

2. **Manually clear cache:**
   ```bash
   /rankedplaceholder clear
   ```

3. **Check if match results saved:**
   ```bash
   # Server logs should show:
   [BattleResult] Saved stats for <player>
   ```

</details>

<details>
<summary><strong>High Rank Returns "N/A" (e.g., rank 50+)</strong></summary>

**Problem:**
```
%cobbleranked_top_50_name% → "N/A"
```

**Cause:**
Server has fewer than 50 players with ranked stats.

**Solution:**
This is expected behavior. Use lower ranks or check total players:
```bash
/rankedplaceholder test %cobbleranked_top_10_name%
```

</details>

---

## Restriction System Troubleshooting

<details>
<summary><strong>Players Can Still Teleport</strong></summary>

**Problem:** Players can use /home or /tp despite restrictions

**Solution 1:** Check `blockedCommands` in `config.json5`:
```json5
{
  "blockedCommands": ["tp", "teleport", "home", "spawn", "warp"]
}
```

**Solution 2:** Set `movement.teleport` to `true` in all three states (queue, match_preparation, battle)

**Solution 3:** Set `system.commands` to `true` to activate the command blacklist

</details>

<details>
<summary><strong>Players Can Swap Teams</strong></summary>

**Problem:** Players change Pokémon team during match preparation

**Solution:** Set these flags to `true` in `match_preparation` and `battle` sections of `restrictions.json5`:
```json5
{
  "system": { "pc_access": true },
  "inventory": {
    "ender_chest": true,
    "shulker_box": true
  }
}
```

</details>

<details>
<summary><strong>Players Can Escape Arena</strong></summary>

**Problem:** Players throw ender pearls or eat chorus fruit to escape battle arena

**Solution:** Set these flags to `true` in `battle` section:
```json5
{
  "item": {
    "use_ender_pearl": true,
    "use_chorus_fruit": true
  },
  "movement": {
    "ender_pearl": true,
    "chorus_fruit": true
  }
}
```

</details>

<details>
<summary><strong>Players Can Use /pc Command</strong></summary>

**Problem:** Players can open PC with `/pc` command

**Solution:** Verify `/pc` is in `blockedCommands` in `config.json5`:
```json5
{
  "blockedCommands": ["tp", "warp", "spawn", "warps", "ranked", "home", "kit", "pc"]
}
```

And set `system.commands` to `true` in `restrictions.json5`:
```json5
{
  "queue": {
    "system": { "commands": true }
  },
  "match_preparation": {
    "system": { "commands": true }
  },
  "battle": {
    "system": { "commands": true }
  }
}
```

**Note:** `/pc` is included in the default configuration since version 1.0.0-hotfix12. If using an older version:
1. Update to the latest CobbleRanked version
2. Delete `config/cobbleranked/config.json5`
3. Restart server to regenerate with `/pc` included

Or manually add `"pc"` to the `blockedCommands` list.

</details>

<details>
<summary><strong>Restriction Configuration Not Loading</strong></summary>

**Problem:** Changes to `restrictions.json5` don't take effect

**Solution:**
1. Check server logs for JSON parsing errors
2. Verify JSON5 syntax (trailing commas are OK, but check brackets and quotes)
3. Run `/rankedadmin reload`
4. Restart server if reload doesn't work

**Common syntax errors:**
```json5
// Wrong: Missing comma
{
  "teleport": true
  "respawn": false
}

// Correct:
{
  "teleport": true,
  "respawn": false
}
```

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

Yes! Use format-specific inventory bans.

**singles.json5:**
```json5
{
  "banned_inventory_items": ["mega_showdown:tera_orb"]
}
```

**doubles.json5:**
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

## Custom Music

<details>
<summary><strong>How do I add custom battle music?</strong></summary>

1. Create resource pack with `.ogg` files
2. Add `sounds.json` mapping
3. Configure music IDs in `config.json5`
4. Players load resource pack

**Minimal setup:**
```json5
{
  "music": {
    "enabled": true,
    "queueMusic": "cobbleranked:queue_music",
    "battleMusic": [{
      "minElo": 0,
      "maxElo": 9999,
      "music": "cobbleranked:battle_music"
    }]
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

## Random Battles

<details>
<summary><strong>"Pool not found" error</strong></summary>

**Cause:** Pool file not loaded or `enabled: false`

**Fix:** Check `config/cobbleranked/randombattle/pools/` and ensure `enabled: true` in the pool file.

</details>

<details>
<summary><strong>"Unknown species" error</strong></summary>

**Cause:** Pokemon species not recognized by Cobblemon

**Fix:** Use exact Cobblemon species names (lowercase). Check with `/pokespawn <species>` command.

</details>

<details>
<summary><strong>"Unknown move" error</strong></summary>

**Cause:** Move name doesn't match Cobblemon's internal names

**Fix:** Use Cobblemon move names. Check in-game move list or Pokemon summary.

</details>

<details>
<summary><strong>Teams feel unbalanced</strong></summary>

**Cause:** Poor level scaling or role distribution in pool configuration

**Fix:**
1. Adjust Pokemon levels (weaker Pokemon = higher levels)
2. Ensure varied roles (30% attackers, 25% wallbreakers, 20% support, etc.)
3. Test with `/rankedadmin randombattle generate <pool>`

</details>

---

## Cross-Server Setup

<details>
<summary><strong>Do I need cross-server mode?</strong></summary>

**No.** Single-server mode works perfectly for most servers.

Only use cross-server if:
- You have 2+ Minecraft servers
- Want shared rankings across servers
- Have dedicated battle server

**Requirements:** Velocity proxy, MySQL/MongoDB, Redis

</details>

<details>
<summary><strong>Players not transferring to battle server</strong></summary>

1. Check Velocity `velocity.toml` has server names
2. Verify ProxyCommand Reloaded plugin installed
3. Test manual transfer: `/server battle`
4. Check logs for transfer errors

</details>

<details>
<summary><strong>Stats not syncing across servers</strong></summary>

1. Verify all servers use same MySQL database
2. Check Redis running: `redis-cli ping` → `PONG`
3. Confirm `cross_server.enabled: true` on all servers
4. Check database credentials match

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

**Admins:**
- `/rankedadmin setArena <name> <pos1|pos2>` - Set arena
- `/rankedadmin setelo <amount> <player> <format>` - Set Elo
- `/rankedadmin season create <days> <name>` - New season
- `/rankedadmin reload` - Reload configs

[Full Command List](../getting-started/commands.md)

</details>

---

## Turn Timer & Matchmaking

<details>
<summary><strong>How do I enable turn timer?</strong></summary>

In `config.json5`:

```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 60
  }
}
```

Or format-specific:
```json5
{
  "format_timers": {
    "SINGLES": {
      "turn_timeout_seconds": 90
    }
  }
}
```

</details>

<details>
<summary><strong>Matchmaking takes too long</strong></summary>

**Solutions:**
1. Increase Elo range (happens automatically after 30s)
2. Enable cross-server mode (larger player pool)
3. Check if arenas available: `/rankedadmin arena status`
4. Verify Redis working (cross-server only)

**Wait time increases range:**
- 0-30s: ±200 Elo
- After 30s: Expands gradually to ±600 Elo

</details>

<details>
<summary><strong>Players matched with wrong Elo</strong></summary>

This is normal for long waits. System expands range to find matches.

To limit range, reduce `matchmaking.max_elo_range_multiplier` in config.

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
```
/rankedadmin season create 30 "Season 2"
```

This:
- Ends current season
- Archives old stats
- Resets Elo to default (1000)
- Clears leaderboards

</details>

---

## Advanced Competitive Settings

<details>
<summary><strong>What does syncLocalQueue do?</strong></summary>

`competitive.syncLocalQueue: true` (default)

Synchronizes matchmaking queue with the local server cache. Keep this enabled for consistent queue behavior.

**When to disable:** Only if experiencing queue synchronization issues in single-server mode (rare).

</details>

<details>
<summary><strong>What does preventDuplicatePenalty do?</strong></summary>

`competitive.preventDuplicatePenalty: true` (default)

Prevents double-penalizing a player who disconnects. If a player disconnects and the flee penalty is already applied, this prevents applying it again.

**Recommended:** Always keep enabled.

</details>

<details>
<summary><strong>What does asyncSeasonManager do?</strong></summary>

`competitive.asyncSeasonManager: true` (default)

Runs season management tasks (rotation checks, reward distribution) asynchronously to prevent server lag.

**When to disable:** Only for debugging season-related issues where you need synchronous execution.

</details>

<details>
<summary><strong>What does cleanupResources do?</strong></summary>

`competitive.cleanupResources: true` (default)

Automatically cleans up battle resources (arenas, player states) after matches end. Prevents memory leaks and stuck arena states.

**Recommended:** Always keep enabled unless debugging arena issues.

</details>

<details>
<summary><strong>What does pendingMatchTimeout do?</strong></summary>

`competitive.pendingMatchTimeout: 5` (default, in minutes)

Time limit for pending match states. If a match doesn't start within this time, it's automatically cancelled and players are returned to queue.

**Increase if:** Players report being kicked from queue prematurely.

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
<summary><strong>Can I use this with Showdown moves mod?</strong></summary>

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
