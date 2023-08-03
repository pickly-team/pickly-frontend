import React, { useEffect, useRef, useState } from 'react';
import {
  BottomSheet as SpringBottomSheet,
  BottomSheetRef,
} from 'react-spring-bottom-sheet';

import './style.module.css';
import styled from '@emotion/styled';

export interface BottomSheetProps {
  children: React.ReactNode;
  open: boolean;
  /** 바텀 시트 닫히는 조건
   *
   * 만약 바텀시트를 닫는 조건이 없다면, onClose를 사용하지 않아도 된다.
   */
  onClose?: () => void;
  /** 바텀시트의 최대 높이
   *
   * 100: 전체화면
   */
  maxHeight?: 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30 | 20 | 10;
}

/**
 *
 * @example
 * <BottomSheet open={open} onClose={onClose}>
 */

const BottomSheet = ({
  children,
  open,
  onClose,
  maxHeight: bsMaxHeight = 90,
}: BottomSheetProps) => {
  const ref = useRef<BottomSheetRef>(null);
  const [showBackground, setShowBackground] = useState(false);

  // 100 ms delay to remove background
  useEffect(() => {
    setTimeout(() => setShowBackground(open), 100);
  }, [open]);

  return (
    <Background
      onClick={(e) => {
        e.stopPropagation();
      }}
      visible={showBackground}
    >
      <div data-testid="bottom-sheet">
        <SpringBottomSheet
          open={open}
          onDismiss={onClose}
          skipInitialTransition
          ref={ref}
          id="bottom-sheet"
          snapPoints={({ minHeight, maxHeight }) => [
            minHeight,
            maxHeight * (bsMaxHeight / 100),
          ]}
        >
          {children}
        </SpringBottomSheet>
      </div>
    </Background>
  );
};

export default BottomSheet;

const Background = styled.div<{ visible: boolean }>`
  background: transparent;
  bottom: 0px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
`;
