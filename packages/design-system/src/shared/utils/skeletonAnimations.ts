import {theme} from 'shared/styles';
import {css, keyframes} from '@emotion/react';

const floating1 = keyframes`
    0% {opacity: 1}
    50% {opacity: 0.4;}
    100% {opacity: 1;}
`;

const floating2 = keyframes`
    0% {opacity: 0.4}
    50% {opacity: 1;}
    100% {opacity: 0.4;}
`;

export const skeletonAnimation1 = css`
  animation: ${floating1} 2s ease infinite;
`;

export const skeletonAnimation2 = css`
  animation: ${floating2} 2s ease infinite;
`;

export const skeletonBackgroundStyle = css`
  background-color: ${theme.colors.grey900};
  ${skeletonAnimation1}
`;

export const skeletonContentStyle = css`
  background-color: ${theme.colors.grey800};
  ${skeletonAnimation2};
`;
