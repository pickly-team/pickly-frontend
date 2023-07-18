import { useEffect, useState } from 'react';

import Text from '@/common-ui/Text';
import RoundedBox from '@/members/ui/RoundedBox';
import getRem from '@/utils/getRem';
import {
  NotificationSetting,
  toReadableTime,
} from '@/notification/api/notification';
import RoundToggle from '@/common-ui/RoundToggle';
import NotificationSettingsBottomSheet from '@/members/ui/NotificationSettingsBottomSheet';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { useGETNotificationStandardsQuery } from '../api/member';
import useAuthStore from '@/store/auth';

const NotificationSettingBox = ({
  notificationSetting,
}: {
  notificationSetting: NotificationSetting;
}) => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const { isOpen, open, close } = useBottomSheet();

  const { memberId } = useAuthStore();

  const { data: defaultTime } = useGETNotificationStandardsQuery({
    loginId: memberId,
  });

  useEffect(() => {
    if (defaultTime) {
      setIsNotificationOn(defaultTime.isActive);
    }
  }, [defaultTime]);

  return (
    <>
      <RoundedBox
        style={{
          position: 'relative',
          marginTop: getRem(21),
          paddingTop: `${getRem(30)}`,
          paddingBottom: `${getRem(30)}`,
        }}
        onClick={() => isNotificationOn && open()}
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
      <NotificationSettingsBottomSheet
        defaultTime={defaultTime?.notifyDailyAt || '09:00'}
        open={isOpen}
        onClose={close}
      />
    </>
  );
};

export default NotificationSettingBox;
