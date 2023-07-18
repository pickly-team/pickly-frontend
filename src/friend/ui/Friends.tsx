import { useState } from 'react';
import FriendFollowingItem from '@/friend/ui/friend/FriendFollowingItem';
import FriendFollowerItem from '@/friend/ui/friend/FriendFollowerItem';
import FriendTypeSelect, { FriendType } from '@/friend/ui/FriendTypeSelect';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import useAuthStore from '@/store/auth';
import {
  useGETFollowerCountQuery,
  useGETFollowerListQuery,
  useGETFollowingCountQuery,
  useGETFollowingListQuery,
} from '../api/friends';

const Friends = () => {
  const { memberId } = useAuthStore();
  const { data: followingData } = useGETFollowingListQuery({ memberId });
  const { data: followerData } = useGETFollowerListQuery({ memberId });
  const { data: followerTotalCount } = useGETFollowerCountQuery({
    memberId,
  });
  const { data: followingTotalCount } = useGETFollowingCountQuery({
    memberId,
  });

  const [selectedType, setSelectedType] = useState<FriendType>(
    FriendType.Follower,
  );

  const followers = followerData?.pages.flatMap((page) => page.contents) ?? [];
  const followings =
    followingData?.pages.flatMap((page) => page.contents) ?? [];

  return (
    <div>
      <FriendTypeSelect
        value={selectedType}
        onSelect={setSelectedType}
        followerTotalCount={followerTotalCount ?? 0}
        followingTotalCount={followingTotalCount ?? 0}
      />
      <Container>
        {selectedType === FriendType.Following &&
          followings?.map((info) => (
            <FriendFollowingItem
              key={info.memberId}
              id={info.memberId}
              memberId={memberId}
              name={info.loginId}
              profileEmoji={info.emoji}
              isFollowing={true}
            />
          ))}
        {selectedType === FriendType.Follower &&
          followers?.map((info) => (
            <FriendFollowerItem
              key={info.memberId}
              id={info.memberId}
              memberId={memberId}
              name={info.loginId}
              profileEmoji={info.emoji}
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
