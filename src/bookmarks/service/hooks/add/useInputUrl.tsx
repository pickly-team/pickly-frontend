import { useGETBookmarkTitleQuery } from '@/bookmarks/api/bookmark';
import checkValidateURL from '@/utils/checkValidateURL';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import useBookmarkStore from '@/store/bookmark';
import useAuthStore from '@/store/auth';

interface InputUrlProps {
  defaultUrl?: string;
  defaultTitle?: string;
}

const useInputUrl = ({ defaultTitle, defaultUrl }: InputUrlProps) => {
  const { userInfo } = useAuthStore();
  const { url, setUrl, title, setTitle } = useBookmarkStore();
  const [debouncedUrl, setDebouncedUrl] = useState<string>('');

  const [isInitial, setIsInitial] = useState<boolean>(true);

  useEffect(() => {
    if (defaultTitle) setTitle(defaultTitle);
    if (defaultUrl) setUrl(defaultUrl);
  }, [defaultTitle, defaultUrl]);

  // url 입력시 0.5초 후에 url 검증
  // 추가적으로 title 불러오는 api 호출
  const debouncedChangeUrl = debounce((url) => setDebouncedUrl(url), 500);

  useEffect(() => {
    if (isInitial && url !== '') {
      setIsInitial(false);
      setDebouncedUrl(url);
      return;
    }
  }, [isInitial, url]);

  let isDeleting = false; // 사용자가 지우는 동작을 수행하고 있는지 여부를 저장하는 변수

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === 'Backspace' || key === 'Delete') {
      isDeleting = true;
    } else {
      isDeleting = false;
    }
  };

  const onChangeUrl = (url: string) => {
    setUrl(url);
    if (!isDeleting) {
      debouncedChangeUrl(url);
    }
  };

  const onChangeTitle = (title: string) => {
    setTitle(title);
  };

  const onDeleteInput = (type: 'url' | 'title') => {
    if (type === 'url') {
      setUrl('');
      setDebouncedUrl('');
      setTitle('');
    }
    type === 'title' && setTitle('');
  };

  const { isFetching } = useGETBookmarkTitleQuery({
    memberId: userInfo.id,
    url: checkValidateURL(debouncedUrl) ? checkValidateURL(debouncedUrl) : '',
    setTitle: onChangeTitle,
  });

  const resetAllInputs = () => {
    setUrl('');
    setTitle('');
  };

  return {
    url: url,
    title,
    onChangeUrl,
    onChangeTitle,
    handleKeyDown,
    onDeleteInput,
    resetAllInputs,
    isLoadingGetTitle: isFetching,
  };
};

export default useInputUrl;
