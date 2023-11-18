import Header from '@/common-ui/Header/Header';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { Suspense } from 'react';
import CommentList from '@/comment/ui/comment-list/CommentList';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import SkeletonCommentList from '@/comment/ui/comment-list/SkeletonCommentList';
import PullToRefresh from '@/common-ui/PullToRefresh';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';

const CommentPage = () => {
  const { handleRefresh } = useHandleRefresh({ pageType: 'COMMENT_LIST' });
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={'댓글 목록'} showBackButton />
      <Body>
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
    </PullToRefresh>
  );
};

export default CommentPage;

const Body = styled.div`
  padding: ${getRem(10, 20)};
`;
