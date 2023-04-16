import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from '../Text';
import BottomSheet from './BottomSheet';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'BottomSheet',
  component: BottomSheet,
  argTypes: {
    onClose: { action: 'onClose' },
  },
  args: {
    open: false,
    onClose: () => console.log('닫기'),
  },
} as ComponentMeta<typeof BottomSheet>;

const Template: ComponentStory<typeof BottomSheet> = (args) => {
  const [bottomSheet, setBottomSheet] = useArgs();
  const handleOnClose = () => {
    setBottomSheet({ isOn: false });
    args.onClose && args.onClose();
  };
  return (
    <>
      <BottomSheet {...args} open={bottomSheet.open} onClose={handleOnClose}>
        <Text.Div>안녕하세요</Text.Div>
      </BottomSheet>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
  onClose: undefined,
};

export const MaxHeight50 = Template.bind({});
MaxHeight50.args = {
  open: true,
  maxHeight: 50,
  onClose: undefined,
};

export const WithOnClose = Template.bind({});
WithOnClose.args = {
  open: true,
  maxHeight: 90,
  onClose: action('onDismiss'),
};
