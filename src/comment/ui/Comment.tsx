import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import CommentBottomSheet from '@/comment/ui/CommetBottomSheet';

interface CommentProps {
  nickname: string;
  content: string;
  updatedAt: string;
  isWriter: boolean;
}

const Comment = ({ nickname, content, updatedAt, isWriter }: CommentProps) => {
  const { isOpen, open, close } = useBottomSheet();
  return (
    <>
      <Container>
        <CommentHeader>
          <NicknameTextAndIconWrapper>
            <NicknameText fontSize={16}>{nickname}</NicknameText>
            {isWriter && <Icon name={'verify-green'} size={'s'} />}
          </NicknameTextAndIconWrapper>
          <button onClick={open}>
            <Icon name="more" size="m" />
          </button>
        </CommentHeader>
        <ContentText fontSize={13}>{content}</ContentText>
        <IconAndTextWrapper>
          <Icon name={'time-history-white'} size={'s'} />
          <UpdatedAtText fontSize={13}>{updatedAt}</UpdatedAtText>
        </IconAndTextWrapper>
      </Container>
      <CommentBottomSheet open={isOpen} onClose={close}>
        수정 삭제
      </CommentBottomSheet>
    </>
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

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NicknameTextAndIconWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

const NicknameText = styled(Text.Span)``;
const ContentText = styled(Text.Span)``;
const UpdatedAtText = styled(Text.Span)``;
const IconAndTextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;
