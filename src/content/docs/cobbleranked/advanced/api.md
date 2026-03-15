---
title: API & Integration
description: Build statistics websites and usage rankings with CobbleRanked data.
---

Create leaderboards, usage statistics, and player profiles using CobbleRanked's data.

## What You Can Build

- **Leaderboard Websites** - Display top players and rankings
- **Usage Statistics** - Pokemon usage rates by format/tier
- **Player Profiles** - Match history, win rates, tier progression
- **Season Analytics** - Battle counts, activity trends
- **Real-Time Displays** - Live leaderboard updates

---

## Placeholder API

Display CobbleRanked stats in other mods using Text Placeholder API.

### Requirements

- Text Placeholder API (mod)
- CobbleRanked 2.0+

> **Note:** PlaceholderAPI (PAPI) is a Spigot/Paper plugin and is not supported on Fabric.

### Player Stats

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_<format>_elo%` | Player's Elo rating |
| `%cobbleranked_<format>_rank%` | Player's rank position |
| `%cobbleranked_<format>_wins%` | Total wins |
| `%cobbleranked_<format>_losses%` | Total losses |
| `%cobbleranked_<format>_games%` | Total games played |
| `%cobbleranked_<format>_winrate%` | Win percentage |
| `%cobbleranked_<format>_tier%` | Tier name (Gold, Diamond, etc.) |

**Example:** `%cobbleranked_singles_elo%` → `1850`

### Top Players

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_<rank>_name%` | Player name |
| `%cobbleranked_top_<rank>_elo%` | Elo rating |
| `%cobbleranked_top_<rank>_wins%` | Wins |
| `%cobbleranked_top_<rank>_losses%` | Losses |

**Example:** `%cobbleranked_top_1_name%` → `PlayerName`

### Season Info

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_season_name%` | Current season name |
| `%cobbleranked_season_status%` | `active` or `ended` |
| `%cobbleranked_season_remaining%` | Time remaining (e.g., `5 days`) |

### Usage Examples

**Scoreboard:**
```text
ELO: %cobbleranked_singles_elo%
Rank: #%cobbleranked_singles_rank%
W/L: %cobbleranked_singles_wins%/%cobbleranked_singles_losses%
```

**Leaderboard Display:**
```text
#1 %cobbleranked_top_1_name% - %cobbleranked_top_1_elo% ELO
#2 %cobbleranked_top_2_name% - %cobbleranked_top_2_elo% ELO
#3 %cobbleranked_top_3_name% - %cobbleranked_top_3_elo% ELO
```

---

## Database Queries

For advanced statistics and custom websites, query CobbleRanked's database directly.

### Leaderboard Queries

**Top 10 Players by ELO:**
```sql
SELECT uuid, elo, matches, wins, losses
FROM format_stats
WHERE format = 'singles' AND season_name = 'Season 1'
ORDER BY elo DESC
LIMIT 10;
```

**Player's Current Rank:**
```sql
SELECT rank FROM (
    SELECT uuid, RANK() OVER (ORDER BY elo DESC) as rank
    FROM format_stats
    WHERE format = 'singles' AND season_name = 'Season 1'
) ranked
WHERE uuid = 'player-uuid-here';
```

**Tier Distribution:**
```sql
SELECT
    CASE
        WHEN elo >= 2000 THEN 'Master'
        WHEN elo >= 1800 THEN 'Diamond'
        WHEN elo >= 1600 THEN 'Platinum'
        WHEN elo >= 1400 THEN 'Gold'
        WHEN elo >= 1200 THEN 'Silver'
        ELSE 'Bronze'
    END as tier,
    COUNT(*) as player_count
FROM format_stats
WHERE format = 'singles' AND season_name = 'Season 1'
GROUP BY tier
ORDER BY elo DESC;
```

### Usage Statistics Queries

**Pokemon Usage by Tier:**
```sql
SELECT
    json_extract(pokemon_json, '$.species') as species,
    COUNT(*) as usage_count
FROM battle_records
WHERE season_name = 'Season 1'
  AND format = 'singles'
  AND elo_tier >= 1800  -- Diamond tier+
