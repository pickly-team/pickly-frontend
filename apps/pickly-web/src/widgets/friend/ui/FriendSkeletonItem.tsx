import {
  theme,
  getRem,
  SkeletonText,
  skeletonAnimation1,
} from '@pickly/design-system';
import styled from '@emotion/styled';

const FriendSkeletonItem = () => {
  return (
    <>
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
