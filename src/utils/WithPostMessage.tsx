import useWebview, {
  PostBridgeParams,
} from '@/common/service/hooks/useWebview';

const WithPostMessage = (props: {
  children: (
    postMessage: (
      message: keyof PostBridgeParams,
      data: {
        url: string;
      } | null,
    ) => void,
  ) => React.ReactNode;
}) => {
  const { postMessage } = useWebview();

  return props.children(postMessage);
};

export default WithPostMessage;
