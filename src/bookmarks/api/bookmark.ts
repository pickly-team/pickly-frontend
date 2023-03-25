import { navigatePath } from '@/constants/navigatePath';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
const BASE_URL = '';

const DOMAIN = 'BOOKMARK';

const GET_BOOKMARK_LIST = (userId: string) => [
  getKeyofObject(navigatePath, '/'),
  DOMAIN,
  'BOOKMARK_LIST',
  userId,
];

///////////////////////////////////
// 북마크 메인 페이지
// 북마크 리스트 조회

/** API call 결과 */
interface SeverBookMarkItem {
  id: string;
  is_read: boolean;
  title: string;
  img_src: string;
  is_liked: boolean;
  is_bookmarked: boolean;
  is_message: boolean;
  date: string;
  url: string;
}

export interface ClientBookMarkItem {
  id: string;
  isRead: boolean;
  title: string;
  imgSrc: string;
  isLiked: boolean;
  isBookmarked: boolean;
  isMessage: boolean;
  date: string;
  url: string;
}

interface bookmarkGETBookMarkListResponse {
  bookmark_list: SeverBookMarkItem[];
}

/** mapping 결과 */
export interface bookmarkGETBookMarkList {
  bookmark_list: ClientBookMarkItem[];
}

const GETBookMarkList = {
  API: async () => {
    const { data } = await axios.get<bookmarkGETBookMarkListResponse>(
      `${BASE_URL}/bookmarks/list`,
    );
    return data;
  },
  Mapper: ({
    bookmark_list,
  }: bookmarkGETBookMarkListResponse): bookmarkGETBookMarkList => {
    return {
      bookmark_list: bookmark_list.map((bookmark) => ({
        id: bookmark.id,
        isRead: bookmark.is_read,
        title: bookmark.title,
        imgSrc: bookmark.img_src,
        isLiked: bookmark.is_liked,
        isBookmarked: bookmark.is_bookmarked,
        isMessage: bookmark.is_message,
        date: bookmark.date,
        url: bookmark.url,
      })),
    };
  },
  MockAPI: async (): Promise<bookmarkGETBookMarkList> => {
    await sleep(10000);
    return GETBookMarkList.Mapper({
      bookmark_list: range(0, Math.floor(Math.random() * 21) + 1).map(
        (): SeverBookMarkItem => ({
          id: uuid(),
          title: '발가락으로 만드는 CRUD 게시판 발가락으로 만드는 CRUD 게시판',
          img_src:
            'https://user-images.githubusercontent.com/54137044/222977918-198a3ce1-d139-4755-b5d5-6f3152dcbbb3.png',
          is_liked: randomBoolean(),
          is_bookmarked: randomBoolean(),
          is_message: randomBoolean(),
          date: '2021-08-01',
          url: 'https://naver.com',
          is_read: randomBoolean(),
        }),
      ),
    });
  },
};

export interface GETBookMarkListRequest {
  userId: string;
}

export const useGETBookMarkListQuery = ({ userId }: GETBookMarkListRequest) => {
  return useQuery(
    GET_BOOKMARK_LIST(userId),
    async () => GETBookMarkList.MockAPI(),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !!userId,
    },
  );
};

///////////////////////////////////
// 북마크 추가 BS
// 북마크 카테고리 리스트 조회
interface ServerBookmarkCategoryItem {
  order: number;
  id: string;
  name: string;
}

export interface ClientBookmarkCategoryItem {
  order: number;
  id: string;
  name: string;
  isSelected: boolean;
}

interface GETBookmarkCategoryListResponse {
  category_list: ServerBookmarkCategoryItem[];
}

const GETBookmarkCategoryList = {
  API: async () => {
    const { data } = await axios.get<GETBookmarkCategoryListResponse>(
      `${BASE_URL}/bookmarks/category/list`,
    );
    return data;
  },
  Mapper: ({
    category_list,
  }: GETBookmarkCategoryListResponse): ClientBookmarkCategoryItem[] => {
    return category_list.map((category, idx) => ({
      order: category.order,
      id: category.id,
      name: category.name,
      isSelected: idx === 0,
    }));
  },
  MockAPI: async (): Promise<ClientBookmarkCategoryItem[]> => {
    await sleep(1000);
    return GETBookmarkCategoryList.Mapper({
      category_list: [
        {
          order: 1,
          id: uuid(),
          name: '😃 프론트엔드',
        },
        {
          order: 2,
          id: uuid(),
          name: '🧐 백엔드',
        },
        {
          order: 3,
          id: uuid(),
          name: '✅ 라이프 스타일',
        },
        {
          order: 4,
          id: uuid(),
          name: '🥹 퇴근 라이프',
        },
      ],
    });
  },
};

const GET_BOOKMARK_CATEGORY_LIST = (userId: string) => [
  getKeyofObject(navigatePath, '/'),
  DOMAIN,
  'BOOKMARK_CATEGORY_LIST',
  userId,
];

export const useGETCategoryListQuery = ({ userId }: GETBookMarkListRequest) => {
  return useQuery(
    GET_BOOKMARK_CATEGORY_LIST(userId),
    async () => GETBookmarkCategoryList.MockAPI(),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !!userId,
    },
  );
};

// SERVER 연동 후 삭제
const range = (start: number, end: number) => {
  const array = [];
  for (let i = start; i < end; i += 1) {
    array.push(i);
  }
  return array;
};

/** 의도적 지연 함수 : 로딩용 */
// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** 랜덤 Boolean 생성 함수 */
const randomBoolean = () => Math.random() >= 0.5;

export default {
  useGETBookMarkListQuery,
};

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
