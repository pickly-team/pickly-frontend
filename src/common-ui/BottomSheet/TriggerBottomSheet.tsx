/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, useMemo, useRef } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Text from '../Text';

import {
  BottomSheetRef,
  BottomSheet as SpringBottomSheet,
} from 'react-spring-bottom-sheet';
import getRem from '@/utils/getRem';

interface BottomSheetProps {
  children: React.ReactNode;
}

const TriggerBottomSheet = ({ children }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const closeOnEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', closeOnEscape);
      return () => {
        document.removeEventListener('keydown', closeOnEscape);
      };
    }
    return () => {};
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen],
  );

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
    </BottomSheetContext.Provider>
  );
};

const BottomSheetContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

interface TriggerProps {
  as: React.ReactElement;
}

const Trigger = ({ as }: TriggerProps) => {
  const { isOpen, setIsOpen } = React.useContext(BottomSheetContext);
  const clonedTrigger = React.cloneElement(as, {
    onClick: () => {
      as.props.onClick();
      setIsOpen(!isOpen);
    },
  });

  return clonedTrigger;
};

interface BSProps {
  children: React.ReactNode;
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

const BottomSheet = ({ children, maxHeight: bsMaxHeight = 90 }: BSProps) => {
  const ref = useRef<BottomSheetRef>(null);
  const { isOpen, setIsOpen } = React.useContext(BottomSheetContext);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div data-testid="bottom-sheet">
      <SpringBottomSheet
        open={isOpen}
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

interface ItemProps {
  children: string;
  onClick?: () => void;
}

const Item = ({ children, onClick }: ItemProps) => {
  const { setIsOpen } = React.useContext(BottomSheetContext);
  const handleClick = () => {
    onClick && onClick();
    setIsOpen(false);
  };

  return (
    <ListButton onClick={handleClick}>
      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          justify-items: flex-start;
        `}
      >
        <Text.P>{children}</Text.P>
      </div>
    </ListButton>
  );
};

const ListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.grey600};
  padding: ${getRem(15)} ${getRem(20)};
  :nth-last-of-type(1) {
    border-bottom: none;
  }
  :hover {
    background-color: ${theme.colors.grey800};
  }

  transition: all 0.2s ease-in-out;
`;

TriggerBottomSheet.Trigger = Trigger;
TriggerBottomSheet.BottomSheet = BottomSheet;
TriggerBottomSheet.Item = Item;

export default TriggerBottomSheet;
