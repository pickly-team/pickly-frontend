import useSearchUser from '@/widgets/friend/services/hooks/useSearchUser';
import FriendList from '@/widgets/friend/ui/friend/FriendList';
import FriendSkeletonItem from '@/widgets/friend/ui/FriendSkeletonItem';
import styled from '@emotion/styled';
import { getRem, Header, Input } from '@pickly/design-system';
import { Suspense } from 'react';

const FriendSearchPage = () => {
  const { keyword, debounceKeyword, handleChange, initializeKeyword } =
    useSearchUser();

  return (
    <>
      <Header
        title="친구 찾기"
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
        <FriendList keyword={debounceKeyword} />
      </Suspense>
    </>
  );
};

export default FriendSearchPage;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

const SearchInput = styled(Input)`
  margin-top: ${getRem(12)};
`;
