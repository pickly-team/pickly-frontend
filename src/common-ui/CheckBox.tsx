import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  useState,
} from 'react';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Icon from './assets/Icon';

type CheckBoxProps = {
  onChange: (isChecked: boolean) => void;
  isChecked?: boolean;
  size?: number;
  color?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'checked'>;

const CheckBox: ForwardRefRenderFunction<HTMLInputElement, CheckBoxProps> = (
  {
    id,
    onChange,
    isChecked,
    size = 24,
    color = theme.colors.white,
    children,
    ...restProps
  },
  ref,
) => {
  const [checked, setChecked] = useState<boolean | undefined>(isChecked);

  const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.target;
    setChecked(checked);
    onChange?.(checked);
  };

  return (
    <StyledLabel htmlFor={id}>
      <StyledInput
        type={'checkbox'}
        id={id}
        onChange={_onChange}
        checked={checked}
        {...restProps}
        ref={ref}
      />
      {checked ? (
        <Icon name="check" size="s" />
      ) : (
        <Icon name="check-none" size="s" />
      )}
      {children}
    </StyledLabel>
  );
};

export default forwardRef(CheckBox);

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  height: fit-content;
`;

const StyledInput = styled.input`
  display: none;
`;
