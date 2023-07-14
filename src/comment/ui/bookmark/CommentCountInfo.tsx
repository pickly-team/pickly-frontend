import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

const CommentCountInfo = ({ commentCount }: { commentCount: number }) => {
  return (
    <Container>
      <Icon name="message-green" size="m" />
      <Text.Span fontSize={1}>{`: ${commentCount}`}</Text.Span>
    </Container>
  );
};

export default CommentCountInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;
