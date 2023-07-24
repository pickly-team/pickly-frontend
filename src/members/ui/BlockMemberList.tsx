import { useGETBlockMemberListQuery, useUnblockUserQuery } from '../api/member';
import useAuthStore from '@/store/auth';
import Member from './Member';
import styled from '@emotion/styled';
import Button from '@/common-ui/Button';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import MemberSkeleton from './MemberSkeleton';
import BlankItem from '@/common-ui/BlankItem';

const BlockMemberList = () => {
  // FIRST RENDER
  const { memberId } = useAuthStore();

  // SERVER
  // 1. 차단한 멤버 리스트
  const {
    data: blockMemberList,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETBlockMemberListQuery({
    memberId,
  });
  const flatBlockMemberList =
    blockMemberList?.pages.flatMap((page) => page.contents) ?? [];

  const { bottom } = useBottomIntersection({
    fetchNextPage,
    enabled: !isFetchingNextPage,
  });

  // 2. 차단 해제
  const { mutate: unblockUser } = useUnblockUserQuery({ memberId });
  const onClick = (blockeeId: number) => {
    unblockUser({ blockerId: memberId, blockeeId });
  };

  return (
    <Wrapper>
      {!flatBlockMemberList.length && <BlankItem page="BLOCK_USER" />}
      {flatBlockMemberList.map((info) => (
        <Member
          key={info.id}
          emoji={info.profileEmoji}
          name={info.nickname}
          button={
            <StyledButton
              onClick={() => onClick(info.id)}
              buttonColor="lightPrimary"
            >
              차단 해제
            </StyledButton>
          }
        />
      ))}
      <div ref={bottom} />
      {isFetchingNextPage &&
        Array.from({ length: 10 }).map((_, idx) => (
          <MemberSkeleton key={idx} />
        ))}
    </Wrapper>
  );
};

export default BlockMemberList;

const Wrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

const StyledButton = styled(Button)`
  width: 5rem;
  font-size: ${getRem(14)};
  padding: 0.25rem 0.94rem;
  height: fit-content;
  color: ${theme.colors.black};
  font-weight: bold;
`;
