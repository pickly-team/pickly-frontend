import { navigatePath } from '@/constant/navigatePath';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import Icon from './assets/Icon';

// TODO : 네비게이터에 대한 path를 재정의 필요

/**
 *
 * @returns 하단 네비게이션 바
 * @example
 * <BottomNavigation />
 */

const BottomNavigation = () => {
  const { pathname } = useLocation();

  return (
    <>
      <NavigationWrapper>
        <Link to="/" css={plusButton}>
          <Icon name="plus-dark" size="m" />
        </Link>
        <Link to={navigatePath.MAIN} css={iconStyle}>
          {pathname === `${navigatePath.MAIN}` && (
            <Icon size="l" name="list-green" />
          )}
          {pathname !== `${navigatePath.MAIN}` && <Icon size="l" name="list" />}
        </Link>
        <Link to="/friend" css={iconStyle}>
          {pathname === `${navigatePath.FRIEND}` && (
            <Icon size="l" name="people-green" />
          )}
          {pathname !== `${navigatePath.FRIEND}` && (
            <Icon size="l" name="people" />
          )}
        </Link>
        <Link to="/alarm" css={iconStyle}>
          {pathname === `${navigatePath.ALARM}` && (
            <Icon size="m" name="alarm-green" />
          )}
          {pathname !== `${navigatePath.ALARM}` && (
            <Icon size="m" name="alarm" />
          )}
        </Link>
        <Link to="/profile" css={iconStyle}>
          {pathname === `${navigatePath.PROFILE}` && (
            <Icon size="m" name="profile-green" />
          )}
          {pathname !== `${navigatePath.PROFILE}` && (
            <Icon size="m" name="profile" />
          )}
        </Link>
      </NavigationWrapper>
    </>
  );
};

export default BottomNavigation;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.grey900};
  z-index: 10;
  height: 5rem;
`;

const iconStyle = css`
  cursor: pointer;
  width: 3rem;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const plusButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 4rem;

  background-color: ${theme.colors.lightPrimary};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  &:active {
    background-color: ${theme.colors.primary};
  }
`;
