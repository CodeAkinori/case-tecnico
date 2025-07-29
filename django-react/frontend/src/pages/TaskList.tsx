import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchTasks,
  createTask,
  deleteTask,
} from "../features/tasks/tasksSlice";
import styled from "styled-components";
import { logout } from "../features/auth/authSlice";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TaskItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const Button = styled.button`
  margin-right: 8px;
`;

export default function TaskList() {
  const dispatch = useAppDispatch();
  const { tasks, isLoading, isError, message } = useAppSelector(
    (state) => state.tasks
  );

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<
    "pendente" | "em andamento" | "concluída"
  >("pendente");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) return;

    const hoje = new Date();
    const prazoFormatado = hoje.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    dispatch(
      createTask({
        titulo,
        descricao,
        status,
        prazo: prazoFormatado,
      })
    );

    setTitulo("");
    setDescricao("");
    setStatus("pendente");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <h2>Minhas Tarefas</h2>
      <button onClick={handleLogout}>Sair</button>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <br />
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "pendente" | "andamento" | "concluida")
          }
        >
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluída</option>
        </select>
        <br />
        <button type="submit" disabled={isLoading}>
          Adicionar
        </button>
      </form>

      {isError && <p style={{ color: "red" }}>{message}</p>}

      {isLoading ? (
        <p>Carregando tarefas...</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id}>
            <h3>{task.titulo}</h3>
            <p>{task.descricao}</p>
            <p>Status: {task.status}</p>
            <Button onClick={() => handleDelete(task.id)}>Excluir</Button>
          </TaskItem>
        ))
      )}
    </Container>
  );
}
