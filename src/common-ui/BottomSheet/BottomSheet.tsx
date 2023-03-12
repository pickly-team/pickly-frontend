import React, { useRef } from 'react';
import {
  BottomSheet as SpringBottomSheet,
  BottomSheetRef,
} from 'react-spring-bottom-sheet';

import './style.module.css';

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

  return (
    <div data-testid="bottom-sheet">
      <SpringBottomSheet
        open={open}
        onDismiss={onClose}
        skipInitialTransition
        ref={ref}
        snapPoints={({ minHeight, maxHeight }) => [
          minHeight,
          maxHeight * (bsMaxHeight / 100),
        ]}
      >
        {children}
      </SpringBottomSheet>
    </div>
  );
};

export default BottomSheet;
