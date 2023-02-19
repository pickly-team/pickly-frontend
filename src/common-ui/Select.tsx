import {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ButtonProps } from '@/common-ui/Button';
import styled from '@emotion/styled';

const NO_RESULT_TEST = '선택해주세요';

interface SelectProps
  extends Omit<
    HTMLAttributes<HTMLSelectElement>,
    'onChange' | 'style' | 'className'
  > {
  value?: string;
  onChange: (selectedValue: string) => void;
  TriggerButton: FunctionComponent<ButtonProps>;
}

const Select = ({
  value,
  onChange,
  children,
  TriggerButton,
  ...restProps
}: SelectProps) => {
  const ref = useRef<HTMLSelectElement>(null);
  const [options, setOptions] = useState<HTMLOptionElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const closeSelect = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (ref.current) {
      setOptions(Array.from(ref.current?.querySelectorAll('option')));
    }
  }, []);

  const onClick = (value: string) => {
    if (ref.current) {
      ref.current.value = value;
    }
    onChange(value);
    closeSelect();
  };

  const buttonText = options
    .filter((option) => option.value === value)
    .at(0)?.label;

  return (
    <>
      <TriggerButton onClick={toggleSelect}>
        {buttonText ?? NO_RESULT_TEST}
      </TriggerButton>
      <select ref={ref} style={{ display: 'none' }} {...restProps}>
        {children}
      </select>
      {isOpen && (
        <SelectUlWrapper>
          <SelectUl>
            {options.map((option) => (
              <SelectLi
                key={option.value}
                onClick={() => onClick(option.value)}
              >
                {option.textContent}
              </SelectLi>
            ))}
          </SelectUl>
        </SelectUlWrapper>
      )}
    </>
  );
};

export default Select;

const SelectUlWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${(p) => p.theme.colors.grey900};
  padding: 10px 10px 20px;
`;

const SelectUl = styled.ul`
  max-height: 200px;
  overflow: scroll;
`;

const SelectLi = styled.li`
  cursor: pointer;
  padding: 10px 0;
`;
