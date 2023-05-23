import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';

interface ConfirmationProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 *
 * @example
    <BSConfirmation
      title="정말로 삭제 할까요?"
      description="삭제된 카테고리는 복구할 수 없습니다."
      open={open}
      onCancel={onCancel}
      onClose={onClose}
      onConfirm={onConfirm}
    />
 */

const BSConfirmation = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  onCancel,
}: ConfirmationProps) => {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <BSWrapper>
        <Text.Span style={{ margin: '1rem 0' }} weight="bold" fontSize={1.4}>
          {title}
        </Text.Span>

        <Text.Span
          style={{
            marginBottom: '1rem',
          }}
        >
          {description}
        </Text.Span>
        <ButtonWrapper>
          <Button
            style={{
              width: '45%',
            }}
            buttonColor="grey800"
            onClick={onCancel}
          >
            아니요
          </Button>
          <Button
            style={{
              width: '45%',
            }}
            onClick={onConfirm}
          >
            삭제
          </Button>
        </ButtonWrapper>
      </BSWrapper>
    </BottomSheet>
  );
};

export default BSConfirmation;

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
