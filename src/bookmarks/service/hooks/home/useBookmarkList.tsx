import { useGETBookMarkListQuery } from '@/bookmarks/api/bookmark';
import { useEffect } from 'react';

interface BookmarkListProps {
  readByUser: boolean;
  categoryId?: number;
}

const useBookmarkList = ({ readByUser, categoryId }: BookmarkListProps) => {
  // SERVER
  // TODO : firebase auth 연동 후 userId 변경
  const USER_ID = 1;
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
    memberId: USER_ID,
    pageRequest: {
      pageSize: 15,
    },
  });

  useEffect(() => {
    refetch();
  }, [categoryId]);

  return {
    bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useBookmarkList;
