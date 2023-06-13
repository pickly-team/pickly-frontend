import { Visibility } from '@/bookmarks/api/bookmark';
import { useCallback, useState } from 'react';

const useSelectPublishScoped = () => {
  const [selectedPublishScoped, setPublishScoped] =
    useState<Visibility>('SCOPE_PUBLIC');

  const onClickPublishScoped = useCallback((type: Visibility) => {
    setPublishScoped(type);
  }, []);

  return {
    selectedPublishScoped,
    onClickPublishScoped,
  };
};
export default useSelectPublishScoped;
