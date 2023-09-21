import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ClientBookmarkCategoryItem } from '../api/bookmark';
import { useNavigate } from 'react-router-dom';
import useToast from '@/common-ui/Toast/hooks/useToast';
import { MAX_CATEGORY_COUNT } from '@/store/bookmark';

interface TagBoxListProps {
  tags: ClientBookmarkCategoryItem[];
  selectedTagId: number;
  onClickCategory: (id: number) => void;
}

const TagBoxList = ({
  tags,
  selectedTagId,
  onClickCategory,
}: TagBoxListProps) => {
  return (
    <StyledListWrapper>
      {tags.map((tag) => (
        <TagBox
          key={tag.id}
          isSelected={selectedTagId === tag.id}
          tag={tag}
          onClickCategory={onClickCategory}
        />
      ))}
      <PlusBox to="/category/add" categoryCount={tags.length} />
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
  isSelected: boolean;
  onClickCategory: (id: number) => void;
}

const TagBox = ({ tag, isSelected, onClickCategory }: TagBoxProps) => {
  return (
    <button
      onClick={() => onClickCategory(tag.id)}
      css={css`
        background-color: ${isSelected
          ? theme.colors.lightPrimary
          : theme.colors.grey700};
        color: ${isSelected ? theme.colors.black : theme.colors.white};
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
        color={isSelected ? 'black' : 'white'}
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
  categoryCount: number;
}

const PlusBox = ({ to, categoryCount }: PlusBoxProps) => {
  const navigate = useNavigate();
  const { fireToast } = useToast();

  const onClickPlusBox = () => {
    if (categoryCount >= MAX_CATEGORY_COUNT) {
      fireToast({
        mode: 'ERROR',
        message: '앗! 카테고리는 최대 20개까지만 만들 수 있어요',
      });
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <div
        onClick={onClickPlusBox}
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
    </>
  );
};
