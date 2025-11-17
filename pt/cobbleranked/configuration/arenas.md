# Configuração de Arenas

---
**CobbleRanked** > **Configuração** > **Arenas**
---

Aprenda como configurar arenas de batalha para partidas ranqueadas.

## Localização do Arquivo

`config/cobbleranked/arenas.json5`

## Visão Geral

Arenas são locais físicos onde batalhas ranqueadas acontecem. Quando uma partida é encontrada, ambos os jogadores são teletransportados para uma arena selecionada aleatoriamente.

**Recursos Principais:**
- Múltiplas arenas suportadas
- Seleção aleatória de arenas
- Suporte cross-dimensional (Overworld, Nether, End, dimensões personalizadas)
- Teletransporte automático
- Retorno ao local anterior após batalha

## Início Rápido

### Crie Sua Primeira Arena

1. **Construa sua arena** no jogo (ou use um local existente)
2. **Fique no ponto de spawn** onde você quer que os jogadores apareçam
3. **Execute o comando:**
   ```
   /rankedadmin arena set main_arena
   ```

É isso! Sua arena agora está configurada.

### Verificar Arena

Liste todas as arenas configuradas:
```
/rankedadmin arena list
```

Saída:
```
Arenas Configuradas (1):
  1. main_arena (world: minecraft:overworld, x: 100, y: 64, z: 200)
```

## Gerenciamento de Arenas

### Adicionar Múltiplas Arenas

CobbleRanked seleciona aleatoriamente das arenas disponíveis para variedade:

```bash
/rankedadmin arena set volcano_arena
/rankedadmin arena set ice_arena
/rankedadmin arena set forest_arena
/rankedadmin arena set desert_arena
```

**Recomendação:** Crie pelo menos 3-5 arenas para variedade.

### Remover uma Arena

Deletar uma configuração de arena:

```
/rankedadmin arena remove old_arena
```

**Aviso:** Isso não deleta a construção física, apenas remove da rotação.

### Teletransportar para Arena

Visualizar um local de arena:

```
/rankedadmin arena tp main_arena
```

Útil para:
- Testar pontos de spawn
- Mostrar arenas para jogadores
- Viagem rápida para administradores

### Listar Todas as Arenas

Ver todas as arenas configuradas:

```
/rankedadmin arena list
```

A saída mostra:
- Nome da arena
- Mundo/dimensão
- Coordenadas (x, y, z)

## Formato do Arquivo

### Estrutura JSON5

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  ARENAS DE BATALHA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "arenas": [
    {
      "name": "main_arena",
      "world": "minecraft:overworld",
      "x": 100.5,
      "y": 64.0,
      "z": 200.5,
      "yaw": 180.0,        // Direção de visão do jogador (0-360)
      "pitch": 0.0         // Inclinação da cabeça (-90 a 90)
    },
    {
      "name": "nether_arena",
      "world": "minecraft:the_nether",
      "x": 50.5,
      "y": 80.0,
      "z": -150.5,
      "yaw": 0.0,
      "pitch": 0.0
    }
  ]
}
```

### Referência de Campos

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-------------|---------|
| `name` | String | Identificador único da arena | `"main_arena"` |
| `world` | String | ID da dimensão Minecraft | `"minecraft:overworld"` |
| `x` | Number | Coordenada X | `100.5` |
| `y` | Number | Coordenada Y (altura) | `64.0` |
| `z` | Number | Coordenada Z | `200.5` |
| `yaw` | Number | Direção de visão do jogador (0-360) | `180.0` |
| `pitch` | Number | Inclinação da cabeça (-90 a 90) | `0.0` |

### IDs de Dimensões

Identificadores de dimensões comuns:

| Dimensão | ID |
|-----------|-----|
| Overworld | `minecraft:overworld` |
| Nether | `minecraft:the_nether` |
| End | `minecraft:the_end` |
| Personalizada | `modname:dimension_name` |

## Diretrizes de Design de Arenas

### Recomendações de Tamanho

| Formato de Batalha | Tamanho Recomendado |
|---------------|------------------|
| Singles (1v1) | 20x20 blocos |
| Doubles (2v2) | 25x25 blocos |

## Posicionamento do Ponto de Spawn

### Colocação de Jogadores

Ao criar uma arena, jogadores aparecem em:
- **Coordenadas exatas** especificadas na config
- **Direção de visão** baseada no valor `yaw`
- **Inclinação da cabeça** baseada no valor `pitch`

### Yaw (Direção de Visão)

```
     Norte (180°)
          |
Oeste (90°)—+— Leste (-90° ou 270°)
          |
     Sul (0°)
```

**Exemplos:**
- `0.0` - Olhando para o sul
- `90.0` - Olhando para o oeste
- `180.0` - Olhando para o norte
- `-90.0` ou `270.0` - Olhando para o leste

### Pitch (Inclinação da Cabeça)

```
-90° = Olhando direto para cima
  0° = Olhando direto para frente
 90° = Olhando direto para baixo
