import { ComponentMeta, ComponentStory } from '@storybook/react';
import Text from './Text';

export default {
  title: 'Text.P',
  component: Text.P,
  argTypes: {},
} as ComponentMeta<typeof Text.P>;

const Template: ComponentStory<typeof Text.P> = (args) => <Text.P {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const WithColor = Template.bind({});
WithColor.args = {
  children: '텍스트',
  color: 'lightGreen',
  fontSize: 1,
  weight: 'regular',
};

export const WithFontSize = Template.bind({});
WithFontSize.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 2,
  weight: 'regular',
};

export const WithWeight = Template.bind({});
WithWeight.args = {
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'bold',
};
