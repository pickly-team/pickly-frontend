import { useState } from 'react';

const useReadList = () => {
  const [isReadMode, setReadMode] = useState(false);

  const onClickReadMode = () => {
    setReadMode(!isReadMode);
  };

  return {
    isReadMode,
    onClickReadMode,
  };
};

export default useReadList;
