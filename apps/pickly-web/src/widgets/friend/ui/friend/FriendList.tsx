import { useGETSearchListQuery } from '@/widgets/friend/api/friends';
import useAuthStore from '@/shared/store/auth';
import { getRem } from '@pickly/design-system';
import styled from '@emotion/styled';
import FriendFollowerItem from './FriendFollowerItem';
import useBottomIntersection from '@/shared/common/service/hooks/useBottomIntersection';

interface FriendListProps {
  keyword: string;
}

const FriendList = ({ keyword }: FriendListProps) => {
  const { memberId } = useAuthStore();

  const {
    data: searchList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGETSearchListQuery({
    memberId,
    keyword,
  });

  const flatSearchList =
    searchList?.pages
      .flatMap((page) => page.contents)
      .filter((member) => member.nickname.length < 8) ?? [];

  const shouldFetchNextPage = !isFetchingNextPage && keyword.length > 0;
  const { bottom } = useBottomIntersection({
    fetchNextPage,
    enabled: shouldFetchNextPage && hasNextPage,
  });

  return (
    <>
      <Container>
        {flatSearchList.map((info) => (
          <FriendFollowerItem
            key={info.memberId}
            id={info.memberId}
            memberId={memberId}
            name={info.nickname}
            profileEmoji={info.emoji}
            isFollowing={info.isFollowing}
            isBlocked={info.isBlocked}
          />
        ))}
      </Container>
      <div ref={bottom} />
    </>
  );
};

export default FriendList;

const Container = styled.div`
  padding: 0 ${getRem(20)};
  margin-top: 1rem;
  :first-of-type {
    padding-top: ${getRem(20)};
  }
`;
