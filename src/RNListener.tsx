import useAuthStore from '@/store/auth';
import useBridgeCallback from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';
import useBookmarkStore from './store/bookmark';
import useWebview from './common/service/hooks/useWebview';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigatePath } from './constants/navigatePath';
import useHandleRefresh from './common/service/hooks/useHandleRefresh';

const PREFIX = '-+@*' as const;

const RNListener = () => {
  const { memberId, login, userInfo } = useAuthStore();
  const { initializeUrlAndTitle } = useBookmarkStore();

  const { postMessage } = useWebview();
  const { handleRefresh } = useHandleRefresh({ pageType: 'MAIN' });

  useEffect(() => {
    postMessage('login', null);
  }, []);

  const router = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.nickname.includes(PREFIX)) {
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
    if (message === 'refetch') {
      postMessage('refetch', null);
      handleRefresh();
    }
  });

  useGETUserProfile({ loginId: memberId });

  return null;
};

export default RNListener;
