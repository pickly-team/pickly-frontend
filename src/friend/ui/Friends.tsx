import { useState } from 'react';
import { useGetFollowers, useGetFollowings } from '@/friend/api/friends';
import FriendFollowingItem from '@/friend/ui/friend/FriendFollowingItem';
import FriendFollowerItem from '@/friend/ui/friend/FriendFollowerItem';
import FriendTypeSelect, { FriendType } from '@/friend/ui/FriendTypeSelect';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';

const Friends = () => {
  //FIXME: 하드코딩 개선
  const { data: followerData } = useGetFollowers({ memberId: '1' });
  const { data: followingData } = useGetFollowings({ memberId: '1' });

  const [selectedType, setSelectedType] = useState<FriendType>(
    FriendType.Follower,
  );

  const followers = followerData?.contents ?? [];
  const followings = followingData?.contents ?? [];
  const followerTotalCount = followers.length;
  const followingTotalCount = followings.length;

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
              key={info.memberId}
              id={info.memberId}
              name={info.loginId}
              profileEmoji={info.profileEmoji}
              isFollowing={info.isFollowing}
            />
          ))}
        {selectedType === FriendType.Follower &&
          followers?.map((info) => (
            <FriendFollowerItem
              key={info.memberId}
              id={info.memberId}
              name={info.loginId}
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
