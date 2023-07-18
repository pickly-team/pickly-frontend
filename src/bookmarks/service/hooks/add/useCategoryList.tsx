import {
  ClientBookmarkCategoryItem,
  GET_BOOKMARK_CATEGORY_LIST,
  useGETCategoryListQuery,
} from '@/bookmarks/api/bookmark';
import useAuthStore from '@/store/auth';
import { useQueryClient } from '@tanstack/react-query';

const useCategoryList = () => {
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

  const toggleCategory = (categoryId: number): ClientBookmarkCategoryItem[] => {
    return (
      categoryList?.map((item) =>
        item.id === categoryId
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false },
      ) || []
    );
  };

  return {
    categoryList,
    setCategoryList,
    toggleCategory,
  };
};

export default useCategoryList;
