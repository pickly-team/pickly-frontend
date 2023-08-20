import { ReactNode, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import BottomNavigation from '@/common-ui/BottomNavigation';
import { navigatePath, NavigatePath } from '@/constants/navigatePath';
import { useLocation } from 'react-router-dom';

const SHOW_BOTTOM_NAVIGATION_URL: NavigatePath[] = [
  navigatePath.MAIN,
  navigatePath.FRIEND,
  navigatePath.NOTIFICATION,
  navigatePath.PROFILE,
];

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isShowBottomNavigation = SHOW_BOTTOM_NAVIGATION_URL.includes(
    pathname as NavigatePath,
  );

  const ref = useRef<HTMLDivElement>(null);

  const loadScroll = () => {
    const scroll = sessionStorage.getItem('scroll');
    if (scroll && ref.current && pathname === '/') {
      ref.current?.scrollTo({
        top: Number(scroll),
        behavior: 'instant',
      });
    }
  };

  useEffect(() => {
    if (ref.current && pathname.includes('bookmark')) {
      ref.current.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && ref.current.scrollTop > 0) {
        sessionStorage.setItem('scroll', ref.current.scrollTop.toString());
      }
    };

    if (ref.current && pathname === '/') {
      ref.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref.current && pathname === '/') {
        ref.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  useEffect(() => {
    loadScroll();
  }, [pathname]);

  return (
    <LayoutContainer>
      <InnerWrapper ref={ref}>{children}</InnerWrapper>
      {isShowBottomNavigation && <BottomNavigation />}
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  height: 100dvh;
  overflow: auto;
`;
