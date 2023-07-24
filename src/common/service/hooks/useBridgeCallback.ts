import { useEffect } from 'react';

interface MessageEventData<T extends keyof BridgeParams> {
  message: T;
  params?: BridgeParams[T];
}

type MessageHandler<T extends keyof BridgeParams> = (
  data: MessageEventData<T>,
) => void;

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
}

function useBridgeCallback<T extends keyof BridgeParams>(
  callback: MessageHandler<T>,
) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event && event.data) {
        try {
          const data = JSON.parse(event.data) as MessageEventData<T>;
          const message = data.message;
          const params = data.params;

          callback({ message, params });
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
  }, [callback]);
}

export default useBridgeCallback;
