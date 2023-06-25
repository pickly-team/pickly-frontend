import { ReactNode } from 'react';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';

interface FriendItemLayoutProps {
  emoji: ReactNode;
  name: ReactNode;
  button: ReactNode;
}
const FriendItemLayout = ({ emoji, name, button }: FriendItemLayoutProps) => {
  return (
    <Container>
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
`;
