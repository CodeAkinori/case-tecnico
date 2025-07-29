import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8080/auth/register', data);
      return res.data.token;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Erro no registro');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8080/auth/login', data);
      return res.data.token;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Erro no login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
