import BookmarkSearchList from '@/comment/ui/bookmark/BookmarkSearchList';
import Header from '@/common-ui/Header/Header';
import Input from '@/common-ui/Input';
import useSearchUser from '@/friend/services/hooks/useSearchUser';
import FriendSkeletonItem from '@/friend/ui/FriendSkeletonItem';
import getRem from '@/utils/getRem';
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
        fallback={Array.from({ length: 5 }, (_, item) => (
          <FriendSkeletonItem key={item} />
        ))}
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
