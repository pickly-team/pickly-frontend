import Input from './Input';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
export const Default = Template.bind({});
Default.args = {
  placeholder: '이름을 입력해주세요',
  backgroundColor: 'grey900',
  color: 'white',
  focusTheme: {
    color: 'white',
    backgroundColor: 'grey800',
  },
  onChange: () => console.log('입력'),
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  placeholder: '이름을 입력해주세요',
  onChange: () => console.log('입력'),
  border: { borderRadius: 1, borderWidth: 1, color: 'lightGreen' },
};
