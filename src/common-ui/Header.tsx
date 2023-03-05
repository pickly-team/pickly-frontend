import styled from '@emotion/styled';
import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import getRem from '@/utils/getRem';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  rightButton?: ReactNode;
}

const Header = ({
  showBackButton = false,
  title,
  rightButton,
}: HeaderProps) => {
  return (
    <HeaderContainer>
      <BackButtonAndTitleWrapper>
        {showBackButton && (
          <button type="button">
            <Icon name="backward" size={'m'} />
          </button>
        )}
        {title && <Text.Div fontSize={getRem(20)}>{title}</Text.Div>}
      </BackButtonAndTitleWrapper>
      <RightButtonWrapper>{rightButton}</RightButtonWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  padding: 8px 20px;
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButtonAndTitleWrapper = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;

const RightButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
