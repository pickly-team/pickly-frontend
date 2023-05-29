import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ClientBookmarkCategoryItem } from '../api/bookmark';
import { Link } from 'react-router-dom';

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
      <PlusBox to="category/add" />
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
        padding: ${getRem(5)} ${getRem(10)};
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
        fontSize={calculateRem(13)}
        weight="bold"
      >
        {`${tag.emoji} ${tag.name}`}
      </Text.Span>
    </button>
  );
};

interface PlusBoxProps {
  to: string;
}

const PlusBox = ({ to }: PlusBoxProps) => {
  return (
    <Link to={to}>
      <div
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
    </Link>
  );
};
