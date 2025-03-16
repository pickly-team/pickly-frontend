import styled from '@emotion/styled';
import { Suspense } from 'react';
import CommentList from '@/widgets/comment/ui/comment-list/CommentList';
import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import {
  getRem,
  Header,
  PullToRefresh,
  SkeletonWrapper,
} from '@pickly/design-system';
import SkeletonCommentList from '@/widgets/comment/ui/comment-list/SkeletonCommentList';

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
