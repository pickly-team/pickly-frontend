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
import {
  useGETNotificationStandardsQuery,
  usePUTNotificationStandardsQuery,
} from '../api/member';
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

  const { mutate } = usePUTNotificationStandardsQuery({
    loginId: memberId,
  });

  const onActive = () => {
    setIsNotificationOn(true);
    mutate({
      loginId: memberId,
      putData: {
        isActive: true,
        notifyDailyAt: defaultTime?.notifyDailyAt || '09:00',
      },
    });
  };

  const onDeactivate = () => {
    setIsNotificationOn(false);
    mutate({
      loginId: memberId,
      putData: {
        isActive: false,
        notifyDailyAt: defaultTime?.notifyDailyAt || '09:00',
      },
    });
  };

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
          setOn={onActive}
          setOff={onDeactivate}
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
