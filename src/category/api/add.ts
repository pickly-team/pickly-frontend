import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';
import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CATEGORY_LIST } from './category';
import useBookmarkStore from '@/store/bookmark';
import { navigatePath } from '@/constants/navigatePath';
import { bookmarkAddPagePaths } from '@/pages/CategoryManagePage';
import { useFlow } from '@/common-ui/stackflow';

interface CategoryItem {
  name: string;
  emoji: string;
}

interface POSTCategoryRequest {
  memberId: number;
  postData: CategoryItem[];
}

const POSTCategory = {
  API: async (params: POSTCategoryRequest) => {
    const { data } = await client.post('/categories', params.postData, {
      params: {
        memberId: params.memberId,
      },
    });
    return data;
  },
};

interface POSTCategoryMutation {
  memberId: number;
}

export const usePOSTCategoryMutation = ({ memberId }: POSTCategoryMutation) => {
  const queryClient = useQueryClient();

  const { push, pop } = useFlow();
  const { fromPath } = useBookmarkStore();

  return useMutation(POSTCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_CATEGORY_LIST(memberId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));

      if (fromPath === navigatePath.MainPage) {
        push('MainPage', {});
        return;
      }
      if (bookmarkAddPagePaths.some((path) => path.includes(fromPath))) {
        push('MainPage', {});
        return;
      }
      pop();
    },
  });
};
