import useBookmarkList from '@/bookmarks/service/hooks/home/useBookmarkList';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import BookmarkList from './BookmarkList';
import BookmarkItem from './BookmarkItem';
import BookmarkSkeletonItem from './BookmarkSkeletonItem';
import BlankItem from '@/common-ui/BlankItem';
import BookmarkEditItem from './BookmarkEditItem';
import {
  READ_OPTION,
  READ_OPTIONS,
} from '@/bookmarks/service/hooks/home/useReadList';

interface BookmarkListViewProps {
  memberId: number;
  readMode: READ_OPTION;
  isEditMode: boolean;
  selectedCategory?: number | null;
  onClickBookmarkItemInEdit?: (bookmarkId: number) => void;
}

const BookmarkListView = ({
  memberId,
  readMode,
  isEditMode,
  selectedCategory,
  onClickBookmarkItemInEdit,
}: BookmarkListViewProps) => {
  const { bookMarkList, fetchNextPage, isFetchingNextPage } = useBookmarkList({
    readByUser: READ_OPTIONS[readMode],
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
          {readMode === '📖 전체' && <BlankItem page="BOOKMARK" />}
          {readMode === '👀 읽음' && <BlankItem page="BOOKMARK" />}
          {readMode === '🫣 읽지 않음' && <BlankItem page="BOOKMARK_READ" />}
        </>
      )}
      {!isEditMode && !!flatBookMarkList?.length && (
        <BookmarkList
          bookmarkList={
            READ_OPTIONS[readMode] !== null
              ? flatBookMarkList.filter(
                  (bookmark) => bookmark.readByUser === READ_OPTIONS[readMode],
                )
              : flatBookMarkList
          }
          renderItem={(bookmark) => (
            <BookmarkItem key={bookmark.bookmarkId} {...bookmark} />
          )}
        />
      )}
      {!!isEditMode && !!flatBookMarkList?.length && (
        <BookmarkList
          bookmarkList={
            READ_OPTIONS[readMode] !== null
              ? flatBookMarkList.filter(
                  (bookmark) => bookmark.readByUser === READ_OPTIONS[readMode],
                )
              : flatBookMarkList
          }
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
