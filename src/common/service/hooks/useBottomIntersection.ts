import { useCallback, useRef } from 'react';
import useIntersection from './useIntersection';

interface IntersectionObserverProps {
  fetchNextPage: () => void;
}

const useBottomIntersection = ({
  fetchNextPage,
}: IntersectionObserverProps) => {
  const bottom = useRef(null);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage],
  );

  useIntersection({
    onIntersect,
    target: bottom,
  });

  return { bottom };
};

export default useBottomIntersection;
