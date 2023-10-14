import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { type MouseEvent } from 'react';
import useToast from '@/common-ui/Toast/hooks/useToast';
import Text from '@/common-ui/Text';

const BlockedButton = () => {
  const { fireToast } = useToast();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fireToast({
      message: '차단된 사용자 입니다',
      mode: 'ERROR',
    });
  };
  return (
    <StyledButton onClick={onClick} buttonColor={'black'}>
      <Text.Span color="white" fontSize={0.8}>
        차단 유저
      </Text.Span>
    </StyledButton>
  );
};

export default BlockedButton;

const StyledButton = styled(Button)`
  width: ${getRem(70)};
  font-size: ${getRem(14)};
  padding: ${getRem(5, 20)};
  height: fit-content;
  color: ${theme.colors.white};
  font-weight: bold;
  background-color: ${theme.colors.grey700};
`;
