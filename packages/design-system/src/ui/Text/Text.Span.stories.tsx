import Text from './Text';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Text.Span',
  component: Text.Span,
  argTypes: {},
} as Meta<typeof Text.Span>;

const Template: StoryFn<typeof Text.Span> = args => <Text.Span {...args} />;
export const Default: StoryFn<typeof Text.Span> = Template.bind({});
Default.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const WithColor: StoryFn<typeof Text.Span> = Template.bind({});
WithColor.args = {
  children: '텍스트',
  color: 'lightGreen',
  fontSize: 1,
  weight: 'regular',
};

export const WithFontSize: StoryFn<typeof Text.Span> = Template.bind({});
WithFontSize.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 2,
  weight: 'regular',
};

export const WithWeight: StoryFn<typeof Text.Span> = Template.bind({});
WithWeight.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'bold',
};
