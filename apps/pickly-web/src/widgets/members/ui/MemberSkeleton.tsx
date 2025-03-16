import styled from '@emotion/styled';
import { getRem } from '@pickly/design-system';
import {
  skeletonBackgroundStyle,
  skeletonContentStyle,
} from '@pickly/design-system';

const MemberSkeleton = () => {
  return (
    <Container>
      <TitleItem />
    </Container>
  );
};

export default MemberSkeleton;

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
