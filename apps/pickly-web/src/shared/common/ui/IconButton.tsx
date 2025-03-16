import { getRem, Icon, IconProps } from '@pickly/design-system';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

type IconButtonProps = {
  width?: number;
  height?: number;
} & IconProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({
  name,
  size,
  width = 50,
  height = 50,
  ...restProps
}: IconButtonProps) => {
  return (
    <StyleButton
      {...restProps}
      style={{ height: getRem(height), width: getRem(width) }}
    >
      <Icon name={name} size={size} />
    </StyleButton>
  );
};

export default IconButton;

const StyleButton = styled.button`
  display: flex;
  justify-content: flex-end;
`;
