import useAuthStore from '@/store/auth';
import useMessageListener from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';

declare global {
  interface Window {
    isInWebview: boolean;
  }
}

const RNListener = () => {
  const { memberId, login, setUserInfo } = useAuthStore();

  useMessageListener(({ message, params }) => {
    if (message === 'login') {
      login(params?.token ?? '', params?.memberId ?? 0);
    }
  });

  useGETUserProfile({ loginId: memberId }, setUserInfo);

  return null;
};

export default RNListener;
