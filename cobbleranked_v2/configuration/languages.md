# Language Files

Customize all CobbleRanked messages by editing language files.

**Location:** `config/cobbleranked/language/`

---

## Available Languages

| Language | File | Status |
|----------|------|--------|
| English | `en-us.yaml` | ✅ Complete |
| Japanese | `ja-jp.yaml` | ✅ Complete |
| French | `fr-fr.yaml` | ✅ Complete |

Set the active language in `config.yaml`:

```yaml
language: "en-us"  # Options: en-us, ja-jp, fr-fr
```

Reload after changing: `/rankedadmin reload`

---

## Placeholders

Messages use `{placeholder}` syntax for dynamic values:

| Placeholder | Description |
|-------------|-------------|
| `{player_name}` | Player's name |
| `{battle_format}` | Singles, Doubles, etc. |
| `{stats_elo}` | Player's Elo rating |
| `{stats_wins}` | Win count |
| `{stats_losses}` | Loss count |
| `{stats_winrate}` | Win rate percentage |
| `{timer_seconds}` | Countdown seconds |
| `{timer_minutes}` | Countdown minutes |
| `{season_name}` | Current season name |
| `{season_remaining_time}` | Time until season ends |
| `{pokemon_name}` | Pokemon name |
| `{pokemon_ability}` | Pokemon ability |
| `{pokemon_move}` | Pokemon move |

---

## Color Codes

| Code | Color | Code | Color |
|------|-------|------|-------|
| `&0` | Black | `&8` | Dark Gray |
| `&1` | Dark Blue | `&9` | Blue |
| `&2` | Dark Green | `&a` | Green |
| `&3` | Dark Aqua | `&b` | Aqua |
| `&4` | Dark Red | `&c` | Red |
| `&5` | Dark Purple | `&d` | Light Purple |
| `&6` | Gold | `&e` | Yellow |
| `&7` | Gray | `&f` | White |
| `&l` | **Bold** | `&o` | *Italic* |
| `&n` | Underline | `&m` | ~~Strikethrough~~ |
| `&r` | Reset | | |

---

## Common Message Keys

<details>
<summary><strong>English (en-us.yaml) - Key Examples</strong></summary>

```yaml
# ===== MESSAGE PREFIXES =====
prefix: "&8[&6Ranked&8]&r "
prefix_error: "&c✗ "
prefix_success: "&a✓ "
prefix_warning: "&e⚠ "

# ===== FORMAT NAMES =====
format_name_singles: "Singles"
format_name_doubles: "Doubles"
format_name_triples: "Triples"
format_name_multi: "Multi"

# ===== PLAYER INFO =====
player_info_elo: "&7Elo: &f{stats_elo}"
player_info_record: "&7W/L: &a{stats_wins}&7/&c{stats_losses} &7(&e{stats_winrate}%&7)"
player_info_title: "&a&l{player_name}'s Stats"

# ===== QUEUE SYSTEM =====
ranked_gui_joined_queue: "&aYou joined the {battle_format} queue!"
ranked_gui_left_queue: "&cYou left the queue."
ranked_gui_already_in_queue: "&cYou are already in the queue!"
queue_status_actionbar: "&aSearching... &7({queue_search_seconds}s) &8| &eQueue: &f{queue_size}"

# ===== MATCH SYSTEM =====
match_found_title: "&a&lMatch Found!"
match_countdown_subtitle: "&eBattle starting..."
match_ready_accept: "&a&lAccept Match"
match_ready_decline: "&c&lDecline Match"

# ===== BATTLE RESULTS =====
battle_start_title: "&a&lBattle Start"
battle_result_victory: "&a&lVICTORY!"
battle_result_defeat: "&c&lDEFEAT..."
battle_result_elo_change: "  &eElo Change: {battle_elo_change}"

# ===== TURN TIMER =====
turn_timer_normal: "&f⏱ {timer_seconds}s &7- Select Move/Switch"
turn_timer_warning: "&e&l⏱ {timer_seconds}s &e- Select Move/Switch"
turn_timer_critical: "&c&l⏱ {timer_seconds}s &c- Select Move/Switch"

# ===== LEADERBOARD =====
leaderboard_rank_1st: "&6&l🏆 1st &r&6{player_name}"
leaderboard_rank_2nd: "&e&l🥈 2nd &r&e{player_name}"
leaderboard_rank_3rd: "&c&l🥉 3rd &r&c{player_name}"
leaderboard_your_rank: "&e&lYour Rank: &f#{leaderboard_rank}"

# ===== RANK NAMES =====
rank_pokeball: "&fPoke Ball"
rank_greatball: "&bGreat Ball"
rank_ultraball: "&eUltra Ball"
rank_masterball: "&5Master Ball"
rank_beastball: "&9Beast Ball"
rank_cherish: "&6Cherish Ball"

# ===== ADMIN COMMANDS =====
admin_config_reload_success: "{prefix}Configuration reloaded successfully!"
admin_elo_set: "{prefix}Set &e{player_name}&a's &e{battle_format} &aElo to &e{elo_amount}"
no_permission: "&cYou don't have permission to use this command"
```

