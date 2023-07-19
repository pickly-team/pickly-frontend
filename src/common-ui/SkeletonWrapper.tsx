import { PropsWithChildren, useEffect, useState } from 'react';

const SkeletonWrapper = ({ children }: PropsWithChildren) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // 300ms 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};

export default SkeletonWrapper;
