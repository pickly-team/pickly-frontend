import styled from '@emotion/styled';

import useCategory from '@/widgets/bookmarks/service/hooks/home/useCategory';
import useDeleteBookmarkList from '@/widgets/bookmarks/service/hooks/home/useDeleteBookmarkList';
import useReadList from '@/widgets/bookmarks/service/hooks/home/useReadList';
import BSDeleteConfirmation from '@/widgets/bookmarks/ui/Bookmark/BSDeleteConfirmation';
import BookmarkListView from '@/widgets/bookmarks/ui/Bookmark/BookmarkListView';
import BookmarkSkeletonItem from '@/widgets/bookmarks/ui/Bookmark/BookmarkSkeletonItem';
import BookmarkToggle from '@/widgets/bookmarks/ui/Bookmark/BookmarkToggle';

import useAuthStore from '@/shared/store/auth';
import { Suspense } from 'react';
import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import { Header, PullToRefresh, SkeletonWrapper } from '@pickly/design-system';

const BookmarkPage = () => {
  const { memberId } = useAuthStore();
  const { selectedCategoryId, categoryOptions, onChangeCategory } = useCategory(
    {
      memberId,
    },
  );

  const { readSelectOptionsList, selectedReadOption, onClickReadMode } =
    useReadList({ memberId });

  const {
    isEditMode: isEdit,
    isDeleteBookmarkOpen,
    onClickBookmarkItemInEdit,
    onClickDelete,
    onClickEdit,
    deleteBookmarkClose,
  } = useDeleteBookmarkList();

  const { handleRefresh } = useHandleRefresh({ pageType: 'BOOKMARK' });

  return (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        <Header showBackButton />
        <BookmarkToggle>
          <BookmarkToggle.SelectCategory
            selectedCategoryId={selectedCategoryId}
            categoryOptions={categoryOptions}
            setCategoryId={onChangeCategory}
          />
          <BookmarkToggle.SelectReadMode
            selectedReadOption={selectedReadOption}
            readOptions={readSelectOptionsList}
            onChangeRead={onClickReadMode}
          />
          <BookmarkToggle.ToggleEdit
            isEdit={isEdit}
            onClickEdit={onClickEdit}
          />
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
              readMode={selectedReadOption}
              selectedCategory={selectedCategoryId}
              onClickBookmarkItemInEdit={onClickBookmarkItemInEdit}
            />
          </Suspense>
        </LMiddle>
        {/** 북마크 삭제 확인 */}
        <BSDeleteConfirmation
          onClose={deleteBookmarkClose}
          onDelete={onClickDelete}
          open={isDeleteBookmarkOpen}
        />
      </PullToRefresh>
    </>
  );
};

export default BookmarkPage;

const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
