import useDebounce from '@/common/service/hooks/useDebounce';
import useSearchStore from '@/store/search';
import { ChangeEvent, useEffect } from 'react';

const useSearchUser = () => {
  const { setKeyword: setStoreSearchKeyword, keyword: storeKeyword } =
    useSearchStore();
  const debounceKeyword = useDebounce(storeKeyword, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStoreSearchKeyword(value);
  };

  useEffect(() => {
    setStoreSearchKeyword(debounceKeyword);
  }, [debounceKeyword, setStoreSearchKeyword]);

  const initializeKeyword = () => {
    setStoreSearchKeyword('');
  };

  return {
    keyword: storeKeyword,
    debounceKeyword,
    handleChange,
    initializeKeyword,
  };
};

export default useSearchUser;
