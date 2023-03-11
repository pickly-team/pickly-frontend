import styled from '@emotion/styled';

import BottomNavigation from '@/common-ui/BottomNavigation';

const ProfilePage = () => {
  return (
    <Layout>
      <LTop>top</LTop>
      <LMiddle>middle</LMiddle>
      <LBottom>bottom</LBottom>
      <LBottom>
        <BottomNavigation />
      </LBottom>
    </Layout>
  );
};

export default ProfilePage;

const Layout = styled.div``;
const LTop = styled.div`
  padding: 20px 20px;
`;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
const LBottom = styled.div``;
