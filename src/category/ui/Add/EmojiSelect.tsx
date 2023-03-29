import { css } from '@emotion/react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
interface EmojiSelectBSProps {
  onChangeEmoji: (emoji: string) => void;
}

const EmojiSelect = ({ onChangeEmoji }: EmojiSelectBSProps) => {
  return (
    <div
      css={css`
        position: absolute;
        bottom: 0;
        width: 100%;
      `}
    >
      <EmojiPicker
        lazyLoadEmojis={true}
        autoFocusSearch={false}
        width={'100%'}
        theme={Theme.DARK}
        onEmojiClick={(emoji) => onChangeEmoji(emoji.emoji)}
      />
    </div>
  );
};

export default EmojiSelect;
