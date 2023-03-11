import {
  ClientBookMarkItem,
  useGETBookMarkListQuery,
} from '@/bookmarks/api/bookmark';
import { useEffect, useState } from 'react';

export type CategoryType = {
  value: string;
  label: string;
};

const useBookMarkHandler = () => {
  // SEVER
  // 1. 북마크 리스트 조회
  const { data: bookMarkList, isLoading } = useGETBookMarkListQuery({
    userId: '1',
  });

  // INTERACTION
  // 1. 카테고리 변경
  const categoryOptions: CategoryType[] = [
    { value: '백엔드', label: '백엔드' },
    { value: '프론트엔드', label: '프론트엔드' },
  ];
  const [category, setCategory] = useState('');

  // 2. 읽음/읽지않음 변경
  const [isRead, setRead] = useState(false);

  // 3. 편집모드 변경
  const [isEdit, setEdit] = useState(false);

  const onChangeRead = () => {
    if (isEdit) return;
    setRead(!isRead);
    if (bookMarkList && bookMarkList.bookmark_list) {
      setClientBookMarkList(
        bookMarkList.bookmark_list.filter((item) => item.isRead !== isRead),
      );
    }
  };

  // 3-1 북마크 삭제
  const [isDeleteBSOpen, setDeleteBS] = useState(false);
  const [clientBookMarkList, setClientBookMarkList] = useState<
    ClientBookMarkItem[]
  >([]);
  const [deleteBookMarkList, setDeleteBookMarkList] = useState<string[]>([]);

  useEffect(() => {
    if (bookMarkList && bookMarkList.bookmark_list) {
      setClientBookMarkList(bookMarkList.bookmark_list);
    }
  }, [bookMarkList?.bookmark_list]);

  const onChangeEdit = () => {
    if (isEdit && deleteBookMarkList.length) {
      setDeleteBS(true);
      return;
    }
    setEdit(!isEdit);
  };

  const onCloseDeleteBS = () => {
    setDeleteBS(false);
  };

  const onClickBookMarkItem = (bookmarkId: string) => {
    if (deleteBookMarkList.includes(bookmarkId)) {
      setDeleteBookMarkList(
        deleteBookMarkList.filter((id) => id !== bookmarkId),
      );
    } else {
      setDeleteBookMarkList([...deleteBookMarkList, bookmarkId]);
    }
  };

  return {
    isRead,
    isEdit,
    bookMarkList: clientBookMarkList,
    isLoading,
    onChangeRead,
    onChangeEdit,
    onClickBookMarkItem,
    isDeleteBSOpen,
    onCloseDeleteBS,
    categoryOptions,
    category,
    setCategory,
  };
};

export default useBookMarkHandler;
