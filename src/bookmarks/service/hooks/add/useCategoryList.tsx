import {
  ClientBookmarkCategoryItem,
  GET_BOOKMARK_CATEGORY_LIST,
  useGETCategoryListQuery,
} from '@/bookmarks/api/bookmark';
import useAuthStore from '@/store/auth';
import { useQueryClient } from '@tanstack/react-query';

const useCategoryList = () => {
  // TODO : 추후 FIREBASE AUTH 연동 후 USER_ID 변경
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
