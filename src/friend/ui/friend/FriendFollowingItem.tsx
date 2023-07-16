import decodeEmojiBase64 from '@/utils/decodeEmojiBase64';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';
import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import FollowButton from '@/friend/ui/buttons/FollowButton';

type FriendFollowingProps = {
  id: number;
  memberId: number;
  name: string;
  profileEmoji: string | undefined;
  isFollowing: boolean;
};
const FriendFollowingItem = ({
  id,
  memberId,
  name,
  profileEmoji,
  isFollowing,
}: FriendFollowingProps) => {
  return (
    <FriendItemLayout
      name={name}
      emoji={profileEmoji && decodeEmojiBase64(profileEmoji)}
      id={id}
      button={
        isFollowing ? (
          <UnFollowButton memberId={id} followerId={memberId} />
        ) : (
          <FollowButton memberId={id} followerId={memberId} />
        )
      }
    />
  );
};

export default FriendFollowingItem;
