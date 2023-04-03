import {
  ClientBookMarkItem,
  useGETBookMarkListQuery,
} from '@/bookmarks/api/bookmark';
import { useEffect, useState } from 'react';

export type CategoryType = {
  value: string;
  label: string;
};

const useBookMarkLikeItemHandler = () => {
  // SEVER
  // 1. 북마크 리스트 조회
  const { data: bookMarkList, isLoading } = useGETBookMarkListQuery({
    userId: '1',
  });

  const [clientBookMarkList, setClientBookMarkList] = useState<
    ClientBookMarkItem[]
  >([]);

  useEffect(() => {
    if (bookMarkList && bookMarkList.bookmark_list) {
      setClientBookMarkList(bookMarkList.bookmark_list);
    }
  }, [bookMarkList?.bookmark_list]);

  return {
    bookMarkList: clientBookMarkList,
    isLoading,
  };
};

export default useBookMarkLikeItemHandler;
