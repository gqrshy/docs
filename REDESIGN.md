# GashiStudios サイト全面リデザイン設計書

作成日: 2026-07-05 / 対象: gashistudios.site 全体(ランディング + Docs)

---

## 1. 目的

1. **脱・AI臭**: 現行デザインは「ダーク背景 + グリッド + marquee + フェイクローディング + ウィンドウ風カード」という、生成AIが作りがちなテンプレ的見た目になっている。これらのギミックを整理し、意図のある落ち着いたデザインに置き換える。
2. **ブランドカラーの確立**: ロゴの紫を軸にしたカラーシステムを定義し、全ページで一貫させる(現状はモノクロで、ロゴと画面の色がつながっていない)。
3. **ポジショニングの転換**: 「Cobblemon向けツールを作る個人」ではなく「**Minecraftのmod・プラグイン(Paper / Folia)を開発するチーム GashiStudios**」としてサイト全体を再構成する。Cobblemon関連はプロダクトの一カテゴリに格下げする。

---

## 2. 現状の問題点(棚卸し)

### 見た目(AI臭の原因)

| 要素 | 場所 | 問題 |
|---|---|---|
| フェイクローディング画面(0→100%カウンタ) | `LandingLayout.astro` | 意味のない待ち時間。典型的なAI生成ギミック |
| 歪むグリッド背景(`gridWarp`) | `LandingLayout.astro` | 常時アニメーションで安っぽい。パフォーマンスも悪い |
| 技術スタックmarquee(JAVA/KOTLIN…の流れる帯) | `LandingLayout.astro` | 情報価値ゼロの装飾。AIテンプレの定番 |
| ウィンドウ風カード(titlebar + ×ボタン) | `window-card` 全般 | ギミック過多。クリックできそうで出来ない×ボタンはUX的にも悪い |
| viewport枠線SVG | `LandingLayout.astro` | 意図不明の装飾 |
| モノクロ(白一色)テーマ | 全体 | ロゴの紫と断絶。無個性 |

### 内容

- Heroが「Hey there! I'm Gashi!」の**個人ポートフォリオ体裁** → チームサイトとして不適切
- Products は Cobblemon 前提の説明文(「Tools and libraries for Cobblemon servers」)
- Paper / Folia プラグイン開発の実績・受託の話がどこにもない
- i18n が各コンポーネントにインラインscriptで分散していて保守しづらい

---

## 3. ブランド・デザイン方針

**キーワード: 「Craft(ものづくり)× かわいさ × 信頼感」**

- Minecraftの開発チームらしい遊び心を、**丸み・色・気持ちいいモーション**で表現する。テンプレ的ギミック(marquee・フェイクローディング等)には頼らない
- **かわいらしく親しみやすいトーン**: 角丸は大きめ(カード16px、ボタンはピル型)、シャープなエッジや直線的グリッドは避ける
- ダークテーマ継続(開発者・ゲーマー層に合う)。ただし真っ黒ではなく**紫がかったダーク**にしてロゴと接続する
- モーションは「意味のある瞬間」に集中投資する(§7.5)。常時ループする装飾アニメーションは廃止し、その分**入場・ホバー・遷移**を丁寧に作り込む

---

## 4. カラーシステム(2026-07改訂: ライトモノトーン + パステル紫)

**方針転換**: ダーク基調を廃止し、yui540.com を参考にした**白・黒・灰のモノトーン基調 + パステル紫アクセント**へ。かわいらしさ・居心地の良さを最優先。

