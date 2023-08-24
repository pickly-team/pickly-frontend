import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CATEGORY_LIST } from './category';
import qs from 'qs';
import useToast from '@/common-ui/Toast/hooks/useToast';
import { GET_BOOKMARK_LIST } from '@/bookmarks/api/bookmark';
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
      queryClient.invalidateQueries(GET_BOOKMARK_LIST(memberId, '📖 전체', 0));
      queryClient.invalidateQueries(GET_BOOKMARK_LIST(memberId, '👀 읽음', 0));
      queryClient.invalidateQueries(
        GET_BOOKMARK_LIST(memberId, '🫣 읽지 않음', 0),
      );
      toast.fireToast({
        message: '삭제 되었습니다',
        mode: 'DELETE',
      });
    },
  });
};
