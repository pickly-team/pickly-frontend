import { navigatePath } from '@/constants/navigatePath';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';

import Text from '@/common-ui/Text';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import Button from '@/common-ui/Button';
import getRem from '@/utils/getRem';

type Introduce = 'bookmark' | 'notification' | 'friend' | 'share' | 'chrome';

interface IntroduceText {
  title: string;
  description: string;
  image: string;
}

const introduceItems: Record<Introduce, IntroduceText> = {
  bookmark: {
    title: 'Pick 1. 북마크 추가하기',
    description:
      '북마크를 자유롭게 추가할 수 있어요!\n 추가한 북마크는 피클리가 관리해줄게요',
    image: `${process.env.VITE_ASSETS_URL}/introduce/bookmark.webp`,
  },
  notification: {
    title: 'Pick 2. 알림 설정하기',
    description:
      '친구를 팔로우해봐요!\n친구가 추가한 북마크를 함께 볼 수 있어요',
    image: `${process.env.VITE_ASSETS_URL}/introduce/notification.webp`,
  },
  friend: {
    title: 'Pick 3. 친구와 공유하기',
    description: '내가 북마크한 페이지를 모아서 볼 수 있어요',
    image: `${process.env.VITE_ASSETS_URL}/introduce/friend.webp`,
  },
  share: {
    title: 'Pick 4. URL 공유하기',
    description: 'URL 공유하기 기능을 이용해서\n북마크를 더 쉽게 추가해봐요!',
    image: `${process.env.VITE_ASSETS_URL}/introduce/share.webp`,
  },
  chrome: {
    title: 'Pick 5. 웹에서 이용하기',
    description:
      '웹에서 extension을 통해 북마크를 추가할 수 있어요!\n자세한 내용은 마이 페이지 > FAQ를 확인해주세요',
    image: `${process.env.VITE_ASSETS_URL}/introduce/chrome.webp`,
  },
} as const;

const IntroducePage = () => {
  const navigate = useNavigate();
  const [swiperIndex, setSwiperIndex] = useState(0);
  const onClickConfirm = () => {
    navigate(navigatePath.PROFILE);
  };

  return (
    <ContentWrapper>
      <Swiper
        // install Swiper modules
        modules={[Pagination, A11y]}
        pagination={{ clickable: true }}
        onSlideChange={({ realIndex }) => setSwiperIndex(realIndex)}
        css={css`
          display: flex;
          .swiper-pagination-bullet {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 100%;
            margin: 0;
            line-height: 40px;
            background-color: ${swiperIndex === 4
              ? 'transparent'
              : theme.colors.lightPrimary};
          }
        `}
      >
        <SwiperSlide>
          <IntroduceItem type="bookmark" />
        </SwiperSlide>
        <SwiperSlide>
          <IntroduceItem type="notification" />
        </SwiperSlide>
        <SwiperSlide>
          <IntroduceItem type="friend" />
        </SwiperSlide>
        <SwiperSlide>
          <IntroduceItem type="share" />
        </SwiperSlide>
        <SwiperSlide>
          <IntroduceItem type="chrome">
            <ButtonWrapper>
              <Button
                css={css`
                  margin-top: 2rem;
                  width: 100%;
                `}
                onClick={onClickConfirm}
              >
                피클리 시작하기
              </Button>
            </ButtonWrapper>
          </IntroduceItem>
        </SwiperSlide>
      </Swiper>
    </ContentWrapper>
  );
};

export default IntroducePage;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 9dvh 0;
`;

interface IntroduceItemProps {
  type: Introduce;
  children?: React.ReactNode;
}

const IntroduceItem = ({ type, children }: IntroduceItemProps) => {
  return (
    <Wrapper>
      <Image src={introduceItems[type].image} />
      <Title level="h2" weight="bold" fontSize={1.4}>
        {introduceItems[type].title}
      </Title>
      <Description fontSize={0.9}>
        {introduceItems[type].description}
      </Description>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  margin-bottom: 2rem;
`;

const Title = styled(Text.Header)``;

const Description = styled(Text.Span)`
  text-align: center;
  white-space: pre-line;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  padding: 0 ${getRem(20)};
  width: 100%;
`;
