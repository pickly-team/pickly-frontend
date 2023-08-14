import { navigatePath } from '@/constants/navigatePath';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './assets/Icon';
import { BOTTOM_NAVIGATION_Z_INDEX } from '@/constants/zIndex';
import { BsBookFill } from 'react-icons/bs';
import { useGETNotificationListQuery } from '@/notification/api/notification';
import useAuthStore from '@/store/auth';
import useWebview from '@/common/service/hooks/useWebview';

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
  const { memberId } = useAuthStore();
  const { data: notificationList } = useGETNotificationListQuery({ memberId });
  const isCheckNotification = notificationList?.some(
    (notification) => !notification.isChecked,
  );

  const { postMessage } = useWebview();

  const onClickLink = () => {
    postMessage('vibrate', null);
  };

  return (
    <>
      <NavigationWrapper>
        <button onClick={onClickAddButton} css={plusButton}>
          <Icon name="plus" size="m" />
        </button>
        <StyledLink
          onClick={onClickLink}
          to={navigatePath.MAIN}
          css={iconStyle}
        >
          {pathname === `${navigatePath.MAIN}` && (
            <BsBookFill size={24} color={theme.colors.lightPrimary} />
          )}
          {pathname !== `${navigatePath.MAIN}` && (
            <BsBookFill size={24} color={theme.colors.white} />
          )}
        </StyledLink>
        <StyledLink onClick={onClickLink} to="/friend" css={iconStyle}>
          {pathname === `${navigatePath.FRIEND}` && (
            <Icon size="l" name="people-green" />
          )}
          {pathname !== `${navigatePath.FRIEND}` && (
            <Icon size="l" name="people" />
          )}
        </StyledLink>
        {!!isCheckNotification && (
          <NotificationWithRedDot>
            <StyledLink
              onClick={onClickLink}
              to="/notification"
              css={iconStyle}
            >
              {pathname === `${navigatePath.NOTIFICATION}` && (
                <Icon size="m" name="alarm-green" />
              )}
              {pathname !== `${navigatePath.NOTIFICATION}` && (
                <Icon size="m" name="alarm" />
              )}
            </StyledLink>
            <RedDot />
          </NotificationWithRedDot>
        )}
        {!isCheckNotification && (
          <StyledLink onClick={onClickLink} to="/notification" css={iconStyle}>
            {pathname === `${navigatePath.NOTIFICATION}` && (
              <Icon size="m" name="alarm-green" />
            )}
            {pathname !== `${navigatePath.NOTIFICATION}` && (
              <Icon size="m" name="alarm" />
            )}
          </StyledLink>
        )}
        <StyledLink onClick={onClickLink} to="/profile" css={iconStyle}>
          {pathname === `${navigatePath.PROFILE}` && (
            <Icon size="m" name="profile-green" />
          )}
          {pathname !== `${navigatePath.PROFILE}` && (
            <Icon size="m" name="profile" />
          )}
        </StyledLink>
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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
`;

const NotificationWithRedDot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
`;

const RedDot = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${theme.colors.red};
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
