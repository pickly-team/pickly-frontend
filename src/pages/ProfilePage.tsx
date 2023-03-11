import styled from '@emotion/styled';

import BottomNavigation from '@/common-ui/BottomNavigation';
import BasicInfoBox from '@/members/ui/BasicInfoBox';
import StatsBox from '@/members/ui/StatsBox';
import { theme } from '@/styles/theme';
import ModeInfoBox from '@/members/ui/ModeInfoBox';
import NotificationSettingBox from '@/members/ui/NotificationSettingBox';

const ProfilePage = () => {
  return (
    <Layout>
      <GreyBackground />
      <LBody>
        <BasicInfoBox nickname="피클리마스터" email="pickly.member@gmail.com" />
        <StatsBox
          numberOfLikes={10}
          numberOfCategories={230}
          numberOfNotes={1234}
        />
        <ModeInfoBox remainingDays={3} />
        <NotificationSettingBox />
      </LBody>
      <LBottom>
        <BottomNavigation />
      </LBottom>
    </Layout>
  );
};

export default ProfilePage;

const GreyBackground = styled.div`
  position: absolute;
  width: 100%;
  background-color: ${theme.colors.darkGrey};
  height: 40%;
  border-bottom-left-radius: 2.125rem;
  border-bottom-right-radius: 2.125rem;
  z-index: -1;
`;
const Layout = styled.div``;
const LBody = styled.div`
  padding: 0 20px;
`;
const LBottom = styled.div``;
