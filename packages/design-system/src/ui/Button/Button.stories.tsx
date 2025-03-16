import Button from './Button';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: {action: 'onClick'},
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => <Button {...args} />;
export const Default: StoryFn<typeof Button> = Template.bind({});
Default.args = {
  children: '버튼',
};

export const Big: StoryFn<typeof Button> = Template.bind({});
Big.args = {
  children: '버튼',
  width: 100,
};

export const Medium: StoryFn<typeof Button> = Template.bind({});
Medium.args = {
  children: '버튼',
  width: 50,
};

export const Small: StoryFn<typeof Button> = Template.bind({});
Small.args = {
  children: '버튼',
  width: 30,
};

export const Disabled: StoryFn<typeof Button> = Template.bind({});
Disabled.args = {
  children: '버튼',
  disabled: true,
};
