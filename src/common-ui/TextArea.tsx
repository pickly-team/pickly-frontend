import { ChangeEvent } from 'react';
import { theme } from '@/styles/theme';
import TextAreaAutoSize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { css } from '@emotion/react';
import getRem from '@/utils/getRem';

type TextAreaProps = {
  disable: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
} & TextareaAutosizeProps;

const TextArea = ({
  disable,
  onChange,
  onFocus,
  ...restProps
}: TextAreaProps) => {
  return (
    <TextAreaAutoSize
      disabled={disable}
      maxRows={3}
      placeholder="댓글을 남겨 보세요"
      onChange={onChange}
      css={css`
        width: 100%;
        overflow: scroll;
        padding: ${getRem(10)};
        resize: none;
        border: none;
        color: ${theme.colors.grey200};
        background: transparent;
        scrollbar-width: auto;
        outline: none;
        font-weight: 40;
        font-size: 16px;
        caret-color: ${theme.colors.grey200};
        line-height: 22.5px;
        ::placeholder {
          color: ${theme.colors.grey700};
        }
        transition: all ease 0.5s 0s;
        border-radius: 1rem;
      `}
      onFocus={onFocus}
      {...restProps}
    />
  );
};

export default TextArea;
