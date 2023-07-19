import {
  ClientBookmarkCategoryItem,
  GET_BOOKMARK_CATEGORY_LIST,
  useGETCategoryListQuery,
} from '@/bookmarks/api/bookmark';
import useAuthStore from '@/store/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

const useCategoryList = (defaultCategoryId?: number, isOpen?: boolean) => {
  const { memberId } = useAuthStore();
  // SERVER
  const { data: categoryList } = useGETCategoryListQuery({
    memberId,
  });

  const queryClient = useQueryClient();

  const setCategoryList = (categoryList: ClientBookmarkCategoryItem[]) => {
    queryClient.setQueryData<ClientBookmarkCategoryItem[]>(
      GET_BOOKMARK_CATEGORY_LIST(memberId),
      categoryList,
    );
  };

  useEffect(() => {
    isOpen && toggleCategory(defaultCategoryId ?? 0);
  }, [defaultCategoryId, isOpen]);

  const toggleCategory = useCallback(
    (categoryId: number): ClientBookmarkCategoryItem[] => {
      const newCategoryList =
        categoryList?.map((item) =>
          item.id === categoryId
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false },
        ) ?? ([] as ClientBookmarkCategoryItem[]);

      setCategoryList(newCategoryList);

      return newCategoryList;
    },
    [categoryList, setCategoryList],
  );

  return {
    categoryList,
    setCategoryList,
    toggleCategory,
  };
};

export default useCategoryList;
