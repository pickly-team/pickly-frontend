import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import {
  skeletonBackgroundStyle,
  skeletonContentStyle,
} from '@/common-ui/utils/skeletonStyles';

const NotificationSkeletonItem = () => {
  return (
    <Container>
      <TitleItem />
      <ContentItem />
    </Container>
  );
};

export default NotificationSkeletonItem;

const Container = styled.div`
  height: ${getRem(80)};
  padding: ${getRem(12, 20)};
  width: 100%;
  ${skeletonBackgroundStyle};
`;

const TitleItem = styled.div`
  height: ${getRem(16)};
  ${skeletonContentStyle};
`;

const ContentItem = styled.div`
  height: ${getRem(12)};
  ${skeletonContentStyle};
  margin-top: ${getRem(8)};
`;
