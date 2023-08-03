import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation from '@/common-ui/BottomNavigation';
import { NavigatePath } from '@/constants/navigatePath';

export const SHOW_BOTTOM_NAVIGATION_URL: NavigatePath[] = [
  'MainPage',
  'CategoryManagePage',
  'BookmarkAddPage',
  'BookmarkDetailPage',
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutContainer>
      <InnerWrapper>{children}</InnerWrapper>
      <BottomNavigation />
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
  height: 100dvh;
  overflow: auto;
`;
