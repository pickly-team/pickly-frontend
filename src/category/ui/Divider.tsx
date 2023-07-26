import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type Size = 's' | 'm' | 'l';
type Margin = 'on' | 'off';
type TypeStyle = {
  height: number;
  margin: number;
};
type TypeStyleMap = { [key in Size]: TypeStyle };

type StatusStyle = {
  [key in Margin]: TypeStyleMap;
};

const dividerTypeMap: StatusStyle = {
  on: {
    s: { height: 1, margin: 20 },
    m: { height: 3, margin: 20 },
    l: { height: 10, margin: 20 },
  },
  off: {
    s: { height: 1, margin: 0 },
    m: { height: 3, margin: 0 },
    l: { height: 10, margin: 0 },
  },
};

const Divider = ({
  size = 's',
  margin = 'off',
}: {
  size: Size;
  margin: Margin;
}) => {
  return <StyleDivider size={size} margin={margin} />;
};

export default Divider;

const StyleDivider = styled.div<{ size: Size; margin: Margin }>`
  ${({ size, margin }) => `
        height: ${dividerTypeMap[margin][size].height}px; 
        margin-left: ${dividerTypeMap[margin][size].margin}px; 
        margin-right: ${dividerTypeMap[margin][size].margin}px;
    `}
  background: ${theme.colors.grey800};
`;
