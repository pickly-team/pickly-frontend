import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation from '@/common-ui/BottomNavigation';
import { navigatePath, NavigatePath } from '@/constants/navigatePath';
import { useLocation } from 'react-router-dom';

const SHOW_BOTTOM_NAVIGATION_URL: NavigatePath[] = [navigatePath.MAIN];

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isShowBottomNavigation = SHOW_BOTTOM_NAVIGATION_URL.includes(
    pathname as NavigatePath,
  );

  return (
    <LayoutContainer>
      <InnerWrapper>{children}</InnerWrapper>
      {isShowBottomNavigation && <BottomNavigation />}
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  height: 100vh;
  overflow: auto;
`;
