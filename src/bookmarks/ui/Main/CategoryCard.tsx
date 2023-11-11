import ProgressBar from '@/common-ui/ProgressBar';
import Text from '@/common-ui/Text';
import { navigatePath } from '@/constants/navigatePath';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  emoji: string;
  name: string;
  percentage: number;
  readCount: number;
  totalCount: number;
  onClickCategory: () => void;
}

const CategoryCard = ({
  emoji,
  name,
  percentage,
  readCount,
  totalCount,
  onClickCategory,
}: CategoryCardProps) => {
  return (
    <StyledLink to={navigatePath.BOOKMARK} onClick={onClickCategory}>
      <UpperWrapper>
        <EmojiBox>
          <Text.P fontSize={1.4}>{emoji}</Text.P>
        </EmojiBox>
        <UpperRightWrapper>
          <Text.P weight="bold" fontSize={1}>
            {name}
          </Text.P>
          <Text.P fontSize={0.8}>{percentage}%</Text.P>
        </UpperRightWrapper>
      </UpperWrapper>
      <LowerWrapper>
        <ProgressBar progress={percentage} />
        <ReadInfoBox>
          <Text.P fontSize={0.7}>
            {readCount} / {totalCount}
          </Text.P>
        </ReadInfoBox>
      </LowerWrapper>
    </StyledLink>
  );
};

export default CategoryCard;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.grey850};
  border-radius: 1rem;
  min-width: calc(50% - 0.5rem);
  padding: 1rem;
  row-gap: 1rem;
  :active {
    opacity: 0.7;
  }
  transition: 0.2s ease-in;
`;

const UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmojiBox = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 0.3rem;
  background-color: ${theme.colors.lightPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpperRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: flex-end;
`;

const LowerWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

const ReadInfoBox = styled.div`
  display: flex;
  background-color: ${theme.colors.grey900};
  border-radius: 0.5rem;
  width: 3.3rem;
  height: 1.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;
