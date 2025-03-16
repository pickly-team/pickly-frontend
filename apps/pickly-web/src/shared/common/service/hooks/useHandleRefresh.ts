import { GET_USER_PROFILE } from '@/features/auth/api/profile';
import {
  GET_BOOKMARK_CATEGORY_LIST,
  GET_BOOKMARK_CATEGORY_STATUS,
  GET_BOOKMARK_COMMENT,
  GET_BOOKMARK_DETAIL_KEY,
  GET_BOOKMARK_LIST,
  GET_BOOKMARK_READ_STATUS,
} from '@/widgets/bookmarks/api/bookmark';
import { GET_LIKE_BOOKMARK_LIST } from '@/widgets/bookmarks/api/like';
import {
  GET_FRIEND_PROFILE,
  GET_NOTIFICATION_SETTING_DAY_KEY,
  GetCategoryCntKey,
  GetCommentCntKey,
  GetLikeCountAPIKey,
} from '@/widgets/members/api/member';
import { GET_NOTIFICATION_LIST_KEY } from '@/widgets/notification/api/notification';
import useAuthStore from '@/shared/store/auth';
import useBookmarkStore from '@/shared/store/bookmark';
import useFriendStore from '@/shared/store/friend';
import { useQueryClient } from '@tanstack/react-query';
import {
  GET_FOLLOWER_COUNT_KEY,
  GET_FOLLOWER_LIST_KEY,
  GET_FOLLOWING_COUNT_KEY,
  GET_FOLLOWING_LIST_KEY,
} from '@/widgets/friend/api/friends';
import { GET_COMMENT_LIST } from '@/widgets/comment/api/Comment';

interface HandleRefreshProps {
  pageType:
    | 'MAIN'
    | 'BOOKMARK'
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
        GET_BOOKMARK_CATEGORY_STATUS({ memberId }),
      );
      return await queryClient.invalidateQueries(
        GET_BOOKMARK_READ_STATUS({ memberId }),
      );
    }
    if (pageType === 'BOOKMARK') {
      await queryClient.invalidateQueries(
        GET_BOOKMARK_LIST(memberId, readOption, selectedCategoryId),
      );
      return await queryClient.invalidateQueries(
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
      return await queryClient.invalidateQueries(
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
      return await queryClient.invalidateQueries(
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
        GET_BOOKMARK_LIST(memberId, readOption, selectedCategoryId ?? 0),
      );
      return await queryClient.invalidateQueries(
        GET_BOOKMARK_CATEGORY_LIST(friendId),
      );
    }
    if (pageType === 'LIKE_PAGE') {
      return await queryClient.invalidateQueries(
        GET_LIKE_BOOKMARK_LIST(memberId),
      );
    }
    if (pageType === 'CATEGORY_LIST') {
      return await queryClient.invalidateQueries(
        GET_BOOKMARK_CATEGORY_LIST(memberId),
      );
    }
    if (pageType === 'COMMENT_LIST') {
      return await queryClient.invalidateQueries(GET_COMMENT_LIST);
    }
    if (pageType === 'BOOKMARK_DETAIL') {
      await queryClient.invalidateQueries(
        GET_BOOKMARK_COMMENT({
          bookmarkId: String(selectedBookmarkId),
          memberId,
        }),
      );
      return await queryClient.invalidateQueries(
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
