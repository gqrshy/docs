# Configuração de Banco de Dados

---
**CobbleRanked** > **Avançado** > **Banco de Dados**
---

Configuração avançada de banco de dados para CobbleRanked.

## Visão Geral

CobbleRanked suporta três sistemas de banco de dados:
- **SQLite** - Baseado em arquivo, servidor único (padrão)
- **MySQL** - Banco de dados de rede, suporte cross-server
- **MongoDB** - Banco de dados NoSQL, suporte cross-server (NOVO!)

## SQLite (Padrão)

### Quando Usar

**Perfeito para:**
- Servidor Minecraft único
- Base de jogadores pequena a média (< 1.000 jogadores)
- Configuração simples, sem dependências externas
- Testes e desenvolvimento

**Limitações:**
- Não pode compartilhar dados entre múltiplos servidores
- Desempenho degrada com datasets muito grandes (10.000+ jogadores)

### Configuração

Nenhuma configuração necessária! Funciona imediatamente.

**Localização do arquivo:** `config/cobbleranked/ranked.db`

### Backup

```bash
# Backup
cp config/cobbleranked/ranked.db backup-$(date +%Y%m%d).db

# Restaurar
cp backup-20251026.db config/cobbleranked/ranked.db
```

---

## MySQL

### Quando Usar

**Necessário para:**
- Configurações cross-server (múltiplos servidores Minecraft)
- Bases de jogadores grandes (1.000+ jogadores)
- Melhor desempenho em escala
- Recursos avançados (replicação, ferramentas de backup)

### Configuração

Veja [Configuração Cross-Server](cross-server.md) para guia completo de instalação MySQL.

**Config rápida:**
```json5
{
  "cross_server": {
    "enabled": true,
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "senha_segura"
    }
  }
}
```

### Schema de Banco de Dados

CobbleRanked cria automaticamente estas tabelas:

| Tabela | Propósito |
|-------|---------|
| `player_ranked_stats` | Estatísticas de jogador legacy (pré-sistema de formato) |
| `format_stats` | Estatísticas específicas de formato (Singles, Doubles) |
| `seasons` | Histórico e metadados de temporada |

**Nenhuma criação manual de tabela necessária!**

---

## MongoDB

### Quando Usar

**Perfeito para:**
- Configurações cross-server (alternativa ao MySQL)
- Implantações cloud-native (MongoDB Atlas)
- Requisitos de escalonamento horizontal
- Evolução de schema flexível
- Bases de jogadores grandes com alta vazão de escrita

**Vantagens sobre MySQL:**
- ✅ Escalonamento horizontal mais fácil (sharding)
- ✅ Armazenamento de documento JSON nativo
- ✅ Pronto para nuvem (MongoDB Atlas)
- ✅ Flexibilidade de schema automática
- ✅ Melhor desempenho para cargas de escrita altas

### Configuração

#### Opção 1: MongoDB Local

```bash
# Ubuntu/Debian
sudo apt install mongodb-server
sudo systemctl start mongodb

# Criar banco de dados e usuário
mongosh
use cobbleranked
db.createUser({
  user: "cobbleranked",
  pwd: "senha_segura",
  roles: [{ role: "readWrite", db: "cobbleranked" }]
})
```

#### Opção 2: MongoDB Atlas (Nuvem)

