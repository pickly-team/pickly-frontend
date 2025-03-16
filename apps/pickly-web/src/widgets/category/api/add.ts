import { GET_BOOKMARK_CATEGORY_LIST } from '@/widgets/bookmarks/api/bookmark';
import useToast from '@/shared/ui/Toast/hooks/useToast';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '@/shared/common/service/client';

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
  const { fireToast } = useToast();
  return useMutation(POSTCategory.API, {
    onSuccess: async () => {
      await queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
      router(-1);
    },
    onError: () => {
      fireToast({ message: '앗! 카테고리 추가에 실패했어요', mode: 'ERROR' });
    },
  });
};
