import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import React from 'react';

interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ListItem = ({ children, onClick }: ListItemProps) => {
  return <ItemWrapper onClick={onClick}>{children}</ItemWrapper>;
};

const ItemWrapper = styled.div`
  display: flex;
  padding: ${getRem(20)} ${getRem(20)};
  width: 100%;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  height: ${getRem(52)};
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
