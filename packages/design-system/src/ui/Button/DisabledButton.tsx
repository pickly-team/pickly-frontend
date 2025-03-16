import {theme} from 'shared/styles/theme';
import type {ColorType} from 'shared/styles/theme';
import type {ButtonHTMLAttributes, ReactNode} from 'react';
import styled from '@emotion/styled';

export type DisabledButtonProps = {
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
}: DisabledButtonProps) => {
  return (
    <DisabledButtonStyled
      width={width}
      height={height}
      fontSize={fontSize}
      type={type}
      disabled={false}
      buttonColor={buttonColor}
      {...rest}
    >
      {children}
    </DisabledButtonStyled>
  );
};

export default DisabledButton;

const DisabledButtonStyled = styled.button<DisabledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({width}) => `${width}%`};
  height: ${({height}) => `${height}rem`};
  border: 0 solid transparent;
  border-radius: 0.5rem;
  background-color: ${({buttonColor}) =>
    buttonColor && theme.colors[buttonColor]};
  font-size: ${({fontSize}) => `${fontSize}rem`};
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  transition:
    color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: ${theme.colors.grey900};
  }
  &:read-only {
    background-color: ${({buttonColor}) =>
      buttonColor && theme.colors[buttonColor]};
    cursor: not-allowed;
  }
`;
