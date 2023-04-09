import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import React from 'react';

interface ChangeEmoji {
  emoji: string;
}

const useChangeEmoji = ({ emoji: prevEmoji }: ChangeEmoji) => {
  const [emoji, setEmoji] = React.useState(prevEmoji);
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
