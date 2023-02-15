import { IconComponentProps } from '@/common-ui/icons/types';
import { theme } from '@/styles/theme';

const UnCheckedCircleIcon = ({
  width = 24,
  height = 24,
  color = theme.colors.white,
}: IconComponentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_581_12297)">
        <path
          d="M12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM12 20.5C7.58 20.5 4 16.92 4 12.5C4 8.08 7.58 4.5 12 4.5C16.42 4.5 20 8.08 20 12.5C20 16.92 16.42 20.5 12 20.5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_581_12297">
          <rect
            width="24"
            height="24"
            fill={color}
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default UnCheckedCircleIcon;
