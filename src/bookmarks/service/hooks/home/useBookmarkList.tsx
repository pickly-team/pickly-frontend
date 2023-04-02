import { ClientBookMarkItem } from '@/bookmarks/api/bookmark';
import {
  GET_BOOKMARK_LIST,
  useGETBookMarkListQuery,
} from '@/bookmarks/api/bookmark';
import { useQueryClient } from '@tanstack/react-query';

const useBookmarkList = () => {
  // SERVER
  // TODO : firebase auth 연동 후 userId 변경
  const USER_ID = '1';
  // 1. 북마크 리스트 조회
  const { data: bookMarkList, isLoading } = useGETBookMarkListQuery({
    userId: USER_ID,
  });

  const queryClient = useQueryClient();
  const onChangeBookmarkList = (bookmarkList: ClientBookMarkItem[]) => {
    queryClient.setQueryData(GET_BOOKMARK_LIST(USER_ID), bookmarkList);
  };

  return { bookMarkList, isLoading, onChangeBookmarkList };
};

export default useBookmarkList;
