# Настройка Cross-Server

Запускайте CobbleRanked на нескольких серверах с общими рейтингами.

## Архитектура

**Серверы:**
- **Боевой сервер** - Хостит все рейтинговые бои
- **Лобби/Основные серверы** - Игроки встают в очередь здесь, переносятся на боевой сервер

**Требуемые компоненты:**
- Прокси Velocity (3.3.0+)
- MySQL или MongoDB (общая база данных)
- Redis (синхронизация очереди в реальном времени)

## Установка

### 1. Настройка прокси Velocity

**Плагин:** [ProxyCommand Reloaded](https://modrinth.com/plugin/proxy-command-reloaded)

### 2. Моды сервера Fabric

Установите на **всех** серверах (лобби, основной, боевой):

- [CrossStitch](https://modrinth.com/mod/crossstitch)
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [Placeholder API](https://modrinth.com/mod/placeholder-api) (2.4.2+1.21+)
- [Cobblemon](https://modrinth.com/mod/cobblemon) (1.6.1+)
- [CobbleRanked](https://modrinth.com/mod/cobbleranked)

### 3. Настройка базы данных

**MySQL:**
```sql
CREATE DATABASE cobbleranked;
CREATE USER 'ranked'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'ranked'@'%';
```

**MongoDB:**
```javascript
use cobbleranked
db.createUser({user: "ranked", pwd: "password", roles: ["readWrite"]})
```

### 4. Настройка Redis

```bash
sudo apt install redis-server
sudo systemctl start redis
```

## Конфигурация

### Боевой сервер

`config/cobbleranked/config.json5`:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Пусто = это БОЕВОЙ сервер
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": ""
    }
  },
  "database_type": "mysql",
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

### Лобби/Основные серверы

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle",  // Целевой перенос
    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

См. полную английскую документацию для деталей устранения неполадок.