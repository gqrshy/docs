# Language Files

Customize all CobbleRanked messages by editing language files.

**Location:** `config/cobbleranked/language/`

---

## Available Languages

| Language | File | Status |
|----------|------|--------|
| English | `en-Us.json5` | ✅ Complete |
| Japanese | `ja-Jp.json5` | ✅ Complete |
| French | `fr-Fr.json5` | ✅ Complete |

Set the active language in `config.json5`:

```json5
{
  "language": "en-Us"  // Options: en-Us, ja-Jp, fr-Fr
}
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

## Full Language Files

<details>
<summary><strong>English (en-Us.json5) - Complete File</strong></summary>

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  LANGUAGE FILE (en-Us)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ===== MESSAGE PREFIXES =====
  "prefix": "&8[&6Ranked&8]&r ",
  "prefix_error": "&c✗ ",
  "prefix_success": "&a✓ ",
  "prefix_warning": "&e⚠ ",

  // ===== FORMAT NAMES =====
  "format_name_doubles": "Doubles",
  "format_name_multi": "Multi",
  "format_name_random_3v3": "Random 3v3",
  "format_name_random_doubles": "Random Doubles",
  "format_name_random_singles": "Random Singles",
  "format_name_singles": "Singles",
  "format_name_triples": "Triples",
  "format_selector_selected": "&a&l★ {battle_format}",
  "format_selector_unselected": "&7  {battle_format}",

  // ===== PLAYER INFO =====
  "player_info_click_refresh": "&7Click to refresh stats",
  "player_info_elo": "&7Elo: &f{stats_elo}",
  "player_info_format_header": "&e&l{battle_format}",
  "player_info_record": "&7W/L: &a{stats_wins}&7/&c{stats_losses} &7(&e{stats_winrate}%&7)",
  "player_info_refresh_cooldown": "&cPlease wait {cooldown_seconds} seconds before refreshing again.",
  "player_info_refreshed": "&aStats refreshed!",
  "player_info_season_header": "&6&lSeason Info",
  "player_info_season_name": "&7Season: &f{season_name}",
  "player_info_season_remaining": "&7Remaining: &e{season_remaining_time}",
  "player_info_title": "&a&l{player_name}'s Stats",

  // ===== GUI COMMON =====
  "gui_back_button": "&c&lBack",
  "gui_back_button_lore": "&7Return to main menu",
  "gui_blacklist_click_to_switch": "&7Click to switch",
  "gui_blacklist_formats_header": "&eFormat:",
  "gui_blacklist_formats_separator": "&7&m━━━━━━━━━━━━",
  "gui_blacklist_title": "&6&l{format_name} Blacklist - {blacklist_category}",
  "gui_empty_slot": "&7Empty Slot",
  "gui_empty_slot_decoration": "&8-",
  "gui_empty_slot_locked": "&c&lLocked",
  "gui_error": "&c&lError",
  "gui_lead_selection_title": "&7Select Lead Pokemon",
  "gui_loading": "&e&lLoading...",
  "gui_loading_lore": "&7Please wait...",
  "gui_match_ready_title": "&a&lMatch Ready",
  "gui_new_reward_title": "&6&lRewards - {format_name}",
  "gui_next_page": "&aNext Page »",
  "gui_next_page_lore": "&7Go to page {gui_page_number}",
  "gui_prev_page": "&c« Previous Page",
  "gui_prev_page_lore": "&7Go to page {gui_page_number}",
  "gui_pyramid_leaderboard_title": "&6&lRanking - {format_name}",
  "gui_ranked_leaderboard_button": "&aTop Players",
  "gui_ranked_leaderboard_lore_1": "&7Click to see the &astrongest",
  "gui_ranked_leaderboard_lore_2": "&7players in the ranked",
  "gui_ranked_queue_button": "&6Join Queue",
  "gui_ranked_queue_lore_1": "&7Click to join the",
  "gui_ranked_queue_lore_2": "&7ranked matchmaking queue",
  "gui_ranked_rewards_button": "&eRewards",
  "gui_ranked_rewards_lore_1": "&7View your season",
  "gui_ranked_rewards_lore_2": "&7and milestone rewards",
  "gui_team_selection_title_format": "&7Select Pokemon - {battle_format}",

  // ===== RANKED GUI =====
  "ranked_gui_already_in_queue": "&cYou are already in the queue!",
  "ranked_gui_flee_penalty": "&cYou have a flee penalty! Remaining time: &e{penalty_seconds} seconds",
  "ranked_gui_joined_queue": "&aYou joined the {battle_format} queue!",
  "ranked_gui_left_queue": "&cYou left the queue.",
  "ranked_gui_match_cooldown": "&cPlease wait &e{cooldown_seconds} &cseconds before joining the queue again!",

  // ===== QUEUE SYSTEM =====
  "queue_error_banned_items": "&c&l✗ Cannot queue with banned items: &r{banned_items_list}",
  "queue_error_banned_items_hint": "&7Remove these items from your inventory and try again.",
  "queue_error_empty_party": "&cYou need at least one Pokemon to queue!",
  "queue_error_insufficient_pokemon": "&c&l✗ Not enough Pokemon! Need {validation_required_count} for {battle_format} format. Current: {validation_current_count}",
  "queue_status_actionbar": "&aSearching... &7({queue_search_seconds}s) &8| &eQueue: &f{queue_size} &8| &bWaiting: &f{queue_waiting_count}",
  "queue_join_announcement": "&8[&6Ranked&8] &e{player_name} &7joined the &a{battle_format} &7queue! &8(&f{queue_count} &7in queue)",

  // ===== VALIDATION SYSTEM =====
  "validation_error_title": "&c✗ Team Validation Error",
  "validation_reason_blacklisted_ability": "&7Banned ability: &c{pokemon_ability}",
  "validation_reason_blacklisted_item": "&7Banned held item: &c{pokemon_held_item}",
  "validation_reason_blacklisted_move": "&7Banned move: &c{pokemon_move}",
  "validation_reason_blacklisted_species": "Individually blacklisted",
  "validation_reason_duplicate_item": "&7Item Clause violation: &c{pokemon_held_item} &7used {validation_duplicate_count} times (max: {item_clause_limit})",
  "validation_summary_valid": "&a✓ All Pokemon available",
  "validation_summary_invalid": "&c✓ {validation_error_count} Pokemon unavailable",

  // ===== TEAM SELECTION =====
  "team_selection_confirm": "&a&lConfirm",
  "team_selection_cancel": "&c&lCancel",
  "team_selection_pokemon_selected": "&a&l✓ Selected",
  "team_selection_pokemon_shiny": "&6✦ Shiny",
  "team_selection_ready_message": "&aReady! Waiting for opponent...",
  "team_selection_timeout_auto_select": "&e&lTime's up! Pokemon were automatically selected.",
  "team_selection_timer_display": "{gui_color}⏱ Time Remaining: {timer_seconds}s",

  // ===== LEAD SELECTION =====
  "lead_selection_confirm": "&a&lConfirm",
  "lead_selection_cancel": "&c&lCancel",
  "lead_selection_selected_single": "&a&l✓ Lead Pokemon",
  "lead_selection_selected_multi": "&a&l✓ Lead Pokemon #{lead_position}",
  "lead_selection_timeout_auto_select": "&e&lTime's up! Lead Pokemon were automatically selected.",

  // ===== MATCH SYSTEM =====
  "match_found_title": "&a&lMatch Found!",
  "match_countdown": "&c{match_countdown_seconds}",
  "match_countdown_subtitle": "&eBattle starting...",
  "match_ready_accept": "&a&lAccept Match",
  "match_ready_decline": "&c&lDecline Match",
  "match_ready_canceled_title": "&cMatch Canceled",
  "match_ready_timeout_warning": "&eMatch was canceled because you did not click the ready button. Repeated AFKs will result in queue penalties.",
  "match_result_broadcast": "&a{winner} &7defeated &c{loser} &7in a ranked match!",

  // ===== BATTLE RESULTS =====
  "battle_start_title": "&a&lBattle Start",
  "battle_start_subtitle": "&7Time limit: &e{timer_minutes} minutes",
  "battle_result_victory": "&a&lVICTORY!",
  "battle_result_victory_title": "&a&lVictory!",
  "battle_result_defeat": "&c&lDEFEAT...",
  "battle_result_defeat_title": "&c&lDefeat...",
  "battle_result_elo_change": "  &eElo Change: {battle_elo_change}",
  "battle_result_draw_message": "&e&lDRAW! &7No Elo change",
  "battle_timer_30s_warning": "&c&l✗ 30 SECONDS REMAINING!",
  "battle_item_usage_blocked": "&c&lThis item cannot be used during battle!",

  // ===== TURN TIMER =====
  "turn_timer_normal": "&f⏱ {timer_seconds}s &7- Select Move/Switch",
  "turn_timer_warning": "&e&l⏱ {timer_seconds}s &e- Select Move/Switch",
  "turn_timer_critical": "&c&l⏱ {timer_seconds}s &c- Select Move/Switch",
  "turn_timeout_title": "&c&lTime Out",
  "turn_timeout_subtitle": "&7Move was auto-selected",

  // ===== LEADERBOARD =====
  "leaderboard_rank_1st": "&6&l🏆 1st &r&6{player_name}",
  "leaderboard_rank_2nd": "&e&l🥈 2nd &r&e{player_name}",
  "leaderboard_rank_3rd": "&c&l🥉 3rd &r&c{player_name}",
  "leaderboard_rank_4_10": "&b#{leaderboard_rank} &f{player_name}",
  "leaderboard_rank_11_25": "&7#{leaderboard_rank} &f{player_name}",
  "leaderboard_your_rank": "&e&lYour Rank: &f#{leaderboard_rank}",

  // ===== RANK NAMES =====
  "rank_bronze": "&6Bronze",
  "rank_silver": "&7Silver",
  "rank_gold": "&eGold",
  "rank_platinum": "&bPlatinum",
  "rank_diamond": "&3Diamond",
  "rank_master": "&5Master",

  // ===== SEASON SYSTEM =====
  "season_ended_announcement": "{prefix}&eThe ranked season has ended!",
  "season_ending_soon": "{prefix}&e{season_name} ends in &c{season_remaining_days} &edays!",
  "season_collect_rewards": "&aCollect your rewards with &e/ranked",
  "season_reward_pending": "&e&lUnclaimed Season Rewards! &7You have {reward_count} rewards waiting.",

  // ===== CASUAL BATTLES =====
  "casual_joined_queue": "&aJoined casual queue for &e{battle_format}&a!",
  "casual_left_queue": "&aYou left the casual queue.",
  "casual_info_title": "&b&lCasual Battles Info",
  "casual_info_desc_1": "&7Casual battles are friendly matches",
  "casual_info_desc_2": "&7that don't affect your Elo rating.",

  // ===== BLACKLIST SYSTEM =====
  "blacklist_category_pokemon": "&fPokemon",
  "blacklist_category_moves": "&fMoves",
  "blacklist_category_abilities": "&fAbilities",
  "blacklist_category_items": "&fItems",
  "blacklist_category_consumables": "&fConsumables",

  // ===== ADMIN COMMANDS =====
  "admin_config_reload_success": "{prefix}Configuration reloaded successfully!",
  "admin_arena_position_set": "{prefix}Arena &e{arena_name} &aposition &e{arena_position} &aset to your current location!",
  "admin_elo_set": "{prefix}Set &e{player_name}&a's &e{battle_format} &aElo to &e{elo_amount}",
  "admin_elo_add": "{prefix}Added &e{elo_amount} &aElo to &e{player_name}&a's &e{battle_format}",
  "admin_elo_remove": "{prefix}Removed &e{elo_amount} &aElo from &e{player_name}&a's &e{battle_format}",
  "no_permission": "&cYou don't have permission to use this command",

  // ===== LISTENER MESSAGES =====
  "listener_cannot_access_pc": "&cYou cannot access PC during ranked matches or while in queue!",
  "listener_cannot_teleport": "&cYou cannot teleport during ranked matches or while in queue!",
  "listener_cannot_use_commands": "&cYou cannot use commands during ranked matches or while in queue!",
  "listener_cannot_pvp": "&cYou cannot attack other players during ranked matches!",

  // ===== BATTLE CAMERA SYSTEM =====
  "camera_toggle_enabled": "&aBattle Camera: &eENABLED",
  "camera_toggle_disabled": "&cBattle Camera: &eDISABLED",
  "camera_ml_enabled": "&aML Camera Enhancement: &eENABLED",
  "camera_ml_disabled": "&cML Camera Enhancement: &eDISABLED"

  // ... (800+ total keys in full file)
}
```

