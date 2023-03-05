import main, { ClientBookMarkItem } from '@/apis/bookmark';
import useGetHandler from '@/hooks/useGetHandler';
import { useEffect, useState } from 'react';

const useBookMarkHandler = () => {
  const [isRead, setRead] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [category, setCategory] = useState('전체');
  const [clientBookMarkList, setClientBookMarkList] = useState<
    ClientBookMarkItem[]
  >([]);

  const [deleteBookMarkList, setDeleteBookMarkList] = useState<string[]>([]);

  const { data: bookMarkList, isLoading } = useGetHandler(async () =>
    main.GETBookMarkList.MockAPI(),
  );

  useEffect(() => {
    if (bookMarkList && bookMarkList.bookmark_list) {
      setClientBookMarkList(bookMarkList.bookmark_list);
    }
  }, [bookMarkList?.bookmark_list]);

  const onChangeRead = () => {
    if (isEdit) return;
    setRead(!isRead);
    if (bookMarkList && bookMarkList.bookmark_list) {
      setClientBookMarkList(
        bookMarkList.bookmark_list.filter((item) => item.isRead !== isRead),
      );
    }
  };

  const onChangeEdit = () => {
    setEdit(!isEdit);
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

  console.log(deleteBookMarkList);

  return {
    isRead,
    category,
    isEdit,
    bookMarkList: clientBookMarkList,
    isLoading,
    onChangeRead,
    onChangeEdit,
    onClickBookMarkItem,
  };
};

export default useBookMarkHandler;
