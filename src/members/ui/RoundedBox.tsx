import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ColorType, theme } from '@/styles/theme';
import getRem from '@/utils/getRem';

const RoundedBox = ({
  children,
  style,
  backgroundColor = 'white',
  borderColor,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  backgroundColor?: ColorType;
  borderColor?: ColorType;
  onClick?: () => void;
}) => {
  return (
    <StyledRoundedBox
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </StyledRoundedBox>
  );
};

const StyledRoundedBox = styled.div`
  padding: ${getRem(20)};
  border-radius: 0.625rem;
  ${({
    backgroundColor,
    borderColor,
  }: {
    backgroundColor: ColorType;
    borderColor?: ColorType;
  }) => {
    return css`
      background-color: ${theme.colors[backgroundColor]};
      ${borderColor &&
      css`
        border: 3px solid ${theme.colors[borderColor]};
      `}
    `;
  }}
`;

export default RoundedBox;
