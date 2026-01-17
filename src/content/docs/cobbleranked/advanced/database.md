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

## See Also

- [Cross-Server Setup](cross-server/) - Multi-server configuration
- [Main Configuration](../configuration/config/) - General settings
- [FAQ](../support/faq/) - Common questions and troubleshooting
