import client from '@/common/service/client';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export interface ServerLikeBookmarkList {
  hasNext: boolean;
  contents: LikeBookmarkItem[];
}
export interface LikeBookmarkItem {
  bookmarkId: number;
  title: string;
  url: string;
  isUserLike: boolean;
}

interface GETLikeBookmarkListRequest {
  memberId: number;
  pageRequest: {
    cursorId?: number | null;
    pageSize: number;
  };
}

export const GET_LIKE_BOOKMARK_LIST = (userId: number) => [
  'GET_LIKE_BOOKMARK_LIST',
  userId,
];

const GETLikeBookmarkList = async (params: GETLikeBookmarkListRequest) => {
  await sleep(1000);
  const { data } = await client.get<ServerLikeBookmarkList>(
    `/members/${params.memberId}/bookmarks/likes`,
    {
      params: {
        memberId: params.memberId,
        cursorId: params.pageRequest.cursorId,
        pageSize: params.pageRequest.pageSize,
      },
    },
  );
  return data;
};

export const useGETLikeBookmarkListQuery = (
  params: GETLikeBookmarkListRequest,
) => {
  return useInfiniteQuery(
    GET_LIKE_BOOKMARK_LIST(params.memberId),
    async ({ pageParam = null }) => {
      const { contents, hasNext } = await GETLikeBookmarkList({
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
          return lastPage.contents[lastPage.contents.length - 1].bookmarkId;
        }
        return undefined;
      },
      suspense: true,
    },
  );
};

interface POSTLikeBookmarkRequest {
  memberId: number;
}

export const usePUTLikeBookmarkMutation = (params: POSTLikeBookmarkRequest) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (bookmarkId: number) => {
      await client.delete(`/bookmarks/${bookmarkId}/like`);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(GET_LIKE_BOOKMARK_LIST(params.memberId));
      },
    },
  );
};

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
