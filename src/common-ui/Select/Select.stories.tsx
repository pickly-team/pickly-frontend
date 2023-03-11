import Select from '@/common-ui/Select/Select';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof Select>;

const OPTIONS = [
  { value: '1', label: '1 라벨' },
  { value: '2', label: '2 라벨' },
];

const Template: ComponentStory<typeof Select> = (args) => {
  const { onChange: _, value: initialValue, ...restArgs } = args;
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <Select value={value} onChange={setValue} {...restArgs}>
        {OPTIONS.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: undefined,
};

export const Search = Template.bind({});
Search.args = {
  isSearchActive: true,
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: '1',
};
