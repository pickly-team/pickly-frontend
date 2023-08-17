import { useGETBookMarkListQuery } from '@/bookmarks/api/bookmark';
import useBookmarkStore from '@/store/bookmark';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { READ_OPTION } from './useReadList';

interface BookmarkListProps {
  readByUser: READ_OPTION;
  memberId: number;
  categoryId: number | null;
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
    refetch,
  } = useGETBookMarkListQuery({
    readByUser,
    categoryId,
    memberId,
  });

  useEffect(() => {
    if (categoryId) refetch();
  }, [categoryId]);

  const { initializeUrlAndTitle } = useBookmarkStore();

  useEffect(() => {
    initializeUrlAndTitle();
    refetch();
  }, [navigate]);

  return {
    bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useBookmarkList;
