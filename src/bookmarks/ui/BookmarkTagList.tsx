import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ClientBookmarkCategoryItem } from '../api/bookmark';

interface TagBoxListProps {
  tags: ClientBookmarkCategoryItem[];
  onClickCategory: (id: string) => void;
}

const TagBoxList = ({ tags, onClickCategory }: TagBoxListProps) => {
  return (
    <StyledListWrapper>
      {tags.map((tag) => (
        <TagBox key={tag.id} tag={tag} onClickCategory={onClickCategory} />
      ))}
      <PlusBox onClick={() => console.log('플러스 버튼 클릭')} />
    </StyledListWrapper>
  );
};

export default TagBoxList;

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: ${getRem(10)};
  row-gap: ${getRem(15)};
`;

interface TagBoxProps {
  tag: ClientBookmarkCategoryItem;
  onClickCategory: (id: string) => void;
}

const TagBox = ({ tag, onClickCategory }: TagBoxProps) => {
  return (
    <button
      onClick={() => onClickCategory(tag.id)}
      css={css`
        background-color: ${tag.isSelected
          ? theme.colors.lightPrimary
          : theme.colors.grey700};
        color: ${tag.isSelected ? theme.colors.black : theme.colors.white};
        padding: ${getRem(7)} ${getRem(20)};
        border-radius: ${getRem(10)};
        transition: background-color 0.3s ease-in-out;
        height: ${getRem(50)};
        :active {
          background-color: ${theme.colors.lightPrimary};
        }
      `}
    >
      <Text.Span
        color={tag.isSelected ? 'black' : 'white'}
        fontSize={calculateRem(15)}
        weight="bold"
      >
        {tag.name}
      </Text.Span>
    </button>
  );
};

interface PlusBoxProps {
  onClick: () => void;
}

const PlusBox = ({ onClick }: PlusBoxProps) => {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${theme.colors.lightPrimary};
        width: ${getRem(50)};
        height: ${getRem(50)};
        border-radius: ${getRem(10)};
        transition: background-color 0.3s ease-in-out;
        :active {
          background-color: ${theme.colors.primary};
        }
      `}
    >
      <Icon size="xs" name="plus-dark" />
    </div>
  );
};
