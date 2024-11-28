import TaskList from './TaskList';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TaskBoxData, TaskReducers, extraReducers } from '../lib/store';

export const MockedStore = ({ mockedState, children }) => {
  const mockedSlice = createSlice({
    name: 'taskBox',
    initialState: mockedState,
    reducers: TaskReducers,
    extraReducers,
  });

  const mockedStore = configureStore({
    reducer: {
      taskBox: mockedSlice.reducer,
    },
  });

  return <Provider store={mockedStore}>{children}</Provider>;
};

MockedStore.propTypes = {
  mockedState: PropTypes.object,
  children: PropTypes.node,
};

export default {
  title: 'TaskList',
  component: TaskList,
  tags: ['autodocs'],
  excludeStories: ['MockedStore'],
};

export const Default = {
  decorators: [
    (story) => <MockedStore mockedState={TaskBoxData}>{story()}</MockedStore>,
  ],
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...TaskBoxData.tasks,
        { id: '999', title: 'Pinned task', state: 'TASK_PINNED' },
      ];
      const mockedState = { ...TaskBoxData, tasks: pinnedTasks };

      return <MockedStore mockedState={mockedState}>{story()}</MockedStore>;
    },
  ],
};

export const Loading = {
  decorators: [
    (story) => {
      const mockedState = {
        ...TaskBoxData,
        status: 'loading',
      };

      return <MockedStore mockedState={mockedState}>{story()}</MockedStore>;
    },
  ],
};

export const Empty = {
  decorators: [
    (story) => {
      const mockedState = { ...TaskBoxData, tasks: [] };

      return <MockedStore mockedState={mockedState}>{story()}</MockedStore>;
    },
  ],
};
