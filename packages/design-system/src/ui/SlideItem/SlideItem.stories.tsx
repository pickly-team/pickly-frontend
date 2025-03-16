import {Text} from '../Text';
import SlideItem from './SlideItem';
import Icon from 'shared/assets/Icon';
import {theme} from 'shared/styles/theme';
import {css} from '@emotion/react';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'SlideItem',
  component: SlideItem,
  argTypes: {
    onClick: {action: 'onClick'},
  },
} as Meta<typeof SlideItem>;

const Template: StoryFn<typeof SlideItem> = args => {
  return (
    <div
      css={css`
        width: 80%;
        margin: 0 auto;
      `}
    >
      <SlideItem {...args} />
    </div>
  );
};

export const Default: StoryFn<typeof SlideItem> = Template.bind({});
Default.args = {
  main: (
    <div
      css={css`
        display: flex;
        align-items: center;
        background-color: ${theme.colors.grey800};
        height: 80px;
        width: 80%;
      `}
    >
      <Icon name='check' size='s' />
      <Text.Div css={css``}>이것은 슬라이드</Text.Div>
    </div>
  ),
  option: (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 80px;
      `}
    >
      <Icon name='trash' size='l' />
    </div>
  ),
};
