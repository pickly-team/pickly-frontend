import type { CategoryItem } from '@/category';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import IconButton from '../../../common/ui/IconButton';

type StrictPropsWithChildren<P = unknown> = P & { children: ReactNode };

type CategoryAddAreaProps = {
  categoryList?: CategoryItem[];
} & StrictPropsWithChildren;

const CategoryAddArea = ({ categoryList, children }: CategoryAddAreaProps) => {
  return (
    <Flip>
      {!!categoryList?.length && (
        <Card hasCategory={categoryList.length !== 0}>{children}</Card>
      )}
      {!categoryList?.length && <Card hasCategory={false}>{children}</Card>}
    </Flip>
  );
};

const Flip = styled.div`
  width: 100%;
  position: relative;
  perspective: 1100px;
`;

const Card = styled.div<{ hasCategory: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
  transform: ${(props) => props.hasCategory && 'rotateY(180deg)'};
`;

interface BlankCategoryBoxProps {
  onClickAddCategory: () => void;
  isAllCategoryInfoFilled: boolean;
}

const BlankCategoryBox = ({
  onClickAddCategory,
  isAllCategoryInfoFilled,
}: BlankCategoryBoxProps) => {
  return (
    <BlankCategoryBoxWrapper>
      <CircleIconButton
        onClick={(e) => {
          e.stopPropagation();
          onClickAddCategory();
        }}
        disabled={!isAllCategoryInfoFilled}
      >
        <Icon name="plus" size="s" />
      </CircleIconButton>
      <AddCategoryDescription fontSize={calculateRem(14)}>
        {'+ 버튼을 눌러 \n 카테고리를 생성해 주세요'}
      </AddCategoryDescription>
    </BlankCategoryBoxWrapper>
  );
};

const BlankCategoryBoxWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${getRem(250)};
  background-color: ${theme.colors.grey900};
  border-radius: ${getRem(10)};
  transition: 0.4s;

  backface-visibility: hidden;
`;

interface CategoryListProps {
  categoryList: CategoryItem[];
  onClickAddCategory: () => void;
  onClickEditCategory: (id: string) => void;
  onClickDeleteCategory: (id: string) => void;
  isAllCategoryInfoFilled: boolean;
}

const CategoryList = ({
  categoryList,
  isAllCategoryInfoFilled,
  onClickAddCategory,
  onClickDeleteCategory,
  onClickEditCategory,
}: CategoryListProps) => {
  return (
    <CategoryListWrapper>
      <CircleIconButton
        onClick={onClickAddCategory}
        disabled={!isAllCategoryInfoFilled}
      >
        <Icon name="plus" size="s" />
      </CircleIconButton>
      {categoryList.map((category) => (
        <CategoryItem
          onClick={(e) => {
            e.stopPropagation();
            onClickEditCategory(category.categoryId);
          }}
          key={category.categoryId}
        >
          <Text.P fontSize={calculateRem(16)}>{category.emoji}</Text.P>
          <Text.P fontSize={calculateRem(16)}>{category.name}</Text.P>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onClickDeleteCategory(category.categoryId);
            }}
            name="close"
            size="xs"
          />
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

const AddCategoryDescription = styled(Text.Span)`
  white-space: pre-line;
  text-align: center;
`;

const CategoryListWrapper = styled.ul`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const CircleIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${getRem(50)};
  height: ${getRem(50)};
  margin-bottom: ${getRem(20)};
  background-color: ${theme.colors.lightPrimary};
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;
  :active {
    background-color: ${theme.colors.primary};
  }
  &:disabled {
    background-color: ${theme.colors.grey800};
    cursor: not-allowed;
  }
`;

const CategoryItem = styled.li`
  display: flex;
  padding: ${getRem(20)} ${getRem(20)};
  width: 100%;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  height: ${getRem(52)};
  :active {
    background-color: ${theme.colors.grey900};
  }
  p {
    :nth-of-type(2) {
      margin-left: ${getRem(20)};
    }
  }
  button {
    :nth-of-type(1) {
      margin-left: auto;
    }
  }
`;

CategoryAddArea.BlankCategoryBox = BlankCategoryBox;
CategoryAddArea.CategoryList = CategoryList;

export default CategoryAddArea;
