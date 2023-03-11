import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';

interface BSDeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
}

const BSDeleteConfirmation = ({ open, onClose }: BSDeleteConfirmationProps) => {
  return (
    <BottomSheet open={open} maxHeight={20} onClose={onClose}>
      <BSWrapper>
        <Text.Span style={{ margin: '1rem 0' }} weight="bold" fontSize={1.4}>
          정말로 삭제 할까요?
        </Text.Span>

        <Text.Span
          style={{
            marginBottom: '1rem',
          }}
        >
          삭제하면 다시 복구할 수 없습니다. 삭제하시겠습니까?
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
            onClick={onClose}
          >
            삭제
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
