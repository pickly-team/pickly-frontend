import { css } from '@emotion/react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
interface EmojiSelectBSProps {
  onChangeEmoji: (emoji: string) => void;
  closeEmojiBS: () => void;
}

const EmojiSelect = ({ onChangeEmoji, closeEmojiBS }: EmojiSelectBSProps) => {
  return (
    <div
      css={css`
        background: transparent;
        bottom: 0px;
        left: 0px;
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100dvh;
        width: 100vw;
      `}
      id="emoji-backdrop"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'emoji-backdrop') {
          closeEmojiBS();
        }
      }}
    >
      <div
        css={css`
          bottom: 0;
          left: 0;
          position: absolute;
          width: 100%;
          .epr-emoji-category-label {
            top: -1px !important;
          }
          .epr-preview {
            display: none !important;
          }
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
    </div>
  );
};

export default EmojiSelect;
