import checkValidateURL from '@/utils/checkValidateURL';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import useBookmarkStore from '@/store/bookmark';
import { useGETOgDataQuery } from '@/bookmarks/api/bookmark';

interface InputUrlProps {
  defaultUrl?: string;
  defaultTitle?: string;
}

const useInputUrl = ({ defaultTitle, defaultUrl }: InputUrlProps) => {
  const { bookmarkInfo, setBookmarkInfo, isBookmarkError } = useBookmarkStore();

  const [debouncedUrl, setDebouncedUrl] = useState<string>('');

  useEffect(() => {
    if (defaultUrl !== undefined && defaultTitle !== undefined) {
      setBookmarkInfo((prev) => ({
        ...prev,
        url: defaultUrl,
        title: defaultTitle,
      }));
      // 초기 URL이 설정되었으므로 debouncedUrl도 설정합니다.
      setDebouncedUrl(defaultUrl);
    }
    // 의존성 배열에서 isInitial을 제거합니다.
  }, [defaultUrl, defaultTitle]);

  // url 입력시 0.5초 후에 url 검증
  // 추가적으로 title 불러오는 api 호출
  const debouncedChangeUrl = useCallback(
    debounce((url) => setDebouncedUrl(url), 750),
    [],
  );

  let isDeleting = false; // 사용자가 지우는 동작을 수행하고 있는지 여부를 저장하는 변수

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === 'Backspace' || key === 'Delete') {
      isDeleting = true;
      setBookmarkInfo((prev) => ({
        ...prev,
        url: '',
      }));
    } else {
      isDeleting = false;
    }
  };

  const onChangeUrl = (url: string) => {
    setBookmarkInfo((prev) => ({
      ...prev,
      url,
    }));
    if (!isDeleting) {
      debouncedChangeUrl(url);
    }
  };

  const onChangeTitle = useCallback((title: string) => {
    setBookmarkInfo((prev) => ({
      ...prev,
      title,
    }));
  }, []);

  const onDeleteInput = (type: 'url' | 'title') => {
    if (type === 'url') {
      setBookmarkInfo(() => ({
        thumbnail: '',
        url: '',
        title: '',
      }));
      setDebouncedUrl('');
    }
    type === 'title' && setBookmarkInfo((prev) => ({ ...prev, title: '' }));
  };

  const { isFetching } = useGETOgDataQuery({
    url: checkValidateURL(debouncedUrl),
    enabled: !isBookmarkError,
    setOGData: (ogData) => {
      ogData.title &&
        setBookmarkInfo((prev) => ({ ...prev, title: ogData.title }));
    },
  });

  const resetAllInputs = () => {
    setBookmarkInfo(() => ({
      thumbnail: '',
      url: '',
      title: '',
    }));
  };

  return {
    url: bookmarkInfo.url,
    title: bookmarkInfo.title,
    thumbnail: bookmarkInfo.thumbnail,
    onChangeUrl,
    onChangeTitle,
    handleKeyDown,
    onDeleteInput,
    resetAllInputs,
    isLoadingGetTitle: isFetching,
  };
};

export default useInputUrl;
