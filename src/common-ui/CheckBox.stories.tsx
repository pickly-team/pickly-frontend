import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckBox from './CheckBox';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'CheckBox',
  component: CheckBox,
  argTypes: {
    isChecked: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
  args: {
    isChecked: false,
    onChange: () => console.log('체크박스 클릭'),
  },
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => {
  const [isChecked, setIsChecked] = useArgs();

  const handleChange = () => {
    setIsChecked({ isChecked: !isChecked.isToggle });
    args.onChange && args.onChange(!isChecked.isToggle);
    args.isChecked = !isChecked.isToggle;
  };

  return (
    <CheckBox {...args} isChecked={isChecked.isChecked} onChange={handleChange}>
      이것은 체크박스 입니다
    </CheckBox>
  );
};

export const Default = Template.bind({});
Default.args = {
  isChecked: false,
  onChange: () => console.log('체크박스 클릭'),
};

export const Checked = Template.bind({});
Checked.args = {
  isChecked: true,
  onChange: () => console.log('체크박스 클릭'),
};
