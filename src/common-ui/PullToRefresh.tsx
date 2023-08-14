import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { css, keyframes } from '@emotion/react';

interface Props {
  onRefresh: () => Promise<void>;
  threshold?: number;
  children: React.ReactNode;
}

const PullToRefresh = ({ onRefresh, threshold = 4, children }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [finished, setFinished] = useState(false); // 애니메이션 끝나고 1초 후에 finished를 true로 바꿔줌
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number | null>(null);
  const MAX_PULL = 4; // 최대 3rem까지 당길 수 있도록 설정

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
    setFinished(true);
    setTimeout(() => {
      setPullDistance(0);
    }, 1000);
    setTimeout(() => {
      setFinished(false);
    }, 1500);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!refreshing) {
      startY.current = e.touches[0].clientY;
    }
  };

  const onTouchEnd = () => {
    if (pullDistance >= threshold) {
      handleRefresh();
    } else {
      setPullDistance(0);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startY.current !== null) {
      const diff = (e.touches[0].clientY - startY.current) / 16; // pixel to rem conversion
      if (diff > 0) {
        setPullDistance(Math.min(diff, MAX_PULL));
      }
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      style={{ overflow: 'hidden' }}
    >
      <IconContainer
        style={{ transform: `translateY(${pullDistance - threshold}rem)` }}
      >
        <Spinner
          css={css`
            animation: ${finished ? spinFadeOut : spin} 1s
              ${finished ? '0.5s' : '0.2s'};
          `}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} />
          ))}
        </Spinner>
      </IconContainer>
      <ContentContainer style={{ transform: `translateY(${pullDistance}rem)` }}>
        {children}
      </ContentContainer>
    </div>
  );
};

const IconContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  transition: transform 0.3s;
`;

const ContentContainer = styled.div`
  transition: transform 0.3s;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
`;

const spinFadeOut = keyframes`
  0% {
    transform: rotate(0deg);
    scale: 1;
  }
  50% {
    transform: rotate(180deg);
    scale: 0.8;
  }
  100% {
    transform: rotate(360deg);
    scale: 0.4;
  }
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  animation: ${spin} 1s infinite;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px; // 가운데 원 크기 조절
    height: 12px;
    background-color: ${theme.colors.black};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  & > div {
    position: absolute;
    top: 0;
    left: 50%;
    width: 3px;
    height: 20px; // 선의 길이를 늘림
    background-color: ${theme.colors.grey600};
    transform-origin: 50% 15px; // 회전의 중심점을 더 아래로 조정
    opacity: 0.2;
  }

  & > div:nth-of-type(1) {
    transform: rotate(0deg);
    animation: fade 1s 0s infinite;
  }

  & > div:nth-of-type(2) {
    transform: rotate(45deg);
    animation: fade 1s 0.1s infinite;
  }

  & > div:nth-of-type(3) {
    transform: rotate(90deg);
    animation: fade 1s 0.2s infinite;
  }

  & > div:nth-of-type(4) {
    transform: rotate(135deg);
    animation: fade 1s 0.3s infinite;
  }

  & > div:nth-of-type(5) {
    transform: rotate(180deg);
    animation: fade 1s 0.4s infinite;
  }

  & > div:nth-of-type(6) {
    transform: rotate(225deg);
    animation: fade 1s 0.5s infinite;
  }

  & > div:nth-of-type(7) {
    transform: rotate(270deg);
    animation: fade 1s 0.6s infinite;
  }

  & > div:nth-of-type(8) {
    transform: rotate(315deg);
    animation: fade 1s 0.7s infinite;
  }

  @keyframes fade {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }
`;

export default PullToRefresh;
