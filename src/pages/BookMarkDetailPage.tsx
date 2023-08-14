/* eslint-disable @typescript-eslint/no-empty-function */
import CommentUploadInput from '@/comment/ui/bookmark/CommentUploadInput';
import styled from '@emotion/styled';
import BookmarkArticle from '@/bookmarks/ui/BookmarkArticle';
import { Suspense } from 'react';
import CommentList from '@/comment/ui/bookmark/CommentList';
import SkeletonBookmarkDetail from '@/bookmarks/ui/Detail/SkeletonBookmarkDetail';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import SkeletonCommentList from '@/comment/ui/bookmark/SkeletonCommentList';
import BookmarkDetailHeader from '@/bookmarks/ui/Detail/BookmarkDetailHeader';
import Header from '@/common-ui/Header/Header';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';
import PullToRefresh from '@/common-ui/PullToRefresh';

const BookMarkDetailPage = () => {
  const { handleRefresh } = useHandleRefresh({ pageType: 'BOOKMARK_DETAIL' });
  return (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        <Suspense fallback={<Header showBackButton />}>
          <BookmarkDetailHeader />
        </Suspense>
        {/** 북마크 정보 영역 */}
        <Suspense
          fallback={
            <SkeletonWrapper>
              <SkeletonBookmarkDetail />
            </SkeletonWrapper>
          }
        >
          <BookmarkArticle />
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
      </PullToRefresh>
      {/** 댓글 입력 영역 */}
      <CommentUploadInputBottomBar>
        <CommentUploadInput />
      </CommentUploadInputBottomBar>
    </>
  );
};

export default BookMarkDetailPage;

const CommentUploadInputBottomBar = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
`;
