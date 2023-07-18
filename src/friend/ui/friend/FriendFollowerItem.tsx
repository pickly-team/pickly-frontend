import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import FollowButton from '@/friend/ui/buttons/FollowButton';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';

type FriendFollowerProps = {
  id: number;
  memberId: number;
  name: string;
  profileEmoji: string;
  isFollowing: boolean;
};
const FriendFollowerItem = ({
  id,
  memberId,
  name,
  profileEmoji,
  isFollowing,
}: FriendFollowerProps) => {
  return (
    <FriendItemLayout
      id={id}
      name={name}
      emoji={profileEmoji}
      button={
        isFollowing ? (
          <UnFollowButton followerId={memberId} memberId={id} />
        ) : (
          <FollowButton followerId={memberId} memberId={id} />
        )
      }
    />
  );
};

export default FriendFollowerItem;
