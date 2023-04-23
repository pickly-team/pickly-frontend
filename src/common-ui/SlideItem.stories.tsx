import { ComponentMeta, ComponentStory } from '@storybook/react';
import SlideItem from './SlideItem';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import Icon from './assets/Icon';
import Text from './Text';

export default {
  title: 'SlideItem',
  component: SlideItem,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof SlideItem>;

const Template: ComponentStory<typeof SlideItem> = (args) => {
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

export const Default = Template.bind({});
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
      <Icon name="check" size="s" />
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
      <Icon name="trash" size="l" />
    </div>
  ),
};
