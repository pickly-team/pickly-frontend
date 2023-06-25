import {
  useGETLikeBookmarkListQuery,
  usePUTLikeBookmarkMutation,
} from '@/bookmarks/api/like';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import BookmarkLikeItem from './BookmarkLikeItem';
import SkeletonBookmarkLikeList from './SkeletonBookmarkLikeList';

const BookmarkLikeList = () => {
  const USER_ID = 1;
  const {
    data: bookmarkList,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETLikeBookmarkListQuery({
    memberId: USER_ID,
    pageRequest: {
      cursorId: null,
      pageSize: 15,
    },
  });

  const { mutate } = usePUTLikeBookmarkMutation({ memberId: USER_ID });

  const onClickLike = (bookmarkId: number) => {
    mutate(bookmarkId);
  };

  const bookmarkItems = bookmarkList?.pages.flatMap((page) => page.contents);

  const { bottom } = useBottomIntersection({ fetchNextPage });
  return (
    <>
      {bookmarkItems &&
        bookmarkItems.map((bookmark) => (
          <BookmarkLikeItem
            key={bookmark.bookmarkId}
            {...bookmark}
            onClickLikeBtn={onClickLike}
          />
        ))}
      {isFetchingNextPage && <SkeletonBookmarkLikeList count={15} />}
      <div ref={bottom} />
    </>
  );
};

export default BookmarkLikeList;
