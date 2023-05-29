import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { useFollowMutation } from '@/friend/api/friends';
import useToast from '@/common-ui/Toast/hooks/useToast';

interface FollowButtonProps {
  userId: string;
}
const FollowButton = ({ userId }: FollowButtonProps) => {
  const { fireToast } = useToast();
  //TODO: 하드 코딩 개선
  const { mutate } = useFollowMutation({
    variables: {
      memberId: '1',
      followingId: '3',
    },
    onSuccess: () => {
      fireToast({
        message: '팔로잉 중인 친구의 알림만 받을 수 있습니다',
        mode: 'SUCCESS',
      });
    },
  });
  const onClick = () => {
    mutate();
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
