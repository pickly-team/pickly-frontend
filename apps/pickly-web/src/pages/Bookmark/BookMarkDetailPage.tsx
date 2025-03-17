import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import BookmarkArticle from '@/widgets/bookmarks/ui/BookmarkArticle';
import BookmarkDetailHeader from '@/widgets/bookmarks/ui/Detail/BookmarkDetailHeader';
import SkeletonBookmarkDetail from '@/widgets/bookmarks/ui/Detail/SkeletonBookmarkDetail';
import Divider from '@/widgets/category/ui/Divider';
import CommentList from '@/widgets/comment/ui/bookmark/CommentList';
import CommentUploadInput from '@/widgets/comment/ui/bookmark/CommentUploadInput';
import SkeletonCommentList from '@/widgets/comment/ui/bookmark/SkeletonCommentList';

import styled from '@emotion/styled';
import {
  getRem,
  Header,
  PullToRefresh,
  SkeletonWrapper,
} from '@pickly/design-system';

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
        <DividerWrapper>
          <Divider size="s" margin="off" />
        </DividerWrapper>
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

const DividerWrapper = styled.div`
  margin-bottom: ${getRem(20)};
`;
