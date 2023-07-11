import { useEffect } from 'react';

type MessageHandler<T extends keyof BridgeParams> = (data: {
  message: T;
  params?: BridgeParams[T];
}) => void;

interface BridgeParams {
  /** 웹뷰 종료 */
  browserExit: null;
  /** 웹뷰 로그인 */
  login: {
    token: string;
    memberId: number;
  };
}

interface MessageParse<T extends keyof BridgeParams> {
  message: T;
  params?: BridgeParams[T];
}

function useBridgeCallback<T extends keyof BridgeParams>(
  callback: MessageHandler<T>,
) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event && event.data) {
        try {
          const data = JSON.parse(event.data) as MessageParse<T>;
          const message = data.message;
          const params = data.params;

          callback({ message, params });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  }, [callback]);
}

export default useBridgeCallback;
