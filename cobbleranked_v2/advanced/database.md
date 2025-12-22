# Database Configuration

Configure data storage for CobbleRanked.

---

## Overview

CobbleRanked supports three database options:

| Database | Use Case | Multi-Server |
|----------|----------|--------------|
| **SQLite** | Single server (default) | ❌ |
| **MySQL** | Multi-server networks | ✅ |
| **MongoDB** | Large-scale deployments | ✅ |

---

## SQLite (Default)

Local file-based database, no setup required.

```yaml
# config.yaml
database:
  type: "sqlite"
  sqlite:
    path: "config/cobbleranked/data.db"
```

**Pros:**
- Zero configuration
- No external services
- Perfect for single servers

**Cons:**
- Cannot share across servers
- Limited concurrent access

---

## MySQL

Shared database for multi-server networks.

### Configuration

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

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `host` | `localhost` | MySQL server address |
| `port` | `3306` | MySQL port |
| `database` | `cobbleranked` | Database name |
| `username` | `root` | Database user |
| `password` | `""` | Database password |
| `pool.maxSize` | `10` | Max connections |
| `pool.minIdle` | `2` | Min idle connections |

### Setup

1. Install MySQL Server (8.0+)

2. Create database and user:
```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

3. Configure `config.yaml` with credentials

4. Start server - tables created automatically

---

## MongoDB

Document-based database for large deployments.

### Configuration

```yaml
# config.yaml
database:
  type: "mongodb"
  mongodb:
    connectionString: "mongodb://localhost:27017"
    database: "cobbleranked"
```

### Connection String Formats

```yaml
# Local
connectionString: "mongodb://localhost:27017"

# With authentication
connectionString: "mongodb://username:password@localhost:27017"

# Replica set
connectionString: "mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=rs0"

# MongoDB Atlas
connectionString: "mongodb+srv://username:password@cluster.mongodb.net"
```

### Setup

1. Install MongoDB (6.0+)

2. Create database and user:
```javascript
use cobbleranked
db.createUser({
  user: "cobbleranked",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "cobbleranked" }]
})
```

3. Configure `config.yaml`

4. Start server - collections created automatically

---

## Migration

### SQLite to MySQL

1. Export SQLite data (manual process)
2. Configure MySQL in `config.yaml`
3. Restart server (empty database)
4. Manually restore critical data with admin commands

### MySQL to MongoDB

1. Export MySQL data
2. Configure MongoDB in `config.yaml`
3. Restart server (empty database)
4. Manually restore data

> ⚠️ **Warning:** Automatic migration between databases is not supported. Plan carefully before changing database types.

---

## Backup

### SQLite

```bash
cp config/cobbleranked/data.db config/cobbleranked/data.db.backup
```

### MySQL

```bash
mysqldump -u cobbleranked -p cobbleranked > cobbleranked_backup.sql
```

### MongoDB

```bash
mongodump --db cobbleranked --out ./backup
```

---

## Performance Tuning

### MySQL Connection Pool

```yaml
mysql:
  pool:
    maxSize: 20      # Increase for high traffic
    minIdle: 5       # Maintain warm connections
```

### MongoDB Connection

For high-traffic servers, use replica sets:

```yaml
mongodb:
  connectionString: "mongodb://host1,host2,host3/?replicaSet=rs0&readPreference=secondaryPreferred"
```

---

## Troubleshooting

### Connection Failed

**Symptoms:** `Database connection failed` in logs

**Solutions:**
1. Verify database server is running
2. Check host/port are correct
3. Verify credentials
4. Check firewall allows connection
5. Test connection with database client

### Timeout Errors

**Symptoms:** `Connection timeout` errors

**Solutions:**
1. Check network connectivity
2. Increase connection timeout
3. Verify database server load
4. Check connection pool settings

---

## See Also

- [Cross-Server Setup](cross-server.md) - Multi-server configuration
- [Main Config](../configuration/config.md) - Full settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
