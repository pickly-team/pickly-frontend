import { useGETBookmarkTitleQuery } from '@/bookmarks/api/bookmark';
import checkValidateURL from '@/utils/checkValidateURL';
import { useState } from 'react';
import { debounce } from 'lodash';

const useInputUrl = () => {
  const [url, setUrl] = useState<string>('');
  const [debouncedUrl, setDebouncedUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  // url 입력시 0.5초 후에 url 검증
  // 추가적으로 title 불러오는 api 호출

  const debouncedChangeUrl = debounce((url) => setDebouncedUrl(url), 500);

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
    type === 'url' && setUrl('');
    type === 'title' && setTitle('');
  };

  useGETBookmarkTitleQuery({
    url: checkValidateURL(debouncedUrl) ? debouncedUrl : '',
    setTitle: onChangeTitle,
  });

  const resetAllInputs = () => {
    setUrl('');
    setTitle('');
  };

  return {
    url,
    title,
    onChangeUrl,
    onChangeTitle,
    handleKeyDown,
    onDeleteInput,
    resetAllInputs,
  };
};

export default useInputUrl;
