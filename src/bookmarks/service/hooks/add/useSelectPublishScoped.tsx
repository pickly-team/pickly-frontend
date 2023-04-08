import { useCallback, useState } from 'react';

export type PublishScopedType = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';

const useSelectPublishScoped = () => {
  const [selectedPublishScoped, setPublishScoped] =
    useState<PublishScopedType>('PUBLIC');

  const onClickPublishScoped = useCallback((type: PublishScopedType) => {
    setPublishScoped(type);
  }, []);

  return {
    selectedPublishScoped,
    onClickPublishScoped,
  };
};
export default useSelectPublishScoped;
