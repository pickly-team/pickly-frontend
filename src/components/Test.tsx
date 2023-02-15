import CheckBox from '@/common-ui/CheckBox';

const Test = () => {
  const onChange = (checked: boolean) => {
    console.log(checked);
  };
  return <CheckBox onChange={onChange}>hi</CheckBox>;
};

export default Test;
