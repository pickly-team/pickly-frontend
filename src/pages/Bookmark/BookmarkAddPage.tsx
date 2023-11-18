import { usePOSTBookmarkMutation } from '@/bookmarks/api/bookmark';
import useCategoryList from '@/bookmarks/service/hooks/add/useCategoryList';
import useInputUrl from '@/bookmarks/service/hooks/add/useInputUrl';
import useSelectCategory from '@/bookmarks/service/hooks/add/useSelectCategory';
import useSelectPublishScoped from '@/bookmarks/service/hooks/add/useSelectPublishScoped';
import BookmarkAdd from '@/bookmarks/ui/Bookmark/BookmarkAdd';
import Header from '@/common-ui/Header/Header';
import useToast from '@/common-ui/Toast/hooks/useToast';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import checkValidateURL from '@/utils/checkValidateURL';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const BookmarkAddPage = () => {
  // SERVER
  const { categoryList, setCategoryList, toggleCategory } = useCategoryList();
  const { initializeBookmarkInfo } = useBookmarkStore();
  // INITIALIZE
  const router = useNavigate();

  // 1. URL & 북마크 Title 입력
  const {
    url,
    title,
    thumbnail,
    isLoadingGetTitle,
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
  const { mutate: postBookmark, isLoading: isPostLoading } =
    usePOSTBookmarkMutation({
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

  const { fireToast } = useToast();

  const onClickSubmitButton = () => {
    // 로딩 중이면 클릭 무시
    if (isPostLoading) return;

    // 모든 입력이 완료되지 않았다면 클릭 무시
    if (!isAllWritten) {
      if (!url.length) {
        fireToast({ mode: 'ERROR', message: '앗! URL을 입력해주세요' });
        return;
      }
      if (!selectedCategoryId) {
        fireToast({ mode: 'ERROR', message: '앗! 카테고리를 선택해주세요' });
        return;
      }
      return;
    }

    postBookmark({
      url: checkValidateURL(url) ? checkValidateURL(url) : '',
      title,
      thumbnail,
      categoryId: Number(selectedCategoryId),
      visibility: selectedPublishScoped,
      memberId,
    });
    router(-1);
  };
  return (
    <>
      <Header
        showBackButton
        backButtonCallback={() => initializeBookmarkInfo()}
      />
      <Wrapper>
        <BookmarkAdd.URLInput
          url={url}
          title={title}
          isValidateUrl={isValidateUrl.length > 0}
          onChangeUrl={onChangeUrl}
          onChangeTitle={onChangeTitle}
          handleKeyDown={handleKeyDown}
          onDeleteInput={onDeleteInput}
          isLoadingGetTitle={isLoadingGetTitle}
        />
        <BookmarkAdd.SelectCategory
          categoryList={categoryList}
          selectedCategoryId={selectedCategoryId}
          onClickCategory={onClickCategory}
        />
        <BookmarkAdd.PublishScoped
          selectedPublishScoped={selectedPublishScoped}
          onClickPublishScoped={onClickPublishScoped}
        />
        <BookmarkAdd.SubmitButton
          onClick={onClickSubmitButton}
          isAllWritten={isAllWritten}
        />
      </Wrapper>
    </>
  );
};

export default BookmarkAddPage;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;
