---
title: Database Configuration
description: SQLite, MySQL, and MongoDB database setup.
---

CobbleRanked supports SQLite (default), MySQL, and MongoDB databases.

## SQLite (Default)

Zero configuration required. Database auto-creates at `config/cobbleranked/data.db`.

```yaml
# config.yaml
database:
  type: "sqlite"

  sqlite:
    path: "config/cobbleranked/data.db"
```

### When to Use SQLite

- Single server
- Small to medium player base
- Simple setup preferred

## MySQL

Required for cross-server setups with relational data.

```yaml
# config.yaml
database:
  type: "mysql"

  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_password"
    pool:
      maxSize: 10
      minIdle: 2
```

### When to Use MySQL

- Multiple servers sharing rankings
- Large player base (1000+ players)
- Backup and replication needs

### MySQL Setup

1. Create database:

   ```sql
   CREATE DATABASE cobbleranked;
   CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
   FLUSH PRIVILEGES;
   ```

2. Configure each server with same MySQL credentials

3. Tables auto-create on first start

### Connection Pool

CobbleRanked uses HikariCP for efficient connection pooling:

| Setting   | Default | Description              |
|-----------|---------|--------------------------|
| `maxSize` | 10      | Maximum connections      |
| `minIdle` | 2       | Minimum idle connections |

## MongoDB

Alternative to MySQL for cross-server setups.

```yaml
# config.yaml
database:
  type: "mongodb"

  mongodb:
    connectionString: "mongodb://localhost:27017"
    database: "cobbleranked"
```

### When to Use MongoDB

- Cross-server with document-based storage
- Already running MongoDB infrastructure
- Flexible schema requirements

### MongoDB Setup

1. Install MongoDB 6.0+
2. Create database (auto-creates on first write)
3. Configure connection string

**With authentication:**

```yaml
mongodb:
  connectionString: "mongodb://user:password@localhost:27017"
  database: "cobbleranked"
```

## Migration

### SQLite to MySQL/MongoDB

1. Export SQLite data
2. Create new database
3. Update config type
4. Import data
5. Restart server

### Backup

**SQLite**: Copy `data.db` file

**MySQL**:

```bash
mysqldump -u cobbleranked -p cobbleranked > backup.sql
```

**MongoDB**:

```bash
mongodump --db cobbleranked --out backup/
```

---

## Database Schema

Tables auto-create on first start. For advanced users who want to query or modify data directly.

### Player Stats Table

```sql
player_stats (
    uuid VARCHAR(36) PRIMARY KEY,
    total_matches INT,
    total_wins INT,
    last_played_at BIGINT
)
```

### Format Stats Table

Per-format statistics for each player:

```sql
format_stats (
    uuid VARCHAR(36),
    format VARCHAR(32),
    season_name VARCHAR(64),
    elo INT,
    rd DOUBLE,
    volatility DOUBLE,
    matches INT,
    wins INT,
    current_streak INT,
    best_streak INT,
    flee_count INT,
    PRIMARY KEY (uuid, format, season_name)
)
```

### Seasons Table

```sql
seasons (
    id INTEGER PRIMARY KEY,
    name VARCHAR(64) UNIQUE,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN
)
```

### Pending Rewards Table

Rewards awaiting claim via MailLib:

```sql
pending_rewards (
    id VARCHAR(128) PRIMARY KEY,
    uuid VARCHAR(36),
    season_name VARCHAR(64),
    reward_type VARCHAR(32),
    commands TEXT,
    claimed BOOLEAN
)
```

### Player Missions Table

Daily/weekly mission progress:

```sql
player_missions (
    uuid VARCHAR(36),
    mission_id VARCHAR(64),
    progress INT,
    completed BOOLEAN,
    claimed BOOLEAN,
    current_streak INT,
    last_reset_at BIGINT,
    PRIMARY KEY (uuid, mission_id)
)
```

### Claimed Milestones Table

Track which milestones players have claimed:

```sql
claimed_milestones (
    uuid VARCHAR(36),
    milestone_id VARCHAR(64),
    claimed_at BIGINT,
    PRIMARY KEY (uuid, milestone_id)
)
```

### Battle Records Table

Battle snapshots for usage stats:

```sql
battle_records (
    id INTEGER PRIMARY KEY,
    season_name VARCHAR(64),
    format VARCHAR(32),
    elo_tier INT,
    timestamp BIGINT,
    pokemon_json TEXT
)
```

