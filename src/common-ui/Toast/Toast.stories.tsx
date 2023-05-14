import { ComponentMeta, ComponentStory } from '@storybook/react';
import Toast from './Toast';
import ToastList from './ToastList';
import useToast from './hooks/useToast';
import Button from '../Button';
import Text from '../Text';

export default {
  title: 'Toast',
  component: Toast,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => {
  const { fireToast } = useToast();

  const onClick = () => {
    fireToast({ ...args });
  };

  return (
    <>
      <ToastList />
      <Button onClick={onClick}>
        <Text.Span>토스트 클릭</Text.Span>
      </Button>
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  message: '차단 되었습니다',
  mode: 'SUCCESS',
};

export const Delete = Template.bind({});
Delete.args = {
  message: '삭제 되었습니다',
  mode: 'DELETE',
};
