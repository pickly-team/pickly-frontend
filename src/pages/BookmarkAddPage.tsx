import { usePOSTBookmarkMutation } from '@/bookmarks/api/bookmark';
import useCategoryList from '@/bookmarks/service/hooks/add/useCategoryList';
import useInputUrl from '@/bookmarks/service/hooks/add/useInputUrl';
import useSelectCategory from '@/bookmarks/service/hooks/add/useSelectCategory';
import useSelectPublishScoped from '@/bookmarks/service/hooks/add/useSelectPublishScoped';
import BookmarkAddBS from '@/bookmarks/ui/Main/BookmarkAddBS';
import Header from '@/common-ui/Header/Header';
import useAuthStore from '@/store/auth';
import checkValidateURL from '@/utils/checkValidateURL';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';

const BookmarkAddPage: ActivityComponentType = () => {
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
  } = useInputUrl({});

  // 2. 카테고리 선택
  const { setSelectedCategoryId, selectedCategoryId } = useSelectCategory({});

  // 3. 공개 범위 선택
  const { onClickPublishScoped, selectedPublishScoped } =
    useSelectPublishScoped({});

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

  const { memberId } = useAuthStore();
  const { mutate: postBookmark } = usePOSTBookmarkMutation({
    resetAll: {
      resetAllInputs,
      resetCategory: () => {
        setSelectedCategoryId(0);
        setCategoryList(toggleCategory(0));
      },
      resetVisibility: () => onClickPublishScoped('SCOPE_PUBLIC'),
    },
    memberId,
  });

  const onClickSubmitButton = () => {
    postBookmark({
      url: checkValidateURL(url) ? checkValidateURL(url) : '',
      title,
      categoryId: Number(selectedCategoryId),
      visibility: selectedPublishScoped,
      memberId,
    });
    close();
  };
  return (
    <AppScreen preventSwipeBack>
      <Header showBackButton />
      <Wrapper>
        <BookmarkAddBS.URLInput
          url={url}
          title={title}
          isValidateUrl={isValidateUrl.length > 0}
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
      </Wrapper>
    </AppScreen>
  );
};

export default BookmarkAddPage;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;
