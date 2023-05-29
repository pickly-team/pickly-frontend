import decodeEmojiBase64 from '@/utils/decodeEmojiBase64';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';
import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import FollowButton from '@/friend/ui/buttons/FollowButton';

type FriendFollowingProps = {
  id: string;
  name: string;
  profileEmoji: string | undefined;
  isFollowing: boolean;
};
const FriendFollowingItem = ({
  id,
  name,
  profileEmoji,
  isFollowing,
}: FriendFollowingProps) => {
  return (
    <FriendItemLayout
      name={name}
      emoji={profileEmoji && decodeEmojiBase64(profileEmoji)}
      button={
        isFollowing ? (
          <UnFollowButton userId={id} />
        ) : (
          <FollowButton userId={id} />
        )
      }
    />
  );
};

export default FriendFollowingItem;
