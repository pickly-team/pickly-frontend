import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import React from 'react';

type RoundToggleProps = {
  transitionMs?: number;
  style?: React.CSSProperties;
  isOn?: boolean;
  setOn: () => void;
  setOff: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const RoundToggle = ({
  transitionMs = 500,
  style,
  isOn = false,
  setOn,
  setOff,
}: RoundToggleProps) => {
  return (
    <Container
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        isOn ? setOff() : setOn();
      }}
      isOn={isOn}
      transitionMs={transitionMs}
    >
      <AnimatedLabel isOn={isOn} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  width: ${getRem(76)};
  height: ${getRem(34)};
  border-radius: 30px;
  ${({ isOn, transitionMs }: { isOn: boolean; transitionMs: number }) => css`
    background-color: ${isOn
      ? theme.colors.lightPrimary
      : theme.colors.grey600};
    transition: background-color ${transitionMs}ms ease-in-out;
  `}
`;

const AnimatedLabel = styled.label`
  ${({ isOn }: { isOn: boolean }) =>
    isOn
      ? css`
          --webkit-transform: translateX(38px);
          transform: translateX(38px);
          transition: 500ms;
          will-change: transition;
          border-radius: 100%;
        `
      : css`
          transition: 500ms;
          will-change: transition;
          border-radius: 100%;
        `}
  width: ${getRem(30)};
  height: ${getRem(30)};
  content: '';
  position: absolute;
  left: ${getRem(4)};
  top: calc(50% - ${getRem(15)});
  background-color: ${theme.colors.white};
  box-sizing: border-box;
`;

export default RoundToggle;
