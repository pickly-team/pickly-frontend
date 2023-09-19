import React, { useEffect } from 'react';

interface Props {
  target: React.RefObject<HTMLElement>;
  rootElement?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => void;
}

const useIntersection = ({
  target,
  rootElement = null,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: Props) => {
  useEffect(() => {
    if (!target.current) return;
    const io = new IntersectionObserver(onIntersect, {
      root: rootElement,
      threshold,
      rootMargin,
    });

    io.observe(target.current);

    return () => io.disconnect();
  }, [onIntersect, target, threshold, rootElement, rootMargin]);
};

export default useIntersection;
