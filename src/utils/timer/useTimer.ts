import { useEffect, useState } from 'react';

const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

const useTimer = (duration: number) => {
  const [time, setTime] = useState(formatTime(duration));
  const [isFinished, setIsFinished] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const worker = new Worker(new URL('./timerWorker.ts', import.meta.url));

    worker.onmessage = (e: MessageEvent) => {
      switch (e.data.type) {
        case 'tick':
          setTime(formatTime(e.data.timeLeft));
          break;
        case 'finished':
          setIsFinished(true);
          break;
      }
    };

    worker.postMessage(duration);

    return () => {
      worker.terminate();
    };
  }, [isActive, duration]);

  const resetTimer = () => {
    setIsActive(!isActive);
    setTime(formatTime(duration));
    setIsFinished(false);
  };

  return { time, isFinished, resetTimer };
};

export default useTimer;
