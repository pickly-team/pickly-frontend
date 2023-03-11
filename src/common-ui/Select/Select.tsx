import {
  ChangeEventHandler,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '@/common-ui/Button';
import styled from '@emotion/styled';
import Input from '@/common-ui/Input';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';

const NO_RESULT_TEST = '선택해주세요';
const NO_SEARCH_RESULT_TEXT = '검색결과가 없습니다';

interface SelectProps {
  children: ReactNode;
  value: string | undefined;
  onChange: (selectedValue: string) => void;
  isSearchActive?: boolean;
  buttonStyle?: React.CSSProperties;
}

const Select = ({
  value,
  onChange,
  children,
  isSearchActive = false,
  buttonStyle,
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
    <Container>
      <TriggerButton style={buttonStyle} onClick={toggleSelect}>
        {buttonText ?? NO_RESULT_TEST}
      </TriggerButton>
      <select ref={ref} style={{ display: 'none' }}>
        {children}
      </select>
      {isOpen && (
        <SelectUlWrapper>
          {isSearchActive && (
            <SearchInputContainer>
              <SearchIconWrapper>
                <Icon name={'search'} size={'s'} />
              </SearchIconWrapper>
              <StyledInput value={searchValue} onChange={onChangeSearch} />
            </SearchInputContainer>
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
    </Container>
  );
};

export default Select;

const useOptions = (ref: RefObject<HTMLSelectElement>) => {
  const [options, setOptions] = useState<HTMLOptionElement[]>([]);

  useEffect(() => {
    if (ref.current) {
      setOptions(Array.from(ref.current.querySelectorAll('option')));
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

const Container = styled.div`
  position: relative;
`;

const TriggerButton = styled(Button)`
  border: 2px solid ${theme.colors.primary};
  background-color: ${theme.colors.black};
  height: 35px;
  color: ${theme.colors.primary};
  margin-right: 2rem;
`;

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

const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
`;
const StyledInput = styled(Input)`
  border-bottom: 1px solid ${theme.colors.white};
  border-radius: 0;
`;
