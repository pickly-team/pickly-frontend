import { useGETBookMarkListQuery } from '@/bookmarks/api/bookmark';

interface BookmarkListProps {
  readByUser: boolean;
}

const useBookmarkList = ({ readByUser }: BookmarkListProps) => {
  // SERVER
  // TODO : firebase auth 연동 후 userId 변경
  const USER_ID = 1;
  // 1. 북마크 리스트 조회
  const {
    data: bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETBookMarkListQuery({
    readByUser,
    memberId: USER_ID,
    pageRequest: {
      pageSize: 15,
    },
  });

  return {
    bookMarkList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useBookmarkList;
