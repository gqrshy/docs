# CobbleRanked Documentation Style Guide

このドキュメントは、CobbleRanked Wikiの各ページを執筆する際のスタイルガイドです。

---

## 対象読者

**重要:** このドキュメントは**開発者向けではありません**。

- **対象:** Minecraft サーバー管理者、プレイヤー（一般ユーザー）
- **前提知識:** Minecraft の基本操作、サーバーの基本的な管理方法
- **言語レベル:** 専門用語は最小限に、必要な場合は説明を添える

### 執筆時の心構え

- 技術的な背景知識がないユーザーでも理解できるように書く
- 「なぜそうするのか」より「どうすればいいのか」を優先
- コマンドや設定例は具体的に、コピペで使えるように
- エラーが起きた場合の対処法は Troubleshooting ページに集約

---

## ページ構造

### 基本テンプレート

```markdown
# ページタイトル

ページの概要（1-2文で簡潔に）

---

## セクション1

本文...

---

## セクション2

本文...

---

## See Also

- [関連ページ1](path/to/page1.md) - 簡単な説明
- [関連ページ2](path/to/page2.md) - 簡単な説明
```

### 見出しレベル

| レベル | 用途 | 例 |
|--------|------|-----|
| `# H1` | ページタイトル（1ページに1つ） | `# Installation Guide` |
| `## H2` | 主要セクション | `## Configuration` |
| `### H3` | サブセクション | `### Battle Clauses` |
| `#### H4` | 詳細項目（控えめに使用） | `#### Advanced Options` |

### セパレーター

- 主要セクション間に `---` を挿入
- ページ末尾の「See Also」の前にも挿入

---

## Troubleshooting の取り扱い

### 絶対に守るルール

**各ページに個別の Troubleshooting セクションを作成しない**

代わりに、以下のように Troubleshooting ページへ案内する：

```markdown
---

## See Also

- [Troubleshooting](../support/troubleshooting.md) - 問題が発生した場合
- [FAQ](../support/faq.md) - よくある質問
```

### Troubleshooting ページの構成

Troubleshooting ページ (`support/troubleshooting.md`) では、**すべての問題をドロップダウン形式で記載する**。

これにより：
- ページが長くなっても見やすさを維持
- ユーザーが必要な問題だけを展開して確認できる
- 関連する問題を機能ごとにグループ化できる

#### 構成ルール

1. **機能ごとにセクション（H2）を設ける**
2. **各問題は必ず `<details>` で囲む**
3. **セクション間は `---` で区切る**

#### テンプレート

```markdown
## [機能名] Issues

<details>
<summary><strong>問題の簡潔な説明</strong></summary>

**Symptoms:**
- 症状1
- 症状2

**Solutions:**

1. **解決策1:**
   説明...

2. **解決策2:**
   説明...

</details>

<details>
<summary><strong>別の問題</strong></summary>

**Symptoms:**
- 症状...

**Solutions:**
- 解決策...

</details>

---

## [別の機能名] Issues

<details>
<summary><strong>問題</strong></summary>

...

</details>
```

#### 重要なポイント

- 問題のタイトルは `<strong>` で太字にする
- Symptoms（症状）と Solutions（解決策）を明確に分ける
- コードブロックやコマンド例も `<details>` 内に含める
- 1つのセクションに問題が多い場合でも、すべてドロップダウンにする

### 新しい機能のドキュメントを書く場合

1. 機能ページには「うまくいく場合」の説明のみを書く
2. 想定されるトラブルは `support/troubleshooting.md` に追記
3. 機能ページの末尾で Troubleshooting ページへリンク

---

## FAQ の取り扱い

### FAQ に記載すべき内容

- オプション機能の詳細説明
- 「～できますか？」系の質問
- 設定の選択肢に関する質問
- ベストプラクティスや推奨設定

### FAQ に記載すべきでない内容

- 必須の設定手順（→ 各機能ページへ）
- エラーや問題の解決方法（→ Troubleshooting ページへ）

### FAQ の記載形式

すべてドロップダウン形式で記載する：

```markdown
## [カテゴリ名]

<details>
<summary><strong>質問文？</strong></summary>

回答本文...

**Example:**
```json5
{
  "setting": "value"
}
```

</details>
```

### カテゴリの分類例

- Basic Information
- Installation & Setup
- Configuration
- Blacklist Configuration
- Cross-Server
- GUI & Commands
- その他機能ごとのカテゴリ

---

## コード・設定例の書き方

### 基本方針

設定例は**拡張性を示しつつ、詳細はドロップダウンで隠す**。

- 基本的な設定例は本文に表示
- 全オプションや詳細な設定はドロップダウンに格納
- 「ここまでカスタマイズできる」ことを見せつつ、読み飛ばせるようにする

