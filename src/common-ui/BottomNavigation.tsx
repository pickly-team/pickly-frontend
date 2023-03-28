import { navigatePath } from '@/constants/navigatePath';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import Icon from './assets/Icon';
import { BOTTOM_NAVIGATION_Z_INDEX } from '@/constants/zIndex';
import BookmarkAddBS from '@/bookmarks/ui/Main/BookmarkAddBS';
import useBottomSheet from './BottomSheet/hooks/useBottomSheet';
import useBookmarkAddHandler from '@/bookmarks/service/hooks/useBookmarkAddHandler';

// TODO : 네비게이터에 대한 path를 재정의 필요

/**
 *
 * @returns 하단 네비게이션 바
 * @example
 * <BottomNavigation />
 */

const BottomNavigation = () => {
  const { pathname } = useLocation();

  const { close, isOpen, open } = useBottomSheet();
  const onClickAddButton = () => {
    open();
  };

  const {
    categoryList,
    isValidateUrl,
    onChangeUrl,
    onClickCategory,
    onClickDisClosure,
    selectedDisClosure,
    url,
    isAllWritten,
  } = useBookmarkAddHandler();

  return (
    <>
      <BookmarkAddBS isOpen={isOpen} close={close}>
        <BookmarkAddBS.URLInput
          url={url}
          onChangeUrl={onChangeUrl}
          isValidateUrl={isValidateUrl}
        />
        <BookmarkAddBS.SelectCategory
          categoryList={categoryList}
          onClickCategory={onClickCategory}
        />
        <BookmarkAddBS.DisclosureScope
          selectedDisClosure={selectedDisClosure}
          onClickDisClosure={onClickDisClosure}
        />
        <BookmarkAddBS.SubmitButton
          onClick={close}
          isAllWritten={isAllWritten}
        />
      </BookmarkAddBS>
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
