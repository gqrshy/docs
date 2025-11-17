# Guia de Início Rápido

---
**CobbleRanked** > **Começando** > **Início Rápido**
---

Coloque suas batalhas ranqueadas em funcionamento em menos de 5 minutos!

## Visão Geral

Este guia irá ajudá-lo a:
1. Configurar sua primeira arena de batalha
2. Definir restrições de Pokémon
3. Iniciar sua primeira temporada
4. Testar o sistema ranqueado

**Tempo necessário:** ~5 minutos

## Passo 1: Criar uma Arena de Batalha

Arenas são locais onde as batalhas ranqueadas acontecem.

### Criar uma Arena

1. **Construa sua arena** no jogo (ou use um local existente)
2. **Fique no ponto de spawn** onde você quer que os jogadores sejam teleportados

> **[📸 IMAGEM NECESSÁRIA: Jogador em pé na posição de criação da arena (mostrando coordenadas e Yaw/Pitch)]**

3. **Execute o comando:**
   ```
   /rankedadmin arena set <nome_da_arena>
   ```
   Exemplo:
   ```
   /rankedadmin arena set arena_principal
   ```

4. **Verificar criação:**
   ```
   /rankedadmin arena list
   ```

### Múltiplas Arenas (Opcional)

Crie múltiplas arenas para variedade:

```bash
/rankedadmin arena set arena_vulcao
/rankedadmin arena set arena_gelo
/rankedadmin arena set arena_floresta
```

> **[📸 IMAGEM NECESSÁRIA: Visão geral do mapa com múltiplas arenas (vulcão, gelo, floresta, etc.)]**

O CobbleRanked irá selecionar aleatoriamente entre as arenas disponíveis.

## Passo 2: Configurar Restrições de Pokémon

Por padrão, **todos os Pokémon são permitidos**. Vamos banir alguns Pokémon muito poderosos:

### Editar Configuração de Lista Negra

1. **Abra o arquivo:** `config/cobbleranked/blacklist.json5`

2. **Banir Pokémon lendários:**
   ```json5
   {
     "black_list_labels": [
       "legendary",   // Bane Mewtwo, Lugia, Ho-Oh, Rayquaza, etc.
       "mythical"     // Bane Mew, Celebi, Jirachi, etc.
     ]
   }
   ```

3. **Salvar e recarregar:**
   ```
   /rankedadmin reload
   ```

> **[📸 IMAGEM NECESSÁRIA: Tela de mensagem de sucesso após executar comando de reload]**

### Predefinições Rápidas

Escolha um formato competitivo:

<details>
<summary><b>Estilo VGC (Lendários Permitidos)</b></summary>

```json5
{
  "black_list_labels": [
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill"
  ]
}
```
</details>

<details>
<summary><b>Smogon OU (Sem Ubers)</b></summary>

```json5
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Baton Pass"
  ],
  "black_list_ability": [
    "Shadow Tag",
    "Arena Trap",
    "Moody"
  ]
}
```
</details>

