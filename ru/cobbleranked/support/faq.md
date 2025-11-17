# Часто задаваемые вопросы (FAQ)

Распространённые вопросы и ответы о CobbleRanked.

## Базовая информация

<details>
<summary><strong>Что такое CobbleRanked?</strong></summary>

Система конкурентных рейтинговых боёв для серверов Cobblemon.

- Матчмейкинг на основе Elo
- Бои Одиночные/Парные
- Система сезонов с наградами
- Ограничения покемонов/приёмов/способностей/предметов
- Поддержка cross-server (опционально)

</details>

<details>
<summary><strong>Где я могу скачать его?</strong></summary>

**Официально:** [Discord](https://discord.gg/VVVvBTqqyP) (в настоящее время единственный канал распространения)

Modrinth/CurseForge скоро появятся.

</details>

<details>
<summary><strong>Каковы требования?</strong></summary>

- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.7.0+
- Fabric API 0.116.6+
- Fabric Language Kotlin 1.13.6+

</details>

## Установка и настройка

<details>
<summary><strong>Конфигурационные файлы не генерируются</strong></summary>

1. Проверьте, что все зависимости установлены
2. Полностью запустите сервер
3. Проверьте `logs/latest.log` на наличие ошибок

</details>

<details>
<summary><strong>Как изменить язык?</strong></summary>

Отредактируйте `config/cobbleranked/config.json5`:

```json5
{
  "language": "ru-Ru"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

Сохраните и выполните `/rankedadmin reload`.

</details>

## Конфигурация черного списка

<details>
<summary><strong>Как найти названия приёмов?</strong></summary>

Названия приёмов используют формат **lowercase snake_case**.

| Отображаемое название | Внутреннее имя |
|--------------|---------------|
| Fissure | `fissure` |
| Sheer Cold | `sheer_cold` |
| Baton Pass | `baton_pass` |
| Last Respects | `last_respects` |

**Шаблон:** Замените пробелы на подчёркивания, используйте нижний регистр

</details>

<details>
<summary><strong>Как найти ID предметов?</strong></summary>

1. Нажмите `F3 + H`
2. Наведите курсор на предмет в инвентаре
3. ID появится внизу подсказки

</details>

## Cross-Server

<details>
<summary><strong>Требуется ли cross-server?</strong></summary>

Нет. Режим одного сервера работает идеально для большинства серверов.

Используйте cross-server только если:
- У вас 2+ сервера Minecraft
- Хотите общие рейтинги между серверами
- Имеется выделенный боевой сервер

**Требования:** Прокси Velocity, MySQL/MongoDB, Redis

</details>

## Устранение неполадок

<details>
<summary><strong>Ошибки разрешений</strong></summary>

Админ команды требуют OP:

```
/op ВашеИмяПользователя
```

Или предоставьте `cobbleranked.admin` через плагин разрешений

</details>

<details>
<summary><strong>Сбросить Elo игрока</strong></summary>

```
/rankedadmin setelo 1000 ИмяИгрока singles
/rankedadmin setelo 1000 ИмяИгрока doubles
```

</details>

<details>
<summary><strong>Вручную завершить сезон</strong></summary>

```
/rankedadmin season end
/rankedadmin season rotate
```

**Примечание:** Для cross-server выполняйте только на боевом сервере

</details>

## Другое

<details>
<summary><strong>Нужна поддержка?</strong></summary>

1. Проверьте [Руководство по устранению неполадок](troubleshooting.md)
2. Спросите в [Discord](https://discord.gg/VVVvBTqqyP) канал #feedback
3. Для сообщений об ошибках включите:
   - Логи сервера (`logs/latest.log`)
   - Конфигурационный файл (`config/cobbleranked/config.json5`)
   - Шаги для воспроизведения

</details>

См. полную английскую документацию для всех вопросов и ответов.