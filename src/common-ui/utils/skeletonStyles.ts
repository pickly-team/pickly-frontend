import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import {
  skeletonAnimation1,
  skeletonAnimation2,
} from '@/common-ui/utils/skeletonAnimations';

export const skeletonBackgroundStyle = css`
  background-color: ${theme.colors.grey900};
  ${skeletonAnimation1}
`;

export const skeletonContentStyle = css`
  background-color: ${theme.colors.grey800};
  ${skeletonAnimation2};
`;
