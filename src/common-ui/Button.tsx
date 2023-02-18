import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';

type ButtonProps = {
  buttonColor?: keyof typeof theme.colors;
  activeButtonColor?: keyof typeof theme.colors;
  disabledButtonColor?: keyof typeof theme.colors;
  color?: keyof typeof theme.colors;
  width?: number;
  height?: number;
  fontSize?: number;
  children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @param {number} width rem 단위 
 * @param {number} height rem 단위
 * @param {number} fontSize rem 단위
 *
 * @example
 *  <Button
        type="button"
        width={100}
        height={3}
        fontSize={1}
        color="grey200"
        buttonColor="primary"
        activeButtonColor="primary"
        disabledButtonColor="grey800"
      >
        이것은 버튼 입니다.
      </Button>
 */

/** */
const Button: FunctionComponent<ButtonProps> = ({
  children,
  type = 'button',
  width = 100,
  height = 3,
  fontSize = 1,
  buttonColor = 'primary',
  activeButtonColor = 'primary',
  disabledButtonColor = 'grey800',
  ...rest
}) => {
  return (
    <button
      type={type}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${width}%;
        height: ${height}rem;
        border: 0 solid transparent;
        border-radius: 0.5rem;
        background-color: ${theme.colors[buttonColor]};
        font-size: ${fontSize}rem;
        white-space: nowrap;
        user-select: none;
        -webkit-font-smoothing: antialiased;
        transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
        &:focus {
          outline: none;
        }
        &:disabled {
          background-color: ${theme.colors[disabledButtonColor]};
          cursor: not-allowed;
        }
        &:active {
          background-color: ${theme.colors[activeButtonColor]};
        }
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
