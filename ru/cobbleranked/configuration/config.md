# Основная конфигурация

---
**CobbleRanked** > **Конфигурация** > **Основная конфигурация**
---

Полный справочник для `config/cobbleranked/config.json5`.

---

## Расположение файла

`config/cobbleranked/config.json5`

---

## Быстрый справочник

| Раздел | Назначение |
|---------|---------|
| [Язык](#язык) | Язык интерфейса |
| [Cross-Server](#cross-server) | Настройки MySQL + Redis |
| [Ranked Match](#ranked-match) | Механика боя |
| [Matchmaking](#matchmaking) | Динамические диапазоны Elo |
| [Elo System](#elo-system) | Расчет рейтинга |
| [Competitive](#competitive) | Штрафы за побег, управление сезонами |

---

## Язык

```json5
{
  "language": "en-Us"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

---

## Cross-Server

Включите режим cross-server с MySQL и Redis.

```json5
{
  "cross_server": {
    "enabled": false,
    "server_id": "lobby1",
    "battle_server": "battle1",  // Пусто = это БОЕВОЙ сервер

    "database": {
      "type": "MYSQL",           // MYSQL или SQLITE
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "root",
      "password": ""
    },

    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0              // 0-15
    }
  }
}
```

**См.:** [Настройка Cross-Server](../advanced/cross-server.md)

---

## Ranked Match

Механика боя и требования к команде.

```json5
{
  "ranked_match": {
    "reset_days": 30,            // Длительность сезона
    "levelMatch": 70,            // Принудительный уровень покемонов (0 = отключено)
    "turn_limit": 100,           // Макс. ходов на бой

    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,        // На игрока
      "max_team_size": 3
    }
  }
}
```

### Боевые клаузы

```json5
{
  "battle_clauses": {
    "species_clause": true,      // Запрет дубликатов видов
    "item_clause": false,        // Дубликаты предметов разрешены
    "evasion_clause": true,      // Запрет приёмов уклонения
    "ohko_clause": true,         // Запрет OHKO приёмов
    "sleep_clause": true,        // Макс. 1 спящий противник
    "dynamax_clause": true,      // Запрет Dynamax
    "terastal_clause": false     // Terastallization разрешена
  }
}
```

---

## Matchmaking

Динамическое расширение диапазона Elo.

```json5
{
  "matchmaking": {
    "enabled": true,
    "initial_range": 200,        // Начальный ±Elo
    "expansion_delay": 30,       // Секунды до расширения
    "expansion_rate": 5,         // Секунды на +1 Elo
    "max_multiplier": 3.0,       // Макс. ±600 (200 × 3.0)
    "immediate_match_range": 100  // Мгновенный матч при ±100
  }
}
```

**См.:** [Динамический Matchmaking](../features/dynamic-matchmaking.md)

---

## Elo System

Режим расчета рейтинга.

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",  // LEGACY, POKEMON_SHOWDOWN, GLICKO2

    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,          // Минимальный Elo
      "kFactor": 32,
      "provisionalMatches": 10,
      "provisionalKFactor": 64,

      "decay": {
        "enabled": true,
        "runAtUtcHour": 9,       // Ежедневная проверка затухания
        "slowDecayReduction": 2  // -2 Elo в день
      }
    },

    "glicko2": {
      "initialRating": 1500.0,
      "initialRD": 350.0,
      "initialVolatility": 0.06,
      "tau": 0.5,
      "rdDecayDays": 30
    }
  }
}
```

**См.:** [Система Elo](../features/elo-system.md)

---

## Competitive

Штрафы за побег и управление сезонами.

```json5
{
  "competitive": {
    "syncLocalQueue": true,
    "preventDuplicatePenalty": true,
    "asyncSeasonManager": true,
    "pendingMatchTimeout": 5,    // Минуты
    "cleanupResources": true,

    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    },

    "flee_decay": {
      "enabled": true,
      "decay_rate": 1,           // Уменьшение счётчика побегов
      "decay_interval_hours": 24
    }
  }
}
```

**См.:** [Штрафы за отключение](../features/disconnect-penalties.md)

---

## Connection Pool

Настройки пула соединений MySQL (только для cross-server).

```json5
{
  "connection_pool": {
    "maximum_pool_size": 10,
    "minimum_idle": 5,
    "maximum_lifetime": 1800000,  // 30 минут (мс)
    "connection_timeout": 5000     // 5 секунд (мс)
  }
}
```

**Рекомендации:**
- 2-3 сервера: `maximum_pool_size: 10`
- 4-6 серверов: `maximum_pool_size: 15`
- 7+ серверов: `maximum_pool_size: 20`

---

## Перезагрузка

После редактирования конфигурации:

```
/rankedadmin reload
```

Перезагружает все конфигурационные файлы без перезапуска сервера.

---

## Следующие шаги

### Для тонкой настройки
1. **[Подробности системы Elo](../features/elo-system.md)** - Углубленный обзор расчета рейтинга
2. **[Руководство по Matchmaking](../features/elo-system.md#dynamic-matchmaking)** - Оптимизация времени очереди
3. **[Управление сезонами](../features/seasons.md)** - Настройка соревновательных периодов

### Для конкурентной настройки
1. **[Конфигурация черного списка](blacklist.md)** - Применение ограничений Smogon/VGC
2. **[Боевые клаузы](../features/ranked-battles.md#battle-clauses)** - Включение конкурентных правил
3. **[Система наград](rewards.md)** - Настройка призов

### Для масштабирования
1. **[Настройка Cross-Server](../advanced/cross-server.md)** - Конфигурация нескольких серверов
2. **[Оптимизация базы данных](../advanced/database.md)** - Настройка MySQL/MongoDB
3. **[Connection Pooling](../advanced/database.md#connection-pool)** - Настройка производительности

---

## Связанные страницы
- [Конфигурация черного списка](blacklist.md) - Ограничения покемонов/приёмов
- [Конфигурация наград](rewards.md) - Награды за сезоны и достижения
- [Справочник команд](../getting-started/commands.md) - Админские команды
