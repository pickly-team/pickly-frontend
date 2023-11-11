import { theme } from '@/styles/theme';
import { css } from '@emotion/react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress = 0 }: ProgressBarProps) => {
  return (
    <div
      css={css`
        display: flex;
        position: relative;
        width: 100%;
      `}
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 0.25rem;
          background-color: ${theme.colors.black};
          border-radius: 0.5rem;
          top: 0.1rem;
        `}
      />
      <div
        css={css`
          position: absolute;
          width: ${progress}%;
          height: 0.5rem;
          background-color: ${theme.colors.lightPrimary};
          border-radius: 0.5rem;
          transition: width 0.5s ease-in-out;
        `}
      />
    </div>
  );
};

export default ProgressBar;
