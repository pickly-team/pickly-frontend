import { navigatePath } from '@/constants/navigatePath';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BASE_URL = '';
const DOMAIN = 'CATEGORY';

export const GET_CATEGORY_LIST = (userId: string) => [
  navigatePath.CATEGORY_LIST,
  DOMAIN,
  'CATEGORY_LIST',
  userId,
];

// 카테고리 리스트 조회
interface ServerCategoryItem {
  id: string;
  name: string;
  order: number;
  emoji: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  order: number;
  emoji: string;
  isChecked: boolean;
}

const GETCategoryList = {
  API: async () => {
    const { data } = await axios.get<ServerCategoryItem[]>(
      `${BASE_URL}/category`,
    );
    return data;
  },
  Mapper: (categoryList: ServerCategoryItem[]): CategoryItem[] => {
    return categoryList.map((category, idx) => ({
      id: category.id,
      name: category.name,
      order: category.order,
      emoji: category.emoji,
      isChecked: false,
    }));
  },
  MockAPI: async (): Promise<CategoryItem[]> => {
    const dummyCategoryList: ServerCategoryItem[] = [
      {
        id: '1',
        name: '프론트엔드',
        order: 1,
        emoji: '😃',
      },
      {
        id: '2',
        name: '백엔드',
        order: 2,
        emoji: '🧐',
      },
      {
        id: '3',
        name: '라이프 스타일',
        order: 3,
        emoji: '✅',
      },
      {
        id: '4',
        name: '퇴근 라이프',
        order: 4,
        emoji: '🥹',
      },
    ];
    await sleep(1000);
    return GETCategoryList.Mapper(dummyCategoryList);
  },
};

interface GETCategoryListRequest {
  userId: string;
}

export const useGETCategoryListQuery = ({ userId }: GETCategoryListRequest) => {
  return useQuery(GET_CATEGORY_LIST(''), GETCategoryList.MockAPI, {
    enabled: !!userId,
    suspense: true,
  });
};

/** 의도적 지연 함수 : 로딩용 */
// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
