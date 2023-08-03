import Divider from '@/category/ui/Divider';
import Header from '@/common-ui/Header/Header';
import Input from '@/common-ui/Input';
import useSearchUser from '@/friend/services/hooks/useSearchUser';
import FriendSkeletonItem from '@/friend/ui/FriendSkeletonItem';
import FriendList from '@/friend/ui/friend/FriendList';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import { Suspense } from 'react';

const FriendSearchPage: ActivityComponentType = () => {
  const { keyword, debounceKeyword, handleChange, initializeKeyword } =
    useSearchUser();

  return (
    <AppScreen preventSwipeBack>
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
            color: 'white',
            borderWidth: 1,
            borderRadius: 0.5,
          }}
        />
      </Wrapper>
      <DividerWrapper>
        <Divider size="s" margin="off" />
      </DividerWrapper>
      <Suspense
        fallback={Array.from({ length: 5 }, (_, item) => (
          <FriendSkeletonItem key={item} />
        ))}
      >
        <FriendList keyword={debounceKeyword} />
      </Suspense>
    </AppScreen>
  );
};

export default FriendSearchPage;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

const SearchInput = styled(Input)`
  margin-top: ${getRem(12)};
`;

const DividerWrapper = styled.div`
  margin-top: 1.6rem;
`;
