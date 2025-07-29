## API Endpoints

| Método | URL              | Descrição                     |
|--------|------------------|-------------------------------|
| POST   | `/api/login/`    | Login e retorno do token       |
| GET    | `/api/tasks/`    | Lista tarefas do usuário       |
| POST   | `/api/tasks/`    | Cria nova tarefa               |
| PUT    | `/api/tasks/{id}/` | Atualiza tarefa específica   |
| DELETE | `/api/tasks/{id}/` | Deleta tarefa específica     |

## Como usar

1. Faça login via `/api/login/` enviando `{ username, password }` e receba o token.
2. Use o token no header `Authorization: Token <seu-token>` para acessar os endpoints de tarefas.
3. Crie, liste, atualize e delete tarefas para o usuário autenticado.

---

### Rodando o backend

```bash
python manage.py migrate
python manage.py runserver
```

### Rodando o backend

```bash
npm install
npm run dev
```
