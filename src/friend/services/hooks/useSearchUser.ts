import useDebounce from '@/common/service/hooks/useDebounce';
import useSearchStore from '@/store/search';
import { ChangeEvent, useEffect, useState } from 'react';

const useSearchUser = () => {
  const { setKeyword: setStoreSearchKeyword } = useSearchStore();
  const [keyword, setKeyword] = useState('');
  const debounceKeyword = useDebounce(keyword, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  useEffect(() => {
    setStoreSearchKeyword(debounceKeyword);
  }, [debounceKeyword, setStoreSearchKeyword]);

  return {
    keyword,
    debounceKeyword,
    handleChange,
  };
};

export default useSearchUser;
