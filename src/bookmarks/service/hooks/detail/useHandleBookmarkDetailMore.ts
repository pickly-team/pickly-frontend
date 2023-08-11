import {
  useDELETEBookmarkQuery,
  useGETBookmarkDetailQuery,
} from '@/bookmarks/api/bookmark';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { navigatePath } from '@/constants/navigatePath';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const useHandleBookmarkDetailMore = () => {
  const router = useNavigate();
  const { memberId } = useAuthStore();
  const { id } = useParams() as { id: string };
  const { initializeUrlAndTitle } = useBookmarkStore();
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
    initializeUrlAndTitle();
  };
  // 3. 북마크 수정
  const onClickEditBookmark = () => {
    router(navigatePath.BOOKMARK_EDIT.replace(':id', id));
  };

  // 4. 북마크 신고
  const { data: bookmarkDetail } = useGETBookmarkDetailQuery({
    bookmarkId: id,
    memberId: memberId ?? 0,
  });

  const [isMyBookmark, setIsMyBookmark] = useState(true);

  useEffect(() => {
    setIsMyBookmark(memberId === bookmarkDetail?.memberId);
  }, [memberId, bookmarkDetail?.memberId]);

  const onClickReportBookmark = () => {
    router(navigatePath.BOOKMARK_REPORT.replace(':id', id));
  };

  return {
    isMyBookmark,
    deleteBookmarkBS,
    openDeleteBookmarkBS,
    closeDeleteBookmarkBS,
    onClickDeleteBookmark,
    onClickBackCallback,
    onClickEditBookmark,
    onClickReportBookmark,
  };
};

export default useHandleBookmarkDetailMore;
