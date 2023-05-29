import decodeEmojiBase64 from '@/utils/decodeEmojiBase64';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';
import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import { FriendItemRendererProps } from '@/friend/ui/friend/FriendList';

type FriendFollowingProps = FriendItemRendererProps;
const FriendFollowingItem = ({
  id,
  name,
  profileEmoji,
}: FriendFollowingProps) => {
  return (
    <FriendItemLayout
      name={name}
      emoji={profileEmoji && decodeEmojiBase64(profileEmoji)}
      button={<UnFollowButton>팔로잉</UnFollowButton>}
    />
  );
};

export default FriendFollowingItem;
