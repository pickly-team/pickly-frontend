import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { useUnFollowMutation } from '@/friend/api/friends';
import useToast from '@/common-ui/Toast/hooks/useToast';
import type { MouseEvent } from 'react';

interface UnFollowButtonProps {
  userId: string;
}
const UnFollowButton = ({ userId }: UnFollowButtonProps) => {
  const { fireToast } = useToast();
  const { mutate } = useUnFollowMutation({
    onSuccess: () => {
      fireToast({
        message: '팔로잉 중인 친구의 알림만 받을 수 있습니다',
        mode: 'SUCCESS',
      });
    },
  });

  //TODO: 하드코딩 개선
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate({ memberId: '1', followingId: '3' });
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
