import SkeletonText from '@/common-ui/skeleton/SkeletonText';
import { skeletonAnimation1 } from '@/common-ui/utils/skeletonAnimations';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

interface SkeletonBookmarkUserInfoProps {
  isFriendPage?: {
    isFollowing: boolean;
    friendId: number;
    memberId: number;
    isBlocked: boolean;
  };
}

const SkeletonBookmarkUserInfo = ({
  isFriendPage,
}: SkeletonBookmarkUserInfoProps) => {
  return (
    <StyleWrapper>
      <TextWrapper>
        <UserBox></UserBox>
        {!!isFriendPage && (
          <SkeletonText width={40} height={1.5} animationType="reverse" />
        )}
        {!isFriendPage && <SkeletonText width={40} height={1.5} />}
      </TextWrapper>
      {!!isFriendPage && (
        <>
          <StyledButton />
        </>
      )}
    </StyleWrapper>
  );
};

export default SkeletonBookmarkUserInfo;

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserBox = styled.div`
  display: flex;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  ${skeletonAnimation1};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  width: 100%;
`;

const StyledButton = styled.div`
  width: ${getRem(70)};
  height: 1.4rem;
  font-size: ${getRem(14)};
  padding: ${getRem(4, 15)};
  border-radius: ${getRem(5)};
  background-color: ${theme.colors.grey800};
  font-weight: bold;
  ${skeletonAnimation1}
`;
