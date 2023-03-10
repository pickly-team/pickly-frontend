import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import CommentBottomSheet from '@/comment/ui/CommetBottomSheet';
import getRem from '@/utils/getRem';

interface CommentProps {
  nickname: string;
  content: string;
  updatedAt: string;
  isWriter: boolean;
}

const CommentItem = ({
  nickname,
  content,
  updatedAt,
  isWriter,
}: CommentProps) => {
  const { isOpen, open, close } = useBottomSheet();
  return (
    <>
      <Container>
        <CommentHeader>
          <NicknameTextAndIconWrapper>
            <NicknameText fontSize={1.2} weight={'bold'}>
              {nickname}
            </NicknameText>
            {isWriter && <Icon name="badge-green" size={'s'} />}
          </NicknameTextAndIconWrapper>
          <button onClick={open}>
            <Icon name="more" size="m" />
          </button>
        </CommentHeader>
        <ContentText>{content}</ContentText>
        <IconAndTextWrapper>
          <Icon name="timeline" size={'s'} />
          <UpdatedAtText>{updatedAt}</UpdatedAtText>
        </IconAndTextWrapper>
      </Container>
      <CommentBottomSheet open={isOpen} onClose={close} />
    </>
  );
};

export default CommentItem;

const Container = styled.div`
  display: grid;
  row-gap: ${getRem(10)};
  width: 100%;
  padding: ${getRem(15, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey800};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NicknameTextAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const NicknameText = styled(Text.Span)``;
const ContentText = styled(Text.Span)``;
const UpdatedAtText = styled(Text.Span)``;
const IconAndTextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;
