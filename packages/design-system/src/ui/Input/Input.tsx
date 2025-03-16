import {getRem} from '../../shared/utils/getRem';
import {theme, type ColorType} from 'shared/styles/theme';
import type {
  ChangeEvent,
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
} from 'react';
import {forwardRef} from 'react';
import styled from '@emotion/styled';

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
    <InputStyled
      type='text'
      color={color}
      backgroundColor={backgroundColor}
      border={border}
      focusTheme={focusTheme}
      ref={ref}
      {...restProps}
    >
      {restProps.children}
    </InputStyled>
  );
};

export default forwardRef(Input);

const InputStyled = styled.input<InputProps>`
  box-shadow: none;
  font-size: 1rem;
  appearance: none;
  color: ${({color}) => (color ? theme.colors[color] : 'transparent')};
  font-family: 'NanumSquareRoundR';
  border-radius: ${({border}) =>
    border?.borderRadius ? `${border.borderRadius}rem` : '0'};
  border: ${({border}) =>
    border?.borderWidth && border?.color
      ? `${border.borderWidth}px solid ${theme.colors[border.color]}`
      : 'none'};
  background-color: ${({backgroundColor}) =>
    backgroundColor ? theme.colors[backgroundColor] : 'transparent'};
  transition: all 0.5s ease-out;
  width: 100%;
  height: ${getRem(52)};
  padding: ${getRem(15)};
  box-sizing: border-box;
  :focus {
    outline: none;
    color: ${({focusTheme}) =>
      focusTheme?.color ? theme.colors[focusTheme.color] : theme.colors.white};
    background-color: ${({focusTheme}) =>
      focusTheme?.backgroundColor
        ? theme.colors[focusTheme.backgroundColor]
        : theme.colors.grey800};
  }
  ::placeholder {
    color: ${theme.colors.black};
  }
  :disabled {
    background-color: ${theme.colors.darkBlack};
  }
`;
