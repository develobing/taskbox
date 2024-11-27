import { configureStore, createSlice } from '@reduxjs/toolkit';

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

export const TasksSlice = createSlice({
  name: 'taskBox',
  initialState: TaskBoxData,
  reducers: TaskReducers,
});

export const { updateTaskState, pinTask, archiveTask } = TasksSlice.actions;

const store = configureStore({
  reducer: { taskBox: TasksSlice.reducer },
});

export default store;
