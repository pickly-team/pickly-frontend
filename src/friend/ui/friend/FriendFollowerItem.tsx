import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import decodeEmojiBase64 from '@/utils/decodeEmojiBase64';
import FollowButton from '@/friend/ui/buttons/FollowButton';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';

type FriendFollowerProps = {
  id: string;
  name: string;
  profileEmoji: string | undefined;
  isFollowing: boolean;
};
const FriendFollowerItem = ({
  id,
  name,
  profileEmoji,
  isFollowing,
}: FriendFollowerProps) => {
  return (
    <FriendItemLayout
      id={id}
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

export default FriendFollowerItem;
