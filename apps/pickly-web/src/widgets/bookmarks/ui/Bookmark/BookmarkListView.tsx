import useBookmarkList from '@/widgets/bookmarks/service/hooks/home/useBookmarkList';

import BookmarkList from './BookmarkList';
import BookmarkItem from './BookmarkItem';
import BookmarkSkeletonItem from './BookmarkSkeletonItem';

import BookmarkEditItem from './BookmarkEditItem';
import {
  READ_OPTION,
  READ_OPTIONS,
} from '@/widgets/bookmarks/service/hooks/home/useReadList';
import useBottomIntersection from '@/shared/common/service/hooks/useBottomIntersection';
import BlankItem from '@/shared/ui/BlankItem/BlankItem';

interface BookmarkListViewProps {
  memberId: number;
  readMode: READ_OPTION;
  isEditMode: boolean;
  selectedCategory: number | null;
  onClickBookmarkItemInEdit?: (bookmarkId: number) => void;
}

const BookmarkListView = ({
  memberId,
  readMode,
  isEditMode,
  selectedCategory,
  onClickBookmarkItemInEdit,
}: BookmarkListViewProps) => {
  const { bookMarkList, fetchNextPage, isFetchingNextPage, isLoading } =
    useBookmarkList({
      readByUser: readMode,
      categoryId: selectedCategory,
      memberId,
    });

  const { bottom } = useBottomIntersection({
    fetchNextPage,
    enabled: !isFetchingNextPage && memberId !== 0,
  });

  const flatBookMarkList = bookMarkList?.pages.flatMap((page) => page.contents);

  return (
    <>
      {!isLoading && !flatBookMarkList?.length && (
        <>
          {readMode === '💡 모두보기' && <BlankItem page="BOOKMARK" />}
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