1. Criar cluster gratuito em [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Obter string de conexão: `cluster0.xxxxx.mongodb.net`
3. Adicionar endereço IP à lista permitida
4. Copiar credenciais

### Configuração

`config/cobbleranked/config.json5`:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle",
    "database_type": "mongodb",  // Definir para "mongodb"

    "mongodb": {
      "connection_string": "mongodb://localhost:27017",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "senha_segura",
      "auth_database": "admin",
      "use_srv": false,  // Definir true para Atlas

      "connection_pool": {
        "max_pool_size": 10,
        "min_pool_size": 5,
        "max_idle_time_ms": 60000,
        "max_connection_lifetime_ms": 1800000,
        "connect_timeout_ms": 10000,
        "socket_timeout_ms": 5000
      }
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

### Configuração MongoDB Atlas

Para implantação em nuvem:

```json5
{
  "mongodb": {
    "connection_string": "cluster0.xxxxx.mongodb.net",
    "database": "cobbleranked",
    "username": "seu-usuario",
    "password": "sua-senha",
    "auth_database": "admin",
    "use_srv": true  // Importante para Atlas!
  }
}
```

### Schema de Banco de Dados

MongoDB cria automaticamente estas coleções:

| Coleção | Propósito | Índices |
|-----------|---------|---------|
| `player_ranked_stats` | Estatísticas gerais de jogador | `player_uuid` |
| `format_stats` | Estatísticas específicas de formato | `{player_uuid, format}`, `{format, elo_points}` |
| `seasons` | Histórico de temporada | `{is_active, season_id}` |
| `pending_season_rewards` | Recompensas pendentes | `player_uuid`, `season_id` |
| `claimed_season_rewards` | Recompensas reivindicadas | `{player_uuid, season_id, reward_id}` |

**Todos os índices são criados automaticamente na primeira inicialização!**

### Backup & Restauração

**Backup:**
```bash
mongodump --db cobbleranked --out /backup/$(date +%Y%m%d)
```

**Restaurar:**
```bash
mongorestore --db cobbleranked /backup/20251108/cobbleranked
```

**Atlas:** Use backups em nuvem integrados (automático).

---

## Comparação

| Recurso | SQLite | MySQL | MongoDB |
|---------|--------|-------|---------|
| **Configuração** | ✅ Zero config | ⚠️ Instalação necessária | ⚠️ Instalação necessária |
| **Cross-server** | ❌ Não | ✅ Sim | ✅ Sim |
| **Escalonamento** | ❌ Limitado | ⚠️ Apenas vertical | ✅ Horizontal |
| **Nuvem** | ❌ Não | ⚠️ Requer VPS | ✅ Atlas tier gratuito |
| **Desempenho** | ✅ Rápido (pequeno) | ✅ Rápido (médio) | ✅ Rápido (grande) |
| **Mudanças de schema** | ⚠️ Manual | ⚠️ Manual | ✅ Automático |
| **Backup** | ✅ Cópia simples de arquivo | ⚠️ mysqldump | ✅ mongodump/Atlas |

**Recomendação:**
- **Servidor único**: SQLite (mais fácil)
- **2-5 servidores**: MySQL ou MongoDB (similar)
- **5+ servidores**: MongoDB (melhor escalonamento)
- **Implantação em nuvem**: MongoDB Atlas (mais fácil)

---

## Migração

### SQLite para MySQL/MongoDB

```bash
/rankedadmin database migrate sqlite mysql
/rankedadmin database migrate sqlite mongodb
```

**Requisitos:**
- Banco de dados alvo configurado em `config.json5`
- Conexão ao banco de dados alvo funcionando

**O que é migrado:**
- Todas as estatísticas de jogador
- Ratings Elo
- Registros de vitória/derrota
- Dados de temporada

### MySQL para MongoDB

```bash
/rankedadmin database migrate mysql mongodb
```

**Caso de uso:** Migrar de MySQL para MongoDB para melhor escalonamento.

### Voltar para SQLite

```bash
/rankedadmin database migrate mysql sqlite
/rankedadmin database migrate mongodb sqlite
```

**Caso de uso:** Downgrade de cross-server para servidor único.

---

## Solução de Problemas

### Banco de dados SQLite corrompido

```bash
sqlite3 config/cobbleranked/ranked.db "PRAGMA integrity_check;"
```

Se corrompido, restaure do backup ou delete (reseta todos os dados).

### Falha de conexão MySQL

1. Testar conexão: `mysql -u user -p -h host database`
2. Verificar credenciais em config
3. Verificar MySQL executando: `systemctl status mysql`
4. Verificar firewall: `telnet host 3306`

### Falha de conexão MongoDB

1. **Testar conexão:**
   ```bash
   mongosh "mongodb://username:password@host:27017/cobbleranked"
   ```

2. **Verificar credenciais:**
   - Verificar `username` e `password` em config
   - Verificar `auth_database` (geralmente `admin`)

3. **Verificar MongoDB executando:**
   ```bash
   systemctl status mongodb  # ou mongod
   ```

4. **Verificar firewall:**
   ```bash
   telnet host 27017
   ```

5. **Específico do Atlas:**
   - Verificar lista de IPs permitidos inclui IP do servidor
   - Verificar `use_srv: true` está definido
   - String de conexão NÃO deve incluir prefixo `mongodb://` quando `use_srv: true`

### MongoDB: Falha de autenticação

**Erro:** `Command failed with error 18 (AuthenticationFailed)`

**Solução:**
```bash
# Recriar usuário com permissões corretas
mongosh
use admin
db.createUser({
  user: "cobbleranked",
  pwd: "senha_segura",
  roles: [
    { role: "readWrite", db: "cobbleranked" },
    { role: "dbAdmin", db: "cobbleranked" }
  ]
})
```

### MongoDB: Consultas lentas

**Habilitar profiling:**
```bash
mongosh cobbleranked
db.setProfilingLevel(1, { slowms: 100 })  // Registrar consultas >100ms
db.system.profile.find().sort({ts: -1}).limit(5)
```

**Verificar índices:**
```bash
db.format_stats.getIndexes()  // Deve mostrar índice elo_points
```

Se faltando, CobbleRanked recriará na próxima reinicialização.

---

## Configuração Redis

### Visão Geral

Redis fornece comunicação em tempo real entre servidores CobbleRanked para:
- **Sincronização de fila** - Jogadores em diferentes servidores podem parear
- **Matchmaking** - Servidor de batalha detecta jogadores na fila instantaneamente
- **Heartbeats de servidor** - Monitorar servidores ativos
- **Transferências de jogador** - Coordenar troca de servidor

**Necessário para:** Apenas configurações cross-server

### Instalação

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### CentOS/RHEL
```bash
sudo yum install redis
sudo systemctl start redis
sudo systemctl enable redis
```

#### Docker
```bash
docker run -d -p 6379:6379 redis:latest
```

### Configuração

#### Configuração Básica

**Arquivo:** `/etc/redis/redis.conf`

```ini
# Permitir conexões de todos os IPs
bind 0.0.0.0

# Desabilitar modo protegido (ou usar senha)
protected-mode no

# OPCIONAL: Senha
requirepass sua_senha
```

**Reiniciar Redis:**
```bash
sudo systemctl restart redis-server
```

#### Firewall

```bash
# Ubuntu/Debian
sudo ufw allow 6379/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

### Configuração CobbleRanked

**config.json5:**

```json5
{
  "cross_server": {
    "redis": {
      "host": "192.168.1.100",  // IP do servidor Redis
      "port": 6379,
      "password": "",  // Deixe vazio se sem senha
      "database": 0    // Número do banco de dados Redis (0-15)
    }
  }
}
```

**Importante:** Todos os servidores devem usar mesmo número de `database`!

### Testando

#### Testar Conexão

```bash
redis-cli -h REDIS_IP -p 6379 PING
```

**Esperado:** `PONG`

#### Com Senha

```bash
redis-cli -h REDIS_IP -p 6379 -a sua_senha PING
```

#### Monitorar Atividade

```bash
redis-cli MONITOR
```

Mostra comandos Redis em tempo real (útil para depuração).

### Solução de Problemas

#### Conexão recusada

**Soluções:**
1. Verificar Redis executando: `systemctl status redis-server`
2. Verificar endereço bind: `grep bind /etc/redis/redis.conf`
3. Verificar firewall: `telnet REDIS_IP 6379`

#### Senha errada

```
(error) NOAUTH Authentication required
```

**Solução:** Fornecer senha em config ou remover `requirepass` de redis.conf

#### Fila não sincronizando

**Sintomas:** Jogadores em servidores diferentes não podem parear

**Soluções:**
1. Verificar todos os servidores usam mesmo host/porta Redis
2. Verificar todos os servidores usam mesmo número de `database`
3. Testar conexão Redis de cada servidor
4. Verificar logs do servidor para erros Redis

### Avançado

#### Múltiplos Bancos de Dados

Redis suporta 16 bancos de dados (0-15). Use bancos de dados diferentes para diferentes propósitos:

```json5
{
  "redis": {
    "database": 0  // CobbleRanked usa banco de dados 0
  }
}
```

**Nota:** Todos os servidores CobbleRanked devem usar mesmo banco de dados!

#### Desempenho

Redis é extremamente rápido. Nenhum ajuste necessário para uso típico.

**Se experimentando lag:**
- Verificar recursos do servidor Redis (CPU, RAM)
- Usar servidor Redis dedicado (não no servidor Minecraft)
- Monitorar: `redis-cli INFO`

---

## Próximos Passos

### Para Configuração de Banco de Dados
1. **[Migração SQLite para MySQL](#sqlite-to-mysqlmongodb)** - Caminho de upgrade
2. **[Configuração MongoDB Atlas](#option-2-mongodb-atlas-cloud)** - Banco de dados em nuvem
3. **[Configuração Redis](#redis-configuration)** - Sincronização em tempo real

### Para Desempenho
1. **[Pool de Conexões](#connection-pool)** - Otimizar conexões
2. **[Comparação de Banco de Dados](#comparison)** - Escolher o banco de dados certo
3. **[Estratégias de Backup](#backup--restore)** - Proteger seus dados

### Para Solução de Problemas
1. **[Problemas MySQL](#mysql-connection-failed)** - Problemas de conexão
2. **[Problemas MongoDB](#mongodb-connection-failed)** - Autenticação e configuração
3. **[Problemas Redis](#redis-configuration)** - Problemas de sincronização de fila

---

## Páginas Relacionadas
- [Configuração Cross-Server](cross-server.md) - Configuração multi-servidor
- [Guia de Instalação](../getting-started/installation.md#cross-server-setup-advanced) - Pré-requisitos
- [FAQ](../support/faq.md#cross-server) - Perguntas sobre banco de dados
