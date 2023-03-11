import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from '../Text';
import BottomSheet from './BottomSheet';
import { action } from '@storybook/addon-actions';

export default {
  title: 'BottomSheet',
  component: BottomSheet,
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as ComponentMeta<typeof BottomSheet>;

const Template: ComponentStory<typeof BottomSheet> = (args) => {
  return (
    <>
      <BottomSheet {...args}>
        <Text.Div>안녕하세요</Text.Div>
      </BottomSheet>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  onClose: undefined,
};

export const MaxHeight50 = Template.bind({});
MaxHeight50.args = {
  maxHeight: 50,
  onClose: undefined,
};

export const WithOnClose = Template.bind({});
WithOnClose.args = {
  maxHeight: 90,
  onClose: action('onDismiss'),
};
