import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Text from '../Text';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import Icon from '../assets/Icon';
import useToastStore, { ToastMessage, ToastMode } from '@/store/toast';

interface ToastProps {
  message: ToastMessage;
  mode?: ToastMode;
}

const Toast = ({ message, mode = 'SUCCESS' }: ToastProps) => {
  const { duration } = useToastStore();
  return (
    <StyleToast duration={duration}>
      <StyleToastMessage mode={mode}>
        <Top>
          <Icon name={mode === 'SUCCESS' ? 'check' : 'trash'} size="m" />
          <ToastText fontSize={getRem(16)} weight="bold" mode={mode}>
            {message}
          </ToastText>
        </Top>
      </StyleToastMessage>
    </StyleToast>
  );
};

export default Toast;

const floating = keyframes`
    0% {opacity: 0}
    25% {opacity: 1}
    50% {opacity: 1}
    75% {opacity: 1}
    100% {opacity: 0}
`;

const StyleToast = styled.div<{ duration: number }>`
  position: fixed;
  bottom: ${getRem(130)};
  left: 0;
  right: 0;
  padding: 0 ${getRem(30)};
  animation: ${floating} ${({ duration }) => duration}ms ease-in-out;
`;

const StyleToastMessage = styled.div<{ mode: ToastMode }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: ${getRem(52)};
  padding: 0 ${getRem(20)};
  border-radius: ${getRem(8)};
  background: ${({ mode }) =>
    mode === 'SUCCESS' ? theme.colors.lightPrimary : theme.colors.red};
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
`;

const ToastText = styled(Text.Span)<{ mode: ToastMode }>`
  color: ${({ mode }) =>
    mode === 'SUCCESS' ? theme.colors.black : theme.colors.white};
`;
