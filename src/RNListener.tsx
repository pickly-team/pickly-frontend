import useAuthStore from '@/store/auth';
import useBridgeCallback from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';
import { useEffect } from 'react';

declare global {
  interface Window {
    isInWebview: boolean;
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

const RNListener = () => {
  const { memberId, login } = useAuthStore();

  useEffect(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('login');
    }
  }, []);

  useBridgeCallback(({ message, params }) => {
    if (message === 'login') {
      if (params?.memberId && params?.token) {
        login({ token: params.token, memberId: params.memberId });
      }
    }
  });

  useGETUserProfile({ loginId: memberId });

  return null;
};

export default RNListener;
