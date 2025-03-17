import { theme, getRem, Icon, Text } from '@pickly/design-system';
import styled from '@emotion/styled';

const BlankComment = () => {
  return (
    <Container>
      <IconWrapper>
        <Icon name="circle-pencil" size="l" />
      </IconWrapper>
      <TextWrapper>
        <BlankText fontSize={0.8} weight="bold">
          댓글이 없습니다
        </BlankText>
        <BlankText fontSize={0.8} weight="bold">
          첫 댓글을 남겨보세요!
        </BlankText>
      </TextWrapper>
    </Container>
  );
};

export default BlankComment;

const Container = styled.div`
  display: grid;
  flex-direction: column;
  row-gap: 1rem;
  padding: ${getRem(30, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey900};
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  align-items: center;
`;

const BlankText = styled(Text.Span)``;
