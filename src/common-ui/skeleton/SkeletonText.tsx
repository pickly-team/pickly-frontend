/* eslint-disable no-irregular-whitespace */
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import {
  skeletonAnimation1,
  skeletonAnimation2,
} from '../utils/skeletonAnimations';

interface SkeletonTextProps {
  width?: number;
  height?: number;
  animationType?: 'normal' | 'reverse';
}

const SkeletonText = ({
  width = 100,
  height = 1,
  animationType = 'normal',
}: SkeletonTextProps) => {
  return (
    <div
      css={css`
        width: ${width}%;
        height: ${height}rem;
        background-color: ${theme.colors.grey800};
        ${skeletonAnimation1};
        border-radius: 0.3rem;
        ${animationType === 'normal' ? skeletonAnimation1 : skeletonAnimation2};
      `}
    >
      ​
    </div>
  );
};

export default SkeletonText;
