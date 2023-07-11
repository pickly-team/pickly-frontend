import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import BottomSheet, {
  BottomSheetProps,
} from '@/common-ui/BottomSheet/BottomSheet';
import getRem from '@/utils/getRem';
import Text from '@/common-ui/Text';
import Toggle from '@/common-ui/Toggle';
import { theme } from '@/styles/theme';
import Button from '@/common-ui/Button';
import {
  useGETNotificationStandardsQuery,
  usePUTNotificationStandardsQuery,
} from '../api/member';
import useAuthStore from '@/store/auth';

const HourInput = ({
  value,
  onChange,
  isPm,
}: {
  value: string;
  onChange: (val: string) => void;
  isPm: boolean;
}) => {
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (Number(val) <= 12) val = val.slice(-2);
    else if (Number(val) > 12) val = val.slice(-1);

    if (Number(val) < 10 && val.length > 1) val = val.slice(-1);

    if (isPm) {
      if (parseInt(val) >= 1 && parseInt(val) <= 12) {
        onChange(val);
      }
    } else {
      if (parseInt(val) >= 0 && parseInt(val) <= 11) {
        onChange(val);
      }
    }
  };

  return (
    <StyledNumberInput
      value={value.split(':')[0]}
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
  value: string;
  onChange: (val: string) => void;
}) => {
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length > 2) val = val.slice(-1);

    if (parseInt(val) >= 0 && parseInt(val) <= 59) {
      onChange(val);
    }
  };

  return (
    <StyledNumberInput
      value={value.split(':')[1]}
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
  font-size: ${getRem(20)};
  outline: none;
  caret-color: transparent;
  border: none;

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
`;

const NotificationSettingsBottomSheet = ({
  ...props
}: Omit<BottomSheetProps, 'children'>) => {
  const { memberId } = useAuthStore();
  const [isPm, setIsPm] = useState(false);
  const [time, setTime] = useState<string>('00:00');

  const { data: defaultTime } = useGETNotificationStandardsQuery({
    loginId: memberId,
  });

  useEffect(() => {
    if (defaultTime) setTime(defaultTime.notifyDailyAt);
  }, [defaultTime]);

  useEffect(() => {
    const hour = parseInt(time.split(':')[0]);
    const minute = time.split(':')[1];
    if (!isPm && hour === 12) {
      setTime('11:59');
      return;
    }

    const withZeroHour = hour < 10 ? `0${hour}` : hour;
    setTime(`${withZeroHour}:${minute}`);
  }, [isPm, time]);

  const handleTimeChange = (hour: string, minute: string) => {
    setTime(`${hour}:${minute}`);
  };

  const { mutate } = usePUTNotificationStandardsQuery({
    loginId: memberId || 8,
  });

  const onClickSave = () => {
    mutate({
      loginId: memberId || 8,
      putData: {
        isActive: true,
        notifyDailyAt: time,
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
              value={time}
              onChange={(hour) => handleTimeChange(hour, time.split(':')[1])}
              isPm={isPm}
            />
            <Text.Span>:</Text.Span>
            <MinuteInput
              value={time}
              onChange={(minute) =>
                handleTimeChange(time.split(':')[0], minute)
              }
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
