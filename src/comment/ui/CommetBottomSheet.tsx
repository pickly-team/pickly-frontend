import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import styled from '@emotion/styled';

const CommentBottomSheet = ({ ...restProps }: BottomSheetProps) => {
  return (
    <BottomSheet {...restProps}>
      <Button buttonColor={'grey900'}>
        <TextWrapper>신고하기</TextWrapper>
      </Button>
      <Button buttonColor={'grey900'}>
        <TextWrapper>수정하기</TextWrapper>
      </Button>
      <Button buttonColor={'grey900'}>
        <TextWrapper>삭제하기</TextWrapper>
      </Button>
    </BottomSheet>
  );
};

export default CommentBottomSheet;

const TextWrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  text-align: left;
`;
