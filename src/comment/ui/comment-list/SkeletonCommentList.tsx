import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import SkeletonText from '@/common-ui/skeleton/SkeletonText';

const SkeletonCommentList = () => {
  return (
    <CommentListWrapper>
      {Array.from({ length: 5 }).map((_, index) => (
        <CommentItem key={index} />
      ))}
    </CommentListWrapper>
  );
};

export default SkeletonCommentList;

const CommentListWrapper = styled.div`
  > * + * {
    margin-top: ${getRem(10)};
    margin-bottom: ${getRem(10)};
  }
`;
const CommentItem = () => {
  return (
    <>
      <Container>
        <CommentHeader>
          <IconAndTitleWrapper>
            <SkeletonText height={1.4} />
          </IconAndTitleWrapper>
        </CommentHeader>
        <IconAndNickNameWrapper>
          <SkeletonText width={40} animationType="reverse" />
        </IconAndNickNameWrapper>
        <SkeletonText />
        <IconAndTimeAndCategoryWrapper>
          <SkeletonText width={40} />
          <SkeletonText width={100} animationType="reverse" />
        </IconAndTimeAndCategoryWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  row-gap: ${getRem(10)};
  width: 100%;
  padding: ${getRem(15, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey850};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
  width: 100%;
`;

const IconAndNickNameWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const IconAndTimeAndCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;
