import styled from '@emotion/styled';

import BasicInfoBox from '@/members/ui/BasicInfoBox';
import StatsBox from '@/members/ui/StatsBox';
import SettingsBox from '@/members/ui/SettingsBox';
import NotificationSettingBox from '@/members/ui/NotificationSettingBox';
import getRem from '@/utils/getRem';
import CustomerFeedbackBox from '@/members/ui/CustomerFeedbackBox';
import useAuthStore from '@/store/auth';
import {
  useGETCommentCntQuery,
  useGETLikeCountQuery,
  useGETNotificationSettingDayQuery,
  useGetCategoryCntQuery,
} from '@/members/api/member';
import PullToRefresh from '@/common-ui/PullToRefresh';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';

const ProfilePage = () => {
  // FIRST RENDER
  // 1. 유저 정보 조회
  const { userInfo } = useAuthStore();

  // 2. 좋아요, 카테고리, 댓글 수 조회
  const { data: likeCount } = useGETLikeCountQuery({
    memberId: userInfo.id,
  });
  const { data: categoryCount } = useGetCategoryCntQuery({
    memberId: userInfo.id,
  });
  const { data: commentCount } = useGETCommentCntQuery({
    memberId: userInfo.id,
  });

  // 3. 알림 기준 일자 조회
  const { data: notificationSettingDay } = useGETNotificationSettingDayQuery({
    loginId: userInfo.id,
  });

  const { handleRefresh } = useHandleRefresh({ pageType: 'PROFILE' });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <>
        {/** 유저 정보 */}
        <BasicInfoBox />
        <LBody>
          {/** 좋아요, 카테고리, 댓글 수 */}
          <StatsBox
            numberOfLikes={likeCount || 0}
            numberOfCategories={categoryCount || 0}
            numberOfComments={commentCount || 0}
          />
          {/** 알림 시간 설정 */}
          <NotificationSettingBox />
          {/** 알림 기준 일자 설정 */}
          <SettingsBox serverRemindInDays={notificationSettingDay || 7} />
          <CustomerFeedbackBox />
        </LBody>
      </>
    </PullToRefresh>
  );
};

export default ProfilePage;

const LBody = styled.div`
  padding: 0 ${getRem(20)};
  margin: ${getRem(12)} 0;
  margin-bottom: 6rem;
`;
