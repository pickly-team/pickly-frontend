import styled from '@emotion/styled';
import { getRem, theme, Text, Button } from '@pickly/design-system';

import { type MouseEvent } from 'react';

import { css } from '@emotion/react';
import useSearchStore from '@/shared/store/search';
import { usePOSTFollowUserQuery } from '../../api/friends';
import useToast from '@/shared/ui/Toast/hooks/useToast';

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
          text-shadow: 0.5px 0.5px 20px black;
        `}
      >
        팔로우
      </Text.Span>
    </StyledButton>
  );
};

export default FollowButton;

const StyledButton = styled(Button)`
  box-sizing: border-box;
  width: ${getRem(70)} !important;
  font-size: ${getRem(14)};
  padding: ${getRem(4, 15)};
  height: fit-content;
  background-color: ${theme.colors.lightPrimary};
  font-weight: bold;
`;
