# BACKEND-FUNNY API

API backend para gerenciamento de atividades e acompanhamento do progresso de crianças.

## 🚀 URLs do Projeto

- **Produção (Vercel)**: https://backend-funny.vercel.app/
- **Local**: http://localhost:3000


## 📚 Documentação da API

### 🔐 Autenticação

A maioria dos endpoints requer autenticação via token JWT. Inclua o token no header:
```
Authorization: Bearer seu_token_jwt
```

### 🛣️ Rotas da API

#### Auth
- **POST** `/auth/login` - Login do usuário
  ```json
  {
    "email": "seu@email.com",
    "senha": "sua_senha"
  }
  ```
- **GET** `/auth/session` - Obtém sessão atual
- **PUT** `/auth/password` - Atualiza senha
  ```json
  {
    "senha_atual": "senha_atual",
    "nova_senha": "nova_senha"
  }
  ```
- **DELETE** `/auth/logout` - Realiza logout

#### Responsável
- **POST** `/responsaveis` - Cadastra novo responsável
  ```json
  {
    "nome": "Nome do Responsável",
    "telefone": "(11) 99999-9999",
    "email": "responsavel@example.com",
    "senha": "senha123"
  }
  ```
- **GET** `/responsaveis/me` - Busca perfil do responsável
- **PUT** `/responsaveis/me` - Atualiza dados do responsável
  ```json
  {
    "nome": "Novo Nome",
    "telefone": "(11) 88888-8888"
  }
  ```
- **DELETE** `/responsaveis/me` - Remove conta do responsável

#### Criança
- **POST** `/criancas` - Cadastra nova criança
  ```json
  {
    "nome": "Nome da Criança",
    "data_nascimento": "2018-01-01"
  }
  ```
- **GET** `/criancas` - Lista todas as crianças
- **PUT** `/criancas/:id` - Atualiza dados da criança
  ```json
  {
    "nome": "Novo Nome da Criança",
    "data_nascimento": "2018-01-01"
  }
  ```
- **DELETE** `/criancas/:id` - Remove criança

#### Atividades
- **POST** `/atividades/crianca/:crianca_id` - Cria nova atividade
  ```json
  {
    "titulo": "Atividade de Teste",
    "descricao": "Descrição da atividade",
    "tipo": "teste"
  }
  ```
- **GET** `/atividades/crianca/:crianca_id` - Lista atividades da criança
- **PUT** `/atividades/:id` - Atualiza atividade
  ```json
  {
    "titulo": "Novo Título",
    "descricao": "Nova descrição",
    "tipo": "novo_tipo"
  }
  ```
- **DELETE** `/atividades/:id` - Remove atividade

#### Progresso
- **POST** `/progressos/crianca/:crianca_id` - Registra progresso
  ```json
  {
    "atividade_id": 1,
    "pontuacao": 10,
    "observacoes": "Teste de progresso"
  }
  ```
- **GET** `/progressos/crianca/:crianca_id` - Lista progressos da criança
- **PUT** `/progressos/:id` - Atualiza progresso
  ```json
  {
    "pontuacao": 8,
    "observacoes": "Atualização do progresso"
  }
  ```
- **DELETE** `/progressos/:id` - Remove progresso

#### Diagnóstico
- **POST** `/diagnosticos/crianca/:crianca_id` - Cria diagnóstico
  ```json
  {
    "descricao": "Diagnóstico inicial",
    "recomendacoes": "Recomendações iniciais"
  }
  ```
- **GET** `/diagnosticos/crianca/:crianca_id` - Lista diagnósticos da criança
- **PUT** `/diagnosticos/:id` - Atualiza diagnóstico
  ```json
  {
    "descricao": "Diagnóstico atualizado",
    "recomendacoes": "Novas recomendações"
  }
  ```
- **DELETE** `/diagnosticos/:id` - Remove diagnóstico

## 📦 Coleção Postman

Uma coleção Postman completa está disponível no arquivo `postman.json`. Importe-a no Postman para testar todos os endpoints.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 