# インストールガイド

---
**CobbleRanked** > **始め方** > **インストール**
---

MinecraftサーバーにCobbleRankedをインストールするための完全ガイドです。

---

## 必要なMod

これらすべてを`mods`フォルダに配置してください:

| Mod | バージョン | ダウンロード |
|-----|---------|----------|
| Fabric Loader | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| Fabric API | 0.116.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| Cobblemon | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| Fabric Language Kotlin | 1.13.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| **CobbleRanked** | 最新版 | [Discord](https://discord.gg/VVVvBTqqyP) |

**対象:** Minecraft 1.21.1 (Fabricサーバー)

![すべての依存関係を含むmodsフォルダ](../../images/dependancies.png)

---

## インストール手順

### 1. Modを配置

すべてのJARファイルを`server/mods/`フォルダにコピーします

### 2. サーバーを起動

初回起動時、設定ファイルが自動生成されます:

```
server/
├── config/
│   └── cobbleranked/
│       ├── config.json5        ← メイン設定
│       ├── blacklist.json5     ← ポケモン/技の制限
│       ├── arenas.json5        ← バトル座標
│       ├── rewards.json5       ← シーズン/マイルストーン報酬
│       ├── ranked.db           ← SQLiteデータベース
│       ├── gui/                ← 4言語対応GUI
│       └── language/           ← 4言語ファイル
```

### 3. インストールを確認

**コンソール出力:**
```
[CobbleRanked] Mod initialized successfully
[CobbleRanked] Configuration loaded
[CobbleRanked] Database initialized (SQLite)
[CobbleRanked] Season manager initialized
```

**ゲーム内テスト:**
```
/ranked
```
GUIが開いたら → インストール成功！ ✅

![ランクGUIメインメニュー](../../images/rankedmenu.png)

---

## 初期設定(オプション)

### 言語設定

デフォルト: 英語(`en-Us`)

`config/cobbleranked/config.json5`を編集:

```json5
{
  "language": "ja-Jp"  // en-Us | ja-Jp | pt-Br | ru-Ru
}
```

**リロード:** `/rankedadmin reload`

**影響範囲:** GUIテキスト、メッセージ、バリデーションエラー

### アリーナ設定(推奨)

プレイヤーを現在地ではなく、バトル座標にテレポートさせます。

**手順1:** 希望するバトルスポーンポイントに立つ
**手順2:** コマンド実行:

```
/rankedadmin arena set main_arena
```

**保存内容:** 位置(x, y, z)、向き(yaw, pitch)、ディメンション

**コマンド実行:**
![アリーナ設定コマンド](../../images/setarenacommand.png)

**コマンド出力:**
![アリーナ設定出力](../../images/setarenaoutput.png)

<details>
<summary><strong>複数アリーナ(オプション)</strong></summary>

バリエーションのために複数のバトル場所を作成:

```
/rankedadmin arena set arena_volcano
/rankedadmin arena set arena_ocean
/rankedadmin arena set arena_forest
```

**ランダム選択:** アリーナ間で自動ローテーション

**アリーナ管理:**
```
/rankedadmin arena list          # すべて表示
/rankedadmin arena tp <name>     # アリーナにテレポート
/rankedadmin arena remove <name> # アリーナ削除
```

</details>

### 基本ルール(推奨)

伝説のポケモンと一撃必殺技を禁止:

`config/cobbleranked/blacklist.json5`を編集:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**リロード:** `/rankedadmin reload`

**詳細:** [ブラックリスト設定](../configuration/blacklist.md)

---

## クロスサーバー設定(上級)

**必要な場合:** ランキングを共有する複数サーバーネットワーク

**アーキテクチャ:**
```
[ロビーサーバー] → [Velocityプロキシ] → [バトルサーバー]
        ↓                                   ↓
     [MySQL/MongoDB + Redis] ← ← ← ← ← ← ←
```

### 必要要件

- MySQL 8.0+ または MongoDB 6.0+ (どちらか一方)
- Redis 6.0+
- Velocity 3.4.0+

### クイック設定

**1. データベース選択:**
- MySQL: 従来型、2-5サーバーに適している
- MongoDB: クラウド対応(Atlas)、5台以上のサーバーに適している

**2. Redisインストール:**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

**3. サーバー設定:**

**バトルサーバー** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // 空 = このサーバーがバトルサーバー
    "database": {
      "type": "MYSQL",  // または MONGODB
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
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

**ロビーサーバー** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",     // サーバーごとに一意にする！
    "battle_server": "battle",  // Velocityサーバー名と一致させる
    "database": { /* バトルサーバーと同じ */ },
    "redis": { /* バトルサーバーと同じ */ }
  }
}
```

> **[📸 INSERT: Velocityを使用したクロスサーバーアーキテクチャを示す図]**

**完全ガイド:** [クロスサーバー設定](../advanced/cross-server.md)

---

## 関連情報

- [FAQ & トラブルシューティング](../support/faq.md) - よくある問題と解決策

---

## ファイル構造リファレンス

```
config/cobbleranked/
├── config.json5           # メイン設定(シーズン、イロレーティング、条項)
├── blacklist.json5        # 制限(ポケモン/技/特性/アイテム)
├── arenas.json5           # バトル座標
├── rewards.json5          # シーズン終了&マイルストーン報酬
├── ranked.db              # SQLiteデータベース(自動作成)
├── gui/
│   ├── gui-enUs.json5     # 英語インターフェース
│   ├── gui-jaJp.json5     # 日本語インターフェース
│   ├── gui-ptBr.json5     # ポルトガル語インターフェース
│   └── gui-ruRu.json5     # ロシア語インターフェース
└── language/
    ├── en-Us.json5        # 英語メッセージ
    ├── ja-Jp.json5        # 日本語メッセージ
    ├── pt-Br.json5        # ポルトガル語メッセージ
    └── ru-Ru.json5        # ロシア語メッセージ
```

**すべてのファイル:** JSON5形式(コメント`//`が使用可能)

---

## 次のステップ

### カジュアルサーバー向け
1. **[アリーナ設定](../configuration/arenas.md)** - バトル場所
2. **[報酬設定](../configuration/rewards.md)** - トップ3の賞品
3. **[GUIカスタマイズ](../configuration/gui.md)** - インターフェース調整

### 競技サーバー向け
1. **[ブラックリスト設定](../configuration/blacklist.md)** - Smogon/VGCルール
2. **[イロレーティングシステム調整](../configuration/config.md#elo-system)** - レーティング微調整
3. **[レベルスケーリング設定](../configuration/config.md#ranked-match)** - Lv50強制

### クロスサーバーネットワーク向け
1. **[クロスサーバー設定完了](../advanced/cross-server.md)** - 完全ガイド
2. **[Velocity設定](../advanced/cross-server.md#velocity-proxy-setup)** - サーバールーティング
3. **[データベース設定](../advanced/database.md)** - MySQL/MongoDB + Redis

---

## 関連ページ
- [クイックスタートガイド](quick-start.md) - 最初のバトルを開始
- [コマンドリファレンス](commands.md) - 必須の管理コマンド
- [FAQ](../support/faq.md) - よくあるインストール質問
