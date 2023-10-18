import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface ListItemProps {
  children: React.ReactNode;
  height?: number;
  withPadding?: boolean;
  onClick?: () => void;
}

const ListItem = ({
  children,
  onClick,
  height = 52,
  withPadding = true,
}: ListItemProps) => {
  return (
    <ItemWrapper
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      css={css`
        height: ${getRem(height)};
        padding: ${withPadding ? getRem(20) : 0};
      `}
    >
      {children}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  :active {
    background-color: ${theme.colors.grey900};
  }
`;

interface LeftProps {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}

const Left = ({ left, middle, right }: LeftProps) => {
  return (
    <LeftWrapper>
      {left}
      {middle}
      {right}
    </LeftWrapper>
  );
};

const LeftWrapper = styled.div`
  display: flex;
  column-gap: ${getRem(20)};
  width: 100%;
  align-items: center;
`;

interface RightProps {
  children?: React.ReactNode;
}

const Right = ({ children }: RightProps) => {
  return <RightWrapper>{children}</RightWrapper>;
};

const RightWrapper = styled.div`
  margin-left: auto;
`;

ListItem.Left = Left;
ListItem.Right = Right;

export default ListItem;
