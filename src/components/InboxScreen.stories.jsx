import { http, HttpResponse } from 'msw';
import InboxScreen from './InboxScreen';
import { Provider } from 'react-redux';
import store from '../lib/store';
import { TaskBoxData } from '../lib/store';
import { MockedStore } from './TaskList.stories';
import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@storybook/test';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  tags: ['autodocs'],
  excludeStories: ['MockedStore'],
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

export const Default = {
  decorators: [
    (story) => <MockedStore mockedState={TaskBoxData}>{story()}</MockedStore>,
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos', () => {
          return HttpResponse.json(TaskBoxData.tasks, { status: 200 });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check loading state
    await canvas.findByTestId('loading');

    // Wait for the loading indicator to be removed
    await waitForElementToBeRemoved(() => canvas.queryByTestId('loading'), {
      timeout: 2000,
    });

    // Perform click actions
    await waitFor(async () => {
      const pinTask1 = await canvas.getByLabelText('pinTask-1');
      const pinTask3 = await canvas.getByLabelText('pinTask-3');
      await fireEvent.click(pinTask1);
      await fireEvent.click(pinTask3);
    });
  },
};

export const Error = {
  decorators: [
    (story) => <MockedStore mockedState={TaskBoxData}>{story()}</MockedStore>,
  ],
  parameters: {
    docs: { disable: true },
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos', () => {
          return HttpResponse.json(null, { status: 403 });
        }),
      ],
    },
  },
};
