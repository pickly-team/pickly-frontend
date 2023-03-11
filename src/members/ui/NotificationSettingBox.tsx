import { useState } from 'react';

import Text from '@/common-ui/Text';
import RoundedBox from '@/members/ui/RoundedBox';
import getRem from '@/utils/getRem';
import {
  NotificationSetting,
  toReadableTime,
} from '@/notification/api/notification';
import RoundToggle from '@/common-ui/RoundToggle';

const NotificationSettingBox = ({
  notificationSetting,
}: {
  notificationSetting: NotificationSetting;
}) => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  return (
    <RoundedBox
      style={{
        position: 'relative',
        marginTop: getRem(21),
        paddingTop: `${getRem(30)}`,
        paddingBottom: `${getRem(30)}`,
      }}
      borderColor="lightPrimary"
    >
      <Text.Span color={'grey900'} fontSize={1.25}>
        {`🔔 ${toReadableTime(notificationSetting.time)}`}
      </Text.Span>
      <RoundToggle
        style={{
          position: 'absolute',
          right: getRem(20),
          top: `calc(50% - ${getRem(17)})`,
        }}
        isOn={isNotificationOn}
        setOn={() => setIsNotificationOn(true)}
        setOff={() => setIsNotificationOn(false)}
      />
    </RoundedBox>
  );
};

export default NotificationSettingBox;
