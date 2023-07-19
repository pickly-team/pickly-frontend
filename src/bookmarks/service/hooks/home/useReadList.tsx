import useBookmarkStore from '@/store/bookmark';

const useReadList = () => {
  const { isReadMode, setIsReadMode } = useBookmarkStore();

  const onClickReadMode = () => {
    setIsReadMode(!isReadMode);
  };

  return {
    isReadMode,
    onClickReadMode,
  };
};

export default useReadList;
