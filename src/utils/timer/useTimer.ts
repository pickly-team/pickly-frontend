import { useState, useEffect } from 'react';

interface TimerResponse {
  formattedTime: string;
  isFinished: boolean;
  resetTimer: () => void;
}

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
};

const useTimer = (
  initialMilliseconds: number = 5 * 60 * 1000,
): TimerResponse => {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [remainingTime, setRemainingTime] =
    useState<number>(initialMilliseconds);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const calculateRemaining = () => {
      const elapsedMilliseconds = Date.now() - startTime;
      const newRemainingTime = initialMilliseconds - elapsedMilliseconds;

      if (newRemainingTime <= 0) {
        setIsFinished(true);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    };

    // 첫 실행에서 간격 조정
    setTimeout(() => {
      calculateRemaining();

      const intervalId = setInterval(() => {
        calculateRemaining();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, Date.now() - startTime);
  }, [startTime, initialMilliseconds]);

  const resetTimer = () => {
    setStartTime(Date.now());
    setRemainingTime(initialMilliseconds);
    setIsFinished(false);
  };

  return {
    formattedTime: formatTime(remainingTime),
    isFinished,
    resetTimer,
  };
};

export default useTimer;
