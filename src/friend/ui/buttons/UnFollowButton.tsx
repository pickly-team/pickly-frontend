import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { useUnFollowMutation } from '@/friend/api/friends';

interface UnFollowButtonProps {
  userId: string;
}
const UnFollowButton = ({ userId }: UnFollowButtonProps) => {
  const { mutate } = useUnFollowMutation();
  const onClick = () => {
    mutate({ userId });
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