```css
:root {
  /* Brand - パステル紫スケール */
  --purple-100: #f3efff;   /* 淡い面(hover地、コード背景、フッター) */
  --purple-200: #e5dcfc;   /* アクティブ地、罫線 */
  --purple-300: #c4b5fd;   /* メインアクセント(下線、カーテン、バー) */
  --purple-400: #a78bfa;   /* グロー、フォーカス */
  --purple-500: #8b5cf6;   /* グラデ始点 */
  --purple-600: #7c3aed;   /* テキストアクセント、リンク、ボタン */

  /* Background - 白/灰モノトーン */
  --bg-base:    #fafafa;   /* ページ背景(オフホワイト) */
  --bg-raised:  #f1f0f4;   /* セクション交互背景 */
  --bg-card:    #ffffff;   /* カード */
  --bg-hover:   #f5f3ff;   /* カードhover(ほんのり紫) */

  /* Text - 黒/灰 */
  --text-primary:   #1a1a1a;
  --text-secondary: #55555a;
  --text-muted:     #9b9ba3;

  /* Border */
  --border-subtle: #e6e4ec;
  --border-strong: #c4b5fd;  /* 強調ボーダーはパステル紫 */

  /* Accent(最小限) */
  --accent-amber: #f59e0b;  /* WIP/Featured バッジ(文字は #b45309) */
  --accent-lime:  #84cc16;

  /* 影(ライト用・柔らかく) */
  --shadow-card:       0 2px 12px rgba(26, 26, 26, 0.06);
  --shadow-card-hover: 0 8px 24px rgba(139, 92, 246, 0.14);
}
```

**運用ルール:**

- 画面の主役はモノトーン(白地・黒文字)。**紫は「アクセント」に徹する**: hover、下線、バッジ、コード背景、フッター面など
- ライト背景での可読性のため、**紫の文字色は `--purple-600`**(300/400は文字に使わない)
- amber 文字はライト地では `#b45309` を使う
- Docs側も同じトークン。コードブロック(pre)はダークのままで良い(ライトサイト上のダークコードは一般的)

---

## 5. タイポグラフィ

| 用途 | フォント | 備考 |
|---|---|---|
| 見出し | **Space Grotesk** (Google Fonts) | 幾何学的でロゴと相性良。Interより個性が出る |
| 本文 | **Inter** | 継続使用 |
| コード | **JetBrains Mono** | IBM Plex Mono から変更。開発チームらしさ |

- `Libre Barcode 128`(バーコードフォント)は**削除**(AI臭装飾の一部)
- 見出しスケール: h1 = clamp(2.5rem, 5vw, 4rem) / h2 = 2rem / h3 = 1.25rem
- 英大文字 + letter-spacing のラベル(`SECTION LABEL` 風)は使ってよいが、marqueeでは使わない

---

## 6. サイト構成(IA)の再編

```
/                       … ランディング(チーム紹介)
/products/              … 全プロダクト一覧(新規。カテゴリ横断)
/docs/cobbleranked/     … 既存Docs(構成維持、デザインのみ更新)
/docs/gashilibs/
/docs/maillib/
/servers                … 既存(導入サーバー紹介)※Showcaseに統合検討
/terms                  … 既存
```

### ランディングのセクション構成(新)

| # | セクション | 内容 | 置き換え元 |
|---|---|---|---|
| 1 | **Hero** | 「GashiStudios — Minecraft Mods & Server Plugins」。チームのミッションを1文で。CTA: Products / Discord | 個人挨拶Hero |
| 2 | **What We Do** | 3カラム: ① Mod開発(Fabric/NeoForge) ② Pluginn開発(Paper/Folia) ③ Cobblemonエコシステム。各カードに対応プラットフォームのバッジ | TechStack marquee |
| 3 | **Projects** | 大型プロジェクトの紹介。**Echelon**(Minecraft上で構想中のMMORPG)を大きめのカードで掲載。ビジュアルは当面 WIP プレースホルダ(§7.6)+「In Development」バッジ。ティザー文 + Discord誘導 | (新規) |
| 4 | **Products** | カテゴリタブ or グルーピング付き一覧(Mods / Plugins / Libraries)。CobbleRankedをFeaturedとして先頭。各カード: 名前、対応環境(Fabric 1.21.x 等)、DL/Docsリンク | 現Products(Cobblemon前提) |
| 5 | **Showcase** | 動画・スクリーンショット。導入サーバー実績(servers ページの内容をここに統合可) | 現Showcase |
| 6 | **Testimonials** | 継続(デザインのみ更新) | 現Testimonials |
| 7 | **Team** | 「Profile(個人)」→「Team」に改名。メンバーカード形式(現状1人でも将来拡張前提の構造に) | ProfileSection |
| 8 | **Contact / CTA** | Discord招待 + 依頼・コラボ窓口 | 現Contact |

