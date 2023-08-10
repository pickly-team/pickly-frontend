import { useGETCategoryListQuery } from '@/bookmarks/api/bookmark';
import useBookmarkStore from '@/store/bookmark';
import { useEffect } from 'react';

export type CategoryType = {
  value: string | undefined;
  label: string;
};

interface Category {
  memberId: number;
  isFriendPage?: boolean;
}

const useCategory = ({ memberId, isFriendPage = false }: Category) => {
  const { data: categoryList } = useGETCategoryListQuery({ memberId });

  const {
    categoryOptions,
    selectedCategoryId,
    friendCategoryId,
    setCategoryOptions,
    setSelectedCategoryId,
    setFriendCategoryId,
  } = useBookmarkStore();

  useEffect(() => {
    if (isFriendPage) setFriendCategoryId(null);
  }, [memberId, isFriendPage]);

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
    if (isFriendPage) {
      setFriendCategoryId(categoryId ? Number(categoryId) : null);
    } else {
      setSelectedCategoryId(categoryId ? Number(categoryId) : null);
    }
  };

  return {
    categoryOptions,
    selectedCategoryId: isFriendPage ? friendCategoryId : selectedCategoryId,
    onChangeCategory,
  };
};

export default useCategory;
