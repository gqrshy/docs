# Черный список и ограничения

---
**CobbleRanked** > **Конфигурация** > **Черный список**
---

Настройка ограничений на покемонов, приёмы, способности, предметы и контроль действий игроков во время рейтинговых матчей.

**Конфигурационный файл:** `config/cobbleranked/blacklist.json5`

---

## Быстрый старт

### Минимальный пример

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Перезагрузка:** `/rankedadmin reload`

**Эффект:** Запрещает всех легендарных/мифических покемонов + OHKO приёмы

---

## Ограничения на покемонов

### Запрет по меткам (рекомендуется)

Наиболее эффективный способ запретить несколько покемонов:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**Доступные метки:**

| Метка | Количество | Примеры |
|-------|-------|----------|
| `legendary` | ~60 | Mewtwo, Lugia, Rayquaza, Dialga |
| `mythical` | ~20 | Mew, Celebi, Jirachi, Victini |
| `restricted` | ~40 | Легендарные из коробок (ограниченные VGC) |
| `ultra_beast` | 11 | Nihilego, Buzzwole, Xurkitree |
| `paradox` | 16 | Iron Treads, Great Tusk, Flutter Mane |
| `starter` | ~30 | Линия Bulbasaur, линия Charmander и т.д. |
| `fossil` | ~15 | Omanyte, Kabuto, Aerodactyl |
| `baby` | ~20 | Pichu, Cleffa, Igglybuff |
| `powerhouse` | ~12 | Покемоны с BST 600 (Dragonite, Garchomp) |
| `gen1` - `gen9` | Различается | Фильтр по поколению |

> **[📸 ВСТАВИТЬ: Скриншот ошибки валидации при попытке использовать запрещённого легендарного покемона]**

### Количественные ограничения

Разрешите ограниченное количество вместо полного запрета:

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // Макс. 1 легендарный на команду
    "restricted": 2,     // Макс. 2 ограниченных (формат VGC)
    "powerhouse": 3      // Макс. 3 псевдо-легендарных
  }
}
```

**Пример:** Формат VGC Series 1 (разрешено 2 ограниченных покемона)

### Запрет конкретных покемонов

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // Все формы запрещены
    "rayquaza:mega",     // Только Mega Rayquaza
    "charizard:mega_x",  // Только Mega Charizard X
    "weezing:galar"      // Только Galarian Weezing
  ]
}
```

**Синтаксис форм:**
- Без формы (`mewtwo`) = **Все формы** запрещены
- С формой (`mewtwo:mega_x`) = **Только эта форма** запрещена

**Распространенные формы:**
- Mega: `:mega`, `:mega_x`, `:mega_y`
- Региональные: `:alola`, `:galar`, `:hisui`
- Другие: `:primal`, `:origin`, `:10` (Zygarde 10%)

---

## Ограничения на приёмы

### Запрет приёмов

```json5
{
  "black_list_moves": [
    // OHKO приёмы
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine",

    // Запреты Smogon
    "baton_pass",        // Передача Speed Boost
    "last_respects",     // OP приём Gen 9
    "shed_tail"          // OP приём Gen 9
  ]
}
```

> **[📸 ТРЕБУЕТСЯ ИЗОБРАЖЕНИЕ: Сообщение об ошибке при использовании запрещённых приёмов (Fissure, Baton Pass и т.д.)]**

**Названия приёмов:** Нижний регистр snake_case (пробелы → подчёркивания)

<details>
<summary><strong>Справочник распространённых запрещённых приёмов</strong></summary>

| Отображаемое название | Внутреннее имя | Причина |
|--------------|---------------|--------|
| Fissure | `fissure` | OHKO |
| Sheer Cold | `sheer_cold` | OHKO |
| Horn Drill | `horn_drill` | OHKO |
| Guillotine | `guillotine` | OHKO |
| Baton Pass | `baton_pass` | Запрет Smogon OU |
| Last Respects | `last_respects` | Запрет Smogon Gen 9 |
| Shed Tail | `shed_tail` | Запрет Smogon Gen 9 |
| Double Team | `double_team` | Уклонение (если evasion_clause: false) |
| Minimize | `minimize` | Уклонение (если evasion_clause: false) |

