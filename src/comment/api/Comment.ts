import { navigatePath } from '@/constants/navigatePath';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://52.79.54.119:8080/api';

const DOMAIN = 'COMMENT';

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);

export const GET_COMMENT_LIST = [getKeyofObject(navigatePath, '/'), DOMAIN];

interface ServerCommentItem {
  id: number;
  member: string;
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
  const { data } = await axios.get<ServerCommentItem[]>(
    `${BASE_URL}/members/${userId}/comments`,
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
