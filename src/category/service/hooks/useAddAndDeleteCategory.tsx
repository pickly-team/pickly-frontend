import { CategoryItem } from '@/category';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const useAddAndDeleteCategory = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

  const addCategory = (emoji: string, name: string) => {
    setCategoryList([...categoryList, { emoji, name, categoryId: uuid() }]);
  };

  const deleteCategory = (id: string) => {
    setCategoryList(
      categoryList.filter((category) => category.categoryId !== id),
    );
  };

  return {
    categoryList,
    addCategory,
    deleteCategory,
  };
};

export default useAddAndDeleteCategory;
