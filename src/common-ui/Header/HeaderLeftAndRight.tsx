import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import styled from '@emotion/styled';

import Icon from '../assets/Icon';
import Text from '../Text';

export interface HeaderProps {
  left: {
    type: 'back' | 'close';
    onClick: () => void;
  };
  middleText?: string;
  right?: {
    text: string;
    disabled?: boolean;
    onClick: () => void;
  };
}

/**
 *
 * @example
 * <HeaderLeftAndRight
    left={{ type: 'back', onClick: () => console.log('clicked back') }}
    middleText="게시물 수정"
    right={{
        type: 'button',
        text: '완료',
        disabled: true,
        onClick: () => console.log('clicked right button'),
        }}
    />
 */
const HeaderLeftAndRight = ({ left, middleText, right }: HeaderProps) => {
  return (
    <StyleHeader>
      <Left>
        {left.type === 'back' && (
          <button onClick={left.onClick}>
            <Icon name="back" size="m" />
          </button>
        )}
        {left.type === 'close' && (
          <button onClick={left.onClick}>
            <Icon name="close" size="s" />
          </button>
        )}
      </Left>
      <Middle hasRightButton={!!right}>
        <Text.Header level="h1" weight="bold">
          {middleText ?? ''}
        </Text.Header>
      </Middle>
      <Right>
        {!right && <StyleRight />}
        {!!right && right.onClick && (
          <button onClick={right.onClick}>
            <Text.Span weight="bold" fontSize={calculateRem(18)}>
              {right.text}
            </Text.Span>
          </button>
        )}
      </Right>
    </StyleHeader>
  );
};

export default HeaderLeftAndRight;

const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: ${getRem(56)};
  padding: 0 ${getRem(20)};
  justify-content: space-between;
  width: 100%;
  background-color: ${theme.colors.black};
  z-index: 2;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: ${getRem(16)};
`;

const Middle = styled.div<{ hasRightButton: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 5;
  ${({ hasRightButton }) =>
    hasRightButton &&
    `
            margin-left: 35px;
`}
`;

const Right = styled.div`
  button {
    display: flex;
    width: 60px;
    justify-content: flex-end;
  }
`;

const StyleRight = styled.div`
  width: 24px;
`;
