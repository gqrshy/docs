# 禁止インベントリアイテム

---
**CobbleRanked** > **Features** > **禁止アイテム**
---

特定のアイテムを持つプレイヤーがランクキューに参加するのを防止。

## 概要

プレイヤーはインベントリに禁止アイテムがある場合キューに参加できません。テラオーブやダイマックスバンドなどのバトルギミックアイテムをブロックするのに便利。

## 設定

**ファイル:** `config/cobbleranked/inventory.json5`

```json5
{
  "banned_items": [
    "mega_showdown:tera_orb",
    "mega_showdown:dynamax_band",
    "mega_showdown:mega_bracelet",
    "mega_showdown:z_ring"
  ]
}
```

## アイテムIDの確認

1. ゲーム内でアイテムを持つ
2. F3+Hを押す（高度なツールチップを表示）
3. IDのツールチップをチェック（例: `mega_showdown:tera_orb`）

## 一般的な禁止アイテム

**バトルギミック:**
- `mega_showdown:tera_orb` - テラスタル
- `mega_showdown:dynamax_band` - ダイマックス
- `mega_showdown:mega_bracelet` - メガシンカ
- `mega_showdown:z_ring` - Zワザ
- `mega_showdown:omni_ring` - すべてのギミック

## エラーメッセージ

プレイヤーが禁止アイテムでキューしようとすると:

> ⚠ キューに参加できません - インベントリに禁止アイテム:
> • mega_showdown:tera_orb
> • mega_showdown:dynamax_band
>
> これらのアイテムを削除してください。

## ヒント

- 不公平なアドバンテージを提供するアイテムを禁止
- リストを最小限に保つ - 本当に問題のあるアイテムのみ
- サーバールールでプレイヤーに禁止アイテムを伝える

---

## 次のステップ

### 設定用
1. **[アイテムIDの確認](#アイテムidの確認)** - 禁止するアイテムを識別
2. **[ブラックリスト設定](../configuration/blacklist.md)** - ポケモン/技の制限
3. **[バトル形式](ranked-battles.md#pre-battle-validation)** - 検証の仕組み

### Mod統合用
1. **[Mega Showdownアイテム](#一般的な禁止アイテム)** - 一般的なギミックアイテム
2. **[カスタムMod](../support/faq.md#can-i-use-this-with-showdown-moves-mod)** - 互換性
3. **[テスト](../getting-started/quick-start.md#step-4-test-the-system)** - 禁止が機能するか確認

---

## 関連ページ
- [ブラックリスト設定](../configuration/blacklist.md) - ポケモンと技の制限
- [バトル検証](ranked-battles.md#pre-battle-validation) - チェックの仕組み
- [FAQ](../support/faq.md#format-specific-features) - 形式固有の禁止
