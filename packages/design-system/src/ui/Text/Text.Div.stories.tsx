import Text from './Text';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Text.Div',
  component: Text.Div,
  argTypes: {},
} as Meta<typeof Text.Div>;

const Template: StoryFn<typeof Text.Div> = args => <Text.Div {...args} />;

export const Default: StoryFn<typeof Text.Div> = Template.bind({});
Default.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const WithColor: StoryFn<typeof Text.Div> = Template.bind({});
WithColor.args = {
  children: '텍스트',
  color: 'lightGreen',
  fontSize: 1,
  weight: 'regular',
};

export const WithFontSize: StoryFn<typeof Text.Div> = Template.bind({});
WithFontSize.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 2,
  weight: 'regular',
};

export const WithWeight: StoryFn<typeof Text.Div> = Template.bind({});
WithWeight.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'bold',
};
