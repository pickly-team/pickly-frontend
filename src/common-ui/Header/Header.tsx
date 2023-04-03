import styled from '@emotion/styled';
import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import getRem from '@/utils/getRem';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  fontSize?: number;
  rightButton?: ReactNode;
}

const Header = ({
  showBackButton = false,
  title,
  fontSize,
  rightButton,
}: HeaderProps) => {
  const onClickBackButton = () => {
    window.history.back();
  };
  return (
    <HeaderContainer>
      <BackButtonAndTitleWrapper>
        {showBackButton && (
          <button type="button" onClick={onClickBackButton}>
            <Icon name="back" size={'m'} />
          </button>
        )}
        {title && <Text.Div fontSize={1.5}>{title}</Text.Div>}
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
