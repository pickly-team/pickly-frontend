import { useGETBookmarkSearchListQuery } from '@/widgets/bookmarks/api/bookmark';
import BookmarkItem from '@/widgets/bookmarks/ui/Bookmark/BookmarkItem';
import BookmarkList from '@/widgets/bookmarks/ui/Bookmark/BookmarkList';
import useBottomIntersection from '@/shared/common/service/hooks/useBottomIntersection';
import useAuthStore from '@/shared/store/auth';
import { getRem } from '@pickly/design-system';
import styled from '@emotion/styled';

interface BookmarkSearchListProps {
  keyword: string;
}

const BookmarkSearchList = ({ keyword }: BookmarkSearchListProps) => {
  const { memberId } = useAuthStore();

  const {
    data: bookmarkList,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETBookmarkSearchListQuery({
    memberId,
    keyword,
  });

  const flatBookMarkList = bookmarkList?.pages.flatMap((page) => page.contents);

  const shouldFetchNextPage = !isFetchingNextPage && keyword.length > 0;
  const { bottom } = useBottomIntersection({
    fetchNextPage,
    enabled: shouldFetchNextPage,
  });
  return (
    <>
      <Container>
        {!!flatBookMarkList?.length && (
          <BookmarkList
            bookmarkList={flatBookMarkList}
            renderItem={(bookmark) => (
              <BookmarkItem key={bookmark.bookmarkId} {...bookmark} />
            )}
          />
        )}
      </Container>
      <div ref={bottom} />
    </>
  );
};

export default BookmarkSearchList;

const Container = styled.div`
  margin-top: 1rem;
  :first-of-type {
    padding-top: ${getRem(20)};
  }
`;
