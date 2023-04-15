import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: '버튼',
};

export const Big = Template.bind({});
Big.args = {
  children: '버튼',
  width: 100,
};

export const Medium = Template.bind({});
Medium.args = {
  children: '버튼',
  width: 50,
};

export const Small = Template.bind({});
Small.args = {
  children: '버튼',
  width: 30,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: '버튼',
  disabled: true,
};
