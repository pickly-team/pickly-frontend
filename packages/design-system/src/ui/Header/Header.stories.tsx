import Header from './Header';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    onClick: {action: 'onClick'},
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = args => {
  return <Header {...args} />;
};

export const Default: StoryFn<typeof Header> = Template.bind({});
Default.args = {
  showBackButton: true,
  title: '헤더 타이틀',
  rightButton: <div>오른쪽 버튼</div>,
};

export const WithoutBackButton: StoryFn<typeof Header> = Template.bind({});
WithoutBackButton.args = {
  showBackButton: false,
  title: '헤더 타이틀',
  rightButton: <div>오른쪽 버튼</div>,
};
