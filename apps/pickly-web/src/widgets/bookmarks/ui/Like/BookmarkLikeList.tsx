import {
  useGETLikeBookmarkListQuery,
  usePUTLikeBookmarkMutation,
} from '@/widgets/bookmarks/api/like';

import BookmarkLikeItem from './BookmarkLikeItem';
import SkeletonBookmarkLikeList from './SkeletonBookmarkLikeList';
import useAuthStore from '@/shared/store/auth';
import { useState } from 'react';
import styled from '@emotion/styled';
import useBottomIntersection from '@/shared/common/service/hooks/useBottomIntersection';
import BlankItem from '@/shared/ui/BlankItem/BlankItem';

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
    <Container>
      {bookmarkItems && !bookmarkItems.length && <BlankItem page="LIKE" />}
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
    </Container>
  );
};

export default BookmarkLikeList;

const Container = styled.div`
  min-height: 80dvh;
`;
