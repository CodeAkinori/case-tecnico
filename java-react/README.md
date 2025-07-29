- **Backend:** Java 17, Spring Boot, Spring Security, JWT, JPA, PostgreSQL
- **Frontend:** React, TypeScript, Redux Toolkit, Styled Components, Recharts
- **Banco de Dados:** PostgreSQL (via Docker)
- **Containerização:** Docker e Docker Compose

---

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Subir o backend e banco via Docker

```bash
docker-compose up --build
```

- O backend estará disponível em: `http://localhost:8080`
- O banco de dados estará disponível na porta `5432`

### 3. Rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

- O frontend estará disponível em: `http://localhost:5173`

---

## Endpoints principais

| Método | Rota              | Descrição                |
|--------|-------------------|--------------------------|
| POST   | `/auth/register`  | Cadastro de usuário      |
| POST   | `/auth/login`     | Login e geração de token |
| GET    | `/api/vendas`     | Listar indicadores       |

> As rotas protegidas exigem o token JWT no header Authorization.

---

## Estrutura do projeto

```
├── backend
│   ├── src
│   └── Dockerfile
├── frontend
│   ├── src
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## Observações

- A autenticação usa JWT.
- O projeto utiliza `volumes` para persistência dos dados do PostgreSQL.
- Para testes via Postman, use o header:
  ```
  Authorization: Bearer <token>
  ```