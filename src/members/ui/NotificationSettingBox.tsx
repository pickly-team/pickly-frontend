import { useEffect, useState } from 'react';

import Text from '@/common-ui/Text';
import RoundedBox from '@/members/ui/RoundedBox';
import getRem from '@/utils/getRem';
import RoundToggle from '@/common-ui/RoundToggle';
import {
  useGETNotificationStandardsQuery,
  usePUTNotificationStandardsQuery,
} from '../api/member';
import useAuthStore from '@/store/auth';
import useWebview from '@/common/service/hooks/useWebview';
import useToast from '@/common-ui/Toast/hooks/useToast';

const TEMP_NOTIFICATION_DISABLED = true as const;

const NotificationSettingBox = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const { memberId } = useAuthStore();
  const { fireToast } = useToast();

  const { data: defaultTime } = useGETNotificationStandardsQuery({
    loginId: memberId,
  });

  useEffect(() => {
    if (defaultTime) setIsNotificationOn(defaultTime.isActive);
  }, [defaultTime]);

  const { mutate } = usePUTNotificationStandardsQuery({
    loginId: memberId,
  });

  // 사용자 알림 설정 변경 시, 웹뷰에 권한 요청
  const { postMessage } = useWebview();
  useEffect(() => {
    if (isNotificationOn) postMessage('notification', null);
  }, [isNotificationOn]);

  const onActive = () => {
    if (TEMP_NOTIFICATION_DISABLED) {
      fireToast({
        message: '앗! 알림 기능에 문제가 있어 수정 중이에요',
        mode: 'ERROR',
      });
      return;
    }
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
    if (TEMP_NOTIFICATION_DISABLED) {
      fireToast({
        message: '앗! 알림 기능에 문제가 있어 수정 중이에요',
        mode: 'ERROR',
      });
      return;
    }
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
      >
        <Text.Span color={'grey900'} fontSize={1.2}>
          {'🔔 '}
        </Text.Span>
        <Text.Span color={'grey900'} weight="bold" fontSize={1}>
          알림을 받아볼까요?
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
    </>
  );
};

export default NotificationSettingBox;
