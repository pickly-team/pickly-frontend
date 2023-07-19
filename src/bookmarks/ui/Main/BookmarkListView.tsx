import useBookmarkList from '@/bookmarks/service/hooks/home/useBookmarkList';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import BookmarkList from './BookmarkList';
import BookmarkItem from './BookmarkItem';
import BookmarkSkeletonItem from './BookmarkSkeletonItem';
import BlankItem from '@/common-ui/BlankItem';
import BookmarkEditItem from './BookmarkEditItem';

interface BookmarkListViewProps {
  memberId: number;
  isReadMode: boolean;
  isEditMode: boolean;
  selectedCategory?: number | null;
  onClickBookmarkItemInEdit?: (bookmarkId: number) => void;
}

const BookmarkListView = ({
  memberId,
  isReadMode,
  isEditMode,
  selectedCategory,
  onClickBookmarkItemInEdit,
}: BookmarkListViewProps) => {
  const { bookMarkList, fetchNextPage, isFetchingNextPage } = useBookmarkList({
    readByUser: isReadMode,
    categoryId: selectedCategory,
    memberId,
  });

  const { bottom } = useBottomIntersection({
    fetchNextPage,
    enabled: !isFetchingNextPage,
  });

  const flatBookMarkList = bookMarkList?.pages.flatMap((page) => page.contents);

  return (
    <>
      {!flatBookMarkList?.length && (
        <>
          {!!isReadMode && <BlankItem page="BOOKMARK" />}
          {!isReadMode && <BlankItem page="BOOKMARK_READ" />}
        </>
      )}
      {!isEditMode && !!flatBookMarkList?.length && (
        <BookmarkList
          bookmarkList={flatBookMarkList?.filter(
            (bookmark) => bookmark.readByUser === isReadMode,
          )}
          renderItem={(bookmark) => (
            <BookmarkItem key={bookmark.bookmarkId} {...bookmark} />
          )}
        />
      )}
      {!!isEditMode && !!flatBookMarkList?.length && (
        <BookmarkList
          bookmarkList={flatBookMarkList.filter(
            (bookmark) => bookmark.readByUser === isReadMode,
          )}
          renderItem={(bookmark) => (
            <BookmarkEditItem
              onClickItem={() =>
                onClickBookmarkItemInEdit &&
                onClickBookmarkItemInEdit(bookmark.bookmarkId)
              }
              key={bookmark.bookmarkId}
              {...bookmark}
            />
          )}
        />
      )}
      <div ref={bottom} />
      {isFetchingNextPage &&
        Array.from({ length: 10 }).map((_, index) => (
          <BookmarkSkeletonItem key={index} />
        ))}
    </>
  );
};

export default BookmarkListView;
