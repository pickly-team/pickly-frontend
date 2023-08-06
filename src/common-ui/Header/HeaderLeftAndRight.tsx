import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import styled from '@emotion/styled';

import Icon from '../assets/Icon';
import Text from '../Text';
import useWebview from '@/common/service/hooks/useWebview';

export interface HeaderProps {
  leftButton: {
    type: 'back' | 'close';
    onClick: () => void;
  };
  middleText?: string;
  rightButton?: {
    text: string;
    disabled?: boolean;
    onClick: () => void;
  };
}

/**
 *
 * @example
  <HeaderLeftAndRight
    leftButton={{ type: 'back', onClick: onClickBack }}
    rightButton={{ text: '저장', onClick: onClickSave }}
  />
 */
const HeaderLeftAndRight = ({
  leftButton,
  middleText,
  rightButton,
}: HeaderProps) => {
  const { postMessage } = useWebview();
  const onClickBackButton = () => {
    leftButton.onClick();
    postMessage('goBack');
  };
  return (
    <StyleHeader>
      <Left>
        {leftButton.type === 'back' && (
          <button onClick={onClickBackButton}>
            <Icon name="back" size="m" />
          </button>
        )}
        {leftButton.type === 'close' && (
          <button onClick={leftButton.onClick}>
            <Icon name="close" size="s" />
          </button>
        )}
      </Left>
      <Middle hasRightButton={!!rightButton}>
        <Text.Header level="h1" weight="bold">
          {middleText ?? ''}
        </Text.Header>
      </Middle>
      <Right>
        {!rightButton && <StyleRight />}
        {!!rightButton && rightButton.onClick && (
          <button onClick={rightButton.onClick}>
            <Text.Span weight="bold" fontSize={calculateRem(18)}>
              {rightButton.text}
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
