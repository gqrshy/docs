# Música de Fundo Personalizada

---
**CobbleRanked** > **Recursos** > **Música Personalizada**
---

Toque música personalizada durante batalhas ranqueadas.

## Visão Geral

Usa API `BattleMusicPacket` do Cobblemon para enviar música aos jogadores. Nenhum mod client-side necessário (apenas resource pack de música).

**Recursos:**
- Música baseada em fase (fila, seleção de equipe, batalha)
- Música de batalha baseada em Elo (ranks mais altos = música diferente)
- Compatível com Cobblemon 1.6.x e 1.7.x

## Fases de Música

**Fila:** Tocando enquanto espera por partida
**Seleção de Equipe:** Durante seleção de Pokémon/contagem regressiva
**Batalha:** Durante batalha ranqueada ativa (baseado em Elo)

## Configuração

**Arquivo:** `config/cobbleranked/config.json5`

```json5
{
  "music": {
    "enabled": true,

    // Música de fila
    "queueMusic": "cobbleranked:queue_music",
    "queueMusicVolume": 1.0,
    "queueMusicPitch": 1.0,

    // Música de seleção de equipe
    "teamSelectionMusic": "cobbleranked:team_selection",
    "teamSelectionMusicVolume": 1.0,
    "teamSelectionMusicPitch": 1.0,

    // Música de batalha (baseada em Elo)
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

## Criando Resource Pack de Música

### 1. Criar Estrutura de Pack

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

> **[📸 IMAGEM NECESSÁRIA: Estrutura de pasta do resource pack (tela real do explorador de arquivos, posicionamento de cada arquivo)]**

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

**Arquivo:** `assets/cobbleranked/sounds.json`

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

### 4. Converter Áudio para OGG

```bash
ffmpeg -i input.mp3 -c:a libvorbis -q:a 4 output.ogg
```

### 5. Instalar Resource Pack

Coloque em `.minecraft/resourcepacks/` ou use resource pack de servidor.

## Testando

1. Habilite música em config
2. Carregue resource pack
3. Entre na fila: `/ranked`
4. Música deve tocar automaticamente

## Solução de Problemas

**Nenhuma música tocando:**
- Verifique `music.enabled: true` em config
- Verifique resource pack está carregado
- Verifique IDs de som correspondem entre config e sounds.json

**Música travando:**
- Reduza tamanho do arquivo (use bitrate OGG menor)
- Verifique conexão de rede (para resource packs de servidor)

**Música errada tocando:**
- Verifique faixas de Elo em config não se sobrepõem
- Verifique Elo atual do jogador corresponde à faixa esperada

---

## Próximos Passos

### Para Configuração
1. **[Criando Resource Pack](#creating-music-resource-pack)** - Guia passo a passo
2. **[Conversão de Áudio](#4-convert-audio-to-ogg)** - Converter MP3 para OGG
3. **[Testando Música](#testing)** - Verificar reprodução funciona

### Para Uso Avançado
1. **[Música Baseada em Elo](#configuration)** - Trilhas diferentes por rank
2. **[Música Baseada em Fase](#music-phases)** - Trilhas Fila/Seleção/Batalha
3. **[Resource Packs de Servidor](#5-install-resource-pack)** - Download automático para jogadores

---

## Páginas Relacionadas
- [Configuração Principal](../configuration/config.md) - Configurações de música
- [Solução de Problemas](../support/troubleshooting.md#music-errors-cobblemon-16x) - Problemas de música
- [FAQ](../support/faq.md#custom-music) - Perguntas comuns de música
