# CobbleRanked

Cobblemonサーバーに競技性の高いランク戦システムを追加するFabric MODです。

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

---

## 主な機能

### 基本機能（自動で有効）
- **ランク戦システム** - Eloレートによる対戦マッチング
- **シングル/ダブルバトル** - 独立したランキング
- **シーズンシステム** - 30日ごとの自動更新
- **リーダーボード** - トップ10の表示
- **切断ペナルティ** - 逃走の追跡と制限

### オプション機能（設定で有効化）
- **クロスサーバー** - 複数サーバー間でランキング共有
- **ブラックリスト** - ポケモン・技・特性・アイテムの禁止
- **報酬システム** - シーズン終了時やマイルストーン報酬
- **アリーナ** - バトル専用座標へのテレポート
- **多言語対応** - 英語、日本語、ポルトガル語、ロシア語

---

## クイックスタート

1. MODを `mods` フォルダに配置
2. サーバーを起動（自動で設定ファイル生成）
3. `/ranked` コマンドで動作確認

**詳細:** [インストールガイド](getting-started/installation.md)

---

## ドキュメント

### 📖 はじめに
- [インストール](getting-started/installation.md)
- [クイックスタート](getting-started/quick-start.md)
- [コマンド一覧](getting-started/commands.md)

### ⚙️ 設定
- [メイン設定](configuration/config.md)
- [ブラックリスト](configuration/blacklist.md)
- [アリーナ](configuration/arenas.md)
- [報酬](configuration/rewards.md)
- [言語](configuration/languages.md)
- [GUI](configuration/gui.md)

### 🎮 機能
- [ランクバトル](features/ranked-battles.md)
- [Eloシステム](features/elo-system.md)
- [バトルフォーマット](features/battle-formats.md)
- [シーズン](features/seasons.md)
- [リーダーボード](features/leaderboards.md)
- [切断ペナルティ](features/disconnect-penalties.md)
- [動的マッチメイキング](features/dynamic-matchmaking.md)

### 🔧 高度な設定
- [クロスサーバー](advanced/cross-server.md)
- [データベース](advanced/database.md)
- [Redis](advanced/redis.md)

### 💬 サポート
- [FAQ](support/faq.md)
- [トラブルシューティング](support/troubleshooting.md)
- [Discord](https://discord.gg/VVVvBTqqyP)

---

## システム要件

| 必須 | バージョン |
|------|-----------|
| Minecraft | 1.21.1 |
| Cobblemon | 1.7.0+ |
| Fabric Loader | 0.17.2+ |
| Fabric API | 0.116.6+ |
| Fabric Language Kotlin | 1.13.6+ |

**オプション（クロスサーバー時）:** MySQL/MongoDB 8.0+, Redis 6.0+, Velocity 3.4.0+

---

## 更新履歴

**v1.0.1** (2024-11-08)
- MongoDB対応
- PlaceholderAPI拡張
- バグ修正

[詳細を見る](CHANGELOG-1.0.1.md)

---

## サポート

- **質問・バグ報告:** [Discord](https://discord.gg/VVVvBTqqyP) の #feedbackチャンネル
- **よくある質問:** [FAQ](support/faq.md)
- **問題解決:** [トラブルシューティング](support/troubleshooting.md)
