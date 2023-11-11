import SkeletonText from '@/common-ui/skeleton/SkeletonText';
import { theme } from '@/styles/theme';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const SkeletonCategoryReadList = () => {
  return (
    <Container>
      {Array.from({ length: 6 }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </Container>
  );
};

export default SkeletonCategoryReadList;

const Container = styled.div`
  display: flex;
  column-gap: 1rem;
  row-gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 7rem;
`;

const CategoryCardSkeleton = () => {
  return (
    <SkeletonLink>
      <SkeletonUpperWrapper>
        <SkeletonEmojiBox />
        <SkeletonUpperRightWrapper>
          <SkeletonText width={70} height={1} />
          <SkeletonText width={30} height={1} />
        </SkeletonUpperRightWrapper>
      </SkeletonUpperWrapper>
      <SkeletonLowerWrapper>
        <SkeletonProgressBar />
        <SkeletonReadInfoBox />
      </SkeletonLowerWrapper>
    </SkeletonLink>
  );
};

const pulse = keyframes`
    0% {opacity: 1}
    50% {opacity: 0.5;}
    100% {opacity: 1;}
`;

const SkeletonLink = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.grey850};
  border-radius: 1rem;
  padding: 1rem;
  row-gap: 1rem;
  width: calc(50% - 0.5rem);
`;

const SkeletonUpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkeletonEmojiBox = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 0.3rem;
  background-color: ${theme.colors.grey800};
  animation: ${pulse} 1.5s ease infinite;
`;

const SkeletonUpperRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  align-items: flex-end;
`;

const SkeletonLowerWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

const SkeletonProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${theme.colors.grey800};
  border-radius: 0.25rem;
  animation: ${pulse} 1.5s ease infinite;
`;

const SkeletonReadInfoBox = styled.div`
  width: 3.3rem;
  height: 1.5rem;
  background-color: ${theme.colors.grey800};
  border-radius: 0.5rem;
  animation: ${pulse} 1.5s ease infinite;
`;
