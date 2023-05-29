import { useQuery, UseQueryResult } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import resolveAfterDelay from '@/utils/resolveAfterDelay';

type Friends = {
  id: string;
  name: string;
  profileEmoji?: string;
};

const fetchFollowers = async (): Promise<Friends[]> => {
  //TODO: API 호출로 변경
  const mockData: Friends[] = [
    {
      id: '1',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
    },
    {
      id: '2',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
    },
  ];

  return resolveAfterDelay(mockData, 1000);
};

const fetchFollowings = async (): Promise<Friends[]> => {
  //TODO: API 호출로 변경
  const mockData: Friends[] = [
    {
      id: '1',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
    },
    {
      id: '2',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
    },
  ];

  return resolveAfterDelay(mockData, 1000);
};
export const useGetFollowers = (): UseQueryResult<Friends[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWERS],
    queryFn: fetchFollowers,
    suspense: true,
  });
};
export const useGetFollowings = (): UseQueryResult<Friends[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWINGS],
    queryFn: fetchFollowings,
    suspense: true,
  });
};

const usePostFollow = () => {};
const usePostUnFollow = () => {};
