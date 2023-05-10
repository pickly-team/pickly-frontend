import { ComponentMeta, ComponentStory } from '@storybook/react';
import HeaderLeftAndRight from './HeaderLeftAndRight';

export default {
  title: 'HeaderLeftAndRight',
  component: HeaderLeftAndRight,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof HeaderLeftAndRight>;

const Template: ComponentStory<typeof HeaderLeftAndRight> = (args) => {
  return <HeaderLeftAndRight {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  leftButton: {
    type: 'back',
    onClick: () => console.log('뒤로 가기 클릭'),
  },
  middleText: '헤더 타이틀',
  rightButton: {
    text: '저장',
    onClick: () => console.log('저장 클릭'),
  },
};

export const CloseButton = Template.bind({});
CloseButton.args = {
  leftButton: {
    type: 'close',
    onClick: () => console.log('닫기 클릭'),
  },
  middleText: '헤더 타이틀',
  rightButton: {
    text: '저장',
    onClick: () => console.log('저장 클릭'),
  },
};
