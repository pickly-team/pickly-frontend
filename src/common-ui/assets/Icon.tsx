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
  | 'not-read'
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
<<<<<<< 6b240242114a8c4f00e037ce74952c715d21960f
<<<<<<< 8683067a7c98b5d9ffa45c95f86cb91b8d453338
  | 'arrow-down-green'
  | 'search'
  | 'arrow-down-green';
=======
  | 'search';
>>>>>>> b82e65c2013effe8ae55c69a2d7003713a299f25
=======
  | 'search'
  | 'arrow-down-green';
>>>>>>> a66efe2643aa7ec23ec21bbafc14fc280818410f
