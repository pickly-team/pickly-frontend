import { navigatePath } from '@/constants/navigatePath';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './assets/Icon';
import { BOTTOM_NAVIGATION_Z_INDEX } from '@/constants/zIndex';
import BookmarkAddBS from '@/bookmarks/ui/Main/BookmarkAddBS';
import useBottomSheet from './BottomSheet/hooks/useBottomSheet';
import useInputUrl from '@/bookmarks/service/hooks/add/useInputUrl';
import useSelectCategory from '@/bookmarks/service/hooks/add/useSelectCategory';
import useSelectPublishScoped from '@/bookmarks/service/hooks/add/useSelectPublishScoped';
import useCategoryList from '@/bookmarks/service/hooks/add/useCategoryList';
import { useEffect } from 'react';
import { usePOSTBookmarkMutation } from '@/bookmarks/api/bookmark';
import checkValidateURL from '@/utils/checkValidateURL';
import ToastList from './Toast/ToastList';

// TODO : 네비게이터에 대한 path를 재정의 필요

/**
 *
 * @returns 하단 네비게이션 바
 * @example
 * <BottomNavigation />
 */

const BottomNavigation = () => {
  const { pathname } = useLocation();

  // SERVER
  const { categoryList, setCategoryList, toggleCategory } = useCategoryList();
  // 1. URL & 북마크 Title 입력
  const {
    url,
    title,
    onChangeUrl,
    onChangeTitle,
    handleKeyDown,
    onDeleteInput,
    resetAllInputs,
  } = useInputUrl();

  // 2. 카테고리 선택
  const { setSelectedCategoryId, selectedCategoryId } = useSelectCategory();

  // 3. 공개 범위 선택
  const { onClickPublishScoped, selectedPublishScoped } =
    useSelectPublishScoped();

  // 2. 카테고리 변경
  const onClickCategory = (id: number) => {
    // 새로운 카테고리 선택
    setSelectedCategoryId(id);
    // 선택된 카테고리 변경
    setCategoryList(toggleCategory(id));
  };

  // VALIDATION
  const isValidateUrl = checkValidateURL(url);
  const isAllWritten = !!(
    url &&
    isValidateUrl &&
    selectedCategoryId &&
    selectedPublishScoped
  );

  const { isOpen, close, open } = useBottomSheet();
  const onClickAddButton = () => {
    open();
  };

  const routerLocation = useLocation().state as {
    isCategoryAddPage: boolean;
  };

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (routerLocation?.isCategoryAddPage === true) {
      open();
      navigate(location.pathname, {
        state: { fromPath: location.pathname },
      });
    }
  }, []);

  const MEMBER_ID = 1; // TODO : 로그인 기능 구현 후 수정 필요
  const { mutate: postBookmark } = usePOSTBookmarkMutation({
    resetAll: {
      resetAllInputs,
      resetCategory: () => {
        setSelectedCategoryId(0);
        setCategoryList(toggleCategory(0));
      },
      resetVisibility: () => onClickPublishScoped('SCOPE_PUBLIC'),
    },
    memberId: MEMBER_ID,
    categoryId: Number(selectedCategoryId),
  });

  const onClickSubmitButton = () => {
    postBookmark({
      url,
      title,
      categoryId: Number(selectedCategoryId),
      visibility: selectedPublishScoped,
      memberId: MEMBER_ID,
    });
    close();
  };

  return (
    <>
      <BookmarkAddBS isOpen={isOpen} close={close}>
        <ToastList />
        <BookmarkAddBS.URLInput
          url={url}
          title={title}
          isValidateUrl={isValidateUrl}
          onChangeUrl={onChangeUrl}
          onChangeTitle={onChangeTitle}
          handleKeyDown={handleKeyDown}
          onDeleteInput={onDeleteInput}
        />
        <BookmarkAddBS.SelectCategory
          categoryList={categoryList}
          onClickCategory={onClickCategory}
        />
        <BookmarkAddBS.PublishScoped
          selectedPublishScoped={selectedPublishScoped}
          onClickPublishScoped={onClickPublishScoped}
        />
        <BookmarkAddBS.SubmitButton
          onClick={onClickSubmitButton}
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
