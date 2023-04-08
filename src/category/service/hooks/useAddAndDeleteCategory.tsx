import { CategoryItem } from '@/category';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const useAddAndDeleteCategory = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

  const addCategory = (emoji: string, categoryName: string) => {
    setCategoryList([...categoryList, { emoji, categoryName, id: uuid() }]);
  };

  const deleteCategory = (id: string) => {
    setCategoryList(categoryList.filter((category) => category.id !== id));
  };

  return {
    categoryList,
    addCategory,
    deleteCategory,
  };
};

export default useAddAndDeleteCategory;
