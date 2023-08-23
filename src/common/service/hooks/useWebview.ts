import React from 'react';

declare global {
  interface Window {
    isInWebview: boolean;
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export interface PostBridgeParams {
  /** 웹뷰 로그인 */
  login: null;
  /** 알림 */
  notification: null;
  /** 페이지 뒤로 가기 */
  goBack: null;
  /** 회원가입 */
  signUp: null;
  /** 북마크 방문 */
  visitBookmark: {
    url: string;
  };
  /** 진동 */
  vibrate: null;
  /** 이메일 */
  email: null;
  /** 새로고침 끝 */
  refetch: null;
}
function useWebview<T extends keyof PostBridgeParams>() {
  return React.useMemo(() => {
    const isInWebview = window.isInWebview;
    const postMessage = (message: T, data: PostBridgeParams[T]) => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            message: message,
            params: data,
          }),
        );
      }
    };

    return {
      isInWebview,
      postMessage,
    };
  }, []);
}

export default useWebview;
