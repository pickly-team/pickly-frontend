import useAuthStore from '@/store/auth';
import useBridgeCallback from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';
import useBookmarkStore from './store/bookmark';
import useWebview from './common/service/hooks/useWebview';
import { useEffect } from 'react';

const RNListener = () => {
  const { memberId, login } = useAuthStore();
  const { setUrl, setTitle, setReadOption } = useBookmarkStore();

  const { postMessage } = useWebview();

  useEffect(() => {
    postMessage('login');
  }, []);

  useBridgeCallback(({ message, params }) => {
    if (message === 'login') {
      if (params?.memberId && params?.token) {
        login({ token: params.token, memberId: params.memberId });
      }
    }
    if (message === 'initialize') {
      setUrl('');
      setTitle('');
      setReadOption('📖 전체');
    }
  });

  useGETUserProfile({ loginId: memberId });

  return null;
};

export default RNListener;
