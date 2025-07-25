import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isError: false,
  message: '',
};

// Async thunk para login
export const login = createAsyncThunk<
  { token: string },
  { username: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', credentials);
    const data = response.data;
    localStorage.setItem('token', data.token);
    return { token: data.token };
  } catch {
    return thunkAPI.rejectWithValue('Credenciais inválidas');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = { username: '' }; // Pode ser substituído após implementação do endpoint de perfil
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Erro ao fazer login';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
