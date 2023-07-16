import useDebounce from '@/common/service/hooks/useDebounce';
import { ChangeEvent, useState } from 'react';

const useSearchUser = () => {
  const [keyword, setKeyword] = useState('');
  const debounceKeyword = useDebounce(keyword, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  return {
    keyword,
    debounceKeyword,
    handleChange,
  };
};

export default useSearchUser;
