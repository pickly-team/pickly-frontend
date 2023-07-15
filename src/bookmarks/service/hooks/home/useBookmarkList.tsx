import { useGETBookMarkListQuery } from '@/bookmarks/api/bookmark';
import { useEffect } from 'react';

interface BookmarkListProps {
  readByUser: boolean;
  memberId: number;
  categoryId?: number;
}

const useBookmarkList = ({
  readByUser,
  memberId,
  categoryId,
}: BookmarkListProps) => {
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
    pageRequest: {
      pageSize: 15,
    },
  });

  useEffect(() => {
    if (categoryId) refetch();
  }, [categoryId]);

  return {
    bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useBookmarkList;