</details>

<details>
<summary><strong>Japanese (ja-jp.yaml) - Key Examples</strong></summary>

```yaml
# ===== メッセージプレフィックス =====
prefix: "&8[&6ランク戦&8]&r "
prefix_error: "&c[✗]&r "
prefix_success: "&a[✓]&r "
prefix_warning: "&e[!]&r "

# ===== フォーマット名 =====
format_name_singles: "シングルス"
format_name_doubles: "ダブルス"
format_name_triples: "トリプルス"
format_name_multi: "マルチ"

# ===== プレイヤー情報 =====
player_info_elo: "&7Elo: &f{stats_elo}"
player_info_record: "&7勝敗: &a{stats_wins}&7勝/&c{stats_losses}&7敗 &7(&e{stats_winrate}%&7)"
player_info_title: "&a&l{player_name}の統計"

# ===== キューシステム =====
ranked_gui_joined_queue: "&a{battle_format}のキューに参加しました！"
ranked_gui_left_queue: "&cキューから退出しました。"
ranked_gui_already_in_queue: "&c既にキューに参加しています！"

# ===== マッチシステム =====
match_found_title: "&a&lマッチが見つかりました！"
match_countdown_subtitle: "&eバトル開始まで..."
match_ready_accept: "&a&lマッチを承諾"
match_ready_decline: "&c&lマッチを拒否"

# ===== バトル結果 =====
battle_start_title: "&a&lバトル開始"
battle_result_victory: "&a&l勝利！"
battle_result_defeat: "&c&l敗北..."
battle_result_elo_change: "  &eElo変動: {battle_elo_change}"

# ===== ランク名 =====
rank_pokeball: "&fモンスターボール"
rank_greatball: "&bスーパーボール"
rank_ultraball: "&eハイパーボール"
rank_masterball: "&5マスターボール"
rank_beastball: "&9ウルトラボール"
rank_cherish: "&6プレシャスボール"

# ===== 管理コマンド =====
admin_config_reload_success: "{prefix}設定を正常にリロードしました！"
no_permission: "&cこのコマンドを使用する権限がありません"
```

</details>

---

## Adding a New Language

1. Copy `en-us.yaml` to a new file (e.g., `de-de.yaml`)
2. Translate all message values (keep keys unchanged)
3. Set `language: "de-de"` in `config.yaml`
4. Reload: `/rankedadmin reload`

> 📝 **Note:** The full language files contain 800+ keys. The examples above show the most commonly customized messages. Copy the complete file from `config/cobbleranked/language/` for all keys.

---

## Message Categories

| Category | Description |
|----------|-------------|
| `prefix_*` | Message prefixes |
| `format_*` | Format names |
| `player_info_*` | Player statistics display |
| `queue_*` | Queue system messages |
| `match_*` | Match finding and ready check |
| `battle_*` | Battle events and results |
| `turn_timer_*` | Turn timer display |
| `leaderboard_*` | Leaderboard display |
| `rank_*` | Rank tier names |
| `season_*` | Season system |
| `casual_*` | Casual battle messages |
| `admin_*` | Admin command responses |
| `validation_*` | Team validation errors |
| `gui_*` | GUI text elements |
| `listener_*` | Restriction messages |

---

## See Also

- [GUI Customization](gui.md) - GUI element customization
- [Placeholder API](../integration/placeholders.md) - External placeholders
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
