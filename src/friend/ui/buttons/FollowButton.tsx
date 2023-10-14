import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';

import { type MouseEvent } from 'react';
import { usePOSTFollowUserQuery } from '@/friend/api/friends';
import useSearchStore from '@/store/search';
import useToast from '@/common-ui/Toast/hooks/useToast';
import Text from '@/common-ui/Text';
import { css } from '@emotion/react';

interface FollowButtonProps {
  memberId: number;
  followerId: number;
  isBlocked?: boolean;
  disabled?: boolean;
}
const FollowButton = ({
  memberId,
  followerId,
  isBlocked = false,
  disabled = false,
}: FollowButtonProps) => {
  const { setSelectedMemberId } = useSearchStore();
  const { mutate } = usePOSTFollowUserQuery({ memberId: followerId });

  const { fireToast } = useToast();

  //TODO: 하드 코딩 개선
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return;
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
      <Text.Span
        color="white"
        fontSize={0.8}
        css={css`
          text-shadow: 1px 1px 10px black;
        `}
      >
        팔로우
      </Text.Span>
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
