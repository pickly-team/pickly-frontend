import BookmarkUserInfo from '@/widgets/bookmarks/ui/BookmarkUserInfo';
import CategoryReadList from '@/widgets/bookmarks/ui/Main/CategoryReadList';
import ReadProgress from '@/widgets/bookmarks/ui/Main/ReadProgress';
import SkeletonCategoryReadList from '@/widgets/bookmarks/ui/Main/SkeletonCategoryReadList';

import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import IconButton from '@/shared/common/ui/IconButton';
import { navigatePath } from '@/shared/constants/navigatePath';
import useAuthStore from '@/shared/store/auth';
import {
  getRem,
  PullToRefresh,
  SkeletonWrapper,
  Text,
} from '@pickly/design-system';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const router = useNavigate();
  const { handleRefresh } = useHandleRefresh({ pageType: 'MAIN' });
  const { userInfo } = useAuthStore();

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Container>
        <BlankView />
        <BookmarkUserInfo
          userEmoji={userInfo.profileEmoji}
          userName={userInfo.nickname}
          rightButton={
            <IconButton
              name="search"
              size="m"
              onClick={() => router(navigatePath.BOOKMARK_SEARCH)}
              width={30}
              height={30}
            />
          }
        />
        <ReadProgress />
        <Text.Header level="h2" weight="bold" fontSize={1.3}>
          카테고리별 읽기 현황
        </Text.Header>
        <Suspense
          fallback={
            <SkeletonWrapper>
              <SkeletonCategoryReadList />
            </SkeletonWrapper>
          }
        >
          <CategoryReadList />
        </Suspense>
      </Container>
    </PullToRefresh>
  );
};

export default MainPage;

const BlankView = styled.div`
  height: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${getRem(20)};
  row-gap: 1.5rem;
`;
