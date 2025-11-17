# Gerenciamento de Temporadas

---
**CobbleRanked** > **Recursos** > **Temporadas**
---

Períodos competitivos baseados em tempo com rotação automática e recompensas.

---

## Visão Geral

Temporadas são períodos competitivos onde jogadores competem por posições no ranking e recompensas.

**No final da temporada:**
- Jogadores top recebem recompensas de temporada
- Flags de recompensa resetam
- Nova temporada começa automaticamente
- Estatísticas de jogador (Elo, vitórias, derrotas) **preservadas**

**Duração padrão:** 30 dias

---

## Ciclo de Vida da Temporada

```
Início da Temporada → Competir → Fim da Temporada → Recompensas → Nova Temporada
    ↓            ↓           ↓           ↓          ↓
  Dia 1      Dias 2-29     Dia 30      Dia 31    Dia 1
```

**Durante temporada:**
- Jogadores competem em batalhas ranqueadas
- Elo muda baseado em resultados
- Ranking atualiza em tempo real

**No fim da temporada:**
- Ranking finalizado
- Recompensas de temporada calculadas
- Recompensas tornam-se reivindicáveis em GUI
- Recompensas de marcos resetam

**Preservado:**
- ✅ Rating Elo
- ✅ Total de vitórias/derrotas
- ✅ Contagem de fuga

**Resetado:**
- ❌ Flags de recompensa de marcos
- ❌ Reivindicações de recompensa de temporada

---

## Configuração

`config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    "reset_days": 30  // Duração da temporada em dias
  }
}
```

### Durações Comuns

| Duração | Caso de Uso |
|----------|----------|
| 7 dias | Competições semanais |
| 14 dias | Quinzenal |
| **30 dias** | **Mensal (recomendado)** |
| 60 dias | Longo prazo |
| 90 dias | Trimestral |

---

## Rotação Automática

Temporadas rotacionam automaticamente quando a duração expira.

**Como funciona:**
1. Verificação executa a cada 10 minutos (apenas servidor de batalha)
2. Se `tempo_atual >= tempo_fim`:
   - Temporada atual termina
   - Nova temporada cria automaticamente
   - Jogadores notificados no chat

**Configuração:** Nenhuma necessária (automático).

---

## Comandos Manuais

### Terminar Temporada Atual

```
/rankedadmin endseason
```

Força temporada atual a terminar imediatamente.

### Criar Nova Temporada

```
/rankedadmin createseason <days> [name]
```

**Exemplos:**
```
/rankedadmin createseason 30
/rankedadmin createseason 30 "Campeonato de Verão"
```

### Informações da Temporada

```
/rankedadmin seasoninfo
```

Mostra:
- ID da temporada atual
- Data de início
- Data de fim
- Dias restantes

---

## Comportamento Cross-Server

⚠️ **Singleton de Servidor de Batalha**

Apenas UM servidor deve gerenciar temporadas (servidor de batalha).

**Config:**
```json5
{
  "battle_server": ""  // Vazio = gerencia temporadas
}
```

**Outros servidores:**
```json5
{
  "battle_server": "battle1"  // NÃO gerencia temporadas
}
```

**Por quê:** Múltiplos servidores de batalha causam rotações de temporada duplicadas.

---

## Solução de Problemas

**Temporada não rotacionando?**
- Verifique servidor de batalha está executando
- Verifique `reset_days` está definido
- Verifique logs do servidor para erros

**Múltiplas temporadas criadas?**
- Verifique apenas um servidor de batalha (`battle_server: ""`)
- Verifique logs do servidor para avisos de duplicata

**Jogadores não recebendo recompensas?**
- Verifique temporada terminou: `/rankedadmin seasoninfo`
- Verifique [Configuração de Recompensas](../configuration/rewards.md)

---

## Próximos Passos

### Para Configuração de Temporada
1. **[Sistema de Recompensas](../configuration/rewards.md)** - Configurar prêmios de fim de temporada
2. **[Duração da Temporada](../configuration/config.md#ranked-match)** - Ajustar duração da temporada
3. **[Comandos Manuais](#manual-commands)** - Controlar rotação de temporada

### Para Servidores Competitivos
1. **[Rankings](leaderboards.md)** - Rastrear rankings de temporada
2. **[Sistema Elo](elo-system.md)** - Entender progressão de rating
3. **[Temporadas Cross-Server](../advanced/cross-server.md#key-differences)** - Coordenação multi-servidor

### Para Solução de Problemas
1. **[Problemas de Temporada](../support/troubleshooting.md#season-not-rotating)** - Problemas comuns
2. **[FAQ Temporadas](../support/faq.md#manually-end-season)** - Perguntas frequentes
3. **[Singleton de Servidor de Batalha](#cross-server-behavior)** - Prevenir rotações duplicadas

---

## Páginas Relacionadas
- [Configuração de Recompensas](../configuration/rewards.md) - Prêmios e marcos de temporada
- [Configuração Cross-Server](../advanced/cross-server.md) - Gerenciamento de temporada multi-servidor
- [Referência de Comandos](../getting-started/commands.md#season-management) - Comandos de temporada
