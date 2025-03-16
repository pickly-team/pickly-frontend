import { Mode } from '..';
import { Dispatch, useEffect } from 'react';

import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';
import BlankItem from '@/shared/ui/BlankItem/BlankItem';
import useAuthStore from '@/shared/store/auth';
import {
  ClientBookmarkCategoryItem,
  useGETCategoryListQuery,
} from '@/widgets/bookmarks/api/bookmark';
import ListItem from '@/shared/common/ui/ListItem';
import { CheckBox, Icon, Text, theme } from '@pickly/design-system';
import DragAndDrop from '@/shared/common/ui/DragAndDrop';

interface CategoryListProps {
  mode: Mode;
  clientCategoryList: ClientBookmarkCategoryItem[];
  setClientCategoryList: Dispatch<
    React.SetStateAction<ClientBookmarkCategoryItem[]>
  >;
  deleteCategoryList: string[];
  setDeleteCategoryList: Dispatch<React.SetStateAction<string[]>>;
}

const CategoryList = ({
  mode,
  clientCategoryList,
  setClientCategoryList,
  deleteCategoryList,
  setDeleteCategoryList,
}: CategoryListProps) => {
  const navigate = useNavigate();
  const { memberId } = useAuthStore();
  const { data: categoryList } = useGETCategoryListQuery({
    memberId,
  });

  useEffect(() => {
    if (categoryList) {
      setClientCategoryList(categoryList);
    }
  }, [categoryList, setClientCategoryList]);

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

      setClientCategoryList(
        clientCategoryList.map((category) =>
          category.id === Number(categoryId)
            ? { ...category, isChecked: !category.isChecked }
            : category,
        ),
      );
    }
  };

  if (categoryList?.length === 0) {
    return <BlankItem page="CATEGORY" />;
  }

  return (
    <Container>
      {mode !== 'ORDER' && (
        <>
          {clientCategoryList &&
            clientCategoryList.map((category) => (
              <ListItem
                key={category.id}
                onClick={() => onClickCategory(String(category.id))}
              >
                <ListItem.Left
                  left={
                    mode === 'DELETE' && (
                      <Box>
                        <CheckBox
                          isChecked={category.isChecked}
                          onChange={() => onClickCategory(String(category.id))}
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
            ))}
        </>
      )}
      {mode === 'ORDER' && (
        <DragAndDrop
          itemList={clientCategoryList ?? []}
          renderDragItem={(item) => (
            <ListItem key={item.id}>
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
    </Container>
  );
};

export default CategoryList;

const Container = styled.div`
  min-height: 80dvh;
`;

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