<details>
<summary><b>Little Cup (Apenas Primeiro Estágio)</b></summary>

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  }
}
```
</details>

## Passo 3: Iniciar a Primeira Temporada

As temporadas rotacionam automaticamente com base em sua configuração.

### Verificar Temporada Atual

```
/rankedadmin season info
```

Você deve ver:
```
Temporada Atual: Temporada 1
Iniciada: 26-10-2025
Termina: 25-11-2025 (30 dias)
```

### Personalizar Duração da Temporada

Edite `config/cobbleranked/config.json5`:

```json5
"ranked_match": {
  "reset_days": 30  // Mude para 7, 14, 30, 60, 90, etc.
}
```

Recarregar:
```
/rankedadmin reload
```

## Passo 4: Testar o Sistema

Vamos percorrer um fluxo de batalha completo!

### Entrar na Fila

1. **Abra a GUI ranqueada:**
   ```
   /ranked
   ```
   Ou use o item GUI no jogo (se configurado)

> **[📸 IMAGEM NECESSÁRIA: Tela principal do menu GUI Ranked (seleção de formato Singles/Doubles)]**

2. **Selecione o formato de batalha:**
   - Singles (1v1)
   - Doubles (2v2)

3. **Entre na fila** clicando no botão de fila

### Iniciar uma Batalha (2 Jogadores Necessários)

1. **Segundo jogador** entra na fila do mesmo formato
2. **Matchmaking ativa** quando dois jogadores estão na fila
3. **Ambos os jogadores são teleportados** para uma arena aleatória
4. **Batalha começa automaticamente**

> **[📸 IMAGEM NECESSÁRIA: Cena de início de batalha (ambos jogadores posicionados na arena)]**

### Após a Batalha

- **Vencedor ganha Elo** (padrão: 10-30 pontos)
- **Perdedor perde Elo** (padrão: 10-30 pontos)
- **Estatísticas atualizadas** (vitórias, derrotas, taxa de vitória)
- **Verificar tabela de classificação:** `/ranked` → Leaderboard

> **[📸 IMAGEM NECESSÁRIA: Tela de exibição da tabela de classificação (melhores jogadores e ranking Elo)]**

## Passo 5: Configurar Recompensas (Opcional)

Recompense seus melhores jogadores com itens ou comandos!

### Editar Configuração de Recompensas

Abra `config/cobbleranked/rewards.json5`:

```json5
{
  "season_rewards": {
    "first_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 64",
        "give %player% cobblemon:master_ball 5"
      ]
    },
    "second_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 32",
        "give %player% cobblemon:master_ball 3"
      ]
    }
  },
  "milestone_rewards": {
    "10_wins": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:emerald 10"
      ]
    }
  }
}
```

Recarregar:
```
/rankedadmin reload
```

> **[📸 IMAGEM NECESSÁRIA: GUI de coleta de recompensas (exibição de recompensas de temporada e marcos)]**

## Lista de Verificação

Antes de entrar ao vivo, verifique:

- [ ] Pelo menos uma arena está configurada
- [ ] Lista negra está configurada (se desejado)
- [ ] Temporada está ativa
- [ ] Recompensas estão configuradas (opcional)
- [ ] Dois jogadores podem entrar na fila e batalhar com sucesso
- [ ] Elo está atualizando corretamente
- [ ] Tabela de classificação exibe rankings

## Problemas Comuns

### Nenhuma arena configurada

**Sintoma:** Jogadores não conseguem iniciar batalhas

**Correção:**
```
/rankedadmin arena set arena_principal
```

### Jogadores podem usar Pokémon banidos

**Sintoma:** Mewtwo permitido apesar de estar na lista negra

**Correção:**
1. Verifique a sintaxe do `blacklist.json5` (sem vírgulas finais!)
2. Recarregar: `/rankedadmin reload`
3. Testar com validação da GUI `/ranked`

### Elo não está atualizando

**Sintoma:** Elo permanece em 1000 após batalhas

**Correção:**
1. Verifique o console para erros
2. Verifique a conexão do banco de dados
3. Verifique `config.json5` → `eloSystem.mode` (deve ser `LEGACY` ou `POKEMON_SHOWDOWN`)

### Temporada já terminou

**Sintoma:** Mensagem "Temporada terminou"

**Correção:**
```
/rankedadmin season rotate
```
Isso criará uma nova temporada e limpará flags de recompensa.

## Próximos Passos

Agora que você está funcionando:

- **Personalizar idioma** - [Arquivos de Idioma](../configuration/languages.md)
- **Configurar sistema Elo** - [Sistema de Classificação Elo](../features/elo-system.md)
- **Configurar multi-servidor** - [Configuração Multi-Servidor](../advanced/cross-server.md)
- **Aprender todos os comandos** - [Referência de Comandos](commands.md)

## Lista de Verificação de Testes

Use esta lista ao configurar em um novo servidor:

### Funcionalidade Básica
- [ ] GUI `/ranked` abre
- [ ] Seleção de formato funciona
- [ ] Sistema de fila aceita jogadores
- [ ] Matchmaking emparelha jogadores
- [ ] Batalha inicia corretamente
- [ ] Jogadores são teleportados para arena
- [ ] Batalha termina normalmente
- [ ] Elo atualiza após batalha

### Configuração
- [ ] Lista negra bloqueia Pokémon banidos
- [ ] Movimentos banidos são prevenidos
- [ ] Teleporte de arena funciona
- [ ] Arquivos de idioma exibem corretamente
- [ ] Itens da GUI renderizam adequadamente

### Banco de Dados
- [ ] Estatísticas de jogadores persistem após reiniciar
- [ ] Tabela de classificação exibe corretamente
- [ ] Dados de temporada são salvos
- [ ] Flags de recompensa funcionam

---

## Próximos Passos

### Para Novos Admins
1. **[Aprender todos os comandos](commands.md)** - Domine a referência de comandos admin
2. **[Configurar recompensas](../configuration/rewards.md)** - Configure prêmios para os melhores jogadores
3. **[Personalizar mensagens](../configuration/gui.md#language-customization)** - Personalize texto voltado ao jogador

### Para Configuração Competitiva
1. **[Lista negra avançada](../configuration/blacklist.md)** - Configure formato Smogon OU ou VGC
2. **[Ajuste do sistema Elo](../features/elo-system.md)** - Entenda cálculos de classificação
3. **[Gerenciamento de temporadas](../features/seasons.md)** - Configure períodos competitivos

### Para Escalar
1. **[Configuração multi-servidor](../advanced/cross-server.md)** - Compartilhe rankings entre múltiplos servidores
2. **[Otimização de banco de dados](../advanced/database.md)** - MySQL ou MongoDB para bases grandes de jogadores
3. **[Integração PlaceholderAPI](../integration/placeholders.md)** - Exiba rankings em hologramas

---

## Páginas Relacionadas
- [Guia de Instalação](installation.md) - Referência completa de instalação
- [Comandos](commands.md) - Lista completa de comandos
- [Solução de Problemas](../support/troubleshooting.md) - Problemas comuns e soluções
