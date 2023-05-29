import { useGETCategoryListQuery } from '@/bookmarks/api/bookmark';
import { useEffect, useState } from 'react';

export type CategoryType = {
  value: string;
  label: string;
};

interface Category {
  memberId: number;
}

const useCategory = ({ memberId }: Category) => {
  const { data: categoryList } = useGETCategoryListQuery({ memberId });

  const [categoryOptions, setCategoryOptions] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (categoryList) {
      const categoryOptions = categoryList.map((category) => ({
        value: `${category.id}`,
        label: `${category.emoji} ${category.name}`,
      }));
      setCategoryOptions(categoryOptions);
    }
  }, [categoryList]);

  const [selectedCategory, setSelectedCategory] = useState<number>();

  const onChangeCategory = (category: string) => {
    setSelectedCategory(Number(category));
  };

  return { categoryOptions, selectedCategory, onChangeCategory };
};

export default useCategory;
