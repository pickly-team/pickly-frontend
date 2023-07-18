import {
  ClientBookmarkDetail,
  GET_BOOKMARK_DETAIL_KEY,
  refetchAllBookmarkQuery,
  useDELETEBookmarkQuery,
  usePOSTBookmarkReportMutation,
} from '@/bookmarks/api/bookmark';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { navigatePath } from '@/constants/navigatePath';
import useAuthStore from '@/store/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const useHandleBookmarkDetailMore = () => {
  const router = useNavigate();
  const { memberId } = useAuthStore();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
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
    router('/');
  };
  // 2. 뒤로가기
  const onClickBackCallback = () => {
    refetchAllBookmarkQuery({
      queryClient,
      memberId: memberId ?? 0,
      bookmarkId: id,
    });
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
    GET_BOOKMARK_DETAIL_KEY({ bookmarkId: id }),
  );
  const writtenId = bookmarkDetail?.memberId ?? 0;
  const isMyBookmark = memberId === writtenId;
  const { mutate: reportBookmark } = usePOSTBookmarkReportMutation({
    reporterId: memberId,
  });
  const onClickReportBookmark = () => {
    router(navigatePath.REPORT.replace(':id', id));
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
