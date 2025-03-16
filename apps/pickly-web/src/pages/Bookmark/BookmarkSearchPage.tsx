import BookmarkSkeletonItem from '@/widgets/bookmarks/ui/Bookmark/BookmarkSkeletonItem';
import BookmarkSearchList from '@/widgets/comment/ui/bookmark/BookmarkSearchList';

import useSearchUser from '@/widgets/friend/services/hooks/useSearchUser';
import { getRem, Header, Input, SkeletonWrapper } from '@pickly/design-system';
import styled from '@emotion/styled';
import { Suspense } from 'react';

const BookmarkSearchPage = () => {
  const { keyword, debounceKeyword, handleChange, initializeKeyword } =
    useSearchUser();

  return (
    <>
      <Header
        title="북마크 검색"
        showBackButton={true}
        backButtonCallback={initializeKeyword}
      />
      <Wrapper>
        <SearchInput
          value={keyword}
          onChange={handleChange}
          border={{
            color: 'grey800',
            borderWidth: 1,
            borderRadius: 0.5,
          }}
        />
      </Wrapper>
      <Suspense
        fallback={
          <SkeletonWrapper>
            {Array.from({ length: 5 }, (_, item) => (
              <BookmarkSkeletonItem key={item} />
            ))}
          </SkeletonWrapper>
        }
      >
        <BookmarkSearchList keyword={debounceKeyword} />
      </Suspense>
    </>
  );
};

export default BookmarkSearchPage;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

const SearchInput = styled(Input)`
  margin-top: ${getRem(12)};
`;
