import Text from '../Text/Text';
import {theme} from 'shared/styles/theme';
import {getRem} from 'shared/utils/getRem';
import {HEADER_Z_INDEX} from 'shared/utils/zIndex';
import type {ReactNode} from 'react';
import {IoArrowBack} from 'react-icons/io5';
import styled from '@emotion/styled';

export interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  rightButton?: ReactNode;
  backButtonCallback?: () => void;
}

const Header = ({
  showBackButton = false,
  title,
  rightButton,
  backButtonCallback,
}: HeaderProps) => {
  const onClickBackButton = () => {
    window.history.back();
    backButtonCallback?.();
  };
  return (
    <HeaderContainer>
      <BackButtonAndTitleWrapper>
        {showBackButton && (
          <IoArrowBack
            size={getRem(24)}
            color={theme.colors.white}
            onClick={onClickBackButton}
          />
        )}
        {title && <Text.Div fontSize={getRem(20)}>{title}</Text.Div>}
      </BackButtonAndTitleWrapper>
      <RightButtonWrapper>{rightButton}</RightButtonWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${theme.colors.black};
  padding: ${getRem(8, 20)};
  height: ${getRem(56)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: ${HEADER_Z_INDEX};
`;

const BackButtonAndTitleWrapper = styled.div`
  display: flex;
  column-gap: ${getRem(16)};
  align-items: center;
`;

const RightButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
