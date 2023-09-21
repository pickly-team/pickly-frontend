import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import { useQuery } from '@tanstack/react-query';
const DOMAIN = 'CATEGORY';

export const GET_CATEGORY = (memberId: number, categoryId: string) => [
  navigatePath.CATEGORY_EDIT,
  DOMAIN,
  'CATEGORY',
  memberId,
  categoryId,
];

// 단일 카테고리 조회
interface CategoryItem {
  categoryId: number;
  name: string;
  emoji: string;
  orderNum: number;
}

const getCategoryAPI = async (categoryId: string) => {
  const { data } = await client.get<CategoryItem>(`/categories/${categoryId}`);
  return data;
};

interface GETCategoryRequest {
  categoryId: string;
  memberId: number;
  mode: 'ADD' | 'EDIT';
}

export const useGETCategoryAPI = ({
  categoryId,
  memberId,
  mode,
}: GETCategoryRequest) => {
  return useQuery(
    GET_CATEGORY(memberId, categoryId),
    () => getCategoryAPI(categoryId),
    {
      staleTime: 1000,
      cacheTime: 1000 * 60 * 5,
      enabled: mode === 'EDIT',
    },
  );
};
