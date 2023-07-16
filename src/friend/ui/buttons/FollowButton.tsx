import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';

import { type MouseEvent } from 'react';
import { usePOSTFollowUserQuery } from '@/friend/api/friends';
import useSearchStore from '@/store/search';

interface FollowButtonProps {
  memberId: number;
  followerId: number;
}
const FollowButton = ({ memberId, followerId }: FollowButtonProps) => {
  const { setSelectedMemberId } = useSearchStore();
  const { mutate } = usePOSTFollowUserQuery({ memberId: followerId });

  //TODO: 하드 코딩 개선
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedMemberId(memberId);
    mutate({ memberId, followerId });
  };
  return (
    <StyledButton onClick={onClick} buttonColor={'black'}>
      팔로우
    </StyledButton>
  );
};

export default FollowButton;

const StyledButton = styled(Button)`
  width: ${getRem(70)};
  font-size: ${getRem(14)};
  padding: ${getRem(4, 15)};
  height: fit-content;
  background-color: ${theme.colors.lightPrimary};
  font-weight: bold;
`;
