import { ColorType, theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import { css } from '@emotion/react';
import {
  ChangeEvent,
  ComponentPropsWithRef,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

export type InputProps = {
  value: string;
  color?: ColorType;
  backgroundColor?: ColorType;
  focusTheme?: {
    color?: ColorType;
    backgroundColor?: ColorType;
  };
  border?: {
    color?: ColorType;
    borderWidth?: number;
    borderRadius?: number;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithRef<'input'>;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    color = 'white',
    backgroundColor = 'grey900',
    border = {
      borderRadius: 1,
      borderWidth: 0,
      color: undefined,
    },
    focusTheme = {
      color: 'white',
      backgroundColor: 'grey800',
    },
    ...restProps
  },
  ref,
) => {
  return (
    <input
      type={'text'}
      css={css`
        box-shadow: none;
        font-size: 1rem;
        appearance: none;
        color: ${theme.colors[color]};
        font-family: 'NanumSquareRoundR';
        border-radius: ${border.borderRadius}rem;
        border: ${border.borderWidth && border.color
          ? `${border.borderWidth}px solid ${theme.colors[border.color]}`
          : 'none'};
        background-color: ${theme.colors[backgroundColor]};
        transition: all 0.5s ease-out;
        width: 100%;
        height: ${getRem(52)};
        padding: ${getRem(15)};
        box-sizing: border-box;
        :focus {
          outline: none;
          color: ${focusTheme.color
            ? theme.colors[focusTheme.color]
            : theme.colors.white};
          background-color: ${focusTheme.backgroundColor
            ? theme.colors[focusTheme.backgroundColor]
            : theme.colors.grey800};
        }
        ::placeholder {
          color: ${theme.colors.black};
        }
        :disabled {
          background-color: ${theme.colors.darkBlack};
        }
      `}
      ref={ref}
      {...restProps}
    />
  );
};

export default forwardRef(Input);
