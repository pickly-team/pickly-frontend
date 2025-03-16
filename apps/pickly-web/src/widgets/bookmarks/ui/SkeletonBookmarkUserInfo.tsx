import styled from '@emotion/styled';
import {
  getRem,
  skeletonAnimation1,
  SkeletonText,
  theme,
} from '@pickly/design-system';
import { useState } from 'react';

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
