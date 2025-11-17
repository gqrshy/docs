# Configuração Cross-Server

---
**CobbleRanked** > **Avançado** > **Cross-Server**
---

Execute CobbleRanked em múltiplos servidores com rankings compartilhados.

## Arquitetura

> **[📸 IMAGEM NECESSÁRIA: Diagrama de arquitetura cross-server (proxy Velocity, múltiplos servidores lobby/principal, servidor de batalha, configuração DB/Redis compartilhado)]**

**Servidores:**
- **Servidor de Batalha** - Hospeda todas as batalhas ranqueadas
- **Servidores Lobby/Principal** - Jogadores entram na fila aqui, transferem para servidor de batalha

**Componentes Necessários:**
- Proxy Velocity (3.3.0+)
- MySQL ou MongoDB (banco de dados compartilhado)
- Redis (sincronização de fila em tempo real)

## Instalação

### 1. Configuração de Proxy Velocity

**Plugin:** [ProxyCommand Reloaded](https://modrinth.com/plugin/proxy-command-reloaded)

### 2. Mods de Servidor Fabric

Instale em **todos** os servidores (lobby, principal, batalha):

- [CrossStitch](https://modrinth.com/mod/crossstitch)
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [Placeholder API](https://modrinth.com/mod/placeholder-api) (2.4.2+1.21+)
- [Cobblemon](https://modrinth.com/mod/cobblemon) (1.6.1+)
- [CobbleRanked](https://modrinth.com/mod/cobbleranked)

### 3. Configuração de Banco de Dados

**MySQL:**
```sql
CREATE DATABASE cobbleranked;
CREATE USER 'ranked'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'ranked'@'%';
```

**MongoDB:**
```javascript
use cobbleranked
db.createUser({user: "ranked", pwd: "password", roles: ["readWrite"]})
```

### 4. Configuração de Redis

**Linux:**
```bash
sudo apt install redis-server
sudo systemctl start redis
```

**Docker:**
```bash
docker run -d -p 6379:6379 redis:alpine
```

## Configuração

### Servidor de Batalha

**Arquivo:** `config/cobbleranked/config.json5`

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Vazio = este É o servidor de batalha
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": ""
    }
  },
  "database_type": "mysql",  // ou "mongodb"
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

### Servidores Lobby/Principal

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // ou "lobby", "main2", etc.
    "battle_server": "battle",  // Alvo de transferência
    "redis": {
      "host": "localhost",
      "port": 6379
    }
  },
  "database_type": "mysql",
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

## Diferenças Principais

| Configuração | Servidor de Batalha | Lobby/Principal |
|---------|---------------|------------|
| `server_id` | `"battle"` | `"main1"`, `"lobby"`, etc. |
| `battle_server` | `""` (vazio) | `"battle"` |
| Recursos globais | ✅ Gerencia | ❌ Somente leitura |

## Testando

1. Iniciar todos os servidores
2. Entrar na fila do lobby: `/ranked`
3. Aceitar partida quando encontrada
4. Verificar transferência para servidor de batalha
5. Verificar sincronização de estatísticas após batalha

## Solução de Problemas

**Jogadores não transferindo:**
- Verifique `velocity.toml` tem nomes de servidor corretos
- Verifique ProxyCommand Reloaded está instalado

**Estatísticas não sincronizando:**
- Verifique conexão MySQL/MongoDB em todos os servidores
- Verifique Redis está executando: `redis-cli ping` → `PONG`

**Servidores de batalha duplicados:**
- Apenas um servidor deve ter `battle_server: ""`
- Verifique logs para erros `SEVERE` sobre servidores de batalha duplicados

## Avançado

### Múltiplos Servidores de Batalha (Balanceamento de Carga)

Não suportado atualmente. Use um servidor de batalha dedicado.

### Pool de Conexões de Banco de Dados

Aumente para tráfego alto:

```json5
"mysql": {
  "connection_pool": {
    "maximum_pool_size": 50,
    "minimum_idle": 20
  }
}
```

---

## Próximos Passos

### Para Configuração
1. **[Configuração de Proxy Velocity](#1-velocity-proxy-setup)** - Configurar proxy
2. **[Configuração de Banco de Dados](#3-database-setup)** - MySQL ou MongoDB
3. **[Configuração de Redis](#4-redis-setup)** - Comunicação em tempo real

### Para Configuração
1. **[Config Servidor de Batalha](#battle-server)** - Configurar servidor de batalha principal
2. **[Config Servidor Lobby](#lobbymain-servers)** - Configurar servidores de fila
3. **[Tabela de Diferenças Principais](#key-differences)** - Entender papéis dos servidores

### Para Solução de Problemas
1. **[Lista de Verificação de Testes](#testing)** - Verificar cross-server funciona
2. **[Problemas Comuns](#troubleshooting)** - Corrigir problemas de transferência e sincronização
3. **[FAQ Cross-Server](../support/faq.md#cross-server)** - Perguntas frequentes

---

## Páginas Relacionadas
- [Configuração de Banco de Dados](database.md) - Configuração MySQL/MongoDB/Redis
- [Guia de Instalação](../getting-started/installation.md#cross-server-setup-advanced) - Pré-requisitos
- [Solução de Problemas](../support/troubleshooting.md#cross-server-issues) - Problemas cross-server
