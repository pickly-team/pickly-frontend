import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '@/common/service/client';
import { navigatePath } from '../../constants/navigatePath';
import { GET_BOOKMARK_COMMENT } from '@/bookmarks/api/bookmark';
import useToast from '@/common-ui/Toast/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import useAuthStore from '@/store/auth';

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
  const { memberId } = useAuthStore();
  return useMutation(postCommentAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId,
          memberId,
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
  memberId: number;
  putData: {
    content: string;
  };
  token?: string;
}

const putCommentAPI = async ({
  commentId,
  memberId,
  putData,
  token,
}: PUTCommentRequest) => {
  const { data } = await client<CommentItem>({
    method: 'put',
    url: `/comments/${commentId}`,
    params: { memberId },
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
  const { memberId } = useAuthStore();
  return useMutation(putCommentAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId,
          memberId,
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
  const { memberId } = useAuthStore();
  return useMutation(deleteCommentAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId,
          memberId,
        }),
      );
      fireToast({ message: '삭제 되었습니다', mode: 'DELETE' });
    },
  });
};

// 댓글 신고
interface POSTCommentReportRequest {
  reporterId: number;
  reportedId: number;
  content: string;
}

// const postCommentReportAPI = async (params: POSTCommentReportRequest) => {
//   const { data } = await client({
//     method: 'post',
//     url: '/reports/comments',
//     data: params,
//   });

//   return data;
// };

const dummyCommentReportAPI = async (params: POSTCommentReportRequest) => {
  console.log(params);
  return new Promise((resolve) => {
    resolve({
      data: true,
    });
  });
};

export interface POSTBookmarkReportMutation {
  reporterId: number;
}

export const usePOSTReportCommentQuery = () => {
  const toast = useToast();
  const router = useNavigate();
  return useMutation(dummyCommentReportAPI, {
    onSuccess: () => {
      toast.fireToast({
        message: '신고 되었습니다',
        mode: 'SUCCESS',
      });
      router(-1);
    },
    onError: (e: AxiosError) => {
      const errorCode = e.response?.status;
      if (errorCode && errorCode === 500) {
        toast.fireToast({
          message: '이미 신고한 북마크에요',
          mode: 'DELETE',
        });
        router(-1);
      }
    },
  });
};
