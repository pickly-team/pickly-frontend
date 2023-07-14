import { Visibility } from '@/bookmarks/api/bookmark';
import { useCallback, useEffect, useState } from 'react';

interface SelectPublishScopedProps {
  defaultPublishScoped?: Visibility;
}

const useSelectPublishScoped = ({
  defaultPublishScoped,
}: SelectPublishScopedProps) => {
  const [selectedPublishScoped, setPublishScoped] =
    useState<Visibility>('SCOPE_PUBLIC');

  useEffect(() => {
    if (defaultPublishScoped) setPublishScoped(defaultPublishScoped);
  }, [defaultPublishScoped]);

  const onClickPublishScoped = useCallback((type: Visibility) => {
    setPublishScoped(type);
  }, []);

  return {
    selectedPublishScoped,
    onClickPublishScoped,
  };
};
export default useSelectPublishScoped;
