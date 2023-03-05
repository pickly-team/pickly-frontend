import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';

const CommentBottomSheet = ({ ...restProps }: BottomSheetProps) => {
  return (
    <BottomSheet {...restProps}>
      <BottomSheetInnerWrapper>
        <StyledButton buttonColor={'grey900'} activeButtonColor={'grey800'}>
          <ButtonInnerWrapper>신고하기</ButtonInnerWrapper>
        </StyledButton>
        <StyledButton buttonColor={'grey900'} activeButtonColor={'grey800'}>
          <ButtonInnerWrapper>수정하기</ButtonInnerWrapper>
        </StyledButton>
        <StyledButton buttonColor={'grey900'} activeButtonColor={'grey800'}>
          <ButtonInnerWrapper>삭제하기</ButtonInnerWrapper>
        </StyledButton>
      </BottomSheetInnerWrapper>
    </BottomSheet>
  );
};

export default CommentBottomSheet;

const BottomSheetInnerWrapper = styled.div`
  padding: ${getRem(10, 0, 20)};
`;

const StyledButton = styled(Button)`
  border-radius: 0;
`;

const ButtonInnerWrapper = styled.div`
  width: 100%;
  padding: ${getRem(10, 20)};
  text-align: left;
`;