> 📝 **Index:** `battle_records` has an index on `(season_name, format, elo_tier)` for efficient usage stat queries.

---

## Building Web Applications & APIs

CobbleRanked does not include a built-in web API server. To create websites or external services, you have two options:

### Option 1: Direct Database Access

Connect your web application directly to CobbleRanked's database.

**Node.js Example:**

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'cobbleranked',
  password: 'your_password',
  database: 'cobbleranked'
});

// Get top 10 players by ELO
async function getLeaderboard(format, seasonName) {
  const [rows] = await pool.query(
    `SELECT uuid, elo, matches, wins
     FROM format_stats
     WHERE format = ? AND season_name = ?
     ORDER BY elo DESC
     LIMIT 10`,
    [format, seasonName]
  );
  return rows;
}

// Get player stats
async function getPlayerStats(uuid, format, seasonName) {
  const [rows] = await pool.query(
    `SELECT * FROM format_stats
     WHERE uuid = ? AND format = ? AND season_name = ?`,
    [uuid, format, seasonName]
  );
  return rows[0];
}
```

**Python Example:**

```python
import mysql.connector
from typing import List, Dict

class CobbleRankedAPI:
    def __init__(self, host='localhost', user='cobbleranked',
                 password='your_password', database='cobbleranked'):
        self.conn = mysql.connector.connect(
            host=host, user=user, password=password, database=database
        )

    def get_leaderboard(self, format: str, season: str, limit: int = 10) -> List[Dict]:
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute(
            f"SELECT uuid, elo, matches, wins FROM format_stats "
            f"WHERE format = %s AND season_name = %s "
            f"ORDER BY elo DESC LIMIT %s",
            (format, season, limit)
        )
        return cursor.fetchall()

    def get_player_stats(self, uuid: str, format: str, season: str) -> Dict:
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM format_stats "
            "WHERE uuid = %s AND format = %s AND season_name = %s",
            (uuid, format, season)
        )
        return cursor.fetchone()
```

### Option 2: Custom API Server

Create a REST API server that interfaces with the database.

**Express.js Example:**

```javascript
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'cobbleranked'
});

// Leaderboard endpoint
app.get('/api/leaderboard/:format/:season', async (req, res) => {
  const { format, season } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const [rows] = await pool.query(
      `SELECT uuid, elo, matches, wins
       FROM format_stats
       WHERE format = ? AND season_name = ?
       ORDER BY elo DESC
       LIMIT ?`,
      [format, season, limit]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Player stats endpoint
app.get('/api/player/:uuid/:format/:season', async (req, res) => {
  const { uuid, format, season } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM format_stats
       WHERE uuid = ? AND format = ? AND season_name = ?`,
      [uuid, format, season]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Usage stats endpoint
app.get('/api/usage/:season', async (req, res) => {
  const { season } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT
        format,
        COUNT(*) as total_battles,
        AVG(elo) as avg_elo
       FROM battle_records
       WHERE season_name = ?
       GROUP BY format`,
      [season]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('API running on port 3000'));
```

### Common Use Cases

**Leaderboard Display:**

```sql
-- Top 10 Singles players
SELECT uuid, elo, matches, wins
FROM format_stats
WHERE format = 'singles' AND season_name = 'Season 1'
ORDER BY elo DESC
LIMIT 10;
```

**Player Profile:**

```sql
-- Player stats across all formats
SELECT format, elo, matches, wins, current_streak
FROM format_stats
WHERE uuid = 'player-uuid-here'
AND season_name = 'Season 1';
```

**Usage Statistics:**

```sql
-- Battle count by format
SELECT format, COUNT(*) as battles
FROM battle_records
WHERE season_name = 'Season 1'
GROUP BY format;
```

**Season Overview:**

```sql
-- Get current season info
SELECT * FROM seasons
WHERE is_active = TRUE;
```

### Security Considerations

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

### Real-Time Updates

For real-time leaderboard updates, consider:

1. **Polling:** Query the database every 30-60 seconds
2. **WebSocket Server:** Create a WebSocket server that pushes updates
3. **Redis Integration:** Use Redis as a cache layer for faster reads

---

## See Also

- [Cross-Server Setup](cross-server/) - Multi-server configuration
- [Main Configuration](../configuration/config/) - General settings
- [FAQ](../support/faq/) - Common questions and troubleshooting
