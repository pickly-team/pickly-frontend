import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CATEGORY_LIST } from './category';
import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';
import qs from 'qs';
import useToast from '@/common-ui/Toast/hooks/useToast';
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
  const toast = useToast();
  return useMutation(DeleteCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_CATEGORY_LIST(memberId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
      toast.fireToast({
        message: '삭제 되었습니다',
        mode: 'DELETE',
      });
    },
  });
};
