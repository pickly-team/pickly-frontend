import { useGETCategoryListQuery } from '@/bookmarks/api/bookmark';
import useBookmarkStore from '@/store/bookmark';
import { useEffect } from 'react';

export type CategoryType = {
  value: string | undefined;
  label: string;
};

interface Category {
  memberId: number;
}

const useCategory = ({ memberId }: Category) => {
  const { data: categoryList } = useGETCategoryListQuery({ memberId });

  const {
    categoryOptions,
    selectedCategoryId,
    setCategoryOptions,
    setSelectedCategoryId,
  } = useBookmarkStore();

  useEffect(() => {
    if (categoryList) {
      const categoryOptions = categoryList.map((category) => ({
        value: `${category.id}`,
        label: `${category.emoji} ${category.name}`,
      }));
      setCategoryOptions([
        { value: null, label: '🥒 전체' },
        ...categoryOptions,
      ]);
    }
  }, [categoryList, memberId]);

  const onChangeCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId ? Number(categoryId) : null);
  };

  return { categoryOptions, selectedCategoryId, onChangeCategory };
};

export default useCategory;
