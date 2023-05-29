import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { PropsWithChildren } from 'react';
import { theme } from '@/styles/theme';

const DeleteFollowerButton = ({
  children,
  ...props
}: PropsWithChildren<object>) => {
  const onClick = () => {
    //TODO: 팔로어 삭제 API 연동
  };
  return (
    <StyledButton onClick={onClick} buttonColor={'lightPrimary'} {...props}>
      {children}
    </StyledButton>
  );
};

export default DeleteFollowerButton;

const StyledButton = styled(Button)`
  width: ${getRem(70)};
  font-size: ${getRem(14)};
  padding: ${getRem(4, 15)};
  height: fit-content;
  color: ${theme.colors.black};
  font-weight: bold;
`;
