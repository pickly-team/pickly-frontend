import { ReactNode } from 'react';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { useNavigate } from 'react-router-dom';
import { navigatePath } from '@/constants/navigatePath';

interface FriendItemLayoutProps {
  emoji: ReactNode;
  name: ReactNode;
  button: ReactNode;
  id: number;
  disabled?: boolean;
}
const FriendItemLayout = ({
  emoji,
  name,
  button,
  id,
  disabled = false,
}: FriendItemLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() =>
        !disabled &&
        navigate(navigatePath.FRIEND_BOOKMARK.replace(':id', String(id)))
      }
    >
      <EmojiAndNameWrapper>
        <span>{emoji}</span>
        <span>{name}</span>
      </EmojiAndNameWrapper>
      {button}
    </Container>
  );
};

export default FriendItemLayout;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${getRem(57)};
`;
const EmojiAndNameWrapper = styled.div`
  display: flex;
  column-gap: ${getRem(10)};
  align-items: center;
`;
