import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import getRem from '@/utils/getRem';
import Icon from '@/common-ui/assets/Icon';

interface CommentProps {
  nickname: string;
  content: string;
  updatedAt: string;
  isWriter: boolean;
}

const Comment = ({ nickname, content, updatedAt, isWriter }: CommentProps) => {
  return (
    <Container>
      <NicknameAndIconWrapper>
        <NicknameText fontSize={getRem(16)}>{nickname}</NicknameText>
        <button>
          <Icon name="more" size="m" />
        </button>
      </NicknameAndIconWrapper>
      <ContentText fontSize={getRem(13)}>{content}</ContentText>
      <UpdatedAtText fontSize={getRem(13)}>{updatedAt}</UpdatedAtText>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${theme.colors.grey800};
  padding: 15px 20px;
  border-radius: 7px;
  display: grid;
  row-gap: 10px;
`;

const NicknameAndIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NicknameText = styled(Text.Span)``;
const ContentText = styled(Text.Span)``;
const UpdatedAtText = styled(Text.Span)``;
