import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import styled from '@emotion/styled';

const CommentBottomSheet = ({ ...restProps }: BottomSheetProps) => {
  return (
    <BottomSheet {...restProps}>
      <Button buttonColor={'grey900'}>
        <ButtonInnerWrapper>신고하기</ButtonInnerWrapper>
      </Button>
      <Button buttonColor={'grey900'}>
        <ButtonInnerWrapper>수정하기</ButtonInnerWrapper>
      </Button>
      <Button buttonColor={'grey900'}>
        <ButtonInnerWrapper>삭제하기</ButtonInnerWrapper>
      </Button>
    </BottomSheet>
  );
};

export default CommentBottomSheet;

const ButtonInnerWrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  text-align: left;
`;
