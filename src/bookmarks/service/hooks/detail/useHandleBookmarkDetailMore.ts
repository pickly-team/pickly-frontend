import {
  ClientBookmarkDetail,
  GET_BOOKMARK_DETAIL_KEY,
  refetchAllBookmarkQuery,
  useDELETEBookmarkQuery,
} from '@/bookmarks/api/bookmark';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { useFlow } from '@/common-ui/stackflow';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import { useQueryClient } from '@tanstack/react-query';

interface HandleBookmarkDetailMore {
  id: string;
}

const useHandleBookmarkDetailMore = ({ id }: HandleBookmarkDetailMore) => {
  const { pop, push } = useFlow();
  const { memberId } = useAuthStore();

  const queryClient = useQueryClient();
  const { setTitle, setUrl } = useBookmarkStore();
  // USER INTERACTION
  // 1. 북마크 삭제
  const { mutate: deleteBookmark } = useDELETEBookmarkQuery({
    memberId: memberId ?? 0,
    bookmarkId: id,
  });
  const {
    isOpen: deleteBookmarkBS,
    open: openDeleteBookmarkBS,
    close: closeDeleteBookmarkBS,
  } = useBottomSheet();
  const onClickDeleteBookmark = () => {
    deleteBookmark({ bookmarkId: Number(id) });
    closeDeleteBookmarkBS();
    pop();
  };
  // 2. 뒤로가기
  const onClickBackCallback = () => {
    refetchAllBookmarkQuery({
      queryClient,
      memberId: memberId ?? 0,
      bookmarkId: id,
    });
    setTitle('');
    setUrl('');
  };
  // 3. 북마크 수정
  const {
    isOpen: editBookmarkBS,
    close: closeEditBookmarkBS,
    open: openEditBookmarkBS,
  } = useBottomSheet();
  const onClickEditBookmark = () => {
    openEditBookmarkBS();
  };

  // 4. 북마크 신고
  const bookmarkDetail = queryClient.getQueryData<ClientBookmarkDetail>(
    GET_BOOKMARK_DETAIL_KEY({ bookmarkId: id, memberId }),
  );
  const writtenId = bookmarkDetail?.memberId ?? 0;
  const isMyBookmark = memberId === writtenId;
  const onClickReportBookmark = () => {
    push('ReportPage', { mode: 'BOOKMARK', id });
  };

  return {
    editBookmarkBS,
    isMyBookmark,
    deleteBookmarkBS,
    openDeleteBookmarkBS,
    closeDeleteBookmarkBS,
    onClickDeleteBookmark,
    onClickBackCallback,
    closeEditBookmarkBS,
    onClickEditBookmark,
    onClickReportBookmark,
  };
};

export default useHandleBookmarkDetailMore;
