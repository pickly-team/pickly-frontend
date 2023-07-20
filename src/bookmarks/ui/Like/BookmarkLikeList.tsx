import {
  useGETLikeBookmarkListQuery,
  usePUTLikeBookmarkMutation,
} from '@/bookmarks/api/like';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import BookmarkLikeItem from './BookmarkLikeItem';
import SkeletonBookmarkLikeList from './SkeletonBookmarkLikeList';
import useAuthStore from '@/store/auth';
import { useState } from 'react';

const BookmarkLikeList = () => {
  const { memberId } = useAuthStore();
  const {
    data: bookmarkList,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETLikeBookmarkListQuery({
    memberId,
    pageRequest: {
      cursorId: null,
      pageSize: 15,
    },
  });

  const [selectedBookmarkId, setSelectedBookmarkId] = useState<number>(0);

  const { mutate } = usePUTLikeBookmarkMutation({
    memberId,
    bookmarkId: selectedBookmarkId,
  });

  const onClickLike = (bookmarkId: number) => {
    setSelectedBookmarkId(bookmarkId);
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
