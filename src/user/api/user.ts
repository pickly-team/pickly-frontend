import { navigatePath } from '@/constants/navigatePath';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BASE_URL = '';

const DOMAIN = 'USER';

export const GET_USER_INFO = (userId: string) => [
  getKeyofObject(navigatePath, '/user/:id/edit'),
  DOMAIN,
  'USER_INFO',
  userId,
];

/** API call 결과 */
interface ServerUserInfo {
  profile_emoji: string;
  email: string;
  name: string;
  nickname: string;
}

export interface ClientUserInfo {
  emoji: string;
  email: string;
  name: string;
  nickname: string;
}

interface APIResult<T> {
  data: T;
}

type userGETUserInfoResponse = ServerUserInfo;

const GETUserInfo = {
  API: async () => {
    const { data } = await axios.get<APIResult<userGETUserInfoResponse>>(
      `${BASE_URL}/bookmarks/list`,
    );
    return data;
  },
  Mapper: (data: ServerUserInfo): ClientUserInfo => {
    return {
      emoji: data.profile_emoji,
      email: data.email,
      name: data.name,
      nickname: data.nickname,
    };
  },
  MockAPI: async (): Promise<ClientUserInfo> => {
    await sleep(1000);
    return GETUserInfo.Mapper({
      profile_emoji: '🐶',
      email: 'wshmin1234@gmail.com',
      name: '장동현',
      nickname: '까루',
    });
  },
};

export interface GETBookMarkListRequest {
  userId: string;
  mode: Mode;
}

export const useGETUserInfoQuery = ({
  userId,
  mode,
}: GETBookMarkListRequest) => {
  return useQuery(GET_USER_INFO(userId), async () => GETUserInfo.MockAPI(), {
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: !!(userId && mode === 'EDIT'),
  });
};

/** 의도적 지연 함수 : 로딩용 */
// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  useGETUserInfoQuery,
};

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
