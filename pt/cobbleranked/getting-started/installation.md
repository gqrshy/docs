# Guia de Instalação

---
**CobbleRanked** > **Começando** > **Instalação**
---

Guia completo para instalar o CobbleRanked em seu servidor Minecraft.

---

## Mods Necessários

Coloque todos estes na sua pasta `mods`:

| Mod | Versão | Download |
|-----|---------|----------|
| Fabric Loader | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| Fabric API | 0.116.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| Cobblemon | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| Fabric Language Kotlin | 1.13.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| **CobbleRanked** | Mais recente | [Discord](https://discord.gg/VVVvBTqqyP) |

**Alvo:** Minecraft 1.21.1 (servidor Fabric)

![Pasta de mods com todas as dependências](../../images/dependancies.png)

---

## Passos de Instalação

### 1. Colocar Mods
Copie todos os JARs para a pasta `server/mods/`

### 2. Iniciar Servidor
No primeiro início, os arquivos de configuração são gerados automaticamente:

```
server/
├── config/
│   └── cobbleranked/
│       ├── config.json5        ← Configuração principal
│       ├── blacklist.json5     ← Restrições de Pokémon/movimentos
│       ├── arenas.json5        ← Coordenadas de batalha
│       ├── rewards.json5       ← Recompensas de temporada/marcos
│       ├── ranked.db           ← Banco de dados SQLite
│       ├── gui/                ← GUIs em 4 idiomas
│       └── language/           ← Arquivos de idioma em 4 línguas
```

### 3. Verificar Instalação

**Saída do console:**
```
[CobbleRanked] Mod initialized successfully
[CobbleRanked] Configuration loaded
[CobbleRanked] Database initialized (SQLite)
[CobbleRanked] Season manager initialized
```

**Teste no jogo:**
```
/ranked
```
Se a GUI abrir → Instalação bem-sucedida! ✅

![Menu principal da GUI Ranked](../../images/rankedmenu.png)

---

## Configuração Inicial (Opcional)

### Configuração de Idioma

Padrão: Inglês (`en-Us`)

Edite `config/cobbleranked/config.json5`:

```json5
{
  "language": "pt-Br"  // en-Us | ja-Jp | pt-Br | ru-Ru
}
```

**Recarregar:** `/rankedadmin reload`

**Afeta:** Texto da GUI, mensagens, erros de validação

### Configuração de Arena (Recomendado)

Teleporte jogadores para coordenadas de batalha em vez da localização atual.

**Passo 1:** Fique no ponto de spawn de batalha desejado
**Passo 2:** Execute o comando:

```
/rankedadmin arena set arena_principal
```

**Salvo:** Posição (x, y, z), direção (yaw, pitch), dimensão

**Execução do comando:**
![Comando de configuração de arena](../../images/setarenacommand.png)

**Saída do comando:**
![Saída da configuração de arena](../../images/setarenaoutput.png)

<details>
<summary><strong>Múltiplas Arenas (Opcional)</strong></summary>

Crie múltiplos locais de batalha para variedade:

```
/rankedadmin arena set arena_vulcao
/rankedadmin arena set arena_oceano
/rankedadmin arena set arena_floresta
```

**Seleção aleatória:** Rotaciona automaticamente entre arenas

**Gerenciar arenas:**
```
/rankedadmin arena list          # Ver todas
/rankedadmin arena tp <nome>     # Teleportar para arena
/rankedadmin arena remove <nome> # Excluir arena
```

</details>

### Regras Básicas (Recomendado)

Banir lendários e movimentos OHKO:

Edite `config/cobbleranked/blacklist.json5`:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Recarregar:** `/rankedadmin reload`

**Detalhes:** [Configuração de Lista Negra](../configuration/blacklist.md)

---

## Configuração Multi-Servidor (Avançado)

**Necessário para:** Redes multi-servidor compartilhando rankings

**Arquitetura:**
```
[Servidores de Lobby] → [Proxy Velocity] → [Servidor de Batalha]
        ↓                                   ↓
     [MySQL/MongoDB + Redis] ← ← ← ← ← ← ←
```

### Requisitos

- MySQL 8.0+ OU MongoDB 6.0+ (escolha um)
- Redis 6.0+
- Velocity 3.4.0+

### Configuração Rápida

**1. Escolher Banco de Dados:**
- MySQL: Tradicional, bom para 2-5 servidores
- MongoDB: Pronto para nuvem (Atlas), melhor para 5+ servidores

**2. Instalar Redis:**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

**3. Configurar Servidores:**

**Servidor de Batalha** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Vazio = este É o servidor de batalha
    "database": {
      "type": "MYSQL",  // ou MONGODB
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "sua_senha"
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**Servidores de Lobby** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",     // Único por servidor!
    "battle_server": "battle",  // Deve corresponder ao nome do servidor Velocity
    "database": { /* IGUAL ao de batalha */ },
    "redis": { /* IGUAL ao de batalha */ }
  }
}
```

> **[📸 INSERIR: Diagrama mostrando arquitetura multi-servidor com Velocity]**

**Guia Completo:** [Configuração Multi-Servidor](../advanced/cross-server.md)

---

## Veja Também

- [FAQ e Solução de Problemas](../support/faq.md) - Problemas comuns e soluções

---

## Referência de Estrutura de Arquivos

```
config/cobbleranked/
├── config.json5           # Configurações principais (temporadas, Elo, cláusulas)
├── blacklist.json5        # Restrições (Pokémon/movimentos/habilidades/itens)
├── arenas.json5           # Coordenadas de batalha
├── rewards.json5          # Recompensas de fim de temporada e marcos
├── ranked.db              # Banco de dados SQLite (criado automaticamente)
├── gui/
│   ├── gui-enUs.json5     # Interface em Inglês
│   ├── gui-jaJp.json5     # Interface em Japonês
│   ├── gui-ptBr.json5     # Interface em Português
│   └── gui-ruRu.json5     # Interface em Russo
└── language/
    ├── en-Us.json5        # Mensagens em Inglês
    ├── ja-Jp.json5        # Mensagens em Japonês
    ├── pt-Br.json5        # Mensagens em Português
    └── ru-Ru.json5        # Mensagens em Russo
```

**Todos os arquivos:** Formato JSON5 (permite comentários `//`)

---

## Próximos Passos

### Para Servidores Casuais
1. **[Configurar arenas](../configuration/arenas.md)** - Locais de batalha
2. **[Configurar recompensas](../configuration/rewards.md)** - Prêmios para os 3 primeiros
3. **[Personalizar GUI](../configuration/gui.md)** - Ajustes de interface

### Para Servidores Competitivos
1. **[Configurar lista negra](../configuration/blacklist.md)** - Regras Smogon/VGC
2. **[Ajustar sistema Elo](../configuration/config.md#elo-system)** - Ajuste fino de classificações
3. **[Definir escala de nível](../configuration/config.md#ranked-match)** - Forçar Lv50

### Para Redes Multi-Servidor
1. **[Completar configuração multi-servidor](../advanced/cross-server.md)** - Guia completo
2. **[Configurar Velocity](../advanced/cross-server.md#velocity-configuration)** - Roteamento de servidor
3. **[Configurar Redis](../advanced/redis.md)** - Sincronização em tempo real

---

## Páginas Relacionadas
- [Guia de Início Rápido](quick-start.md) - Coloque sua primeira batalha em funcionamento
- [Referência de Comandos](commands.md) - Comandos admin essenciais
- [FAQ](../support/faq.md) - Perguntas comuns sobre instalação
