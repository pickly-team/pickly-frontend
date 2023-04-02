import useAuthStore from '@/store/auth';

type MessageType = 'login';

type Message = {
  id: string;
  type: MessageType;
  content: string;
};

const RNListener = () => {
  const login = useAuthStore((state) => state.login);
  /** react native 환경에서만 가능 */
  const listener = (event) => {
    const message = JSON.parse(event.data);
    handleMessage(message);
  };

  const handleMessage = (message: Message) => {
    switch (message.type) {
      case 'login':
        login(JSON.parse(message.content).refreshToken);
        break;
      default:
        break;
    }
  };

  if (window.isInWebview) {
    /** android */
    document.addEventListener('message', listener);
    /** ios */
    window.addEventListener('message', listener);
  }

  return null;
};

export default RNListener;
