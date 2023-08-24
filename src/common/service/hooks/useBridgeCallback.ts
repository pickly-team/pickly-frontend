import { useEffect } from 'react';

type MessageHandlers = {
  [K in keyof BridgeParams]: (params: BridgeParams[K]) => void;
};

interface MessageEventData<T extends keyof BridgeParams> {
  message: T;
  params: BridgeParams[T];
}

interface BridgeParams {
  /** 웹뷰 종료 */
  browserExit: null;
  /** 웹뷰 로그인 */
  login: {
    token: string;
    memberId: number;
  };
  /** snap 초기화 */
  initialize: null;
  /** 페이지 뒤로 가기 */
  goBack: null;
  /** 새로고침 */
  refetch: null;
  /** 안드로이드 url 공유 */
  androidShareUrl: {
    url: string;
  };
}

function useBridgeCallback<T extends keyof BridgeParams>(
  message: T,
  callback: MessageHandlers[T],
) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event && event.data) {
        try {
          const data = JSON.parse(event.data) as MessageEventData<T>;
          if (data.message === message) {
            callback(data.params);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    };

    if (window.ReactNativeWebView) {
      /** android */
      (document as any).addEventListener('message', handler);
      /** ios */
      window.addEventListener('message', handler);
    } else {
      return;
    }
    return () => {
      (document as any).removeEventListener('message', handler);
      window.removeEventListener('message', handler);
    };
  }, [message, callback]);
}

export default useBridgeCallback;
