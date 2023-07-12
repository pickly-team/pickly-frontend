import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CATEGORY_LIST } from './category';
import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';
import qs from 'qs';
interface DeleteCategoryRequest {
  memberId: number;
  categoryId: string[];
}

const DeleteCategory = {
  API: async (params: DeleteCategoryRequest) => {
    const { data } = await client.delete('/categories', {
      params: {
        categoryId: params.categoryId,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return data;
  },
};

interface DeleteCategoryMutation {
  memberId: number;
}

export const useDeleteCategoryMutation = ({
  memberId,
}: DeleteCategoryMutation) => {
  const queryClient = useQueryClient();

  return useMutation(DeleteCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_CATEGORY_LIST(memberId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
    },
  });
};
