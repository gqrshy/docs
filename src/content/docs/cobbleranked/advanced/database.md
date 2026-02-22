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

## See Also

- [Cross-Server Setup](cross-server/) - Multi-server configuration
- [Main Configuration](../configuration/config/) - General settings
- [FAQ](../support/faq/) - Common questions and troubleshooting
