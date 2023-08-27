import BottomNavigation from '@/common-ui/BottomNavigation';
import styled from '@emotion/styled';
import Header from '@/common-ui/Header/Header';
import getRem from '@/utils/getRem';

import Collapsible from '../common-ui/Collapsible';

const FaqPage = () => {
  const showBackButton = true;
  const title = 'FAQ';

  return (
    <Layout>
      <LTop>
        <Header title={title} showBackButton={showBackButton} />
      </LTop>
      <LMiddle>
        <LBody>
          <Collapsible
            summary="피클리는 어떤 서비스 인가요?"
            detail="피클리는 인터넷에서 유용한 정보를 찾아 북마크로 저장하고, 이를 한 곳에서 모아서 정리해주는 서비스에요. 

피클리에서는 다른 사용자들이 공유한 북마크도 볼 수 있고, 자신의 북마크를 다른 사용자들과 공유할 수도 있습니다.

또한 사용자를 대신해 읽지 않은 북마크를 읽어주는 기능도 있어요!"
          />
          <Collapsible
            summary="알림을 끄고 싶어요!"
            detail="계속되는 알림으로 번거로우신가요?
아래와 같은 방법으로 진행하시면 알림을 잠시 꺼두실 수 있습니다!

[알림 끄는 방법]

내 정보 > 하단 알림 토글 OFF"
          />
          <Collapsible
            summary="탈퇴는 어떻게 하나요?"
            detail="[탈퇴하는 방법]

내 정보 > 상단 ... 아이콘 > 내 정보 수정 > 탈퇴하기

다만 탈퇴시 복구가 어려우니 이 점 유의해주세요!"
          />
          <Collapsible
            summary="친구를 추가하고 싶어요!"
            detail="[친구 추가하는 방법]

친구 목록 페이지 > 검색 > 친구 팔로우

친구의 닉네임을 검색하시면 친구를 추가하실 수 있습니다."
          />
        </LBody>
      </LMiddle>
      <LBottom>
        <BottomNavigation />
      </LBottom>
    </Layout>
  );
};

export default FaqPage;

const Layout = styled.div``;
const LTop = styled.div``;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
const LBody = styled.div`
  padding: ${getRem(0, 20)};
  margin-top: ${getRem(12)};
  row-gap: ${getRem(21)};
`;
const LBottom = styled.div``;
