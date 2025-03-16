import Button from '../Button/Button';
import Select from './Select';
import {useState} from 'react';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    onChange: {action: 'onChange'},
  },
} as Meta<typeof Select>;

const OPTIONS = [
  {value: '1', label: '1 라벨'},
  {value: '2', label: '2 라벨'},
];

const Template: StoryFn<typeof Select> = args => {
  const {onChange: _, value: initialValue, ...restArgs} = args;
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <Select value={value} onChange={setValue} {...restArgs}>
        {OPTIONS.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </>
  );
};

export const Default: StoryFn<typeof Select> = Template.bind({});
Default.args = {
  value: undefined,
  trigger: <Button>버튼</Button>,
};

export const Search: StoryFn<typeof Select> = Template.bind({});
Search.args = {
  isSearchActive: true,
  trigger: <Button>버튼</Button>,
};

export const WithValue: StoryFn<typeof Select> = Template.bind({});
WithValue.args = {
  value: '1',
  trigger: <Button>버튼</Button>,
};
