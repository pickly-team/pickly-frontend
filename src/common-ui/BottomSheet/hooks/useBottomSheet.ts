import { useState } from 'react';

const useBottomSheet = (initialOpen?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen ?? false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
  };
};

export default useBottomSheet;
