import Icon from '../../shared/assets/Icon';
import type {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ForwardRefRenderFunction,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import {forwardRef, useEffect, useState} from 'react';
import styled from '@emotion/styled';

export type CheckBoxProps = {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'checked'>;

export const CheckBoxWithRef: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = ({id, onChange, isChecked, children, ...restProps}, ref) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const _onChange: ChangeEventHandler<HTMLInputElement> = event => {
    const {checked} = event.target;
    setChecked(checked);
    onChange?.(checked);
  };

  return (
    <StyledLabel htmlFor={id}>
      <StyledInput
        type='checkbox'
        id={id}
        onChange={_onChange}
        onClick={() => {
          onChange?.(true);
        }}
        checked={checked}
        {...restProps}
        ref={ref}
      />
      {checked ? (
        <Icon name='check-green' size='s' />
      ) : (
        <Icon name='check-none-green' size='s' />
      )}
      {children}
    </StyledLabel>
  );
};

export const CheckBox: ForwardRefExoticComponent<
  CheckBoxProps & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, CheckBoxProps>(CheckBoxWithRef);

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  height: fit-content;
`;

const StyledInput = styled.input`
  display: none;
`;
