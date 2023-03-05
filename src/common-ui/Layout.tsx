import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation from '@/common-ui/BottomNavigation';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutContainer>
      {children}
      <BottomNavigation />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
`;
