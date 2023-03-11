import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import Button from '@/common-ui/Button';
import WhiteRoundedBox from '@/members/ui/WhiteRoundBox';

const NotificationSettingBox = () => {
  return (
    <WhiteRoundedBox style={{ marginTop: '2.375rem' }}>
      <Text.Span color={'grey900'} weight="bold" fontSize={1.25}>
        알림 시간 관리
      </Text.Span>
      <NotificationRow>
        <NotificationSettingTextContainer>
          <Icon name={'alarm-green'} size={'s'} />
          <Text.Span
            color={'grey900'}
            weight="bold"
            fontSize={0.75}
            style={{ marginLeft: '0.625rem', marginRight: '0.625rem' }}
          >
            매일
          </Text.Span>
          <Text.Span color={'grey600'} weight="bold" fontSize={0.625}>
            오전 10시
          </Text.Span>
        </NotificationSettingTextContainer>
        <Button width={40} disabled style={{ fontWeight: 'bold' }}>
          변경하기
        </Button>
      </NotificationRow>
    </WhiteRoundedBox>
  );
};

export default NotificationSettingBox;

const NotificationRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.625rem;
  align-items: center;
`;
const NotificationSettingTextContainer = styled.div`
  display: flex;
  align-items: center;
`;
