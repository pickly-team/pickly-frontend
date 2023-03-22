import {
  ClientBookmarkCategoryItem,
  useGETCategoryListQuery,
} from '@/bookmarks/api/bookmark';
import { useCallback, useEffect, useState } from 'react';

export type DisClosureType = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';

const useBookmarkAddHandler = () => {
  // SEVER
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
  // 1. URL 체크
  const [url, setUrl] = useState<string>('');
  const [isValidateUrl, setValidateUrl] = useState(false);

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  console.log(isValidateUrl);
  useEffect(() => {
    if (url.length) {
      setTimeout(() => {
        setValidateUrl(true);
      }, 500);
    } else {
      setValidateUrl(false);
    }
  }, [url, isValidateUrl, setValidateUrl]);

  // 1. 카테고리 변경
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

  // 2. 공개 범위 선택
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
