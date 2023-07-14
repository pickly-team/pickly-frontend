/* eslint-disable @typescript-eslint/no-empty-function */
import Header from '@/common-ui/Header/Header';
import CommentUploadInput from '@/comment/ui/bookmark/CommentUploadInput';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import BookmarkArticle from '@/bookmarks/ui/BookmarkArticle';
import { Suspense } from 'react';
import CommentList from '@/comment/ui/bookmark/CommentList';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import {
  refetchAllBookmarkQuery,
  useDELETEBookmarkQuery,
} from '@/bookmarks/api/bookmark';
import BSConfirmation from '@/common/ui/BSConfirmation';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import useAuthStore from '@/store/auth';
import { useQueryClient } from '@tanstack/react-query';

const BookMarkDetailPage = () => {
  // FIRST RENDER
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

  const onClickBackCallback = () => {
    refetchAllBookmarkQuery({
      queryClient,
      memberId: memberId ?? 0,
      bookmarkId: id,
    });
  };

  return (
    <>
      <Header
        rightButton={
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet>
              <TriggerBottomSheet.Item>수정하기</TriggerBottomSheet.Item>
              <TriggerBottomSheet.Item onClick={openDeleteBookmarkBS}>
                삭제하기
              </TriggerBottomSheet.Item>
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        }
        showBackButton
        backButtonCallback={onClickBackCallback}
      />
      <Body>
        {/** 북마크 정보 영역 */}
        <Suspense>
          <BookmarkArticle />
        </Suspense>
        {/** 댓글 리스트 영역 */}
        <Suspense>
          <CommentList />
        </Suspense>
      </Body>
      {/** 댓글 입력 영역 */}
      <CommentUploadInputBottomBar>
        <CommentUploadInput />
      </CommentUploadInputBottomBar>
      {/** 북마크 삭제 BS */}
      <BSConfirmation
        open={deleteBookmarkBS}
        onCancel={closeDeleteBookmarkBS}
        onClose={closeDeleteBookmarkBS}
        title="정말로 삭제하시겠습니까?"
        description="삭제된 북마크는 복구할 수 없습니다."
        onConfirm={onClickDeleteBookmark}
      />
    </>
  );
};

export default BookMarkDetailPage;

const Body = styled.div`
  padding: ${getRem(0, 20)};
`;

const CommentUploadInputBottomBar = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
`;
