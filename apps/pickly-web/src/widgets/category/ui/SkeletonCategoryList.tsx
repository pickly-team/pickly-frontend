/* eslint-disable no-irregular-whitespace */
import ListItem from '@/shared/common/ui/ListItem';
import { theme, getRem } from '@pickly/design-system';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  count?: number;
}

const SkeletonCategoryList = ({ count = 5 }: Props) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <SkeletonCategoryItem key={index} />
      ))}
    </>
  );
};

export default SkeletonCategoryList;

const SkeletonCategoryItem = () => {
  return (
    <ListItem>
      <ListItem.Left
        middle={<SkeletonEmoji />}
        right={<SkeletonText>​</SkeletonText>}
      />
    </ListItem>
  );
};

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

const SkeletonEmoji = styled.div`
  width: ${getRem(25)};
  height: ${getRem(25)};
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  animation: ${floating} 2s ease infinite;
  flex: 1 1 1;
`;

const SkeletonText = styled.div`
  width: 60vw;
  background-color: ${theme.colors.grey800};
  animation: ${floating2} 2s ease infinite;
  overflow: hidden;
  border-radius: ${getRem(10)};
  flex: 1 0 1;
`;
