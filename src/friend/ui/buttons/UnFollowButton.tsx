import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { PropsWithChildren } from 'react';
import { theme } from '@/styles/theme';

const UnFollowButton = ({ children }: PropsWithChildren<object>) => {
  const onClick = () => {
    //TODO: 언팔로우 API 연동
  };
  return (
    <StyledButton onClick={onClick} buttonColor={'black'}>
      {children}
    </StyledButton>
  );
};

export default UnFollowButton;

const StyledButton = styled(Button)`
  width: ${getRem(70)};
  font-size: ${getRem(14)};
  padding: ${getRem(4, 15)};
  height: fit-content;
  border: 1px solid ${theme.colors.lightPrimary};
  color: ${theme.colors.lightPrimary};
  font-weight: bold;
`;