GROUP BY species
ORDER BY usage_count DESC
LIMIT 20;
```

**Most Used Pokemon (Overall):**
```sql
SELECT
    json_extract(pokemon_json, '$.species') as species,
    COUNT(*) as battles,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as usage_percentage
FROM battle_records
WHERE season_name = 'Season 1' AND format = 'singles'
GROUP BY species
ORDER BY battles DESC
LIMIT 50;
```

**Move Usage Statistics:**
```sql
SELECT
    json_extract(pokemon_json, '$.moves[0]') as move,
    COUNT(*) as usage
FROM battle_records
WHERE season_name = 'Season 1' AND format = 'singles'
GROUP BY move
ORDER BY usage DESC
LIMIT 20;
```

### Player Statistics Queries

**Player Match History:**
```sql
SELECT
    season_name,
    format,
    elo,
    matches,
    wins,
    ROUND(wins * 100.0 / matches, 2) as win_rate
FROM format_stats
WHERE uuid = 'player-uuid-here'
ORDER BY season_name DESC, format;
```

**Player Tier Progression:**
```sql
SELECT
    season_name,
    MAX(elo) as peak_elo,
    MAX(matches) as total_battles,
    MAX(wins) as total_wins
FROM format_stats
WHERE uuid = 'player-uuid-here'
GROUP BY season_name
ORDER BY season_name DESC;
```

**Streak Leaders:**
```sql
SELECT uuid, best_streak, wins, matches
FROM format_stats
WHERE format = 'singles' AND season_name = 'Season 1'
ORDER BY best_streak DESC
LIMIT 10;
```

### Activity Statistics Queries

**Battles by Format:**
```sql
SELECT
    format,
    COUNT(*) as total_battles,
    COUNT(DISTINCT uuid) as unique_players
FROM battle_records
WHERE season_name = 'Season 1'
GROUP BY format;
```

**Daily Activity:**
```sql
SELECT
    DATE(FROM_UNIXTIME(timestamp / 1000)) as date,
    COUNT(*) as battles
FROM battle_records
WHERE season_name = 'Season 1'
GROUP BY date
ORDER BY date DESC
LIMIT 30;
```

**Peak Hours:**
```sql
SELECT
    HOUR(FROM_UNIXTIME(timestamp / 1000)) as hour,
    COUNT(*) as battles
FROM battle_records
WHERE season_name = 'Season 1'
GROUP BY hour
ORDER BY battles DESC;
```

---

## Building Web Applications

### Node.js Example

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'cobbleranked',
  password: 'your_password',
  database: 'cobbleranked'
});

// Get leaderboard
async function getLeaderboard(format, seasonName, limit = 10) {
  const [rows] = await pool.query(
    `SELECT uuid, elo, matches, wins, losses
     FROM format_stats
     WHERE format = ? AND season_name = ?
     ORDER BY elo DESC
     LIMIT ?`,
    [format, seasonName, limit]
  );
  return rows;
}

// Get Pokemon usage
async function getPokemonUsage(seasonName, format, minTier = 0) {
  const [rows] = await pool.query(
    `SELECT
      json_extract(pokemon_json, '$.species') as species,
      COUNT(*) as usage_count
     FROM battle_records
     WHERE season_name = ? AND format = ? AND elo_tier >= ?
     GROUP BY species
     ORDER BY usage_count DESC
     LIMIT 20`,
    [seasonName, format, minTier]
  );
  return rows;
}

// Express.js API endpoint
const express = require('express');
const app = express();

app.get('/api/leaderboard/:format', async (req, res) => {
  const { format } = req.params;
  const season = req.query.season || 'Season 1';
  const data = await getLeaderboard(format, season);
  res.json(data);
});

app.get('/api/usage/:format', async (req, res) => {
  const { format } = req.params;
  const season = req.query.season || 'Season 1';
  const minTier = req.query.minTier || 0;
  const data = await getPokemonUsage(season, format, minTier);
  res.json(data);
});

app.listen(3000);
```

