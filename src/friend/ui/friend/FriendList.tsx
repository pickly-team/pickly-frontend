import { useGETSearchListQuery } from '@/friend/api/friends';
import useAuthStore from '@/store/auth';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import FriendFollowerItem from './FriendFollowerItem';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';

interface FriendListProps {
  keyword: string;
}

const FriendList = ({ keyword }: FriendListProps) => {
  const { memberId } = useAuthStore();

  const {
    data: searchList,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETSearchListQuery({
    memberId,
    keyword,
  });

  const flatSearchList =
    searchList?.pages.flatMap((page) => page.contents) ?? [];

  const shouldFetchNextPage = !isFetchingNextPage && keyword.length > 0;
  const { bottom } = useBottomIntersection({
    fetchNextPage,
    enabled: shouldFetchNextPage,
  });

  return (
    <>
      <Container>
        {flatSearchList.map((info) => (
          <FriendFollowerItem
            key={info.memberId}
            id={String(info.memberId)}
            name={info.nickname}
            profileEmoji={info.profileImageUrl}
            isFollowing={Boolean(info.isFollowing)}
          />
        ))}
      </Container>
      <div ref={bottom} />
    </>
  );
};

export default FriendList;

const Container = styled.div`
  padding: ${getRem(10)};
  > * + * {
    margin-top: ${getRem(10)};
  }
`;