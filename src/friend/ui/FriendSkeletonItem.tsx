import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import {
  skeletonBackgroundStyle,
  skeletonContentStyle,
} from '@/common-ui/utils/skeletonStyles';

const FriendSkeletonItem = () => {
  return (
    <Container>
      <TitleItem />
    </Container>
  );
};

export default FriendSkeletonItem;

const Container = styled.div`
  height: ${getRem(45)};
  padding: ${getRem(12, 20)};
  width: 100%;
  ${skeletonBackgroundStyle};
  margin-bottom: ${getRem(10)};
`;

const TitleItem = styled.div`
  height: ${getRem(16)};
  ${skeletonContentStyle};
`;
