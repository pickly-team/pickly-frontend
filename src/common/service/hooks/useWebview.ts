import React from 'react';

declare global {
  interface Window {
    isInWebview: boolean;
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export type POST_MESSAGE_TYPE = 'login' | 'notification' | 'goBack' | 'signUp';

const useWebview = () => {
  return React.useMemo(() => {
    const isInWebview = window.isInWebview;
    const postMessage = (message: POST_MESSAGE_TYPE) => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(message);
      }
    };

    return {
      isInWebview,
      postMessage,
    };
  }, []);
};

export default useWebview;
