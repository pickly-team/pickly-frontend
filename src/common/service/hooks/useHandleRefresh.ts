import { GET_USER_PROFILE } from '@/auth/api/profile';
import {
  GET_BOOKMARK_CATEGORY_LIST,
  GET_BOOKMARK_COMMENT,
  GET_BOOKMARK_DETAIL_KEY,
  GET_BOOKMARK_LIST,
} from '@/bookmarks/api/bookmark';
import { GET_LIKE_BOOKMARK_LIST } from '@/bookmarks/api/like';
import { READ_OPTIONS } from '@/bookmarks/service/hooks/home/useReadList';
import { GET_CATEGORY_LIST } from '@/category/api/category';
import { GET_COMMENT_LIST } from '@/comment/api/Comment';
import {
  GET_FOLLOWER_COUNT_KEY,
  GET_FOLLOWER_LIST_KEY,
  GET_FOLLOWING_COUNT_KEY,
  GET_FOLLOWING_LIST_KEY,
} from '@/friend/api/friends';
import {
  GET_FRIEND_PROFILE,
  GET_NOTIFICATION_SETTING_DAY_KEY,
  GetCategoryCntKey,
  GetCommentCntKey,
  GetLikeCountAPIKey,
} from '@/members/api/member';
import { GET_NOTIFICATION_LIST_KEY } from '@/notification/api/notification';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import useFriendStore from '@/store/friend';
import { useQueryClient } from '@tanstack/react-query';

interface HandleRefreshProps {
  pageType:
    | 'MAIN'
    | 'FRIENDS'
    | 'NOTIFICATIONS'
    | 'PROFILE'
    | 'FRIEND_BOOKMARK'
    | 'LIKE_PAGE'
    | 'CATEGORY_LIST'
    | 'COMMENT_LIST'
    | 'BOOKMARK_DETAIL';
}

const useHandleRefresh = ({ pageType }: HandleRefreshProps) => {
  const queryClient = useQueryClient();
  const { memberId } = useAuthStore();
  const { readOption, selectedCategoryId, selectedBookmarkId } =
    useBookmarkStore();
  const { friendId } = useFriendStore();

  const handleRefresh = async () => {
    if (pageType === 'MAIN') {
      await queryClient.invalidateQueries(
        GET_BOOKMARK_LIST(
          memberId,
          READ_OPTIONS[readOption ?? '📖 전체'],
          selectedCategoryId ?? 0,
        ),
      );
      return queryClient.invalidateQueries(
        GET_BOOKMARK_CATEGORY_LIST(memberId),
      );
    }
    if (pageType === 'FRIENDS') {
      await queryClient.invalidateQueries(
        GET_FOLLOWING_LIST_KEY({
          memberId,
        }),
      );
      await queryClient.refetchQueries(
        GET_FOLLOWER_LIST_KEY({
          memberId,
        }),
      );
      await queryClient.refetchQueries(GET_FOLLOWER_COUNT_KEY({ memberId }));
      return await queryClient.refetchQueries(
        GET_FOLLOWING_COUNT_KEY({ memberId }),
      );
    }
    if (pageType === 'NOTIFICATIONS') {
      return queryClient.invalidateQueries(
        GET_NOTIFICATION_LIST_KEY({
          memberId,
        }),
      );
    }
    if (pageType === 'PROFILE') {
      await queryClient.invalidateQueries(
        GET_USER_PROFILE({
          loginId: memberId,
        }),
      );
      await queryClient.invalidateQueries(
        GetLikeCountAPIKey({
          memberId,
        }),
      );
      await queryClient.invalidateQueries(GetCategoryCntKey({ memberId }));
      await queryClient.invalidateQueries(GetCommentCntKey({ memberId }));
      return queryClient.invalidateQueries(
        GET_NOTIFICATION_SETTING_DAY_KEY({
          loginId: memberId,
        }),
      );
    }
    if (pageType === 'FRIEND_BOOKMARK') {
      await queryClient.invalidateQueries(
        GET_FRIEND_PROFILE({
          loginId: memberId,
          memberId: friendId,
        }),
      );
      await queryClient.invalidateQueries(
        GET_BOOKMARK_LIST(
          memberId,
          READ_OPTIONS[readOption ?? '📖 전체'],
          selectedCategoryId ?? 0,
        ),
      );
      return queryClient.invalidateQueries(
        GET_BOOKMARK_CATEGORY_LIST(friendId),
      );
    }
    if (pageType === 'LIKE_PAGE') {
      return queryClient.invalidateQueries(GET_LIKE_BOOKMARK_LIST(memberId));
    }
    if (pageType === 'CATEGORY_LIST') {
      return queryClient.invalidateQueries(GET_CATEGORY_LIST(memberId));
    }
    if (pageType === 'COMMENT_LIST') {
      return queryClient.invalidateQueries(GET_COMMENT_LIST);
    }
    if (pageType === 'BOOKMARK_DETAIL') {
      await queryClient.invalidateQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId: String(selectedBookmarkId),
          memberId,
        }),
      );
      return queryClient.invalidateQueries(
        GET_BOOKMARK_DETAIL_KEY({
          bookmarkId: String(selectedBookmarkId),
          memberId,
        }),
      );
    }
  };

  return { handleRefresh };
};

export default useHandleRefresh;
