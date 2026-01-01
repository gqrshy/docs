---
title: Database Configuration
description: SQLite and MySQL database setup.
---

CobbleRanked supports SQLite (default) and MySQL databases.

## SQLite (Default)

Zero configuration required. Database auto-creates at `config/cobbleranked/cobbleranked.db`.

```json5
{
  "database": {
    "type": "sqlite",
    "sqlite": {
      "file": "cobbleranked.db"
    }
  }
}
```

### When to Use SQLite

- Single server
- Small to medium player base
- Simple setup preferred

## MySQL

Required for cross-server setups.

```json5
{
  "database": {
    "type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password",
      "useSSL": false
    }
  }
}
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

CobbleRanked uses HikariCP for efficient connection pooling. Default settings work for most servers.

## Migration

### SQLite to MySQL

1. Export SQLite data (contact support)
2. Create MySQL database
3. Update config to MySQL
4. Import data
5. Restart server

### Backup

**SQLite**: Copy `cobbleranked.db` file

**MySQL**: Use `mysqldump`

```bash
mysqldump -u cobbleranked -p cobbleranked > backup.sql
```

## Troubleshooting

### Connection refused

- Check MySQL is running
- Verify host/port
- Check firewall rules
- Verify user permissions

### Access denied

- Check username/password
- Verify user has privileges
- Check if user can connect from server IP

### Tables not creating

- Check database exists
- Verify CREATE permission
- Check server logs for errors
