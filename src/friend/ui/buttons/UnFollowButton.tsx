import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { type MouseEvent } from 'react';
import { useDELETEUnFollowQuery } from '@/friend/api/friends';
import useSearchStore from '@/store/search';

interface UnFollowButtonProps {
  memberId: number;
  followerId: number;
}
const UnFollowButton = ({ memberId, followerId }: UnFollowButtonProps) => {
  const { setSelectedMemberId } = useSearchStore();
  const { mutate } = useDELETEUnFollowQuery({ memberId: followerId });

  //TODO: 하드코딩 개선
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedMemberId(memberId);
    mutate({ memberId, followerId });
  };
  return (
    <StyledButton onClick={onClick} buttonColor={'black'}>
      언팔로우
    </StyledButton>
  );
};

export default UnFollowButton;

const StyledButton = styled(Button)`
  width: ${getRem(70)};
  font-size: ${getRem(14)};
  padding: ${getRem(4, 15)};
  height: fit-content;
  border: 1px solid ${theme.colors.lightPrimary};
  color: ${theme.colors.lightPrimary};
  font-weight: bold;
`;
