import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

type SlideItemProps = {
  main: ReactNode;
  option: ReactNode;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'onMouseMove'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onTouchStart'
  | 'onTouchMove'
  | 'onTouchEnd'
>;

const SlideItem = ({ main, option, ...restProps }: SlideItemProps) => {
  const { ref: wrapperRef, width: wrapperWidth } = useGetDivWrapperWidth();
  const { ref: optionWrapperRef, width: optionWrapperWidth } =
    useGetDivWrapperWidth();
  const innerWrapperRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  // x 시작점
  const [startX, setStartX] = useState(0);

  // x 움직인 거리
  const [moveX, setMoveX] = useState(0);

  // 슬라이드 이벤트 시작했는지 표시
  const [isSlideEventStart, setIsSlideEventStart] = useState(false);

  // 왼쪽으로 최대로 이동할 수 있는 거리
  const maxLeftPositionX = optionWrapperWidth;

  useEffect(() => {
    initializeItemsStyle();
  }, [wrapperWidth]);

  const initializeItemsStyle = () => {
    if (mainRef?.current) {
      mainRef.current.style.width = `${wrapperWidth}px`;
    }
    if (innerWrapperRef?.current) {
      innerWrapperRef.current.style.left = '0';
    }
  };

  const updateStartPositionX = (currentTargetX: number) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const startX = currentTargetX - rect.left;

    setStartX(startX);
    setIsSlideEventStart(true);
  };

  const updateMovedPositionX = (currentTargetX: number) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const moveX = currentTargetX - rect.left - startX;
    setMoveX(moveX);

    if (isSlideEventStart && isMoveToLeft(moveX)) {
      handleLeftMovedPositionX();
    }
  };

  const handleLeftMovedPositionX = () => {
    const absoluteMoveX = Math.abs(moveX);
    const adjustedMoveX =
      absoluteMoveX > maxLeftPositionX ? maxLeftPositionX : absoluteMoveX;

    changeSlideItemLeftPosition(`-${adjustedMoveX}`);
  };

  const moveToSlideDirection = () => {
    if (isMoveToLeft(moveX)) {
      changeSlideItemLeftPosition(`-${maxLeftPositionX}`);
    } else {
      changeSlideItemLeftPosition(0);
    }
    setIsSlideEventStart(false);
  };

  const changeSlideItemLeftPosition = (leftMoveX: number | string) => {
    if (!innerWrapperRef?.current) {
      return;
    }
    innerWrapperRef.current.style.left = `${leftMoveX}px`;
  };

  const isMoveToLeft = (moveX: number) => {
    return moveX < 0;
  };

  return (
    <SlideWrapper
      ref={wrapperRef}
      onMouseDown={(event) => {
        updateStartPositionX(event.clientX);
      }}
      onTouchStart={(event) => {
        updateStartPositionX(event.touches[0].clientX);
      }}
      onMouseMove={(event) => {
        updateMovedPositionX(event.clientX);
      }}
      onTouchMove={(event) => {
        updateMovedPositionX(event.touches[0].clientX);
      }}
      onMouseUp={moveToSlideDirection}
      onTouchEnd={moveToSlideDirection}
      {...restProps}
    >
      <SlideInnerWrapper ref={innerWrapperRef}>
        <MainItemWrapper ref={mainRef}>{main}</MainItemWrapper>
        <OptionItemWrapper ref={optionWrapperRef}>{option}</OptionItemWrapper>
      </SlideInnerWrapper>
    </SlideWrapper>
  );
};

export default SlideItem;

const useGetDivWrapperWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function initializeData() {
      const width = ref?.current?.clientWidth;
      if (width) {
        setWidth(width);
      }
    }
    window.addEventListener('resize', initializeData);
    window.addEventListener('load', initializeData);

    return () => {
      window.removeEventListener('resize', initializeData);
      window.removeEventListener('load', initializeData);
    };
  }, []);

  return { ref, width };
};

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  overflow: hidden;
  cursor: pointer;
`;

const SlideInnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  display: flex;
  height: 100%;
  transition: left 0.1s ease-in-out;
`;

const MainItemWrapper = styled.div`
  height: 100%;
`;

const OptionItemWrapper = styled.div`
  width: fit-content;
  height: 100%;
  background-color: ${(p) => p.theme.colors.primary};
`;
