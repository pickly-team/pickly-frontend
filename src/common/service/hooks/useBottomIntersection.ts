import { useCallback, useRef } from 'react';
import useIntersection from './useIntersection';

interface IntersectionObserverProps {
  fetchNextPage: () => void;
  rootElement?: HTMLElement | null;
  enabled?: boolean;
}

const useBottomIntersection = ({
  fetchNextPage,
  rootElement = null,
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
    [fetchNextPage, enabled, rootElement],
  );

  useIntersection({
    onIntersect,
    target: bottom,
    rootElement: rootElement,
  });

  return { bottom };
};

export default useBottomIntersection;
