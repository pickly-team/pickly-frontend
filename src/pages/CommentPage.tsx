import Header from '@/common-ui/Header/Header';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { Suspense } from 'react';
import CommentList from '@/comment/ui/comment-list/CommentList';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import SkeletonCommentList from '@/comment/ui/comment-list/SkeletonCommentList';
import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

const CommentPage: ActivityComponentType = () => {
  return (
    <AppScreen>
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
    </AppScreen>
  );
};

export default CommentPage;

const Body = styled.div`
  padding: ${getRem(10, 20)};
`;
