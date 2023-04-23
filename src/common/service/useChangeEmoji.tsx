import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { useState } from 'react';

const useChangeEmoji = () => {
  const [emoji, setEmoji] = useState('📖');
  const {
    close: closeEmojiBS,
    open: openEmojiBS,
    isOpen: isEmojiBSOpen,
  } = useBottomSheet();

  const setEmojiBSOpen = () => {
    openEmojiBS();
  };

  const onChangeEmoji = (emoji: string) => {
    setEmoji(emoji);
    closeEmojiBS();
  };

  return { emoji, onChangeEmoji, setEmojiBSOpen, isEmojiBSOpen };
};

export default useChangeEmoji;
