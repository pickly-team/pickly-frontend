import { ComponentMeta, ComponentStory } from '@storybook/react';
import BottomNavigation from './BottomNavigation';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'BottomNavigation',
  component: BottomNavigation,
  argTypes: {},
} as ComponentMeta<typeof BottomNavigation>;

const Template: ComponentStory<typeof BottomNavigation> = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BottomNavigation />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
