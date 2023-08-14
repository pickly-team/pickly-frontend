import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import useWebview from '@/common/service/hooks/useWebview';

interface Props {
  onRefresh: () => Promise<void>;
  threshold?: number;
  children: React.ReactNode;
  disabled?: boolean;
}

const PullToRefresh = ({
  onRefresh,
  threshold = 5,
  children,
  disabled = false,
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [finished, setFinished] = useState(false); // 애니메이션 끝나고 1초 후에 finished를 true로 바꿔줌
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number | null>(null);
  const MAX_PULL = 5; // 최대 5rem까지 당길 수 있도록 설정
  const mouseRef = useRef<boolean>(false);

  const { postMessage } = useWebview();

  if (disabled) {
    return <>{children}</>;
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
    setFinished(true);
    postMessage('vibrate', null);
    setTimeout(() => {
      setPullDistance(0);
    }, 1000);
    setTimeout(() => {
      setFinished(false);
    }, 1500);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!refreshing && e.currentTarget.getBoundingClientRect().y === 0) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = null; // scrollTop이 0이 아니면 startY를 초기화
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
    mouseRef.current = true;
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
        style={{
          transform: `translateY(${pullDistance - threshold}rem)`,
        }}
      >
        <SpinnerContainer
          css={css`
            animation: ${finished ? spinFadeOut : spin} 1s
              ${finished ? '0.5s' : '0.2s'};
          `}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} />
          ))}
        </SpinnerContainer>
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

const fade = keyframes`
  from {opacity: 1;}
  to {opacity: 0.25;}
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

const SpinnerContainer = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
  display: inline-block;
  margin-left: 50%;
  margin-right: 50%;
  padding-top: 1rem;

  padding: 10px;
  border-radius: 10px;

  & > div {
    width: 15%;
    height: 16%;
    background: ${theme.colors.grey600};
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    border-radius: 50px;
    /* box-shadow: 0 0 3px rgba(0, 0, 0, 0.2); */
    animation: ${fade} 1s linear infinite;
  }

  & > div:nth-of-type(1) {
    transform: rotate(0deg) translate(0, -130%);
    animation-delay: -0.875s;
  }

  & > div:nth-of-type(2) {
    transform: rotate(45deg) translate(0, -130%);
    animation-delay: -0.75s;
  }

  & > div:nth-of-type(3) {
    transform: rotate(90deg) translate(0, -130%);
    animation-delay: -0.625s;
  }

  & > div:nth-of-type(4) {
    transform: rotate(135deg) translate(0, -130%);
    animation-delay: -0.5s;
  }

  & > div:nth-of-type(5) {
    transform: rotate(180deg) translate(0, -130%);
    animation-delay: -0.375s;
  }

  & > div:nth-of-type(6) {
    transform: rotate(225deg) translate(0, -130%);
    animation-delay: -0.25s;
  }

  & > div:nth-of-type(7) {
    transform: rotate(270deg) translate(0, -130%);
    animation-delay: -0.125s;
  }

  & > div:nth-of-type(8) {
    transform: rotate(315deg) translate(0, -130%);
    animation-delay: 0s;
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

const ContentContainer = styled.div`
  transition: transform 0.3s;
`;

export default PullToRefresh;
