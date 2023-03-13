import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import Button from '@/common-ui/Button';
import RoundedBox from '@/members/ui/RoundedBox';
import {
  NotificationSetting,
  toReadableNotificationSettingType,
  toReadableTime,
} from '@/notification/api/notification';
import { useState } from 'react';

const NotificationSettingBox = () => {
  return (
    <RoundedBox style={{ marginTop: '2.375rem' }}>
      <Text.Span color={'grey900'} weight="bold" fontSize={1.25}>
        알림 시간 관리
      </Text.Span>
      <NotificationRow>
        <NotificationSettingText />
        <ChangeButton />
      </NotificationRow>
    </RoundedBox>
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
const NotificationSettingText = () => {
  const [notificationSetting] = useState<NotificationSetting>({
    type: 'daily',
    time: {
      hour: 10,
      minute: 0,
    },
  });

  return (
    <NotificationSettingTextContainer>
      <Icon name={'alarm-green'} size={'s'} />
      <Text.Span
        color={'grey900'}
        weight="bold"
        fontSize={0.75}
        style={{ marginLeft: '0.625rem', marginRight: '0.625rem' }}
      >
        {toReadableNotificationSettingType(notificationSetting)}
      </Text.Span>
      <Text.Span color={'grey600'} weight="bold" fontSize={0.625}>
        {toReadableTime(notificationSetting.time)}
      </Text.Span>
    </NotificationSettingTextContainer>
  );
};
const ChangeButton = () => {
  return (
    <Button width={40} disabled style={{ fontWeight: 'bold' }}>
      변경하기
    </Button>
  );
};
