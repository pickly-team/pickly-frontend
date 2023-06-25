import Button from '@/common-ui/Button';
import Select from '@/common-ui/Select/Select';
import Text from '@/common-ui/Text';
import { TOGGLE_BUTTON_Z_INDEX } from '@/constants/zIndex';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
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
  selectedCategory: string;
  setCategoryId: (category: string) => void;
  categoryOptions: CategoryType[];
}

const SelectCategory = ({
  selectedCategory,
  categoryOptions,
  setCategoryId,
}: SelectCategoryProps) => {
  return (
    <ButtonWrapper>
      {!categoryOptions.length && (
        <Button
          buttonColor="black"
          height={2.5}
          style={{
            border: `2px solid ${theme.colors.lightPrimary}`,
            borderRadius: '0.8rem',
          }}
        >
          <Text.Span
            color="lightPrimary"
            style={{
              width: '100%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              padding: `0 ${getRem(10)}`,
            }}
          >
            전체
          </Text.Span>
        </Button>
      )}
      {!!categoryOptions.length && (
        <Select
          trigger={
            <Button
              buttonColor="black"
              height={2.5}
              style={{
                border: `2px solid ${theme.colors.lightPrimary}`,
                borderRadius: '0.8rem',
              }}
            >
              <Text.Span
                color="lightPrimary"
                style={{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  padding: `0 ${getRem(10)}`,
                }}
              >
                전체
              </Text.Span>
            </Button>
          }
          value={selectedCategory}
          onChange={setCategoryId}
          isSearchActive
        >
          {categoryOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
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
  position: sticky;
  top: -1px;
  padding-top: 20px;
  align-self: flex-start;
  background-color: ${theme.colors.black};
  height: ${getRem(80)};
  padding: ${getRem(20)};
  border-radius: 0.8rem;
  justify-content: space-between;
  z-index: ${TOGGLE_BUTTON_Z_INDEX};
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;
