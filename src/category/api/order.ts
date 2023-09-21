import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_BOOKMARK_CATEGORY_LIST } from '@/bookmarks/api/bookmark';

interface CategoryOrderData {
  categoryId: string;
  orderNum: number;
}

type PATCHCategoryOrderData = CategoryOrderData[];

const PATCHCategoryOrder = {
  API: async (patchData: PATCHCategoryOrderData) => {
    const { data } = await client.patch('/categories/order-num', patchData);
    return data;
  },
};

interface PATCHCategoryOrderMutation {
  memberId: number;
}

export const usePATCHCategoryOrderMutation = ({
  memberId,
}: PATCHCategoryOrderMutation) => {
  const queryClient = useQueryClient();
  return useMutation(PATCHCategoryOrder.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
    },
  });
};
