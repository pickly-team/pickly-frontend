import { ReactNode } from 'react';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';

interface MemberProps {
  emoji: ReactNode;
  name: ReactNode;
  button: ReactNode;
}
const Member = ({ emoji, name, button }: MemberProps) => {
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

export default Member;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${getRem(57)};
`;
const EmojiAndNameWrapper = styled.div`
  display: flex;
  column-gap: 0.6rem;
  align-items: center;
`;