### 削除するもの

- ローディング画面(スクリプトごと)
- warped-grid 背景 / viewport-frame SVG
- marquee-divider(技術スタックは What We Do 内のバッジ表示に置き換え)
- window-card システム一式(titlebar / ×ボタン)
- Hero のマルチウィンドウキャラ演出(キャラ画像自体は Team セクションのアバターとして継続利用可)

---

## 7. コンポーネント設計(新)

### カード(`--card`)

```
背景: --bg-card / 角丸: 16px / 枠: 1px --border-subtle
hover: 枠 --border-strong + 背景 --bg-hover + translateY(-4px) scale(1.01)
       (イージングは §7.5 の --ease-bounce で「ぽよん」と反応)
上辺に 3px の紫グラデーションライン(Featured のみ、角丸に沿わせる)
```

### ボタン

- 形状: **ピル型**(`border-radius: 999px`)で統一。かわいさの核
- Primary: 紫グラデ塗り、白文字。hover で `scale(1.05)` + 明度アップ
- Secondary: 透明 + 紫枠、hover で塗り 10% 紫
- Ghost: 文字のみ + hover 下線
- 押下時は `scale(0.96)` で「むにっ」と沈む(`--dur-fast`)

### バッジ(プラットフォーム表示)

`Fabric` `NeoForge` `Paper` `Folia` `1.21.x` など小さいピル型。色は `--bg-hover` 地 + `--text-secondary`、カテゴリ別にドット色だけ変える(Mod=紫 / Plugin=ライム / Lib=グレー)。

### セクション見出し

```
<span class="section-label">// PRODUCTS</span>   ← mono・紫・小
<h2>見出し本文</h2>
<p class="section-lead">1文の説明</p>
```

### 背景装飾

- Hero のみ: 紫の放射グラデーション(`radial-gradient`、静止)+ 極薄いノイズテクスチャ
- 他セクション: `--bg-base` と `--bg-raised` の交互のみ。グリッド背景は全廃
- セクションの境界は直線ではなく**ゆるやかな曲線 SVG(wave divider)**で区切ってもよい(1〜2箇所まで)

### 7.5 モーションデザイン(yui540 スタイル)

