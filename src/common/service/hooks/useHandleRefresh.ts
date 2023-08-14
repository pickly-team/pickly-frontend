import { GET_USER_PROFILE } from '@/auth/api/profile';
import {
  GET_BOOKMARK_CATEGORY_LIST,
  GET_BOOKMARK_LIST,
} from '@/bookmarks/api/bookmark';
import { READ_OPTIONS } from '@/bookmarks/service/hooks/home/useReadList';
import {
  GET_FOLLOWER_COUNT_KEY,
  GET_FOLLOWER_LIST_KEY,
  GET_FOLLOWING_COUNT_KEY,
  GET_FOLLOWING_LIST_KEY,
} from '@/friend/api/friends';
import {
  GET_NOTIFICATION_SETTING_DAY_KEY,
  GetCategoryCntKey,
  GetCommentCntKey,
  GetLikeCountAPIKey,
} from '@/members/api/member';
import { GET_NOTIFICATION_LIST_KEY } from '@/notification/api/notification';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import { useQueryClient } from '@tanstack/react-query';

interface HandleRefreshProps {
  pageType: 'MAIN' | 'FRIENDS' | 'NOTIFICATIONS' | 'PROFILE';
}

const useHandleRefresh = ({ pageType }: HandleRefreshProps) => {
  const queryClient = useQueryClient();
  const { memberId } = useAuthStore();
  const { readOption, selectedCategoryId } = useBookmarkStore();

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
  };

  return { handleRefresh };
};

export default useHandleRefresh;
