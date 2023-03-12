// TODO : 아이콘 사이즈 논의 필요

const sizeMap = {
  l: 28,
  m: 24,
  s: 20,
  xs: 15,
} as const;

interface IconProps {
  name: IconName;
  /** l: 28, m:24, s:20, xs: 15 */
  size: keyof typeof sizeMap;
}

/**
 *
 * @example
 * <Icon name="check" size="s" />
 */

const Icon = ({ name, size }: IconProps) => (
  <svg
    width={sizeMap[size]}
    height={sizeMap[size]}
    fill="none"
    style={{ pointerEvents: 'none' }}
  >
    <title>{name}</title>
    <use href={`#${name}`} />
  </svg>
);

export default Icon;

export type IconName =
  | 'check'
  | 'check-none'
  | 'like'
  | 'like-green'
  | 'message'
  | 'message-on-green'
  | 'list'
  | 'list-green'
  | 'people'
  | 'people-green'
  | 'alarm'
  | 'alarm-green'
  | 'profile'
  | 'profile-green'
  | 'plus'
  | 'plus-dark'
  | 'search'
  | 'pencil'
  | 'question'
  | 'not-read'
  | 'message-green'
  | 'calendar-plus'
  | 'location'
  | 'badge-green'
  | 'timeline'
  | 'send'
  | 'more'
  | 'arrow-down-green'
  | 'check-circle-green'
  | 'folder'
  | 'arrow-right'
  | 'back'
  | 'plus'
  | 'heart-fill-green'
  | 'heart-blank-green'
  | 'close'
  | 'bookmark';
