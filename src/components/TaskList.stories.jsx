import TaskList from './TaskList';

export default {
  title: 'TaskList',
  component: TaskList,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    loading: false,
    tasks: [
      {
        id: '1',
        title: 'Task 1',
        state: 'TASK_INBOX',
      },
    ],
  },
};

export const WithPinnedTasks = {
  args: {
    tasks: [
      {
        id: '1',
        title: 'Task 1',
        state: 'TASK_INBOX',
      },
      {
        id: '2',
        title: 'Task 2',
        state: 'TASK_ARCHIVED',
      },
      {
        id: '3',
        title: 'Task 3',
        state: 'TASK_PINNED',
      },
    ],
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

export const Empty = {
  args: {
    tasks: [],
  },
};
