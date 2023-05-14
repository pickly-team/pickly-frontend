import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import { useInfiniteQuery } from '@tanstack/react-query';
const DOMAIN = 'CATEGORY';

export const GET_CATEGORY_LIST = (memberId: number) => [
  navigatePath.CATEGORY_LIST,
  DOMAIN,
  'CATEGORY_LIST',
  memberId,
];

// 카테고리 리스트 조회

interface SeverCategoryList {
  hasNext: boolean;
  contents: ServerCategoryItem[];
}

interface ServerCategoryItem {
  categoryId: string;
  name: string;
  orderNum: number;
  emoji: string;
}

export interface ClientCategoryList {
  hasNext: boolean;
  contents: ClientCategoryItem[];
}

export type ClientCategoryItem = ServerCategoryItem & {
  isChecked: boolean;
};

interface GETCategoryListRequest {
  memberId: number;
  pageRequest: {
    cursorId?: number;
    pageSize: number;
  };
}

const GETCategoryList = {
  API: async (params: GETCategoryListRequest) => {
    const { data } = await client.get<SeverCategoryList>('/categories', {
      params: {
        memberId: params.memberId,
        ...params.pageRequest,
      },
    });
    await sleep(1000);
    return GETCategoryList.Mapper(data);
  },
  Mapper: (categoryList: SeverCategoryList): ClientCategoryList => {
    return {
      hasNext: categoryList.hasNext,
      contents: categoryList.contents
        .map((category) => ({
          categoryId: category.categoryId,
          name: category.name,
          orderNum: category.orderNum,
          emoji: category.emoji,
          isChecked: false,
        }))
        .sort((a, b) => a.orderNum - b.orderNum),
    };
  },
};

interface GETCategoryListRequest {
  memberId: number;
}

export const useGETCategoryListQuery = (params: GETCategoryListRequest) => {
  return useInfiniteQuery(
    GET_CATEGORY_LIST(params.memberId),
    async ({ pageParam = null }) => {
      const { contents, hasNext } = await GETCategoryList.API({
        ...params,
        pageRequest: {
          cursorId: pageParam,
          pageSize: params.pageRequest.pageSize,
        },
      });
      return {
        contents,
        hasNext,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].categoryId;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      suspense: true,
    },
  );
};

/** 의도적 지연 함수 : 로딩용 */
// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
