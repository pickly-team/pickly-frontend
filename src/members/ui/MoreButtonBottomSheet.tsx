import styled from '@emotion/styled';

import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import getRem from '@/utils/getRem';
import Button from '@/common-ui/Button';
import { Link } from 'react-router-dom';

const MoreButtonBottomSheet = ({
  memberId,
  ...props
}: Omit<BottomSheetProps, 'children'> & {
  memberId: number;
}) => {
  return (
    <BottomSheet maxHeight={30} {...props}>
      <BottomSheetInnerWrapper>
        <Link to={`/users/${memberId}/edit`}>
          <StyledButton buttonColor={'grey900'} activeButtonColor={'grey800'}>
            <ButtonInnerWrapper>내 정보 수정</ButtonInnerWrapper>
          </StyledButton>
        </Link>
        <Link to={'/blocked-users'}>
          <StyledButton buttonColor={'grey900'} activeButtonColor={'grey800'}>
            <ButtonInnerWrapper>차단한 사용자</ButtonInnerWrapper>
          </StyledButton>
        </Link>
      </BottomSheetInnerWrapper>
    </BottomSheet>
  );
};

const StyledButton = styled(Button)`
  border-radius: 0;
  background: transparent;
`;

const ButtonInnerWrapper = styled.div`
  width: 100%;
  padding: ${getRem(10, 20)};
  text-align: left;
`;

export default MoreButtonBottomSheet;

const BottomSheetInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getRem(10, 20, 20)};
  gap: ${getRem(20)};
`;
