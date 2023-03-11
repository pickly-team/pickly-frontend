import styled from '@emotion/styled';

import BottomNavigation from '@/common-ui/BottomNavigation';
import BasicInfoBox from '@/members/ui/BasicInfoBox';
import StatsBox from '@/members/ui/StatsBox';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import Button from '@/common-ui/Button';
import Icon from '@/common-ui/assets/Icon';

const ProfilePage = () => {
  const remainingDays = 3;

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
        <WhiteRoundedBox style={{ marginTop: '1.5rem' }}>
          <Text.Span color={'grey900'} weight="bold" fontSize={1.25}>
            노말 모드 진행 중 📖
          </Text.Span>
          <ModeTextContainer>
            <Text.Div
              color={'grey900'}
              fontSize={0.75}
              weight="bold"
              style={{ marginBottom: '0.3rem' }}
            >
              피클리에 추가한 즐겨찾기 게시글을
            </Text.Div>
            <Text.Span
              color={'lightPrimary'}
              fontSize={1.25}
              weight="bold"
            >{`${remainingDays}일`}</Text.Span>
            <Text.Span color={'grey900'} fontSize={0.75} weight="bold">
              이내 읽지 않으면 알림이 울려요!
            </Text.Span>
            <CircleListContainer>
              <CircleContainer>
                <GreenCircle>
                  <Icon name={'alarm'} size={'s'} />
                </GreenCircle>
                <Text.Span
                  fontSize={0.75}
                  weight="bold"
                  color={'grey900'}
                  style={{
                    marginTop: '0.3rem',
                  }}
                >{`${7}일째`}</Text.Span>
              </CircleContainer>
              <CircleContainer>
                <GreenCircle>
                  <Icon name={'like'} size={'s'} />
                </GreenCircle>
                <Text.Span
                  fontSize={0.75}
                  weight="bold"
                  color={'grey900'}
                  style={{
                    marginTop: '0.3rem',
                  }}
                >{`${7}개`}</Text.Span>
              </CircleContainer>
              <CircleContainer>
                <GreenCircle>
                  <Icon name={'check'} size={'s'} />
                </GreenCircle>
                <Text.Span
                  fontSize={0.75}
                  weight="bold"
                  color={'grey900'}
                  style={{
                    marginTop: '0.3rem',
                  }}
                >
                  모드 변경
                </Text.Span>
              </CircleContainer>
            </CircleListContainer>
          </ModeTextContainer>
        </WhiteRoundedBox>
        <WhiteRoundedBox style={{ marginTop: '2.375rem' }}>
          <Text.Span color={'grey900'} weight="bold" fontSize={1.25}>
            알림 시간 관리
          </Text.Span>
          <NotificationRow>
            <NotificationSettingTextContainer>
              <Icon name={'alarm-green'} size={'s'} />
              <Text.Span
                color={'grey900'}
                weight="bold"
                fontSize={0.75}
                style={{ marginLeft: '0.625rem', marginRight: '0.625rem' }}
              >
                매일
              </Text.Span>
              <Text.Span color={'grey600'} weight="bold" fontSize={0.625}>
                오전 10시
              </Text.Span>
            </NotificationSettingTextContainer>
            <Button width={40} disabled style={{ fontWeight: 'bold' }}>
              변경하기
            </Button>
          </NotificationRow>
        </WhiteRoundedBox>
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
const WhiteRoundedBox = styled.div`
  padding: 1.25rem;
  background-color: ${theme.colors.white};
  border-radius: 0.625rem;
`;
const ModeTextContainer = styled.div`
  margin-top: 0.5rem;
`;
const CircleListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
`;
const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GreenCircle = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: ${theme.colors.lightPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NotificationRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.625rem;
  align-items: center;
`;
const NotificationSettingTextContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Layout = styled.div``;
const LBody = styled.div`
  padding: 0 20px;
`;
const LBottom = styled.div``;
