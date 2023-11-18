import Header from '@/common-ui/Header/Header';
import PullToRefresh from '@/common-ui/PullToRefresh';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import IconButton from '@/common/ui/IconButton';
import { navigatePath } from '@/constants/navigatePath';
import FriendSkeletonItem from '@/friend/ui/FriendSkeletonItem';
import Friends from '@/friend/ui/Friends';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';
import {
  useGETFollowerCountQuery,
  useGETFollowingCountQuery,
} from '@/friend/api/friends';
import FriendTypeSelect from '@/friend/ui/FriendTypeSelect';
import useAuthStore from '@/store/auth';
import useFriendStore from '@/store/friend';

const FriendPage = () => {
  const router = useNavigate();
  const { memberId } = useAuthStore();
  const { handleRefresh } = useHandleRefresh({ pageType: 'FRIENDS' });

  const { selectedType, setSelectedType } = useFriendStore();
  const { data: followerTotalCount } = useGETFollowerCountQuery({
    memberId,
  });
  const { data: followingTotalCount } = useGETFollowingCountQuery({
    memberId,
  });

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
      <FriendTypeSelect
        value={selectedType}
        onSelect={setSelectedType}
        followerTotalCount={followerTotalCount ?? 0}
        followingTotalCount={followingTotalCount ?? 0}
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
    </PullToRefresh>
  );
};

export default FriendPage;
