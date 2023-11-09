import Header from '@/common-ui/Header/Header';
import PullToRefresh from '@/common-ui/PullToRefresh';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import IconButton from '@/common/ui/IconButton';
import { navigatePath } from '@/constants/navigatePath';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const router = useNavigate();
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header
        title={'친구 목록'}
        rightButton={
          <IconButton
            name="search"
            size="m"
            onClick={() => router(navigatePath.FRIEND_SEARCH)}
          />
        }
      />
      <Suspense fallback={<SkeletonWrapper></SkeletonWrapper>}>
        <Friends />
      </Suspense>
    </PullToRefresh>
  );
};

export default MainPage;