```

> **[📸 IMAGEM NECESSÁRIA: Diagrama visual da direção Yaw/Pitch (relação entre direção e ângulos do jogador, exibição de bússola)]**

**Recomendação:** Use `0.0` pitch para batalhas normais.

## Configuração Avançada

### Edição Manual de JSON5

Você pode editar manualmente `arenas.json5` para mudanças em massa:

```json5
{
  "arenas": [
    {
      "name": "arena_1",
      "world": "minecraft:overworld",
      "x": 100.5,
      "y": 64.0,
      "z": 200.5,
      "yaw": 180.0,
      "pitch": 0.0
    },
    // Copie e modifique para múltiplas arenas
    {
      "name": "arena_2",
      "world": "minecraft:overworld",
      "x": 300.5,
      "y": 64.0,
      "z": 200.5,
      "yaw": 180.0,
      "pitch": 0.0
    }
  ]
}
```

**Após editar:**
```
/rankedadmin reload
```

### Integração WorldGuard

Proteja arenas de griefing:

```bash
# Criar região
//pos1
//pos2
/region define main_arena

# Prevenir quebra/colocação de blocos
/region flag main_arena build deny

# Prevenir PvP (batalha usa Cobblemon, não PvP)
/region flag main_arena pvp deny

# Prevenir spawn de mobs
/region flag main_arena mob-spawning deny
```

### Lógica de Seleção de Arena

Como CobbleRanked escolhe arenas:

1. **Carregar todas as arenas** de `arenas.json5`
2. **Filtrar arenas válidas** (mundo existe, coordenadas válidas)
3. **Seleção aleatória** das arenas válidas
4. **Teletransportar ambos os jogadores** para arena selecionada
5. **Iniciar batalha** imediatamente

**Ponderação:** Todas as arenas têm probabilidade igual (sem sistema de peso).

## Sistema de Retorno

Após o fim da batalha:

1. **Batalha conclui** (vitória/derrota/empate/fuga)
2. **Jogadores retornam** ao seu local anterior
3. **Local anterior:** Onde estavam quando a batalha começou
4. **Dimensão preservada:** Retorna ao mundo correto

**Exemplo:**
- Jogador estava no Nether em `(100, 64, 200)`
- Batalha teletransporta para arena do Overworld
- Após batalha, retorna ao Nether `(100, 64, 200)`

## Exemplos

### Configuração de Arena Única

Configuração mínima para testes:

```json5
{
  "arenas": [
    {
      "name": "test_arena",
      "world": "minecraft:overworld",
      "x": 0.5,
      "y": 100.0,
      "z": 0.5,
      "yaw": 0.0,
      "pitch": 0.0
    }
  ]
}
```

### Configuração Multi-Arena

Servidor de produção com variedade:

```json5
{
  "arenas": [
    {
      "name": "volcano_arena",
      "world": "minecraft:overworld",
      "x": 1000.5,
      "y": 64.0,
      "z": 1000.5,
      "yaw": 180.0,
      "pitch": 0.0
    },
    {
      "name": "ice_arena",
      "world": "minecraft:overworld",
      "x": -500.5,
      "y": 70.0,
      "z": -500.5,
      "yaw": 90.0,
      "pitch": 0.0
    },
    {
      "name": "forest_arena",
      "world": "minecraft:overworld",
      "x": 200.5,
      "y": 65.0,
      "z": 800.5,
      "yaw": 0.0,
      "pitch": 0.0
    },
    {
      "name": "nether_arena",
      "world": "minecraft:the_nether",
      "x": 50.5,
      "y": 80.0,
      "z": 50.5,
      "yaw": 180.0,
      "pitch": 0.0
    },
    {
      "name": "end_arena",
      "world": "minecraft:the_end",
      "x": 0.5,
      "y": 50.0,
      "z": 0.5,
      "yaw": 0.0,
      "pitch": 0.0
    }
  ]
}
```

## Considerações de Desempenho

### Número de Arenas

- **1-5 arenas:** Impacto de desempenho insignificante
- **5-20 arenas:** Sem impacto perceptível
- **20+ arenas:** Impacto mínimo (seleção de arena é O(n) aleatório)

**Recomendação:** 5-10 arenas é ideal para variedade sem sobrecarregar.

### Arenas Cross-Dimensionais

Teletransporte através de dimensões:
- **Carregamento de chunks:** Pode causar breve atraso (< 1 segundo)
- **Distância de renderização:** Jogadores podem ver chunks carregando
- **Impacto TPS:** Insignificante em servidores modernos

**Melhor Prática:** Pré-carregue chunks de arenas usando chunk loaders.

---

## Próximos Passos

### Para Configuração de Arenas
1. **[Guia de Arena de Início Rápido](../getting-started/quick-start.md#step-1-create-a-battle-arena)** - Crie sua primeira arena
2. **[Comandos de Arena](../getting-started/commands.md#arena-management)** - Domine o gerenciamento de arenas
3. **[Integração WorldGuard](#worldguard-integration)** - Proteja arenas de griefing

### Para Configuração Avançada
1. **[Arenas Cross-Dimensionais](#cross-dimensional-arenas)** - Configure arenas Nether/End
2. **[Múltiplas Arenas](#multi-arena-setup)** - Crie variedade com seleção aleatória
3. **[Solução de Problemas de Arena](../support/faq.md#arena-setup)** - Problemas comuns de arenas

---

## Páginas Relacionadas
- [Fluxo de Batalha](../features/ranked-battles.md#teleportation) - Como funciona o teletransporte de arena
- [Referência de Comandos](../getting-started/commands.md) - Comandos de gerenciamento de arena
- [Solução de Problemas](../support/troubleshooting.md#arena-issues) - Problemas relacionados a arenas
