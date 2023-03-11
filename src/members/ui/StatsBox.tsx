import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';

const StatsBox = ({
  numberOfLikes,
  numberOfCategories,
  numberOfNotes,
}: {
  numberOfLikes: number;
  numberOfCategories: number;
  numberOfNotes: number;
}) => {
  return (
    <StyleWrapper>
      <StatsContainer>
        <StatItemContainer>
          <Text.Span weight="bold">좋아요</Text.Span>
          <Text.Span weight="bold">{`${numberWithCommas(
            numberOfLikes,
          )}개`}</Text.Span>
        </StatItemContainer>
        <Divider />
        <StatItemContainer>
          <Text.Span weight="bold">카테고리</Text.Span>
          <Text.Span weight="bold">{`${numberWithCommas(
            numberOfCategories,
          )}개`}</Text.Span>
        </StatItemContainer>
        <Divider />
        <StatItemContainer>
          <Text.Span weight="bold">메모</Text.Span>
          <Text.Span weight="bold">{`${numberWithCommas(
            numberOfNotes,
          )}개`}</Text.Span>
        </StatItemContainer>
        <Divider />
      </StatsContainer>
    </StyleWrapper>
  );
};

function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default StatsBox;

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.375rem;
`;

const StatsContainer = styled.div`
  width: 100%;
`;

const StatItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.white};
  margin: 0.9rem 0;
`;
