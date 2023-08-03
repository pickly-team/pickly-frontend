import styled from '@emotion/styled';

import getRem from '@/utils/getRem';
import CustomerFeedbackBox from '@/members/ui/CustomerFeedbackBox';
import useAuthStore from '@/store/auth';
import {
  useGETCommentCntQuery,
  useGETLikeCountQuery,
  useGETNotificationSettingDayQuery,
  useGETNotificationStandardsQuery,
  useGetCategoryCntQuery,
} from '@/members/api/member';
import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import StatsBox from '@/members/ui/StatsBox';
import SettingsBox from '@/members/ui/SettingsBox';
import NotificationSettingBox from '@/members/ui/NotificationSettingBox';
import BasicInfoBox from '@/members/ui/BasicInfoBox';
import Layout from '@/common-ui/Layout';

const ProfilePage: ActivityComponentType = () => {
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

  // 4. 알림 시간 조회
  const { data: notificationSetting } = useGETNotificationStandardsQuery({
    loginId: userInfo.id,
  });

  return (
    <AppScreen>
      <Wrapper>
        {/** 유저 정보 */}
        <BasicInfoBox />
        <LBody>
          {/** 좋아요, 카테고리, 댓글 수 */}
          <StatsBox
            numberOfLikes={likeCount || 0}
            numberOfCategories={categoryCount || 0}
            numberOfComments={commentCount || 0}
          />
          {/** 알림 기준 일자 설정 */}
          <SettingsBox serverRemindInDays={notificationSettingDay || 7} />
          {/** 알림 시간 설정 */}
          <NotificationSettingBox
            notificationSetting={{
              time: {
                hour: Number(
                  notificationSetting?.notifyDailyAt.split(':')[0] || 9,
                ),
                minute: Number(
                  notificationSetting?.notifyDailyAt.split(':')[1] || 0,
                ),
              },
            }}
          />
          <CustomerFeedbackBox />
        </LBody>
      </Wrapper>
    </AppScreen>
  );
};

export default ProfilePage;

const Wrapper = styled(Layout)`
  height: calc(100lvh - 5rem);
  overflow-y: scroll;
`;
const LBody = styled.div`
  padding: 0 ${getRem(20)};
  margin: ${getRem(12)} 0;
`;
