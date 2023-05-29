import { useState } from 'react';
import { useGetFollowers, useGetFollowings } from '@/friend/api/friends';
import FriendFollowingItem from '@/friend/ui/friend/FriendFollowingItem';
import FriendFollowerItem from '@/friend/ui/friend/FriendFollowerItem';
import FriendTypeSelect, { FriendType } from '@/friend/ui/FriendTypeSelect';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';

const Friends = () => {
  const { data: followers } = useGetFollowers();
  const { data: followings } = useGetFollowings();

  const [selectedType, setSelectedType] = useState<FriendType>(
    FriendType.Follower,
  );

  const followerTotalCount = followers?.length ?? 0;
  const followingTotalCount = followings?.length ?? 0;

  return (
    <div>
      <FriendTypeSelect
        value={selectedType}
        onSelect={setSelectedType}
        followerTotalCount={followerTotalCount}
        followingTotalCount={followingTotalCount}
      />
      <Container>
        {selectedType === FriendType.Following &&
          followers?.map((info) => (
            <FriendFollowingItem
              key={info.id}
              id={info.id}
              name={info.name}
              profileEmoji={info.profileEmoji}
              isFollowing={info.isFollowing}
            />
          ))}
        {selectedType === FriendType.Follower &&
          followers?.map((info) => (
            <FriendFollowerItem
              key={info.id}
              id={info.id}
              name={info.name}
              profileEmoji={info.profileEmoji}
              isFollowing={info.isFollowing}
            />
          ))}
      </Container>
    </div>
  );
};

export default Friends;

const Container = styled.div`
  padding: ${getRem(10)};
  > * + * {
    margin-top: ${getRem(10)};
  }
`;
