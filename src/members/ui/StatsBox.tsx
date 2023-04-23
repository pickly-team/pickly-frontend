import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import { numberWithCommas } from '@/utils/numberWithCommas';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';

const StatsBox = ({
  numberOfLikes,
  numberOfCategories,
  numberOfComments,
}: {
  numberOfLikes: number;
  numberOfCategories: number;
  numberOfComments: number;
}) => {
  return (
    <Container>
      <StatsContainer>
        <Link to="/likes">
          <StatItemContainer>
            <IconLabelContainer>
              <Icon name={'like'} size={'s'} />
              <IconText>좋아요</IconText>
            </IconLabelContainer>

            <IconLabelContainer>
              <NumberText>{`${numberWithCommas(numberOfLikes)}개`}</NumberText>
              <Icon name={'arrow-right'} size={'xs'} />
            </IconLabelContainer>
          </StatItemContainer>
        </Link>
        <Divider />
        <Link to="/categories">
          <StatItemContainer>
            <IconLabelContainer>
              <Icon name={'folder'} size={'s'} />
              <IconText>카테고리</IconText>
            </IconLabelContainer>

            <IconLabelContainer>
              <NumberText>{`${numberWithCommas(
                numberOfCategories,
              )}개`}</NumberText>
              <Icon name={'arrow-right'} size={'xs'} />
            </IconLabelContainer>
          </StatItemContainer>
        </Link>
        <Divider />
        <Link to="/comments">
          <StatItemContainer>
            <IconLabelContainer>
              <Icon name={'message'} size={'s'} />
              <IconText>댓글</IconText>
            </IconLabelContainer>

            <IconLabelContainer>
              <NumberText>{`${numberWithCommas(
                numberOfComments,
              )}개`}</NumberText>
              <Icon name={'arrow-right'} size={'xs'} />
            </IconLabelContainer>
          </StatItemContainer>
        </Link>
        <Divider />
      </StatsContainer>
    </Container>
  );
};

export default StatsBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getRem(2)};
`;
const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${getRem(10)};
`;
const StatItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getRem(10)};
`;
const IconLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.white};
`;
const IconText = styled(Text.Span)`
  margin-left: 0.8rem;
`;
const NumberText = styled(Text.Span)`
  margin-right: 0.5rem;
`;