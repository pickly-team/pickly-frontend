import styled from '@emotion/styled';

import getRem from '@/utils/getRem';
import Header from '@/common-ui/Header/Header';
import { Suspense } from 'react';
import BookmarkLikeList from '@/bookmarks/ui/Like/BookmarkLikeList';
import SkeletonBookmarkLikeList from '@/bookmarks/ui/Like/SkeletonBookmarkLikeList';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import PullToRefresh from '@/common-ui/PullToRefresh';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';

const LikePage = () => {
  const showBackButton = true;
  const title = '좋아요 목록';

  const { handleRefresh } = useHandleRefresh({ pageType: 'LIKE_PAGE' });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={title} showBackButton={showBackButton} />
      <LBody>
        <Suspense
          fallback={
            <SkeletonWrapper>
              <SkeletonBookmarkLikeList />
            </SkeletonWrapper>
          }
        >
          <BookmarkLikeList />
        </Suspense>
      </LBody>
    </PullToRefresh>
  );
};

export default LikePage;

const LBody = styled.div`
  margin-top: ${getRem(12)};
  row-gap: ${getRem(21)};
`;
