import React from 'react';
import styled from '@emotion/styled';

import { ColorType, theme } from '@/styles/theme';

const RoundedBox = ({
  children,
  style,
  backgroundColor = 'white',
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  backgroundColor?: ColorType;
}) => {
  return (
    <StyledRoundedBox
      style={{
        backgroundColor: theme.colors[backgroundColor],
        ...style,
      }}
    >
      {children}
    </StyledRoundedBox>
  );
};

const StyledRoundedBox = styled.div`
  padding: 1.25rem;
  border-radius: 0.625rem;
`;

export default RoundedBox;
