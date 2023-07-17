import styled from '@emotion/styled';
import Button from '@/common-ui/Button';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

export enum FriendType {
  Follower = 'Follower',
  Following = 'Following',
}

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
        active={value === FriendType.Follower}
      >
        팔로워 {followerTotalCount}
      </FriendTypeButton>
      <FriendTypeButton
        onClick={() => {
          onSelect(FriendType.Following);
        }}
        activeButtonColor="black"
        buttonColor={'black'}
        active={value === FriendType.Following}
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

const FriendTypeButton = styled(Button)<{ active: boolean }>`
  border-radius: 0;
  ${(p) =>
    p.active &&
    css`
      color: ${theme.colors.lightPrimary};
      border-bottom: 1px solid ${theme.colors.lightPrimary};
    `}
`;
