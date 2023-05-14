import styled from '@emotion/styled';

import BookmarkToggle from '@/bookmarks/ui/Main/BookmarkToggle';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BookmarkList from '@/bookmarks/ui/Main/BookmarkList';
import BookmarkItem from '@/bookmarks/ui/Main/BookmarkItem';
import BookmarkEditItem from '@/bookmarks/ui/Main/BookmarkEditItem';
import BookmarkBSDeleteConfirmation from '@/bookmarks/ui/Main/BookmarkBSDeleteConfirmation';
import BookmarkSkeletonItem from '@/bookmarks/ui/Main/BookmarkSkeletonItem';
import useCategory from '@/bookmarks/service/hooks/home/useCategory';
import useBookmarkList from '@/bookmarks/service/hooks/home/useBookmarkList';
import useReadList from '@/bookmarks/service/hooks/home/useReadList';
import useDeleteBookmarkList from '@/bookmarks/service/hooks/home/useDeleteBookmarkList';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import getRem from '@/utils/getRem';

const MainPage = () => {
  const { category, categoryOptions, onChangeCategory } = useCategory();

  const { isReadMode, onClickReadMode } = useReadList();

  const { bookMarkList, isLoading, fetchNextPage, isFetchingNextPage } =
    useBookmarkList({ readByUser: isReadMode });
  const { bottom } = useBottomIntersection({ fetchNextPage });

  const {
    isEditMode: isEdit,
    isDeleteBookmarkOpen,
    onClickBookmarkItemInEdit,
    onClickDelete,
    onClickEdit,
  } = useDeleteBookmarkList();

  const isEditMode = !isLoading && bookMarkList?.pages.length !== 0 && isEdit;

  return (
    <>
      <LTop>
        <BookmarkUserInfo userEmoji="😑" userName="까루" />
      </LTop>
      <BookmarkToggle>
        <BookmarkToggle.SelectCategory
          category={category}
          categoryOptions={categoryOptions}
          setCategoryId={onChangeCategory}
        />
        <BookmarkToggle.ToggleRead
          isRead={isReadMode}
          onChangeRead={onClickReadMode}
        />
        <BookmarkToggle.ToggleEdit isEdit={isEdit} onClickEdit={onClickEdit} />
      </BookmarkToggle>

      <LMiddle>
        {!!isLoading &&
          [1, 2, 3, 4, 5, 6].map((item) => <BookmarkSkeletonItem key={item} />)}
        {!isLoading && bookMarkList?.pages.length && (
          <>
            {!isEditMode &&
              bookMarkList.pages[0].contents[0]?.bookmarkId &&
              bookMarkList.pages.map((page) => (
                <BookmarkList
                  key={page.contents[0].bookmarkId}
                  bookmarkList={page.contents?.filter(
                    (item) => item.readByUser === isReadMode,
                  )}
                  renderItem={(bookMarkList) => (
                    <BookmarkItem
                      key={bookMarkList.bookmarkId}
                      {...bookMarkList}
                    />
                  )}
                />
              ))}
            {isEditMode &&
              bookMarkList.pages[0].contents[0].bookmarkId &&
              bookMarkList?.pages.map((page) => (
                <BookmarkList
                  key={page.contents[0]?.bookmarkId}
                  bookmarkList={page.contents?.filter(
                    (item) => item.readByUser === isReadMode,
                  )}
                  renderItem={(bookMarkList) => (
                    <BookmarkEditItem
                      key={bookMarkList.bookmarkId}
                      {...bookMarkList}
                      onClickItem={onClickBookmarkItemInEdit}
                    />
                  )}
                />
              ))}
          </>
        )}
        <div ref={bottom} />
        {isFetchingNextPage &&
          [1, 2, 3, 4, 5, 6].map((item) => <BookmarkSkeletonItem key={item} />)}
      </LMiddle>
      {/** 북마크 삭제 확인 */}
      <BookmarkBSDeleteConfirmation
        onClose={onClickDelete}
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
