import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

interface EmojiProps {
  emoji: string;
  onClickEmoji: () => void;
}

const Emoji = ({ emoji, onClickEmoji }: EmojiProps) => {
  return (
    <UserEmojiEdit onClick={onClickEmoji}>
      <UserBox>
        <Text.Span fontSize={getRem(48)}>{emoji}</Text.Span>
        <EditIcon>
          <Icon name="pencil" size="xs" />
        </EditIcon>
      </UserBox>
    </UserEmojiEdit>
  );
};

export default Emoji;

const UserEmojiEdit = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: ${getRem(40)};
`;

const UserBox = styled.div`
  position: relative;
  display: flex;
  width: ${getRem(90)};
  height: ${getRem(90)};
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  justify-content: center;
  align-items: center;
`;

const EditIcon = styled.div`
  position: absolute;
  right: ${getRem(5)};
  bottom: ${getRem(5)};
`;
