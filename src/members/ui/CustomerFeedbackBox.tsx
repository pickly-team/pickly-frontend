import RoundedBox from '@/members/ui/RoundedBox';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';
import useToast from '@/common-ui/Toast/hooks/useToast';
import { Link } from '@/common-ui/Link';

const CustomerFeedbackBox = () => {
  const { fireToast } = useToast();

  const onClickInquiry = () => {
    fireToast({
      message: '준비 중인 기능이에요',
      mode: 'ERROR',
    });
  };

  return (
    <Container>
      <Link
        style={{ width: '100%' }}
        activityName="FaqPage"
        activityParams={{}}
      >
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
      </Link>
      <BoxWrapper onClick={onClickInquiry}>
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

const BoxWrapper = styled.div`
  width: 100%;
`;

const FeedbackText = styled(Text.Span)`
  color: ${theme.colors.grey900};
`;

export default CustomerFeedbackBox;
