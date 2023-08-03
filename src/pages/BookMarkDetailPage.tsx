/* eslint-disable @typescript-eslint/no-empty-function */
import Header from '@/common-ui/Header/Header';
import CommentUploadInput from '@/comment/ui/bookmark/CommentUploadInput';
import styled from '@emotion/styled';
import BookmarkArticle from '@/bookmarks/ui/BookmarkArticle';
import { Suspense } from 'react';
import CommentList from '@/comment/ui/bookmark/CommentList';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import BSConfirmation from '@/common/ui/BSConfirmation';
import useHandleBookmarkDetailMore from '@/bookmarks/service/hooks/detail/useHandleBookmarkDetailMore';
import SkeletonBookmarkDetail from '@/bookmarks/ui/Detail/SkeletonBookmarkDetail';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import SkeletonCommentList from '@/comment/ui/bookmark/SkeletonCommentList';

const BookMarkDetailPage = () => {
  const {
    deleteBookmarkBS,
    editBookmarkBS,
    isMyBookmark,
    closeDeleteBookmarkBS,
    closeEditBookmarkBS,
    onClickBackCallback,
    onClickDeleteBookmark,
    onClickEditBookmark,
    openDeleteBookmarkBS,
    onClickReportBookmark,
  } = useHandleBookmarkDetailMore();

  return (
    <>
      <Header
        rightButton={
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet>
              {!!isMyBookmark && (
                <>
                  <TriggerBottomSheet.Item onClick={onClickEditBookmark}>
                    수정하기
                  </TriggerBottomSheet.Item>
                  <TriggerBottomSheet.Item onClick={openDeleteBookmarkBS}>
                    삭제하기
                  </TriggerBottomSheet.Item>
                </>
              )}
              {!isMyBookmark && (
                <TriggerBottomSheet.Item onClick={onClickReportBookmark}>
                  신고하기
                </TriggerBottomSheet.Item>
              )}
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        }
        showBackButton
        backButtonCallback={onClickBackCallback}
      />
      <Body>
        {/** 북마크 정보 영역 */}
        <Suspense
          fallback={
            <SkeletonWrapper>
              <SkeletonBookmarkDetail />
            </SkeletonWrapper>
          }
        >
          <BookmarkArticle
            editBookmarkBS={editBookmarkBS}
            openEditBookmarkBS={onClickEditBookmark}
            closeEditBookmarkBS={closeEditBookmarkBS}
          />
        </Suspense>
        {/** 댓글 리스트 영역 */}
        <Suspense
          fallback={
            <SkeletonWrapper>
              <SkeletonCommentList />
            </SkeletonWrapper>
          }
        >
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

const Body = styled.div``;

const CommentUploadInputBottomBar = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
`;
