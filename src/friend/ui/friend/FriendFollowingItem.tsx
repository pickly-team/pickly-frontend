import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';
import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import FollowButton from '@/friend/ui/buttons/FollowButton';

type FriendFollowingProps = {
  id: number;
  memberId: number;
  name: string;
  profileEmoji: string;
  isFollowing: boolean;
  isBlocked: boolean;
};
const FriendFollowingItem = ({
  id,
  memberId,
  name,
  profileEmoji,
  isFollowing,
  isBlocked,
}: FriendFollowingProps) => {
  return (
    <FriendItemLayout
      name={name}
      emoji={profileEmoji && profileEmoji}
      id={id}
      button={
        isFollowing ? (
          <UnFollowButton
            memberId={id}
            followerId={memberId}
            isBlocked={isBlocked}
          />
        ) : (
          <FollowButton
            memberId={id}
            followerId={memberId}
            isBlocked={isBlocked}
          />
        )
      }
    />
  );
};

export default FriendFollowingItem;