</details>

<details>
<summary><strong>Japanese (ja-Jp.json5) - Complete File</strong></summary>

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  言語ファイル (ja-Jp)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ===== メッセージプレフィックス =====
  "prefix": "&8[&6ランク戦&8]&r ",
  "prefix_error": "&c[✗]&r ",
  "prefix_success": "&a[✓]&r ",
  "prefix_warning": "&e[!]&r ",

  // ===== フォーマット名 =====
  "format_name_doubles": "ダブルス",
  "format_name_multi": "マルチ",
  "format_name_random_3v3": "ランダム3v3",
  "format_name_random_doubles": "ランダムダブルス",
  "format_name_random_singles": "ランダムシングルス",
  "format_name_singles": "シングルス",
  "format_name_triples": "トリプルス",
  "format_selector_selected": "&a&l▶ {battle_format}",
  "format_selector_unselected": "&7  {battle_format}",

  // ===== プレイヤー情報 =====
  "player_info_click_refresh": "&7クリックして更新",
  "player_info_elo": "&7Elo: &f{stats_elo}",
  "player_info_format_header": "&e&l{battle_format}",
  "player_info_record": "&7勝敗: &a{stats_wins}&7勝/&c{stats_losses}&7敗 &7(&e{stats_winrate}%&7)",
  "player_info_refresh_cooldown": "&c統計の更新は {cooldown_seconds} 秒後に可能です。",
  "player_info_refreshed": "&a統計を更新しました！",
  "player_info_season_header": "&6&lシーズン情報",
  "player_info_season_name": "&7シーズン: &f{season_name}",
  "player_info_season_remaining": "&7残り時間: &e{season_remaining_time}",
  "player_info_title": "&a&l{player_name}の統計",

  // ===== GUI共通 =====
  "gui_back_button": "&c&l戻る",
  "gui_back_button_lore": "&7メインメニューに戻る",
  "gui_loading": "&e&l読み込み中...",
  "gui_next_page": "&a次のページ »",
  "gui_prev_page": "&c« 前のページ",

  // ===== ランク戦GUI =====
  "ranked_gui_already_in_queue": "&c既にキューに参加しています！",
  "ranked_gui_joined_queue": "&a{battle_format}のキューに参加しました！",
  "ranked_gui_left_queue": "&cキューから退出しました。",
  "ranked_gui_match_cooldown": "&cキューに再参加するには &e{cooldown_seconds}秒 &cお待ちください！",

  // ===== キューシステム =====
  "queue_error_banned_items": "&c&l⚠ 禁止アイテムを持っているためキューに参加できません: &r{banned_items_list}",
  "queue_error_empty_party": "&cキューに参加するには少なくとも1匹のポケモンが必要です！",
  "queue_status_actionbar": "&aマッチング中... &7({queue_search_seconds}s) &8| &eキュー: &f{queue_size}人 &8| &b待ち: &f{queue_waiting_count}人",
  "queue_join_announcement": "&8[&6ランクマ&8] &e{player_name} &7が &a{battle_format} &7キューに参加しました！ &8(&f{queue_count}人 &7待機中)",

  // ===== 検証システム =====
  "validation_error_title": "&c⚠ チーム検証エラー",
  "validation_reason_blacklisted_ability": "&7禁止特性: &c{pokemon_ability}",
  "validation_reason_blacklisted_item": "&7禁止持ち物: &c{pokemon_held_item}",
  "validation_reason_blacklisted_move": "&7禁止技: &c{pokemon_move}",
  "validation_summary_valid": "&a✓ 全て使用可能",
  "validation_summary_invalid": "&c✗ {validation_current_count}匹が使用不可",

  // ===== チーム選択 =====
  "team_selection_confirm": "&a&l確認",
  "team_selection_cancel": "&c&lキャンセル",
  "team_selection_pokemon_selected": "&a&l✓ 選択中",
  "team_selection_pokemon_shiny": "&6✦ 色違い",
  "team_selection_ready_message": "&a準備完了！相手の準備を待っています...",
  "team_selection_timeout_auto_select": "&e&l時間切れ！ポケモンが自動選択されました。",
  "team_selection_timer_display": "{gui_color}⏱ 残り時間: {timer_seconds}秒",

  // ===== マッチシステム =====
  "match_found_title": "&a&lマッチが見つかりました！",
  "match_countdown": "&c{match_countdown_seconds}",
  "match_countdown_subtitle": "&eバトル開始まで...",
  "match_ready_accept": "&a&lマッチを承諾",
  "match_ready_decline": "&c&lマッチを拒否",
  "match_ready_canceled_title": "&cマッチがキャンセルされました",

  // ===== バトル結果 =====
  "battle_start_title": "&a&lバトル開始",
  "battle_start_subtitle": "&7制限時間: &e{timer_minutes}分",
  "battle_result_victory": "&a&l勝利！",
  "battle_result_victory_title": "&a&l勝利！",
  "battle_result_defeat": "&c&l敗北...",
  "battle_result_defeat_title": "&c&l敗北...",
  "battle_result_elo_change": "  &eElo変動: {battle_elo_change}",
  "battle_result_draw_message": "&e&l引き分け！ &7Elo変動なし",
  "battle_timer_30s_warning": "&c&l⚠ 残り30秒！",

  // ===== ターンタイマー =====
  "turn_timer_normal": "&f⏱ {timer_seconds}秒 &7- 技/交代を選択",
  "turn_timer_warning": "&e&l⏱ {timer_seconds}秒 &e- 技/交代を選択",
  "turn_timer_critical": "&c&l⏱ {timer_seconds}秒 &c- 技/交代を選択",
  "turn_timeout_title": "&c&lタイムアウト",
  "turn_timeout_subtitle": "&7技が自動選択されました",

  // ===== リーダーボード =====
  "leaderboard_rank_1st": "&6&l👑 1位 &r&6{player_name}",
  "leaderboard_rank_2nd": "&e&l🥈 2位 &r&e{player_name}",
  "leaderboard_rank_3rd": "&c&l🥉 3位 &r&c{player_name}",
  "leaderboard_rank_4_10": "&b#{leaderboard_rank} &f{player_name}",
  "leaderboard_your_rank": "&e&lあなたの順位: &f#{leaderboard_rank}",

  // ===== ランク名 =====
  "rank_bronze": "&6ブロンズ",
  "rank_silver": "&7シルバー",
  "rank_gold": "&eゴールド",
  "rank_platinum": "&bプラチナ",
  "rank_diamond": "&3ダイヤモンド",
  "rank_master": "&5マスター",

  // ===== シーズンシステム =====
  "season_ended_announcement": "{prefix}&eランクマッチシーズンが終了しました！",
  "season_ending_soon": "{prefix}&eランクマッチシーズン終了まで &c{days} &e日！",
  "season_collect_rewards": "&a報酬は &e/ranked &aで受け取れます",
  "season_reward_pending": "&e&l未受取のシーズン報酬があります！ &7{reward_count}件の報酬が待っています。",

  // ===== カジュアルバトル =====
  "casual_joined_queue": "&a&e{battle_format}&aのカジュアルキューに参加しました！",
  "casual_left_queue": "&aカジュアルキューから退出しました。",
  "casual_info_title": "&b&lカジュアルバトル情報",
  "casual_info_desc_1": "&7カジュアルバトルはフレンドリーマッチです",
  "casual_info_desc_2": "&7Eloレーティングには影響しません。",

  // ===== ブラックリストシステム =====
  "blacklist_category_pokemon": "&fポケモン",
  "blacklist_category_moves": "&fわざ",
  "blacklist_category_abilities": "&f特性",
  "blacklist_category_items": "&fアイテム",
  "blacklist_category_consumables": "&f消費アイテム",

  // ===== 管理コマンド =====
  "admin_config_reload_success": "{prefix}設定を正常にリロードしました！",
  "admin_arena_position_set": "{prefix}アリーナ &e{arena_name} &aの位置 &e{arena_position} &aを現在地に設定しました！",
  "admin_elo_set": "{prefix}&e{player_name}&aの&e{battle_format} &aEloを&e{elo_amount}&aに設定しました",
  "no_permission": "&cこのコマンドを使用する権限がありません",

  // ===== リスナーメッセージ =====
  "listener_cannot_access_pc": "&cランクマッチ中またはキュー参加中はPCにアクセスできません！",
  "listener_cannot_teleport": "&cランクマッチ中またはキュー参加中はテレポートできません！",
  "listener_cannot_use_commands": "&cランクマッチ中またはキュー参加中はコマンドを使用できません！",
  "listener_cannot_pvp": "&cランクマッチ中は他のプレイヤーを攻撃できません！",

  // ===== バトルカメラシステム =====
  "camera_toggle_enabled": "&aバトルカメラ: &e有効",
  "camera_toggle_disabled": "&cバトルカメラ: &e無効",
  "camera_ml_enabled": "&aMLカメラ拡張: &e有効",
  "camera_ml_disabled": "&cMLカメラ拡張: &e無効"

  // ... (800+ total keys in full file)
}
```

</details>

<details>
<summary><strong>French (fr-Fr.json5) - Complete File</strong></summary>

```json5
{
  // ===== MESSAGE PREFIXES =====
  "prefix": "&8[&6Ranked&8]&r ",
  "prefix_error": "&c[✗]&r ",
  "prefix_success": "&a[✓]&r ",
  "prefix_warning": "&e[!]&r ",

  // ===== FORMAT NAMES =====
  "format_name_doubles": "Doubles",
  "format_name_multi": "Multi",
  "format_name_random_3v3": "Aléatoire 3v3",
  "format_name_random_doubles": "Doubles aléatoires",
  "format_name_random_singles": "Solo aléatoire",
  "format_name_singles": "Solo",
  "format_name_triples": "Triples",
  "format_selector_selected": "&a&l★ {battle_format}",
  "format_selector_unselected": "&7  {battle_format}",

  // ===== PLAYER INFO =====
  "player_info_click_refresh": "&7Clique pour rafraîchir les statistiques",
  "player_info_elo": "&7Elo : &f{elo}",
  "player_info_record": "&7V/D : &a{wins}&7/&c{losses} &7(&e{winrate}%&7)",
  "player_info_season_header": "&6&lInformations Saison",
  "player_info_season_name": "&7Saison : &f{season}",
  "player_info_title": "&a&lStatistiques de {player}",

  // ===== GUI COMMON =====
  "gui_back_button": "&c&lRetour",
  "gui_back_button_lore": "&7Retour au menu principal",
  "gui_loading": "&e&lChargement...",
  "gui_next_page": "&aPage suivante »",
  "gui_prev_page": "&c« Page précédente",

  // ===== RANKED GUI =====
  "ranked_gui_already_in_queue": "&cVous êtes déjà dans la file !",
  "ranked_gui_joined_queue": "&aVous avez rejoint la file {battle_format} !",
  "ranked_gui_left_queue": "&cVous avez quitté la file.",
  "ranked_gui_match_cooldown": "&cVeuillez attendre &e{seconds} &csecondes avant de rejoindre de nouveau !",

  // ===== QUEUE SYSTEM =====
  "queue_error_banned_items": "&c&l✗ Impossible de rejoindre la file avec des objets interdits : &r{items}",
  "queue_error_empty_party": "&cVous devez avoir au moins un Pokémon pour rejoindre la file !",
  "queue_status_actionbar": "&aRecherche... &7({seconds}s) &8| &eFile : &f{queueSize}",

  // ===== VALIDATION =====
  "validation_error_title": "&c✗ Erreur de validation d'équipe",
  "validation_reason_blacklisted_ability": "&7Talent interdit : &c{pokemon_ability}",
  "validation_reason_blacklisted_item": "&7Objet interdit : &c{pokemon_held_item}",
  "validation_reason_blacklisted_move": "&7Capacité interdite : &c{pokemon_move}",
  "validation_summary_valid": "&a✓ Tous les Pokémon sont disponibles",

  // ===== TEAM SELECTION =====
  "team_selection_confirm": "&a&lConfirmer",
  "team_selection_cancel": "&c&lAnnuler",
  "team_selection_pokemon_selected": "&a&l✓ Sélectionné",
  "team_selection_pokemon_shiny": "&6✦ Chromatique",
  "team_selection_ready_message": "&aPrêt ! En attente de l'adversaire...",
  "team_selection_timeout_auto_select": "&e&lTemps écoulé ! Les Pokémon ont été sélectionnés automatiquement.",

  // ===== MATCH SYSTEM =====
  "match_found_title": "&a&lMatch trouvé !",
  "match_countdown_subtitle": "&eLe combat commence...",
  "match_ready_accept": "&a&lAccepter",
  "match_ready_decline": "&c&lRefuser",
  "match_ready_canceled_title": "&cMatch annulé",

  // ===== BATTLE RESULTS =====
  "battle_start_title": "&a&lDébut du combat",
  "battle_start_subtitle": "&7Limite de temps : &e{minutes} minutes",
  "battle_result_victory": "&a&lVICTOIRE !",
  "battle_result_defeat": "&c&lDÉFAITE...",
  "battle_result_elo_change": "  &eChangement d'Elo : {battle_elo_change}",
  "battle_result_draw_message": "&e&lÉGALITÉ ! &7Aucun changement d'Elo",
  "battle_timer_30s_warning": "&c&l✗ PLUS QUE 30 SECONDES !",

  // ===== LEADERBOARD =====
  "leaderboard_rank_1st": "&6&l🏆 1er &r&6{player_name}",
  "leaderboard_rank_2nd": "&e&l🥈 2e &r&e{player_name}",
  "leaderboard_rank_3rd": "&c&l🥉 3e &r&c{player_name}",
  "leaderboard_your_rank": "&e&lVotre Rang : &f#{leaderboard_rank}",

  // ===== RANK NAMES =====
  "rank_bronze": "&6Bronze",
  "rank_silver": "&7Argent",
  "rank_gold": "&eOr",
  "rank_platinum": "&bPlatine",
  "rank_diamond": "&3Diamant",
  "rank_master": "&5Maître",

  // ===== SEASON SYSTEM =====
  "season_ended_announcement": "{prefix}&eLa saison classée est terminée !",
  "season_ending_soon": "{prefix}&e{season} se termine dans &c{days} &ejours !",
  "season_collect_rewards": "&aRécupérez vos récompenses avec &e/ranked",

  // ===== ADMIN COMMANDS =====
  "admin_config_reload_success": "{prefix}Configuration rechargée avec succès !",
  "admin_arena_position_set": "{prefix}Arène &e{arena_name} &aposition &e{pos} &adéfinie !",
  "no_permission": "&cVous n'avez pas la permission d'utiliser cette commande"

  // ... (800+ total keys in full file)
}
```

</details>

---

## Adding a New Language

1. Copy `en-Us.json5` to a new file (e.g., `de-De.json5`)
2. Translate all message values (keep keys unchanged)
3. Set `"language": "de-De"` in `config.json5`
4. Reload: `/rankedadmin reload`

> 📝 **Note:** The full language files contain 800+ keys. The examples above show the most commonly customized messages. Copy the complete file from `config/cobbleranked/language/` for all keys.

---

## See Also

- [GUI Customization](gui.md) - GUI element customization
- [Placeholder API](../integration/placeholders.md) - External placeholders
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
