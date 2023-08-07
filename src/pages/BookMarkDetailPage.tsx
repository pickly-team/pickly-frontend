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

const BookMarkDetailPage = () => {
  return (
    <>
      <Suspense fallback={<Header showBackButton />}>
        <BookmarkDetailHeader />
      </Suspense>
      <Body>
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
      </Body>
      {/** 댓글 입력 영역 */}
      <CommentUploadInputBottomBar>
        <CommentUploadInput />
      </CommentUploadInputBottomBar>
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
