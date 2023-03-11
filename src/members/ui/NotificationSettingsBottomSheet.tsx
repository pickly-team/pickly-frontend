import React, { useState } from 'react';
import styled from '@emotion/styled';

import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import getRem from '@/utils/getRem';
import Text from '@/common-ui/Text';
import Toggle from '@/common-ui/Toggle';
import { theme } from '@/styles/theme';
import Button from '@/common-ui/Button';

const NotificationSettingsBottomSheet = ({
  ...props
}: Omit<BottomSheetProps, 'children'>) => {
  const [isAm, setIsAm] = useState(false);

  return (
    <BottomSheet maxHeight={30} {...props}>
      <BottomSheetInnerWrapper>
        <Text.Span
          style={{
            marginTop: getRem(10),
            marginBottom: getRem(10),
          }}
          weight="bold"
        >
          언제 알림을 받고 싶으세요?
        </Text.Span>
        <InputContainer>
          <Toggle
            offText={'오전'}
            onText={'오후'}
            isToggle={isAm}
            setToggleTrue={() => setIsAm(true)}
            setToggleFalse={() => setIsAm(false)}
          />
          <TimeInput />
        </InputContainer>
        <ButtonContainer>
          <Button
            buttonColor="grey800"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              props.onClose && props.onClose();
            }}
          >
            <Text.Span>취소</Text.Span>
          </Button>
          <Button
            buttonColor="primary"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              props.onClose && props.onClose();
            }}
          >
            <Text.Span>저장</Text.Span>
          </Button>
        </ButtonContainer>
      </BottomSheetInnerWrapper>
    </BottomSheet>
  );
};

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${getRem(9)};
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${getRem(9)};
`;

export default NotificationSettingsBottomSheet;

const BottomSheetInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getRem(10, 20, 20)};
  gap: ${getRem(20)};
`;

const TimeInput = () => {
  const [time, setTime] = useState<string>('00:00');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <Container>
      <StyledTimeInput
        value={time}
        onChange={handleTimeChange}
        style={{ textAlign: 'right' }}
        type="time"
      ></StyledTimeInput>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid ${theme.colors.white};
  border-radius: ${getRem(10)};
`;
const StyledTimeInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: ${theme.colors.white};
  font-size: ${getRem(20)};
  outline: none;
  caret-color: transparent;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::-webkit-datetime-edit-hour-field:focus,
  &::-webkit-datetime-edit-minute-field:focus {
    color: ${theme.colors.lightPrimary};
    background: transparent;
  }
`;
