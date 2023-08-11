import { useGETBookMarkListQuery } from '@/bookmarks/api/bookmark';
import useBookmarkStore from '@/store/bookmark';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
    refetch();
    initializeUrlAndTitle();
  }, [navigate]);

  return {
    bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useBookmarkList;
