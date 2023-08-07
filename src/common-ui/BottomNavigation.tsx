import { navigatePath } from '@/constants/navigatePath';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './assets/Icon';
import { BOTTOM_NAVIGATION_Z_INDEX } from '@/constants/zIndex';

/**
 *
 * @returns 하단 네비게이션 바
 * @example
 * <BottomNavigation />
 */

const BottomNavigation = () => {
  const { pathname } = useLocation();
  const router = useNavigate();

  const onClickAddButton = () => {
    router(navigatePath.BOOKMARK_ADD);
  };

  return (
    <>
      <NavigationWrapper>
        <button onClick={onClickAddButton} css={plusButton}>
          <Icon name="plus" size="m" />
        </button>
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
        <Link to={navigatePath.NOTIFICATION} css={iconStyle}>
          {pathname === `${navigatePath.NOTIFICATION}` && (
            <Icon size="m" name="alarm-green" />
          )}
          {pathname !== `${navigatePath.NOTIFICATION}` && (
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
  max-width: 480px;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.grey900};
  z-index: ${BOTTOM_NAVIGATION_Z_INDEX};
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
  bottom: 3rem;

  background-color: ${theme.colors.lightPrimary};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  &:active {
    background-color: ${theme.colors.primary};
  }
`;
