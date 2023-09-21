import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';
import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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

  return useMutation(POSTCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));

      router(-1);
    },
  });
};
