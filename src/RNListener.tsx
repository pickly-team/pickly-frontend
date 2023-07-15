import useAuthStore from '@/store/auth';
import useBridgeCallback from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';
import { usePOSTNotificationStandardQuery } from './members/api/member';
import { useEffect } from 'react';

declare global {
  interface Window {
    isInWebview: boolean;
  }
}

const RNListener = () => {
  const { memberId, login, setUserInfo, userInfo } = useAuthStore();

  useBridgeCallback(({ message, params }) => {
    if (message === 'login') {
      if (params?.memberId && params?.token) {
        login({ token: params.token, memberId: params.memberId });
      }
    }
  });

  useGETUserProfile({ loginId: memberId }, setUserInfo);

  const { mutate } = usePOSTNotificationStandardQuery();

  useEffect(() => {
    if (memberId && !userInfo.nickname) {
      mutate({
        loginId: memberId,
        postData: {
          isActive: true,
          notifyDailyAt: '09:00',
        },
      });
    }
  }, [memberId, userInfo.nickname]);

  return null;
};

export default RNListener;
