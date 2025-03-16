import HeaderLeftAndRight from './HeaderLeftAndRight';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'HeaderLeftAndRight',
  component: HeaderLeftAndRight,
  argTypes: {
    onClick: {action: 'onClick'},
  },
} as Meta<typeof HeaderLeftAndRight>;

const Template: StoryFn<typeof HeaderLeftAndRight> = args => {
  return <HeaderLeftAndRight {...args} />;
};

export const Default: StoryFn<typeof HeaderLeftAndRight> = Template.bind({});
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

export const CloseButton: StoryFn<typeof HeaderLeftAndRight> = Template.bind(
  {},
);
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
