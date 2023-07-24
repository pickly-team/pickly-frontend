import React, { KeyboardEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import getRem from '@/utils/getRem';
import Text from '@/common-ui/Text';
import Toggle from '@/common-ui/Toggle';
import { theme } from '@/styles/theme';
import Button from '@/common-ui/Button';
import { usePUTNotificationStandardsQuery } from '../api/member';
import useAuthStore from '@/store/auth';

const HourInput = ({
  value,
  onChange,
  isPm,
}: {
  value: number;
  onChange: (val: number) => void;
  isPm: boolean;
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // 2자리 숫자까지만 입력 가능하도록 함
    if (val.length > 2) val = val.slice(0, 2);
    onChange(Number(val));
  };

  useEffect(() => {
    // 입력 완료 후에 범위 확인
    if (value < 0 || value > 12) {
      onChange(12);
    }
  }, [value]);

  return (
    <StyledNumberInput
      value={value}
      onKeyDown={handleKeyPress}
      onChange={handleHourChange}
      min={isPm ? 1 : 0}
      max={isPm ? 12 : 11}
    />
  );
};

const MinuteInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // 2자리 숫자까지만 입력 가능하도록 함
    if (val.length > 2) val = val.slice(0, 2);

    onChange(Number(val));
  };

  useEffect(() => {
    // 입력 완료 후에 범위 확인
    if (value < 0 || value > 59) {
      onChange(59);
    }
  }, [value]);

  return (
    <StyledNumberInput
      value={value}
      onKeyDown={handleKeyPress}
      onChange={handleMinuteChange}
      min={0}
      max={59}
    />
  );
};

const StyledNumberInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: ${theme.colors.white};
  caret-color: ${theme.colors.white};
  font-size: ${getRem(20)};
  outline: none;
  border: none;

  &:focus {
    caret-color: ${theme.colors.white};
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &::-webkit-outer-spin-button {
    display: none;
  }

  &::-webkit-clear-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    appearance: none;
    margin: ${getRem(-10)};
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface Time {
  hour: number;
  minute: number;
}

type NotificationSettingsBottomSheetProps = {
  defaultTime: string;
} & Omit<BottomSheetProps, 'children'>;

const NotificationSettingsBottomSheet = ({
  defaultTime,
  ...props
}: NotificationSettingsBottomSheetProps) => {
  const { memberId } = useAuthStore();
  const [isPm, setIsPm] = useState(false);
  const [time, setTime] = useState<Time>({
    hour: 0,
    minute: 0,
  });

  useEffect(() => {
    if (defaultTime) {
      const [hour, minute] = defaultTime.split(':');
      const transformHour =
        Number(hour) > 12 ? Number(hour) - 12 : Number(hour);
      setTime({ hour: transformHour, minute: Number(minute) });
      setIsPm(Number(hour) > 12);
    }
  }, [defaultTime]);

  const handleTimeChange = (hour: number, minute: number) => {
    setTime({ hour, minute });
  };

  const { mutate } = usePUTNotificationStandardsQuery({
    loginId: memberId || 8,
  });

  const onClickSave = () => {
    const { hour, minute } = time;

    const transformHour = isPm ? hour + 12 : hour < 10 ? `0${hour}` : hour;
    if (defaultTime === `${transformHour}:${minute}:00`) {
      props.onClose && props.onClose();
      return;
    }
    const transformMinute = minute < 10 ? `0${minute}` : minute;
    mutate({
      loginId: memberId || 8,
      putData: {
        isActive: true,
        notifyDailyAt: `${transformHour}:${transformMinute}`,
      },
    });
    props.onClose && props.onClose();
  };

  return (
    <BottomSheet maxHeight={40} {...props}>
      <BottomSheetInnerWrapper>
        <Text.Span
          style={{
            marginTop: getRem(10),
            marginBottom: getRem(10),
          }}
          fontSize={1.25}
          weight="bold"
        >
          언제 알림을 받고 싶으세요?
        </Text.Span>
        <InputContainer>
          <Toggle
            offText={'오전'}
            onText={'오후'}
            isToggle={isPm}
            setToggleTrue={() => setIsPm(true)}
            setToggleFalse={() => setIsPm(false)}
          />
          <Container>
            <HourInput
              value={time.hour}
              onChange={(hour) => handleTimeChange(hour, time.minute)}
              isPm={isPm}
            />
            <Text.Span>:</Text.Span>
            <MinuteInput
              value={time.minute}
              onChange={(minute) => handleTimeChange(time.hour, minute)}
            />
          </Container>
        </InputContainer>
        <ButtonContainer>
          <Button
            buttonColor="grey800"
            height={2.5}
            onClick={() => {
              props.onClose && props.onClose();
            }}
          >
            <Text.Span>취소</Text.Span>
          </Button>
          <Button
            buttonColor="primary"
            height={2.5}
            onClick={() => {
              onClickSave();
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
  margin: 1.25rem 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  column-gap: 0.5rem;
  margin: 0.625rem 0;
`;

const BottomSheetInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getRem(10, 20, 20)};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid ${theme.colors.white};
  border-radius: ${getRem(10)};
  margin-left: 1.5rem;
`;

export default NotificationSettingsBottomSheet;
