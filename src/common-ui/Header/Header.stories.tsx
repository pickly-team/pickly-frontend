import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  showBackButton: true,
  title: '헤더 타이틀',
  rightButton: <div>오른쪽 버튼</div>,
};

export const WithoutBackButton = Template.bind({});
WithoutBackButton.args = {
  showBackButton: false,
  title: '헤더 타이틀',
  rightButton: <div>오른쪽 버튼</div>,
};
