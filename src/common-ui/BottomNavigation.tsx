import { NavigatePathKey } from '@/constants/navigatePath';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icon from './assets/Icon';
import { BOTTOM_NAVIGATION_Z_INDEX } from '@/constants/zIndex';
import { useActivity } from '@stackflow/react';
import { useFlow } from './stackflow';

/**
 *
 * @returns 하단 네비게이션 바
 * @example
 * <BottomNavigation />
 */

const BottomNavigation = () => {
  const onClickAddButton = () => {
    push('BookmarkAddPage', {});
  };
  const { replace, push } = useFlow();
  const { name } = useActivity();

  const onClickBottomNavigation = (path: NavigatePathKey) => {
    replace(
      path,
      {},
      {
        animate: false,
      },
    );
  };

  return (
    <>
      <NavigationWrapper>
        <button onClick={onClickAddButton} css={plusButton}>
          <Icon name="plus" size="m" />
        </button>
        <div
          onClick={() => onClickBottomNavigation('MainPage')}
          css={iconStyle}
        >
          {name === 'MainPage' && <Icon size="l" name="list-green" />}
          {name !== 'MainPage' && <Icon size="l" name="list" />}
        </div>
        <div
          onClick={() => onClickBottomNavigation('FriendPage')}
          css={iconStyle}
        >
          {name === 'FriendPage' && <Icon size="l" name="people-green" />}
          {name !== 'FriendPage' && <Icon size="l" name="people" />}
        </div>
        <div
          onClick={() => onClickBottomNavigation('NotificationPage')}
          css={iconStyle}
        >
          {name === 'NotificationPage' && <Icon size="m" name="alarm-green" />}
          {name !== 'NotificationPage' && <Icon size="m" name="alarm" />}
        </div>
        <div
          onClick={() => onClickBottomNavigation('ProfilePage')}
          css={iconStyle}
        >
          {name === 'ProfilePage' && <Icon size="m" name="profile-green" />}
          {name !== 'ProfilePage' && <Icon size="m" name="profile" />}
        </div>
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
  bottom: -1px;
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