```markdown
## Configuration

基本設定：

```json5
{
  "enabled": true,
  "mode": "POKEMON_SHOWDOWN"
}
```

<details>
<summary><strong>全オプション（詳細設定）</strong></summary>

```json5
{
  "enabled": true,
  "mode": "POKEMON_SHOWDOWN",
  "pokemonShowdown": {
    "initialElo": 1000,
    "floorElo": 1000,
    "kFactor": 32,
    "provisionalMatches": 10,
    "provisionalKFactor": 64,
    "decay": {
      "enabled": true,
      "runAtUtcHour": 9,
      "slowDecayReduction": 2
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `initialElo` | `1000` | Starting Elo for new players |
| ... | ... | ... |

</details>
```

### JSON5 設定ファイル

言語タグは `json5` を使用：

````markdown
```json5
{
  "language": "en-Us",
  "ranked_match": {
    "reset_days": 30,  // コメントOK
    "levelMatch": 50
  }
}
```
````

### コマンド

インラインは バッククォート、複数行はコードブロック：

```markdown
Run `/rankedadmin reload` to apply changes.

**Commands:**
```bash
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2
```
```

### ファイルパス

常にバッククォートで囲む：

```markdown
Edit `config/cobbleranked/config.json5`
```

---

## 表の使い方

**表は積極的に活用する。** 文章で説明するより、表で一覧化した方が圧倒的に読みやすい。

### 表を使うべき場面

- 設定オプションの一覧
- コマンドの一覧
- 機能の比較
- やりたいこと → 方法 の対応

### 設定オプションの説明

```markdown
| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable the feature |
| `timeout` | `30` | Timeout in seconds |
```

### コマンド一覧

```markdown
| やりたいこと | コマンド |
|--------------|----------|
| アリーナ設定 | `/rankedadmin setArena name pos1` |
| 設定リロード | `/rankedadmin reload` |
| Elo リセット | `/rankedadmin setelo 1000 player singles` |
```

### 比較表

```markdown
| Mode | Use Case | Recommendation |
|------|----------|----------------|
| **Pokemon Showdown** | Standard competitive | Recommended |
| Glicko-2 | Large servers (100+) | Advanced |
| Legacy | Casual | Simple |
```

### 表のスタイルルール

- **推奨項目** は太字で強調
- Default/Recommended 列があると親切
- 列数は5以下に抑える
- 文章で3行以上になりそうなら表を検討する

---

## ドロップダウン（details/summary）

### 使用する場面

- FAQ の各質問
- Troubleshooting の各問題
- オプション設定の詳細説明
- 長いコード例や設定例

### 書き方

```markdown
<details>
<summary><strong>タイトル（太字推奨）</strong></summary>

本文...

コードブロックや表も中に含められる

</details>
```

### 注意点

- `<summary>` タグ直後に空行を入れる
- `</details>` の前にも空行を入れる
- 入れ子にしない（可読性が下がる）

---

## リンクの書き方

### 内部リンク（相対パス）

```markdown
See [Installation Guide](../getting-started/installation.md)
See [Elo System](../features/elo-system.md#configuration)
```

### 外部リンク

```markdown
[Discord](https://discord.gg/VVVvBTqqyP)
[Modrinth](https://modrinth.com/mod/cobblemon)
```

### See Also セクション

ページ末尾に関連ページへのリンクを配置：

```markdown
---

## See Also

- [FAQ](../support/faq.md) - よくある質問
- [Troubleshooting](../support/troubleshooting.md) - 問題解決
- [Related Feature](../features/related.md) - 関連機能
```

---

## 画像の使い方

### パス形式

```markdown
![説明文](../../images/filename.png)
```

### 使用する場面

- GUI のスクリーンショット
- コマンド実行結果
- アーキテクチャ図（クロスサーバー構成など）

### ファイル命名規則

- 小文字、アンダースコア区切り
- 例: `ranked_menu.png`, `arena_setup.png`

---

## 文章スタイル

### トーン

- 命令形を使用（「～してください」より「～する」）
- 簡潔に、箇条書きを活用
- 過度な敬語は不要

### 例

```markdown
Bad:  "設定ファイルを編集していただき、サーバーを再起動してください。"
Good: "設定ファイルを編集し、サーバーを再起動する。"

Bad:  "以下のコマンドを入力することで、アリーナを設定することができます。"
Good: "以下のコマンドでアリーナを設定する："
```

### 強調

- **太字**: 重要なキーワード、推奨設定
- `コード`: コマンド、設定値、ファイルパス
- *斜体*: あまり使用しない

### 絵文字の使用

以下の4つの絵文字は**視認性を高めるために積極的に使用する**：

| 絵文字 | 用途 | 使用例 |
|--------|------|--------|
| ✅ | 成功、対応済み、推奨 | 機能一覧、比較表の「対応」列 |
| ❌ | 失敗、非対応、非推奨 | 比較表の「非対応」列、やってはいけないこと |
| ⚠️ | 警告、注意事項 | 重要な注意点、非推奨機能 |
| 📝 | メモ、補足情報 | 追加説明、Tips |

**使用例：**

```markdown
| Feature | SQLite | MySQL |
|---------|--------|-------|
| Cross-server | ❌ | ✅ |
| Easy setup | ✅ | ⚠️ |

**Features:**
- ✅ Ranked battles
- ✅ Elo system
- ❌ Tournament mode (coming soon)

> ⚠️ **Warning:** This will reset all data!

> 📝 **Note:** Optional feature, disabled by default.
```

**使用しない絵文字：**
- 装飾目的の絵文字（🎉, 🚀, 💡 など）
- カテゴリアイコン（📁, 🔧, ⚙️ など）
- 数字絵文字（1️⃣, 2️⃣ など）

---

## 読みやすさのガイドライン

### 文字数の目安

長い文章は読まれない。できるだけ簡潔に書くことを意識する。

| 要素 | 目安 | 備考 |
|------|------|------|
| セクション本文 | 300文字程度 | 大きな機能は例外 |
| 箇条書き1項目 | 1-2行 | 長くなるなら分割 |
| 表のセル | 短く | 文章を詰め込まない |
| ドロップダウン内 | 制限なし | 詳細を知りたい人向け |

**注意:** これは厳格なルールではなく、「意識してほしい目安」。

- 機能の規模や複雑さによっては超えても問題ない
- ただし、超える場合は「本当に必要か」を考える
- 長くなりそうなら、表やドロップダウンで整理できないか検討

### 情報の整理方法

長くなりそうな場合の対処法：

| 状況 | 対処法 |
|------|--------|
| 設定項目が多い | 表にまとめる |
| 手順が長い | 番号付きリストにする |
| 詳細な説明が必要 | ドロップダウンに隠す |
| 複数パターンある | 表で比較する |

---

## ページ末尾のパターン

### 標準パターン

```markdown
---

## See Also

- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
- [Related Page](path/to/page.md) - Brief description
```

### 次のステップがある場合

```markdown
---

## Next Steps

1. **[Arena Setup](../configuration/arenas.md)** - Set battle locations
2. **[Rewards](../configuration/rewards.md)** - Configure prizes
3. **[Blacklist](../configuration/blacklist.md)** - Set restrictions

---

**Questions?** → [FAQ](../support/faq.md) | [Discord](https://discord.gg/VVVvBTqqyP)
```

---

## チェックリスト

新しいページを書く前に確認：

- [ ] ページタイトルは H1 で1つだけ
- [ ] 概要文（1-2文）がタイトル直下にある
- [ ] セクション間に `---` セパレーターがある
- [ ] Troubleshooting セクションを**作成していない**
- [ ] 問題解決の内容は `support/troubleshooting.md` に追記した
- [ ] オプション機能の詳細や質問形式の内容は `support/faq.md` に追記した
- [ ] FAQ/Troubleshooting の内容はドロップダウン形式
- [ ] 末尾に See Also セクションがある
- [ ] FAQ と Troubleshooting へのリンクが含まれている
- [ ] コードブロックの言語タグが正しい（`json5`, `bash` など）
- [ ] 内部リンクは相対パスを使用

---

## ファイル配置

```
docs/cobbleranked/
├── README.md                    # トップページ
├── SUMMARY.md                   # 目次
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── commands.md
├── configuration/
│   ├── README.md
│   ├── config.md
│   ├── blacklist.md
│   ├── arenas.md
│   ├── rewards.md
│   ├── languages.md
│   ├── gui.md
│   └── restrictions.md
├── features/
│   ├── ranked-battles.md
│   ├── elo-system.md
│   ├── seasons.md
│   └── ...
├── advanced/
│   ├── cross-server.md
│   ├── database.md
│   └── redis.md
├── integration/
│   ├── luckperms.md
│   └── placeholders.md
└── support/
    ├── troubleshooting.md       # すべての問題解決をここに集約
    └── faq.md                   # すべてのFAQをここに集約
```

---

## 重要な原則まとめ

1. **対象は一般ユーザー** - 開発者向けではない
2. **Troubleshooting は集約** - 各ページに個別セクションを作らない
3. **FAQ も集約** - オプション説明や質問形式の内容は FAQ ページへ
4. **ドロップダウン形式** - FAQ/Troubleshooting は `<details>` で整理
5. **具体的な例を示す** - コピペで使える設定例やコマンド
6. **See Also で誘導** - 関連ページ、FAQ、Troubleshooting へのリンク必須
7. **表を積極活用** - 文章より表の方が読みやすい
8. **簡潔に書く** - 300文字を目安に、長くなるなら整理を検討
9. **詳細は隠す** - 基本情報は見せ、詳細設定はドロップダウンに
