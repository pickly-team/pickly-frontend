import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import useToastStore, { ToastMessage, ToastMode } from '@/shared/store/toast';
import { getRem, Icon, IconName, Text, theme } from '@pickly/design-system';

interface ToastProps {
  message: ToastMessage;
  mode?: ToastMode;
}

const icon: Record<ToastMode, IconName> = {
  SUCCESS: 'check',
  DELETE: 'trash',
  ERROR: 'error',
} as const;

const modeColor: Record<ToastMode, string> = {
  SUCCESS: theme.colors.lightPrimary,
  DELETE: theme.colors.red,
  ERROR: theme.colors.lightYellow,
} as const;

const modeTextColor: Record<ToastMode, string> = {
  SUCCESS: theme.colors.black,
  DELETE: theme.colors.white,
  ERROR: theme.colors.black,
} as const;

const Toast = ({ message, mode = 'SUCCESS' }: ToastProps) => {
  const { duration } = useToastStore();
  return (
    <StyleToast duration={duration}>
      <StyleToastMessage mode={mode}>
        <Top>
          <Icon name={icon[mode]} size="s" />
          <Text.Span
            fontSize={getRem(14)}
            weight="bold"
            style={{
              color: modeTextColor[mode],
            }}
          >
            {message}
          </Text.Span>
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
  background: ${({ mode }) => modeColor[mode]};
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
`;
