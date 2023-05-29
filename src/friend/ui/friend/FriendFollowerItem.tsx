import DeleteFollowerButton from '@/friend/ui/buttons/DeleteFollowerButton';
import FriendItemLayout from '@/friend/ui/friend/layout/FriendItemLayout';
import decodeEmojiBase64 from '@/utils/decodeEmojiBase64';
import { FriendItemRendererProps } from '@/friend/ui/friend/FriendList';

type FriendFollowerProps = FriendItemRendererProps;
const FriendFollowerItem = ({
  id,
  name,
  profileEmoji,
}: FriendFollowerProps) => {
  return (
    <FriendItemLayout
      name={name}
      emoji={profileEmoji && decodeEmojiBase64(profileEmoji)}
      button={<DeleteFollowerButton>삭제</DeleteFollowerButton>}
    />
  );
};

export default FriendFollowerItem;
