import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '@/common/service/client';
import { navigatePath } from '../../constants/navigatePath';
import { GET_BOOKMARK_COMMENT } from '@/bookmarks/api/bookmark';
import useToast from '@/common-ui/Toast/hooks/useToast';

const DOMAIN = 'COMMENT';

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);

export const GET_COMMENT_LIST = [getKeyofObject(navigatePath, '/'), DOMAIN];

interface ServerCommentItem {
  id: number;
  member: string;
  bookmarkId: number;
  bookmark: string;
  category: string;
  isOwnerComment: boolean;
  content: string;
  createdTimestamp: number;
}

export interface GETCommentListRequest {
  userId: number;
}

const CommentAPI = async ({ userId }: GETCommentListRequest) => {
  const { data } = await client.get<ServerCommentItem[]>(
    `/members/${userId}/comments`,
  );
  return data;
};

export const useGETCommentListQuery = ({ userId }: GETCommentListRequest) => {
  return useQuery(GET_COMMENT_LIST, async () => CommentAPI({ userId }), {
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!userId,
  });
};

// 댓글 작성
export interface Comment {
  id: number;
  member: string;
  bookmark: string;
  category: string;
  isOwnerComment: boolean;
  content: string;
  createdTimestamp: number;
}

interface POSTCommentRequest {
  bookmarkId: number;
  memberId: number;
  postData: {
    content: string;
  };

  token?: string;
}

const postCommentAPI = async ({
  bookmarkId,
  memberId,
  postData,
  token,
}: POSTCommentRequest) => {
  const { data } = await client<Comment>({
    method: 'post',
    url: `/bookmarks/${bookmarkId}/comment`,
    params: { bookmarkId, memberId },
    data: postData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface POSTCommentQueryRequest {
  bookmarkId: string;
  initComment: () => void;
}
export const usePOSTCommentQuery = ({
  bookmarkId,
  initComment,
}: POSTCommentQueryRequest) => {
  const queryClient = useQueryClient();
  return useMutation(postCommentAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId,
        }),
      );
      initComment();
    },
  });
};

export interface CommentItem {
  id: number;
  member: string;
  bookmark: string;
  category: string;
  isOwnerComment: boolean;
  content: string;
  createdTimestamp: number;
}

interface PUTCommentRequest {
  commentId: number;
  putData: {
    content: string;
  };

  token?: string;
}

const putCommentAPI = async ({
  commentId,
  putData,
  token,
}: PUTCommentRequest) => {
  const { data } = await client<CommentItem>({
    method: 'put',
    url: `/comments/${commentId}`,
    params: { commentId },
    data: putData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PUTCommentQueryRequest {
  bookmarkId: string;
  initComment: () => void;
}
export const usePUTCommentQuery = ({
  bookmarkId,
  initComment,
}: PUTCommentQueryRequest) => {
  const queryClient = useQueryClient();
  return useMutation(putCommentAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId,
        }),
      );
      initComment();
    },
  });
};

// 댓글 삭제

interface DELETECommentRequest {
  commentId: number;
  token?: string;
}

const deleteCommentAPI = async ({ commentId, token }: DELETECommentRequest) => {
  const { data } = await client({
    method: 'delete',
    url: `/comments/${commentId}`,
    params: { commentId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DELETECommentQueryRequest {
  bookmarkId: string;
}
export const useDELETECommentQuery = ({
  bookmarkId,
}: DELETECommentQueryRequest) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  return useMutation(deleteCommentAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId,
        }),
      );
      fireToast({ message: '삭제 되었습니다', mode: 'DELETE' });
    },
  });
};
