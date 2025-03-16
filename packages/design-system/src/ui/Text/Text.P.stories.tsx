import Text from './Text';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Text.P',
  component: Text.P,
  argTypes: {},
} as Meta<typeof Text.P>;

const Template: StoryFn<typeof Text.P> = args => <Text.P {...args} />;
export const Default: StoryFn<typeof Text.P> = Template.bind({});
Default.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const WithColor: StoryFn<typeof Text.P> = Template.bind({});
WithColor.args = {
  children: '텍스트',
  color: 'lightGreen',
  fontSize: 1,
  weight: 'regular',
};

export const WithFontSize: StoryFn<typeof Text.P> = Template.bind({});
WithFontSize.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 2,
  weight: 'regular',
};

export const WithWeight: StoryFn<typeof Text.P> = Template.bind({});
WithWeight.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'bold',
};
