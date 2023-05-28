import {
  useGETLikeBookmarkListQuery,
  usePUTLikeBookmarkMutation,
} from '@/bookmarks/api/like';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import BookmarkLikeItem from './BookmarkLikeItem';

const BookmarkLikeList = () => {
  const USER_ID = 1;
  const { data: bookmarkList, fetchNextPage } = useGETLikeBookmarkListQuery({
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

  const bookmarkItems = bookmarkList?.pages.flatMap((page) => page.data);

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
      <div ref={bottom} />
    </>
  );
};

export default BookmarkLikeList;
