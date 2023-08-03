import styled from '@emotion/styled';
import Button from '@/common-ui/Button';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { FriendType } from '@/store/friend';

interface FriendTypeSelectProps {
  value: FriendType;
  onSelect: (value: FriendType) => void;
  followerTotalCount: number;
  followingTotalCount: number;
}

const FriendTypeSelect = ({
  value,
  onSelect,
  followerTotalCount,
  followingTotalCount,
}: FriendTypeSelectProps) => {
  return (
    <ButtonWrapper>
      <FriendTypeButton
        onClick={() => {
          onSelect(FriendType.Follower);
        }}
        activeButtonColor="black"
        buttonColor={'black'}
        on={(value === FriendType.Follower).toString()}
      >
        팔로워 {followerTotalCount}
      </FriendTypeButton>
      <FriendTypeButton
        onClick={() => {
          onSelect(FriendType.Following);
        }}
        activeButtonColor="black"
        buttonColor={'black'}
        on={(value === FriendType.Following).toString()}
      >
        팔로잉 {followingTotalCount}
      </FriendTypeButton>
    </ButtonWrapper>
  );
};

export default FriendTypeSelect;

const ButtonWrapper = styled.div`
  display: flex;
`;

interface FriendTypeButtonProps {
  on: string;
}

const FriendTypeButton = styled(Button)<FriendTypeButtonProps>`
  border-radius: 0;
  ${(p) =>
    p.on === 'true'
      ? css`
          color: ${theme.colors.lightPrimary};
          border-bottom: 1px solid ${theme.colors.lightPrimary};
        `
      : css``}
`;
