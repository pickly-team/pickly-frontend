import BottomNavigation from '@/common-ui/BottomNavigation';
import styled from '@emotion/styled';
import Header from '@/common-ui/Header/Header';
import getRem from '@/utils/getRem';

import Collapsible from '../../common-ui/Collapsible';

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

또한 알림을 통해 읽지 않은 북마크를 확인할 수 있어요!"
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
            detail={`[탈퇴하는 방법]

내 정보 > 상단 설정 아이콘 > 내 정보 수정 > 탈퇴하기

다만 탈퇴시 다시 복구할 수 없으니 이 점 유의해주세요!`}
          />
          <Collapsible
            summary="친구를 추가하고 싶어요!"
            detail="[친구 추가하는 방법]

친구 목록 페이지 > 검색 > 친구 팔로우

친구의 닉네임을 검색하시면 친구를 추가하실 수 있습니다.
차단한 사용자는 검색되지 않습니다."
          />
          <Collapsible
            summary="모바일 웹에서 피클리를 사용하고 싶어요!"
            detail="[모바일 웹에서 피클리를 사용하는 방법]

1. 공유하고 싶은 페이지에서 공유하기 버튼을 누른 후

2. Pickly를 선택해주세요.
   
3. 카테고리와 공개범위를 선택한 후, 공유하기 버튼을 누르면 완료!"
          />
          <Collapsible
            summary="PC에서 피클리를 사용하고 싶어요!"
            detail="[PC에서 피클리를 사용하는 방법]

1. 크롬 브라우저에 pickly extension을 설치해주세요.
   확장 프로그램 > Chrome 웹 스토어 방문하기 > pickly 를 검색한 후 
   설치하면 됩니다.

2. 피클리 모바일에서 인증코드를 발급 받아 주세요.
   마이페이지 > 우측 상단 설정 버튼 > 인증코드 발급 메뉴를 
   이용하면 됩니다.

3. 크롬 웹 브라우저에서 마우스 우클릭 > pickly extension 을 누른 후, 
   인증코드를 입력해 로그인 해주세요.
   로그인에 성공했다면, 원하는 북마크 페이지에서 
   마우스 우클릭 > pickly extension을 눌러 피클리에 북마크를
   추가할 수 있어요!"
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
