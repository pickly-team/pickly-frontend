import { ComponentMeta, ComponentStory } from '@storybook/react';
import Text from './Text';

export default {
  title: 'Text.Header',
  component: Text.Header,
  argTypes: {},
} as ComponentMeta<typeof Text.Header>;

const Template: ComponentStory<typeof Text.Header> = (args) => (
  <Text.Header {...args} />
);
export const Default = Template.bind({});
Default.args = {
  level: 'h1',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const Header2 = Template.bind({});
Header2.args = {
  level: 'h2',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const Header3 = Template.bind({});
Header3.args = {
  level: 'h3',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'regular',
};

export const WithColor = Template.bind({});
WithColor.args = {
  level: 'h1',
  children: '텍스트',
  color: 'lightGreen',
  fontSize: 1,
  weight: 'regular',
};

export const WithFontSize = Template.bind({});
WithFontSize.args = {
  level: 'h1',
  children: '텍스트',
  color: 'white',
  fontSize: 2,
  weight: 'regular',
};

export const WithWeight = Template.bind({});
WithWeight.args = {
  level: 'h1',
  children: '텍스트',
  color: 'white',
  fontSize: 1,
  weight: 'bold',
};
