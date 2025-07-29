import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { registerUser, loginUser, logout } from './features/auth/authSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector(state => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser(form));
    } else {
      dispatch(registerUser(form));
    }
  };

  if (token) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Autenticado</h1>
        <p>Token JWT:</p>
        <textarea readOnly style={{ width: '100%', height: 150 }} value={token} />
        <button onClick={() => dispatch(logout())}>Sair</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 320, margin: 'auto', padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Registrar'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 8 }}>
          {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Registrar'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ marginTop: 12 }}>
        {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
        <button onClick={() => setIsLogin(!isLogin)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'Registre-se' : 'Faça login'}
        </button>
      </p>
    </div>
  );
};

export default App;
