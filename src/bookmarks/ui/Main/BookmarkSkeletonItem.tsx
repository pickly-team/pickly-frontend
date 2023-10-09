/* eslint-disable no-irregular-whitespace */
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const BookmarkSkeletonItem = () => {
  return (
    <LinkWrapper>
      <ItemWrapper>
        <ItemUpperLeft>
          <EllipsisText>​</EllipsisText>
          <EllipsisText>​</EllipsisText>
        </ItemUpperLeft>
        <ItemUpperRight>
          <Thumbnail />
        </ItemUpperRight>
      </ItemWrapper>
      <UnderWrapper>
        {/* <IconWrapper></IconWrapper> */}
        <SkeletonText>​</SkeletonText>
      </UnderWrapper>
    </LinkWrapper>
  );
};

export default BookmarkSkeletonItem;

const floating = keyframes`
    0% {opacity: 1}
    50% {opacity: 0.4;}
    100% {opacity: 1;}
`;

const floating2 = keyframes`
    0% {opacity: 0.4}
    50% {opacity: 1;}
    100% {opacity: 0.4;}
`;

const LinkWrapper = styled.div`
  display: block;
  padding: 10px 20px;
  margin-bottom: 1rem;
  width: 100%;

  background-color: ${theme.colors.grey900};
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UnderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
`;

const ItemUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  flex: 1 1 auto;
  min-width: 0;
`;

const EllipsisText = styled.div`
  width: 90%;
  border-radius: ${getRem(10)};
  background-color: ${theme.colors.grey800};
  animation: ${floating} 2s ease infinite;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SkeletonText = styled.div`
  width: 100%;
  background-color: ${theme.colors.grey800};
  animation: ${floating2} 2s ease infinite;
  overflow: hidden;
  border-radius: ${getRem(10)};
`;

const ItemUpperRight = styled.div`
  display: flex;
`;

const Thumbnail = styled.div`
  width: 7rem;
  height: 5rem;
  background-color: ${theme.colors.grey800};
  animation: ${floating2} 2s ease infinite;
  border-radius: ${getRem(10)};
`;
