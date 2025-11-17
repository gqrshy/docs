# 設定ガイド

CobbleRanked設定ドキュメントへようこそ。このガイドは、ランクバトルシステムの設定とカスタマイズに役立ちます。

## クイックリンク

- [メイン設定](config.md) - コアサーバー設定とイロレーティングシステム
- [ブラックリスト設定](blacklist.md) - ポケモン、技、特性、アイテムの禁止
- [アリーナ設定](arenas.md) - バトルアリーナの設定
- [報酬システム](rewards.md) - シーズンとマイルストーン報酬の設定
- [言語ファイル](languages.md) - メッセージと翻訳のカスタマイズ
- [GUIカスタマイズ](gui.md) - メニュー外観のカスタマイズ

## 設定フォーマット

CobbleRankedはすべての設定ファイルに**JSON5形式**を使用します。JSON5は:
- ✅ 読み書きが簡単
- ✅ コメントをサポート(`//` または `/* */`)
- ✅ 末尾のカンマを許可
- ✅ 標準JSONより柔軟

## 設定ファイルの場所

すべての設定ファイルは`config/cobbleranked/`にあります

```
config/cobbleranked/
├── config.json5         # メイン設定
├── blacklist.json5      # ポケモン/技/特性の禁止
├── arenas.json5         # バトルアリーナの場所
├── rewards.json5        # シーズン&マイルストーン報酬
├── gui/
│   ├── gui-enUs.json5   # 英語GUI
│   ├── gui-jaJp.json5   # 日本語GUI
│   ├── gui-ptBr.json5   # ポルトガル語GUI
│   └── gui-ruRu.json5   # ロシア語GUI
└── language/
    ├── en-Us.json5      # 英語メッセージ
    ├── ja-Jp.json5      # 日本語メッセージ
    ├── pt-Br.json5      # ポルトガル語メッセージ
    └── ru-Ru.json5      # ロシア語メッセージ
```

## 初回設定

1. **サーバーを起動** - 設定ファイルが自動生成されます
2. **サーバーを停止**
3. **ファイルを編集** 任意のテキストエディタを使用(VS Code、Notepad++など)
4. **サーバーを再起動** - 変更が適用されます

## JSON5ファイルの編集

### 基本ルール

1. **文字列には二重引用符**: `"legendary"` (単一引用符も可: `'legendary'`)
2. **末尾のカンマ許可**: `["A", "B",]` は有効
3. **コメント許可**: `//` または `/* */` を使用
4. **空のリスト**: `[]`
5. **空のオブジェクト**: `{}`

### 例: ポケモンの禁止

```json5
{
  // 伝説のポケモンを禁止
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",
    "Rayquaza",  // JSON5では末尾のカンマOK
  ]
}
```

### JSON5の機能

✅ **コメント:**
```json5
{
  // これはコメントです
  "black_list_pokemon": ["Mewtwo"], // 行末コメント

  /* 複数行
     コメント */
  "black_list_labels": ["legendary"]
}
```

✅ **末尾のカンマ:**
```json5
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",  // 末尾のカンマも問題なし
  ],  // ここも問題なし
}
```

## 設定のリロード

サーバーを再起動せずに設定をリロードするには`/rankedadmin reload`コマンドを使用:

```
/rankedadmin reload
```

## ヘルプを得る

- **ドキュメント**: 上記リンクの特定の設定ガイドを参照
- **例**: 各JSON5ファイルにはオプションを説明するコメントが含まれています
- **サポート**: [Discordサーバー](https://discord.gg/VVVvBTqqyP) (#feedbackチャンネル)で質問

## 次のステップ

- [ブラックリスト設定](blacklist.md) - ポケモン禁止の設定から始める
- [アリーナ設定](arenas.md) - バトル場所を作成
- [報酬カスタマイズ](rewards.md) - シーズンランキングを設定
