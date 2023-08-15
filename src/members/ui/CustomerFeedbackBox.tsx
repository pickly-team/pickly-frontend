import { Link } from 'react-router-dom';

import RoundedBox from '@/members/ui/RoundedBox';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';
import useWebview from '@/common/service/hooks/useWebview';

const CustomerFeedbackBox = () => {
  const { postMessage } = useWebview();

  const onClick_문의하기 = () => {
    postMessage('email', null);
  };

  return (
    <Container>
      <StyledLink to="/faq">
        <RoundedBox
          borderColor="lightPrimary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FeedbackText>❓ FAQ</FeedbackText>
          <Icon name={'arrow-right-black'} size={'xs'} />
        </RoundedBox>
      </StyledLink>
      <BoxWrapper onClick={onClick_문의하기}>
        <RoundedBox
          borderColor="lightPrimary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FeedbackText>📩 문의하기</FeedbackText>
          <Icon name={'arrow-right-black'} size={'xs'} />
        </RoundedBox>
      </BoxWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: ${getRem(21)};
  width: 100%;
  gap: ${getRem(16)};
`;
const StyledLink = styled(Link)`
  width: 100%;
`;

const BoxWrapper = styled.div`
  width: 100%;
`;

const FeedbackText = styled(Text.Span)`
  color: ${theme.colors.grey900};
`;

export default CustomerFeedbackBox;
