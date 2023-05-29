import { useState } from 'react';
import { useGetFollowers, useGetFollowings } from '@/friend/api/friends';
import FriendFollowingItem from '@/friend/ui/friend/FriendFollowingItem';
import FriendFollowerItem from '@/friend/ui/friend/FriendFollowerItem';
import FriendList from '@/friend/ui/friend/FriendList';
import FriendTypeSelect, { FriendType } from '@/friend/ui/FriendTypeSelect';

const Friends = () => {
  const { data: followers } = useGetFollowers();
  const { data: followings } = useGetFollowings();

  const [selectedType, setSelectedType] = useState<FriendType>(
    FriendType.Follower,
  );

  const followerTotalCount = followers?.length ?? 0;
  const followingTotalCount = followings?.length ?? 0;

  const Renderer =
    selectedType === FriendType.Following
      ? FriendFollowingItem
      : FriendFollowerItem;
  const infos = selectedType === FriendType.Following ? followings : followers;

  return (
    <div>
      <FriendTypeSelect
        value={selectedType}
        onSelect={setSelectedType}
        followerTotalCount={followerTotalCount}
        followingTotalCount={followingTotalCount}
      />
      {infos && <FriendList infos={infos} Renderer={Renderer} />}
    </div>
  );
};

export default Friends;
