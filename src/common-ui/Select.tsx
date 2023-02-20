import {
  ChangeEventHandler,
  FunctionComponent,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ButtonProps } from '@/common-ui/Button';
import styled from '@emotion/styled';

const NO_RESULT_TEST = '선택해주세요';
const NO_SEARCH_RESULT_TEXT = '검색결과가 없습니다';

interface SelectProps
  extends Omit<
    HTMLAttributes<HTMLSelectElement>,
    'onChange' | 'style' | 'className'
  > {
  value: string | undefined;
  onChange: (selectedValue: string) => void;
  isSearchActive?: boolean;
  TriggerButton: FunctionComponent<ButtonProps>;
}

const Select = ({
  value,
  onChange,
  children,
  isSearchActive = false,
  TriggerButton,
  ...restProps
}: SelectProps) => {
  const ref = useRef<HTMLSelectElement>(null);
  const { searchValue, onChangeSearch } = useSearch();
  const { options } = useOptions(ref);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const closeSelect = () => {
    setIsOpen(false);
  };

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

  const searchedOptions = options.filter((option) =>
    option.label.includes(searchValue),
  );

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
          {isSearchActive && (
            // TODO: 추후 공통 Input 컴포넌트로 변경
            <input
              value={searchValue}
              onChange={onChangeSearch}
              style={{ color: 'black' }}
            />
          )}
          <SelectUl>
            {searchedOptions.map((option) => (
              <SelectLi
                key={option.value}
                onClick={() => onClick(option.value)}
              >
                {option.textContent}
              </SelectLi>
            ))}
            {searchedOptions.length === 0 && (
              <SelectLi>{NO_SEARCH_RESULT_TEXT}</SelectLi>
            )}
          </SelectUl>
        </SelectUlWrapper>
      )}
    </>
  );
};

export default Select;

const useOptions = (ref: RefObject<HTMLSelectElement>) => {
  const [options, setOptions] = useState<HTMLOptionElement[]>([]);

  useEffect(() => {
    if (ref.current) {
      setOptions(Array.from(ref.current?.querySelectorAll('option')));
    }
  }, []);

  return {
    options,
  };
};

const useSearch = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return {
    searchValue,
    onChangeSearch,
  };
};

const SelectUlWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${(p) => p.theme.colors.grey900};
  padding: 10px 10px 20px;
  margin-top: 16px;
`;

const SelectUl = styled.ul`
  max-height: 200px;
  overflow: scroll;
`;

const SelectLi = styled.li`
  cursor: pointer;
  padding: 10px 0;
`;
