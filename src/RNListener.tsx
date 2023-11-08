import useAuthStore from '@/store/auth';
import useBridgeCallback from './common/service/hooks/useBridgeCallback';
import { useGETUserProfile } from './auth/api/profile';
import useBookmarkStore from './store/bookmark';
import useWebview from './common/service/hooks/useWebview';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigatePath } from './constants/navigatePath';
import useHandleRefresh from './common/service/hooks/useHandleRefresh';
import useCommentStore from './store/comment';
import useVersionStore from './store/version';

const PREFIX = '-+@*' as const;

const RNListener = () => {
  const { memberId, login, userInfo } = useAuthStore();
  const { initializeBookmarkInfo } = useBookmarkStore();
  const { initComment } = useCommentStore();

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

  useBridgeCallback('login', (params) => {
    if (!params.memberId) return;
    login(params);
  });

  useBridgeCallback('initialize', () => {
    initializeBookmarkInfo();
    initComment();
  });

  useBridgeCallback('refetch', () => {
    postMessage('refetch', null);
    handleRefresh();
  });

  const { setBookmarkInfo } = useBookmarkStore();

  useBridgeCallback('androidShareUrl', (params) => {
    if (params.url === '') return;
    setBookmarkInfo((prev) => ({
      ...prev,
      url: params.url,
    }));
    router(navigatePath.BOOKMARK_ADD);
  });

  useGETUserProfile({ loginId: memberId });

  useEffect(() => {
    postMessage('appVersion', null);
  }, []);

  const { setVersion, setBuildNumber, setPlatform } = useVersionStore();
  useBridgeCallback('appVersion', (data) => {
    setVersion(data.version);
    setBuildNumber(data.buildNumber);
    setPlatform(data.platform);
  });

  return null;
};

export default RNListener;
