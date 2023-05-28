import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from 'react';

import styled from '@emotion/styled';
import Icon from './assets/Icon';

type CheckBoxProps = {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'checked'>;

export const CheckBox: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = ({ id, onChange, isChecked, children, ...restProps }, ref) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

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
        <Icon name="check-green" size="s" />
      ) : (
        <Icon name="check-none-green" size="s" />
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
