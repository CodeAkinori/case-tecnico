import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em andamento' | 'concluída';
  created_at: string;
  prazo: string;
}

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Helper para obter token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Token ${token}` } };
};

// Listar tarefas
export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/', getAuthHeader());
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Erro ao buscar tarefas');
    }
  }
);

// Criar tarefa
export const createTask = createAsyncThunk<Task, Omit<Task, 'id' | 'created_at'>>(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/tasks/', taskData, getAuthHeader());
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro do backend:', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue('Erro ao criar tarefa');
    }
  }
);

// Deletar tarefa
export const deleteTask = createAsyncThunk<number, number>(
  'tasks/delete',
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`, getAuthHeader());
      return taskId;
    } catch {
      return thunkAPI.rejectWithValue('Erro ao deletar tarefa');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buscar tarefas
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Criar tarefa
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // Deletar tarefa
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
