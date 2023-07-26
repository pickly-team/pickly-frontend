import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';
import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { GET_CATEGORY_LIST } from './category';
import useBookmarkStore from '@/store/bookmark';
import { navigatePath } from '@/constants/navigatePath';
import { bookmarkAddPagePaths } from '@/pages/CategoryManagePage';

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

  const router = useNavigate();
  const { fromPath } = useBookmarkStore();

  return useMutation(POSTCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_CATEGORY_LIST(memberId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));

      if (fromPath === navigatePath.MAIN) {
        router('/', {
          preventScrollReset: true,
          state: {
            isCategoryAddPage: true,
          },
        });
        return;
      }
      if (bookmarkAddPagePaths.some((path) => path.includes(fromPath))) {
        router(fromPath, {
          state: {
            isCategoryAddPage: true,
          },
        });
        return;
      }
      router(-1);
    },
  });
};
