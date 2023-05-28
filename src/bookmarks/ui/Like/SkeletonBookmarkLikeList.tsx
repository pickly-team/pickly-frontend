/* eslint-disable no-irregular-whitespace */
import {
  skeletonAnimation1,
  skeletonAnimation2,
} from '@/common-ui/utils/skeletonAnimations';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

interface SkeletonBookmarkListProps {
  count?: number;
}

const SkeletonBookmarkLikeList = ({ count = 5 }: SkeletonBookmarkListProps) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <SkeletonBookmarkItem key={index} />
      ))}
    </>
  );
};

export default SkeletonBookmarkLikeList;

const SkeletonBookmarkItem = () => {
  return (
    <>
      <ItemWrapper>
        <LinkWrapper>
          <ItemUpperLeft>
            <SkeletonText>​</SkeletonText>
            <SkeletonUrlText>​</SkeletonUrlText>
          </ItemUpperLeft>
        </LinkWrapper>
        <LikeButton />
      </ItemWrapper>
    </>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${getRem(16)};
  padding: ${getRem(15, 0)};
  width: 100%;
  padding-left: ${getRem(20)};
  transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;
  &:active {
    background-color: ${theme.colors.grey800};
    opacity: 0.5;
  }
`;

const ItemUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  flex: 1 1 auto;
  min-width: 0;
`;

const LikeButton = styled.div`
  display: flex;
  width: ${getRem(35)};
  height: ${getRem(35)};
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  margin-right: ${getRem(20)};
  flex: 1 0 1;
  box-sizing: content-box;
  ${skeletonAnimation1}
`;

const SkeletonText = styled.div`
  width: 80%;
  background-color: ${theme.colors.grey800};
  overflow: hidden;
  border-radius: ${getRem(10)};
  flex: 1 0 1;
  ${skeletonAnimation1}
`;

const SkeletonUrlText = styled.div`
  width: 60%;
  background-color: ${theme.colors.grey800};
  overflow: hidden;
  border-radius: ${getRem(10)};
  flex: 1 0 1;
  ${skeletonAnimation2}
`;
