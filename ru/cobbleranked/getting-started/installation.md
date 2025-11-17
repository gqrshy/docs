# Руководство по установке

---
**CobbleRanked** > **Начало работы** > **Установка**
---

Полное руководство по установке CobbleRanked на ваш сервер Minecraft.

---

## Необходимые моды

Поместите все эти файлы в папку `mods`:

| Мод | Версия | Загрузка |
|-----|---------|----------|
| Fabric Loader | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| Fabric API | 0.116.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| Cobblemon | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| Fabric Language Kotlin | 1.13.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| **CobbleRanked** | Последняя | [Discord](https://discord.gg/VVVvBTqqyP) |

**Целевая платформа:** Minecraft 1.21.1 (сервер Fabric)

![Папка модов со всеми зависимостями](../../images/dependancies.png)

---

## Шаги установки

### 1. Размещение модов
Скопируйте все JAR-файлы в папку `server/mods/`

### 2. Запуск сервера
При первом запуске конфигурационные файлы генерируются автоматически:

```
server/
├── config/
│   └── cobbleranked/
│       ├── config.json5        ← Основная конфигурация
│       ├── blacklist.json5     ← Ограничения покемонов/атак
│       ├── arenas.json5        ← Координаты сражений
│       ├── rewards.json5       ← Сезонные награды и достижения
│       ├── ranked.db           ← База данных SQLite
│       ├── gui/                ← Интерфейс на 4 языках
│       └── language/           ← Языковые файлы (4 языка)
```

### 3. Проверка установки

**Вывод консоли:**
```
[CobbleRanked] Мод успешно инициализирован
[CobbleRanked] Конфигурация загружена
[CobbleRanked] База данных инициализирована (SQLite)
[CobbleRanked] Менеджер сезонов инициализирован
```

**Тест в игре:**
```
/ranked
```
Если откроется GUI → Установка успешна! ✅

![Главное меню рейтингового GUI](../../images/rankedmenu.png)

---

## Начальная настройка (необязательно)

### Конфигурация языка

По умолчанию: Английский (`en-Us`)

Отредактируйте `config/cobbleranked/config.json5`:

```json5
{
  "language": "ru-Ru"  // en-Us | ja-Jp | pt-Br | ru-Ru
}
```

**Перезагрузка:** `/rankedadmin reload`

**Влияет на:** Текст GUI, сообщения, ошибки валидации

### Настройка арен (рекомендуется)

Телепортация игроков на координаты сражения вместо текущего местоположения.

**Шаг 1:** Встаньте в желаемой точке спавна для сражения
**Шаг 2:** Выполните команду:

```
/rankedadmin arena set main_arena
```

**Сохранено:** Позиция (x, y, z), направление (yaw, pitch), измерение

**Выполнение команды:**
![Команда настройки арены](../../images/setarenacommand.png)

**Вывод команды:**
![Вывод настройки арены](../../images/setarenaoutput.png)

<details>
<summary><strong>Несколько арен (необязательно)</strong></summary>

Создайте несколько мест для сражений для разнообразия:

```
/rankedadmin arena set arena_volcano
/rankedadmin arena set arena_ocean
/rankedadmin arena set arena_forest
```

**Случайный выбор:** Автоматическая ротация между аренами

**Управление аренами:**
```
/rankedadmin arena list          # Просмотреть все
/rankedadmin arena tp <name>     # Телепортироваться на арену
/rankedadmin arena remove <name> # Удалить арену
```

</details>

### Базовые правила (рекомендуется)

Запретить легендарных покемонов и атаки OHKO:

Отредактируйте `config/cobbleranked/blacklist.json5`:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Перезагрузка:** `/rankedadmin reload`

**Подробности:** [Конфигурация черного списка](../configuration/blacklist.md)

---

## Настройка кросс-сервера (расширенная)

**Требуется для:** Многосерверных сетей с общими рейтингами

**Архитектура:**
```
[Серверы лобби] → [Прокси Velocity] → [Сервер сражений]
        ↓                                   ↓
     [MySQL/MongoDB + Redis] ← ← ← ← ← ← ←
```

### Требования

- MySQL 8.0+ ИЛИ MongoDB 6.0+ (выберите один)
- Redis 6.0+
- Velocity 3.4.0+

### Быстрая настройка

**1. Выберите базу данных:**
- MySQL: Традиционная, подходит для 2-5 серверов
- MongoDB: Облачная (Atlas), лучше для 5+ серверов

**2. Установите Redis:**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

**3. Настройте серверы:**

**Сервер сражений** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Пусто = это ЕСТЬ сервер сражений
    "database": {
      "type": "MYSQL",  // или MONGODB
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "ваш_пароль"
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**Серверы лобби** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",     // Уникально для каждого сервера!
    "battle_server": "battle",  // Должно совпадать с именем сервера Velocity
    "database": { /* ТЕ ЖЕ, что и для сервера сражений */ },
    "redis": { /* ТЕ ЖЕ, что и для сервера сражений */ }
  }
}
```

> **[📸 ВСТАВИТЬ: Диаграмма, показывающая кросс-серверную архитектуру с Velocity]**

**Полное руководство:** [Настройка кросс-сервера](../advanced/cross-server.md)

---

## Смотрите также

- [Часто задаваемые вопросы и устранение неполадок](../support/faq.md) - Распространенные проблемы и решения

---

## Справочная структура файлов

```
config/cobbleranked/
├── config.json5           # Основные настройки (сезоны, Эло, правила)
├── blacklist.json5        # Ограничения (покемоны/атаки/способности/предметы)
├── arenas.json5           # Координаты сражений
├── rewards.json5          # Награды в конце сезона и за достижения
├── ranked.db              # База данных SQLite (создается автоматически)
├── gui/
│   ├── gui-enUs.json5     # Английский интерфейс
│   ├── gui-jaJp.json5     # Японский интерфейс
│   ├── gui-ptBr.json5     # Португальский интерфейс
│   └── gui-ruRu.json5     # Русский интерфейс
└── language/
    ├── en-Us.json5        # Английские сообщения
    ├── ja-Jp.json5        # Японские сообщения
    ├── pt-Br.json5        # Португальские сообщения
    └── ru-Ru.json5        # Русские сообщения
```

**Все файлы:** Формат JSON5 (разрешены комментарии `//`)

---

## Следующие шаги

### Для казуальных серверов
1. **[Настроить арены](../configuration/arenas.md)** - Места для сражений
2. **[Настроить награды](../configuration/rewards.md)** - Призы для топ-3
3. **[Настроить интерфейс](../configuration/gui.md)** - Настройка интерфейса

### Для соревновательных серверов
1. **[Настроить черный список](../configuration/blacklist.md)** - Правила Smogon/VGC
2. **[Настроить систему Эло](../configuration/config.md#elo-system)** - Тонкая настройка рейтингов
3. **[Установить масштабирование уровня](../configuration/config.md#ranked-match)** - Принудительно Lv50

### Для кросс-серверных сетей
1. **[Завершить настройку кросс-сервера](../advanced/cross-server.md)** - Полное руководство
2. **[Настроить Velocity](../advanced/cross-server.md#velocity-proxy-setup)** - Маршрутизация серверов
3. **[Настроить базу данных](../advanced/database.md)** - MySQL/MongoDB + Redis

---

## Связанные страницы
- [Руководство по быстрому старту](quick-start.md) - Запустите ваше первое сражение
- [Справочник команд](commands.md) - Основные команды администратора
- [Часто задаваемые вопросы](../support/faq.md) - Распространенные вопросы по установке
