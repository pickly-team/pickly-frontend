import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import { numberWithCommas } from '@/utils/numberWithCommas';
import Icon from '@/common-ui/assets/Icon';

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
          <IconLabelContainer>
            <Icon name={'like'} size={'s'} />
            <Text.Span weight="bold" style={{ marginLeft: '0.8rem' }}>
              좋아요
            </Text.Span>
          </IconLabelContainer>

          <IconLabelContainer>
            <Text.Span
              weight="bold"
              style={{ marginRight: '0.5rem' }}
            >{`${numberWithCommas(numberOfLikes)}개`}</Text.Span>
            <Icon name={'check'} size={'s'} />
          </IconLabelContainer>
        </StatItemContainer>
        <Divider />
        <StatItemContainer>
          <IconLabelContainer>
            <Icon name={'alarm'} size={'s'} />
            <Text.Span weight="bold" style={{ marginLeft: '0.8rem' }}>
              카테고리
            </Text.Span>
          </IconLabelContainer>

          <IconLabelContainer>
            <Text.Span
              weight="bold"
              style={{ marginRight: '0.5rem' }}
            >{`${numberWithCommas(numberOfCategories)}개`}</Text.Span>
            <Icon name={'check'} size={'s'} />
          </IconLabelContainer>
        </StatItemContainer>
        <Divider />
        <StatItemContainer>
          <IconLabelContainer>
            <Icon name={'list'} size={'s'} />
            <Text.Span weight="bold" style={{ marginLeft: '0.8rem' }}>
              메모
            </Text.Span>
          </IconLabelContainer>

          <IconLabelContainer>
            <Text.Span
              weight="bold"
              style={{ marginRight: '0.5rem' }}
            >{`${numberWithCommas(numberOfNotes)}개`}</Text.Span>
            <Icon name={'check'} size={'s'} />
          </IconLabelContainer>
        </StatItemContainer>
        <Divider />
      </StatsContainer>
    </StyleWrapper>
  );
};

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
const IconLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.white};
  margin: 0.9rem 0;
`;
