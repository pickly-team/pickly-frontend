import {
  useGETBookmarkDetailQuery,
  usePUTBookmarkQuery,
} from '@/bookmarks/api/bookmark';
import useCategoryList from '@/bookmarks/service/hooks/add/useCategoryList';
import useInputUrl from '@/bookmarks/service/hooks/add/useInputUrl';
import useSelectCategory from '@/bookmarks/service/hooks/add/useSelectCategory';
import useSelectPublishScoped from '@/bookmarks/service/hooks/add/useSelectPublishScoped';
import BookmarkAddBS from '@/bookmarks/ui/Main/BookmarkAddBS';
import Header from '@/common-ui/Header/Header';
import useToast from '@/common-ui/Toast/hooks/useToast';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import checkValidateURL from '@/utils/checkValidateURL';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

const BookmarkEditPage = () => {
  const router = useNavigate();
  const { initializeUrlAndTitle } = useBookmarkStore();
  const { id: bookmarkId } = useParams<{ id: string }>();
  const { memberId } = useAuthStore();
  const { data: bookmarkDetail } = useGETBookmarkDetailQuery({
    bookmarkId: bookmarkId ?? '',
    memberId,
  });

  // SERVER
  const { categoryList, toggleCategory } = useCategoryList(
    bookmarkDetail?.categoryId,
  );
  // 1. URL & 북마크 Title 입력
  const {
    url,
    title,
    isLoadingGetTitle,
    onChangeUrl,
    onChangeTitle,
    handleKeyDown,
    onDeleteInput,
  } = useInputUrl({
    defaultUrl: bookmarkDetail?.url ?? '',
    defaultTitle: bookmarkDetail?.title ?? '',
  });

  // 2. 카테고리 선택
  const { setSelectedCategoryId, selectedCategoryId } = useSelectCategory({
    defaultCategoryId: bookmarkDetail?.categoryId ?? 0,
  });

  // 3. 공개 범위 선택
  const { onClickPublishScoped, selectedPublishScoped } =
    useSelectPublishScoped({
      defaultPublishScoped: bookmarkDetail?.visibility ?? 'SCOPE_PUBLIC',
    });

  const onClickCategory = (id: number) => {
    // 새로운 카테고리 선택
    setSelectedCategoryId(id);
    // 선택된 카테고리 변경
    toggleCategory(id);
  };

  // VALIDATION
  const isValidateUrl = checkValidateURL(url);
  const isAllWritten = !!(url && selectedCategoryId && selectedPublishScoped);

  const { mutate: putBookmark } = usePUTBookmarkQuery({
    bookmarkId: bookmarkId ?? '',
    memberId,
  });

  const { fireToast } = useToast();

  const onSubmitBookmark = () => {
    if (!isAllWritten) {
      if (!url.length) {
        fireToast({ mode: 'ERROR', message: '앗! URL을 입력해주세요' });
        return;
      }
      if (!title.length) {
        fireToast({ mode: 'ERROR', message: '앗! 제목을 입력해주세요' });
        return;
      }
      if (!selectedCategoryId) {
        fireToast({ mode: 'ERROR', message: '앗! 카테고리를 선택해주세요' });
        return;
      }
      return;
    }
    putBookmark({
      bookmarkId: bookmarkId ?? '',
      putData: {
        categoryId: String(selectedCategoryId) ?? 0,
        title: title,
        readByUser: true,
        visibility: selectedPublishScoped,
      },
    });
    router(-1);
  };
  return (
    <>
      <Header
        showBackButton
        backButtonCallback={() => initializeUrlAndTitle()}
      />
      <Wrapper>
        <BookmarkAddBS.URLInput
          url={url}
          title={title}
          isValidateUrl={isValidateUrl.length > 0}
          isLoadingGetTitle={isLoadingGetTitle}
          onChangeUrl={onChangeUrl}
          onChangeTitle={onChangeTitle}
          handleKeyDown={handleKeyDown}
          onDeleteInput={onDeleteInput}
        />
        <BookmarkAddBS.SelectCategory
          categoryList={categoryList}
          selectedCategoryId={selectedCategoryId}
          onClickCategory={onClickCategory}
        />
        <BookmarkAddBS.PublishScoped
          selectedPublishScoped={selectedPublishScoped}
          onClickPublishScoped={onClickPublishScoped}
        />
        <BookmarkAddBS.SubmitButton
          onClick={onSubmitBookmark}
          isAllWritten={isAllWritten}
        />
      </Wrapper>
    </>
  );
};

export default BookmarkEditPage;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;
