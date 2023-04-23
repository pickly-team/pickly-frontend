import { useState } from 'react';

const useInputUrl = () => {
  const [url, setUrl] = useState<string>('');
  const onChangeUrl = (url: string) => {
    setUrl(url);
  };

  return { url, onChangeUrl };
};

export default useInputUrl;
