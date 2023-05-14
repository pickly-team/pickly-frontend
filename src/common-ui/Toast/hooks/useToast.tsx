import { useCallback, useEffect } from 'react';

import useToastStore, { Toast } from '@/store/toast';

const useToast = (toastDuration = 2000) => {
  const { addToast, removeToast, toasts, setDuration } = useToastStore();

  useEffect(() => {
    setDuration(toastDuration);
  }, [toastDuration]);

  const fireToast = useCallback(
    (toast: Toast) => {
      let { id } = toast;
      if (!id) {
        id = Math.random().toString();
      }
      addToast({ ...toast, id });

      const timer = setTimeout(() => {
        removeToast(id as string);
        clearTimeout(timer);
      }, toastDuration);
    },
    [addToast, removeToast],
  );
  return { toasts, fireToast };
};

export default useToast;
