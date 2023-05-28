import Text from '@/common-ui/Text';
import ListItem from '@/common/ui/ListItem';
import { CategoryItem, useGETCategoryListQuery } from '../api/category';
import Icon from '@/common-ui/assets/Icon';
import { Mode } from '..';
import { useEffect, useState } from 'react';
import DragAndDrop from '@/common/ui/DragAndDrop';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import CheckBox from '@/common-ui/CheckBox';
import { useNavigate } from 'react-router-dom';

interface CategoryListProps {
  mode: Mode;
}

const CategoryList = ({ mode }: CategoryListProps) => {
  const navigate = useNavigate();
  const USER_ID = '1';
  const { data } = useGETCategoryListQuery({ userId: USER_ID });

  const [clientCategoryList, setClientCategoryList] = useState<CategoryItem[]>(
    [],
  );

  useEffect(() => {
    if (data) {
      setClientCategoryList(data);
    }
  }, [data]);

  const [deleteCategoryList, setDeleteCategoryList] = useState<string[]>([]);

  const onClickCategory = (categoryId: string) => {
    if (mode === 'NORMAL') {
      navigate(`/category/edit/${categoryId}`, {
        state: {
          fromPath: location.pathname,
        },
      });
    }

    if (mode === 'DELETE') {
      if (deleteCategoryList.includes(categoryId)) {
        setDeleteCategoryList(
          deleteCategoryList.filter((id) => id !== categoryId),
        );
        setClientCategoryList((prev) =>
          prev.map((category) =>
            category.id === categoryId
              ? { ...category, isChecked: false }
              : category,
          ),
        );
      } else {
        setDeleteCategoryList([...deleteCategoryList, categoryId]);
        setClientCategoryList((prev) =>
          prev.map((category) =>
            category.id === categoryId
              ? { ...category, isChecked: true }
              : category,
          ),
        );
      }
    }
  };

  return (
    <>
      {mode !== 'ORDER' &&
        clientCategoryList?.map((category) => (
          <ListItem
            key={category.id}
            onClick={() => onClickCategory(category.id)}
          >
            <ListItem.Left
              left={
                mode === 'DELETE' && (
                  <Box>
                    <CheckBox
                      isChecked={category.isChecked}
                      onChange={() => onClickCategory(category.id)}
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
      {mode === 'ORDER' && (
        <DragAndDrop
          itemList={clientCategoryList}
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
