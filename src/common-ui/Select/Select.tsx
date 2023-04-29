import {
  ChangeEventHandler,
  Children,
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import Input from '@/common-ui/Input';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import { keyframes } from '@emotion/react';
import Text, { TextProps } from '../Text';

const NO_RESULT_TEST = '전체';
const NO_SEARCH_RESULT_TEXT = '검색결과가 없습니다';

interface SelectProps {
  trigger: ReactElement;
  children: ReactNode;
  value: string | undefined;
  onChange: (selectedValue: string) => void;
  isSearchActive?: boolean;
}

const Select = ({
  trigger,
  value,
  onChange,
  children,
  isSearchActive = false,
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

  const updateTextInChildren = (
    children: ReactNode,
    newText: string,
  ): ReactNode => {
    return Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Text.Span) {
        const typedChild = child as ReactElement<TextProps>;
        return cloneElement(typedChild, { children: newText });
      } else if (isValidElement(child)) {
        const typedChild = child as ReactElement;
        if (typedChild.props.children) {
          return cloneElement(typedChild, {
            children: updateTextInChildren(typedChild.props.children, newText),
          });
        }
      }
      return child;
    });
  };

  const triggerText = trigger.props.children;
  const isTextSpan =
    isValidElement(triggerText) && triggerText.type === Text.Span;

  const clonedTrigger = cloneElement(trigger, {
    children: isTextSpan
      ? updateTextInChildren(
          trigger.props.children,
          buttonText ?? NO_RESULT_TEST,
        )
      : buttonText ?? NO_RESULT_TEST,
    onClick: toggleSelect,
  });

  return (
    <Container>
      {clonedTrigger}
      <select ref={ref} style={{ display: 'none' }}>
        {children}
      </select>

      <SelectUlWrapper isOpen={isOpen}>
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
            <SelectLi key={option.value} onClick={() => onClick(option.value)}>
              {option.textContent}
            </SelectLi>
          ))}
          {searchedOptions.length === 0 && (
            <SelectLi>{NO_SEARCH_RESULT_TEXT}</SelectLi>
          )}
        </SelectUl>
      </SelectUlWrapper>
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

const SelectUlWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: calc(100vw - ${getRem(38)});
  border-radius: 10px;
  animation: ${(p) => (p.isOpen ? showUp : showOut)} 0.3s ease-in-out;
  display: ${(p) => (p.isOpen ? 'block' : 'none')};
  background-color: ${(p) => p.theme.colors.grey900};
  padding: ${getRem(10)} ${getRem(10)} ${getRem(20)};
  margin-top: ${getRem(15)};
`;

const showUp = keyframes`
    0% { opacity:0; }
    100% { opacity:1; }
    `;
const showOut = keyframes`
    0% { opacity:1; }
    100% { opacity:0; }
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
