import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';
import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CATEGORY, GET_CATEGORY_LIST } from './category';
import { useFlow } from '@/common-ui/stackflow';

interface CategoryItem {
  name: string;
  emoji: string;
}

interface PUTCategoryRequest {
  memberId: number;
  postData: CategoryItem;
  categoryId: string;
}

const PUTCategory = {
  API: async (params: PUTCategoryRequest) => {
    const { data } = await client.put(
      `/categories/${params.categoryId}`,
      params.postData,
      {
        params: {
          memberId: params.memberId,
        },
      },
    );
    return data;
  },
};

interface PUTCategoryMutation {
  memberId: number;
  categoryId: string;
}

export const usePUTCategoryMutation = ({
  memberId,
  categoryId,
}: PUTCategoryMutation) => {
  const queryClient = useQueryClient();

  const { pop } = useFlow();

  return useMutation(PUTCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_CATEGORY_LIST(memberId));
      await queryClient.refetchQueries(GET_CATEGORY(memberId, categoryId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
      pop();
    },
  });
};
