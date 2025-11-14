# インストールガイド

CobbleRankedをサーバーに導入する手順です。

---

## 必要なMOD

以下を全て `mods` フォルダに配置：

| MOD | バージョン | リンク |
|-----|----------|--------|
| Fabric Loader | 0.17.2+ | [DL](https://fabricmc.net/use/server/) |
| Fabric API | 0.116.6+ | [DL](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| Cobblemon | 1.7.0+ | [DL](https://modrinth.com/mod/cobblemon) |
| Fabric Language Kotlin | 1.13.6+ | [DL](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| CobbleRanked | 最新版 | [Discord](https://discord.gg/VVVvBTqqyP) |

**対象バージョン:** Minecraft 1.21.1

---

## インストール手順

### 1. MODを配置
上記の全てのMODを `mods` フォルダに入れる

### 2. サーバー起動
初回起動時に `config/cobbleranked/` が自動生成される

### 3. 動作確認
ゲーム内で `/ranked` コマンドを実行してGUIが開けばOK

---

## 初期設定（オプション）

### 言語を変更

`config/cobbleranked/config.json5` を編集：

```json5
{
  "language": "ja-Jp"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

### アリーナを設定

バトル開始座標を設定：

```
/rankedadmin arena set main_arena
```

### 基本的なルール設定

`config/cobbleranked/blacklist.json5` を編集：

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**詳細:** [ブラックリスト設定](../configuration/blacklist.md)

---

## クロスサーバー（上級者向け）

複数サーバーでランキングを共有する場合：

**必要なもの:** MySQL/MongoDB, Redis, Velocity

**詳細:** [クロスサーバーセットアップガイド](../advanced/cross-server.md)

---

## トラブルシューティング

### MODが読み込まれない
- 全ての依存MODがあるか確認
- `logs/latest.log` でエラーを確認

### 設定が反映されない
- ファイルを保存後 `/rankedadmin reload` を実行
- JSON5の文法エラーを確認

### その他の問題
- [FAQ](../support/faq.md)
- [トラブルシューティング](../support/troubleshooting.md)
- [Discord](https://discord.gg/VVVvBTqqyP)

---

## 次のステップ

- [クイックスタート](quick-start.md) - 基本的な使い方
- [ブラックリスト設定](../configuration/blacklist.md) - ルールのカスタマイズ
- [アリーナ設定](../configuration/arenas.md) - 複数アリーナの設定
- [報酬設定](../configuration/rewards.md) - シーズン報酬の追加
