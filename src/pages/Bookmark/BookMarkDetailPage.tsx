/* eslint-disable @typescript-eslint/no-empty-function */
import BookmarkArticle from '@/bookmarks/ui/BookmarkArticle';
import BookmarkDetailHeader from '@/bookmarks/ui/Detail/BookmarkDetailHeader';
import SkeletonBookmarkDetail from '@/bookmarks/ui/Detail/SkeletonBookmarkDetail';
import CommentList from '@/comment/ui/bookmark/CommentList';
import CommentUploadInput from '@/comment/ui/bookmark/CommentUploadInput';
import SkeletonCommentList from '@/comment/ui/bookmark/SkeletonCommentList';
import Header from '@/common-ui/Header/Header';
import PullToRefresh from '@/common-ui/PullToRefresh';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';
import styled from '@emotion/styled';
import { Suspense } from 'react';

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
