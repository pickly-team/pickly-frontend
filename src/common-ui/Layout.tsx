import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const Layout = ({ children }: { children: ReactNode }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
`;