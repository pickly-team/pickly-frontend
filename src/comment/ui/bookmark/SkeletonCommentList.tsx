/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import SkeletonText from '@/common-ui/skeleton/SkeletonText';
import { skeletonAnimation2 } from '@/common-ui/utils/skeletonAnimations';

const SkeletonCommentList = () => {
  return (
    <CommentListWrapper>
      {[...Array(3)].map((_, index) => (
        <SkeletonCommentItem key={index} />
      ))}
    </CommentListWrapper>
  );
};

const CommentListWrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

const SkeletonCommentItem = () => {
  return (
    <Container>
      <CommentHeader>
        <NicknameTextAndIconWrapper>
          <SkeletonText height={1} width={7} animationType="reverse" />
          <SkeletonText height={1} />
        </NicknameTextAndIconWrapper>
        {/* <div />
        <div /> */}
      </CommentHeader>
      <SkeletonText height={1} />
      <IconAndTextWrapper>
        <Icon name="timeline" size={'xs'} />
        <SkeletonText height={1} width={40} />
      </IconAndTextWrapper>
    </Container>
  );
};

export default SkeletonCommentList;

const Container = styled.div`
  display: grid;
  flex-direction: column;
  row-gap: 0.8rem;
  padding: ${getRem(15, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey700};
  ${skeletonAnimation2}
  margin-bottom: 1rem;
  :nth-last-of-type(1) {
    margin-bottom: 5rem;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 1.5rem;
`;

const NicknameTextAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
  margin-right: auto; // 추가
  width: 100%;
`;

const IconAndTextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;
