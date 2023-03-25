import {
  ClientBookmarkCategoryItem,
  useGETCategoryListQuery,
} from '@/bookmarks/api/bookmark';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type DisClosureType = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';

const useBookmarkAddHandler = () => {
  // SERVER
  const { data, isLoading } = useGETCategoryListQuery({
    userId: '1',
  });
  const [categoryList, setCategoryList] = useState<
    ClientBookmarkCategoryItem[] | undefined
  >(data);
  useEffect(() => {
    setCategoryList(data);
  }, [data]);

  // INTERACTION
  // 1. URL 입력
  const [url, setUrl] = useState<string>('');
  const [isValidateUrl, setValidateUrl] = useState(false);

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // 1-1. URL VALIDATION
  const urlRegex = useMemo(
    () =>
      '^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$',
    [],
  );
  useEffect(() => {
    if (url.match(urlRegex)) {
      setTimeout(() => {
        setValidateUrl(true);
      }, 500);
    } else {
      setValidateUrl(false);
    }
  }, [url, setValidateUrl]);

  // 2. 카테고리 변경
  const onClickCategory = (id: string) => {
    setCategoryList(
      (prev) =>
        prev &&
        prev.map((item) =>
          item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
        ),
    );
    setCategoryList(
      (prev) =>
        prev &&
        prev.map((item) =>
          item.id === id ? { ...item, isSelected: !item.isSelected } : item,
        ),
    );
  };

  // 3. 공개 범위 선택
  const [selectedDisClosure, setDisClosure] =
    useState<DisClosureType>('PUBLIC');

  const onClickDisClosure = useCallback((type: DisClosureType) => {
    setDisClosure(type);
  }, []);

  return {
    url,
    onChangeUrl,
    isValidateUrl,
    categoryList,
    isLoading,
    onClickCategory,
    selectedDisClosure,
    onClickDisClosure,
  };
};
export default useBookmarkAddHandler;
