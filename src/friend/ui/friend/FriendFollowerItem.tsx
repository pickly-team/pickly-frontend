import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import FollowButton from '@/friend/ui/buttons/FollowButton';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';
import BlockedButton from '../buttons/BlockedButton';

type FriendFollowerProps = {
  id: number;
  memberId: number;
  name: string;
  profileEmoji: string;
  isFollowing: boolean;
  isBlocked: boolean;
};
const FriendFollowerItem = ({
  id,
  memberId,
  name,
  profileEmoji,
  isFollowing,
  isBlocked,
}: FriendFollowerProps) => {
  return (
    <FriendItemLayout
      id={id}
      name={name}
      emoji={profileEmoji}
      button={
        isBlocked ? (
          <BlockedButton />
        ) : isFollowing ? (
          <UnFollowButton
            followerId={memberId}
            memberId={id}
            isBlocked={isBlocked}
          />
        ) : (
          <FollowButton
            followerId={memberId}
            memberId={id}
            isBlocked={isBlocked}
          />
        )
      }
    />
  );
};

export default FriendFollowerItem;
