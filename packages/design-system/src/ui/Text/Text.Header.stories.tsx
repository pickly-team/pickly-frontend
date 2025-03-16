import Text from './Text';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Text.Header',
  component: Text.Header,
  argTypes: {},
} as Meta<typeof Text.Header>;

const Template: StoryFn<typeof Text.Header> = args => <Text.Header {...args} />;
export const Default: StoryFn<typeof Text.Header> = Template.bind({});
Default.args = {
  level: 'h1',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const Header2: StoryFn<typeof Text.Header> = Template.bind({});
Header2.args = {
  level: 'h2',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const Header3: StoryFn<typeof Text.Header> = Template.bind({});
Header3.args = {
  level: 'h3',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const WithColor: StoryFn<typeof Text.Header> = Template.bind({});
WithColor.args = {
  level: 'h1',
  children: '텍스트',
  color: 'lightGreen',
  fontSize: 1,
  weight: 'regular',
};

export const WithFontSize: StoryFn<typeof Text.Header> = Template.bind({});
WithFontSize.args = {
  level: 'h1',
  children: '텍스트',
  color: 'white',
  fontSize: 2,
  weight: 'regular',
};

export const WithWeight: StoryFn<typeof Text.Header> = Template.bind({});
WithWeight.args = {
  level: 'h1',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'bold',
};
