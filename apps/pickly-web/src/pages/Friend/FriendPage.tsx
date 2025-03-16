import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import IconButton from '@/shared/common/ui/IconButton';
import { navigatePath } from '@/shared/constants/navigatePath';
import useAuthStore from '@/shared/store/auth';
import useFriendStore from '@/shared/store/friend';
import {
  useGETFollowerCountQuery,
  useGETFollowingCountQuery,
} from '@/widgets/friend/api/friends';
import FriendSkeletonItem from '@/widgets/friend/ui/FriendSkeletonItem';
import FriendTypeSelect from '@/widgets/friend/ui/FriendTypeSelect';
import Friends from '@/widgets/friend/ui/Friends';
import { Header, PullToRefresh, SkeletonWrapper } from '@pickly/design-system';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

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