参考: [yui540/css-animations](https://github.com/yui540/css-animations) / [yui540/reanimated-css-animations](https://github.com/yui540/reanimated-css-animations)

「かわいくて気持ちいい」動きの核は**イージングとステージング(時間差)**。派手さではなくキレで魅せる。

```css
:root {
  /* Easing — yui540 系の急発進・急停止カーブ */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);      /* 入場の基本 */
  --ease-in-out:    cubic-bezier(0.83, 0, 0.17, 1);     /* リビール・遷移 */
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* ぽよん(overshoot) */

  /* Duration */
  --dur-fast: 0.15s;   /* 押下反応 */
  --dur-base: 0.4s;    /* hover、UI反応 */
  --dur-slow: 0.8s;    /* 入場、リビール */
}
```

**適用パターン:**

| 場面 | 演出 |
|---|---|
| ページ初回表示(Hero) | テキストを行単位で `clip-path` リビール(下から幕が開くように)。要素ごとに `animation-delay` を 0.06〜0.1s ずつずらすステージング |
| スクロール入場 | `IntersectionObserver` + 1回きりの fade-up。カード群は左から順に時間差(stagger) |
| セクション見出し | 紫の帯が左→右に走り抜けた後に文字が現れる「カーテンリビール」(yui540 の代表パターン) |
| カード hover | `--ease-bounce` で浮き上がる。中のアイコンだけ少し遅れて追従(traveling) |
| ボタン | hover=ふくらむ / active=沈む。かわいさ最重要ポイント |
| Echelon カード | WIP バッジをゆっくり明滅(これだけは常時アニメ許可、`opacity` のみ 3s ループ) |

**ルール:**

- 常時ループは Echelon の WIP バッジ以外禁止。動きは「ユーザーの操作・スクロールへの応答」として発火させる
- transform / opacity / clip-path のみ使用(layout を動かさない)
- `prefers-reduced-motion: reduce` では全アニメーションを即時完了に(既存の対応を維持)
- 実装は `src/styles/motion.css` に keyframes とユーティリティクラス(`.reveal-up`, `.reveal-curtain`, `.stagger-children` 等)として集約し、各コンポーネントはクラスを付けるだけにする

### 7.6 WIP プレースホルダ(Echelon 用)

画像が用意できるまでの仮ビジュアル。「工事中」ではなく「これから来る」ワクワク感を出す。

```
高さ 240px 程度のカード内エリア
背景: --purple-900 → --bg-card の斜めグラデーション
中央: "ECHELON" ロゴタイプ(Space Grotesk)+ 下に "COMING SOON" (mono・letter-spacing 広め)
右上: 「In Development」ピルバッジ(--accent-amber、ゆっくり明滅)
```

画像が完成したら差し替えるだけで済むよう、`<Image>` スロットとして実装しておく。

---

## 8. Docs 側(`DocLayout` / `DocSidebar`)の変更

コンテンツ・構造は**変更しない**。以下のみ:

- カラートークンを §4 に差し替え(サイドバーのアクティブ項目 = 紫、リンク = `--purple-400`)
- フォントを §5 に統一
- コードブロックのテーマを紫系に統一
- ナビ(`CustomNav`)をランディングと共通化し、ロゴ + Products / Docs / Discord のシンプル構成に

---

## 9. i18n の整理

現状: 各コンポーネントに `<script is:inline>` で翻訳オブジェクトが分散。

- `src/i18n/en.json` / `src/i18n/ja.json` に集約し、`t()` ヘルパー(`src/i18n/index.ts`)経由で参照
- 言語切替の仕組み(`LanguageSwitcher` + `langChange` イベント)は既存を流用、翻訳データだけ集約
- ※スコープが大きければ Phase 3 に後回し可

---

## 10. 実装フェーズ

| Phase | 内容 | 対象ファイル |
|---|---|---|
| **1. 基盤** | デザイントークン定義(`src/styles/tokens.css` 新規)、モーション基盤(`src/styles/motion.css` 新規、§7.5)、フォント差し替え、AI臭要素の削除(ローディング/グリッド/marquee/枠SVG) | `LandingLayout.astro` |
| **2. ランディング再構築** | Hero(チーム化)→ What We Do(新規)→ Projects/Echelon(新規)→ Products(カテゴリ化)→ Team 改名 の順に1セクションずつ | `components/*.astro` |
| **3. Docs 反映** | DocLayout / DocSidebar / CustomNav / Footer へトークン適用 | `layouts/`, `components/` |
| **4. 仕上げ** | i18n集約、OG画像更新(theme-color を `#0d0b14` に)、`/products/` ページ新設、servers 統合判断 | 全体 |

各 Phase 完了時に `npm run build` + プレビューで確認してからコミット。

---

## 11. 決定待ち事項(実装前に確認)

1. ロゴの正確な紫の色コード(スポイト値で §4 を更新)
2. チーム名義での文言: メンバー構成・肩書をどう出すか(Team セクションの内容)
3. Echelon のティザー文(1〜2文)と、公開してよい情報の範囲(ジャンル・特徴など)
4. Echelon 以外に公開済み・開発中の mod / plugin があるか(Products に載せる項目)
5. `/servers` ページを Showcase に統合するか、独立ページのまま残すか
