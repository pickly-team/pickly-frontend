import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { TbMessageCircle2Filled as MessageFillIcon } from 'react-icons/tb';

const CommentCountInfo = ({ commentCount }: { commentCount: number }) => {
  return (
    <Container>
      <MessageFillIcon color={theme.colors.lightPrimary} size={24} />
      <Text.Span fontSize={1}>{`: ${commentCount}`}</Text.Span>
    </Container>
  );
};

export default CommentCountInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(5)};
`;
