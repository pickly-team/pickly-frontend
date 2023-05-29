import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { useFollowMutation } from '@/friend/api/friends';

interface FollowButtonProps {
  userId: string;
}
const FollowButton = ({ userId }: FollowButtonProps) => {
  const { mutate } = useFollowMutation();
  const onClick = () => {
    mutate({ userId });
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
