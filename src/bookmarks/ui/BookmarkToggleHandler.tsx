import Button from '@/common-ui/Button';
import Select from '@/common-ui/Select/Select';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { CategoryType } from '../service/hooks/useBookMarkHandler';

interface ToggleHandlerProps {
  isRead: boolean;
  isEdit: boolean;
  category: string;
  setCategory: (category: string) => void;
  categoryOptions: CategoryType[];
  onChangeRead: () => void;
  onChangeEdit: () => void;
}

// TODO : Select 컴포넌트 수정

const BookmarkToggleHandler = ({
  isRead,
  isEdit,
  category,
  setCategory,
  categoryOptions,
  onChangeEdit,
  onChangeRead,
}: ToggleHandlerProps) => {
  return (
    <>
      <ToggleWrapper>
        <ButtonWrapper>
          <Select
            buttonStyle={{
              border: `2px solid ${theme.colors.lightPrimary}`,
              borderRadius: '0.8rem',
              width: '100%',
            }}
            value={category}
            onChange={setCategory}
            isSearchActive
          >
            {categoryOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            buttonColor="black"
            height={2.5}
            style={{
              border: `2px solid ${theme.colors.lightPrimary}`,
              borderRadius: '0.8rem',
            }}
            onClick={onChangeRead}
          >
            <Text.Span color="lightPrimary">
              {isRead ? '읽음' : '읽지 않음'}
            </Text.Span>
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            buttonColor="black"
            height={2.5}
            style={{
              border: `2px solid ${theme.colors.lightPrimary}`,
              borderRadius: '0.8rem',
            }}
            onClick={onChangeEdit}
          >
            <Text.Span color="lightPrimary">
              {isEdit ? '완료' : '편집'}
            </Text.Span>
          </Button>
        </ButtonWrapper>
      </ToggleWrapper>
    </>
  );
};

export default BookmarkToggleHandler;

const ToggleWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;
