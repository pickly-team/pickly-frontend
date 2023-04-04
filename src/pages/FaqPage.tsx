import BottomNavigation from '@/common-ui/BottomNavigation';
import Icon from '@/common-ui/assets/Icon';
import styled from '@emotion/styled';
import Header from '@/common-ui/Header/Header';
import getRem from '@/utils/getRem';

import Collapsible from '../common-ui/Collapsible';

const FaqPage = () => {
  const showBackButton = true;
  const title = 'FAQ';
  const rightButton = <Icon name="more" size="s" />;

  return (
    <Layout>
      <LTop>
        <Header
          title={title}
          showBackButton={showBackButton}
          rightButton={rightButton}
        />
      </LTop>
      <LMiddle>
        <LBody>
          <Collapsible
            summary="피클리는 어떤 서비스 인가요?"
            detail="피클리는 인터넷에서 유용한 정보를 찾아 북마크로 저장하고, 이를 한 곳에서 모아서 정리해주는 서비스에요. 피클리에서는 다른 사용자들이 공유한 북마크도 볼 수 있고, 자신의 북마크를 다른 사용자들과 공유할 수도 있습니다. 또한 자동삭제 모드와 하드 모드 같이 몰입도를 높일 수 있는 서비스도 제공 합니다."
          />
          <Collapsible
            summary="자동 삭제 모드는 어떤 모드 인가요?"
            detail="피클리는 인터넷에서 유용한 정보를 찾아 북마크로 저장하고, 이를 한 곳에서 모아서 정리해주는 서비스에요. 피클리에서는 다른 사용자들이 공유한 북마크도 볼 수 있고, 자신의 북마크를 다른 사용자들과 공유할 수도 있습니다. 또한 자동삭제 모드와 하드 모드 같이 몰입도를 높일 수 있는 서비스도 제공 합니다."
          />
          <Collapsible
            summary="하드 모드는 어떤 모드 인가요?"
            detail="피클리는 인터넷에서 유용한 정보를 찾아 북마크로 저장하고, 이를 한 곳에서 모아서 정리해주는 서비스에요. 피클리에서는 다른 사용자들이 공유한 북마크도 볼 수 있고, 자신의 북마크를 다른 사용자들과 공유할 수도 있습니다. 또한 자동삭제 모드와 하드 모드 같이 몰입도를 높일 수 있는 서비스도 제공 합니다."
          />
          <Collapsible
            summary="알림을 끄고 싶어요!"
            detail="피클리는 인터넷에서 유용한 정보를 찾아 북마크로 저장하고, 이를 한 곳에서 모아서 정리해주는 서비스에요. 피클리에서는 다른 사용자들이 공유한 북마크도 볼 수 있고, 자신의 북마크를 다른 사용자들과 공유할 수도 있습니다. 또한 자동삭제 모드와 하드 모드 같이 몰입도를 높일 수 있는 서비스도 제공 합니다."
          />
          <Collapsible
            summary="탈퇴는 어떻게 하나요?"
            detail="피클리는 인터넷에서 유용한 정보를 찾아 북마크로 저장하고, 이를 한 곳에서 모아서 정리해주는 서비스에요. 피클리에서는 다른 사용자들이 공유한 북마크도 볼 수 있고, 자신의 북마크를 다른 사용자들과 공유할 수도 있습니다. 또한 자동삭제 모드와 하드 모드 같이 몰입도를 높일 수 있는 서비스도 제공 합니다."
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
const LTop = styled.div`
  padding: 20px 20px;
`;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
const LBody = styled.div`
  padding: 0 50px;
  margin-top: ${getRem(12)};
  row-gap: ${getRem(21)};
`;
const LBottom = styled.div``;
