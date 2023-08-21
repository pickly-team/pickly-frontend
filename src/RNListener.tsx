import useAuthStore from '@/store/auth';
import useBridgeCallback from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';
import useBookmarkStore from './store/bookmark';
import useWebview from './common/service/hooks/useWebview';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigatePath } from './constants/navigatePath';

const RNListener = () => {
  const { memberId, login, userInfo } = useAuthStore();
  const { initializeUrlAndTitle } = useBookmarkStore();

  const { postMessage } = useWebview();

  useEffect(() => {
    postMessage('login', null);
  }, []);

  const router = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.name.slice(0, 3) + '-+@' === userInfo.nickname) {
        router(navigatePath.USER);
      }
    }
  }, [userInfo]);

  useBridgeCallback(({ message, params }) => {
    if (message === 'login') {
      if (params?.memberId && params?.token) {
        login({ token: params.token, memberId: params.memberId });
      }
    }
    if (message === 'initialize') {
      initializeUrlAndTitle();
    }
  });

  useGETUserProfile({ loginId: memberId });

  return null;
};

export default RNListener;
