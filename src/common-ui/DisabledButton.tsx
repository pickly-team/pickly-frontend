/* eslint-disable react/jsx-props-no-spreading */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { css } from '@emotion/react';
import { ColorType, theme } from '@/styles/theme';

export type ButtonProps = {
  buttonColor?: ColorType;
  activeButtonColor?: ColorType;
  disabledButtonColor?: ColorType;
  color?: ColorType;
  width?: number;
  height?: number;
  fontSize?: number;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @param {number} width rem 단위 
 * @param {number} height rem 단위
 * @param {number} fontSize rem 단위
 *
 * @example
 *  <DisabledButton
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
      </DisabledButton>
 */

/** */

const DisabledButton = ({
  children,
  type = 'button',
  width = 100,
  height = 3,
  fontSize = 1,
  buttonColor = 'buttonGreen',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={false}
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
        transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
        &:focus {
          outline: none;
        }
        &:active {
          background-color: ${theme.colors.grey900};
        }
        &:read-only {
          background-color: ${theme.colors.grey800};
          cursor: not-allowed;
        }
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DisabledButton;
