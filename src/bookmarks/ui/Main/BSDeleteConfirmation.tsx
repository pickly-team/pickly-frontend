import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';

interface BSDeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  mainText?: string;
  subText?: string;
  buttonText?: string;
}

const BSDeleteConfirmation = ({
  open,
  onClose,
  onDelete,
  mainText = '정말로 삭제 할까요?',
  subText = '삭제하면 다시 복구할 수 없습니다. 삭제하시겠습니까?',
  buttonText = '삭제',
}: BSDeleteConfirmationProps) => {
  return (
    <BottomSheet open={open} maxHeight={30} onClose={onClose}>
      <BSWrapper>
        <Text.Span style={{ margin: '1rem 0' }} weight="bold" fontSize={1.3}>
          {mainText}
        </Text.Span>

        <Text.Span
          style={{
            marginBottom: '1rem',
          }}
          fontSize={0.8}
        >
          {subText}
        </Text.Span>
        <ButtonWrapper>
          <Button
            style={{
              width: '45%',
            }}
            buttonColor="grey800"
            onClick={onClose}
          >
            아니요
          </Button>
          <Button
            style={{
              width: '45%',
            }}
            onClick={onDelete}
          >
            {buttonText}
          </Button>
        </ButtonWrapper>
      </BSWrapper>
    </BottomSheet>
  );
};

export default BSDeleteConfirmation;

const BSWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .button {
    width: 50%;
  }
  margin-bottom: 1rem;
`;
