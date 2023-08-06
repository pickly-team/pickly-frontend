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

const NotificationSettingBox = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const { memberId } = useAuthStore();

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
    if (isNotificationOn) postMessage('notification');
  }, [isNotificationOn]);

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
        <Text.Span color={'grey900'} fontSize={1.2}>
          {'🔔 '}
        </Text.Span>
        <Text.Span color={'grey900'} fontSize={1.1}>
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
