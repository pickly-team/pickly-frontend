import { READ_OPTION } from '@/widgets/bookmarks/service/hooks/home/useReadList';
import { Select, getRem } from '@pickly/design-system';
import { TOGGLE_BUTTON_Z_INDEX } from '@pickly/design-system';
import { theme, Button, Text } from '@pickly/design-system';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type ReadType = {
  value: string | null;
  label: string;
};

interface ToggleHandlerProps {
  isFriendPage?: boolean;
  children: React.ReactNode;
}

const BookmarkToggle = ({
  isFriendPage = false,
  children,
}: ToggleHandlerProps) => {
  return <ToggleWrapper isFriendPage={isFriendPage}>{children}</ToggleWrapper>;
};

interface SelectCategoryProps {
  selectedCategoryId: number | null;
  categoryOptions: ReadType[];
  setCategoryId: (categoryId: string) => void;
}

const SelectCategory = ({
  selectedCategoryId,
  categoryOptions,
  setCategoryId,
}: SelectCategoryProps) => {
  return (
    <ButtonWrapper>
      {!categoryOptions.length && (
        <Button
          buttonColor="black"
          height={2.5}
          css={css`
            border: 2px solid ${theme.colors.lightPrimary};
            border-radius: 0.8rem;
          `}
        >
          <Text.Span
            fontSize={0.9}
            color="lightPrimary"
            style={{
              width: '100%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              padding: `0 ${getRem(10)}`,
            }}
          >
            💡 전체
          </Text.Span>
        </Button>
      )}
      {!!categoryOptions.length && (
        <Select
          trigger={
            <Button
              buttonColor="black"
              height={2.5}
              css={css`
                border: 2px solid ${theme.colors.lightPrimary};
                border-radius: 0.8rem;
              `}
            >
              <Text.Span
                color="lightPrimary"
                fontSize={0.9}
                style={{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  padding: `0 ${getRem(10)}`,
                }}
              >
                💡 전체
              </Text.Span>
            </Button>
          }
          value={String(selectedCategoryId) ?? '💡 전체'}
          onChange={setCategoryId}
          isSearchActive
        >
          {categoryOptions.map((option) => (
            <option value={option.value ?? ''} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    </ButtonWrapper>
  );
};

interface ToggleReadProps {
  selectedReadOption: READ_OPTION | null;
  readOptions: ReadType[];
  onChangeRead: (readMode: READ_OPTION) => void;
}

const SelectReadMode = ({
  selectedReadOption,
  readOptions,
  onChangeRead,
}: ToggleReadProps) => {
  return (
    <ButtonWrapper>
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
              fontSize={0.9}
              color="lightPrimary"
              style={{
                width: '100%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                padding: `0 ${getRem(10)}`,
              }}
            >
              💡 전체
            </Text.Span>
          </Button>
        }
        value={selectedReadOption ?? '💡 전체'}
        onChange={(value) => {
          onChangeRead(value as READ_OPTION);
        }}
      >
        {readOptions.map((option) => (
          <option value={option.value ?? ''} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
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
        <Text.Span fontSize={0.9} color="lightPrimary">
          {isEdit ? '완료' : '삭제'}
        </Text.Span>
      </Button>
    </ButtonWrapper>
  );
};

BookmarkToggle.SelectCategory = SelectCategory;
BookmarkToggle.SelectReadMode = SelectReadMode;
BookmarkToggle.ToggleEdit = ToggleEdit;

export default BookmarkToggle;

interface ToggleWrapperProps {
  isFriendPage: boolean;
}

const ToggleWrapper = styled.div<ToggleWrapperProps>`
  display: flex;
  position: sticky;

  align-self: flex-start;
  background-color: ${theme.colors.black};
  height: ${getRem(80)};
  border-radius: 0.8rem;
  justify-content: space-between;
  padding: ${getRem(20)};
  z-index: ${TOGGLE_BUTTON_Z_INDEX};
  top: ${({ isFriendPage }) =>
    isFriendPage ? `${getRem(50)}` : `${getRem(-1)}`};
  z-index: ${TOGGLE_BUTTON_Z_INDEX};
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;
