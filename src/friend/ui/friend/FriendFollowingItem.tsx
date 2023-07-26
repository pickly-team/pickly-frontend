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
  disabled?: boolean;
};
const FriendFollowingItem = ({
  id,
  memberId,
  name,
  profileEmoji,
  isFollowing,
  isBlocked,
  disabled = false,
}: FriendFollowingProps) => {
  return (
    <FriendItemLayout
      name={name}
      emoji={profileEmoji && profileEmoji}
      id={id}
      disabled={disabled}
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
            disabled={disabled}
          />
        )
      }
    />
  );
};

export default FriendFollowingItem;
