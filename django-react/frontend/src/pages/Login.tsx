import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../features/auth/authSlice';
import { Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default function Login() {
  const dispatch = useAppDispatch();
  const { token, isLoading, isError, message } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      {isError && <p style={{ color: 'red' }}>{message}</p>}
      <p>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </Container>
  );
}