### Python Example

```python
import mysql.connector
from flask import Flask, jsonify
from typing import List, Dict

app = Flask(__name__)

class CobbleRankedAPI:
    def __init__(self, host='localhost', user='cobbleranked',
                 password='your_password', database='cobbleranked'):
        self.conn = mysql.connector.connect(
            host=host, user=user, password=password, database=database
        )

    def get_leaderboard(self, format: str, season: str, limit: int = 10) -> List[Dict]:
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute(
            f"SELECT uuid, elo, matches, wins, losses FROM format_stats "
            f"WHERE format = %s AND season_name = %s "
            f"ORDER BY elo DESC LIMIT %s",
            (format, season, limit)
        )
        return cursor.fetchall()

    def get_usage_stats(self, season: str, format: str, min_tier: int = 0) -> List[Dict]:
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute(
            f"SELECT json_extract(pokemon_json, '$.species') as species, "
            f"COUNT(*) as usage_count FROM battle_records "
            f"WHERE season_name = %s AND format = %s AND elo_tier >= %s "
            f"GROUP BY species ORDER BY usage_count DESC LIMIT 20",
            (season, format, min_tier)
        )
        return cursor.fetchall()

api = CobbleRankedAPI()

@app.route('/api/leaderboard/<format>')
def leaderboard(format):
    season = request.args.get('season', 'Season 1')
    return jsonify(api.get_leaderboard(format, season))

@app.route('/api/usage/<format>')
def usage(format):
    season = request.args.get('season', 'Season 1')
    min_tier = int(request.args.get('minTier', 0))
    return jsonify(api.get_usage_stats(season, format, min_tier))

if __name__ == '__main__':
    app.run(port=3000)
```

---

## Security Considerations

⚠️ **Important:** When connecting external applications to CobbleRanked's database:

1. **Use Read-Only Accounts:** Create a separate database user with `SELECT` only permissions

   ```sql
   CREATE USER 'cobbleranked_web'@'%' IDENTIFIED BY 'secure_password';
   GRANT SELECT ON cobbleranked.* TO 'cobbleranked_web'@'%';
   ```

2. **Connection Pooling:** Limit concurrent connections to prevent database overload

3. **Rate Limiting:** Implement rate limiting on your API endpoints

4. **Data Sanitization:** Always sanitize user input to prevent SQL injection

5. **HTTPS:** Use HTTPS in production for secure data transmission

---

## Real-Time Updates

For real-time leaderboard updates:

1. **Polling:** Query the database every 30-60 seconds
2. **WebSocket Server:** Create a WebSocket server that pushes updates
3. **Redis Integration:** Use Redis as a cache layer for faster reads

---

## Database Schema Reference

### format_stats
Per-player statistics for each format and season.

| Column | Type | Description |
|--------|------|-------------|
| uuid | VARCHAR(36) | Player UUID |
| format | VARCHAR(32) | Battle format (singles, doubles, triples) |
| season_name | VARCHAR(64) | Season identifier |
| elo | INT | Current Elo rating |
| matches | INT | Total matches played |
| wins | INT | Total wins |
| current_streak | INT | Current win/loss streak |
| best_streak | INT | Best streak achieved |

### battle_records
Battle snapshots for usage statistics.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Record ID |
| season_name | VARCHAR(64) | Season identifier |
| format | VARCHAR(32) | Battle format |
| elo_tier | INT | Elo tier at battle time |
| timestamp | BIGINT | Unix timestamp in milliseconds |
| pokemon_json | TEXT | JSON array of Pokemon data |

### seasons
Season information and status.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Season ID |
| name | VARCHAR(64) | Season name |
| start_date | DATE | Season start date |
| end_date | DATE | Season end date |
| is_active | BOOLEAN | Whether season is currently active |

---

## See Also

- [Database Configuration](database) - Database setup and schema
- [Placeholders](../integration/placeholders) - Placeholder API details
- [Cross-Server Setup](cross-server) - Multi-server configuration
- [FAQ](../support/faq) - Common questions
