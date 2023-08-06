import useWebview, {
  POST_MESSAGE_TYPE,
} from '@/common/service/hooks/useWebview';

const WithPostMessage = (props: {
  children: (
    postMessage: (message: POST_MESSAGE_TYPE) => void,
  ) => React.ReactNode;
}) => {
  const { postMessage } = useWebview();

  return props.children(postMessage);
};

export default WithPostMessage;
