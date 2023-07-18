import Text from '@/common-ui/Text';
import ListItem from '@/common/ui/ListItem';
import {
  ClientCategoryItem,
  GET_CATEGORY_LIST,
  useGETCategoryListQuery,
} from '../api/category';
import Icon from '@/common-ui/assets/Icon';
import { CategoryItem, Mode } from '..';
import { Dispatch, useEffect } from 'react';
import DragAndDrop from '@/common/ui/DragAndDrop';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import CheckBox from '@/common-ui/CheckBox';
import { useNavigate } from 'react-router-dom';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import SkeletonCategoryList from './SkeletonCategoryList';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import BlankItem from '@/common-ui/BlankItem';
import useAuthStore from '@/store/auth';

interface CategoryListProps {
  mode: Mode;
  clientCategoryList: CategoryItem[];
  setClientCategoryList: Dispatch<React.SetStateAction<CategoryItem[]>>;
  deleteCategoryList: string[];
  setDeleteCategoryList: Dispatch<React.SetStateAction<string[]>>;
}

type InfiniteCategory =
  | InfiniteData<{
      contents: ClientCategoryItem[];
      hasNext: boolean;
    }>
  | undefined;

const CategoryList = ({
  mode,
  clientCategoryList,
  setClientCategoryList,
  deleteCategoryList,
  setDeleteCategoryList,
}: CategoryListProps) => {
  const navigate = useNavigate();
  const { memberId } = useAuthStore();
  const {
    data: categoryList,
    fetchNextPage,
    isFetchingNextPage,
  } = useGETCategoryListQuery({
    memberId,
    pageRequest: {
      pageSize: 15,
    },
  });

  useEffect(() => {
    if (categoryList) {
      const item = categoryList.pages.flatMap((page) => page.contents);
      setClientCategoryList(
        item.map((category) => ({
          ...category,
          categoryName: category.name,
          isChecked: false,
        })),
      );
    }
  }, [categoryList]);

  const { bottom } = useBottomIntersection({ fetchNextPage });

  const queryClient = useQueryClient();

  const onClickCategory = (categoryId: string) => {
    if (mode === 'NORMAL') {
      navigate(`/category/edit/${categoryId}`, {
        state: {
          fromPath: location.pathname,
        },
      });
    }

    if (mode === 'DELETE') {
      if (deleteCategoryList.includes(categoryId))
        setDeleteCategoryList(
          deleteCategoryList.filter((id) => id !== categoryId),
        );
      else setDeleteCategoryList([...deleteCategoryList, categoryId]);

      queryClient.setQueryData<InfiniteCategory>(
        GET_CATEGORY_LIST(memberId),
        (prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              contents: page.contents.map((category) =>
                category.categoryId === categoryId
                  ? {
                      ...category,
                      isChecked: !deleteCategoryList.includes(categoryId),
                    }
                  : category,
              ),
            })),
          };
        },
      );
    }
  };

  if (categoryList?.pages[0].contents.length === 0) {
    return <BlankItem page="CATEGORY" />;
  }

  return (
    <>
      {mode !== 'ORDER' && (
        <>
          {categoryList?.pages[0].contents[0].categoryId &&
            categoryList.pages.map((categoryPage) =>
              categoryPage.contents.map((category) => (
                <ListItem
                  key={category.categoryId}
                  onClick={() => onClickCategory(category.categoryId)}
                >
                  <ListItem.Left
                    left={
                      mode === 'DELETE' && (
                        <Box>
                          <CheckBox
                            isChecked={category.isChecked}
                            onChange={() =>
                              onClickCategory(category.categoryId)
                            }
                          />
                        </Box>
                      )
                    }
                    middle={<Text.P>{category.emoji}</Text.P>}
                    right={<Text.P>{category.name}</Text.P>}
                  />
                  <ListItem.Right>
                    {mode === 'EDIT' && <Text.P>편집</Text.P>}
                  </ListItem.Right>
                </ListItem>
              )),
            )}
          <div ref={bottom} />
          {isFetchingNextPage && <SkeletonCategoryList count={10} />}
        </>
      )}
      {mode === 'ORDER' && (
        <DragAndDrop
          itemList={clientCategoryList}
          renderDragItem={(item) => (
            <ListItem key={item.categoryId}>
              <ListItem.Left
                middle={<Text.P>{item.emoji}</Text.P>}
                right={<Text.P>{item.name}</Text.P>}
              />
              <ListItem.Right>
                <Icon name="hamburger" size="s" />
              </ListItem.Right>
            </ListItem>
          )}
          setItemList={setClientCategoryList}
        />
      )}
    </>
  );
};

export default CategoryList;

// TODO : Checkbox label에 접근 불가하여 한번 더 Wrapping 추후 해결
const Box = styled.div`
  display: flex;
  align-items: center;
  & label:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    align-self: center;

    &:active {
      background-color: ${theme.colors.grey600};
      opacity: 0.5;
    }
  }
`;
