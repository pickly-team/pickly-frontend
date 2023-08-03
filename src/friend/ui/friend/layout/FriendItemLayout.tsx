import { ReactNode } from 'react';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { useFlow } from '@/common-ui/stackflow';

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
  const { push } = useFlow();

  return (
    <Container
      onClick={() =>
        !disabled &&
        push('FriendBookmarkPage', {
          id: String(id),
        })
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
