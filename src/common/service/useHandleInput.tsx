import { ChangeEvent, useState } from 'react';

const useHandleInput = (): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (input: string) => void,
] => {
  const [input, setInput] = useState('');

  const onChangeElementInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onChangeInput = (input: string) => {
    setInput(input);
  };

  return [input, onChangeElementInput, onChangeInput];
};

export default useHandleInput;
