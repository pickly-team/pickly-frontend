import { useGETBookMarkListQuery } from '@/bookmarks/api/bookmark';
import useBookmarkStore from '@/store/bookmark';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BookmarkListProps {
  readByUser: boolean | null;
  memberId: number;
  categoryId?: number | null;
}

const useBookmarkList = ({
  readByUser,
  memberId,
  categoryId,
}: BookmarkListProps) => {
  const navigate = useLocation();
  // SERVER
  // 1. 북마크 리스트 조회
  const {
    data: bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    remove,
  } = useGETBookMarkListQuery({
    readByUser,
    categoryId,
    memberId,
  });

  useEffect(() => {
    if (categoryId) remove();
  }, [categoryId]);

  const { initializeUrlAndTitle } = useBookmarkStore();

  useEffect(() => {
    initializeUrlAndTitle();
    remove();
  }, [navigate]);

  return {
    bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useBookmarkList;
