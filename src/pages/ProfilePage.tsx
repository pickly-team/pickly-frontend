import styled from '@emotion/styled';

import BottomNavigation from '@/common-ui/BottomNavigation';
import BasicInfoBox from '@/members/ui/BasicInfoBox';
import StatsBox from '@/members/ui/StatsBox';
import SettingsBox from '@/members/ui/SettingsBox';
import NotificationSettingBox from '@/members/ui/NotificationSettingBox';
import getRem from '@/utils/getRem';
import CustomerFeedbackBox from '@/members/ui/CustomerFeedbackBox';
import { NotificationSetting } from '@/notification/api/notification';

const ProfilePage = () => {
  const dummyNotificationSetting: NotificationSetting = {
    time: {
      hour: 10,
      minute: 0,
    },
  };

  return (
    <Layout>
      <BasicInfoBox
        memberId={1}
        profileEmoji="🥱"
        nickname="피클리마스터"
        bookmarksCount={0}
        followersCount={1001}
        followeesCount={127}
      />
      <LBody>
        <StatsBox
          numberOfLikes={10}
          numberOfCategories={230}
          numberOfComments={1234}
        />
        <SettingsBox />
        <NotificationSettingBox
          notificationSetting={dummyNotificationSetting}
        />
        <CustomerFeedbackBox />
      </LBody>
      <LBottom>
        <BottomNavigation />
      </LBottom>
    </Layout>
  );
};

export default ProfilePage;

const Layout = styled.div``;
const LBody = styled.div`
  padding: 0 ${getRem(20)};
  margin-top: ${getRem(12)};
  row-gap: ${getRem(21)};
`;
const LBottom = styled.div``;
