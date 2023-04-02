import Button from '@/common-ui/Button';
import Select from '@/common-ui/Select/Select';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

export type CategoryType = {
  value: string;
  label: string;
};

interface ToggleHandlerProps {
  children: React.ReactNode;
}

// TODO : Select 컴포넌트 수정

const BookmarkToggle = ({ children }: ToggleHandlerProps) => {
  return <ToggleWrapper>{children}</ToggleWrapper>;
};

interface SelectCategoryProps {
  category: string;
  setCategoryId: (category: string) => void;
  categoryOptions: CategoryType[];
}

const SelectCategory = ({
  category,
  categoryOptions,
  setCategoryId,
}: SelectCategoryProps) => {
  return (
    <ButtonWrapper>
      <Select
        buttonStyle={{
          border: `2px solid ${theme.colors.lightPrimary}`,
          borderRadius: '0.8rem',
          width: '100%',
        }}
        value={category}
        onChange={setCategoryId}
        isSearchActive
      >
        {categoryOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </ButtonWrapper>
  );
};

interface ToggleReadProps {
  isRead: boolean;
  onChangeRead: () => void;
}

const ToggleRead = ({ onChangeRead, isRead }: ToggleReadProps) => {
  return (
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
  );
};

interface ToggleEditProps {
  isEdit: boolean;
  onClickEdit: () => void;
}

const ToggleEdit = ({ isEdit, onClickEdit }: ToggleEditProps) => {
  return (
    <ButtonWrapper>
      <Button
        buttonColor="black"
        height={2.5}
        style={{
          border: `2px solid ${theme.colors.lightPrimary}`,
          borderRadius: '0.8rem',
        }}
        onClick={onClickEdit}
      >
        <Text.Span color="lightPrimary">{isEdit ? '완료' : '편집'}</Text.Span>
      </Button>
    </ButtonWrapper>
  );
};

BookmarkToggle.SelectCategory = SelectCategory;
BookmarkToggle.ToggleRead = ToggleRead;
BookmarkToggle.ToggleEdit = ToggleEdit;

export default BookmarkToggle;

const ToggleWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;
