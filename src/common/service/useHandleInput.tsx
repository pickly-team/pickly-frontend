import { ChangeEvent, useState } from 'react';

interface HandleInput {
  input: string;
}

const useHandleInput = ({
  input: prevInput,
}: HandleInput): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [input, setInput] = useState(prevInput);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, onChangeInput];
};

export default useHandleInput;
