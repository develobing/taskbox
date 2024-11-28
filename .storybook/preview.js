import '../src/index.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [mswDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
