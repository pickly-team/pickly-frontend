import { useCallback, useRef } from 'react';
import useIntersection from './useIntersection';

interface IntersectionObserverProps {
  fetchNextPage: () => void;
  enabled?: boolean;
}

const useBottomIntersection = ({
  fetchNextPage,
  enabled = true,
}: IntersectionObserverProps) => {
  const bottom = useRef(null);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!enabled) return;
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage, enabled],
  );

  useIntersection({
    onIntersect,
    target: bottom,
  });

  return { bottom };
};

export default useBottomIntersection;