</details>

---

## Ограничения на способности

### Запрет способностей

```json5
{
  "black_list_ability": [
    "moody",             // Случайные усиления характеристик (запрет Smogon)
    "shadow_tag",        // Предотвращает замену (запрет Smogon)
    "arena_trap"         // Ловит наземных покемонов (запрет Smogon)
  ]
}
```

**Названия способностей:** Нижний регистр snake_case

<details>
<summary><strong>Часто запрещаемые способности</strong></summary>

| Отображаемое название | Внутреннее имя | Причина |
|--------------|---------------|--------|
| Moody | `moody` | Smogon OU (случайные +2/-1 к характеристикам) |
| Shadow Tag | `shadow_tag` | Smogon OU (ловушка) |
| Arena Trap | `arena_trap` | Smogon OU (ловушка) |
| Power Construct | `power_construct` | Трансформация Zygarde |
| Huge Power | `huge_power` | Удваивает Атаку (выбор баланса) |
| Wonder Guard | `wonder_guard` | Только суперэффективные удары |

</details>

**Как найти названия способностей:**
1. Нажмите `F3 + H` в игре
2. Откройте сводку покемона
3. Наведите курсор на иконку способности
4. Внутреннее имя показано в подсказке

---

## Ограничения на предметы

### Запрет удерживаемых предметов

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // +10% уклонение
    "cobblemon:lax_incense",      // +10% уклонение
    "cobblemon:quick_claw",       // 20% приоритет
    "cobblemon:soul_dew"          // Усиление Latios/Latias
  ]
}
```

**Формат предмета:** `cobblemon:item_name` (обязательно!)

**Как найти ID предметов:**
1. Нажмите `F3 + H`
2. Наведите курсор на предмет в инвентаре
3. ID появится внизу подсказки

> **[📸 ВСТАВИТЬ: Скриншот подсказки F3+H с ID предмета]**

<details>
<summary><strong>Часто запрещаемые предметы</strong></summary>

| Предмет | ID | Причина |
|------|-----|--------|
| Bright Powder | `cobblemon:bright_powder` | Увеличение уклонения |
| Lax Incense | `cobblemon:lax_incense` | Увеличение уклонения |
| Quick Claw | `cobblemon:quick_claw` | RNG приоритет |
| Soul Dew | `cobblemon:soul_dew` | Специфическое усиление Lati@s |
| King's Rock | `cobblemon:kings_rock` | Шанс вздрагивания |

</details>

---

## Готовые конфигурации

### Smogon OU

Стандартный конкурентный формат:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": [
    "baton_pass", "last_respects", "shed_tail",
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

**Также установите:** `levelMatch: 50` в `config.json5`

### VGC Series 1

Официальный формат VGC:

```json5
{
  "restricted_label_limits": {
    "restricted": 2  // Макс. 2 ограниченных покемона
  },
  "black_list_labels": ["mythical"],  // Мифические не разрешены
  "black_list_moves": [
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ]
}
```

**Также установите:** `item_clause: true` + `levelMatch: 50`

### Казуальный (минимальные запреты)

Запрет только нечестных приёмов:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

---

## Продвинутые примеры

### Смешивание ограничений + запретов

Разрешить 1 легендарного, но запретить конкретных:

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // Макс. 1 легендарный
  },
  "black_list_pokemon": [
    "mewtwo",            // Исключение: Mewtwo всегда запрещён
    "rayquaza"           // Исключение: Rayquaza всегда запрещён
  ]
}
```

**Результат:** Можно использовать 1 легендарного (Lugia, Dialga и т.д.), но НЕ Mewtwo или Rayquaza

### Фильтр по поколению

Запретить только покемонов Gen 9:

```json5
{
  "black_list_labels": ["gen9", "paradox"]
}
```

