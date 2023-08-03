import Header from '@/common-ui/Header/Header';
import Friends from '@/friend/ui/Friends';
import { Suspense } from 'react';
import FriendSkeletonItem from '@/friend/ui/FriendSkeletonItem';
import IconButton from '@/common/ui/IconButton';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@/common-ui/stackflow';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Layout from '@/common-ui/Layout';

const FriendPage: ActivityComponentType = () => {
  const { push } = useFlow();
  return (
    <AppScreen preventSwipeBack>
      <Layout>
        <Header
          title={'친구 목록'}
          rightButton={
            <IconButton
              name="search"
              size="m"
              onClick={() => push('FriendSearchPage', {})}
            />
          }
        />
        <Suspense
          fallback={
            <SkeletonWrapper>
              <FriendSkeletonItem />
            </SkeletonWrapper>
          }
        >
          <Friends />
        </Suspense>
      </Layout>
    </AppScreen>
  );
};

export default FriendPage;
