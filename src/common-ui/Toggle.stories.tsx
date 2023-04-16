import { ComponentMeta, ComponentStory } from '@storybook/react';
import Toggle from './Toggle';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    isToggle: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
  args: {
    isToggle: false,
    onChange: () => console.log('토글 클릭'),
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => {
  const [isToggle, setIsToggle] = useArgs();

  const setToggleFalse = () => {
    setIsToggle({ isToggle: false });
    args.setToggleFalse && args.setToggleFalse();
    args.isToggle = false;
  };

  const setToggleTrue = () => {
    setIsToggle({ isToggle: true });
    args.setToggleTrue && args.setToggleTrue();
    args.isToggle = true;
  };

  return (
    <Toggle
      {...args}
      isToggle={isToggle.isToggle}
      setToggleTrue={setToggleTrue}
      setToggleFalse={setToggleFalse}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  offText: 'OFF',
  onText: 'ON',
  isToggle: false,
  setToggleFalse: () => console.log('토글 OFF'),
  setToggleTrue: () => console.log('토글 ON'),
};

export const ToggleOn = Template.bind({});
ToggleOn.args = {
  offText: 'OFF',
  onText: 'ON',
  isToggle: true,
  setToggleFalse: () => console.log('토글 OFF'),
  setToggleTrue: () => console.log('토글 ON'),
};
