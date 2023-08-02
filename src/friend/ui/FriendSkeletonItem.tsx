import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { FriendType } from '@/store/friend';
import Button from '@/common-ui/Button';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import SkeletonText from '@/common-ui/skeleton/SkeletonText';
import { skeletonAnimation1 } from '@/common-ui/utils/skeletonAnimations';

const FriendSkeletonItem = () => {
  return (
    <>
      <FriendTypeSelect
        value={FriendType.Follower}
        followerTotalCount={0}
        followingTotalCount={0}
      />
      <Wrapper>
        {Array.from({ length: 5 }).map((_, index) => (
          <Container key={index}>
            <SkeletonIcon />
            <SkeletonText />
          </Container>
        ))}
      </Wrapper>
    </>
  );
};

export default FriendSkeletonItem;

const Wrapper = styled.div`
  padding: ${getRem(10)};
  > * + * {
    margin-top: ${getRem(10)};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${getRem(57)};
  column-gap: ${getRem(10)};
`;

const SkeletonIcon = styled.div`
  width: ${getRem(25)};
  height: ${getRem(25)};
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  ${skeletonAnimation1};
`;

interface FriendTypeSelectProps {
  value: FriendType;

  followerTotalCount: number;
  followingTotalCount: number;
}

const FriendTypeSelect = ({
  value,

  followerTotalCount,
  followingTotalCount,
}: FriendTypeSelectProps) => {
  return (
    <ButtonWrapper>
      <FriendTypeButton
        activeButtonColor="black"
        buttonColor={'black'}
        active={value === FriendType.Follower}
      >
        팔로워 {followerTotalCount}
      </FriendTypeButton>
      <FriendTypeButton
        activeButtonColor="black"
        buttonColor={'black'}
        active={value === FriendType.Following}
      >
        팔로잉 {followingTotalCount}
      </FriendTypeButton>
    </ButtonWrapper>
  );
};

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
