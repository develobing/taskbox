import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

const defaultTasks = [
  { id: '1', title: 'Go to the beach', state: 'TASK_INBOX' },
  { id: '2', title: 'Eat lunch with Bill Gates', state: 'TASK_INBOX' },
  { id: '3', title: 'Learn to code', state: 'TASK_INBOX' },
  { id: '4', title: 'Meet with the team', state: 'TASK_INBOX' },
];

export const TaskBoxData = {
  tasks: defaultTasks,
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?userId=1'
    );

    const data = await response.json();
    const result = data.map((task) => ({
      id: task.id.toString(),
      title: task.title,
      state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
    }));

    return result;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
});

export const TaskReducers = {
  updateTaskState: (state, action) => {
    const { id, newTaskState } = action.payload;
    const taskIndex = state.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      state.tasks[taskIndex].state = newTaskState;
    }
  },

  pinTask: (state, action) => {
    const { id } = action.payload;
    const taskIndex = state.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      const task = state.tasks[taskIndex];
      const isPinned = task.state === 'TASK_PINNED';

      task.state = isPinned ? 'TASK_INBOX' : 'TASK_PINNED';
    }
  },

  archiveTask: (state, action) => {
    const { id } = action.payload;
    const taskIndex = state.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      const task = state.tasks[taskIndex];
      const isArchived = task.state === 'TASK_ARCHIVED';

      task.state = isArchived ? 'TASK_INBOX' : 'TASK_ARCHIVED';
    }
  },
};

export const extraReducers = (builder) => {
  builder
    .addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      state.tasks = [];
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = null;
      state.tasks = action.payload;
    })
    .addCase(fetchTasks.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Something went wrong';
      state.tasks = [];
    });
};

export const TasksSlice = createSlice({
  name: 'taskBox',
  initialState: TaskBoxData,
  reducers: TaskReducers,
  extraReducers,
});

export const { updateTaskState, pinTask, archiveTask } = TasksSlice.actions;

const store = configureStore({
  reducer: { taskBox: TasksSlice.reducer },
});

export default store;
