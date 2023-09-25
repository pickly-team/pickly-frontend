import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { type MouseEvent } from 'react';
import { useDELETEUnFollowQuery } from '@/friend/api/friends';
import useSearchStore from '@/store/search';
import useToast from '@/common-ui/Toast/hooks/useToast';
import Text from '@/common-ui/Text';

interface UnFollowButtonProps {
  memberId: number;
  followerId: number;
  isBlocked?: boolean;
}
const UnFollowButton = ({
  memberId,
  followerId,
  isBlocked = false,
}: UnFollowButtonProps) => {
  const { setSelectedMemberId } = useSearchStore();
  const { mutate } = useDELETEUnFollowQuery({ memberId: followerId });

  const { fireToast } = useToast();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isBlocked) {
      fireToast({
        message: '차단된 사용자는 팔로우 할 수 없어요',
        mode: 'ERROR',
      });
      return;
    }
    setSelectedMemberId(memberId);
    mutate({ memberId, followerId });
  };
  return (
    <StyledButton onClick={onClick} buttonColor={'black'}>
      <Text.Span color="lightPrimary" fontSize={0.8}>
        언팔로우
      </Text.Span>
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
