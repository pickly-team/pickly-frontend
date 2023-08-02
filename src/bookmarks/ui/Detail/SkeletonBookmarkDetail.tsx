/* eslint-disable no-irregular-whitespace */
import getRem from '@/utils/getRem';
import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

import { skeletonAnimation1 } from '@/common-ui/utils/skeletonAnimations';
import { ReactNode } from 'react';
import Icon from '@/common-ui/assets/Icon';

const SkeletonBookmarkDetail = () => {
  return (
    <>
      <BookMarkImage>​</BookMarkImage>
      <Container>
        <SkeletonTitleText>​</SkeletonTitleText>
        <CategoryAndIconsWrapper>
          <CategoryButtonWrapper>
            <CategoryButton height={2.5} buttonColor="lightPrimary">
              ​
            </CategoryButton>
          </CategoryButtonWrapper>
          <LikeAndMessageIconWrapper>​</LikeAndMessageIconWrapper>
        </CategoryAndIconsWrapper>
        <BookMarkInfoWrapper>
          <BookMarkInfo
            icon={<Icon name="calendar-plus" size="s" />}
            content={<SkeletonText>​</SkeletonText>}
          />
          <BookMarkInfo
            icon={<Icon name="location" size="s" />}
            content={<SkeletonText>​</SkeletonText>}
          />
        </BookMarkInfoWrapper>
      </Container>
    </>
  );
};

export default SkeletonBookmarkDetail;

const BookMarkInfo = ({
  icon,
  content,
}: {
  icon: ReactNode;
  content: ReactNode;
}) => {
  return (
    <InfoRow>
      <IconWrapper>{icon}</IconWrapper>
      <InfoTextWrapper>
        <SkeletonSubText>​</SkeletonSubText>
        {content}
      </InfoTextWrapper>
    </InfoRow>
  );
};

const Container = styled.article`
  padding: ${getRem(0, 20)};
`;

const BookMarkImage = styled.div`
  width: 100%;
  height: ${getRem(247)};
  border-radius: ${getRem(0, 0, 32, 32)};
  background-color: ${theme.colors.grey800};
  ${skeletonAnimation1};
`;

const CategoryAndIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getRem(15)};
`;

const CategoryButtonWrapper = styled.div`
  width: ${getRem(154)};
`;

const CategoryButton = styled(Button)`
  color: ${theme.colors.black};
`;

const IconWrapper = styled.div`
  display: flex;
`;

const LikeAndMessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(12)};
  width: 30%;
  height: 1.7rem;
  border-radius: ${getRem(5)};
  align-self: center;
  ${skeletonAnimation1};
  background-color: ${theme.colors.grey800};
`;

const BookMarkInfoWrapper = styled.div`
  padding: ${getRem(20)} 0px;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
  width: 100%;
  overflow: hidden;
`;

const InfoTextWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 2rem;
  align-items: center;
  column-gap: 2rem;
`;

const SkeletonTitleText = styled.div`
  width: 100%;
  height: 1.8rem;
  background-color: ${theme.colors.grey800};
  margin-top: ${getRem(28)};
  border-radius: ${getRem(5)};
  ${skeletonAnimation1};
`;

const SkeletonSubText = styled.div`
  width: 20%;
  background-color: ${theme.colors.grey800};
  ${skeletonAnimation1};
  border-radius: ${getRem(5)};
`;

const SkeletonText = styled.div`
  width: 50%;
  height: 1.1rem;
  background-color: ${theme.colors.grey800};
  ${skeletonAnimation1};
  border-radius: ${getRem(5)};
`;
