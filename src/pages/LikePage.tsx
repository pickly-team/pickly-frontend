import styled from '@emotion/styled';

import getRem from '@/utils/getRem';
import Header from '@/common-ui/Header/Header';
import { Suspense } from 'react';
import BookmarkLikeList from '@/bookmarks/ui/Like/BookmarkLikeList';
import SkeletonBookmarkLikeList from '@/bookmarks/ui/Like/SkeletonBookmarkLikeList';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';

const LikePage = () => {
  const showBackButton = true;
  const title = '좋아요 목록';

  return (
    <Layout>
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
    </Layout>
  );
};

export default LikePage;

const Layout = styled.div``;
const LBody = styled.div`
  margin-top: ${getRem(12)};
  row-gap: ${getRem(21)};
`;
