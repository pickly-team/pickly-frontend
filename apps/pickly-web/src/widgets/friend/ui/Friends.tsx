import { GET_USER_PROFILE } from '@/features/auth/api/profile';
import BlankItem from '@/shared/ui/BlankItem/BlankItem';
import FriendFollowerItem from '@/widgets/friend/ui/friend/FriendFollowerItem';
import FriendFollowingItem from '@/widgets/friend/ui/friend/FriendFollowingItem';
import useAuthStore, { UserInfo } from '@/shared/store/auth';
import useFriendStore, { FriendType } from '@/shared/store/friend';
import { getRem } from '@pickly/design-system';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  useGETFollowerCountQuery,
  useGETFollowerListQuery,
  useGETFollowingCountQuery,
  useGETFollowingListQuery,
} from '../api/friends';

const Friends = () => {
  const queryClient = useQueryClient();

  const { memberId } = useAuthStore();

  const { data: followingData } = useGETFollowingListQuery({ memberId });
  const { data: followerData } = useGETFollowerListQuery({ memberId });
  const { data: followerTotalCount } = useGETFollowerCountQuery({
    memberId,
  });
  const { data: followingTotalCount } = useGETFollowingCountQuery({
    memberId,
  });

  useEffect(() => {
    queryClient.setQueryData<UserInfo>(
      GET_USER_PROFILE({
        loginId: memberId,
      }),
      (prev) =>
        prev && {
          ...prev,
          followerCount: followerTotalCount ?? 0,
          followingCount: followingTotalCount ?? 0,
        },
    );
  }, [followerTotalCount, followingTotalCount]);

  const { selectedType } = useFriendStore();

  const followers = followerData?.pages.flatMap((page) => page.contents) ?? [];
  const followings =
    followingData?.pages.flatMap((page) => page.contents) ?? [];

  return (
    <>
      <Container>
        {selectedType === FriendType.Follower && !followers.length && (
          <BlankItem page="FOLLOWER" />
        )}
        {selectedType === FriendType.Follower &&
          followers?.map((info) => (
            <FriendFollowerItem
              key={info.memberId}
              id={info.memberId}
              memberId={memberId}
              name={info.nickname}
              profileEmoji={info.emoji}
              isFollowing={info.isFollowing}
              isBlocked={info.isBlocked}
            />
          ))}
        {selectedType === FriendType.Following && !followings.length && (
          <BlankItem page="FOLLOWING" />
        )}
        {selectedType === FriendType.Following &&
          followings?.map((info) => (
            <FriendFollowingItem
              key={info.memberId}
              id={info.memberId}
              memberId={memberId}
              name={info.nickname}
              profileEmoji={info.emoji}
              isFollowing={true}
              isBlocked={info.isBlocked}
            />
          ))}
      </Container>
    </>
  );
};

export default Friends;

const Container = styled.div`
  min-height: 60dvh;
  padding: ${getRem(10)};
  > * + * {
    margin-top: ${getRem(10)};
  }
  margin-bottom: ${getRem(80)};
`;