### Поддержка Monotype

Дополнительная конфигурация не требуется - игроки управляют командами вручную

Рекомендуемый черный список:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["baton_pass"]
}
```

---

## Процесс валидации

Когда игрок присоединяется к очереди:

```
1. Проверка черного списка меток
   ❌ "Запрещённый покемон: Mewtwo (legendary)"

2. Проверка черного списка имён/форм
   ❌ "Запрещённый покемон: Mewtwo"

3. Проверка лимитов меток
   ❌ "Слишком много legendary: 2/1"

4. Проверка приёмов
   ❌ "Запрещённый приём: Fissure"

5. Проверка способностей
   ❌ "Запрещённая способность: Moody"

6. Проверка удерживаемых предметов
   ❌ "Запрещённый предмет: cobblemon:bright_powder"

✅ Все проверки пройдены → Вход в очередь
```

> **[📸 ВСТАВИТЬ: Скриншот сообщения об ошибке валидации]**

---

## Устранение неполадок

### Конфигурация не применяется
- Выполните `/rankedadmin reload`
- Проверьте синтаксис JSON5 (пропущенные запятые, скобки)

### Предметы не запрещены
- Используйте формат `cobblemon:item_name` (не отображаемое название)
- Проверьте с помощью `F3 + H`

### Покемоны всё ещё разрешены
- Проверьте написание (без учёта регистра, но опечатки имеют значение)
- Убедитесь, что метка существует для этого покемона
- Проверьте синтаксис форм (`:mega` vs `:mega_x`)

### Дополнительная помощь
- [FAQ - Раздел "Черный список"](../support/faq.md#blacklist-configuration)
- [Discord](https://discord.gg/VVVvBTqqyP) #feedback

---

## Ограничения игроков

Контроль действий игроков на разных фазах рейтинговых матчей.

**Конфигурационный файл:** `config/cobbleranked/restrictions.json5`

### Структура конфигурации

```json5
{
  "queue_phase": { /* Ожидание матча */ },
  "preparation_phase": { /* Выбор команды, обратный отсчёт */ },
  "battle_phase": { /* Активный бой */ }
}
```

Каждая фаза использует одинаковые категории ограничений ниже.

### Доступные ограничения

#### Использование предметов

```json5
"item_usage": {
  "allow_ender_pearl": false,           // Телепортация эндер-жемчугом
  "allow_chorus_fruit": false,          // Телепортация плодом хоруса
  "allow_item_use": true,               // Общее использование предметов
  "allow_item_drop": true,              // Выбрасывание предметов
  "allow_item_pickup": true,            // Подбор предметов
  "allow_consume_items": true,          // Еда/питьё
  "allow_throw_items": true             // Снежки, яйца, зелья
}
```

#### Взаимодействие с блоками

```json5
"block_interactions": {
  "allow_break_blocks": false,          // Ломание блоков
  "allow_place_blocks": false,          // Размещение блоков
  "allow_interact_blocks": true,        // Кнопки, рычаги, двери
  "allow_open_containers": true,        // Сундуки, бочки
  "allow_use_doors": true,              // Двери, люки, ворота
  "allow_use_buttons": true,            // Кнопки, рычаги
  "allow_use_redstone": true            // Компоненты редстоуна
}
```

#### Взаимодействие с сущностями

```json5
"entity_interactions": {
  "allow_damage_entities": false,       // Атака мобов/игроков
  "allow_interact_entities": true,      // ПКМ по сущностям
  "allow_mount_entities": true,         // Езда на лошадях, лодках
  "allow_feed_pokemon": true,           // Кормление покемонов
  "allow_heal_pokemon": true,           // Лечение покемонов
  "allow_trading": false,               // Торговля с жителями
  "allow_breeding": false               // Размножение животных
}
```

#### Бой

```json5
"combat": {
  "allow_pvp": false,                   // Игрок против игрока
  "allow_pve": false,                   // Игрок против сущности (мобы)
  "allow_projectiles": false,           // Луки, арбалеты, трезубцы
  "allow_explosion_damage": true,       // Получение урона от взрывов
  "allow_fall_damage": true             // Получение урона от падения
}
```

#### Движение

```json5
"movement": {
  "allow_teleport_commands": false,     // /tp, /warp, /home и т.д.
  "allow_portals": true,                // Порталы Нижнего мира/Края
  "allow_respawn": true,                // Возрождение после смерти
  "allow_flight": true,                 // Полёт в творческом режиме/элитры
  "allow_swimming": true,               // Плавание
  "allow_riding": true                  // Езда на сущностях
}
```

#### Системные действия

```json5
"system_actions": {
  "allow_pc_access": false,             // Открытие ПК покемонов
  "allow_commands": false,              // Выполнение команд
  "allow_chat": true,                   // Отправка сообщений в чат
  "allow_disconnect": true,             // Отключение от сервера
  "blocked_commands": [                 // Конкретно заблокированные команды
    "tp", "warp", "home", "spawn"
  ]
}
```

#### Инвентарь

```json5
"inventory": {
  "allow_ender_chest": false,           // Доступ к сундуку Края
  "allow_inventory_click": true,        // Клики по слотам инвентаря
  "allow_inventory_drop": true,         // Выбрасывание из инвентаря
  "allow_crafting": false,              // Крафт предметов
  "allow_shulker_boxes": false,         // Доступ к шалкеровым ящикам
  "allow_armor_change": true,           // Смена брони
  "allow_offhand_swap": true            // Замена предмета в дополнительной руке
}
```

### Поведение по умолчанию

**Фаза очереди:**
- Обычный геймплей разрешён
- Команды телепортации заблокированы
- Доступ к ПК заблокирован

**Фаза подготовки:**
- Движение разрешено
- Бой заблокирован
- Взаимодействие с блоками заблокировано

**Фаза боя:**
- Разрешён только UI боя
- Все остальные действия заблокированы

### Примеры распространённых ограничений

#### Разрешить телепортацию во время очереди

```json5
"queue_phase": {
  "movement": {
    "allow_teleport_commands": true
  }
}
```

#### Разрешить доступ к ПК в бою

```json5
"battle_phase": {
  "system_actions": {
    "allow_pc_access": true
  }
}
```

#### Заблокировать конкретные команды

```json5
"queue_phase": {
  "system_actions": {
    "allow_commands": false,
    "blocked_commands": ["tp", "warp", "home", "spawn", "tpa"]
  }
}
```

---

## Следующие шаги

### Для конкурентных форматов
1. **[Формат Smogon OU](../features/ranked-battles.md)** - Применение стандартных конкурентных правил
2. **[Формат VGC](../features/ranked-battles.md)** - Настройка официальных турнирных правил
3. **[Пользовательские форматы](#готовые-конфигурации)** - Использование предоставленных пресетов

### Для продвинутых ограничений
1. **[Количественные ограничения](#количественные-ограничения)** - Разрешение ограниченного числа легендарных (в стиле VGC)
2. **[Запреты конкретных форм](#запрет-конкретных-покемонов)** - Запрет только Mega/Региональных форм
3. **[Ограничения игроков](blacklist.md#ограничения-игроков)** - Контроль действий во время боёв

### Для тестирования
1. **[Валидация быстрого старта](../getting-started/quick-start.md#step-2-configure-pokemon-restrictions)** - Проверка вашего черного списка
2. **[Устранение неполадок](../support/faq.md#blacklist-configuration)** - Распространённые проблемы с черным списком
3. **[Поток боя](../features/ranked-battles.md#pre-battle-validation)** - Понимание валидации

---

## Связанные страницы
- [Основная конфигурация](config.md) - Боевые клаузы и настройки Elo
- [Форматы боя](../features/ranked-battles.md) - Правила для конкретных форматов
- [Справочник команд](../getting-started/commands.md) - Команды перезагрузки для админов
