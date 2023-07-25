import styled from '@emotion/styled';

import BookmarkToggle from '@/bookmarks/ui/Main/BookmarkToggle';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BookmarkBSDeleteConfirmation from '@/bookmarks/ui/Main/BookmarkBSDeleteConfirmation';
import useCategory from '@/bookmarks/service/hooks/home/useCategory';
import useReadList, {
  READ_OPTIONS,
} from '@/bookmarks/service/hooks/home/useReadList';
import useDeleteBookmarkList from '@/bookmarks/service/hooks/home/useDeleteBookmarkList';
import getRem from '@/utils/getRem';
import useAuthStore from '@/store/auth';
import BookmarkListView from '@/bookmarks/ui/Main/BookmarkListView';
import { Suspense } from 'react';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import BookmarkSkeletonItem from '@/bookmarks/ui/Main/BookmarkSkeletonItem';

const MainPage = () => {
  const { memberId, userInfo } = useAuthStore();
  const { selectedCategoryId, categoryOptions, onChangeCategory } = useCategory(
    {
      memberId,
    },
  );

  const { readSelectOptionsList, selectedReadOption, onClickReadMode } =
    useReadList();

  const {
    isEditMode: isEdit,
    isDeleteBookmarkOpen,
    onClickBookmarkItemInEdit,
    onClickDelete,
    onClickEdit,
    deleteBookmarkClose,
  } = useDeleteBookmarkList({ categoryId: selectedCategoryId });

  return (
    <>
      <LTop>
        <BookmarkUserInfo
          userEmoji={userInfo.profileEmoji}
          userName={userInfo.nickname}
        />
      </LTop>
      <BookmarkToggle>
        <BookmarkToggle.SelectCategory
          selectedCategory={String(selectedCategoryId)}
          categoryOptions={categoryOptions}
          setCategoryId={onChangeCategory}
        />
        <BookmarkToggle.SelectReadMode
          readOptions={readSelectOptionsList}
          selectedReadOption={selectedReadOption}
          onChangeRead={onClickReadMode}
        />
        <BookmarkToggle.ToggleEdit isEdit={isEdit} onClickEdit={onClickEdit} />
      </BookmarkToggle>
      <LMiddle>
        <Suspense
          fallback={
            <SkeletonWrapper>
              {Array.from({ length: 10 }).map((_, index) => (
                <BookmarkSkeletonItem key={index} />
              ))}
            </SkeletonWrapper>
          }
        >
          <BookmarkListView
            memberId={memberId}
            isEditMode={isEdit}
            isReadMode={READ_OPTIONS[selectedReadOption ?? '📖 전체']}
            selectedCategory={selectedCategoryId}
            onClickBookmarkItemInEdit={onClickBookmarkItemInEdit}
          />
        </Suspense>
      </LMiddle>
      {/** 북마크 삭제 확인 */}
      <BookmarkBSDeleteConfirmation
        onClose={deleteBookmarkClose}
        onDelete={onClickDelete}
        open={isDeleteBookmarkOpen}
      />
    </>
  );
};

export default MainPage;

const LTop = styled.div`
  padding: ${getRem(20)} ${getRem(20)} 0 ${getRem(20)};
`;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
