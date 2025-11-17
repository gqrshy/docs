# カスタム背景音楽

---
**CobbleRanked** > **Features** > **カスタム音楽**
---

ランクバトル中にカスタム音楽を再生。

## 概要

CobblemonのBattleMusicPacket APIを使用してプレイヤーに音楽を送信。クライアント側のModは不要（音楽リソースパックのみ）。

**機能:**
- フェーズベースの音楽（キュー、チーム選択、バトル）
- イロレーティングベースのバトル音楽（高ランクは異なる音楽）
- Cobblemon 1.6.xおよび1.7.xと互換性

## 音楽フェーズ

**キュー:** マッチ待機中に再生
**チーム選択:** ポケモン選択/カウントダウン中
**バトル:** アクティブなランクバトル中（イロレーティングベース）

## 設定

**ファイル:** `config/cobbleranked/config.json5`

```json5
{
  "music": {
    "enabled": true,

    // キュー音楽
    "queueMusic": "cobbleranked:queue_music",
    "queueMusicVolume": 1.0,
    "queueMusicPitch": 1.0,

    // チーム選択音楽
    "teamSelectionMusic": "cobbleranked:team_selection",
    "teamSelectionMusicVolume": 1.0,
    "teamSelectionMusicPitch": 1.0,

    // バトル音楽（イロレーティングベース）
    "battleMusic": [
      {
        "minElo": 0,
        "maxElo": 1199,
        "music": "cobbleranked:battle_low",
        "volume": 1.0,
        "pitch": 1.0
      },
      {
        "minElo": 1200,
        "maxElo": 1499,
        "music": "cobbleranked:battle_mid",
        "volume": 1.0,
        "pitch": 1.0
      },
      {
        "minElo": 1500,
        "maxElo": 9999,
        "music": "cobbleranked:battle_high",
        "volume": 1.0,
        "pitch": 1.0
      }
    ]
  }
}
```

## 音楽リソースパックの作成

### 1. パック構造を作成

```
cobbleranked_music/
├── pack.mcmeta
└── assets/
    └── cobbleranked/
        └── sounds/
            ├── queue_music.ogg
            ├── team_selection.ogg
            ├── battle_low.ogg
            ├── battle_mid.ogg
            └── battle_high.ogg
```

> **[📸 画像必要: リソースパックのフォルダ構造（実際のファイルエクスプローラー画面、各ファイルの配置）]**

### 2. pack.mcmeta

```json
{
  "pack": {
    "pack_format": 34,
    "description": "CobbleRanked Custom Music"
  }
}
```

### 3. sounds.json

**ファイル:** `assets/cobbleranked/sounds.json`

```json
{
  "queue_music": {
    "sounds": ["cobbleranked:queue_music"]
  },
  "team_selection": {
    "sounds": ["cobbleranked:team_selection"]
  },
  "battle_low": {
    "sounds": ["cobbleranked:battle_low"]
  },
  "battle_mid": {
    "sounds": ["cobbleranked:battle_mid"]
  },
  "battle_high": {
    "sounds": ["cobbleranked:battle_high"]
  }
}
```

### 4. オーディオをOGGに変換

```bash
ffmpeg -i input.mp3 -c:a libvorbis -q:a 4 output.ogg
```

### 5. リソースパックをインストール

`.minecraft/resourcepacks/`に配置するか、サーバーリソースパックを使用。

## テスト

1. 設定で音楽を有効化
2. リソースパックをロード
3. キューに参加: `/ranked`
4. 音楽が自動的に再生されるはず

## トラブルシューティング

**音楽が再生されない:**
- 設定で`music.enabled: true`をチェック
- リソースパックがロードされているか確認
- サウンドIDが設定とsounds.jsonで一致するかチェック

**音楽が途切れる:**
- ファイルサイズを小さくする（低ビットレートOGGを使用）
- ネットワーク接続をチェック（サーバーリソースパックの場合）

**間違った音楽が再生される:**
- 設定でイロレーティング範囲が重複していないか確認
- プレイヤーの現在のイロレーティングが期待範囲と一致するかチェック

---

## 次のステップ

### セットアップ用
1. **[リソースパック作成](#音楽リソースパックの作成)** - ステップバイステップガイド
2. **[オーディオ変換](#4-オーディオをoggに変換)** - MP3をOGGに変換
3. **[音楽テスト](#テスト)** - 再生が機能するか確認

### 高度な使用用
1. **[イロレーティングベース音楽](#設定)** - ランクごとに異なるトラック
2. **[フェーズベース音楽](#音楽フェーズ)** - キュー/選択/バトルトラック
3. **[サーバーリソースパック](#5-リソースパックをインストール)** - プレイヤーの自動ダウンロード

---

## 関連ページ
- [メイン設定](../configuration/config.md) - 音楽設定
- [トラブルシューティング](../support/troubleshooting.md#music-errors-cobblemon-16x) - 音楽の問題
- [FAQ](../support/faq.md#custom-music) - 一般的な音楽の質問
