import { IconComponentProps } from '@/common-ui/icons/types';
import { theme } from '@/styles/theme';

const CheckCircleIcon = ({
  width = 24,
  height = 24,
  color = theme.colors.white,
}: IconComponentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_581_12300)">
        <path
          d="M12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM10 17.5L5 12.5L6.41 11.09L10 14.67L17.59 7.08L19 8.5L10 17.5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_581_12300">
          <rect width="24" height="24" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckCircleIcon;
